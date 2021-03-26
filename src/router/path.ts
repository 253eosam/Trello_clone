import { RouteConfig } from 'vue-router'

export const routes: Array<RouteConfig> = [
  // {
  //   path: '/boards',
  //   name: 'Boards',
  //   component: () => import('@/views/trello/Boards.vue')
  //   // children: []
  // },
  {
    path: '/boards/:title',
    name: 'Boards.trello',
    component: () => import('@/views/trello/Trello.vue')
  }
]
