import { Slider } from '@/components/ui/slider'
import { useEffect, useState } from 'react'

interface FlavorStatItemProps {
  defaultValue: number
  label: string
  onValueChange?: (flavor: 'spicy' | 'salty' | 'sweet', value: number) => void
  type: 'spicy' | 'salty' | 'sweet'
  isDisabled?: boolean
}

const FlavorStatItem = ({
  isDisabled,
  label,
  type,
  onValueChange,
  defaultValue,
}: FlavorStatItemProps) => {
  const [currentValue, setCurrentValue] = useState<number>(defaultValue)

  useEffect(() => {
    setCurrentValue(defaultValue)
  }, [defaultValue])

  return (
    <section className='flex items-center w-full gap-3 text-subbody'>
      <span className='font-semibold w-14 text-main-black'>{label}</span>
      <div className='flex items-center w-full gap-3'>
        <Slider
          value={[currentValue]}
          onValueChange={(value) => {
            setCurrentValue(value[0])
            if (onValueChange) {
              onValueChange(type, value[0])
            }
          }}
          className='w-full'
          max={5}
          step={0.01}
          disabled={isDisabled}
        />
        <span className='w-8 text-right text-gray-500 text-subbody'>
          {currentValue.toFixed(1)}
        </span>
      </div>
    </section>
  )
}

export default FlavorStatItem
