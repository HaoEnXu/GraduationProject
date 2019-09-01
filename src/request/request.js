'use strict'
// import Bus from '@/utils/Bus.js'
import axios from 'axios'
import router from '../router/index.js'
import config from './config.js' // 倒入默认配置
// 请求拦截
axios.interceptors.request.use(config => {
  // loading
  return config
}, error => {
  return Promise.reject(error)
})
// 响应拦截
axios.interceptors.response.use(response => {
  // if (response.data.code===4001 || response.data.code===4003 || response.data.code===4002) { 
  //   router.push('/')
  // }
  return response
}, error => {
  return Promise.resolve(error.response)
})

export default {
  post(url, data) {
    return axios({
      method: 'post',
      baseURL: config.baseURL,
      url,
      data: data,
      timeout: config.timeout,
      headers: config.getHeaders()
    })
  },
  get (url, params) {
    return axios({
      method: 'get',
      baseURL: config.baseURL,
      url,
      params, // get 请求时带的参数
      timeout: config.timeout,
      headers: config.getHeaders()
    })
  },
  put (url,data){
    return axios({
      method: 'put',
      baseURL: config.baseURL,
      url,
      data: data,
      timeout: config.timeout,
      headers: config.getHeaders()
    })
  },
  patch (url,data) {
    return axios({
      method: 'patch',
      baseURL: config.baseURL,
      url,
      data: data,
      timeout: config.timeout,
      headers: config.getHeaders()
    })
  },
  delete(url,data){
    return axios({
      method: 'delete',
      baseURL: config.baseURL,
      data:data,
      url,
      timeout: config.timeout,
      headers: config.getHeaders()
    })
  },
  getData (url, params) {
    return axios({
      method: 'get',
      baseURL: config.baseURL,
      url,
      params, // get 请求时带的参数
      timeout: config.timeout,
      headers: config.getHeaders()
    })
  },
  post_callback (url, data) {
    return axios({
      method: 'post',
      baseURL: config.baseURL,
      url,
      data: data,
      timeout: config.timeout,
      headers: config.getHeaders()
    })
  },
}
