import CancelCircleIcon from '@/assets/icons/cancel-circle.svg?react'
import { Avatar, Input, SearchDropDown } from '@/components'
import useSearchMember from '@/hooks/useSearchMember'
import { usersData } from '@/mocks/usersData'
import { Participant } from '@/types'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const SelectMember = () => {
  const { type } = useParams()
  const [selectedMember] = useState<Participant[]>([])
  const {
    ref,
    members,
    searchInput,
    searchMemberList,
    isOpenMemberDropDown,
    handleMemberInputChange,
    handleSelectMember,
    handleDeleteMember,
  } = useSearchMember(usersData, selectedMember)

  return (
    <div>
      {type === 'together' && (
        <div className='flex flex-col gap-4'>
          <div className='flex flex-col w-full gap-2 h-30'>
            <p>함께 먹을 사람</p>
            <div className='flex gap-6 overflow-x-auto scrollbar-hide'>
              {members.map((member) => (
                <div
                  key={member.id}
                  className='relative cursor-pointer w-fit h-fit'
                  onClick={() => handleDeleteMember(member.id)}
                >
                  <Avatar
                    imgUrl={member.profileImage}
                    text={member.name}
                    name={member.name}
                    department={member.team}
                  />
                  <CancelCircleIcon className='absolute top-0 cursor-pointer -right-2' />
                </div>
              ))}
            </div>
          </div>
          <div className='w-full border-t border-gray-200' />
          <div className='relative py-2'>
            <Input
              type='text'
              value={searchInput}
              onChange={handleMemberInputChange}
              placeholder='팀원을 검색해주세요.'
            />
            <SearchDropDown
              ref={ref}
              isOpen={isOpenMemberDropDown}
              onClick={handleSelectMember}
              memberList={searchMemberList}
            />
          </div>
        </div>
      )}
      {type === 'team' && '회식 하기'}
      {type !== 'together' && type !== 'team' && '잘못된 접근입니다.'}
    </div>
  )
}

export default SelectMember
