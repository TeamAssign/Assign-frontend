import { Button, MenuRecommendation, StoreRecommendation } from '@/components'
import {
  menuRecommendationData,
  storeRecommendationData,
} from '@/mocks/menuRecommendationData'

import 'swiper/swiper-bundle.css'

const Recommendation = () => {
  return (
    <section className='w-full flex flex-col gap-4'>
      <MenuRecommendation
        name={menuRecommendationData.name}
        imageUrl={menuRecommendationData.imageUrl}
        accuracy={menuRecommendationData.accuracy}
      />
      <StoreRecommendation
        menu={menuRecommendationData.name}
        data={storeRecommendationData}
      />
      <Button size='sm' variant='sub'>
        다시 추천 받기
      </Button>
      <Button size='sm'>추천 수락하기</Button>
    </section>
  )
}

export default Recommendation
