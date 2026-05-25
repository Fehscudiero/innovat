import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Importando as 9 logos individuais geradas pelo Vite (alta performance)
import imgAlice from '../assets/operadoras/alice.webp'
import imgAmil from '../assets/operadoras/amil.png'
import imgBluemed from '../assets/operadoras/bluemed.png'
import imgBradesco from '../assets/operadoras/bradesco-saude.webp'
import imgNotreDame from '../assets/operadoras/notredame.png'
import imgPorto from '../assets/operadoras/porto.png'
import imgSami from '../assets/operadoras/sami.webp'
import imgSulamerica from '../assets/operadoras/sulamerica.png'
import imgUnimed from '../assets/operadoras/unimed.png'

const OPERADORAS = [
  { name: 'Alice', src: imgAlice },
  { name: 'Amil', src: imgAmil },
  { name: 'Blue Med', src: imgBluemed },
  { name: 'Bradesco Saúde', src: imgBradesco },
  { name: 'NotreDame Intermédica', src: imgNotreDame },
  { name: 'Porto Saúde', src: imgPorto },
  { name: 'Sami', src: imgSami },
  { name: 'SulAmérica', src: imgSulamerica },
  { name: 'Unimed', src: imgUnimed },
]

// Para preencher até monitores 4K ultrawide sem espaços vazios, 
// duplicamos a lista base 4 vezes (2 grupos para a esquerda, 2 para a direita)
const TRACK_ITEMS = [...OPERADORAS, ...OPERADORAS, ...OPERADORAS, ...OPERADORAS]

export default function OperadorasMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const start = () => {
      // Movimentamos exatamente 50% da largura total do track.
      // Como temos 4 blocos de operadoras idênticos, 50% equivalem a 2 blocos.
      // O looping será perfeitamente imperceptível.
      const halfW = track.scrollWidth / 2  
      if (!halfW) return

      tweenRef.current = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -halfW,
          duration: 60,       // Velocidade agradável e luxuosa
          ease: 'none',
          repeat: -1,         // Infinito
        }
      )
    }

    // Espera o primeiro frame para garantir que o DOM foi pintado e scrollWidth calculado
    const rafId = requestAnimationFrame(start)

    // Acessibilidade e Efeito Premium: Pausa no hover para o usuário ver/clicar no logo
    const wrapper = track.closest('.op-marquee-wrapper') as HTMLElement | null
    if (wrapper) {
      const pause  = () => tweenRef.current?.pause()
      const resume = () => tweenRef.current?.resume()
      wrapper.addEventListener('mouseenter', pause,  { passive: true })
      wrapper.addEventListener('mouseleave', resume, { passive: true })
      wrapper.addEventListener('focusin',   pause,  { passive: true })
      wrapper.addEventListener('focusout',  resume, { passive: true })
    }

    return () => {
      cancelAnimationFrame(rafId)
      tweenRef.current?.kill()
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
          Operadoras parceiras
        </p>
        <p className="operadoras-sub">
          Trabalhamos com as maiores e melhores operadoras do mercado
        </p>
      </div>

      <div
        className="op-marquee-wrapper"
        role="marquee"
        aria-live="off"
        aria-label="Carrossel interativo das operadoras parceiras"
      >
        <div className="op-fade-left" aria-hidden="true" />

        {/* TRACK animado */}
        <div className="op-marquee-track" ref={trackRef}>
          {TRACK_ITEMS.map((op, idx) => (
            <div className="op-card" key={`${op.name}-${idx}`}>
              <img
                src={op.src}
                alt={op.name}
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className="op-fade-right" aria-hidden="true" />
      </div>

      {/* Lista acessível para leitores de tela */}
      <ul aria-label="Lista de operadoras parceiras" className="sr-only">
        {OPERADORAS.map(op => (
          <li key={op.name}>{op.name}</li>
        ))}
      </ul>
    </section>
  )
}
