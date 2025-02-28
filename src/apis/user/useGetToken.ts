import { useQuery } from '@tanstack/react-query'
import { publicInstance } from '../publicInstance'

const getToken = async () => {
  try {
    const token = await publicInstance.get('/public/auth0/management-token')
    return token.data.access_token
  } catch (error) {
    console.error('토큰 클레임 확인 중 오류 발생:', error)
  }
}

const useGetToken = () => {
  const { data } = useQuery({
    queryKey: ['token'],
    queryFn: getToken,
  })
  return { data }
}

export default useGetToken
