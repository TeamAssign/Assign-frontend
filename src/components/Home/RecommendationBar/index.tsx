import { Tag } from '@/components'
import { LOGO_IMAGE_URL } from '@/constant'
import { useState } from 'react'

interface RecommendationProps {
  imgUrl: string
  menu: string
  accuracy: number
}

const RecommendationBar = ({ imgUrl, menu, accuracy }: RecommendationProps) => {
  const [imageSrc, setImageSrc] = useState(imgUrl || LOGO_IMAGE_URL)

  const handleImageError = () => {
    setImageSrc(LOGO_IMAGE_URL)
  }
  return (
    <div className='flex flex-col items-center w-full gap-4 p-6 border border-gray-200 rounded-lg'>
      <div className='w-[300px] h-[300px]'>
        <img
          src={imageSrc}
          alt={menu}
          className='rounded-lg aspect-square'
          onError={handleImageError}
        />
      </div>

      <p className='text-lg font-semibold'>오늘 점심은 {menu} 어떠세요?</p>
      <div className='flex items-center gap-3'>
        <span className='text-body text-sub-2'>💻 AI가 분석한 취향 적합률</span>
        <Tag color='lightGreen'>{(accuracy * 100).toFixed(1)} %</Tag>
      </div>
    </div>
  )
}

export default RecommendationBar
