import { postReview } from '@/apis/feed/postReview'
import { ReviewFormValues } from '@/schemas/reviewSchema'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'

const usePostReview = () => {
  const { mutate, status } = useMutation({
    mutationFn: (data: ReviewFormValues) => postReview(data),
    onSuccess: () => {
      toast.success('리뷰 등록 완료')
    },
    onError: (error) => {
      toast.error('리뷰 등록 실패')
      console.error(error)
    },
  })
  return { mutate, status }
}

export default usePostReview
