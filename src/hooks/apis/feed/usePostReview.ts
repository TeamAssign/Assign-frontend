import { postReview } from '@/apis/feed/postReview'
import { ReviewFormValues } from '@/schemas/reviewSchema'
import { useMutation } from '@tanstack/react-query'

const usePostReview = () => {
  const { mutate, status } = useMutation({
    mutationFn: (data: ReviewFormValues) => postReview(data),
    onSuccess: () => {
      console.log('성공')
    },
    onError: (error) => {
      console.error(error)
    },
  })
  return { mutate, status }
}

export default usePostReview
