import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * HighlightWord
 * ─────────────
 * Efeito visual de "círculo SVG se desenhando" ao redor de uma palavra-chave,
 * exatamente igual ao marker:circle do Elementor Animated Headline
 * (referência: infinitycorretora.com.br).
 *
 * O SVG usa stroke-dashoffset para animar o traço se desenhando.
 * A animação é acionada pelo ScrollTrigger do GSAP.
 *
 * Props:
 *  - children: texto da palavra-chave
 *  - color: cor do SVG (padrão: brand-primary)
 *  - once: animar somente uma vez (padrão: true)
 *  - delay: atraso em segundos (padrão: 0.3)
 */

interface Props {
  children: React.ReactNode
  color?: string
  once?: boolean
  delay?: number
  className?: string
}

export default function HighlightWord({
  children,
  color = '#1863DC',
  once = true,
  delay = 0.3,
  className = '',
}: Props) {
  const wrapRef  = useRef<HTMLSpanElement>(null)
  const pathRef  = useRef<SVGPathElement>(null)

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    if (!wrap || !path) return

    // Mede o comprimento total do path para o trick dashoffset
    const len = path.getTotalLength()
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })

    // Anima quando o elemento entra na viewport
    const tween = gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.1,
      ease: 'power2.inOut',
      delay,
      paused: true,
    })

    const trigger = ScrollTrigger.create({
      trigger: wrap,
      start: 'top 88%',
      once,
      onEnter: () => tween.play(),
      onEnterBack: once ? undefined : () => tween.restart(),
    })

    return () => { trigger.kill(); tween.kill() }
  }, [delay, once])

  return (
    <span
      ref={wrapRef}
      className={`hw-wrap ${className}`}
      style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}
    >
      {children}

      {/*
        SVG ellipse path posicionado em absolute sobre o texto.
        rx/ry ligeiramente maiores que o texto para o efeito de "cercando".
        viewBox é proporcional — o SVG escala sozinho via width/height 100%.
      */}
      <span className="hw-svg-wrap" aria-hidden="true">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 300 80"
          preserveAspectRatio="none"
          className="hw-svg"
          focusable="false"
        >
          {/*
            Path de elipse irregular (estilo "handdrawn marker circle").
            Começa na ponta esquerda, vai para baixo, cruza no topo, termina na esquerda.
          */}
          <path
            ref={pathRef}
            d="
              M 18 55
              C 30 8, 130 -5, 200 10
              C 270 25, 290 50, 282 62
              C 270 78, 140 88, 60 78
              C 10 70, 0 52, 16 44
              C 30 36, 80 28, 150 26
            "
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </span>
  )
}
