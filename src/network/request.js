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
    // console.log('request interceptor:' + config)
    /**
     * 1.比如config中的一些信息不符合服务器的要求
     * 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图表
     * 3.某些网络请求（比如登录（token）），必须携带一些特殊的信息
     */
    let token = localStorage.getItem('token')
    if(token) {
      config.headers.common.Authorization = 'Bearer ' + token
      // console.log('现有token:' + token)
    }
    if(config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    // console.log('request interceptor:')
    // console.log(config)
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
    console.log('res.data: ')
    console.log(res.data)
    let { token, tokenCode } = res.data
    // 如果响应返回的数据中有（新的）token，则存入vuex，并更新localStorage
    if(token) { // 考虑要不要改成识别tokenCode或者code
      // store.commit('SET_TOKEN', {tokenCode: tokenCode, token: token})
      localStorage.setItem('token', token)
      localStorage.setItem('tokenCode', tokenCode)
      // console.log('新token' + token)
    }
    return res.data   // 直接返回res.data而不是res，方便后续直接调用
  }, err => {
    console.log('err:' + err)
  })

  // 3.发送真正的网络请求
  return instance(config)
}

// export function request(config) {
//   return new Promise((resolve, reject) =>{
//     // 创建axios的实例
//     const instance = axio.create({
//       baseURL: 'http://localhost:3000',
//       timeout: 5000,
//     })

//     // 发送真正的网络请求
//     instance(config)
//       .then(res => {
//         resolve(res)
//       })
//       .catch(err => {
//         reject(err)
//       }) 
//   })
// }

// export function request(config) {
//   // 1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://localhost:3000',
//     timeout: 5000,
//   })
//   // 发送真正的网络请求
//   instance(config.baseConfig)
//     .then(res => {
//       config.success(res)
//     })
//     .catch(err => {
//       config.failure(err)
//     })
// }


// export function request(config, success, failure) {
//   // 1.创建axios的实例
//   const instance = axios.create({
//     baseURL: 'http://localhost:3000',
//     timeout: 5000,
//   })
//   // 发送真正的网络请求
//   instance(config)
//     .then(res => {
//       success(res)
//     })
//     .catch(err => {
//       failure(err)
//     })
// }