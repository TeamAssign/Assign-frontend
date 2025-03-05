import { getUserPreference } from '@/apis/user/getUserPreference'
import { useQuery } from '@tanstack/react-query'

const useGetUserPreference = () => {
  const { data, status } = useQuery({
    queryKey: ['preference'],
    queryFn: getUserPreference,
  })

  return { data, status }
}

export default useGetUserPreference
