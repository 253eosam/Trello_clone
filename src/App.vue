<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import Layout from '@/components/common/Layout'

@Component({ components: { Layout } })
export default class App extends Vue {

}
</script>

<style>
@import 'assets/css/style.css';
</style>
