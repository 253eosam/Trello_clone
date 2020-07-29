<template>
  <div class="trello">
    <h1 class="title">Trello</h1>
    <h5 class="subtitle">We Make Price</h5>
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

export default {
  name: 'Trello',
  components: {
    Board
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
  .title{
    color: #F56C6C;
    font-size: 82px;
    text-align: center;
  }
  .navigation-bar {
    width: 100%;
    margin-bottom: 30px;
    text-align: right;
  }
  .board-box {
    margin-bottom: 100px;
  }
</style>
