<template>
  <div id="app">
    <router-view/>
    <popup />
  </div>
</template>

<script>
import Popup from '@/components/common/Popup'

export default {
  name: 'App',
  components: {
    Popup
  },
  data () {
    return {
    }
  },
  computed: {
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
