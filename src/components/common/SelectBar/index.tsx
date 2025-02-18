import { Avatar } from '@/components/index'

interface SelectBarProps {
  imgUrl: string
  name: string
  department: string
  text: string
}

const SelectBar = ({ imgUrl, name, department, text }: SelectBarProps) => {
  return (
    <label className='flex items-center justify-between py-2 border-b border-gray-200'>
      <div className='flex items-center gap-2'>
        <Avatar imgUrl={imgUrl} text={text} />
        <div className='font-semibold'>{name}</div>
        <div className='text-gray-500'>{department}</div>
      </div>
      <input type='checkbox' />
    </label>
  )
}

export default SelectBar
