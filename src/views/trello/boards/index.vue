<template>
  <router-view @fetch="fetch"></router-view>
</template>

<script lang="ts">
import { namespace } from 'vuex-class'
import { Component, Vue } from 'vue-property-decorator'
import { BoardType } from '@/model/trello/Board'
import { UserType } from '@/model/account/User'

@Component
export default class BoardIndex extends Vue {
  @namespace('trelloModules').Action('getBoard') getBoard!: (user: any) => Promise<BoardType>
  @namespace('userModules').Getter('user') user!: UserType

  async created () {
    await this.fetch()
  }

  async fetch () {
    await this.getBoard({ user: this.user.id })
  }
}
</script>

<style>

</style>
