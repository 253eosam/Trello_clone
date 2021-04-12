import { BoardType } from '@/model/trello/Board'
import { StateType } from '@/store/stateType'
import { ActionContext } from 'vuex'

export default {
  namespaced: true,
  state: {
    boards: null
  },
  getters: {
  },
  mutations: {
    setBoard (state: StateType, boards: BoardType[]) {
      state.boards = boards
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
    }
  }
}
