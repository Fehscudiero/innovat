import React from 'react'
import { Phone, Mail, MapPin, Shield } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">

          {/* BRAND */}
          <div>
            <img
              src="/inoovatLogo.webp"
              alt="Innovat Consultoria"
              width="160"
              height="48"
              loading="lazy"
              decoding="async"
              className="footer-logo"
            />
            <p className="footer-desc">
              Corretora de planos de saúde independente, comprometida com a sua tranquilidade.
              Comparamos as melhores operadoras para você tomar a decisão certa.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.875rem', color: 'rgba(255,255,255,.45)' }}>
                <Phone size={14} aria-hidden="true" />
                <span>(11) 99999-9999</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '.5rem', fontSize: '.875rem', color: 'rgba(255,255,255,.45)' }}>
                <Mail size={14} aria-hidden="true" />
                <span>contato@innovatconsultoria.com.br</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '.5rem', fontSize: '.875rem', color: 'rgba(255,255,255,.45)' }}>
                <MapPin size={14} style={{ marginTop: '2px', flexShrink: 0 }} aria-hidden="true" />
                <span>São Paulo — SP</span>
              </div>
            </div>
          </div>

          {/* LINKS */}
          <nav aria-label="Links do rodapé">
            <p className="footer-heading">Navegação</p>
            <a href="#beneficios" className="footer-link">Benefícios</a>
            <a href="#planos" className="footer-link">Planos disponíveis</a>
            <a href="#faq" className="footer-link">Dúvidas frequentes</a>
            <a href="#form-lead" className="footer-link">Solicitar cotação</a>
            <a href="#contato" className="footer-link">Fale conosco</a>
          </nav>

          {/* LEGAL */}
          <div>
            <p className="footer-heading">Informações legais</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.625rem' }}>
              <div style={{ display: 'flex', gap: '.5rem', alignItems: 'flex-start', fontSize: '.85rem', color: 'rgba(255,255,255,.4)' }}>
                <Shield size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <span>CNPJ: 00.000.000/0001-00</span>
              </div>
              <div style={{ display: 'flex', gap: '.5rem', alignItems: 'flex-start', fontSize: '.85rem', color: 'rgba(255,255,255,.4)' }}>
                <Shield size={14} style={{ color: '#34d399', flexShrink: 0, marginTop: '2px' }} aria-hidden="true" />
                <span>Registro ANS: 000000</span>
              </div>
            </div>

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                style={{ fontSize: '.8125rem', color: 'rgba(255,255,255,.4)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                aria-label="Política de privacidade"
              >
                Política de Privacidade
              </button>
              <button
                type="button"
                style={{ fontSize: '.8125rem', color: 'rgba(255,255,255,.4)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
                aria-label="Termos de uso"
              >
                Termos de Uso
              </button>
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© {year} Innovat Consultoria — Todos os direitos reservados.</p>
          <p style={{ maxWidth: '480px', fontSize: '.75rem' }}>
            As informações deste site são de caráter informativo e não constituem oferta formal de seguro.
            Valores sujeitos à análise cadastral da operadora.
          </p>
        </div>
      </div>
    </footer>
  )
}
