import { describe, expect, it } from 'vitest'
import { tokenize, type Token, type TokenKind } from './highlight'

/** 取某一类 token 的文本，断言时比逐个下标取值可读得多。 */
function kindsOf(tokens: Token[], kind: TokenKind): string[] {
  return tokens.filter((token) => token.kind === kind).map((token) => token.value)
}

/** 高亮层是覆盖在 textarea 上的，任何字符丢失都会让两层错位。 */
function roundTrip(source: string): string {
  return tokenize(source).map((token) => token.value).join('')
}

describe('tokenize', () => {
  it('对任意输入都保持字符不增不减', () => {
    const samples = [
      '<div id="mse"></div>',
      '<script type="module">const a = 1 // 注释\n</script>',
      '<!-- 未闭合的注释',
      '<script>const s = "未闭合',
      'a < b && c > d',
      '',
    ]
    for (const sample of samples) expect(roundTrip(sample)).toBe(sample)
  })

  it('拆出标签名、属性名与属性值', () => {
    const tokens = tokenize('<div id="mse" class="stage">文本</div>')
    expect(kindsOf(tokens, 'tag')).toEqual(['<div', '>', '</div', '>'])
    expect(kindsOf(tokens, 'attr')).toEqual(['id', 'class'])
    expect(kindsOf(tokens, 'string')).toEqual(['"mse"', '"stage"'])
  })

  it('script 体内按 JS 词法着色，而不是 HTML', () => {
    const tokens = tokenize([
      '<script type="module">',
      '  // 从 CDN 引入',
      "  import { MXPlayer } from 'https://example.com/mx-player.js'",
      '  const volume = 0.85',
      '</script>',
    ].join('\n'))

    expect(kindsOf(tokens, 'keyword')).toEqual(['import', 'from', 'const'])
    expect(kindsOf(tokens, 'comment')).toEqual(['// 从 CDN 引入'])
    expect(kindsOf(tokens, 'string')).toContain("'https://example.com/mx-player.js'")
    expect(kindsOf(tokens, 'number')).toEqual(['0.85'])
  })

  it('字符串里的 // 不会被当成注释', () => {
    const tokens = tokenize("<script>const url = 'https://cdn.example.com/a.js'</script>")
    expect(kindsOf(tokens, 'comment')).toEqual([])
    expect(kindsOf(tokens, 'string')).toEqual(["'https://cdn.example.com/a.js'"])
  })

  it('HTML 注释里的标签不当作标签', () => {
    const tokens = tokenize('<!-- <div id="x"> --><p>')
    expect(kindsOf(tokens, 'comment')).toEqual(['<!-- <div id="x"> -->'])
    expect(kindsOf(tokens, 'tag')).toEqual(['<p', '>'])
  })

  it('script 结束后回到 HTML 词法', () => {
    const tokens = tokenize('<script>const a = 1</script><div class="after"></div>')
    expect(kindsOf(tokens, 'attr')).toEqual(['class'])
    expect(kindsOf(tokens, 'keyword')).toEqual(['const'])
  })

  it('模板串可以跨行，普通字符串不行', () => {
    const template = tokenize('<script>const a = `第一行\n第二行`</script>')
    expect(kindsOf(template, 'string')).toEqual(['`第一行\n第二行`'])

    // 少写一个引号只该染坏这一行，不该把后面整份文档都吞成字符串。
    const broken = tokenize("<script>const a = '坏了\nconst b = 2</script>")
    expect(kindsOf(broken, 'string')).toEqual(["'坏了"])
    expect(kindsOf(broken, 'keyword')).toEqual(['const', 'const'])
  })

  it('标识符尾部的数字不单独当数字', () => {
    const tokens = tokenize('<script>const codec = avc1</script>')
    expect(kindsOf(tokens, 'number')).toEqual([])
  })
})
