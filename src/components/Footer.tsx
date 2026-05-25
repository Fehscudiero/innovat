import { useState } from 'react'
import { Phone, Mail, MapPin, ShieldCheck, ChevronRight } from 'lucide-react'
import LegalModal, { type ModalType } from './LegalModal'

export default function Footer() {
  const year = new Date().getFullYear()
  const [activeModal, setActiveModal] = useState<ModalType>(null)

  return (
    <>
      <footer className="footer-modern" role="contentinfo">
        
        {/* ── TOP CTA EMbutido ── */}
        <div className="footer-cta-band">
          <div className="container footer-cta-content">
            <div className="footer-cta-text">
              <h3>Ainda tem dúvidas sobre qual plano escolher?</h3>
              <p>Nossos especialistas estão prontos para analisar seu perfil gratuitamente.</p>
            </div>
            <a href="#hero" className="btn btn-primary footer-btn-cta">
              Falar com especialista
            </a>
          </div>
        </div>

        <div className="container">
          <div className="footer-grid-modern">
            
            {/* COLUNA 1: BRAND & SOCIAL */}
            <div className="footer-col-brand">
              <img
                src="/logo.png"
                alt="Alpha Convênios"
                width="320"
                height="96"
                loading="lazy"
                decoding="async"
                className="footer-logo-modern"
              />
              <p className="footer-desc-modern">
                Corretora de planos de saúde independente, comprometida com a sua tranquilidade.
                Analisamos as melhores operadoras para você tomar a decisão exata.
              </p>
            </div>

            {/* COLUNA 2: NAVEGAÇÃO RÁPIDA */}
            <nav className="footer-col-nav" aria-label="Links rápidos">
              <h4 className="footer-heading-modern">Navegação</h4>
              <ul className="footer-nav-list">
                <li><a href="#beneficios" className="footer-link-modern"><ChevronRight size={14} className="link-arrow"/> Benefícios</a></li>
                <li><a href="#planos" className="footer-link-modern"><ChevronRight size={14} className="link-arrow"/> Planos disponíveis</a></li>
                <li><a href="#faq" className="footer-link-modern"><ChevronRight size={14} className="link-arrow"/> Dúvidas frequentes</a></li>
                <li><a href="#hero" className="footer-link-modern"><ChevronRight size={14} className="link-arrow"/> Solicitar cotação</a></li>
              </ul>
            </nav>

            {/* COLUNA 3: CONTATO */}
            <div className="footer-col-contact">
              <h4 className="footer-heading-modern">Fale Conosco</h4>
              <ul className="footer-contact-list">
                <li>
                  <Phone size={16} className="contact-icon" aria-hidden="true" />
                  <a href="tel:+5511969282807">(11) 96928-2807</a>
                </li>
                <li>
                  <Mail size={16} className="contact-icon" aria-hidden="true" />
                  <a href="mailto:contato@alphaconvenios.com.br">contato@alphaconvenios.com.br</a>
                </li>
                <li>
                  <MapPin size={16} className="contact-icon" aria-hidden="true" />
                  <span>São Paulo — SP</span>
                </li>
              </ul>
            </div>

            {/* COLUNA 4: LEGAL E BADGES */}
            <div className="footer-col-trust">
              <h4 className="footer-heading-modern">Segurança</h4>
              <div className="trust-badges">
                <div className="trust-badge">
                  <ShieldCheck size={18} className="badge-icon" />
                  <div>
                    <span className="badge-title">CNPJ Verificado</span>
                    <span className="badge-value">00.000.000/0001-00</span>
                  </div>
                </div>
                <div className="trust-badge">
                  <ShieldCheck size={18} className="badge-icon" />
                  <div>
                    <span className="badge-title">Registro ANS</span>
                    <span className="badge-value">000000</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* ── LINHA INFERIOR (COPYRIGHT E POLÍTICAS) ── */}
          <div className="footer-bottom-modern">
            <div className="footer-bottom-content">
              <p className="copyright-text">
                © {year} Alpha Convênios — Todos os direitos reservados.
              </p>
              <div className="footer-legal-links">
                <button type="button" onClick={() => setActiveModal('termos')} className="btn-legal">Termos de Uso</button>
                <span className="dot-separator">•</span>
                <button type="button" onClick={() => setActiveModal('privacidade')} className="btn-legal">Política de Privacidade</button>
              </div>
            </div>
            <p className="disclaimer-text">
              As informações deste site são de caráter informativo e não constituem oferta formal de seguro. Valores sujeitos à análise cadastral da operadora.
            </p>
          </div>
        </div>
      </footer>
      
      {/* MONTA O MODAL AQUI */}
      <LegalModal type={activeModal} onClose={() => setActiveModal(null)} />
    </>
  )
}
