import { useQuery } from '@tanstack/react-query'
import { publicInstance } from '../publicInstance'

const getToken = async () => {
  try {
    const response = await publicInstance.get('/public/auth0/management-token')
    return response.data.data.access_token
  } catch (error) {
    console.error('토큰 클레임 확인 중 오류 발생:', error)
    throw error
  }
}

const useGetToken = () => {
  const { data, error, isError } = useQuery({
    queryKey: ['token'],
    queryFn: getToken,
  })

  return { data, error, isError }
}

export default useGetToken
