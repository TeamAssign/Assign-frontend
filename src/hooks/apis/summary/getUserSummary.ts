import { axiosInstance } from '@/apis/axiosInstance'

export const getUserSummary = async () => {
  try {
    const response = await axiosInstance.get('/summary/users')
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
