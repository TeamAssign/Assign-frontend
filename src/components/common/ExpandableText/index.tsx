import DropDownIcon from '@/assets/icons/DropDownIcon.svg?react'
import DropUpIcon from '@/assets/icons/DropUpIcon.svg?react'
import { useState } from 'react'
import { twMerge } from 'tailwind-merge'

interface ExpandableTextProps {
  text: string
}

const ExpandableText = ({ text }: ExpandableTextProps) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false)

  return (
    <div className='relative w-2/3'>
      <p
        className={twMerge(
          'text-subbody',
          isExpanded ? 'line-clamp-none' : 'line-clamp-1',
        )}
      >
        {text}
      </p>
      <button
        onClick={() => setIsExpanded((prev) => !prev)}
        className='absolute top-0 -right-6'
      >
        {isExpanded ? (
          <DropUpIcon width='24px' height='24px' />
        ) : (
          <DropDownIcon width='24px' height='24px' />
        )}
      </button>
    </div>
  )
}

export default ExpandableText
