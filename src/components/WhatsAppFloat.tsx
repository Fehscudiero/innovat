import React from 'react'
import { MessageCircle } from 'lucide-react'

interface WhatsAppFloatProps {
  phone: string
  message: string
}

export default function WhatsAppFloat({ phone, message }: WhatsAppFloatProps) {
  const href = `https://wa.me/${phone}?text=${message}`

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="whatsapp-float"
      aria-label="Chamar no WhatsApp — atendimento rápido"
      title="Fale conosco no WhatsApp"
    >
      <MessageCircle size={24} color="#fff" aria-hidden="true" />
    </a>
  )
}
