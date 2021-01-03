<template>
  <div style="padding:30px;">
    <div>登出</div>
    <input type="button" @click="logout" value="登出">
  </div>
</template>

<script>

export default {
  data() {
    return {

    } 
  },
  methods: {
    logout() {
      // vuex清除登录信息
      // store.commit('SET_USERINFO', {userInfo: {}, status: false})
      this.$store.commit('SET_USERINFO', {user: this.$store.state.user, status: false})
      localStorage.removeItem('token')
      localStorage.removeItem('tokenCode')
      console.log('登出')
    },
  }
}


</script>
