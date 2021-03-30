import { RouteConfig } from 'vue-router'

export const routes: Array<RouteConfig> = [
  {
    path: '/users/:uid',
    component: () => import('@/views/trello/index.vue'),
    children: [
      {
        path: '',
        component: () => import('@/views/SignIn/SignIn.vue')
      },
      {
        path: 'boards',
        component: () => import('@/views/trello/boards/index.vue'),
        children: [
          {
            path: '',
            component: () => import('@/views/trello/Boards.vue')
          },
          {
            path: ':bid',
            component: () => import('@/views/trello/Trello.vue')
          }
        ]
      }
    ]
  }
]
