import { getToken } from '@/apis/auth/getToken'
import { useQuery } from '@tanstack/react-query'

const useGetToken = () => {
  const { data, error, isError } = useQuery({
    queryKey: ['token'],
    queryFn: getToken,
  })

  return { data, error, isError }
}

export default useGetToken
