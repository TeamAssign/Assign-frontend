import { axiosInstance } from '@/apis/axiosInstance'

export const getCompanySummary = async () => {
  try {
    const response = await axiosInstance.get('/summary/company')
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
