import CancelCircleIcon from '@/assets/icons/cancel-circle.svg?react'
import { Avatar, Input, SearchDropDown, SelectBar } from '@/components'
import { usersData } from '@/mocks/usersData'
import { Participant } from '@/types'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'

const SelectMember = () => {
  const { type } = useParams()

  const [members, setMembers] = useState<Participant[]>([])
  const [searchInput, setSearchInput] = useState('')
  const [searchMemberList, setSearchMemberList] = useState<Participant[]>([])
  const [isOpenMemberDropDown, setIsOpenMemberDropDown] = useState(false)
  const ref = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpenMemberDropDown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const toggleMember = (id: number) => {
    const user = usersData.find((user) => user.id === id)
    if (!user) return

    setMembers((prevMembers) => {
      const isContained = prevMembers.some((member) => member.id === id)
      if (isContained) {
        return prevMembers.filter((member) => member.id !== id)
      } else {
        return [...prevMembers, user]
      }
    })
  }

  const handleMemberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const userName = e.target.value.trim()
    setSearchInput(userName)
    const filteredUserList = usersData.filter((user) =>
      user.name.trim().includes(userName),
    )

    if (filteredUserList.length !== 0 && userName !== '') {
      setIsOpenMemberDropDown(true)
      setSearchMemberList(filteredUserList)
    } else {
      setIsOpenMemberDropDown(false)
    }
  }

  const handleSelectMember = (id: number) => {
    const selectedMember = searchMemberList.find((member) => member.id === id)
    const isContained = members.some((member) => member.id === id)

    if (selectedMember && !isContained) {
      setMembers((prev) => [...prev, selectedMember])
      setSearchInput('')
      setIsOpenMemberDropDown(false)
    } else {
      alert('이미 선택되어 있는 멤버 입니다!')
    }
  }

  const handleDeleteMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id))
  }

  return (
    <div>
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
        <div className='flex flex-col gap-2 p-2'>
          {usersData.map((user) => (
            <div key={user.id}>
              <SelectBar
                id={user.id}
                imgUrl={user.profileImage}
                name={user.name}
                department={user.team}
                text={user.name}
                onClick={toggleMember}
                isSelected={members.some((member) => member.id === user.id)}
              />
            </div>
          ))}
        </div>
      </div>
      {type !== 'together' && type !== 'team' && '잘못된 접근입니다.'}
    </div>
  )
}

export default SelectMember
