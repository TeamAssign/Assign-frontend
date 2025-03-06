import CalendarIcon from '@/assets/icons/CalendarIcon.svg?react'
import SoloIcon from '@/assets/icons/SoloIcon.svg?react'
import TogetherIcon from '@/assets/icons/TogetherIcon.svg?react'

import {
  Button,
  Loader,
  PieChart,
  PreferenceBar,
  RecommendationBar,
} from '@/components'
import useGetTodayRecommendation from '@/hooks/apis/recommendation/useGetTodayRecommendation'
import useGetCompanySummary from '@/hooks/apis/summary/useGetCompanySummary'
import useGetUserPreference from '@/hooks/apis/user/useGetUserPreferece'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const { data: todayRecommend, status: todayRecommendationStatus } =
    useGetTodayRecommendation()

  const { data: userPreference, status: preferenceStatus } =
    useGetUserPreference()

  const { data: companySummary, status: companySummaryStatus } =
    useGetCompanySummary()

  const isLoading =
    todayRecommendationStatus === 'pending' ||
    preferenceStatus === 'pending' ||
    companySummaryStatus === 'pending'

  if (isLoading) {
    return (
      <div className='flex items-center justify-center w-full absolute inset-0 max-w-[600px] min-h-screen mx-auto '>
        <Loader />
      </div>
    )
  }

  return (
    <div className='w-full'>
      <p className='pb-4 font-bold text-sub-2 text-body'>
        💻 AI를 통해 음식 메뉴를 추천 받아 보세요!
      </p>
      <div className='grid grid-cols-3 gap-3 pb-4'>
        <Button
          variant='white'
          size='lg'
          onClick={() => navigate('/selectoptions/alone')}
        >
          <div className='flex items-center gap-2'>
            <SoloIcon />
            <p>혼자 먹기</p>
          </div>
        </Button>
        <Button
          variant='white'
          size='lg'
          onClick={() => navigate('/selectoptions/together')}
        >
          <div className='flex items-center gap-2'>
            <TogetherIcon />
            <p>같이 먹기</p>
          </div>
        </Button>
        <Button
          variant='white'
          size='lg'
          onClick={() => navigate('/selectoptions/team')}
        >
          <div className='flex items-center gap-2'>
            <CalendarIcon />
            <p>회식 하기</p>
          </div>
        </Button>
      </div>

      <div className='flex flex-col gap-1'>
        <span className='py-1 font-bold text-sub-2 text-body'>
          🍽️ 직원들이 가장 선호하는 음식 종류는 무엇일까요?
        </span>
        {companySummary && (
          <PieChart data={companySummary.statistics.categories} />
        )}
      </div>
      <div className='flex flex-col gap-1 pb-4'>
        <div className='flex flex-col gap-2 pb-4'>
          <h1 className='font-bold text-body text-sub-2'>메뉴 추천</h1>
          <h2 className='text-lg text-dark-gray'>
            오늘은 이런 메뉴는 어떠세요?
          </h2>
        </div>
        <RecommendationBar
          imgUrl={todayRecommend.imageUrl}
          menu={todayRecommend.name}
          accuracy={todayRecommend.accuracy}
        />
      </div>
      <div className='flex flex-col gap-1 py-4'>
        <div className='flex flex-col gap-2 pb-4'>
          <span className='font-bold text-body text-sub-2'>
            💁🏻‍♂️ 나의 취향 분석
          </span>
          <h2 className='text-lg text-dark-gray'>
            AI가 분석한 취향 데이터입니다.
          </h2>
        </div>
        {userPreference && (
          <PreferenceBar
            price={userPreference.priceCategory}
            keyword={userPreference.mealTags}
            accuracy={userPreference.agreePercentage}
          />
        )}
      </div>
    </div>
  )
}

export default Home
