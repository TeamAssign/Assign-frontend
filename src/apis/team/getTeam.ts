import { axiosInstance } from '../axiosInstance'

export const getTeam = async () => {
  try {
    const response = await axiosInstance.get('/teams')
    return response.data
  } catch (error) {
    console.error('팀 리스트 조회 중 오류 발생:', error)
  }
}
