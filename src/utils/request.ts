import { getToken } from '@/utils/auth'
import axios, { AxiosHeaders } from 'axios'
import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'
import { host } from './config'
import type { IBaseRes } from '@/types/IBaseRes'

export const _instance = axios.create({
  timeout: 20 * 1000
})

_instance.interceptors.request.use(
  function (config: InternalAxiosRequestConfig) {
    const headers = new AxiosHeaders(config.headers)
    if (getToken()) {
      headers.set('token', getToken())
    }
    return {
      ...config,
      url: `${host}${config.url}`,
      headers
    }
  },
  function (error) {
    return Promise.reject(error)
  }
)

_instance.interceptors.response.use(
  (response) => {
    const res = response.data
    if (+res.errCode === 0) {
      res.success = true
    } else {
      res.success = false
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

export const request = <T>(options: AxiosRequestConfig) => {
  return _instance(options) as Promise<IBaseRes<T>>
}

export const baseRequest = <T>(options: AxiosRequestConfig) => {
  const _instance = axios.create({
    timeout: 20 * 1000
  })
  return _instance(options) as Promise<IBaseRes<T>>
}
