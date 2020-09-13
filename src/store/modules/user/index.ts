
import { UserType, User } from '@/model/User'
import { StateType } from '../../stateType'
import apis from '@/api'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    user: {}
  },
  getters: {
  },
  mutations: {
    setUser (state: StateType, payload: UserType) {
      // state.user = new User(payload)
      state.user = payload
    }
  },
  actions: {
    async save ({ commit }: ActionContext<StateType, StateType>, pUser: UserType) {
      const fetchData = await apis.user.save(pUser)
      console.log(fetchData)
      commit('setUser', fetchData.data)
      return fetchData
    },
    async findByEmail (_: ActionContext<StateType, StateType>, email: string) {
      const fetchData = await apis.user.findByEmail(email)
      console.log(fetchData)
      return fetchData.data
    },
    async signIn (context: ActionContext<StateType, StateType>, pUser: UserType) {
      const user = await context.dispatch('findByEmail', pUser.email)
      context.commit('setUser', user[0])
      return user[0].password === pUser.password
    }
  }
}
