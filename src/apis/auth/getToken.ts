import { publicInstance } from '@/apis/publicInstance'

export const getToken = async () => {
  try {
    const response = await publicInstance.get('/public/auth0/management-token')

    return response.data.data.access_token
  } catch (error) {
    console.error('토큰 클레임 확인 중 오류 발생:', error)
    throw error
  }
}
