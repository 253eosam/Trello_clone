<template>
  <div id="wrap">
    <main-header></main-header>
    <auth-provider></auth-provider>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import MainHeader from '@/components/common/Header'
import AuthProvider from '@/views/main/AuthProvider'

@Component({ components: { MainHeader, AuthProvider } })
export default class Layout extends Vue {

}
</script>

<style scoped>
#wrap {
  position: relative;
}
</style>
