import DissatisfiedIcon from '@/assets/icons/DissatisfiedIcon.svg?react'
import EditIcon from '@/assets/icons/EditIcon.svg?react'
import SatisfiedIcon from '@/assets/icons/SatisfiedIcon.svg?react'
import { FeedProfileEditForm, FlavorStatItem, Modal } from '@/components'
import { useState } from 'react'

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
  const [isModalOpen, setIsModalOpen] = useState(false)

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
            <EditIcon
              className='cursor-pointer'
              onClick={() => setIsModalOpen(true)}
            />
          </div>
          {name && <span>{name}</span>}
        </div>
      </div>
      <div className='w-full flex flex-col gap-3'>
        <span>🍽️ 음식 성향</span>
        <FlavorStatItem defaultValue={spicy} type='spicy' label='단 맛' />
        <FlavorStatItem defaultValue={salty} type='salty' label='짠 맛' />
        <FlavorStatItem defaultValue={sweet} type='sweet' label='매운 맛' />
        <div className='w-full flex gap-3 text-subbody'>
          <SatisfiedIcon className='w-5 h-5 flex-shrink-0' />
          <p className='w-4/5'>{pros}</p>
        </div>
        <div className='w-full flex gap-3 text-subbody'>
          <DissatisfiedIcon className='w-5 h-5 flex-shrink-0' />
          <p className='w-4/5'>{cons}</p>
        </div>
      </div>

      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title='프로필 정보 수정'
          onClose={() => setIsModalOpen(false)}
          content={
            <FeedProfileEditForm
              type={profileImageUrl ? 'person' : 'team'}
              sweet={sweet}
              spicy={spicy}
              salty={salty}
              pros={pros}
              cons={cons}
              profileImageUrl={profileImageUrl}
            />
          }
        />
      )}
    </section>
  )
}

export default FeedProfileInfo
