import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import state from './state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import { StateType } from './stateType'
Vue.use(Vuex)

const store: StoreOptions<StateType> = {
  state,
  getters,
  mutations,
  actions
}

export default new Vuex.Store(store)
