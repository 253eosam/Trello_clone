<template>
  <div class="trello">
    <Header />
    <div class="navigation-bar">
      <el-button @click="onClickAddBoard" icon="el-icon-folder-add" circle></el-button>
      <el-button @click="onClickSignOut" type="danger" plain>Logout</el-button>
    </div>
      <el-row>
        <el-col v-for="idx in boardCnt" :key="idx" :span="24 / boardCnt">
          <Board />
        </el-col>
      </el-row>
  </div>
</template>

<script>
import Board from '@/components/Board/Board.vue'
import Header from '@/components/common/Header/Header.vue'

export default {
  name: 'Trello',
  components: {
    Board, Header
  },
  data () {
    return {
      boardCnt: 0
    }
  },
  methods: {
    onClickAddBoard () {
      this.boardCnt++
    },
    onClickSignOut () {
      this.$router.push('/sign-in')
    }
  }
}
</script>

<style>
  .navigation-bar {
    width: 100%;
    margin-bottom: 30px;
    text-align: right;
  }
</style>
