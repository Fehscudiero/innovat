import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'

import HighlightWord from './HighlightWord'

const NAV_LINKS = [
  { href: '#hero', label: 'Home' },
  { href: '#beneficios', label: 'Benefícios' },
  { href: '#planos', label: 'Serviços' },
  { href: '#faq', label: 'Dúvidas' },
  { href: '#contato', label: 'Contato' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
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

  // Observe active sections for nav highlights
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: '-20% 0px -60% 0px' }
    )

    const observedIds = new Set<string>()

    const interval = setInterval(() => {
      let allFound = true
      NAV_LINKS.forEach(link => {
        const id = link.href.slice(1)
        if (!observedIds.has(id)) {
          const el = document.getElementById(id)
          if (el) {
            observer.observe(el)
            observedIds.add(id)
          } else {
            allFound = false
          }
        }
      })
      if (allFound) clearInterval(interval)
    }, 500)

    // Tenta de imediato também
    NAV_LINKS.forEach(link => {
      const id = link.href.slice(1)
      const el = document.getElementById(id)
      if (el) {
        observer.observe(el)
        observedIds.add(id)
      }
    })

    return () => {
      clearInterval(interval)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} aria-label="Navegação principal">
        <div className="container nav-inner">
          <a href="/" className="nav-logo" aria-label="Alpha Convênios — Página inicial">
            <img
              src="/logo.webp"
              alt="Alpha Convênios"
              width="267"
              height="80"
              fetchPriority="high"
              decoding="sync"
              loading="eager"
              style={{ maxWidth: '267px', height: 'auto' }}
            />
          </a>

          {/* DESKTOP LINKS */}
          <div className="nav-links-desktop">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href.slice(1)
              return (
                <a key={link.label} href={link.href} className={`nav-link ${isActive ? 'active' : ''}`}>
                  <HighlightWord 
                    triggerMode="controlled" 
                    isActive={isActive} 
                    color="#7dd3fc"
                  >
                    {link.label}
                  </HighlightWord>
                </a>
              )
            })}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <a
              href="#form-lead"
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
          {NAV_LINKS.map(link => {
            const isActive = activeSection === link.href.slice(1)
            return (
              <a
                key={link.label}
                href={link.href}
                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
              >
                <HighlightWord 
                  triggerMode="controlled" 
                  isActive={isActive} 
                  color="var(--brand-primary)"
                >
                  {link.label}
                </HighlightWord>
              </a>
            )
          })}
          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center' }}>
            <a
              href="#form-lead"
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
