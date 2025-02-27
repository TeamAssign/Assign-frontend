import { axiosInstance } from '@/apis/axiosInstance'
import { AxiosError, AxiosResponse } from 'axios'

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
    console.error(error)
    return Promise.reject(error)
  },
)
