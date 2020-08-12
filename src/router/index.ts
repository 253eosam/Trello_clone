import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Hello from '@/views/Hello.vue'
import store from '../store'
import { User } from '@/model/User'

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
        name: 'Task',
        props: true,
        component: () => import('@/views/Trello/Board/Task/Detail.vue')
      }
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/Test.vue')
  },
  // dialog
  {
    path: 'global-dialog',
    name: 'globalDialog',
    component: () => import('@/components/common/Dialog/globalDialog.vue')
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
  // store.commit('showPageLoading')
  console.log('session is -------')
  if ((to.name === 'Trello' || to.name === 'Task') && store.getters.user.id === 0) {
    store.commit('setUser', new User(JSON.parse(String(sessionStorage.getItem('user')))))
    console.log(store.getters.user)
  }
  // inspected login session
  if (
    to.name === 'Trello' && (
      store.getters.user === null ||
      store.getters.user.id !== Number(to.params.uid)
    )) {
    alert('잘못된 접근 입니다. 로그인 후 다시 이용해 주세요.')
    next({ name: 'SignIn' })
  } else {
    next()
  }
})

export default router
