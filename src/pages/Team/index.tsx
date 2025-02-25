import {
  BarChart,
  Button,
  FeedProfileInfo,
  FeedReviewBar,
  Modal,
  ReviewForm,
  SelectBox,
} from '@/components'
import { ProfileInfo } from '@/mocks/feedUserProfileData'
import { teamReviewData } from '@/mocks/reviewData'
import { teams } from '@/mocks/teamsData'
import { teamStatsData } from '@/mocks/teamStatsData'
import { PlusIcon } from 'lucide-react'
import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Team = () => {
  const { teamId } = useParams()
  const [selectedTeam, setSelectedTeam] = useState<string | undefined>(teamId)
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleSelectChange = (value: string) => {
    setSelectedTeam(value)
    navigate(`/teams/${value}`)
  }
  return (
    <section className='w-full flex flex-col gap-4'>
      <div className='w-full flex flex-col gap-2'>
        <span className='text-sub-2 font-bold text-title'>
          💁🏻‍♂️ 다른 팀은 어떤 메뉴를 먹었을까요?
        </span>
        <SelectBox
          placeholder='팀을 선택해주세요.'
          values={teams}
          onChange={handleSelectChange}
          defaultValue={selectedTeam}
          label='Teams'
        />
      </div>
      <FeedProfileInfo
        teams={ProfileInfo.teams}
        spicy={ProfileInfo.spicy}
        salty={ProfileInfo.salty}
        sweet={ProfileInfo.sweet}
        pros={ProfileInfo.pros}
        cons={ProfileInfo.cons}
      />
      <div className='flex flex-col gap-2'>
        <span className='text-sub-2 font-bold text-title'>📊 팀 통계</span>
        <BarChart menu={teamStatsData.menu} />
      </div>
      <div className='w-full'>
        <div className='flex gap-4 items-center'>
          <span className='text-sub-2 font-bold text-title'>
            🍽️ 팀이 먹은 메뉴
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
          {teamReviewData.map((review, index) => (
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

export default Team
