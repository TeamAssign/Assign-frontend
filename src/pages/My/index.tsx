import {
  Button,
  CardSkeleton,
  FeedProfileInfo,
  FeedReviewBar,
  Loader,
  Modal,
  PieChart,
  ReviewForm,
} from '@/components'
import useGetUserReviews from '@/hooks/apis/feed/useGetUserReviews'
import useGetUserSummary from '@/hooks/apis/summary/useGetUserSummary'
import useGetUserFeedInfo from '@/hooks/apis/user/useGetUserFeedInfo'
import { ReviewType } from '@/types/DTO'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'

const My = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { data: userFeedInfo, status: userInfoStatus } = useGetUserFeedInfo()
  const {
    data: reviewsData,
    hasNextPage,
    isFetchingNextPage,
    ref,
  } = useGetUserReviews()

  const { data: userSummary, status: userSummaryStatus } = useGetUserSummary()

  console.log(userSummary)
  console.log(reviewsData)
  if (userInfoStatus === 'pending' || userSummaryStatus === 'pending') {
    return (
      <div className='flex flex-col mx-auto min-h-screen max-w-[600px]'>
        <Loader />
      </div>
    )
  }

  return (
    <section className='flex flex-col w-full gap-4'>
      {userInfoStatus === 'error' && <div>error</div>}
      {userFeedInfo && (
        <FeedProfileInfo
          type='user'
          profileImageUrl={userFeedInfo.profileImageUrl}
          teams={userFeedInfo.teamName}
          name={userFeedInfo.name}
          spicy={userFeedInfo.spicy}
          salty={userFeedInfo.salty}
          sweet={userFeedInfo.sweet}
          pros={userFeedInfo.pros}
          cons={userFeedInfo.cons}
        />
      )}

      <div className='flex flex-col gap-2'>
        <span className='font-bold text-sub-2 text-title'>📊 내 통계</span>
        {userSummary && <PieChart data={userSummary.statistics.categories} />}
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

        <div className='flex flex-col w-full gap-3'>
          {reviewsData?.pages.map((page, pageIndex) => (
            <React.Fragment key={pageIndex}>
              {page.content.map((review: ReviewType) => (
                <FeedReviewBar
                  feedType='user'
                  key={review.reviewId}
                  {...review}
                />
              ))}
            </React.Fragment>
          ))}
        </div>
        {hasNextPage && (
          <div ref={ref}>
            <section className='w-full h-16'>
              {isFetchingNextPage ? <CardSkeleton /> : null}
            </section>
          </div>
        )}
      </div>
      {isModalOpen && (
        <Modal
          title='새로운 후기 등록하기'
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          content={
            <ReviewForm
              onClose={() => setIsModalOpen(false)}
              isEditMember={true}
            />
          }
        />
      )}
    </section>
  )
}

export default My
