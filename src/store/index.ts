import Vue from 'vue'
import Vuex from 'vuex'
import { Loading } from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  // static variable
  state: {
    // user state
    user: {
      email: '',
      pwd: ''
    },
    // board state
    board: {
      tag: '',
      tasks: []
    },
    // loading state
    loading: {
      status: false,
      scheduleCnt: 0
    }
  },
  getters: {
    userInfo: state => {
      return state.user
    },
    isLoading: state => {
      state.loading.status = state.loading.scheduleCnt === 0
      return state.loading.status
    }
  },
  mutations: {
    setUser: (state, payload) => {
      state.user = payload
    },
    // manage a schedule
    addSchedule: state => {
      state.loading.scheduleCnt++
    },
    deleteSchedule: state => {
      if (state.loading.scheduleCnt < 0) {
        state.loading.scheduleCnt--
      } else console.warn('Warring, loading.schedule count is under 0')
    },
    showPageLoading: () => {
    // loading switch (on/off)
      const loadingInstance = Loading.service({ fullscreen: true })
      setTimeout(() => {
        loadingInstance.close()
      }, 500)
    }
  },
  actions: {
  },
  modules: {
  }
})
