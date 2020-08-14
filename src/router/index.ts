import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'
import { routes } from './path'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if ((to.name === 'Trello' || to.name === 'Task') && store.getters.user === null) {
    alert('잘못된 접근 입니다. 로그인 후 다시 이용해 주세요.')
    next({ name: 'SignIn' })
    return
  }
  next()
})

export default router
