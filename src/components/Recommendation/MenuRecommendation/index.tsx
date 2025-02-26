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
      <span className='text-body text-sub-2 font-bold'>
        오늘 메뉴는{' '}
        <span className='text-main text-title font-bold'>{name}</span> 어떠세요?
      </span>
      <div className='w-full flex flex-col items-center gap-3'>
        <img
          className='w-[200px] h-[200px] rounded-lg'
          src={imageUrl}
          alt='음식 사진'
        />
        <div className='flex gap-3 items-center'>
          <span className='text-body text-sub-2'>
            💻 AI가 분석한 취향 적합률
          </span>
          <Tag color='lightGreen'>{accuracy} %</Tag>
        </div>
      </div>
    </div>
  )
}

export default MenuRecommendation
