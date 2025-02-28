import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../axiosInstance'

const getTeam = async () => {
  try {
    const response = await axiosInstance.get('/teams')
    console.log('API BASE URL:', import.meta.env.VITE_API_BASE_URL)

    return response.data
  } catch (error) {
    console.error('팀 리스트 조회 중 오류 발생:', error)
  }
}

const useGetTeam = () => {
  const { data, status } = useQuery({
    queryKey: ['teamList'],
    queryFn: getTeam,
  })
  return { data, status }
}

export default useGetTeam
