import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../axiosInstance'

const getTodayRecommendation = async () => {
  try {
    const response = await axiosInstance.get('/recommendations/today')
    return response.data
  } catch (error) {
    console.error('오늘의 추천 메뉴 조회 중 오류 발생:', error)
  }
}

const useGetTodayRecommendation = () => {
  const { data } = useQuery({
    queryKey: ['todayRecommendation'],
    queryFn: getTodayRecommendation,
  })
  return { data }
}

export default useGetTodayRecommendation
