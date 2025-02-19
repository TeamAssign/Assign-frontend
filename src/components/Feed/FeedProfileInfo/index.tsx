import DissatisfiedIcon from '@/assets/icons/DissatisfiedIcon.svg?react'
import EditIcon from '@/assets/icons/EditIcon.svg?react'
import SatisfiedIcon from '@/assets/icons/SatisfiedIcon.svg?react'
import FlavorStatItem from '@/components/common/FlavorStatItem'

interface FeedProfileInfoProps {
  profileImageUrl?: string
  teams: string
  name?: string
  spicy: number
  salty: number
  sweet: number
  pros: string
  cons: string
}

/**
 * 팀 및 개인 피드에 들어갈 information 컴포넌트
 * @example
 * const parent = () => {
 *  return (
 *      <div className='w-full'>
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
     </div> 
     )
 *
 * }
 */

const FeedProfileInfo = ({
  profileImageUrl,
  teams,
  name,
  spicy,
  salty,
  sweet,
  pros,
  cons,
}: FeedProfileInfoProps) => {
  return (
    <section className='w-full flex gap-4 flex-col border-[1px] border-light-gray p-3 rounded-lg text-main-black'>
      <div className='w-full flex gap-4 items-center'>
        {profileImageUrl && (
          <div className='w-16 aspect-square rounded-full overflow-hidden'>
            <img
              className='w-full h-full object-cover rounded-full'
              src={profileImageUrl}
              alt='프로필 이미지'
            />
          </div>
        )}
        <div className='w-full flex flex-col gap-2'>
          <div className='flex justify-between items-center text-subbody '>
            <div className='bg-sub-2 px-2 py-1 rounded-lg '>
              <span className='text-white'>{teams}</span>
            </div>
            <EditIcon />
          </div>
          {name && <span>{name}</span>}
        </div>
      </div>
      <div className='w-full flex flex-col gap-3'>
        <span>🍽️ 음식 성향</span>
        <FlavorStatItem defaultValue={spicy} type='spicy' label='맵기' />
        <FlavorStatItem defaultValue={salty} type='salty' label='염도' />
        <FlavorStatItem defaultValue={sweet} type='sweet' label='달기' />
        <div className='w-full flex gap-3 text-subbody'>
          <SatisfiedIcon className='w-5 h-5 flex-shrink-0' />
          <p className='w-4/5'>{pros}</p>
        </div>
        <div className='w-full flex gap-3 text-subbody'>
          <DissatisfiedIcon className='w-5 h-5 flex-shrink-0' />
          <p className='w-4/5'>{cons}</p>
        </div>
      </div>
    </section>
  )
}

export default FeedProfileInfo
