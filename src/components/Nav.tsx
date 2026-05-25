import { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 60)
        rafRef.current = null
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Navegação principal">
      <div className="container nav-inner">
        <a href="/" className="nav-logo" aria-label="Innovat Consultoria — Página inicial">
          <img
            src="/inoovatLogo.webp"
            alt="Innovat Consultoria"
            width="180"
            height="54"
            fetchPriority="high"
            decoding="sync"
            loading="eager"
          />
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a
            href="#form-lead"
            className="nav-cta-link"
            aria-label="Solicitar cotação gratuita de plano de saúde"
          >
            Cotar Grátis
          </a>
        </div>
      </div>
    </nav>
  )
}
