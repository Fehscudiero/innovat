import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

const NAV_LINKS = [
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#planos', label: 'Serviços' },
  { href: '#faq', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
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

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Navegação principal">
        <div className="container nav-inner">
          <a href="/" className="nav-logo" aria-label="Alpha Convênios — Página inicial">
            <img
              src="/logo.png"
              alt="Alpha Convênios"
              width="267"
              height="80"
              fetchPriority="high"
              decoding="sync"
              loading="eager"
            />
          </a>

          {/* DESKTOP LINKS */}
          <div className="nav-links-desktop">
            {NAV_LINKS.map(link => (
              <a key={link.label} href={link.href} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="#hero"
              className="nav-cta-link"
              aria-label="Solicitar cotação gratuita de plano de saúde"
            >
              Cotar Grátis
            </a>

            {/* MOBILE MENU BUTTON */}
            <button
              className="nav-mobile-btn"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-expanded={menuOpen}
              aria-label="Alternar menu de navegação"
            >
              {menuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      <div className={`mobile-menu-overlay ${menuOpen ? 'open' : ''}`} aria-hidden={!menuOpen}>
        <div className="mobile-menu-content">
          {NAV_LINKS.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="mobile-nav-link"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              {link.label}
            </a>
          ))}
          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <a
              href="#hero"
              className="btn btn-primary"
              onClick={() => setMenuOpen(false)}
              tabIndex={menuOpen ? 0 : -1}
            >
              Solicitar cotação agora
            </a>
          </div>
        </div>
      </div>
    </>
  )
}
