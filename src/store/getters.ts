import { StateType } from './stateType'

export default {
  user: (state: StateType) => {
    return state.user
  },
  isLoading: (state: StateType) => {
    return state.scheduleCnt > 0
  }
}
