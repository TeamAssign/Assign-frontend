import { PostAcceptMenuType } from '@/types/DTO'
import { axiosInstance } from '../axiosInstance'

export const postAcceptMenu = async (data: PostAcceptMenuType) => {
  try {
    await axiosInstance.post('/recommendations/menu', data)
  } catch (e) {
    console.error(e)
  }
}
