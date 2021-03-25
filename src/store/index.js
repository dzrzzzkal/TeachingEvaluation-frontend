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
