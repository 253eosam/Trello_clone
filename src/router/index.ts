import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './path'
import store from '@/store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const session = JSON.parse(String(sessionStorage.getItem('user')))
  console.log('session--------')
  if (session && !store.getters.user) {
    store.commit('setUser', session)
  }
  next()
})

export default router
