import React, { useState, useCallback, useId } from 'react'
import { Plus } from 'lucide-react'

const FAQS = [
  {
    q: 'Existe período de carência nos planos?',
    a: 'Sim. A ANS regulamenta as carências: urgências/emergências têm carência máxima de 24h, partos a termo de 300 dias e demais procedimentos de até 180 dias. Para planos empresariais a partir de 30 vidas, é possível negociar a redução ou isenção de carências com as operadoras.',
  },
  {
    q: 'O que é coparticipação e como afeta meu plano?',
    a: 'Coparticipação é um modelo em que você paga uma porcentagem ou valor fixo por consulta, exame ou internação. Planos com coparticipação têm mensalidades menores — ideal para quem usa o plano eventualmente. Já planos sem coparticipação têm mensalidade maior, mas cobrem 100% dos procedimentos previstos.',
  },
  {
    q: 'Como funcionam os reajustes anuais?',
    a: 'Planos individuais/familiares têm reajuste máximo anual definido pela ANS. Planos coletivos (empresariais) são negociados diretamente com as operadoras. Nossa equipe avisa antes de qualquer reajuste e avalia se vale a pena migrar de operadora.',
  },
  {
    q: 'Posso incluir dependentes no plano?',
    a: 'Sim! Cônjuge, filhos (até 24 anos se estudantes) e dependentes econômicos podem ser incluídos. Para planos empresariais, as regras variam por operadora. Verificamos a melhor opção para seu caso gratuitamente.',
  },
  {
    q: 'O plano cobre consultas com especialistas e exames?',
    a: 'Depende do segmento contratado (Ambulatorial, Hospitalar ou Referência). Os planos que trabalhamos incluem a cobertura mínima obrigatória pela ANS. Apresentamos um comparativo completo antes de você decidir.',
  },
  {
    q: 'Como funciona a portabilidade de carências?',
    a: 'Se você já possui plano de saúde há mais de 2 anos, pode migrar para um novo plano sem cumprir nova carência para doenças ou lesões já cobertas — desde que faça a portabilidade corretamente. Nossa equipe cuida de todo esse processo para você.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const uid = useId()
  const toggle = useCallback((i: number) => setOpenIndex(p => p === i ? null : i), [])

  return (
    <section className="faq-section" aria-labelledby="faq-heading" id="faq">
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
          <span className="section-eyebrow">Dúvidas frequentes</span>
          <h2 className="section-title" id="faq-heading">
            Respondemos suas principais objeções
          </h2>
          <p className="section-subtitle" style={{ marginInline: 'auto' }}>
            Transparência total antes, durante e depois da contratação.
          </p>
        </div>

        <dl className="faq-list">
          {FAQS.map(({ q, a }, i) => {
            const isOpen = openIndex === i
            const tid = `${uid}-faq-t-${i}`
            const pid = `${uid}-faq-p-${i}`
            return (
              <div key={i} className={`faq-item${isOpen ? ' open' : ''}`}>
                <dt>
                  <button
                    id={tid}
                    className="faq-trigger"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={pid}
                    type="button"
                  >
                    <span className="faq-question">{q}</span>
                    <div className="faq-icon-wrap" aria-hidden="true">
                      <Plus size={16} />
                    </div>
                  </button>
                </dt>
                <dd id={pid} className="faq-answer-wrapper" role="region" aria-labelledby={tid}>
                  <p className="faq-answer">{a}</p>
                </dd>
              </div>
            )
          })}
        </dl>

        <div style={{ textAlign: 'center', marginTop: '2.75rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '.9375rem', marginBottom: '1.125rem' }}>
            Não encontrou sua dúvida? Fale diretamente com um especialista.
          </p>
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            aria-label="Tirar dúvidas pelo WhatsApp"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Tirar dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
