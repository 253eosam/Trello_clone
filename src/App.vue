<template>
  <div id="app">
    <router-view/>
    <popup-layer/>
  </div>
</template>

<script>
import PopupLayer from '@/components/common/PopupLayer'

export default {
  name: 'App',
  components: {
    PopupLayer
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
