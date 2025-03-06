import {
  BarChart,
  Button,
  CardSkeleton,
  FeedProfileInfo,
  FeedReviewBar,
  Loader,
  Modal,
  PieChart,
  ReviewForm,
  SelectBox,
} from '@/components'
import useGetTeamReviews from '@/hooks/apis/feed/useGetTeamReviews'
import useGetTeamSummary from '@/hooks/apis/summary/useGetTeamSummary'
import useGetTeamFeedInfo from '@/hooks/apis/team/useGetTeamFeedInfo'
import { useTeamStore } from '@/store/TeamStore'
import { useUserStore } from '@/store/UserInfoStore'
import { ReviewType } from '@/types/DTO'
import { PlusIcon } from 'lucide-react'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Team = () => {
  const { teamId } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const teams = useTeamStore((state) => state.teams)
  const isContainedTeam =
    teamId === String(useUserStore((state) => state.teamId))

  const { data: teamFeedInfo, status: teamInfoStatus } = useGetTeamFeedInfo(
    teamId || '',
  )
  const {
    data: teamReviewsData,
    hasNextPage,
    isFetchingNextPage,
    ref,
  } = useGetTeamReviews(teamId || '')

  const { data: teamSummary, status: teamSummaryStatus } = useGetTeamSummary(
    teamId || '',
  )

  const isLoading =
    teamInfoStatus === 'pending' || teamSummaryStatus === 'pending'

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full absolute inset-0 max-w-[600px] min-h-screen mx-auto '>
        <Loader />
      </div>
    )
  }

  const handleSelectChange = (value: string) => {
    const team = teams.find((team) => team.name.trim() === value.trim())
    navigate(`/teams/${team?.id}`)
  }
  return (
    <section className='flex flex-col w-full gap-4'>
      <div className='flex flex-col w-full gap-2'>
        <span className='font-bold text-sub-2 text-title'>
          💁🏻‍♂️ 다른 팀은 어떤 메뉴를 먹었을까요?
        </span>
        <SelectBox
          placeholder='팀을 선택해주세요.'
          values={teams}
          onChange={handleSelectChange}
          defaultValue={teamFeedInfo.team}
          label='Teams'
        />
      </div>
      {teamFeedInfo === 'error' && <div>error</div>}
      {teamFeedInfo && (
        <FeedProfileInfo
          type='team'
          teams={teamFeedInfo.team}
          spicy={teamFeedInfo.spicy}
          salty={teamFeedInfo.salty}
          sweet={teamFeedInfo.sweet}
          pros={teamFeedInfo.pros}
          cons={teamFeedInfo.cons}
        />
      )}

      <div className='flex flex-col gap-2'>
        <span className='font-bold text-sub-2 text-title'>📊 팀 통계</span>
        {teamSummary && <PieChart data={teamSummary.statistics.categories} />}
        {teamSummary && <BarChart menu={teamSummary.statistics.menu} />}
      </div>
      <div className='w-full'>
        <div className='flex items-center gap-4'>
          <span className='font-bold text-sub-2 text-title'>
            🍽️ 팀이 먹은 메뉴
          </span>
          {isContainedTeam && (
            <Button
              onClick={() => setIsModalOpen(true)}
              variant='black'
              className='w-8 h-8'
            >
              <PlusIcon />
            </Button>
          )}
        </div>

        <div className='flex flex-col gap-3'>
          {teamReviewsData &&
            teamReviewsData.pages.map((page, pageIndex) => (
              <React.Fragment key={pageIndex}>
                {page.content.map((review: ReviewType) => (
                  <FeedReviewBar
                    feedType='team'
                    isContainedTeam={isContainedTeam}
                    key={review.reviewId}
                    {...review}
                  />
                ))}
              </React.Fragment>
            ))}
          {hasNextPage && (
            <div ref={ref}>
              <section className='w-full h-16'>
                {isFetchingNextPage ? <CardSkeleton /> : null}
              </section>
            </div>
          )}
        </div>
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

export default Team
