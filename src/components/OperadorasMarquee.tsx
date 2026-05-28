import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

import imgAlice from '../assets/operadoras/alice.webp'
import imgAmil from '../assets/operadoras/amil.png'
import imgBluemed from '../assets/operadoras/bluemed.png'
import imgBradesco from '../assets/operadoras/bradesco-saude.webp'
import imgNotreDame from '../assets/operadoras/notredame.png'
import imgPorto from '../assets/operadoras/porto.png'
import imgSami from '../assets/operadoras/sami.webp'
import imgSulamerica from '../assets/operadoras/sulamerica.png'
import imgUnimed from '../assets/operadoras/unimed.png'

// PISTA 1: Vai para a ESQUERDA
const TRACK_1 = [
  { name: 'Amil', src: imgAmil },
  { name: 'Bradesco Saúde', src: imgBradesco },
  { name: 'NotreDame Intermédica', src: imgNotreDame, scale: 1.5 },
  { name: 'Porto Saúde', src: imgPorto, scale: 1.35 },
  { name: 'Unimed', src: imgUnimed, scale: 1.4 },
]

// PISTA 2: Vai para a DIREITA (Parallax oposto)
const TRACK_2 = [
  { name: 'Alice', src: imgAlice },
  { name: 'Blue Med', src: imgBluemed, scale: 1.4 },
  { name: 'Sami', src: imgSami },
  { name: 'SulAmérica', src: imgSulamerica },
]

// Multiplicadores pesados para preencher 4K sem buracos
const T1_FULL = [...TRACK_1, ...TRACK_1, ...TRACK_1, ...TRACK_1, ...TRACK_1, ...TRACK_1]
const T2_FULL = [...TRACK_2, ...TRACK_2, ...TRACK_2, ...TRACK_2, ...TRACK_2, ...TRACK_2, ...TRACK_2, ...TRACK_2]

export default function OperadorasMarquee() {
  const t1Ref = useRef<HTMLDivElement>(null)
  const t2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let rafId: number
    let ctx: ReturnType<typeof gsap.context>

    // requestAnimationFrame garante que a leitura de scrollWidth ocorre APÓS
    // o browser finalizar o layout do frame → elimina forced reflow (Lighthouse)
    rafId = requestAnimationFrame(() => {
      ctx = gsap.context(() => {
        // PISTA 1 (Esquerda)
        if (t1Ref.current) {
          const halfW = t1Ref.current.scrollWidth / 2
          gsap.fromTo(t1Ref.current,
            { x: 0 },
            { x: -halfW, duration: 40, ease: 'none', repeat: -1 }
          )
        }

        // PISTA 2 (Direita — velocidade diferente = profundidade)
        if (t2Ref.current) {
          const halfW = t2Ref.current.scrollWidth / 2
          gsap.fromTo(t2Ref.current,
            { x: -halfW },
            { x: 0, duration: 55, ease: 'none', repeat: -1 }
          )
        }
        // NOTA: O efeito de levitação (bobbing) foi movido para CSS animation
        // pura (.op-card-float) — roda na GPU sem ler propriedades de layout,
        // eliminando o forced reflow que custava 12ms por card no Lighthouse.
      })
    })

    return () => {
      cancelAnimationFrame(rafId)
      ctx?.revert()
    }
  }, [])

  return (
    <section
      className="operadoras-marquee-section"
      aria-labelledby="operadoras-heading"
      id="operadoras"
    >
      <div className="container operadoras-header">
        <p className="operadoras-eyebrow" id="operadoras-heading">
          Poder de Escolha
        </p>
        <p className="operadoras-sub">
          As marcas de elite do mercado, organizadas para você.
        </p>
      </div>

      <div
        className="op-marquee-wrapper"
        role="marquee"
        aria-live="off"
        aria-label="Levitação interativa das operadoras parceiras"
      >
        {/* FADES (Sombra nas bordas da tela) */}
        <div className="op-fade-left" aria-hidden="true" />

        {/* PISTA 1 (Move para a Esquerda) */}
        <div className="op-marquee-track op-track-1" ref={t1Ref}>
          {T1_FULL.map((op, idx) => (
            <div className="op-card" key={`t1-${op.name}-${idx}`}>
              <img 
                src={op.src} 
                alt={op.name} 
                loading="lazy" 
                decoding="async" 
                draggable={false} 
                style={op.scale ? { transform: `scale(${op.scale})` } : undefined}
              />
            </div>
          ))}
        </div>

        {/* PISTA 2 (Move para a Direita) */}
        <div className="op-marquee-track op-track-2" ref={t2Ref}>
          {T2_FULL.map((op, idx) => (
            <div className="op-card" key={`t2-${op.name}-${idx}`}>
              <img 
                src={op.src} 
                alt={op.name} 
                loading="lazy" 
                decoding="async" 
                draggable={false} 
                style={op.scale ? { transform: `scale(${op.scale})` } : undefined}
              />
            </div>
          ))}
        </div>

        <div className="op-fade-right" aria-hidden="true" />
      </div>

      <ul aria-label="Lista de operadoras parceiras" className="sr-only">
        {TRACK_1.concat(TRACK_2).map(op => (
          <li key={op.name}>{op.name}</li>
        ))}
      </ul>
    </section>
  )
}
