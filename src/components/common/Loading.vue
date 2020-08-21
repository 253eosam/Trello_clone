<template>
  <div>
  </div>
</template>
<script>
import { Loading } from 'element-ui'
import { mapGetters } from 'vuex'

export default {
  name: 'Loading',
  computed: {
    ...mapGetters(['isLoading'])
  },
  watch: {
    'isloading' () {
      const loadingIns = () => Loading.service({ fullscreen: true })
      this.isLoading ? loadingIns() : loadingIns.close()
    }
  }
}
</script>

<style lang="scss" scoped>
.wrap {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1003;
  background: white;
  p {
    font-size: 100px;
  }
}
</style>
