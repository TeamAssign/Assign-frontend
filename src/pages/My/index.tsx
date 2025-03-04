import {
  Button,
  FeedProfileInfo,
  FeedReviewBar,
  Loader,
  Modal,
  PieChart,
  ReviewForm,
} from '@/components'
import useGetUserFeedInfo from '@/hooks/apis/user/useGetUserFeedInfo'
import { personStatsData } from '@/mocks/personStatsData'
import { reviewData } from '@/mocks/reviewData'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'

const My = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: userFeedInfo, status } = useGetUserFeedInfo()

  if (status === 'pending') {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
        <Loader />
      </div>
    )
  }

  if (status === 'error') {
    return <div>Error</div>
  }

  return (
    <section className='flex flex-col w-full gap-4'>
      <FeedProfileInfo
        type='user'
        profileImageUrl={userFeedInfo.imgurl}
        teams={userFeedInfo.teamName}
        name={userFeedInfo.name}
        spicy={userFeedInfo.spicy}
        salty={userFeedInfo.salty}
        sweet={userFeedInfo.sweet}
        pros={userFeedInfo.pros}
        cons={userFeedInfo.cons}
      />
      <div className='flex flex-col gap-2'>
        <span className='font-bold text-sub-2 text-title'>📊 내 통계</span>
        <PieChart data={personStatsData} />
      </div>
      <div className='w-full'>
        <div className='flex items-center gap-4'>
          <span className='font-bold text-sub-2 text-title'>
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
            <FeedReviewBar feedType='user' key={index} {...review} />
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
