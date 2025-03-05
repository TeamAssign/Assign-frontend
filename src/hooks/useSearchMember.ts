import { Participant } from '@/types'
import { ChangeEvent, useEffect, useMemo, useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { useDebounce } from 'use-debounce'

const useSearchMember = (
  usersData: Participant[],
  participants: Participant[] = [],
) => {
  const [members, setMembers] = useState<Participant[]>(participants)
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
      toast.error('이미 선택한 멤버입니다.')
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
