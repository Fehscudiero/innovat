import { CheckCircle2, ArrowRight } from 'lucide-react'
import HighlightWord from './HighlightWord'
import heroImg from '../assets/heroImg.webp'

const PLANOS_LIST = [
  'Saúde Empresarial',
  'Saúde PME & Individual',
  'Gestão Ambulatorial',
  'Seguro de Vida',
  'Odontológico',
  'MEI / Autônomo',
]

export default function PlanosSection() {
  return (
    <section className="planos-section premium-divider" aria-labelledby="planos-heading" id="planos">
      <div className="container">
        {/* Texto centralizado + grid de checkmarks */}
        <div style={{ maxWidth: '720px', marginInline: 'auto', textAlign: 'center', marginBottom: '3rem' }}>
          <span className="section-eyebrow">Nossos serviços</span>
          <h2 className="section-title" id="planos-heading">
            Planos de Saúde para cada{' '}
            <HighlightWord color="#0056A7" delay={0.2}>
              momento da sua vida
            </HighlightWord>
          </h2>
          <p className="section-subtitle" style={{ marginInline: 'auto' }}>
            Trabalhamos com todas as operadoras e realizamos uma análise de mercado completa
            para oferecer o melhor custo-benefício — individual, familiar ou empresarial.
          </p>
        </div>

        {/* Grid de checkmarks 2 ou 3 colunas */}
        <ul className="plano-list-centered" aria-label="Tipos de planos disponíveis">
          {PLANOS_LIST.map(p => (
            <li key={p} className="plano-item-centered">
              <div className="plano-check" aria-hidden="true">
                <CheckCircle2 size={15} />
              </div>
              {p}
            </li>
          ))}
        </ul>

        {/* Imagem Ilustrativa (heroImg.webp) */}
        <div style={{ textAlign: 'center', marginTop: '3.5rem', marginBottom: '2.5rem' }}>
          <img 
            src={heroImg} 
            alt="Pessoas felizes com saúde garantida" 
            loading="lazy"
            style={{ 
              maxWidth: '100%', 
              height: 'auto', 
              maxHeight: '650px',
              borderRadius: '1.25rem', 
              boxShadow: 'var(--shadow-lg)',
              marginInline: 'auto',
              width: '100%',
              objectFit: 'contain'
            }} 
          />
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <a
            href="#form-lead"
            className="btn btn-primary btn-primary-lg"
            aria-label="Solicitar cotação gratuita de plano de saúde"
          >
            Solicitar cotação gratuita
            <ArrowRight size={18} aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  )
}
