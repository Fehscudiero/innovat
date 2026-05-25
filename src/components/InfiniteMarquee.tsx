import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { Heart, Building2, Users, Briefcase, Star, Shield } from 'lucide-react'

interface PlanItem {
  icon: React.ReactNode
  label: string
  color: string
}

const PLANS: PlanItem[] = [
  { icon: <Heart size={18} aria-hidden="true" />, label: 'Plano Individual', color: '#f43f5e' },
  { icon: <Users size={18} aria-hidden="true" />, label: 'Plano Familiar', color: '#a78bfa' },
  { icon: <Building2 size={18} aria-hidden="true" />, label: 'Plano Empresarial', color: '#34d399' },
  { icon: <Briefcase size={18} aria-hidden="true" />, label: 'Plano MEI', color: '#60a5fa' },
  { icon: <Shield size={18} aria-hidden="true" />, label: 'Plano Odontológico', color: '#fb923c' },
  { icon: <Star size={18} aria-hidden="true" />, label: 'Plano Premium', color: '#facc15' },
]

// Duplicate to create seamless loop (triple ensures no gap on very wide screens)
const ITEMS = [...PLANS, ...PLANS, ...PLANS]

export default function InfiniteMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const tweenRef = useRef<gsap.core.Tween | null>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Wait one frame so the DOM is painted and we can measure width
    const id = requestAnimationFrame(() => {
      const totalWidth = track.scrollWidth
      // We have 3 copies — scroll exactly 1/3 (one full copy) then loop
      const oneSetWidth = totalWidth / 3

      tweenRef.current = gsap.to(track, {
        x: -oneSetWidth,
        duration: 32,
        ease: 'none',
        repeat: -1,
        // Reset modulo — seamless: when x hits -oneSetWidth, wrap back to 0
        modifiers: {
          x: gsap.utils.unitize((x: number) => parseFloat(x) % oneSetWidth * -1 >= oneSetWidth ? 0 : x),
        },
      })

      // Pause on hover / focus for a11y
      const wrapper = track.closest('.marquee-wrapper') as HTMLElement | null
      if (wrapper) {
        const pause = () => tweenRef.current?.pause()
        const resume = () => tweenRef.current?.resume()
        wrapper.addEventListener('mouseenter', pause)
        wrapper.addEventListener('mouseleave', resume)
        wrapper.addEventListener('focusin', pause)
        wrapper.addEventListener('focusout', resume)
      }
    })

    return () => {
      cancelAnimationFrame(id)
      tweenRef.current?.kill()
    }
  }, [])

  return (
    <section className="strip-section" aria-label="Tipos de planos disponíveis">
      <p className="strip-label">Planos disponíveis para você</p>
      <div className="marquee-wrapper" role="marquee" aria-live="off">
        <div className="marquee-track" ref={trackRef} aria-hidden="true">
          {ITEMS.map((item, i) => (
            <div className="marquee-item" key={i}>
              <div
                className="plan-chip"
                style={{ borderColor: `${item.color}33` }}
              >
                <span style={{ color: item.color }}>{item.icon}</span>
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Screen-reader accessible list (hidden visually) */}
      <ul aria-label="Lista de tipos de planos" className="sr-only">
        {PLANS.map(p => <li key={p.label}>{p.label}</li>)}
      </ul>
    </section>
  )
}
