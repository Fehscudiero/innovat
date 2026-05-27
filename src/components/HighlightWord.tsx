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
  triggerMode?: 'scroll' | 'controlled'
  isActive?: boolean
}

export default function HighlightWord({
  children,
  color = '#1863DC',
  once = false,
  delay = 0.3,
  className = '',
  triggerMode = 'scroll',
  isActive = false,
}: Props) {
  const wrapRef  = useRef<HTMLSpanElement>(null)
  const pathRef  = useRef<SVGPathElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const isActiveRef = useRef(isActive)

  useEffect(() => {
    isActiveRef.current = isActive
  }, [isActive])

  useEffect(() => {
    const wrap = wrapRef.current
    const path = pathRef.current
    if (!wrap || !path) return

    // Fallback de 1000 se o layout do SVG ainda não estiver pronto (getTotalLength retornar 0)
    let len = path.getTotalLength() || 1000
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len })

    // Recalcula o comprimento real assim que o navegador finalizar o layout inicial
    const timer = setTimeout(() => {
      if (!path) return
      const realLen = path.getTotalLength()
      if (realLen > 0) {
        len = realLen
        gsap.set(path, { strokeDasharray: len })
        // Se o link ainda não estiver ativo, garante que continue oculto com o comprimento correto
        if (!isActiveRef.current) {
          gsap.set(path, { strokeDashoffset: len })
        }
      }
    }, 120)

    tweenRef.current = gsap.to(path, {
      strokeDashoffset: 0,
      duration: triggerMode === 'scroll' ? 1.1 : 0.6,
      ease: 'power2.inOut',
      delay: triggerMode === 'scroll' ? delay : 0,
      paused: true,
    })

    if (triggerMode === 'scroll') {
      const trigger = ScrollTrigger.create({
        trigger: wrap,
        start: 'top 88%',
        once,
        onEnter: () => tweenRef.current?.restart(),
        onEnterBack: once ? undefined : () => tweenRef.current?.restart(),
      })
      return () => {
        clearTimeout(timer)
        trigger.kill()
        tweenRef.current?.kill()
      }
    } else {
      return () => {
        clearTimeout(timer)
        tweenRef.current?.kill()
      }
    }
  }, [delay, once, triggerMode])

  useEffect(() => {
    if (triggerMode === 'controlled' && tweenRef.current) {
      if (isActive) tweenRef.current.play()
      else tweenRef.current.reverse()
    }
  }, [isActive, triggerMode])

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
