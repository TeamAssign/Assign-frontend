import CancelCircleIcon from '@/assets/icons/cancel-circle.svg?react'
import { Avatar, Button, Input, SearchDropDown, SelectBar } from '@/components'
import useSearchMember from '@/hooks/useSearchMember'
import { usersData } from '@/mocks/usersData'
import { useParams } from 'react-router-dom'

// 아래 selectbox에 해당하는 유저데이터 get

const SelectMember = () => {
  const { type } = useParams()
  const {
    ref,
    members,
    searchInput,
    searchMemberList,
    isOpenMemberDropDown,
    handleMemberInputChange,
    handleSelectMember,
    handleDeleteMember,
    toggleMember,
  } = useSearchMember(usersData)

  const handleClick = () => {
    console.log(members)
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='flex flex-col w-full gap-2'>
        <span className='font-bold text-title text-sub-2'>
          🙌 함께 먹을 사람
        </span>
        <div className='flex gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap'>
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
          className='focus:outline-none focus:border-black'
          placeholder='이름을 검색해주세요'
        />
        <SearchDropDown
          ref={ref}
          isOpen={isOpenMemberDropDown}
          onClick={handleSelectMember}
          memberList={searchMemberList}
        />
      </div>
      <div className='flex flex-col gap-2 p-2'>
        {usersData.map((user) => (
          <div key={user.id}>
            <SelectBar
              id={user.id}
              imgUrl={user.profileImage}
              name={user.name}
              department={user.team}
              text={user.name}
              onSelect={toggleMember}
              isSelected={members.some((member) => member.id === user.id)}
            />
          </div>
        ))}
      </div>
      <Button onClick={handleClick}>선택 완료</Button>
      {type !== 'together' && type !== 'team' && '잘못된 접근입니다.'}
    </div>
  )
}

export default SelectMember
