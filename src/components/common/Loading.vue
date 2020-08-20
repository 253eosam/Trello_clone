<template>
  <div v-if="true" class="wrap">
      <p>Loading...</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Loading',
  computed: {
    ...mapGetters(['isLoading'])
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
