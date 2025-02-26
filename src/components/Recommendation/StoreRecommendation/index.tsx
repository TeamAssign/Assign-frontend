import { StoreCard } from '@/components'
import { MenuStoreValues } from '@/types'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

interface StoreRecommendationProps {
  menu: string
  data: MenuStoreValues[]
}

const StoreRecommendation = ({ menu, data }: StoreRecommendationProps) => {
  return (
    <div className='w-full flex flex-col gap-2'>
      <span className='text-body text-sub-2 font-bold'>
        🍽️ {menu}에 해당하는 맛집 리스트
      </span>
      <div className='w-full'>
        <Swiper
          modules={[Navigation, Pagination]}
          slidesPerView={2.2}
          slidesPerGroup={2}
          spaceBetween={10}
          pagination={{ clickable: true }}
          style={{ paddingBottom: '40px' }}
        >
          {data.map((store, index) => (
            <SwiperSlide key={index}>
              <StoreCard {...store} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

export default StoreRecommendation
