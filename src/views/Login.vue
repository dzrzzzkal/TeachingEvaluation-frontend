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
import { defineComponent } from 'vue'
import { ElMessage } from 'element-plus'

export default defineComponent({
  setup() {
    return {
      showSuccess(msg) {
        ElMessage.success({
          message: msg,
          type: 'success'
        });
      },
      showError(msg) {
        ElMessage.error(msg);
      }
    }
  },

  data() {
    return {
      user: '',
      pass: '',
    } 
  },
  methods: {
    submit() {
      return request({
        url: '/doLogin',
        method: 'post',
        data: {
          user: this.user,
          pass: this.pass
        },
        headers: {
          // 'Content-Type': 'application/json'
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        if(res.code === 200 && res.token) { // 登录成功
          this.showSuccess('登录成功')
          localStorage.setItem('token', res.token)
          localStorage.setItem('tokenCode', res.tokenCode)
          this.$store.commit('SET_USERINFO', {user: res.user, status: res.status})
          // this.SET_USERINFO(res)
          this.$router.push('/about')
        }else { // 登录失败
          this.showError('用户名或密码错误')
        }
        
      }).catch(err => {
        this.showError('请求失败')
      })
    },
  },
  created() {

  },
  
})


</script>
