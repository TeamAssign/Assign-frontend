import {
  Button,
  FeedProfileInfo,
  FeedReviewBar,
  Modal,
  PieChart,
  ReviewForm,
} from '@/components'
import { ProfileInfo } from '@/mocks/feedUserProfileData'
import { personStatsData } from '@/mocks/personStatsData'
import { reviewData } from '@/mocks/reviewData'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

const My = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <section className='w-full flex flex-col gap-4'>
      <FeedProfileInfo
        profileImageUrl={ProfileInfo.profileImageUrl}
        teams={ProfileInfo.teams}
        name={ProfileInfo.name}
        spicy={ProfileInfo.spicy}
        salty={ProfileInfo.salty}
        sweet={ProfileInfo.sweet}
        pros={ProfileInfo.pros}
        cons={ProfileInfo.cons}
      />
      <div className='flex flex-col gap-2'>
        <span className='text-sub-2 font-bold text-title'>📊 내 통계</span>
        <PieChart data={personStatsData} />
      </div>
      <div className='w-full'>
        <div className='flex gap-4 items-center'>
          <span className='text-sub-2 font-bold text-title'>
            🍽️ 내가 먹은 메뉴
          </span>
          <Button
            onClick={() => setIsModalOpen(true)}
            variant='black'
            className='w-8 h-8'
          >
            <PlusIcon />
          </Button>
        </div>

        <div className='flex flex-col gap-3'>
          {reviewData.map((review, index) => (
            <FeedReviewBar key={index} {...review} />
          ))}
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title='새로운 후기 등록하기'
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={<ReviewForm isEditMember={true} />}
        />
      )}
    </section>
  )
}

export default My
