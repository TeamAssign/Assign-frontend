import { NoResult, StoreCard } from '@/components'
import { MenuStoreValues } from '@/types'
import { Navigation, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'

interface StoreRecommendationProps {
  menu: string
  data: MenuStoreValues[]
}

const StoreRecommendation = ({ menu, data }: StoreRecommendationProps) => {
  return (
    <div className='flex flex-col w-full gap-2'>
      <span className='font-bold text-body text-sub-2'>
        🍽️ {menu}에 해당하는 맛집 리스트
      </span>
      <div className='w-full'>
        {data.length === 0 && <NoResult />}
        {data.length !== 0 && (
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
        )}
      </div>
    </div>
  )
}

export default StoreRecommendation
