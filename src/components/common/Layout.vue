<template>
  <div id="wrap">
    <main-header></main-header>
    <auth-provider></auth-provider>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import AuthProvider from '@/views/main/AuthProvider'
import MainHeader from '@/components/common/Header'

@Component({ components: { MainHeader, AuthProvider } })
export default class Layout extends Vue {

}
</script>

<style scoped>
#wrap {
  position: relative;
}
</style>
