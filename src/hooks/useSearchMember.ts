import { UserInfoType } from '@/types'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useDebounce } from 'use-debounce'

const useSearchMember = (
  usersData: UserInfoType[],
  participants: UserInfoType[] = [],
) => {
  const [members, setMembers] = useState<UserInfoType[]>(participants)
  const [searchInput, setSearchInput] = useState('')
  const [debouncedSearchInput] = useDebounce(searchInput, 300) // 디바운스 적용
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

  const searchMemberList = useMemo(() => {
    const filteredUserList = usersData.filter((user) =>
      user.name.trim().includes(debouncedSearchInput),
    )
    setIsOpenMemberDropDown(
      filteredUserList.length > 0 && debouncedSearchInput !== '',
    )
    return filteredUserList
  }, [debouncedSearchInput, usersData])

  const handleMemberInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value.trim())
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
    toggleMember,
  }
}

export default useSearchMember
