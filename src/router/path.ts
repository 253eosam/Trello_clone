import { RouteConfig } from 'vue-router'
import userStore from '@/store/modules/user'

const navigationGuard = (to: any, from: any, next: any) => {
  const USER_SESSION = userStore.getters.user(userStore.state)
  if (USER_SESSION) next({ name: 'trello.board', params: { uid: `${USER_SESSION.id}` } })
  else next()
}

export const routes: Array<RouteConfig> = [
  {
    path: '/users',
    alias: '/',
    component: () => import('@/views/account/index.vue'),
    children: [
      {
        path: '',
        name: 'user.signIn',
        beforeEnter: (to, from, next) => navigationGuard(to, from, next),
        component: () => import('@/views/account/SignIn.vue')
      },
      {
        path: 'signUp',
        name: 'user.signUp',
        beforeEnter: (to, from, next) => navigationGuard(to, from, next),
        component: () => import('@/views/account/SignUp.vue')
      },
      {
        path: ':uid/boards',
        component: () => import('@/views/trello/boards/index.vue'),
        children: [
          {
            path: '',
            name: 'trello.board',
            component: () => import('@/views/trello/Boards.vue')
          },
          {
            path: ':bid',
            name: 'trello.blist',
            component: () => import('@/views/trello/Trello.vue')
          }
        ]
      }
    ]
  }
]
