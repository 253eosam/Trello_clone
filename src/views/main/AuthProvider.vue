<template>
  <router-view v-if="isAuth" />
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'AuthProvider',
  computed: {
    ...mapGetters('userModules', { GET_USER: 'user' }),
    isAuth () {
      return +this.$route.params.uid === this.GET_USER.id
    }
  }
}
</script>

<style>

</style>
