import { axiosInstance } from '@/apis/axiosInstance'

export const getTeamSummary = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/summary/teams/${id}`)
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
