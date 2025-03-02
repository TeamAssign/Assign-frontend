import { axiosInstance } from '@/apis/axiosInstance'
import { PostUserProps } from '@/types/DTO'

export const postRegisterUser = async (userInfo: PostUserProps) => {
  try {
    await axiosInstance.post('/users/register', userInfo)
  } catch (error) {
    console.error(error)
  }
}
