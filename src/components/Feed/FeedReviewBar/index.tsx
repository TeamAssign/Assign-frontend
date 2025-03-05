import { Button, Modal, ReviewForm, Tag } from '@/components'
import { cn } from '@/lib/utils'
import { Participant } from '@/types'
import { useEffect, useRef, useState } from 'react'

interface FeedReviewBarProps {
  feedType: string
  recommendationId: number | null
  imgUrl: string
  category: string
  type: string
  menu: string
  comment: string
  star: number
  participants: Participant[]
  isContainedTeam?: boolean
}

const FeedReviewBar = ({
  feedType,
  imgUrl,
  category,
  type,
  menu,
  comment,
  star,
  participants,
  recommendationId,
  isContainedTeam,
}: FeedReviewBarProps) => {
  const [isCommentExpanded, setIsCommentExpanded] = useState(false)
  const [needsExpansion, setNeedsExpansion] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const commentRef = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const element = commentRef.current
    if (element) {
      const isOverflowing = element.scrollHeight > element.clientHeight
      setNeedsExpansion(isOverflowing)
    }
  }, [comment])

  const toggleComment = () => {
    setIsCommentExpanded(!isCommentExpanded)
  }

  return (
    <div className='flex w-full gap-6 p-4 shadow-md rounded-2xl'>
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
            {recommendationId && <Tag color='darkGreen' children='AI 추천' />}
          </div>
          <div className='font-bold'>{menu}</div>
          <div className='flex gap-0.5'>
            {Array.from({ length: 5 }).map((_, index) => (
              <span className='text-[#FFCD29]' key={index}>
                {index < star ? '★' : '☆'}
              </span>
            ))}
          </div>
          <div className={cn('relative', needsExpansion && 'cursor-pointer')}>
            <p
              ref={commentRef}
              className={cn(
                'pr-3 text-description',
                !isCommentExpanded && 'line-clamp-1',
              )}
              onClick={needsExpansion ? toggleComment : undefined}
            >
              {comment}
            </p>

            {needsExpansion && (
              <button className='absolute top-0 right-0 flex items-center font-medium text-gray-500 text-subody'>
                <span>{isCommentExpanded ? '▲' : '▼'}</span>
              </button>
            )}
          </div>
        </div>
        {feedType === 'team' && isContainedTeam && (
          <Button
            onClick={() => setIsModalOpen(true)}
            variant='black'
            size='sm'
          >
            같은 메뉴 먹기
          </Button>
        )}
        {feedType === 'user' && (
          <Button
            onClick={() => setIsModalOpen(true)}
            variant='black'
            size='sm'
          >
            같은 메뉴 먹기
          </Button>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title='또 먹은 후기 등록하기'
          onClose={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          content={
            <ReviewForm
              isEditMember={true}
              recommendationId={recommendationId}
              type={type}
              menu={menu}
              participants={participants}
              category={category}
              comment={comment}
              imgUrl={imgUrl}
            />
          }
        />
      )}
    </div>
  )
}

export default FeedReviewBar
