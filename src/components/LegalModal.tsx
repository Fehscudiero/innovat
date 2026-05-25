import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'

export type ModalType = 'termos' | 'privacidade' | null

interface Props {
  type: ModalType
  onClose: () => void
}

const PRIVACIDADE_TEXT = (
  <>
    <h2>Política de Privacidade</h2>
    <p>Última atualização: Maio de 2026</p>
    
    <h3>1. Coleta de Dados</h3>
    <p>A Innovat Consultoria coleta informações estritamente necessárias para a elaboração de cotações de planos de saúde, incluindo dados pessoais básicos de contato (nome, telefone, e-mail) e informações demográficas básicas (faixa etária, profissão), em plena conformidade com a LGPD (Lei nº 13.709/2018).</p>
    
    <h3>2. Uso das Informações</h3>
    <p>Utilizamos seus dados de forma ética e segura com o único propósito de realizar simulações precisas, identificar carências e retornar cotações através de canais diretos de atendimento (como WhatsApp ou E-mail). Não vendemos nem cedemos suas informações a terceiros.</p>
    
    <h3>3. Retenção e Exclusão</h3>
    <p>Você tem o direito de solicitar a alteração, anonimização ou exclusão definitiva dos seus dados a qualquer momento, bastando entrar em contato com nossa equipe oficial.</p>
    
    <h3>4. Segurança</h3>
    <p>Empregamos protocolos de segurança modernos e criptografia para evitar vazamentos. Nosso compromisso principal é o zelo ético absoluto pela sua privacidade e pela sua saúde.</p>
  </>
)

const TERMOS_TEXT = (
  <>
    <h2>Termos de Uso</h2>
    <p>Última atualização: Maio de 2026</p>
    
    <h3>1. Natureza do Serviço</h3>
    <p>A Innovat Consultoria atua como corretora independente autorizada, oferecendo análise consultiva e cotação de planos de saúde e odontológicos.</p>
    
    <h3>2. Caráter Informativo</h3>
    <p>Todas as informações exibidas neste portal, incluindo logotipos, carências e coberturas, são resumidas e têm caráter estritamente informativo. Elas não substituem ou anulam os Manuais de Operação e os Contratos Oficiais de cada Operadora.</p>
    
    <h3>3. Valores e Aceitação</h3>
    <p>Os valores e cotações apresentados por nossa equipe estão sujeitos a alterações por parte das Operadoras sem aviso prévio. A efetivação de qualquer plano depende de análise cadastral, documental e da aceitação final pela própria operadora escolhida, conforme normas da Agência Nacional de Saúde Suplementar (ANS).</p>

    <h3>4. Propriedade Intelectual</h3>
    <p>Logotipos das operadoras de saúde são de suas respectivas marcas. O design, textos originais e componentes deste site são propriedade intelectual da Innovat Consultoria.</p>
  </>
)

export default function LegalModal({ type, onClose }: Props) {
  const overlayRef = useRef<HTMLDivElement>(null)

  // Prevenir scroll do body quando modal está aberto
  useEffect(() => {
    if (type) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [type])

  // Fechar ao apertar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [onClose])

  // Fechar ao clicar fora (no overlay)
  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose()
  }

  if (!type) return null

  return (
    <div 
      className="modal-overlay" 
      ref={overlayRef} 
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-label={type === 'termos' ? 'Termos de Uso' : 'Política de Privacidade'}
    >
      <div className="modal-content-box">
        <button 
          className="modal-close-btn" 
          onClick={onClose}
          aria-label="Fechar modal"
        >
          <X size={24} />
        </button>
        <div className="modal-body">
          {type === 'privacidade' ? PRIVACIDADE_TEXT : TERMOS_TEXT}
        </div>
      </div>
    </div>
  )
}
