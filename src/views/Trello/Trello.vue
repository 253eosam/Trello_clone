<template>
  <div class="trello">
    <h1 class="title">Trello Page</h1>
    <board></board>
    <el-button @click="onClickSignOut">로그아웃</el-button>
  </div>
</template>

<script>
import Board from '@/components/Board/Board.vue'

export default {
  name: 'Trello',
  components: {
    Board
  },
  methods: {
    onClickSignOut () {
      this.$router.push('/sign-in')
    }
  }
}
</script>

<style>
  .title{
    color: #F56C6C;
    font-size: 82px;
    text-align: center;
  }
</style>
