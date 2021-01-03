<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>
<script>
import { request } from '@/network/request'
export default {
  created() {
    request({
      url: '/test',
      method: 'post',
      // data: {
      //   token: localStorage.getItem('token')
      // },
    }).then(res => {
      console.log('about-result:')
      console.log(res)
    })
  }
}
</script>