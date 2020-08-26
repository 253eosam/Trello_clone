<template>
  <div id="app">
    <router-view/>
    <loading></loading>
  </div>
</template>

<script>
import Loading from '@/components/common/Loading'

export default {
  name: 'App',
  components: {
    Loading
  },
  data () {
    return {
      loadingInstance: null
    }
  },
  computed: {
    isLoading () {
      return this.$store.getters.isLoading
    }
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
  body {
    height: 100%;
    #app {
      position: relative;
      height: 100%;
    }
  }
}
.blind {
  display: none;
}
</style>
