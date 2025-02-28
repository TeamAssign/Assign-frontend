import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from '../axiosInstance'

const getTeam = async () => {
  try {
    const response = await axiosInstance.get('/teams/')
    return response.data
  } catch (error) {
    console.error('팀 리스트 조회 중 오류 발생:', error)
  }
}

const useGetTeam = () => {
  return useQuery({
    queryKey: ['teamList'],
    queryFn: getTeam,
  })
}

export default useGetTeam
