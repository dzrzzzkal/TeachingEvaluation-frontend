<template>
  <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/login">Login</router-link> |
    <router-link to="/logout">Logout</router-link> |
    <router-link to="/course">Course</router-link> |
    <router-link to="/class">Class</router-link> |
    <router-link to="/evaluationProgress">Evaluation Progress</router-link> |
    <router-link to="/evaluationSheet">Evaluation Sheet</router-link> |
    <router-link to="/evaluationSheetList">Evaluation Sheet List</router-link> |
    <router-link to="/annualReportList">Annual Report List</router-link> |
    <!-- <router-link>Login</router-link> -->
  </div>
  <router-view/>
</template>

<script>
export default {
  // mounted() {
  //   window.addEventListener('beforeunload', e => {
  //     localStorage.removeItem('token')
  //     localStorage.removeItem('tokenCode')
  //   })
  // },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
