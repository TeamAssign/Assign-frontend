import { axiosInstance } from '../axiosInstance'

export const getUserInfo = async () => {
  try {
    const response = await axiosInstance.get('/users/userInfo')
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
