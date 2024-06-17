import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import https from 'https'
import { TOKEN_KEY } from 'common/config/constants'
import { AuthorizedUser, LoginProps } from 'common/types'
import { User } from 'entities'

const requestHandler = (config: AxiosRequestConfig): unknown => {
  if (config.headers) {
    if (typeof window !== `undefined`) {
      const token = window.localStorage.getItem(TOKEN_KEY) ?? ``
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
}
const responseHandler = (response: AxiosResponse): unknown => {
  const {
    data: { data, error, success },
  } = response
  if (success) {
    return data
  } else {
    return Promise.reject(error)
  }
}
const baseURL = process.env.APP_API_URL ?? `/api`
const axiosInstance = axios.create({
  baseURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  validateStatus() {
    return true
  },
})
axiosInstance.interceptors.request.use(requestHandler, (error) =>
  Promise.reject(error),
)
axiosInstance.interceptors.response.use(responseHandler, (error) =>
  Promise.reject(error),
)

const API = {
  login: async (props: LoginProps): Promise<AuthorizedUser> => {
    return axiosInstance.post(`/login`, props)
  },
  getCurrentUser: async (): Promise<User> => {
    return axiosInstance.get(`/login/currentUser`)
  },
}
export default API
