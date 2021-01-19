<template>
  <div style="padding:30px;">
    <div>登录</div>
    <input type="text" v-model="user" placeholder="username">
    <br>
    <input type="password" v-model="pass" placeholder="password">
    <br>
    <input type="button" @click="submit" value="提交">
  </div>
</template>

<script>
import { request } from '@/network/request'
// import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      user: '',
      pass: '',
    } 
  },
  methods: {
    // ...mapMutations([
    //   // 'nameOfMutation', //also supports payload `this.nameOfMutation(amount)` 
    //   // 'SET_TOKEN',
    //   'SET_USERINFO'
    // ]),

    submit() {
      return request({
        url: '/doLogin',
        method: 'post',
        // data: JSON.stringify({
        //   user: this.user,
        //   pass: this.pass
        // }),
        data: {
          user: this.user,
          pass: this.pass
        },
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        // 以下不需要res.data.xxx，因为响应拦截器已经拦截了，直接返回的就是res.data
        // console.log(res)

        // vuex
        // this.LOGIN({
        //   // tokenCode: res.tokenCode,
        //   token: res.token,
        //   user: res.user
        // })
        // this.SET_TOKEN(res)
        localStorage.setItem('token', res.token)
        localStorage.setItem('tokenCode', res.tokenCode)
        this.$store.commit('SET_USERINFO', {user: res.user, status: res.status})
        // this.SET_USERINFO(res)
        this.$router.push('/about')
      }).catch(err => {
        console.log(err)
      })
    },
  },
  created() {

  },
  
}


</script>
