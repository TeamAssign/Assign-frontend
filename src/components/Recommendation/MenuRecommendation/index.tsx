import { Tag } from '@/components'

interface MenuRecommendationProps {
  name: string
  imageUrl: string
  accuracy: number
}

const MenuRecommendation = ({
  name,
  imageUrl,
  accuracy,
}: MenuRecommendationProps) => {
  return (
    <div className='w-full flex flex-col items-center gap-3 border-b-[1px] border-light-gray py-3 rounded-lg'>
      <span className='font-bold text-body text-sub-2'>
        오늘 메뉴는{' '}
        <span className='font-bold text-main text-title'>{name}</span> 어떠세요?
      </span>
      <div className='flex flex-col items-center w-full gap-3'>
        <img
          className='w-[200px] h-[200px] rounded-lg'
          src={imageUrl}
          alt='음식 사진'
        />
        <div className='flex items-center gap-3'>
          <span className='text-body text-sub-2'>
            💻 AI가 분석한 취향 적합률
          </span>
          <Tag color='lightGreen'>{(accuracy * 100).toFixed(1)} %</Tag>
        </div>
      </div>
    </div>
  )
}

export default MenuRecommendation
