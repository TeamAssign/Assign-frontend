import { Button, Tag } from '@/components'
import { useEffect, useRef, useState } from 'react'

interface FeedReviewBarProps {
  imgUrl: string
  category: string
  type: string
  menu: string
  comment: string
  star: number
  isRecommendation: boolean
}

/**
 * FeedReviewBar 컴포넌트 - 리뷰 피드 항목을 표시하는 카드형 UI
 *
 * @param {object} props
 * @param {string} props.imgUrl - 음식/장소 이미지 URL
 * @param {string} props.category - 카테고리 태그 (예: '양식', '한식' 등)
 * @param {string} props.type - 타입 태그 (예: '배달', '방문' 등)
 * @param {string} props.menu - 메뉴 또는 장소명
 * @param {string} props.comment - 리뷰 코멘트 내용
 * @param {number} props.star - 별점 (1-5)
 * @param {boolean} props.isRecommendation - AI 추천 여부
 *
 * @example
 * const FeedPage = () => {
 *   const reviews = [
 *     {
 *       id: 'review-456',
 *       imgUrl: '/images/burger.jpg',
 *       category: '패스트푸드',
 *       type: '매장',
 *       menu: '트러플 버거',
 *       comment: '트러플 향이 은은하게 퍼지고 패티가 굉장히, 굉장히, 굉장히, 굉장히 두껍고 맛있었습니다!',
 *       star: 4,
 *       isRecommendation: true
 *     }
 *   ]
 *
 *   return (
 *     <div className="feed-container">
 *       {reviews.map(review => (
 *         <FeedReviewBar
 *           key={review.id}
 *           {...review}
 *         />
 *       ))}
 *     </div>
 *   )
 * }
 *
 * 주요 기능:
 * - 별점 시각화 (★/☆)
 * - 긴 리뷰 코멘트 접고 펼치기
 * - AI 추천 여부 태그 표시
 * - '또 먹었어요' 액션 버튼
 */

const FeedReviewBar = ({
  imgUrl,
  category,
  type,
  menu,
  comment,
  star,
  isRecommendation,
}: FeedReviewBarProps) => {
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
      <div className='w-3/5 h-[162px]'>
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
            {isRecommendation && <Tag color='darkGreen' children='AI 추천' />}
          </div>
          <div className='font-bold'>{menu}</div>
          <div className='flex gap-0.5'>
            {Array.from({ length: 5 }).map((_, index) => (
              <span className='text-[#FFCD29]' key={index}>
                {index < star ? '★' : '☆'}
              </span>
            ))}
          </div>
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
            </p>

            {needsExpansion && (
              <button className='absolute bottom-0 right-0 flex items-center ml-2 text-sm font-medium text-gray-500'>
                <span>{isCommentExpanded ? '▲' : '▼'}</span>
              </button>
            )}
          </div>
        </div>

        <Button variant='black' size='sm'>
          또 먹었어요
        </Button>
      </div>
    </div>
  )
}

export default FeedReviewBar
