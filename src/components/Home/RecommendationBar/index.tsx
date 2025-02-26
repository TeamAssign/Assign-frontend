interface RecommendationProps {
  imgUrl: string
  menu: string
}

const RecommendationBar = ({ imgUrl, menu }: RecommendationProps) => {
  return (
    <div className='flex flex-col items-center w-full gap-4 p-6 border border-gray-200 rounded-lg'>
      <img src={imgUrl} alt={menu} className='aspect-square' />
      <p className='text-lg font-semibold'>오늘 점심은 {menu} 어떠세요?</p>
    </div>
  )
}

export default RecommendationBar
