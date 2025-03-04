import { getUserFeedInfo } from '@/apis/user/getUserFeedInfo'
import { useQuery } from '@tanstack/react-query'

const useGetUserFeedInfo = () => {
  const { data, status } = useQuery({
    queryKey: ['userFeed'],
    queryFn: getUserFeedInfo,
  })

  return { data, status }
}

export default useGetUserFeedInfo
