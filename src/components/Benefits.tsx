import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Clock, HeadphonesIcon, TrendingDown, BadgeCheck, Zap, FileText } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Benefit { icon: React.ReactNode; title: string; desc: string }

const BENEFITS: Benefit[] = [
  {
    icon: <Clock size={22} aria-hidden="true" />,
    title: 'Cotação em 5 minutos',
    desc: 'Receba propostas comparadas das principais operadoras do mercado sem sair de casa.',
  },
  {
    icon: <HeadphonesIcon size={22} aria-hidden="true" />,
    title: 'Atendimento humanizado',
    desc: 'Fale com um especialista real, sem robôs. Suporte completo pelo WhatsApp, 7 dias por semana.',
  },
  {
    icon: <TrendingDown size={22} aria-hidden="true" />,
    title: 'Melhor custo-benefício',
    desc: 'Negociamos diretamente com as operadoras para garantir o menor preço para o seu perfil.',
  },
  {
    icon: <BadgeCheck size={22} aria-hidden="true" />,
    title: 'Suporte pós-venda completo',
    desc: 'Auxiliamos em autorizações, reembolsos, 2ª via de boleto e negociações com as operadoras.',
  },
  {
    icon: <Zap size={22} aria-hidden="true" />,
    title: 'Ativação em até 48h',
    desc: 'Seu plano ativado rapidamente com carência mínima conforme as regras da ANS.',
  },
  {
    icon: <FileText size={22} aria-hidden="true" />,
    title: 'Zero burocracia',
    desc: 'Cuidamos de toda a documentação. Você só precisa assinar e aguardar sua carteirinha chegar.',
  },
]

const STATS = [
  { value: '+12.000', label: 'Famílias atendidas' },
  { value: '98%',    label: 'Satisfação dos clientes' },
  { value: '5 min',  label: 'Tempo médio de cotação' },
  { value: '48h',    label: 'Ativação do plano' },
]

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return
      gsap.from(Array.from(cardsRef.current.children), {
        y: 36,
        opacity: 0,
        duration: .55,
        stagger: .07,
        ease: 'power2.out',
        scrollTrigger: { trigger: cardsRef.current, start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <>
      {/* ── STATS BAR ── */}
      <section className="stats-section" aria-label="Números da Innovat Consultoria">
        <div className="container">
          <dl className="stats-grid">
            {STATS.map(({ value, label }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <dt className="stat-value">{value}</dt>
                <dd className="stat-label">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── BENEFITS CARDS ── */}
      <section
        className="benefits-section"
        ref={sectionRef}
        aria-labelledby="benefits-heading"
        id="beneficios"
      >
        <div className="container">
          <span className="section-eyebrow">Por que escolher a Innovat</span>
          <h2 className="section-title" id="benefits-heading">
            Sua saúde merece o melhor atendimento
          </h2>
          <p className="section-subtitle">
            Somos uma corretora independente — trabalhamos para você, não para as operadoras.
          </p>

          <div className="benefits-grid" ref={cardsRef}>
            {BENEFITS.map(({ icon, title, desc }) => (
              <article key={title} className="benefit-card" aria-label={title}>
                <div className="benefit-icon-wrap" aria-hidden="true">{icon}</div>
                <h3 className="benefit-title">{title}</h3>
                <p className="benefit-desc">{desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
