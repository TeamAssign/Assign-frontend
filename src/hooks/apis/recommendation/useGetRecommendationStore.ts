import { getRecommendationStore } from '@/apis/recommendation/getRecommendationStore'
import { useQuery } from '@tanstack/react-query'

const useGetRecommendationStore = (menu: string) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['recommendationStore', menu],
    queryFn: () => getRecommendationStore(menu),
    enabled: !!menu,
  })
  return { data, status, refetch }
}

export default useGetRecommendationStore
