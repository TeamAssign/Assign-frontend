import { axiosInstance } from '../axiosInstance'

export const getTeamFeedInfo = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/teams/${id}/profile`)
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
