import { RouteConfig } from 'vue-router'
import Hello from '@/views/Hello.vue'
import store from '@/store'
export const routes: Array<RouteConfig> = [
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
    path: '/trello',
    name: 'Trello',
    component: () => import('@/views/Trello/Trello.vue'),
    beforeEnter: (to, from, next) => {
      if (store.getters.user === null) {
        alert('잘못된 접근 방법입니다. 로그인 후 다시 이용해주세요.')
        next({ name: 'SignIn' })
      } else next()
    }
    // children: [
    //   {
    //     path: 'task/:tid',
    //     name: 'Task',
    //     props: true,
    //     component: () => import('@/views/Trello/Board/Task/Detail.vue')
    //   }
    // ]
  },
  {
    path: '/test',
    name: 'Test',
    component: () => import('@/views/Test.vue')
  },
  {
    path: '*',
    name: 'PageNotFound',
    component: Hello
  }
]
