import { getTeamFeedInfo } from '@/apis/team/getTeamFeedInfo'
import { useQuery } from '@tanstack/react-query'

const useGetTeamFeedInfo = (id: string) => {
  const { data, status } = useQuery({
    queryKey: ['teamFeed', id],
    queryFn: () => getTeamFeedInfo(id),
  })

  return { data, status }
}

export default useGetTeamFeedInfo
