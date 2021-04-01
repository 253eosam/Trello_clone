import { RouteConfig } from 'vue-router'

export const routes: Array<RouteConfig> = [
  {
    path: '/users',
    alias: '/',
    component: () => import('@/views/account/index.vue'),
    children: [
      {
        path: '',
        name: 'user.signIn',
        component: () => import('@/views/account/SignIn.vue')
      },
      {
        path: 'signUp',
        name: 'user.signUp',
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
