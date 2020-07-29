<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import { Loading } from 'element-ui'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  methods: {
    loadingHandler (loadingFlag) {
      console.log('methods, loadingHandler')

      if (loadingFlag) {
        Loading.service({ fullscreen: true })

        // temp close logic
        setTimeout(() => {
          Loading.service().close()
        }, 500)
        // ---------------
      } else {
        Loading.service().close()
      }
    }
  },
  watch: {
    '$store.getters.isLoading' (newValue) {
      console.log('watch, $store,getter.isLoading')
      this.loadingHandler(newValue)
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
