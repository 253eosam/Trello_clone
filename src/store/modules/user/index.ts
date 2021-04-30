import { UserType } from '@/model/account/User'
import { StateType } from '@/store/stateType'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
    user (state: StateType) {
      if (!state.user && localStorage.getItem('trello.user')) state.user = JSON.parse(localStorage.getItem('trello.user') as any)
      return state.user
    }
  },
  mutations: {
    setUser (state: StateType, user: UserType) {
      localStorage.setItem('trello.user', JSON.stringify(user))
      state.user = user
    },
    clearUser (state: StateType) {
      localStorage.removeItem('trello.user')
      state.user = null
    }
  },
  actions: {
    async getAuth ({ dispatch }: ActionContext<StateType, any>) {
      await dispatch('apiRequest', {
        url: ''
      }, { root: true })
      return true
    },
    async postUser ({ commit, dispatch }: ActionContext<StateType, any>, data: UserType) {
      const response = await dispatch('apiRequest', {
        method: 'POST',
        url: '/users',
        data
      }, { root: true })

      if (response) commit('setUser', response)

      return response
    },
    async getUser ({ commit, dispatch }: ActionContext<StateType, any>, params: any) {
      const response = await dispatch('apiRequest', {
        url: '/users',
        params
      }, { root: true })

      if (response) commit('setUser', response[0])

      return response[0]
    }
  }
}
