import { Tag } from '@/components'

interface RecommendationProps {
  imgUrl: string
  menu: string
  accuracy: number
}

const RecommendationBar = ({ imgUrl, menu, accuracy }: RecommendationProps) => {
  return (
    <div className='flex flex-col items-center w-full gap-4 p-6 border border-gray-200 rounded-lg'>
      <img src={imgUrl} alt={menu} className='rounded-lg aspect-square' />
      <p className='text-lg font-semibold'>오늘 점심은 {menu} 어떠세요?</p>
      <div className='flex items-center gap-3'>
        <span className='text-body text-sub-2'>💻 AI가 분석한 취향 적합률</span>
        <Tag color='lightGreen'>{(accuracy * 100).toFixed(1)} %</Tag>
      </div>
    </div>
  )
}

export default RecommendationBar
