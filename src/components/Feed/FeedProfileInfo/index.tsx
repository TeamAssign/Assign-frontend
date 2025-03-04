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
      <div className='flex items-center w-full gap-4'>
        {profileImageUrl && (
          <div className='w-16 overflow-hidden rounded-full aspect-square'>
            <img
              className='object-cover w-full h-full rounded-full'
              src={profileImageUrl}
              alt='프로필 이미지'
            />
          </div>
        )}
        <div className='flex flex-col w-full gap-2'>
          <div className='flex items-center justify-between text-subbody '>
            <div className='px-2 py-1 rounded-lg bg-sub-2 '>
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
      <div className='flex flex-col w-full gap-3'>
        <span>🍽️ 음식 성향</span>
        <FlavorStatItem defaultValue={sweet} type='sweet' label='단 맛' />
        <FlavorStatItem defaultValue={salty} type='salty' label='짠 맛' />
        <FlavorStatItem defaultValue={spicy} type='spicy' label='매운 맛' />
        <div className='flex w-full gap-3 text-subbody'>
          <SatisfiedIcon className='flex-shrink-0 w-5 h-5' />
          <p className='w-4/5'>{pros}</p>
        </div>
        <div className='flex w-full gap-3 text-subbody'>
          <DissatisfiedIcon className='flex-shrink-0 w-5 h-5' />
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
              onClose={() => setIsModalOpen(false)}
            />
          }
        />
      )}
    </section>
  )
}

export default FeedProfileInfo
