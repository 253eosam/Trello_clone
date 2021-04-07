import api from '@/api'
import { UserType } from '@/model/account/User'
import { StateType } from '@/store/stateType'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    setUser (state: StateType, user: UserType) {
      state.user = user
    }
  },
  actions: {
    async postUser ({ commit, dispatch }: ActionContext<StateType, any>, data: UserType) {
      const response = await dispatch('apiRequest', {
        method: 'POST',
        url: api.postUser(),
        data
      }, { root: true })

      if (response) commit('setUser', response)

      return response
    },
    async getUser ({ commit, dispatch }: ActionContext<StateType, any>, params: any) {
      const response = await dispatch('apiRequest', {
        url: api.getUser(),
        params
      }, { root: true })

      if (response) commit('setUser', response[0])

      return response[0]
    }
  }
}
