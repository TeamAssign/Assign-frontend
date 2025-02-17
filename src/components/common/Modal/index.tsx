import CancelBold from '@/assets/cancel-bold.svg?react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  content: React.ReactNode
}

const Modal = ({ isOpen, onClose, content }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      setIsClosing(false)
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleClose = (e: React.MouseEvent) => {
    setIsClosing(true)
    e.stopPropagation()
    setTimeout(() => {
      onClose()
    }, 300)
  }

  const modalContent = (
    <div
      className={cn(
        'fixed inset-0 z-50 flex flex-col bg-white',
        isClosing ? 'animate-slide-down' : 'animate-slide-up',
      )}
    >
      <div className='flex justify-end p-4'>
        <button onClick={handleClose} className='text-2xl'>
          <CancelBold />
        </button>
      </div>
      <div className='flex-1 overflow-auto'>{content}</div>
    </div>
  )

  return ReactDOM.createPortal(
    modalContent,
    document.getElementById('modal-root') || document.body,
  )
}

export default Modal
