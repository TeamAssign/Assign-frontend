import { axiosInstance } from '../axiosInstance'

export const getImage = async (key: string) => {
  try {
    const response = await axiosInstance.get(`/images/url?key=${key}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}
