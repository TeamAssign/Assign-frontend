import { axiosInstance } from '../axiosInstance'

export const getHistories = async ({ pageParam = 1 }) => {
  try {
    const response = await axiosInstance.get(
      `/recommendations?page=${pageParam}&size=10`,
    )
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
