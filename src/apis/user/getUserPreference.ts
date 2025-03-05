import { axiosInstance } from '../axiosInstance'

export const getUserPreference = async () => {
  try {
    const response = await axiosInstance.get('/users')
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
