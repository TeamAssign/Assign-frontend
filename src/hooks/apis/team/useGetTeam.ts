import { getTeam } from '@/apis/team/getTeam'
import { useQuery } from '@tanstack/react-query'

const useGetTeam = () => {
  const { data, status } = useQuery({
    queryKey: ['teamList'],
    queryFn: getTeam,
  })
  return { data, status }
}

export default useGetTeam
