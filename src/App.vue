<template>
  <div id="app">
    <layout />
    <popup-layer />
    <loading />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Layout from '@/components/common/Layout'
import PopupLayer from '@/components/common/PopupLayer'
import Loading from '@/components/common/Loading'

@Component({ components: { Layout, PopupLayer, Loading } })
export default class App extends Vue {
}
</script>

<style>
@import 'assets/css/style.css';
#app {
  position: relative;
}
</style>
