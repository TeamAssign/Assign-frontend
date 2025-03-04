import queryClient from '@/apis/queryClient'
import { postAcceptMenu } from '@/apis/recommendation/postAcceptMenu'
import { PostAcceptMenuType } from '@/types/DTO'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'

const usePostAcceptMenu = (data: PostAcceptMenuType) => {
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: () => postAcceptMenu(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['history'],
      })
      navigate('/history')
    },
    onError: (error) => {
      console.error(error)
    },
  })
  return { mutate }
}

export default usePostAcceptMenu
