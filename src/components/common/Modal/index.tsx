import CancelBold from '@/assets/cancel-bold.svg?react'
import { cn } from '@/lib/utils'
import { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  content: React.ReactNode
}

/**
 * Modal 컴포넌트 - 전체 화면 모달 창을 표시하는 컴포넌트
 *
 * @param {object} props
 * @param {boolean} props.isOpen - 모달 표시 여부
 * @param {Function} props.onClose - 모달 닫기 핸들러 함수
 * @param {React.ReactNode} props.content - 모달에 표시할 내용
 *
 * @example
 * const ProductPage = () => {
 *   const [showDetails, setShowDetails] = useState(false)
 *
 *   return (
 *     <>
 *       <button onClick={() => setShowDetails(true)}>
 *         상세 정보 보기
 *       </button>
 *
 *       <Modal
 *         isOpen={showDetails}
 *         onClose={() => setShowDetails(false)}
 *         content={<ProductDetails id="product-123" />}
 *       />
 *     </>
 *   )
 * }
 *
 * 주요 기능:
 * - 애니메이션 효과 (slide-up, slide-down)
 * - 모달 열릴 때 body 스크롤 방지
 * - 포털을 사용해 DOM 최상위에 렌더링
 */

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
