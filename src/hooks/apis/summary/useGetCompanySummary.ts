import { getCompanySummary } from '@/apis/summary/getCompanySummary'
import { useQuery } from '@tanstack/react-query'

const useGetCompanySummary = () => {
  const { data, status } = useQuery({
    queryKey: ['summary', 'company'],
    queryFn: getCompanySummary,
  })

  return { data, status }
}

export default useGetCompanySummary
