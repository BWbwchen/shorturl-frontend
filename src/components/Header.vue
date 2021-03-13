<template>
  <div>
    <router-link to="/">Home</router-link>
    <router-link to="/userInfo">User Info</router-link>
    <a href="" @click.prevent="logout">Logout</a>
  </div>
</template>
<script>
  import { resetJWT } from "../config"
  export default {
    methods: {
        logout(){
            resetJWT()
            localStorage.setItem('token', '')
            this.$router.push('/login');
        }
    }
  }
</script>