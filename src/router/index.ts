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
    component: () => import('@/views/Trello/Trello.vue'),
    children: [
      {
        path: 'task/:tid',
        component: () => import('@/views/Trello/Board/Task/Detail.vue')
      }
    ]
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
  // when update route, show loading
  store.commit('showPageLoading')

  /* when refresh, save store data for session storage to temp data
  if (store.getters.userInfo !== null || store.getters.userInfo !== '') {
    store.commit('setUser', sessionStorage.getItem('user'))
  } else {
    sessionStorage.setItem('user', JSON.stringify(store.getters.userInfo))
  }
  if (store.getters.boardsInfo !== null || store.getters.userInfo !== '') {
    store.commit('setBoard', sessionStorage.getItem('boards'))
  } else {
    sessionStorage.setItem('boards', JSON.stringify(store.getters.boardsInfo))
  }
  */

  // inspected login session
  if (
    to.name === 'Trello' && (
      store.getters.user === null ||
      store.getters.user.id !== Number(to.params.uid)
    )) {
    alert('잘못된 접근 입니다. 로그인 후 다시 이용해 주세요.')
    next({ name: 'SignIn' })
  } else next()
})

export default router
