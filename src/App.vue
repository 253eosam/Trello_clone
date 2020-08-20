<template>
  <div id="app">
    <header-component></header-component>
    <router-view class="container" />
    <footer-component></footer-component>
  </div>
</template>

<script>
import HeaderComponent from '@/components/common/Header/Header'
import FooterComponent from '@/components/common/Footer/Footer'

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
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
html {
  height: 100%;
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    #app {
      position: relative;
      height: 100%;
      .container {
        padding: 0 20px;
      }
    }
  }
}
.blind {
  display: none;
}
</style>
