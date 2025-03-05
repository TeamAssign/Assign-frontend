import { getUserSummary } from '@/apis/summary/getUserSummary'
import { useQuery } from '@tanstack/react-query'

const useGetUserSummary = () => {
  const { data, status } = useQuery({
    queryKey: ['summary'],
    queryFn: getUserSummary,
  })

  return { data, status }
}

export default useGetUserSummary
