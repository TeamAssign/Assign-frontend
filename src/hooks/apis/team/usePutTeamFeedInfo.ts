import queryClient from '@/apis/queryClient'
import { putTeamFoodInfo } from '@/apis/team/putTeamFeedInfo'
import { ProfileFormValues } from '@/schemas/profileSchema'
import { useMutation } from '@tanstack/react-query'

const usePutTeamFeedInfo = (id: string) => {
  const { mutate, status } = useMutation({
    mutationFn: (data: ProfileFormValues) => putTeamFoodInfo(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['teamFeed', id],
      })
    },
    onError: (error) => {
      console.error(error)
    },
  })

  return { mutate, status }
}

export default usePutTeamFeedInfo
