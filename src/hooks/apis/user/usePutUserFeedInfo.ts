import queryClient from '@/apis/queryClient'
import { putUserFeedInfo } from '@/apis/user/putUserFeedInfo'
import { ProfileFormValues } from '@/schemas/profileSchema'
import { useMutation } from '@tanstack/react-query'

const usePutUserFeedInfo = () => {
  const { mutate, status } = useMutation({
    mutationFn: (data: ProfileFormValues) => putUserFeedInfo(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['userFeed'],
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })
  return { mutate, status }
}

export default usePutUserFeedInfo
