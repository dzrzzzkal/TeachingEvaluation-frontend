<template>
  <div style="padding:30px;">
    <div>注册</div>
    <input type="text" v-model="user" placeholder="username">
    <br>
    <input type="password" v-model="pass" placeholder="password">
    <br>
    <!-- <input type="text" v-model="identity" placeholder="identity">
    <br> -->
    <input type="button" @click="submit" value="提交">
  </div>
</template>

<script>
import {request} from '@/network/request'
export default {
  data() {
    return {
      user: '',
      pass: '',
    } 
  },
  methods: {
    submit() {
      return request({
        url: '/register',
        method: 'post',
        data: JSON.stringify({
          user: this.user,
          pass: this.pass
        }),
        headers: {
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        console.log(err)
      })
    },

    // vue-admin-template的request()格式↓
    // fetchList(query) {
    //   return request({
    //     url: '/string',
    //     method: 'get',
    //     params: query,
    //   })
    // },
    // fetchData() {
    //   this.fetchList().then(res => {
    //     this.string = res
    //     console.log(res)
    //   }).catch(err => {
    //     console.log(err)
    //   })
    // }
  },
  created() {
    // this.fetchData()
  },
  
}


</script>
