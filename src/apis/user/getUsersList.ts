import toast from 'react-hot-toast'
import { axiosInstance } from '../axiosInstance'

export const getUsersList = async ({ pageParam = 1 }) => {
  try {
    const response = await axiosInstance.get(
      `/users/search?page=${pageParam}&size=50`,
    )
    return response.data.data
  } catch (e) {
    console.error(e)
    toast.error('유저 리스트를 불러오는데 실패했습니다')
  }
}
