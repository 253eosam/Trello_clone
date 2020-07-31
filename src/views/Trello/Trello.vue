<template>
  <div class="trello">
    <Header :subTitle="user.email"/>
    <div class="navigation-bar">
      <el-button @click="onClickAddBoard" icon="el-icon-folder-add" circle></el-button>
      <el-button @click="onClickSignOut" type="danger" plain>Logout</el-button>
    </div>
      <el-row>
        <el-col v-for="idx in boardCnt" :key="idx" :span="4">
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
      boardCnt: 0,
      maxBoardCnt: 6
    }
  },
  computed: {
    user () {
      return this.$store.getters.userInfo
    }
  },
  methods: {
    onClickAddBoard () {
      if (this.boardCnt < this.maxBoardCnt) { this.boardCnt++ } else alert('Don\'t create board..')
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
