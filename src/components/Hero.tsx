import React, { useRef, useState, useTransition, useId } from 'react'
import { Phone, Mail, User, ShieldCheck, ArrowRight, Star } from 'lucide-react'

interface HeroProps {
  whatsappNumber: string
  whatsappMsg: string
}

type PlanType = '' | 'individual' | 'familiar' | 'empresarial' | 'mei'

interface FormData {
  name: string
  phone: string
  email: string
  plan: PlanType
}

interface FormErrors {
  name?: string
  phone?: string
  email?: string
  plan?: string
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 11)
  if (digits.length === 0) return ''
  if (digits.length <= 2) return `(${digits}`
  if (digits.length <= 7) return `(${digits.slice(0,2)}) ${digits.slice(2)}`
  if (digits.length <= 10) return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6)}`
  return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7)}`
}

function validate(data: FormData): FormErrors {
  const errors: FormErrors = {}
  if (!data.name.trim() || data.name.trim().length < 2) errors.name = 'Informe seu nome completo'
  const digits = data.phone.replace(/\D/g, '')
  if (digits.length < 10) errors.phone = 'Telefone inválido (DDD + número)'
  if (!data.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) errors.email = 'E-mail inválido'
  if (!data.plan) errors.plan = 'Selecione o tipo de plano'
  return errors
}

export default function Hero({ whatsappNumber, whatsappMsg }: HeroProps) {
  const formId = useId()
  const [isPending, startTransition] = useTransition()
  const [form, setForm] = useState<FormData>({ name: '', phone: '', email: '', plan: '' })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target
    if (name === 'phone') {
      setForm(f => ({ ...f, phone: formatPhone(value) }))
    } else {
      setForm(f => ({ ...f, [name]: value }))
    }
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors(er => ({ ...er, [name]: undefined }))
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Focus first error field
      const firstKey = Object.keys(errs)[0] as keyof FormErrors
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstKey}"]`)
      el?.focus()
      return
    }
    startTransition(() => {
      setSubmitted(true)
    })
    // Build whatsapp message with form data
    const msg = encodeURIComponent(
      `Olá! Quero cotar um plano de saúde.\nNome: ${form.name}\nTelefone: ${form.phone}\nE-mail: ${form.email}\nTipo: ${form.plan}`
    )
    setTimeout(() => {
      window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, '_blank', 'noopener,noreferrer')
    }, 800)
  }

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="hero-grid" aria-hidden="true" />

      <div className="container hero-content">
        <div className="hero-two-col">

          {/* LEFT COPY */}
          <div>
            <div className="hero-badge" aria-label="Cotação grátis e rápida">
              <span aria-hidden="true" />
              Cotação grátis em 5 minutos
            </div>

            <h1 className="hero-headline" id="hero-heading">
              Seu plano de saúde sem <mark>complicação</mark> e sem pagar caro
            </h1>

            <p className="hero-sub">
              Comparamos dezenas de operadoras para você encontrar o melhor custo-benefício.
              Atendimento humanizado do início ao fim — sem letras miúdas.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
              {['★ 4.9/5 em avaliações', '+12.000 famílias atendidas', 'Resposta em até 15 min'].map((t) => (
                <div key={t} style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '.875rem', color: '#94a3b8' }}>
                  <Star size={14} color="#fb923c" fill="#fb923c" aria-hidden="true" />
                  {t}
                </div>
              ))}
            </div>

            {/* TRUST BADGES */}
            <div style={{
              display: 'flex', gap: '1rem', flexWrap: 'wrap',
              padding: '1rem 1.25rem',
              background: 'rgba(255,255,255,.04)',
              borderRadius: '.875rem',
              border: '1px solid rgba(255,255,255,.08)'
            }}>
              {[
                { icon: <ShieldCheck size={16} aria-hidden="true" />, text: 'Regulado pela ANS' },
                { icon: <ShieldCheck size={16} aria-hidden="true" />, text: 'Dados 100% seguros' },
                { icon: <ShieldCheck size={16} aria-hidden="true" />, text: 'Sem spam' },
              ].map(({ icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '.375rem', fontSize: '.8125rem', color: '#64748b' }}>
                  <span style={{ color: '#34d399' }}>{icon}</span>
                  {text}
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: LEAD FORM */}
          <div>
            {submitted ? (
              <div className="lead-card" role="status" aria-live="polite">
                <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }} aria-hidden="true">🎉</div>
                  <h2 style={{ fontSize: '1.375rem', fontWeight: '800', color: '#fff', marginBottom: '.75rem' }}>
                    Recebemos sua solicitação!
                  </h2>
                  <p style={{ color: '#64748b', marginBottom: '1.5rem', fontSize: '.9375rem', lineHeight: '1.7' }}>
                    Um especialista vai entrar em contato via WhatsApp em até <strong style={{ color: '#f1f5f9' }}>15 minutos</strong>.
                  </p>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=${whatsappMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-cta btn-cta--full"
                    aria-label="Chamar especialista no WhatsApp agora"
                  >
                    Chamar agora no WhatsApp
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>
                </div>
              </div>
            ) : (
              <div className="lead-card" id="form-lead">
                <p className="lead-card-title">Receba sua cotação grátis</p>
                <p className="lead-card-sub">Preencha os dados abaixo — leva menos de 60 segundos</p>

                <form
                  ref={formRef}
                  onSubmit={handleSubmit}
                  noValidate
                  aria-label="Formulário de cotação de plano de saúde"
                >
                  <div className="lead-form-grid">

                    {/* NOME */}
                    <div className="form-group">
                      <label className="form-label" htmlFor={`${formId}-name`}>
                        <User size={12} aria-hidden="true" style={{ display: 'inline', marginRight: '.25rem' }} />
                        Nome completo
                      </label>
                      <input
                        id={`${formId}-name`}
                        name="name"
                        type="text"
                        className={`form-input${errors.name ? ' error' : ''}`}
                        placeholder="Seu nome completo"
                        value={form.name}
                        onChange={handleChange}
                        autoComplete="name"
                        aria-required="true"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? `${formId}-name-err` : undefined}
                      />
                      {errors.name && (
                        <span id={`${formId}-name-err`} className="form-error" role="alert">{errors.name}</span>
                      )}
                    </div>

                    {/* TELEFONE */}
                    <div className="form-group">
                      <label className="form-label" htmlFor={`${formId}-phone`}>
                        <Phone size={12} aria-hidden="true" style={{ display: 'inline', marginRight: '.25rem' }} />
                        WhatsApp / Telefone
                      </label>
                      <input
                        id={`${formId}-phone`}
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        className={`form-input${errors.phone ? ' error' : ''}`}
                        placeholder="(11) 99999-9999"
                        value={form.phone}
                        onChange={handleChange}
                        autoComplete="tel"
                        aria-required="true"
                        aria-invalid={!!errors.phone}
                        aria-describedby={errors.phone ? `${formId}-phone-err` : undefined}
                      />
                      {errors.phone && (
                        <span id={`${formId}-phone-err`} className="form-error" role="alert">{errors.phone}</span>
                      )}
                    </div>

                    {/* EMAIL */}
                    <div className="form-group">
                      <label className="form-label" htmlFor={`${formId}-email`}>
                        <Mail size={12} aria-hidden="true" style={{ display: 'inline', marginRight: '.25rem' }} />
                        E-mail
                      </label>
                      <input
                        id={`${formId}-email`}
                        name="email"
                        type="email"
                        className={`form-input${errors.email ? ' error' : ''}`}
                        placeholder="seuemail@exemplo.com"
                        value={form.email}
                        onChange={handleChange}
                        autoComplete="email"
                        aria-required="true"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? `${formId}-email-err` : undefined}
                      />
                      {errors.email && (
                        <span id={`${formId}-email-err`} className="form-error" role="alert">{errors.email}</span>
                      )}
                    </div>

                    {/* TIPO DE PLANO */}
                    <div className="form-group">
                      <label className="form-label" htmlFor={`${formId}-plan`}>
                        Tipo de plano
                      </label>
                      <select
                        id={`${formId}-plan`}
                        name="plan"
                        className={`form-select${errors.plan ? ' error' : ''}`}
                        value={form.plan}
                        onChange={handleChange}
                        aria-required="true"
                        aria-invalid={!!errors.plan}
                        aria-describedby={errors.plan ? `${formId}-plan-err` : undefined}
                      >
                        <option value="" disabled>Selecione uma opção</option>
                        <option value="individual">Individual / Familiar</option>
                        <option value="familiar">Família (acima de 3 pessoas)</option>
                        <option value="empresarial">Empresarial (PME)</option>
                        <option value="mei">MEI / Autônomo</option>
                      </select>
                      {errors.plan && (
                        <span id={`${formId}-plan-err`} className="form-error" role="alert">{errors.plan}</span>
                      )}
                    </div>

                    <button
                      type="submit"
                      className="btn-cta btn-cta--lg btn-cta--full"
                      disabled={isPending}
                      aria-label="Enviar cotação e receber proposta no WhatsApp"
                      style={{ marginTop: '.5rem' }}
                    >
                      {isPending ? 'Enviando…' : 'Quero minha cotação grátis'}
                      <ArrowRight size={20} aria-hidden="true" />
                    </button>

                  </div>
                </form>

                <p style={{ fontSize: '.75rem', color: '#334155', marginTop: '1rem', textAlign: 'center', lineHeight: '1.6' }}>
                  🔒 Seus dados estão seguros. Não fazemos spam.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </section>
  )
}
