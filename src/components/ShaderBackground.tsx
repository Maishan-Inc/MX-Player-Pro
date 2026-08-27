import { useEffect, useRef } from 'react'

interface ShaderBackgroundProps {
  className?: string
}

export default function ShaderBackground({ className = '' }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const root = rootRef.current
    if (!canvas || !root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      canvas.style.display = 'none'
      return
    }

    const gl = canvas.getContext('webgl2', { alpha: false, antialias: false, powerPreference: 'low-power' })
    if (!gl) {
      canvas.style.display = 'none'
      return
    }

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)
      if (!s) return null
      gl.shaderSource(s, src.trim() + '\n')
      gl.compileShader(s)
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error(gl.getShaderInfoLog(s))
        return null
      }
      return s
    }

    const vs = compile(gl.VERTEX_SHADER, `#version 300 es
in vec2 a_position;
void main(){ gl_Position = vec4(a_position, 0.0, 1.0); }
`)
    const fs = compile(gl.FRAGMENT_SHADER, `#version 300 es
precision highp float;
uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_base1;
uniform vec3 u_base2;
uniform vec3 u_accent1;
uniform vec3 u_accent2;
uniform vec3 u_accent3;
out vec4 fragColor;

float hash12(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

vec3 patternColor(float column, float row, float time){
  float cellNoise = hash12(vec2(column, row));
  float colorDrift = 0.5 + 0.5 * sin(time * 0.31 + cellNoise * 6.28318);
  vec3 color = mix(u_base1, u_base2, colorDrift);
  if (cellNoise > 0.22) color = mix(color, u_base1, 0.55);
  if (cellNoise > 0.42) color = mix(color, u_base2, 0.62);
  if (cellNoise > 0.60) color = mix(color, u_accent1, 0.52);
  if (cellNoise > 0.76) color = mix(color, u_accent2, 0.68);
  if (cellNoise > 0.89) color = mix(color, u_accent3, 0.72);

  float tide = time * 0.54;
  float centerA =  6.0 + 2.8*sin(column*0.72 - tide*1.12) + 0.75*sin(column*0.23 + tide*0.46);
  float centerB = 14.5 + 3.1*sin(column*0.61 - tide*0.88 + 2.2) + 0.90*sin(column*0.19 + tide*0.39);
  float centerC = 23.0 + 2.6*sin(column*0.68 - tide*0.73 + 4.1) + 0.65*sin(column*0.27 + tide*0.34);
  float distanceA = abs(row - centerA);
  float distanceB = abs(row - centerB);
  float distanceC = abs(row - centerC);
  float widthPulse = 0.22 * sin(tide*0.67 + column*0.16);

  float aOuter  = 1.0 - smoothstep(3.25 + widthPulse, 4.05 + widthPulse, distanceA);
  float aMiddle = 1.0 - smoothstep(2.15, 2.90, distanceA);
  float aInner  = 1.0 - smoothstep(0.75, 1.55, distanceA);
  float aCore   = 1.0 - smoothstep(0.12, 0.62, distanceA);
  color = mix(color, u_accent2 * 1.1, aOuter);
  color = mix(color, u_accent1 * 1.05, aMiddle);
  color = mix(color, u_accent1 * 0.6, aInner);
  color = mix(color, vec3(0.08, 0.06, 0.12), aCore);

  float bOuter  = 1.0 - smoothstep(3.30 - widthPulse, 4.10 - widthPulse, distanceB);
  float bMiddle = 1.0 - smoothstep(2.15, 2.95, distanceB);
  float bInner  = 1.0 - smoothstep(0.75, 1.55, distanceB);
  float bCore   = 1.0 - smoothstep(0.12, 0.62, distanceB);
  color = mix(color, u_accent3 * 1.15, bOuter);
  color = mix(color, u_accent2 * 1.08, bMiddle);
  color = mix(color, u_accent1 * 0.65, bInner);
  color = mix(color, vec3(0.08, 0.06, 0.12), bCore);

  float cOuter  = 1.0 - smoothstep(3.20, 4.00, distanceC);
  float cMiddle = 1.0 - smoothstep(2.10, 2.90, distanceC);
  float cInner  = 1.0 - smoothstep(0.75, 1.55, distanceC);
  float cCore   = 1.0 - smoothstep(0.12, 0.62, distanceC);
  color = mix(color, u_accent2 * 1.12, cOuter);
  color = mix(color, u_accent3 * 1.05, cMiddle);
  color = mix(color, u_accent1 * 0.7, cInner);
  color = mix(color, vec3(0.08, 0.06, 0.12), cCore);

  return color;
}

void main(){
  vec2 uv = gl_FragCoord.xy / u_resolution;
  float columnCount = 20.0;
  float rowCount    = 56.0;
  float column = floor(uv.x * columnCount);
  float row    = floor(uv.y * rowCount);

  vec3 color = patternColor(column * 0.5, row * 0.5, u_time);
  fragColor = vec4(color, 1.0);
}
`)

    if (!vs || !fs) {
      canvas.style.display = 'none'
      return
    }

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vs)
    gl.attachShader(program, fs)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error(gl.getProgramInfoLog(program))
      return
    }

    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW)
    const loc = gl.getAttribLocation(program, 'a_position')
    gl.enableVertexAttribArray(loc)
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0)

    const uRes = gl.getUniformLocation(program, 'u_resolution')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uBase1 = gl.getUniformLocation(program, 'u_base1')
    const uBase2 = gl.getUniformLocation(program, 'u_base2')
    const uAccent1 = gl.getUniformLocation(program, 'u_accent1')
    const uAccent2 = gl.getUniformLocation(program, 'u_accent2')
    const uAccent3 = gl.getUniformLocation(program, 'u_accent3')

    function getThemeColors() {
      const isDark = document.documentElement.dataset.theme === 'dark'

      if (isDark) {
        // 深色模式：科幻蓝紫色 + 电光青色
        return {
          base1: [0.08, 0.15, 0.35],      // 深蓝
          base2: [0.15, 0.22, 0.50],      // 钴蓝
          accent1: [0.20, 0.50, 0.85],    // 电光蓝
          accent2: [0.30, 0.85, 0.95],    // 霓虹青
          accent3: [0.45, 0.30, 0.80]     // 紫蓝
        }
      } else {
        // 浅色模式：柔和科幻调
        return {
          base1: [0.75, 0.85, 0.95],      // 浅冰蓝
          base2: [0.70, 0.80, 0.92],      // 天蓝
          accent1: [0.40, 0.65, 0.90],    // 中蓝
          accent2: [0.35, 0.75, 0.85],    // 青色
          accent3: [0.55, 0.50, 0.85]     // 淡紫蓝
        }
      }
    }

    function resize() {
      if (!canvas || !root || !gl) return
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75)
      const w = Math.max(1, Math.floor(root.clientWidth * dpr))
      const h = Math.max(1, Math.floor(root.clientHeight * dpr))
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w
        canvas.height = h
        gl.viewport(0, 0, w, h)
      }
    }

    const resizeObserver = new ResizeObserver(resize)
    resizeObserver.observe(root)

    let visible = true
    const intersectionObserver = new IntersectionObserver(([e]) => {
      visible = e ? e.isIntersecting : true
    })
    intersectionObserver.observe(root)

    let start = 0
    let rafId: number

    function frame(t: number) {
      if (!start) start = t
      if (visible && canvas && gl) {
        resize()
        gl.useProgram(program)
        gl.uniform2f(uRes, canvas.width, canvas.height)
        gl.uniform1f(uTime, (t - start) / 1000)

        const colors = getThemeColors()
        gl.uniform3fv(uBase1, colors.base1)
        gl.uniform3fv(uBase2, colors.base2)
        gl.uniform3fv(uAccent1, colors.accent1)
        gl.uniform3fv(uAccent2, colors.accent2)
        gl.uniform3fv(uAccent3, colors.accent3)

        gl.drawArrays(gl.TRIANGLES, 0, 6)
      }
      rafId = requestAnimationFrame(frame)
    }
    rafId = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(rafId)
      resizeObserver.disconnect()
      intersectionObserver.disconnect()
    }
  }, [])

  return (
    <div ref={rootRef} className={className}>
      <canvas ref={canvasRef} />
    </div>
  )
}
