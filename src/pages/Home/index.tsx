import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react'
import SoloIcon from '@/assets/icons/SoloIcon.svg?react'
import TogetherIcon from '@/assets/icons/TogetherIcon.svg?react'
import { homeStatsData } from '@/mocks/homeStatsData'
import { preferenceData } from '@/mocks/preferenceData'

import {
  Button,
  PieChart,
  PreferenceBar,
  RecommendationBar,
} from '@/components'

const Home = () => {
  return (
    <div className='p-4'>
      <div className='grid grid-cols-3 gap-3 pb-8'>
        <Button variant='white' size='lg'>
          <div className='flex items-center gap-2'>
            <SoloIcon />
            <p>혼자 먹기</p>
          </div>
        </Button>
        <Button variant='white' size='lg'>
          <div className='flex items-center gap-2'>
            <TogetherIcon />
            <p>같이 먹기</p>
          </div>
        </Button>
        <Button variant='white' size='lg'>
          <div className='flex items-center gap-2'>
            <CalendarIcon />
            <p>회식 하기</p>
          </div>
        </Button>
      </div>

      <div className='flex flex-col gap-1'>
        <h1 className='py-1 text-xl font-bold'>
          🍽️ 직원들이 가장 선호하는 음식 종류는 무엇일까요?
        </h1>
        <PieChart data={homeStatsData} />
      </div>
      <div className='flex flex-col gap-1 pb-4'>
        <div className='flex flex-col gap-2 pb-4'>
          <h1 className='text-xl font-bold'>메뉴 추천</h1>
          <h2 className='text-lg text-dark-gray'>
            오늘은 이런 메뉴는 어떠세요?
          </h2>
        </div>
        <RecommendationBar
          imgUrl='https://i.pinimg.com/236x/4e/56/fa/4e56fa3ef27a56c8b5e6bec2b2b18d7f.jpg'
          menu='피자'
        />
      </div>
      <div className='flex flex-col gap-1 py-4'>
        <div className='flex flex-col gap-2 pb-4'>
          <h1 className='text-xl font-bold'>나의 취향 분석</h1>
          <h2 className='text-lg text-dark-gray'>
            AI가 분석한 취향 데이터입니다.
          </h2>
        </div>
        <PreferenceBar
          price={preferenceData.price}
          keyword={preferenceData.keyword}
          accuracy={preferenceData.accuracy}
          accuracyBefore={preferenceData.accuracyBefore}
        />
      </div>
    </div>
  )
}

export default Home
