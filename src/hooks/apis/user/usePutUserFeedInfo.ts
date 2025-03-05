import queryClient from '@/apis/queryClient'
import { putUserFeedInfo } from '@/apis/user/putUserFeedInfo'
import { ProfileFormValues } from '@/schemas/profileSchema'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const usePutUserFeedInfo = () => {
  const { mutate, status } = useMutation({
    mutationFn: (data: ProfileFormValues) => putUserFeedInfo(data),
    onSuccess: () => {
      toast.success('프로필 수정 완료')
      queryClient.invalidateQueries({
        queryKey: ['userFeed'],
      })
    },
    onError: (error) => {
      toast.error('프로필 수정 실패')
      console.error(error)
    },
  })
  return { mutate, status }
}

export default usePutUserFeedInfo
