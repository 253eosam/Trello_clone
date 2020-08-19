import { User, UserType } from '@/model/User'

export default {
  setUser (state: any, pUser: UserType): void {
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
  }
}
