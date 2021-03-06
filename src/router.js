import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  base: '/dist/',
  mode : 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    { path: '*', 
      name: 'home',
      component: Home 
    }

  ]
})
