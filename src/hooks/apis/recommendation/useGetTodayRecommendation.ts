import { getTodayRecommendation } from '@/apis/recommendation/getTodayRecommendation'
import { useQuery } from '@tanstack/react-query'

const useGetTodayRecommendation = () => {
  const { data, status } = useQuery({
    queryKey: ['todayRecommendation'],
    queryFn: getTodayRecommendation,
  })
  return { data, status }
}

export default useGetTodayRecommendation
