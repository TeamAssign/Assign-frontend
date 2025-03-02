import { getTodayRecommendation } from '@/apis/recommendation/getTodayRecommendation'
import { useQuery } from '@tanstack/react-query'

const useGetTodayRecommendation = () => {
  const { data } = useQuery({
    queryKey: ['todayRecommendation'],
    queryFn: getTodayRecommendation,
  })
  return { data }
}

export default useGetTodayRecommendation
