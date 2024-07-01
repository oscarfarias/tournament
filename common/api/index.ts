import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import https from 'https'
import { TOKEN_KEY } from 'common/config/constants'
import {
  AuthorizedUser,
  CategoriesProps,
  GroupProps,
  LoginProps,
  SerializedResponse,
} from 'common/types'
import { User, Category, Group } from 'entities'
import { TeamProps } from 'common/types/team'
import { AddMoreAthletesProps, AthleteProps } from 'common/types/athlete'

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
  getCategories: async (): Promise<
    SerializedResponse<Category, { categories: string }>
  > => {
    return axiosInstance.get(`/categories`)
  },
  createCategory: async (props: CategoriesProps): Promise<Category> => {
    return axiosInstance.post(`/categories`, props)
  },
  getGroupsByYear: async (
    year?: string,
  ): Promise<SerializedResponse<Group, { groups: string }>> => {
    return axiosInstance.get(`/groups/category/${year}`)
  },
  upsertGroup: async (props: GroupProps): Promise<Group> => {
    return axiosInstance.post(`/groups`, props)
  },
  upsertTeam: async (props: TeamProps): Promise<Group> => {
    return axiosInstance.post(`/teams`, props)
  },
  upsertAthlete: async (props: AthleteProps): Promise<Group> => {
    return axiosInstance.post(`/athletes`, props)
  },
  deleteAthlete: async (id: string): Promise<Group> => {
    return axiosInstance.delete(`/athletes/${id}`)
  },
  addMoreAthletes: async (props: AddMoreAthletesProps): Promise<Group> => {
    return axiosInstance.post(`/athletes/addMore`, props)
  },
}
export default API
