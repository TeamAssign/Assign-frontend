import {
  BarChart,
  Button,
  FeedProfileInfo,
  FeedReviewBar,
  Loader,
  Modal,
  PieChart,
  ReviewForm,
  SelectBox,
} from '@/components'
import useGetTeamFeedInfo from '@/hooks/apis/team/useGetTeamFeedInfo'
import { teamReviewData } from '@/mocks/reviewData'
import { teamStatsData } from '@/mocks/teamStatsData'
import { useTeamStore } from '@/store/TeamStore'
import { useUserStore } from '@/store/UserInfoStore'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Team = () => {
  const { teamId } = useParams()
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const teams = useTeamStore((state) => state.teams)
  const isContainedTeam =
    teamId === String(useUserStore((state) => state.teamId))

  const { data: teamFeendInfo, status } = useGetTeamFeedInfo(teamId || '')

  if (status === 'pending') {
    return (
      <div className='flex items-center justify-center w-screen h-screen'>
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
          defaultValue={teamFeendInfo.team}
          label='Teams'
        />
      </div>
      <FeedProfileInfo
        type='team'
        teams={teamFeendInfo.team}
        spicy={teamFeendInfo.spicy}
        salty={teamFeendInfo.salty}
        sweet={teamFeendInfo.sweet}
        pros={teamFeendInfo.pros}
        cons={teamFeendInfo.cons}
      />
      <div className='flex flex-col gap-2'>
        <span className='font-bold text-sub-2 text-title'>📊 팀 통계</span>
        <PieChart data={teamStatsData.categories} />
        <BarChart menu={teamStatsData.menu} />
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
          {teamReviewData.map((review, index) => (
            <FeedReviewBar
              feedType='team'
              isContainedTeam={isContainedTeam}
              key={index}
              {...review}
            />
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

export default Team
