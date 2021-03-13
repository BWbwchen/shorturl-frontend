import Vue from 'vue';
import VueRouter from 'vue-router';
import App from './App.vue';
import { routes } from './routes' //路由規則
import { getJWT, setJWT } from './config'

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: 'abstract'
});

router.beforeEach((to, from, next)=>{
  const token = localStorage.getItem('token')
  setJWT(token)
  const isLogin = getJWT() != "" ;
  if( isLogin ){
    next();
  } else {
    if( to.path !== '/login')
      next('/login');
    else
      next();
  }
});

new Vue({
  el: '#app',
  router,
  render: h => h(App)
});

router.replace('/')