import store from '../store'
import { User } from '../model/User'
import userAPI from '../api/userAPI.js'
import { Board } from '../model/Board'
import router from '../router'

export const userSessionHandler = {
  methods: {
    // request user api to email then compare to pwd data then change route trello page
    login (payload) {
      const errorMsg = (msg) => { alert(msg) }

      // request api
      userAPI
        .findByEmail(
          { email: payload.email },
          res => {
            if (res.status === 200) {
              if (res.data[0].pwd === payload.pwd) {
                // bind vuex state
                const rUser = res.data[0]
                // const rBoards = res.data[0].boards.map(ins => new Board(ins))
                store.commit('setUser', new User(rUser))
                // store.commit('setBoard', new Board(rBoards))

                // // go route
                router.push({ path: `/user/${res.data[0].id}/trello` })
              } else {
                console.log('Incorrect ID or Password')
                errorMsg('Login Failed.. Incorrect ID or Password')
              } // login info
            } else {
              console.log(`The expected status is 200, but the response is ${res.status}`)
              errorMsg('Login Failed.. wait for login')
            } // status
          },
          err => console.log(err),
          () => {
            console.log('finally')
          })
    }
  }
}
