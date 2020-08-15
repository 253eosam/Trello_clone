import Vue from 'vue'
import Vuex from 'vuex'
import { Loading } from 'element-ui'
import { User, UserType } from '@/model/User'
import apis from '../api'
import { Task, TaskType } from '@/model/Task'
import { BoardType } from '@/model/Board'
Vue.use(Vuex)

export default new Vuex.Store({
  // static variable
  state: {
    user: null,
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
    setUser (state: any, pUser: UserType): void {
      // login & logout
      if (!pUser) {
        sessionStorage.removeItem('user')
        state.user = null
      } else {
        const user = new User(pUser)
        console.log(user)
        sessionStorage.setItem('user', user.toJSON())
        state.user = user
      }
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
      console.log(fetchData)
      const res = {
        status: fetchData.status,
        isOk: false,
        content: ''
      }
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
      const fetchData = await apis.user.save(pUser)
      console.log(fetchData)
      const res = {
        status: fetchData.status,
        isOk: false,
        content: ''
      }
      if (fetchData.status === 200) {
        commit('setUser', fetchData.data)
        res.isOk = true
        res.content = '회원가입 성공..!!'
      } else res.content = '서버 상태 에러, 잠시 후 다시 시도해주세요.' // status
      return res
    },
    async saveTask (_, pTask: TaskType) {
      const fetchData = await apis.task.save(pTask)
      console.log(fetchData)
      const res = {
        status: fetchData.status,
        isOk: false,
        content: '',
        fetchData: fetchData.data
      }
      if (fetchData.status === 200) {
        res.isOk = true
        res.content = 'Task 만들기 성공..!!'
      } else res.content = '서버 상태 에러, 잠시 후 다시 시도해주세요.' // status
      return res
    },
    async findTaskByTid (_, payload: TaskType) {
      const fetchData = await apis.task.findByTid(new Task(payload))
      console.log(fetchData)
      const res = {
        status: fetchData.status,
        isOk: false,
        content: '',
        fetchData: fetchData.data
      }
      if (fetchData.status === 200) {
        res.isOk = true
        res.content = 'Task 조회 성공..!!'
      } else res.content = '서버 상태 에러, 잠시 후 다시 시도해주세요.' // status
      return res
    },
    async updateTask (_, pTask: TaskType) {
      const fetchData = await apis.task.update(pTask)
      console.log(fetchData)
      const res = {
        status: fetchData.status,
        isOk: false,
        content: '',
        fetchData: fetchData.data
      }
      if (fetchData.status === 200) {
        res.isOk = true
        res.content = 'Task 수정 성공..!!'
      } else res.content = '서버 상태 에러, 잠시 후 다시 시도해주세요.' // status
      return res
    },
    async findBoardByUid (_, uid: number) {
      const fetchData = await apis.board.findByUid({ user: uid })
      const res = {
        status: fetchData.status,
        isOk: false,
        content: '',
        fetchData: fetchData.data
      }
      if (fetchData.status === 200) {
        res.isOk = true
        res.content = 'board 리스트 조회 성공...!!'
      } else res.content = '서버 상태 에러, 잠시 후 다시 이용해주세요.' // status
      return res
    },
    async findBoardByBid (_, bid: number) {
      const fetchData = await apis.board.findByBid({ id: bid })
      const res = {
        status: fetchData.status,
        isOk: false,
        content: '',
        fetchData: fetchData.data
      }
      if (fetchData.status === 200) {
        res.isOk = true
        res.content = 'board 조회 성공..!!'
      } else res.content = '서버 상태 에러, 잠시 후 다시 이용해주세요.' // status
      return res
    },
    async createBoard (context, payload: BoardType) {
      const fetchData = await apis.board.save({ tag: 'tag name', user: context.getters.user.id })
      const res = {
        status: fetchData.status,
        isOk: false,
        content: '',
        fetchData: fetchData.data
      }
      if (fetchData.status === 200) {
        res.isOk = true
        res.content = 'baord 만들기 성공..!!'
      } else res.content = '서버 상태 에러, 잠시 후 다시 이용해주세요.' // status
      return res
    },
    async updateBoard (context, payload: BoardType) {
      payload.user = context.getters.user.id
      const fetchData = await apis.board.update(payload)
      const res = {
        status: fetchData.status,
        isOk: false,
        content: '',
        fetchData: fetchData.data
      }
      if (fetchData.status === 200) {
        res.isOk = true
        res.content = 'board 수정 성공..!!'
      } else res.content = '서버 상태 에러, 잠시 후 다시 이용해주세요' // status
      return res
    },
    async deleteBoard (context, bid: number) {
      const fetchData = await apis.board.delete({ id: bid })
      const res = {
        status: fetchData.status,
        isOk: false,
        content: '',
        fetchData: fetchData.data
      }
      if (fetchData.status === 200) {
        res.isOk = true
        res.content = 'board 삭제 성공..!!'
      } else res.content = '서버 상태 에러, 잠시 후 다시 이용해주세요' // status
      return res
    }
  },
  modules: {

  }
})
