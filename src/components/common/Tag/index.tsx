import { cn } from '@/lib/utils'
import React from 'react'

interface TagProps {
  children: React.ReactNode
  color: 'darkGreen' | 'lightGreen' | 'red'
}

const colorClass = {
  darkGreen: 'bg-sub-2 text-white',
  lightGreen: 'bg-sub text-white',
  red: 'bg-main text-white',
}

const Tag = ({ color, children }: TagProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
        colorClass[color],
      )}
    >
      {children}
    </div>
  )
}

export default Tag
