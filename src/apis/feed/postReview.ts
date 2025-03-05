import { ReviewFormValues } from '@/schemas/reviewSchema'
import { axiosInstance } from '../axiosInstance'

export const postReview = async (data: ReviewFormValues) => {
  const submitData = {
    recommendationId: data.recommendationId ? data.recommendationId : null,
    imgUrl: data.reviewImg,
    category: data.category,
    type: data.type,
    menu: data.menu,
    comment: data.comment,
    star: data.star,
    participants: data.participants.map((participant) => participant.id),
  }
  try {
    const response = await axiosInstance.post('/reviews', submitData)
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
