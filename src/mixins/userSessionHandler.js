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
          payload.email,
          res => {
            if (res.status === 200) {
              if (res.data[0].pwd === payload.pwd) {
                console.log('success login')
                console.log(res)

                // bind vuex state
                const rUser = new User(res.data[0])
                console.log('show rUser data')
                console.log(rUser)
                // const rBoards = res.data[0].boards.map(ins => new Board(ins))
                store.commit('setUser', rUser)
                // store.commit('setBoard', new Board(rBoards))

                // go route
                router.push({ path: `/user/${rUser.id}/trello` })
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
            console.log('---------------finish login---------------')
          })
    },
    logout () {
      store.commit('setUser')
      sessionStorage.removeItem('user')
      router.push('/sign-in')
    },
    join ({ email, pwd }) {
      const errorMsg = (msg) => {
        alert(msg)
      }
      userAPI.save(
        {
          email: email,
          pwd: pwd
        },
        res => {
          if (res.status === 200 || res.status === 204) {
            console.log('SignUp onClickSignUn method, Success join..!')

            // bind store user info
            const rUser = new User(res.data)
            store.commit('setUser', rUser)

            // go route
            router.push({ path: `/user/${rUser.id}/trello` })
          } else {
            console.log(`the expected tatus is 200 or 204, but the response is ${res.status}`)
            errorMsg('Join failed.. wait for join')
          } // status
        },
        err => {
          console.log(err)
          alert('Fail join ... !')
        },
        () => console.log('finally')
      )
    }
  }
}
