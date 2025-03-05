import { axiosInstance } from '../axiosInstance'

export const getUserReviews = async ({ pageParam = 1 }) => {
  try {
    const response = await axiosInstance.get(
      `/users/reviews?page=${pageParam}&size=10`,
    )
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
