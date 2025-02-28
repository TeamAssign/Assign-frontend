import axios, { AxiosInstance } from 'axios'

export const auth0Instance: AxiosInstance = axios.create({
  baseURL: `https://dev-aqq0w41zxvftci4m.jp.auth0.com/api/v2/`,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const setAuth0Token = (token: string) => {
  auth0Instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${token}`
    return config
  })
}
