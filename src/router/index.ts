import Vue from 'vue'
import VueRouter from 'vue-router'
import { routes } from './path'
import UserStore from '@/store/modules/user'

Vue.use(VueRouter)

const localStorageUserSession = localStorage.getItem('userSession')

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  (localStorageUserSession && !UserStore.state.user) && (UserStore.state.user = JSON.parse(localStorageUserSession))
  next()
})

export default router
