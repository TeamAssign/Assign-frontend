import { axiosInstance } from '@/apis/axiosInstance'
import { AxiosError, AxiosResponse } from 'axios'
import toast from 'react-hot-toast'

type GetTokenFunction = () => Promise<string>
let tokenProvider: GetTokenFunction | null = null

export const setTokenProvider = (getToken: GetTokenFunction) => {
  tokenProvider = getToken
}

axiosInstance.interceptors.request.use(async (config) => {
  if (tokenProvider) {
    try {
      const token = await tokenProvider()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch (error) {
      console.error('Failed to get token:', error)
    }
  }
  return config
})

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.status === 429) {
      toast.error('너무 많은 요청이 들어왔습니다. 잠시 후 다시 시도해주세요.')
    }
    if (error.status === 401) {
      toast.error('로그인이 만료 되었습니다. 다시 로그인해주세요')
      window.location.href = '/signin'
    }
    return Promise.reject(error)
  },
)
