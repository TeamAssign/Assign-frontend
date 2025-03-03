import { axiosInstance } from '../axiosInstance'

export const getRecommendationStore = async (menu: string) => {
  try {
    const response = await axiosInstance.get(
      `/recommendations/menu?menu=${menu}`,
    )
    return response.data.data
  } catch (e) {
    console.error(e)
  }
}
