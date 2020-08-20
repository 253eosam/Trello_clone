import { User, UserType } from '@/model/User'
import { StateType } from './stateType'

export default {
  setUser (state: StateType, pUser: UserType): void {
    // login & logout
    if (!pUser) {
      sessionStorage.removeItem('user')
      state.user = null
    } else {
      const tmpUser = new User(pUser)
      console.log(tmpUser)
      sessionStorage.setItem('user', tmpUser.toJSON())
      state.user = new User(pUser)
    }
  },
  pushSchedule (state: StateType): void {
    state.scheduleCnt++
  },
  popSchedule (state: StateType): void {
    if (state.scheduleCnt > 0) state.scheduleCnt--
  }
}
