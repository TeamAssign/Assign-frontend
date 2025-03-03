import { axiosInstance } from '../axiosInstance'

export const getTodayRecommendation = async () => {
  try {
    const response = await axiosInstance.get('/recommendations/today')
    return response.data.data
  } catch (error) {
    console.error('오늘의 추천 메뉴 조회 중 오류 발생:', error)
  }
}
