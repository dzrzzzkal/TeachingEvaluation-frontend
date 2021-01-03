import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Register from '@/views/Register.vue'

import store from '../store'
import { request } from '../network/request'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    meta: {
      auth: true
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/logout',
    name: 'Logout',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "logout" */ '../views/Logout.vue')
  }
]

/**
 * 以下是弄token的，参考：ing
 * https://segmentfault.com/a/1190000017379244
 */


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  let auth = to.meta.auth // VueRouter 里配置页面是否需要登陆进入
  // let root = to.meta.root // VueRouter 里配置页面是否需要登陆且管理员权限进入
  if(auth) {  // 权限判断 
    let token = localStorage.getItem('token')
    if(!token) {
      // vuex 清除 userInfo 和登陆状态
      // store.commit('SET_USERINFO', {user: '', status: false,})
      // 考虑了一下，!token只有两种情况：1.从来没登陆过 2.登出，感觉不应该清空user
      // 但是后续改成userinfo{}的话，应该除了user，其他的都要清空，后续再改吧
      // store.commit('SET_USERINFO', {userInfo: {}, status: false})
      store.commit('SET_USERINFO', {user: store.state.user, status: false,})
      console.log('请先登录')
      next({path: '/login'})
    } else {  // 有token才发送请求，检查token是过期还是可用
      request({   //应该可以将url封装成API.getUserinfo之类的？
        url: '/test',
        method: 'get',
      }).then(res => {
        // ↓有token的情况下，肯定有user，因为登录时是set了token和user的，所以这里只做status的更新
        // 下面可以根据status或者tokenCode==200(成功)/20001(过期)进行判断
        // 这里暂时还是用tokenCode，因为暂时不确定后端要不要有status这个东西
        // 其实这里也不确定这个tokenCode，它的作用，还有数值如何定
        store.commit('SET_USERINFO', {user: store.state.user, status: res.status})
        let tokenCode = res.tokenCode
        if(tokenCode == 200) { // tokenCode == 200 解析成功，用户处于登录状态
          // store.commit('SET_USERINFO', {user: store.state.user, status: res.status})
          next()
        } else {  // tokenCode == 20001 token已过期
          console.log('token已失效')
          console.log('请先登录')
          next({path: '/login'})
        }
      })
    }
    // 读取tokenCode，localStorage以字符串形式存储
    // let tokenCode = localStorage.getItem('tokenCode')
    // if(tokenCode == 20000) {  // 无token（PS。这里不一定行，待测试）  
    //   // vuex清除userinfo和登录状态 https://www.jb51.net/article/168848.htm
    //   // 用其他方法存储token：https://blog.csdn.net/liuxin00020/article/details/106617524
    //   store.commit('SET_USERINFO', {user: '', status: false,})
    //   console.log('store-user:' + store.state.user)
    //   console.log('store-status:' + store.state.status)
    //   console.log('请先登录')
    //   next({path: '/login'})
    // } else if(tokenCode == 20001) { // token过期，只修改登录状态status，不修改存储的用户信息user
    //   store.commit('SET_USERINFO', {user: localStorage.getItem('user'), status: false,})
    //   console.log('store-user:' + store.state.user)
    //   console.log('store-status:' + store.state.status)
    //   console.log('请先登录')
    //   next({path: '/login'})
    // } else {  // token == 200，解析成功
    //   next()
    // }
  } else {
    // 没有meta.auth 不用管
    next()
  }
})
// router.beforeEach((to, from, next) => {
//   if(to.meta.auth) {  // 权限判断
//     if(localStorage.getItem('token')) {  // 读取token值
//       next()
//     } else {
//       alert('请先登录')
//       next({path: '/login'})
//     }
//   } else {
//     // 没有meta.auth 不用管
//     next()
//   }
// })

export default router
