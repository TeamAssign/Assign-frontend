import { cn } from '@/lib/utils'
import * as React from 'react'

const sizeClasses = {
  sm: 'h-8 px-3',
  md: 'h-10 px-3',
  lg: 'h-12 px-3',
}

type InputSize = 'sm' | 'md' | 'lg'

interface InputProps extends Omit<React.ComponentProps<'textarea'>, 'size'> {
  size?: InputSize
  value?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, InputProps>(
  ({ size = 'md', className, value, onChange, ...props }) => {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const handleAutoResize = React.useCallback(() => {
      const textarea = textareaRef.current
      if (!textarea) return

      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }, [])

    React.useEffect(() => {
      handleAutoResize()
    }, [value, handleAutoResize])

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      onChange?.(e)
      handleAutoResize()
    }

    return (
      <textarea
        className={cn(
          'flex min-h-[80px] w-full rounded-md border border-[#E4E4E7] px-3 py-2 text-base resize-none',
          className,
          sizeClasses[size],
        )}
        ref={textareaRef}
        onChange={handleChange}
        value={value}
        {...props}
      />
    )
  },
)
Textarea.displayName = 'Textarea'

export { Textarea }
