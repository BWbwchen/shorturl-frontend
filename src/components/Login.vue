<template>
  <div>
    <h1>Login Page</h1>
    <form @submit.prevent="login">
      <label>User Name</label>
      <input type="text" v-model="userName" required>
      <br>
      <label>Password</label>
      <input type="password" v-model="password" required>
      <br>
      <button type="submit">Log In</button>
    </form>
  </div>
</template>
<script>
  import { setJWT, getJWT } from "../config"
  export default {
    data () {
      return {
        userName: "",
        password: "",
        requestUrl: 'http://192.168.0.103:8000/'
      }
    },
    
    methods: {
        async login(){
            const data = {
              "account": this.userName,
              "password": this.password
            } 
            console.log(data)
            const response = await fetch(this.requestUrl+'api/login', {
                method: 'post',
                headers: {
                  "Content-type": "application/json; charset=UTF-8",
                  //"Content-type": "raw; charset=UTF-8",
                },
                body: JSON.stringify(data)
            });

            const result = await response.json()
            
            if (response.status == 200) {
              setJWT(result.token);
              localStorage.setItem('token', getJWT())
              this.$router.push('/Home');
            } else if (response.status == 401) {
              this.userName = '';
              this.password = ''
              alert('login failed')
            } else if (response.status == 400) {
              this.userName = '';
              this.password = ''
              alert('request error')
            }
        }
    }
  }
</script>