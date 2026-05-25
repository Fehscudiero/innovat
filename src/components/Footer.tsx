import React from 'react'
import { MessageCircle, Shield, Phone, Mail } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer-grid">

          {/* BRAND */}
          <div>
            <div className="footer-brand" aria-label="Innovat Saúde">
              Innovat<span style={{ color: 'var(--color-brand-400)' }}>.</span>
            </div>
            <p className="footer-desc">
              Corretora de planos de saúde independente, comprometida com a sua tranquilidade.
              Comparamos as melhores operadoras para você tomar a decisão certa.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/5511999999999"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta"
                style={{ padding: '.625rem 1.25rem', fontSize: '.875rem' }}
                aria-label="Chamar no WhatsApp"
              >
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* LINKS */}
          <nav aria-label="Links úteis">
            <p className="footer-heading">Links</p>
            <a href="#beneficios" className="footer-link">Benefícios</a>
            <a href="#faq" className="footer-link">Dúvidas frequentes</a>
            <a href="#form-lead" className="footer-link">Solicitar cotação</a>
            <a href="#contato" className="footer-link">Fale conosco</a>
          </nav>

          {/* LEGAL */}
          <div>
            <p className="footer-heading">Informações legais</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
              <div style={{ fontSize: '.8125rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '.375rem' }}>
                <Shield size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#34d399' }} aria-hidden="true" />
                <span>CNPJ: 00.000.000/0001-00</span>
              </div>
              <div style={{ fontSize: '.8125rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '.375rem' }}>
                <Shield size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#34d399' }} aria-hidden="true" />
                <span>Registro ANS: 000000</span>
              </div>
              <div style={{ fontSize: '.8125rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '.375rem' }}>
                <Phone size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#60a5fa' }} aria-hidden="true" />
                <span>(11) 99999-9999</span>
              </div>
              <div style={{ fontSize: '.8125rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '.375rem' }}>
                <Mail size={14} style={{ flexShrink: 0, marginTop: '2px', color: '#60a5fa' }} aria-hidden="true" />
                <span>contato@innovatsaude.com.br</span>
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button
                type="button"
                style={{ fontSize: '.8125rem', color: '#475569', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                aria-label="Abrir política de privacidade"
              >
                Política de Privacidade
              </button>
              <button
                type="button"
                style={{ fontSize: '.8125rem', color: '#475569', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                aria-label="Abrir termos de uso"
              >
                Termos de Uso
              </button>
            </div>
          </div>

        </div>

        <hr className="footer-divider" />

        <div className="footer-bottom">
          <p>© {currentYear} Innovat Saúde — Todos os direitos reservados.</p>
          <p style={{ maxWidth: '480px' }}>
            As informações neste site são de caráter informativo e não constituem oferta formal de seguro.
            Valores sujeitos a análise cadastral da operadora.
          </p>
        </div>
      </div>
    </footer>
  )
}
