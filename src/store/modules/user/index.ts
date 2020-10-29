
import { UserType, User } from '@/model/User'
import { StateType } from '../../stateType'
import apis from '@/api'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    user: null
  },
  getters: {
  },
  mutations: {
    setUser (state: StateType, payload: UserType) {
      state.user = new User(payload)
    }
  },
  actions: {
    async save ({ commit }: ActionContext<StateType, StateType>, pUser: UserType) {
      const fetchData = await apis.user.save(pUser)
      console.log(fetchData)
      commit('setUser', fetchData.data)
    },
    async signIn ({ state, commit }: ActionContext<StateType, StateType>, pUser: UserType) {
      const fetchData = await apis.user.findByEmail(pUser.email)
      console.log(fetchData)
      commit('setUser', fetchData.data[0])
      return state.user && state.user.password === pUser.password
    }
  }
}
