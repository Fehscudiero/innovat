import React from 'react'
import { CheckCircle2 } from 'lucide-react'
import { ArrowRight } from 'lucide-react'

const PLANOS_LIST = [
  'Saúde Empresarial',
  'Saúde PME & Individual',
  'Gestão Ambulatorial',
  'Seguro de Vida',
  'Odontológico',
  'MEI / Autônomo',
]

const OPERADORAS = [
  'alice', 'SulAmérica', 'Unimed', 'Hapvida',
  'amil', 'Porto Saúde', 'bradesco saúde', 'Blue Med', 'NotreDame',
]

export default function PlanosSection() {
  return (
    <>
      {/* ── PLANOS ── */}
      <section className="planos-section" aria-labelledby="planos-heading" id="planos">
        <div className="container">
          <div className="planos-two-col">

            {/* LEFT COPY */}
            <div>
              <span className="section-eyebrow">Nossos serviços</span>
              <h2 className="section-title" id="planos-heading">
                Planos de Saúde para cada momento da sua vida
              </h2>
              <p className="section-subtitle">
                Trabalhamos com todas as operadoras e realizamos uma análise de mercado completa para
                oferecer o melhor custo-benefício — tanto individual como empresarial.
              </p>

              <ul className="plano-list" aria-label="Tipos de planos disponíveis">
                {PLANOS_LIST.map(p => (
                  <li key={p} className="plano-item">
                    <div className="plano-check" aria-hidden="true">
                      <CheckCircle2 size={14} />
                    </div>
                    {p}
                  </li>
                ))}
              </ul>

              <a
                href="#form-lead"
                className="btn btn-primary"
                aria-label={`Solicitar cotação de planos de saúde`}
              >
                Solicitar cotação gratuita
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </div>

            {/* RIGHT IMAGE */}
            <div className="planos-img-wrap">
              <img
                src="/planos.webp"
                alt="Operadoras de planos de saúde parceiras da Innovat Consultoria: Alice, SulAmérica, Unimed, Hapvida, Amil, Porto Saúde, Bradesco Saúde, Blue Med e NotreDame Intermédica"
                width="800"
                height="267"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── OPERADORAS STRIP ── */}
      <section className="operadoras-section" aria-labelledby="operadoras-heading">
        <div className="container">
          <p
            id="operadoras-heading"
            style={{
              textAlign: 'center',
              fontSize: '.8125rem',
              fontWeight: 700,
              color: 'var(--text-muted)',
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              marginBottom: '1.5rem',
            }}
          >
            Operadoras parceiras
          </p>
          <div style={{ display: 'flex', gap: '.875rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {OPERADORAS.map(op => (
              <div key={op} className="op-logo-chip">{op}</div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
