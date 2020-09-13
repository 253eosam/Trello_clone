import { ActionContext } from 'vuex'
import { StateType } from '../../stateType'
import apis from '@/api'
import { Boards, BoardsType, fetchBoardsType } from '@/model/Board'

export default {
  namespaced: true,
  state: {
    boards: []
  },
  getters: {},
  mutations: {
    setBoards (state: StateType, pBoard: Array<BoardsType>) {
      state.boards = pBoard
    }
  },
  actions: {
    async findByUid (context: ActionContext<StateType, StateType>, uid: number) {
      const fetchData = await apis.board.findByUid(uid)
      context.commit('setBoards', fetchData.data)
      console.log(fetchData)
      return fetchData.data
    }
  }
}
