import Home from './components/Home.vue';

export const routes = [
  {
    path: '/',
    components: {
      default: Home,
    }
  },
  {
    path: '*',
    redirect: '/',
  },
];