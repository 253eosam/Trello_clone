import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Hello from '@/views/Hello.vue'
import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Hello',
    component: Hello
  },
  {
    path: '/sign-in',
    name: 'SignIn',
    component: () => import('@/views/SignIn/SignIn.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/SignIn/SignUp.vue')
  },
  {
    path: '/user/:uid/trello',
    name: 'Trello',
    component: () => import('@/views/Trello/Trello.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: Hello
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('showPageLoading')

  // inspected login session
  if (to.name === 'Trello' && store.getters.userInfo === null) {
    alert('로그인이 필요합니다.')
    next({ name: 'SignIn' })
  }
  next()
})

export default router
