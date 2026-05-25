import React from 'react'
import { ArrowRight, MessageCircle } from 'lucide-react'

interface CTASectionProps {
  whatsappNumber: string
  whatsappMsg: string
}

export default function CTASection({ whatsappNumber, whatsappMsg }: CTASectionProps) {
  return (
    <section
      className="cta-section"
      aria-labelledby="cta-heading"
      id="contato"
    >
      <div className="container">
        <div className="cta-card">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span
              style={{
                display: 'inline-block',
                background: 'rgba(249,115,22,.15)',
                border: '1px solid rgba(249,115,22,.3)',
                borderRadius: '2rem',
                padding: '.375rem 1rem',
                fontSize: '.8125rem',
                fontWeight: '600',
                color: '#fb923c',
                marginBottom: '1.25rem',
              }}
            >
              ⚡ Resposta em até 15 minutos
            </span>

            <h2
              id="cta-heading"
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: '900',
                color: '#fff',
                letterSpacing: '-.02em',
                lineHeight: '1.15',
                marginBottom: '1rem',
              }}
            >
              Pronto para proteger quem você ama?
            </h2>

            <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '500px', margin: '0 auto 2rem', lineHeight: '1.7' }}>
              Fale agora com um de nossos especialistas e receba em minutos as melhores opções de plano para seu perfil e orçamento.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-cta btn-cta--lg"
                style={{ background: '#25d366', boxShadow: '0 4px 24px rgba(37,211,102,.4)' }}
                aria-label="Falar com especialista no WhatsApp agora"
              >
                <MessageCircle size={20} aria-hidden="true" />
                Falar com especialista agora
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <a
                href="#form-lead"
                className="btn-cta"
                style={{ background: 'rgba(255,255,255,.08)', boxShadow: 'none', border: '1px solid rgba(255,255,255,.15)' }}
                aria-label="Preencher formulário de cotação"
              >
                Preencher formulário de cotação
              </a>
            </div>

            <p style={{ fontSize: '.8125rem', color: '#334155', marginTop: '1.5rem' }}>
              Sem compromisso • Sem spam • 100% gratuito
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
