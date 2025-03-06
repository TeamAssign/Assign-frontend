import CancelCircleIcon from '@/assets/icons/cancel-circle.svg?react'
import {
  Avatar,
  Button,
  Input,
  SearchDropDown,
  SelectBar,
  UserSkeleton,
} from '@/components'
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
import useGetUsersList from '@/hooks/apis/user/useGetUsersList'
import useSearchMember from '@/hooks/useSearchMember'
import { useUserStore } from '@/store/UserInfoStore'
import { UserInfoType } from '@/types'
import React, { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const SelectOptions = () => {
  const { type } = useParams<string>()
  const navigate = useNavigate()
  const [category, setCategory] = useState('')
  const eatType = EAT_TYPES_ARR.find((item) => item.key === type)?.value
  const { id, name, profileImageUrl, teamName } = useUserStore()

  const {
    data,
    status,
    ref: userRef,
    isFetchingNextPage,
    hasNextPage,
  } = useGetUsersList()
  console.log(status)
  const allUsers = useMemo(() => {
    if (!data) return []
    return data.pages.flatMap((page) => page.content)
  }, [data])

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
  } = useSearchMember(allUsers)

  const handleClick = () => {
    if (eatType === '혼밥') {
      navigate('/recommendation', {
        state: {
          members: [
            {
              id,
              name,
              profileImageUrl,
              teamName,
            },
          ],
          category,
          eatType,
        },
      })
    } else {
      navigate('/recommendation', {
        state: {
          members,
          category,
          eatType,
        },
      })
    }
  }

  const handleChangeCategory = (value: string) => {
    setCategory(value)
  }

  const isButtonDisabled =
    !category || (eatType === '그룹' && members.length === 0)

  return (
    <div className='flex flex-col w-full gap-4'>
      <div className='flex flex-col w-full gap-2'>
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
              imgUrl={profileImageUrl}
              text={name}
              name={name}
              department={teamName}
            />
          </div>
        )}
        {eatType === '그룹' && (
          <>
            <div className='flex gap-4 overflow-x-auto scrollbar-hide whitespace-nowrap'>
              {members.map((member) => (
                <div
                  key={member.id}
                  className='relative cursor-pointer w-fit h-fit'
                  onClick={() => handleDeleteMember(member.id)}
                >
                  <Avatar
                    imgUrl={member.profileImageUrl}
                    text={member.name}
                    name={member.name}
                    department={member.teamName}
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
              {data?.pages.map((page, pageIndex) => (
                <React.Fragment key={pageIndex}>
                  {page.content.map((user: UserInfoType) => (
                    <SelectBar
                      key={user.id}
                      id={user.id}
                      imgUrl={user.profileImageUrl}
                      name={user.name}
                      department={user.teamName}
                      text={user.name}
                      onSelect={toggleMember}
                      isSelected={members.some(
                        (member) => member.id === user.id,
                      )}
                    />
                  ))}
                </React.Fragment>
              ))}
              {hasNextPage && (
                <div ref={userRef}>
                  <section className='flex items-center justify-center w-full'>
                    {isFetchingNextPage ? <UserSkeleton /> : null}
                  </section>
                </div>
              )}
            </div>
          </>
        )}
        {eatType === '회식' && (
          <div className='px-2 py-1 rounded-lg bg-sub-2 w-fit'>
            <span className='text-white'>{teamName}</span>
          </div>
        )}
      </div>

      <Button
        className='fixed bottom-20 -translate-x-3 w-full max-w-[600px]'
        onClick={handleClick}
        disabled={isButtonDisabled}
      >
        선택 완료
      </Button>
    </div>
  )
}

export default SelectOptions
