import { Avatar } from '@/components/index'

interface SelectBarProps {
  imgUrl: string
  name: string
  department: string
  text: string
  id: number
  onSelect: (id: number) => void
  isSelected?: boolean // 선택 상태를 나타내는 prop 추가
}

const SelectBar = ({
  imgUrl,
  name,
  department,
  text,
  id,
  onSelect,
  isSelected = false,
}: SelectBarProps) => {
  return (
    <div
      className='flex items-center justify-between py-2 border-b border-gray-200'
      onClick={() => onSelect(id)}
    >
      <div className='flex items-center gap-2'>
        <Avatar imgUrl={imgUrl} text={text} />
        <div className='font-semibold'>{name}</div>
        <div className='text-gray-500'>{department}</div>
      </div>
      <input
        type='checkbox'
        className='cursor-pointer accent-main-black'
        checked={isSelected}
        onChange={() => onSelect(id)}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}

export default SelectBar
