import { postReview } from '@/apis/feed/postReview'
import queryClient from '@/apis/queryClient'
import { ReviewFormValues } from '@/schemas/reviewSchema'
import { useUserStore } from '@/store/UserInfoStore'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const usePostReview = () => {
  const id = String(useUserStore((state) => state.teamId))
  const { mutate, status } = useMutation({
    mutationFn: (data: ReviewFormValues) => postReview(data),
    onSuccess: () => {
      toast.success('리뷰 등록 완료')
      queryClient.invalidateQueries({
        queryKey: ['history'],
      })

      queryClient.invalidateQueries({
        queryKey: ['reviews'],
      })

      queryClient.invalidateQueries({
        queryKey: ['reviews', id],
      })
    },
    onError: (error) => {
      toast.error('리뷰 등록 실패')
      console.error(error)
    },
  })
  return { mutate, status }
}

export default usePostReview
