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
      loadingInstance: null
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    }
  },
  watch: {
    isLoading (newValue) {
      if (newValue) {
        this.loadingInstance = Loading.service({ fullscreen: true })
      } else {
        this.loadingInstance.close()
      }
    }
  },
  methods: {
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
</style>
