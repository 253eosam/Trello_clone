import Vue from 'vue'
import Vuex from 'vuex'
// import { Loading } from 'element-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  // static variable
  state: {
    // user info
    user: {
      uid: null,
      id: null,
      pwd: null
    },
    schedule: {
      tasks: []
    },
    loading: {
      status: false
    }
  },
  getters: {
    userInfo: state => {
      return state.user
    },
    isLoading: state => {
      return state.loading.status
    }
  },
  mutations: {
    /* experimental logic
    lazyLoadingHandler: (state, payload) => {
      return {
        redirectPageLoading: () => {
          const loadingInstance = Loading.service({ fullscreen: true })
          setTimeout(() => {
            loadingInstance.close()
          }, payload.timeout)
        }
      }
    }, */
    /* completed logic
    loadingHandler: (state) => {
      const loadingInstance = Loading
      if (state.lazyLoading.isLoading) {
        loadingInstance.service({ fullscreen: true })
      }else {
        loadingInstance.service({ fullscreen: true }).close()
      }
    }, */

  },
  actions: {
  },
  modules: {
  }
})
