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
      state.user = new User(payload)
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
      const fetchData = await apis.user.findByEmail(payload)
      const res = {
        status: fetchData.status,
        isOk: false,
        content: ''
      }
      console.log(fetchData)
      if (fetchData.status === 200) {
        if (fetchData.data[0].pwd === payload.pwd) {
          commit('setUser', fetchData.data[0])
          res.content = '로그인 성공..!!'
          res.isOk = true
        } else res.content = '아이디 또는 비밀번호가 일치하지 않습니다. \n다시 시도해주세요...' // equals password
      } else res.content = '서버 상태 에러, 잠시 후 다시 시도해주세요.' // status
      return res
    },
    async saveUser ({ commit }, pUser: UserType) {
      const res = await apis.user.save(pUser)
      if (res.status === 200) {
        const fetchData = res.data
        commit('setUser', fetchData)
      } // status
    }
  },
  modules: {

  }
})
