import React, { useEffect, useRef, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return
      rafRef.current = requestAnimationFrame(() => {
        setScrolled(window.scrollY > 48)
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
        <a href="/" className="nav-logo" aria-label="Innovat Saúde - Ir para o início">
          Innovat<span>.</span>
        </a>
        <a
          href="#form-lead"
          className="btn-cta"
          style={{ padding: '.625rem 1.25rem', fontSize: '.9375rem' }}
          aria-label="Faça sua cotação gratuita agora"
        >
          Cotar Grátis
        </a>
      </div>
    </nav>
  )
}
