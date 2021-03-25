import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

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
  },
  {
    path: '/course',
    name: 'Course',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "course" */ '../views/Course.vue')
  },
  {
    path: '/class',
    name: 'Class',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "class" */ '../views/Class.vue')
  },
  {
    path: '/evaluationProgress',
    name: 'EvaluationProgress',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "evaluationProgress" */ '../views/EvaluationProgress.vue')
  },
  {
    path: '/evaluationSheet/:id',
    name: 'EvaluationSheet',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "evaluationSheet" */ '../views/EvaluationSheet.vue')
  },
  {
    path: '/evaluationSheetList',
    name: 'EvaluationSheetList',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "evaluationSheetList" */ '../views/EvaluationSheetList.vue')
  },
  {
    path: '/annualReportList',
    name: 'AnnualReportList',
    meta: {
      auth: true
    },
    component: () => import(/* webpackChunkName: "annualReportList" */ '../views/AnnualReportList.vue')
  }
]

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
      store.commit('SET_USERINFO', {user: store.state.user, status: false,})
      alert('请先登录')
      next({path: '/login'})
    } else {  // 有token才发送请求，检查token是过期还是可用
      // 重复，前端每次都要对后端进行一次请求，判断token是否过期，而后端每次都会拦截，判断token是否过期，相当于前后台都判断了
      request({
        url: '/checkToken', // 其实就是checkToken()
        method: 'post',
      }).then(res => {
        store.commit('SET_USERINFO', {user: store.state.user, status: res.status})
        let tokenCode = res.tokenCode
        if(tokenCode == 200) { // tokenCode == 200 解析成功，用户处于登录状态
          next()
        } else {  // tokenCode == 20001 token已过期
          console.log('token已失效')
          alert('请先登录')
          next({path: '/login'})
        }
      })
    }
  } else {
    // 没有meta.auth 不用管
    next()
  }
})

export default router
