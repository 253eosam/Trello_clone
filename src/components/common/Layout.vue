<template>
  <div id="warp">
    <main-header></main-header>
    <router-view></router-view>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator'
import MainHeader from '@/components/common/Header'

@Component({ components: { MainHeader } })
export default class Layout extends Vue {

}
</script>
