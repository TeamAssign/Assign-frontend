import { PostAcceptMenuType } from '@/types/DTO'
import axios from 'axios'
import toast from 'react-hot-toast'
import { axiosInstance } from '../axiosInstance'

export const postAcceptMenu = async (data: PostAcceptMenuType) => {
  try {
    await axiosInstance.post('/recommendations/menu', data)
  } catch (e) {
    console.error(e)
    if (axios.isAxiosError(e) && e.response?.status === 429) {
      toast.error('요청할 수 있는 한도를 넘었습니다. 나중에 다시 요청해주세요')
    }
  }
}
