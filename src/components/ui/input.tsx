import { cn } from '@/lib/utils'
import * as React from 'react'

const sizeClasses = {
  sm: 'h-8 px-3',
  md: 'h-10 px-3',
  lg: 'h-12 px-3',
}

type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends Omit<React.ComponentProps<'input'>, 'size'> {
  size?: InputSize
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded-md border border-[#E4E4E7] px-3 py-2 text-base',
          className,
          sizeClasses[size],
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export default Input
