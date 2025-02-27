import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()
  const { mutate, status, data } = useMutation({
    mutationFn: postUser,
    onSuccess: () => {
      navigate('/')
    },
  })
  return { mutate, status, data }
}

export default usePostUser
