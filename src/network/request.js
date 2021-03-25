import axios from 'axios'
import qs from 'qs' // A querystring parsing and stringifying library with some added security.
import store from '../store'

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://localhost:3000',
    timeout: 5000,
    // headers: {
    //   // 将token在发送时添加到头部，发送给后台
    //   'Authorization': 'Bearer ' + localStorage.getItem('token')
    // }
  })

  // 2.axios的拦截器
  // 2.1.请求拦截
  instance.interceptors.request.use(config => {
    let token = localStorage.getItem('token')
    if(token) {
      config.headers.Authorization = 'Bearer ' + token
    }
    if(config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    return config
  }, err => {
    console.log(err)
  })

  // 2.2.响应拦截
  instance.interceptors.response.use(res => {
    if(!res.data) {
      return {
        msg: '数据返回不合理'
      }
    }
    let { token, tokenCode } = res.data
    // 如果响应返回的数据中有（新的）token，则存入localStorage
    if(token) {
      localStorage.setItem('token', token)
      localStorage.setItem('tokenCode', tokenCode)
    }
    return res.data   // 直接返回res.data而不是res，方便后续直接调用
  }, err => {
    console.log('err:' + err)
  })

  // 3.发送真正的网络请求
  return instance(config)
}