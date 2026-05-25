import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

/**
 * OperadorasMarquee
 * ─────────────────
 * /planos.webp (strip de logos das operadoras) passando em loop infinito.
 *
 * Técnica: duplicamos a imagem N vezes para preencher a tela.
 * O track total contém (N * 2) cópias divididas em 2 grupos iguais.
 * Animamos x de 0 → -(50% do track) com repeat:-1 → loop perfeito.
 *
 * GPU-only: GSAP anima somente `x` (transform3d) — zero layout thrashing.
 * Pausa no hover/focus para a11y.
 */

// Reduzido de 5 para 2 para não repetir a mesma imagem várias vezes na mesma tela
const HALF = 2
const TOTAL = HALF * 2  // track total = 4 imagens

export default function OperadorasMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const start = () => {
      const halfW = track.scrollWidth / 2  // largura de UM grupo (HALF imagens)
      if (!halfW) return

      tweenRef.current = gsap.fromTo(
        track,
        { x: 0 },
        {
          x: -halfW,
          duration: 45,       // segundos por ciclo — ajustado para imagens gigantes
          ease: 'none',
          repeat: -1,         // infinito
          // repeatRefresh falso aqui pois usamos fromTo com x fixo
        }
      )
    }

    // Espera o primeiro frame para garantir que o DOM foi pintado e scrollWidth é correto
    const rafId = requestAnimationFrame(start)

    // Pausa no hover e focus — acessibilidade
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
      {/* HEADER */}
      <div className="container operadoras-header">
        <p className="operadoras-eyebrow" id="operadoras-heading">
          Operadoras parceiras
        </p>
        <p className="operadoras-sub">
          Trabalhamos com as maiores e melhores operadoras do mercado
        </p>
      </div>

      {/* FAIXA COM MARQUEE */}
      <div
        className="op-marquee-wrapper"
        role="marquee"
        aria-live="off"
        aria-label="Carrossel das operadoras parceiras"
      >
        {/* FADE ESQUERDA */}
        <div className="op-fade-left" aria-hidden="true" />

        {/* TRACK — animado pelo GSAP */}
        <div className="op-marquee-track" ref={trackRef}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <div className="op-marquee-item" key={i}>
              <img
                src="/planos.webp"
                alt={i === 0
                  ? 'Operadoras parceiras: Alice, SulAmérica, Unimed, Hapvida, Amil, Porto Saúde, Bradesco Saúde, Blue Med e NotreDame'
                  : ''}
                aria-hidden={i !== 0}
                width="880"
                height="133"
                loading="lazy"
                decoding="async"
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* FADE DIREITA */}
        <div className="op-fade-right" aria-hidden="true" />
      </div>

      {/* Lista acessível para leitores de tela */}
      <ul aria-label="Lista de operadoras parceiras" className="sr-only">
        {['Alice','SulAmérica','Unimed','Hapvida','Amil','Porto Saúde','Bradesco Saúde','Blue Med','NotreDame Intermédica'].map(op => (
          <li key={op}>{op}</li>
        ))}
      </ul>
    </section>
  )
}
