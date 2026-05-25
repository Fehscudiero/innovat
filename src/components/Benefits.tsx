import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Zap, Clock, HeadphonesIcon, BadgeCheck, TrendingDown, FileText,
  Phone, Globe, Lock, Award
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

interface Benefit {
  icon: React.ReactNode
  title: string
  desc: string
  accent: string
}

const BENEFITS: Benefit[] = [
  {
    icon: <Clock size={22} aria-hidden="true" />,
    title: 'Cotação em 5 minutos',
    desc: 'Receba propostas comparadas das principais operadoras do mercado sem sair de casa.',
    accent: '#60a5fa',
  },
  {
    icon: <HeadphonesIcon size={22} aria-hidden="true" />,
    title: 'Atendimento humanizado',
    desc: 'Fale com um especialista real, sem robôs ou URA. Suporte completo no WhatsApp.',
    accent: '#34d399',
  },
  {
    icon: <TrendingDown size={22} aria-hidden="true" />,
    title: 'Melhor custo-benefício',
    desc: 'Negociamos diretamente com as operadoras para garantir o menor preço para você.',
    accent: '#fb923c',
  },
  {
    icon: <BadgeCheck size={22} aria-hidden="true" />,
    title: 'Suporte pós-venda',
    desc: 'Não sumimos após a venda. Auxiliamos em autorizações, reembolsos e 2ª via de boleto.',
    accent: '#a78bfa',
  },
  {
    icon: <Zap size={22} aria-hidden="true" />,
    title: 'Ativação rápida',
    desc: 'Seu plano ativado em até 48h úteis com carência mínima conforme regras da ANS.',
    accent: '#facc15',
  },
  {
    icon: <FileText size={22} aria-hidden="true" />,
    title: 'Zero burocracia',
    desc: 'Cuidamos de toda a papelada. Você só precisa assinar e aguardar sua carteirinha.',
    accent: '#f43f5e',
  },
]

const STATS = [
  { value: '12k+', label: 'Famílias atendidas' },
  { value: '98%', label: 'Satisfação dos clientes' },
  { value: '5 min', label: 'Tempo médio de cotação' },
  { value: '48h', label: 'Ativação do plano' },
]

export default function Benefits() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!cardsRef.current) return
      const cards = Array.from(cardsRef.current.children)
      gsap.from(cards, {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: cardsRef.current,
          start: 'top 85%',
          once: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="benefits-section"
      ref={sectionRef}
      aria-labelledby="benefits-heading"
      id="beneficios"
    >
      <div className="container">
        {/* STATS BAR */}
        <div className="stats-bar" role="region" aria-label="Estatísticas da Innovat Saúde">
          <div className="container">
            <dl className="stats-grid">
              {STATS.map(({ value, label }) => (
                <div key={label}>
                  <dt className="stat-value" aria-label={`${value} ${label}`}>{value}</dt>
                  <dd className="stat-label">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        {/* BENEFITS HEADER */}
        <div style={{ marginTop: '4rem', marginBottom: '1rem' }}>
          <span className="section-eyebrow">Por que escolher a Innovat</span>
          <h2 className="section-title" id="benefits-heading">
            Sua saúde merece o melhor atendimento
          </h2>
          <p className="section-subtitle">
            Somos uma corretora independente. Isso significa que trabalhamos para você, não para as operadoras.
          </p>
        </div>

        {/* CARDS GRID */}
        <div className="benefits-grid" ref={cardsRef}>
          {BENEFITS.map(({ icon, title, desc, accent }) => (
            <article
              key={title}
              className="benefit-card"
              aria-label={title}
            >
              <div
                className="benefit-icon"
                style={{ background: `${accent}18`, color: accent }}
                aria-hidden="true"
              >
                {icon}
              </div>
              <h3 className="benefit-title">{title}</h3>
              <p className="benefit-desc">{desc}</p>
            </article>
          ))}
        </div>

        {/* OPERATORS LOGOS PLACEHOLDER */}
        <div style={{
          marginTop: '3rem',
          padding: '2rem',
          background: 'rgba(255,255,255,.03)',
          borderRadius: '1rem',
          border: '1px solid rgba(255,255,255,.07)',
          textAlign: 'center',
        }}>
          <p style={{ fontSize: '.8125rem', color: '#475569', marginBottom: '1.5rem', fontWeight: '600', letterSpacing: '.08em', textTransform: 'uppercase' }}>
            Operadoras parceiras
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
            {['Bradesco Saúde', 'Amil', 'SulAmérica', 'Unimed', 'Porto Seguro', 'NotreDame'].map(op => (
              <div key={op} style={{
                padding: '.625rem 1.25rem',
                background: 'rgba(255,255,255,.05)',
                borderRadius: '.625rem',
                border: '1px solid rgba(255,255,255,.08)',
                fontSize: '.875rem',
                fontWeight: '700',
                color: '#64748b',
                display: 'flex',
                alignItems: 'center',
                gap: '.5rem',
              }}>
                <Globe size={14} aria-hidden="true" />
                {op}
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
