import { axiosInstance } from '../axiosInstance'

export const getUserFeedInfo = async () => {
  try {
    const response = await axiosInstance.get('/users/profile')
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
