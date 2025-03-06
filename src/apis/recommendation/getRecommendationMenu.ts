import { axiosInstance } from '../axiosInstance'

export const getRecommendationMenu = async (
  eatType: string,
  category: string,
  participantsIds?: number[],
) => {
  const url =
    eatType === '그룹'
      ? `/recommendations/category/${category}/type/${eatType}?participantIds=${participantsIds}`
      : `/recommendations/category/${category}/type/${eatType}`
  try {
    const response = await axiosInstance.get(url)
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
