import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react'

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
  '#f472b6', '#a78bfa', '#fb923c', '#ffffff',
  '#1863DC', '#06b6d4',
]

const Fireworks = forwardRef<FireworksHandle>((_, ref) => {
  const canvasRef    = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const rafRef       = useRef<number | null>(null)

  const animate = useCallback(() => {
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

      if (p.alpha > 0.01) {
        ctx.globalAlpha = Math.min(p.alpha, 1)
        ctx.fillStyle   = p.color
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
      rafRef.current = null
    }
  }, [])

  const burst = useCallback((cx: number, cy: number) => {
    const count = 80 + Math.random() * 60
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
      const speed = 2.5 + Math.random() * 5
      particlesRef.current.push({
        x: cx, y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 2 + Math.random() * 3,
        decay: 0.012 + Math.random() * 0.01,
        gravity: 0.06 + Math.random() * 0.04,
      })
    }
  }, [])

  useImperativeHandle(ref, () => ({
    launch() {
      const canvas = canvasRef.current
      if (!canvas) return
      const W = canvas.width
      const H = canvas.height

      const positions = [
        [W * 0.50, H * 0.35],
        [W * 0.25, H * 0.45],
        [W * 0.75, H * 0.45],
        [W * 0.35, H * 0.25],
        [W * 0.65, H * 0.25],
      ]

      particlesRef.current = []
      positions.forEach(([x, y], i) => {
        setTimeout(() => burst(x, y), i * 220)
      })

      // Garante que o loop só rode uma vez
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      // Pequeno delay para deixar o 1º burst ser criado
      setTimeout(() => {
        rafRef.current = requestAnimationFrame(animate)
      }, 50)
    },
  }), [animate, burst])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    return () => {
      window.removeEventListener('resize', resize)
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
        rafRef.current = null
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        width: '100vw',
        height: '100vh',
      }}
    />
  )
})

Fireworks.displayName = 'Fireworks'
export default Fireworks
