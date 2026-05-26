import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react'

export interface FireworksHandle {
  launch: () => void
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  alpha: number
  color: string
  size: number
  decay: number
  gravity: number
}

const COLORS = [
  '#7dd3fc', '#60a5fa', '#34d399', '#fbbf24',
  '#f472b6', '#a78bfa', '#fb923c', '#fff',
  '#1863DC', '#06b6d4',
]

function createBurst(cx: number, cy: number, particles: Particle[]) {
  const count = 80 + Math.random() * 60
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
    const speed = 2.5 + Math.random() * 5
    particles.push({
      x: cx,
      y: cy,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 2 + Math.random() * 3,
      decay: 0.012 + Math.random() * 0.01,
      gravity: 0.06 + Math.random() * 0.04,
    })
  }
}

const Fireworks = forwardRef<FireworksHandle>((_, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef = useRef<number>(0)
  const activeRef = useRef(false)

  useImperativeHandle(ref, () => ({
    launch() {
      const canvas = canvasRef.current
      if (!canvas) return
      const W = canvas.width
      const H = canvas.height

      // 5 explosões em posições variadas
      const bursts = [
        [W * 0.5,  H * 0.35],
        [W * 0.25, H * 0.45],
        [W * 0.75, H * 0.45],
        [W * 0.35, H * 0.25],
        [W * 0.65, H * 0.25],
      ]

      particlesRef.current = []
      bursts.forEach(([x, y], i) => {
        setTimeout(() => createBurst(x, y, particlesRef.current), i * 220)
      })

      if (!activeRef.current) {
        activeRef.current = true
        animate()
      }
    },
  }))

  function animate() {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const alive: Particle[] = []
    for (const p of particlesRef.current) {
      p.x  += p.vx
      p.y  += p.vy
      p.vy += p.gravity
      p.vx *= 0.98
      p.alpha -= p.decay

      if (p.alpha > 0) {
        ctx.globalAlpha = p.alpha
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
        alive.push(p)
      }
    }
    ctx.globalAlpha = 1
    particlesRef.current = alive

    if (alive.length > 0) {
      rafRef.current = requestAnimationFrame(animate)
    } else {
      activeRef.current = false
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        width: '100%',
        height: '100%',
      }}
    />
  )
})

Fireworks.displayName = 'Fireworks'
export default Fireworks
