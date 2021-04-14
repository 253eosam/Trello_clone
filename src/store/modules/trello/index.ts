import { BListType } from '@/model/trello/BList'
import { BoardType } from '@/model/trello/Board'
import { StateType } from '@/store/stateType'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    boards: null,
    bList: null
  },
  getters: {
  },
  mutations: {
    setBoard (state: StateType, boards: BoardType[]) {
      state.boards = boards
    },
    setBList (state: StateType, bList: BListType[]) {
      state.bList = bList
    }
  },
  actions: {
    async getBoard ({ commit, dispatch }: ActionContext<StateType, any>, params: any) {
      const response = await dispatch('apiRequest', {
        url: '/boards',
        params
      }, { root: true })

      if (response) commit('setBoard', response)

      return response[0]
    },
    async postBoard ({ dispatch }: ActionContext<StateType, any>, data: BoardType) {
      const response = await dispatch('apiRequest', {
        method: 'POST',
        url: '/boards',
        data
      }, { root: true })

      return response
    },
    async getBList ({ commit, dispatch }: ActionContext<StateType, any>, params: any) {
      const response = await dispatch('apiRequest', {
        url: 'b-lists',
        params
      }, { root: true })

      if (response) commit('setBList', response)
      return response
    }
  }
}
