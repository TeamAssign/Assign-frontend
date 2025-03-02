import { getUserInfo } from '@/apis/user/getUserInfo'
import { useQuery } from '@tanstack/react-query'

const useGetUserInfo = () => {
  const { data, status } = useQuery({
    queryKey: ['userInfo'],
    queryFn: getUserInfo,
  })
  return { data, status }
}

export default useGetUserInfo
