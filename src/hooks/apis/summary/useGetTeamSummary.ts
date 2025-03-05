import { getTeamSummary } from '@/apis/summary/getTeamSummary'
import { useQuery } from '@tanstack/react-query'

const useGetTeamSummary = (id: string) => {
  const { data, status } = useQuery({
    queryKey: ['summary', id],
    queryFn: () => getTeamSummary(id),
  })

  return { data, status }
}

export default useGetTeamSummary
