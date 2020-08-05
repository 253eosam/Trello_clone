import store from '../store'

export const userSessionHandler = {
  methods: {
    login (payload) {
      // set user info
      store.commit('setUser', payload.user)

      // set board info
      store.commit('setBoard', payload.board)
    }
  }
}
