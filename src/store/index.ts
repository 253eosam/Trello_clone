import Vue from 'vue'
import Vuex, { StoreOptions } from 'vuex'
import { StateType } from './stateType'
import modules from './modules'
Vue.use(Vuex)

const store: StoreOptions<StateType> = {
  modules
}

export default new Vuex.Store(store)
