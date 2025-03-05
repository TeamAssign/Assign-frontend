import { axiosInstance } from '../axiosInstance'

export const getTeamReviews = async ({ pageParam = 1 }, id: string) => {
  try {
    const response = await axiosInstance.get(
      `/teams/${id}/reviews?page=${pageParam}&size=10`,
    )
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
