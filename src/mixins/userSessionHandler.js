import store from '../store'
import userAPI from '../api/userAPI.js'
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
                console.log('mixin method login, Success login..!')

                // bind store user info
                const resUserInfo = res.data[0]
                const user = {
                  email: resUserInfo.email,
                  pwd: resUserInfo.pwd
                }
                const board = resUserInfo.boards
                store.commit('setUser', user)
                store.commit('setBoard', board)

                // go route
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
