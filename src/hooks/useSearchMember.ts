import { Participant } from '@/types'
import { ChangeEvent, useEffect, useRef, useState } from 'react'

const useSearchMember = (
  usersData: Participant[],
  participants: Participant[] = [],
) => {
  const [members, setMembers] = useState<Participant[]>(participants)
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
      alert('이미 선택되어 있는 멤버 입니다!') // 우선 alert로 해놓고 추후에 바꿀 예정
    }
  }

  const handleDeleteMember = (id: number) => {
    setMembers((prev) => prev.filter((member) => member.id !== id))
  }

  return {
    ref,
    members,
    searchInput,
    searchMemberList,
    isOpenMemberDropDown,
    handleMemberInputChange,
    handleSelectMember,
    handleDeleteMember,
  }
}

export default useSearchMember
