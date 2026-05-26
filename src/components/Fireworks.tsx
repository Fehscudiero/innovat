import { useEffect, useRef, useImperativeHandle, forwardRef, useCallback } from 'react'

export interface FireworksHandle {
  launch: (target?: HTMLElement | null) => void
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
  '#38bdf8', // sky-400
  '#60a5fa', // blue-400
  '#34d399', // emerald-400
  '#fbbf24', // amber-400
  '#f472b6', // pink-400
  '#c084fc', // purple-400
  '#fb923c', // orange-400
  '#ffffff', // white
  '#1863DC', // brand blue
  '#22d3ee', // cyan-400
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

  const burst = useCallback((cx: number, cy: number, customCount?: number, customSpeed?: number) => {
    const count = customCount || (80 + Math.random() * 60)
    const baseSpeed = customSpeed || 4
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.4
      const speed = (baseSpeed * 0.6) + Math.random() * (baseSpeed * 0.8)
      particlesRef.current.push({
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        size: 1.5 + Math.random() * 3,
        decay: 0.008 + Math.random() * 0.008, // Decaimento mais lento para efeito duradouro
        gravity: 0.04 + Math.random() * 0.03, // Gravidade suave
      })
    }
  }, [])

  useImperativeHandle(ref, () => ({
    launch(target?: HTMLElement | null) {
      const canvas = canvasRef.current
      if (!canvas) return
      const W = canvas.width
      const H = canvas.height

      let cx = W * 0.5
      let cy = H * 0.4

      if (target) {
        const rect = target.getBoundingClientRect()
        cx = rect.left + rect.width / 2
        cy = rect.top + rect.height / 2
      }

      // Sequência de 5 explosões espetaculares ao redor do número:
      // 1. Imediato: no centro do número (faíscas concentradas)
      burst(cx, cy, 60, 3)

      // 2. +150ms: à esquerda e acima
      setTimeout(() => burst(cx - 90, cy - 40, 70, 4.5), 150)

      // 3. +300ms: à direita e acima
      setTimeout(() => burst(cx + 90, cy - 40, 70, 4.5), 300)

      // 4. +450ms: diretamente acima (explosão média)
      setTimeout(() => burst(cx, cy - 110, 90, 5), 450)

      // 5. +600ms: bem alto (grande explosão máster)
      setTimeout(() => burst(cx, cy - 180, 125, 6), 600)

      // Garante que o loop de animação esteja rodando
      if (rafRef.current !== null) {
        cancelAnimationFrame(rafRef.current)
      }
      setTimeout(() => {
        rafRef.current = requestAnimationFrame(animate)
      }, 30)
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
