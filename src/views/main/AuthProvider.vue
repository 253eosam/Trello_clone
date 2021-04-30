<template>
  <router-view v-if="isAuth" />
  <div v-else id="auth-error">
    서버가 꺼져있습니다.
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'AuthProvider',
  data () {
    return {
      isAuth: false
    }
  },
  async created () {
    this.isAuth = await this.GET_AUTH()
  },
  methods: {
    ...mapActions('userModules', {
      GET_AUTH: 'getAuth'
    })
  }
}
</script>

<style lang="scss" scoped>
#auth-error {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>
