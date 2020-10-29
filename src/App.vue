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
body {
  margin: 0;
  padding: 0;
}
.blind {
  display: none;
}
</style>
