import React, { lazy, Suspense } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import InfinitMarquee from './components/InfiniteMarquee'
import Benefits from './components/Benefits'
import FAQ from './components/FAQ'
import WhatsAppFloat from './components/WhatsAppFloat'

// Code-split footer & CTA (below-fold) — melhora LCP
const CTASection = lazy(() => import('./components/CTASection'))
const Footer = lazy(() => import('./components/Footer'))

const WHATSAPP_NUMBER = '5511999999999'
const WHATSAPP_MSG = encodeURIComponent('Olá! Vim pelo site e quero cotar um plano de saúde.')

export default function App() {
  return (
    <>
      <Nav />

      <main id="main-content">
        <Hero whatsappNumber={WHATSAPP_NUMBER} whatsappMsg={WHATSAPP_MSG} />
        <InfinitMarquee />
        <Benefits />
        <FAQ />
        <Suspense fallback={null}>
          <CTASection whatsappNumber={WHATSAPP_NUMBER} whatsappMsg={WHATSAPP_MSG} />
          <Footer />
        </Suspense>
      </main>

      <WhatsAppFloat phone={WHATSAPP_NUMBER} message={WHATSAPP_MSG} />
    </>
  )
}
