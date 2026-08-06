/**
 * 演示页编辑器用的极简高亮器。
 *
 * 只处理 playground 里会出现的那一种文档：HTML 外壳 + 一段内嵌 module 脚本。
 * 不追求成为通用 HTML/JS 解析器 —— 目标是让关键字、字符串和注释在两套主题下
 * 都能一眼分开，且在每次按键都要重跑的前提下足够快。
 */

export type TokenKind =
  | 'plain'
  | 'comment'
  | 'string'
  | 'keyword'
  | 'number'
  | 'tag'
  | 'attr'
  | 'punct'

export interface Token {
  kind: TokenKind
  value: string
}

const JS_KEYWORDS = new Set([
  'await', 'async', 'break', 'case', 'catch', 'class', 'const', 'continue', 'default',
  'delete', 'do', 'else', 'export', 'extends', 'finally', 'for', 'from', 'function',
  'if', 'import', 'in', 'instanceof', 'let', 'new', 'of', 'return', 'super', 'switch',
  'this', 'throw', 'try', 'typeof', 'var', 'void', 'while', 'yield',
  'true', 'false', 'null', 'undefined',
])

/** 不是关键字，但值得和普通标识符区分开的内置对象。 */
const JS_GLOBALS = new Set([
  'Array', 'JSON', 'MXPlayer', 'Math', 'Number', 'Object', 'Promise', 'String', 'URL',
  'Worker', 'console', 'document', 'location', 'navigator', 'window',
])

const IDENT_START = /[A-Za-z_$]/
const IDENT_PART = /[A-Za-z0-9_$]/

/**
 * 把整份文档切成 token。HTML 与内嵌脚本各有一套词法，靠 `<script>` / `</script>`
 * 边界切换 —— 不能直接对全文跑 JS 词法：HTML 里的 `<` 和引号含义完全不同。
 */
export function tokenize(source: string): Token[] {
  const sink = createSink()
  let index = 0

  while (index < source.length) {
    if (source.startsWith('<!--', index)) {
      const end = source.indexOf('-->', index + 4)
      const stop = end === -1 ? source.length : end + 3
      sink.push('comment', source.slice(index, stop))
      index = stop
      continue
    }

    // 一个完整标签，含属性。开标签是 <script> 时，标签之后的内容切到 JS 词法。
    if (source[index] === '<' && /[a-zA-Z/!]/.test(source[index + 1] ?? '')) {
      const end = source.indexOf('>', index)
      const stop = end === -1 ? source.length : end + 1
      const raw = source.slice(index, stop)
      pushTag(sink, raw)
      index = stop

      if (/^<script[\s>]/i.test(raw) && !raw.endsWith('/>')) {
        const close = findScriptClose(source, index)
        sink.pushTokens(tokenizeJs(source.slice(index, close)))
        index = close
      }
      continue
    }

    sink.pending(source[index])
    index += 1
  }

  return sink.done()
}

function findScriptClose(source: string, from: number): number {
  const match = /<\/script\s*>/i.exec(source.slice(from))
  return match ? from + match.index : source.length
}

interface Sink {
  push(kind: TokenKind, value: string): void
  pushTokens(tokens: Token[]): void
  pending(text: string): void
  done(): Token[]
}

/** 相邻的普通文本先攒在一起再落盘，减少渲染层要生成的元素数量。 */
function createSink(): Sink {
  const tokens: Token[] = []
  let buffer = ''

  function flush() {
    if (!buffer) return
    tokens.push({ kind: 'plain', value: buffer })
    buffer = ''
  }

  return {
    push(kind, value) {
      if (!value) return
      if (kind === 'plain') { buffer += value; return }
      flush()
      tokens.push({ kind, value })
    },
    pushTokens(next) {
      flush()
      tokens.push(...next)
    },
    pending(text) { buffer += text },
    done() { flush(); return tokens },
  }
}

/** 把一个完整标签拆成 `<name`、属性名、`="值"`，让属性和值各自着色。 */
function pushTag(sink: Sink, raw: string) {
  const open = /^<\/?\s*[a-zA-Z][\w-]*|^<![\w]*/.exec(raw)
  if (!open) { sink.push('tag', raw); return }
  sink.push('tag', open[0])

  let index = open[0].length
  while (index < raw.length) {
    const char = raw[index]
    if (char === '>' || char === '/') {
      sink.push('tag', raw.slice(index))
      return
    }
    if (/\s/.test(char)) {
      sink.push('plain', char)
      index += 1
      continue
    }
    if (char === '"' || char === "'") {
      const end = raw.indexOf(char, index + 1)
      const stop = end === -1 ? raw.length : end + 1
      sink.push('string', raw.slice(index, stop))
      index = stop
      continue
    }
    if (char === '=') {
      sink.push('punct', '=')
      index += 1
      continue
    }
    const name = /^[^\s=>/]+/.exec(raw.slice(index))
    if (!name) { sink.push('plain', char); index += 1; continue }
    sink.push('attr', name[0])
    index += name[0].length
  }
}

/** 脚本体词法：注释、三种字符串、数字、关键字，其余按标点或普通文本。 */
function tokenizeJs(source: string): Token[] {
  const sink = createSink()
  let index = 0

  while (index < source.length) {
    const char = source[index]
    const next = source[index + 1]

    if (char === '/' && next === '/') {
      const end = source.indexOf('\n', index)
      const stop = end === -1 ? source.length : end
      sink.push('comment', source.slice(index, stop))
      index = stop
      continue
    }

    if (char === '/' && next === '*') {
      const end = source.indexOf('*/', index + 2)
      const stop = end === -1 ? source.length : end + 2
      sink.push('comment', source.slice(index, stop))
      index = stop
      continue
    }

    if (char === '"' || char === "'" || char === '`') {
      const stop = scanString(source, index, char)
      sink.push('string', source.slice(index, stop))
      index = stop
      continue
    }

    // 前一个字符是标识符的一部分时，这串数字属于那个标识符（avc1、h264）。
    if (/[0-9]/.test(char) && !IDENT_PART.test(source[index - 1] ?? '')) {
      const match = /^[0-9][0-9a-fA-FxX._]*/.exec(source.slice(index))
      const value = match ? match[0] : char
      sink.push('number', value)
      index += value.length
      continue
    }

    if (IDENT_START.test(char)) {
      let end = index + 1
      while (end < source.length && IDENT_PART.test(source[end])) end += 1
      const word = source.slice(index, end)
      if (JS_KEYWORDS.has(word)) sink.push('keyword', word)
      else if (JS_GLOBALS.has(word)) sink.push('tag', word)
      else sink.pending(word)
      index = end
      continue
    }

    if ('{}()[];,.:?=<>!+-*/%&|^~'.includes(char)) {
      sink.push('punct', char)
      index += 1
      continue
    }

    sink.pending(char)
    index += 1
  }

  return sink.done()
}

/**
 * 扫到配对的引号。转义符整体跳过；模板串里的 `${...}` 不单独着色 —— 演示代码里
 * 它们都是短插值，整段按字符串读反而更连贯。
 */
function scanString(source: string, start: number, quote: string): number {
  let index = start + 1
  while (index < source.length) {
    const char = source[index]
    if (char === '\\') { index += 2; continue }
    if (char === quote) return index + 1
    // 未闭合的引号不吞掉整份文档：换行即终止。模板串本就允许跨行，不适用。
    if (char === '\n' && quote !== '`') return index
    index += 1
  }
  return source.length
}
