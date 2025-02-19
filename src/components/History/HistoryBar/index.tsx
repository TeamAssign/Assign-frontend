import { Button, Tag } from '@/components'
import { useEffect, useRef, useState } from 'react'

interface HistoryBarProps {
  imgUrl: string
  category: string
  type: string
  menu: string
  comment: string
  isReviewed: boolean
}

/**
 * HistoryBar 컴포넌트 - 주문 또는 방문 히스토리 항목을 표시하는 카드형 UI
 *
 * @param {object} props
 * @param {string} props.imgUrl - 음식/장소 이미지 URL
 * @param {string} props.category - 카테고리 태그 (예: '양식', '한식' 등)
 * @param {string} props.type - 타입 태그 (예: '배달', '방문' 등)
 * @param {string} props.menu - 메뉴 또는 장소명
 * @param {string} props.comment - 코멘트 또는 리뷰 내용
 * @param {boolean} props.isReviewed - 리뷰 작성 여부
 *
 * @example
 * const HistoryPage = () => {
 *   const orderHistory = [
 *     {
 *       id: 'order-123',
 *       imgUrl: '/images/pasta.jpg',
 *       category: '양식',
 *       type: '배달',
 *       menu: '까르보나라 파스타',
 *       comment: '소스가 너무 맛있었어요. 다음에도 주문할 것 같습니다.',
 *       isReviewed: true
 *     }
 *   ]
 *
 *   return (
 *     <div className="history-container">
 *       {orderHistory.map(item => (
 *         <HistoryBar
 *           key={item.id}
 *           imgUrl={item.imgUrl}
 *           category={item.category}
 *           type={item.type}
 *           menu={item.menu}
 *           comment={item.comment}
 *           isReviewed={item.isReviewed}
 *         />
 *       ))}
 *     </div>
 *   )
 * }
 *
 * 주요 기능:
 * - 긴 코멘트는 접고 펼치기 가능
 * - 리뷰 미작성 시 리뷰 등록 버튼 표시
 * - 타입과 카테고리를 태그로 시각화
 */

const HistoryBar = ({
  imgUrl,
  category,
  type,
  menu,
  comment,
  isReviewed,
}: HistoryBarProps) => {
  const [isCommentExpanded, setIsCommentExpanded] = useState(false)
  const [needsExpansion, setNeedsExpansion] = useState(false)
  const commentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = commentRef.current
    if (element) {
      const isOverflowing = element.scrollHeight > element.clientHeight
      setNeedsExpansion(isOverflowing)
    }
    //따로 resize를 판별하는 코드는 추가하지 않았습니다.
  }, [comment])

  const toggleComment = () => {
    setIsCommentExpanded(!isCommentExpanded)
  }

  return (
    <div className='flex gap-6 p-4 shadow-md rounded-2xl'>
      <div className='w-3/5 h-[132px]'>
        <img
          src={imgUrl}
          className='object-cover w-full h-full rounded-lg'
          alt={menu}
        />
      </div>
      <div className='flex flex-col w-full gap-2'>
        <div className='flex flex-col gap-1.5'>
          <div className='flex gap-2'>
            <Tag color='red' children={type} />
            <Tag color='lightGreen' children={category} />
          </div>
          <div className='font-bold'>{menu}</div>
          <div
            className='relative mt-1'
            style={{ cursor: needsExpansion ? 'pointer' : 'default' }}
          >
            <p
              ref={commentRef}
              className={!isCommentExpanded ? 'line-clamp-1 pr-2' : 'pr-2'}
              onClick={needsExpansion ? toggleComment : undefined}
            >
              {comment}
              {needsExpansion && (
                <button className='absolute bottom-0 right-0 flex items-center ml-1 text-sm font-medium text-gray-500'>
                  <span>{isCommentExpanded ? '▲' : '▼'}</span>
                </button>
              )}
            </p>
          </div>
        </div>
        {!isReviewed && (
          <Button variant='black' size='sm'>
            추천 후기 등록하기
          </Button>
        )}
      </div>
    </div>
  )
}

export default HistoryBar
