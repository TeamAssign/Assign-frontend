import { UserInfoType } from '@/types'
import { Ref } from 'react'

interface SearchDropDownProps {
  ref: Ref<HTMLUListElement>
  isOpen: boolean
  onClick: (id: number) => void
  memberList: UserInfoType[]
}

const SearchDropDown = ({
  ref,
  isOpen,
  onClick,
  memberList,
}: SearchDropDownProps) => {
  if (!isOpen) return null

  const handleClick = (id: number) => {
    onClick(id)
  }
  return (
    <ul
      ref={ref}
      className='absolute mt-1 overflow-auto flex gap-4 max-h-60 flex-col bg-white w-full z-50 border-[1px] rounded-lg border-light-gray px-4 py-2 shadow-md'
    >
      {memberList.map((member) => (
        <li
          key={member.id}
          className='w-full px-2 py-1 cursor-pointer hover:bg-gray-100'
          onClick={() => handleClick(member.id)}
        >
          <div className='flex items-center gap-6'>
            <img
              src={member.profileImageUrl}
              className='w-6 h-6 rounded-full'
            />
            <h2>{member.name}</h2>
            <h2 className='text-gray-500 text-subbody'>{member.teamName}</h2>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default SearchDropDown
