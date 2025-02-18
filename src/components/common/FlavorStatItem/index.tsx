import { Slider } from '@/components/ui/slider'
import { useState } from 'react'

interface FlavorStatItemProps {
  defaultValue: number
  label: string
  onValueChange?: (flavor: 'spicy' | 'salty' | 'sweet', value: number) => void
  type: 'spicy' | 'salty' | 'sweet'
}

/**
 * 맵기, 염도, 달기 같은 맛에 대한 게이지 슬라이드 컴포넌트
 * @param
 * defaultvalue: 기본 값, label, onValueChange: 값이 변할 때의 이벤트 핸들러, type: 맛의 종류
 * @example
 * const Parent = () => {
 *  const [flavors, setFlavors] = useState({
     spicy: 0,
     salty: 0,
     sweet: 0,
     })
     const handleFlavorChange = (
        flavor: 'spicy' | 'salty' | 'sweet',
     value: number,
    ) => {
        setFlavors((prev) => ({
          ...prev,
          [flavor]: value,
     }))
      }
 *  return (
 *  <div className='flex flex-col gap-6'>
      <FlavorStatItem
        defaultValue={flavors['spicy']}
        type='spicy'
        label='맵기'
        onValueChange={handleFlavorChange}
      />
      <FlavorStatItem
        defaultValue={flavors['salty']}
        type='salty'
        label='염도'
        onValueChange={handleFlavorChange}
      />
      <FlavorStatItem
        defaultValue={flavors['sweet']}
        type='sweet'
        label='달기'
        onValueChange={handleFlavorChange}
      />
    </div>
 * )
 * }
 */

const FlavorStatItem = ({
  label,
  type,
  onValueChange,
  defaultValue,
}: FlavorStatItemProps) => {
  const [currentValue, setCurrentValue] = useState<number>(defaultValue)

  return (
    <section className='w-full flex gap-3 text-body items-center'>
      <span className='text-main-black'>{label}</span>
      <Slider
        onValueChange={(value) => {
          setCurrentValue(value[0])
          if (onValueChange) {
            onValueChange(type, value[0])
          }
        }}
        className='w-3/5'
        defaultValue={[defaultValue]}
        max={5}
        step={0.01}
      />
      <span className='text-subbody'>{currentValue.toFixed(1)}</span>
    </section>
  )
}

export default FlavorStatItem
