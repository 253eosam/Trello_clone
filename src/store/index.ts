import Vue from 'vue'
import Vuex from 'vuex'
import { Loading } from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  // static variable
  state: {
    // user info
    user: {
      uid: null,
      id: null,
      pwd: null
    },
    schedule: 0,
    loading: {
      service: '',
      status: false
    }
  },
  getters: {
    userInfo: state => {
      return state.user
    },
    isLoading: state => {
      return state.loading.status
    },
    schedule: state => {
      return { isEmpty: state.schedule === 0 }
    }
  },
  mutations: {
    // manage a schedule
    addSchedule: state => {
      state.schedule++
    },
    deleteSchedule: state => {
      state.schedule--
    },
    showPageLoading: () => {
    // loading switch (on/off)
      const loadingInstance = Loading.service({ fullscreen: true })
      setTimeout(() => {
        loadingInstance.close()
      }, 500)
      // if ((state.loading.status = (state.schedule > 0))) {
      //   state.loading.service = loadingInstance
      // } else state.loading.service.close()
    }
  },
  actions: {
  },
  modules: {
  }
})
