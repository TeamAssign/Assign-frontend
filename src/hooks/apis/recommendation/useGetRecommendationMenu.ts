import { getRecommendationMenu } from '@/apis/recommendation/getRecommendationMenu'
import { useQuery } from '@tanstack/react-query'

const useGetRecommendationMenu = (
  eatType: string,
  category: string,
  participantIds?: number[],
) => {
  const { data, status, refetch } = useQuery({
    queryKey: ['recommendation', category, participantIds, eatType],
    queryFn: () => getRecommendationMenu(eatType, category, participantIds),
  })

  return { data, status, refetch }
}

export default useGetRecommendationMenu
