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
