import { ActionContext } from 'vuex'
import { StateType } from '../../stateType'
import apis from '@/api'
import { Board, BoardType } from '@/model/Board'
import { UserType } from '@/model/User'
import { Task, TaskType } from '@/model/Task'

export default {
  namespaced: true,
  state: {
    boards: [],
    task: null
  },
  getters: {},
  mutations: {
    setBoards (state: StateType, pBoard: BoardType[]) {
      state.boards = pBoard.map(board => {
        const newTasks = board.tasks ? board.tasks.sort((t1, t2) => Number(t1.position) - Number(t2.position)) : []
        board.tasks = newTasks
        return board
      })
    },
    setTask (state: StateType, pTask: TaskType) {
      state.task = new Task(pTask)
    }
  },
  actions: {
    async findByUid ({ commit }: ActionContext<StateType, StateType>, uid: number) {
      const fetchData = await apis.board.findByUid(uid)
      console.log(fetchData)
      commit('setBoards', fetchData.data)
    },
    async saveBoard (_: ActionContext<StateType, StateType>, user: UserType) {
      const fetchData = await apis.board.save({ user, tag: 'Empty title' })
      console.log(fetchData)
    },
    async deleteBoard (_: ActionContext<StateType, StateType>, board: BoardType) {
      const fetchData = await apis.board.delete(board)
      console.log(fetchData)
    },
    async saveTask (_: ActionContext<StateType, StateType>, task: TaskType) {
      if (!task.title) task.title = 'Empty task title'
      const fetchData = await apis.task.save(task)
      console.log(fetchData)
    },
    async updateTask (_: ActionContext<StateType, StateType>, task: TaskType) {
      const fetchData = await apis.task.update(task)
      console.log(fetchData)
    },
    async findTaskByTid ({ commit }: ActionContext<StateType, StateType>, tid: number) {
      const fetchData = await apis.task.findByTid({ id: tid })
      console.log(fetchData)
      commit('setTask', fetchData.data)
    },
    async updateBoard (_: ActionContext<StateType, StateType>, board: BoardType) {
      const fetchData = await apis.board.update(board)
      console.log(fetchData)
    }
  }
}
