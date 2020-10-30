import { RouteConfig } from 'vue-router'
export const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'SignIn',
    component: () => import('@/views/SignIn/SignIn.vue')
  },
  {
    path: '/sign-up',
    name: 'SignUp',
    component: () => import('@/views/SignIn/SignUp.vue')
  },
  {
    path: '/trello',
    name: 'Trello',
    component: () => import('@/views/Trello/TrelloPage.vue')
  }
]
