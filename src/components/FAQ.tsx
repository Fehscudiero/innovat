import React, { useState, useCallback, useId } from 'react'
import { Plus } from 'lucide-react'

interface FAQItem {
  q: string
  a: string
}

const FAQS: FAQItem[] = [
  {
    q: 'Existe período de carência nos planos?',
    a: 'Sim. A ANS regulamenta as carências: urgências/emergências têm carência máxima de 24h, partos a termo de 300 dias, e demais procedimentos de até 180 dias. Para planos empresariais a partir de 30 vidas, é possível negociar a redução ou isenção de carências com as operadoras.',
  },
  {
    q: 'O que é coparticipação e como afeta meu uso do plano?',
    a: 'Coparticipação é um modelo onde você paga uma porcentagem ou valor fixo por consulta, exame ou internação. Planos com coparticipação costumam ter mensalidades menores. É ideal para quem usa o plano eventualmente. Planos sem coparticipação têm mensalidade maior, mas cobrem 100% dos procedimentos previstos em contrato.',
  },
  {
    q: 'Como funcionam os reajustes anuais?',
    a: 'Os planos individuais/familiares têm reajuste máximo anual definido pela ANS. Planos coletivos (empresariais) são negociados diretamente com as operadoras e podem ter variações diferentes. Nós te avisamos antes de qualquer reajuste e avaliamos se vale migrar para outra operadora.',
  },
  {
    q: 'Posso incluir dependentes no meu plano?',
    a: 'Sim. Cônjuge, filhos (até 24 anos se estudantes) e dependentes econômicos podem ser incluídos. Para planos empresariais, as regras variam conforme a operadora. Podemos verificar a melhor opção para o seu caso gratuitamente.',
  },
  {
    q: 'O plano cobre consultas com especialistas e exames?',
    a: 'Depende do segmento (Ambulatorial, Hospitalar ou Referência). Os planos que trabalhamos incluem cobertura mínima obrigatória pela ANS. Apresentamos um comparativo completo de cobertura antes de você decidir.',
  },
  {
    q: 'Como faço para cancelar meu plano atual e migrar para um novo?',
    a: 'Orientamos todo o processo de cancelamento e portabilidade de carências — o que significa que você pode migrar de plano sem cumprir nova carência para doenças ou lesões preexistentes já cobertas. Cuide disso sem burocracia com nossa assessoria.',
  },
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const id = useId()

  const toggle = useCallback((i: number) => {
    setOpenIndex(prev => prev === i ? null : i)
  }, [])

  return (
    <section
      className="faq-section"
      aria-labelledby="faq-heading"
      id="faq"
    >
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
            const triggerId = `${id}-faq-trigger-${i}`
            const panelId = `${id}-faq-panel-${i}`

            return (
              <div
                key={i}
                className={`faq-item${isOpen ? ' open' : ''}`}
              >
                <dt>
                  <button
                    id={triggerId}
                    className="faq-trigger"
                    onClick={() => toggle(i)}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    type="button"
                  >
                    <span className="faq-question">{q}</span>
                    <Plus
                      className="faq-icon"
                      aria-hidden="true"
                      size={20}
                    />
                  </button>
                </dt>
                <dd
                  id={panelId}
                  className="faq-answer-wrapper"
                  role="region"
                  aria-labelledby={triggerId}
                >
                  <p className="faq-answer">{a}</p>
                </dd>
              </div>
            )
          })}
        </dl>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <p style={{ color: '#475569', fontSize: '.9375rem', marginBottom: '1rem' }}>
            Não encontrou sua dúvida? Fale diretamente com um especialista.
          </p>
          <a
            href="https://wa.me/5511999999999?text=Ol%C3%A1%2C+tenho+d%C3%BAvidas+sobre+planos+de+sa%C3%BAde"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-cta"
            aria-label="Tirar dúvidas pelo WhatsApp agora"
          >
            Tirar dúvidas no WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}
