<template>
  <div id="app">
    <header-component></header-component>
    <router-view />
  </div>
</template>

<script>
import HeaderComponent from '@/components/common/Header/Header'
export default {
  name: 'App',
  components: {
    HeaderComponent
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
body {
  margin: 0px;
  padding: 0px;
}
// macbook pro
#app {
  height: 900px;
}
.blind {
  display: none;
}
</style>
