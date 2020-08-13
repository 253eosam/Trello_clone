import Vue from 'vue'
import Vuex from 'vuex'
import { Loading } from 'element-ui'
import { User, UserType } from '@/model/User'
import apis from '../api'
Vue.use(Vuex)

export default new Vuex.Store({
  // static variable
  state: {
    user: {
      id: 0,
      email: '',
      pwd: '',
      boards: []
    },
    boards: {
      bid: null,
      tag: null,
      tasks: []
    },
    task: {
      tid: null,
      content: null
    },
    // loading state
    loading: {
      status: false,
      scheduleCnt: 0
    }
  },
  getters: {
    user: state => {
      return state.user
    },
    isLoading: state => {
      return state.loading.scheduleCnt !== 0
    },
    boards: state => {
      return state.boards
    }
  },
  mutations: {
    setUser (state: any, payload: UserType): void {
      state.user = payload
    },
    setBoard (state: any, payload: any): void {
      state.boards = payload
    },
    addBoard (state: any, payload: any): void {
      state.boards.push(payload)
    },
    // manage a loading
    addSchedule: state => {
      state.loading.scheduleCnt++
    },
    deleteSchedule: state => {
      if (state.loading.scheduleCnt > 0) {
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
    async findUserByEmail ({ commit }, payload) {
      const res = await apis.user.findByEmail(payload)
      console.log(res)
      if (res.status === 200) {
        const fetchData = res.data
        if (fetchData.pwd === payload.pwd) {
          commit('setUser', fetchData)
        } // equals password
      } // status
    }
  },
  modules: {

  }
})
