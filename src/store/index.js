import { createStore } from 'vuex'

export default createStore({
// export const store1 =  createStore({
  state: {
    user: localStorage.getItem('user') || '',
    // tokenCode: localStorage.getItem('tokenCode') || null,
    // token: localStorage.getItem('token') || null,
    status: false, //登录状态，目前只有vuex这里有，还没有正式用处，待用到其他界面去
  },
  mutations: {
    // LOGIN: (state, data) => {
    //   state.user = data.user
    //   state.tokenCode = data.tokenCode
    //   state.token = data.token
    //   state.status = data.status
    //   localStorage.setItem('tokenCode', data.tokenCode)  //存储token返回码
    //   localStorage.setItem('token', data.token)  // 存储token
    //   localStorage.setItem('user', data.user) // 存储user
    //   localStorage.setItem('status', data.status) // 存储登录状态
    // },
    
    // 暂时取消这个SET_TOKEN，
    // 因为./request.js中有判断if(token)的情况，即使这里设置null，会返回null空对象
    // 而因为这里属性不能删除，所以之后还需要另外localStorage.removeItem()，那么localStorage为空而vuex为null
    // SET_TOKEN: (state, data) => {
    //   state.tokenCode = data.tokenCode
    //   state.token = data.token
    //   localStorage.setItem('tokenCode', data.tokenCode)  //存储token返回码
    //   localStorage.setItem('token', data.token)  // 存储token
    // },
    SET_USERINFO: (state, data) => {
      if(data.user) {

      }
      state.user = data.user
      state.status = data.status
      // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
      localStorage.setItem('user', data.user)
      localStorage.setItem('status', data.status)
    },
  },
  actions: {
  },
  modules: {
  }
})
