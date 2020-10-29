import { ActionContext } from 'vuex'
import { StateType } from '../../stateType'
import apis from '@/api'
import { Board, BoardType } from '@/model/Board'

export default {
  namespaced: true,
  state: {
    boards: []
  },
  getters: {},
  mutations: {
    setBoards (state: StateType, pBoard: BoardType[]) {
      state.boards = pBoard.map(board => new Board(board))
    }
  },
  actions: {
    async findByUid (context: ActionContext<StateType, StateType>, uid: number) {
      const fetchData = await apis.board.findByUid(uid)
      console.log(fetchData)
      context.commit('setBoards', fetchData.data)
    }
  }
}
