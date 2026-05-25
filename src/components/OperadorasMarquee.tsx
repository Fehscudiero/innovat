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
  { name: 'NotreDame Intermédica', src: imgNotreDame },
  { name: 'Porto Saúde', src: imgPorto },
  { name: 'Unimed', src: imgUnimed },
]

// PISTA 2: Vai para a DIREITA (Parallax oposto)
const TRACK_2 = [
  { name: 'Alice', src: imgAlice },
  { name: 'Blue Med', src: imgBluemed },
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
    // 1. ANIMAÇÃO: PISTA 1 (Esquerda)
    if (t1Ref.current) {
      const halfW = t1Ref.current.scrollWidth / 2
      gsap.fromTo(t1Ref.current, { x: 0 }, {
        x: -halfW,
        duration: 40,
        ease: 'none',
        repeat: -1
      })
    }

    // 2. ANIMAÇÃO: PISTA 2 (Direita) - Velocidade levemente diferente para efeito de profundidade
    if (t2Ref.current) {
      const halfW = t2Ref.current.scrollWidth / 2
      gsap.fromTo(t2Ref.current, { x: -halfW }, {
        x: 0,
        duration: 55, // Mais lento = parece estar "no fundo"
        ease: 'none',
        repeat: -1
      })
    }

    // 3. O TOQUE DE MESTRE: LEVITAÇÃO ORGÂNICA (BOBBING)
    const cards = gsap.utils.toArray('.op-card') as HTMLElement[]
    cards.forEach((card) => {
      // Cada card recebe valores randômicos garantindo que nenhum flutue exatamente igual ao outro
      gsap.to(card, {
        y: "random(-16, 16)",
        rotation: "random(-2, 2)",
        duration: "random(2.5, 4)",
        yoyo: true,
        repeat: -1,
        ease: 'sine.inOut',
        delay: "random(0, 2)"
      })
    })

    return () => {
      gsap.killTweensOf(t1Ref.current)
      gsap.killTweensOf(t2Ref.current)
      gsap.killTweensOf('.op-card')
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
              <img src={op.src} alt={op.name} loading="lazy" decoding="async" draggable={false} />
            </div>
          ))}
        </div>

        {/* PISTA 2 (Move para a Direita) */}
        <div className="op-marquee-track op-track-2" ref={t2Ref}>
          {T2_FULL.map((op, idx) => (
            <div className="op-card" key={`t2-${op.name}-${idx}`}>
              <img src={op.src} alt={op.name} loading="lazy" decoding="async" draggable={false} />
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
