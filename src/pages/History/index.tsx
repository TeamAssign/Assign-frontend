import { HistoryBar } from '@/components'
import recommendationData from '@/mocks/recommendationData'

const History = () => {
  return (
    <section className='w-full'>
      <span className='text-sub-2 font-bold text-title'>
        🍽️ 추천 받았던 메뉴들이에요!
      </span>
      {recommendationData.map((item) => (
        <HistoryBar
          key={item.recommendationId}
          recommendationId={item.recommendationId}
          imgUrl={item.imageUrl}
          category={item.category}
          type={item.type}
          menu={item.name}
          accuracy={item.accuracy}
          isReviewed={item.isReviewed}
          participants={item.participants}
        />
      ))}
    </section>
  )
}

export default History
