import { useMutation } from '@tanstack/react-query'
import { axiosInstance } from '../axiosInstance'

interface PostUserProps {
  userName: string
  teamName: string
  spicy: number
  salty: number
  sweet: number
  pros: string
  cons: string
}

const postUser = async (userInfo: PostUserProps) => {
  try {
    await axiosInstance.post('/users/register', userInfo)
  } catch (error) {
    console.error(error)
  }
}

const usePostUser = () => {
  return useMutation({
    mutationFn: (data: PostUserProps) => postUser(data),
    onSuccess: () => {
      console.log('register success')
    },
    onError: (error) => {
      console.error('register error:', error)
    },
  })
}

export default usePostUser
