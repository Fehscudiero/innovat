import { ArrowRight } from 'lucide-react'

interface CTASectionProps {
  whatsappNumber: string
  whatsappMsg: string
}

export default function CTASection({ whatsappNumber, whatsappMsg }: CTASectionProps) {
  return (
    <section className="cta-section" aria-labelledby="cta-heading" id="contato">
      <div className="container">
        <div className="cta-card">
          <div style={{ position: 'relative', zIndex: 1 }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '.5rem',
              background: 'rgba(255,255,255,.15)',
              border: '1px solid rgba(255,255,255,.25)',
              borderRadius: '2rem',
              padding: '.4375rem 1rem',
              fontSize: '.8125rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,.95)',
              marginBottom: '1.5rem',
            }}>
              ⚡ Resposta em até 15 minutos
            </span>

            <h2
              id="cta-heading"
              style={{
                fontSize: 'clamp(1.875rem, 4.5vw, 3rem)',
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-.03em',
                lineHeight: 1.1,
                marginBottom: '1rem',
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Pronto para proteger quem você ama?
            </h2>

            <p style={{
              fontSize: '1.0625rem',
              color: 'rgba(255,255,255,.75)',
              maxWidth: '500px',
              margin: '0 auto 2.5rem',
              lineHeight: 1.7,
            }}>
              Fale agora com um especialista e receba em minutos as melhores opções de plano
              para o seu perfil e orçamento — sem compromisso.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
              <a
                href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-wa"
                style={{ fontSize: '1.0625rem', padding: '1rem 2.5rem' }}
                aria-label="Falar com especialista no WhatsApp agora"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
                Falar com especialista agora
                <ArrowRight size={18} aria-hidden="true" />
              </a>

              <a
                href="#form-lead"
                style={{
                  fontSize: '.9375rem',
                  fontWeight: 600,
                  color: 'rgba(255,255,255,.7)',
                  textDecoration: 'underline',
                  textUnderlineOffset: '3px',
                }}
                aria-label="Preencher formulário de cotação"
              >
                ou preencher o formulário
              </a>
            </div>

            <p style={{ fontSize: '.8125rem', color: 'rgba(255,255,255,.4)', marginTop: '2rem' }}>
              Sem compromisso • Sem spam • 100% gratuito
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
