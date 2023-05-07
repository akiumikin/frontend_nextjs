/*****************************************************************************************
 * axiosを使ったGET, POST, PUT, DELETEの共通処理
 *
 * GET以外ではCSRFトークンの設定をしている
 ****************************************************************************************/

import axios, { AxiosRequestConfig } from 'axios'

export async function axiosGet(url: string, config?: AxiosRequestConfig) {
  return axios.get(url, config)
}

export async function axiosPost(url: string, data?: any, config?: AxiosRequestConfig) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = getCsrfToken()
  return axios.post(url, data, config)
}

export async function axiosPut(url: string, data?: any, config?: AxiosRequestConfig) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = getCsrfToken()
  return axios.put(url, data, config)
}

export async function axiosDelete(url: string, config?: AxiosRequestConfig) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = getCsrfToken()
  return axios.delete(url, config)
}

const getCsrfToken = (): string => {
  const metaElem = document.querySelector("meta[name='csrf-token']")
  if (!metaElem) return ''

  const csrfToken = metaElem.getAttribute('content')
  if (!csrfToken) return ''

  return csrfToken
}
