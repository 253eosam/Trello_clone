import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import state from './state'
import getters from '@/store/getters'
import mutations from '@/store/mutations'
import actions from '@/store/actions'
import { StateType } from './stateType'
import modules from './modules'
Vue.use(Vuex)

const store: StoreOptions<StateType> = {
  state,
  getters,
  mutations,
  actions,
  modules
}

export default new Vuex.Store(store)
