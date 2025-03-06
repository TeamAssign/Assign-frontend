import { Button, Modal, ReviewForm, Tag } from '@/components'
import { LOGO_IMAGE_URL } from '@/constant'
import { Participant } from '@/types'
import { useState } from 'react'

interface HistoryBarProps {
  recommendationId: number
  imgUrl: string
  category: string
  type: string
  menu: string
  accuracy: number
  isReviewed: boolean
  participants: Participant[]
}

const HistoryBar = ({
  recommendationId,
  imgUrl,
  category,
  type,
  menu,
  accuracy,
  isReviewed,
  participants,
}: HistoryBarProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleClick = () => {
    setIsModalOpen(true)
  }

  return (
    <div className='flex w-full gap-6 p-4 shadow-md rounded-2xl'>
      <div className='w-3/5 h-[132px]'>
        <img
          src={imgUrl || LOGO_IMAGE_URL}
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
          <div className='flex items-center gap-2 text-description text-main-black'>
            <span className='font-semibold'>💻 AI가 분석한 취향 적합률</span>
            <span className='font-bold text-sub-2 text-subbody'>
              {(accuracy * 100).toFixed(1)} %
            </span>
          </div>
        </div>
        {!isReviewed && (
          <Button variant='black' size='sm' onClick={handleClick}>
            추천 후기 등록하기
          </Button>
        )}
        {isReviewed && (
          <Button disabled size='sm'>
            후기 등록 완료
          </Button>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title='후기 등록하기'
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={
            <ReviewForm
              recommendationId={recommendationId}
              onClose={() => setIsModalOpen(false)}
              type={type}
              menu={menu}
              participants={participants}
              isEditMember={false}
              category={category}
            />
          }
        />
      )}
    </div>
  )
}

export default HistoryBar
