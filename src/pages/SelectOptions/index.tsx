import CancelCircleIcon from '@/assets/icons/cancel-circle.svg?react'
import { Avatar, Button, Input, SearchDropDown, SelectBar } from '@/components'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { EAT_TYPES_ARR, FOOD_CATEGORIES } from '@/constant'
import useSearchMember from '@/hooks/useSearchMember'
import { myInfo } from '@/mocks/MyInfo'
import { usersData } from '@/mocks/usersData'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

// 아래 selectbox에 해당하는 유저데이터 get

const SelectOptions = () => {
  const { type } = useParams<string>()
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

  const [category, setCategory] = useState('')
  const eatType = EAT_TYPES_ARR.find((item) => item.key === type)?.value

  const handleClick = () => {
    console.log(members, category, eatType)
  }

  const handleChangeCategory = (value: string) => {
    setCategory(value)
  }

  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='w-full flex flex-col gap-2'>
        <span className='font-bold text-sub-2 text-title'>
          🍽️ 추천 받고자하는 음식 카테고리
        </span>
        <Select value={category} onValueChange={handleChangeCategory}>
          <SelectTrigger className='w-[180px] border-[1px] border-dark-gray'>
            <SelectValue placeholder='음식 카테고리를 설정해주세요' />
          </SelectTrigger>
          <SelectContent className='border-[1px] border-dark-gray bg-white z-50'>
            <SelectGroup>
              <SelectLabel>카테고리</SelectLabel>
              {FOOD_CATEGORIES.map((category) => (
                <SelectItem
                  className='text-main-black hover:bg-light-gray'
                  key={category}
                  value={category}
                >
                  {category}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className='flex flex-col w-full gap-2'>
        <span className='font-bold text-title text-sub-2'>🙌 먹는 인원</span>
        {eatType === '혼밥' && (
          <div className='w-full'>
            <Avatar
              imgUrl={myInfo.profileImage}
              text={myInfo.name}
              name={myInfo.name}
              department={myInfo.team}
            />
          </div>
        )}
        {(eatType === '그룹' || eatType === '회식') && (
          <>
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
            <div className='flex flex-col gap-2 py-2'>
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
          </>
        )}
      </div>

      <Button onClick={handleClick}>선택 완료</Button>
    </div>
  )
}

export default SelectOptions
