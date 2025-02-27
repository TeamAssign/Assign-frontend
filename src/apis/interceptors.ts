import { axiosInstance } from '@/apis/axiosInstance'
import { AxiosError, AxiosResponse } from 'axios'

axiosInstance.interceptors.request.use((config) => {
  // 토큰을 가져오는 로직 필요함
  const token = ''
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// axios response interceptors 추가로직 추가해야함 ex) 인증에 대한 에러
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    console.error(error)
    return Promise.reject(error)
  },
)
