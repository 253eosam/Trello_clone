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
      <el-row>
        <div v-if="boardCnt" class="bottom-box">
          <el-button style="height: 100%; width: 100%;" plain type="danger" icon="el-icon-delete" >Delete Button</el-button>
        </div>
      </el-row>
  </div>
</template>

<script>
import Board from '@/components/Board/Board.vue'
import Header from '@/components/common/Header/Header.vue'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'

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
  updated () {
    if (this.dragulaCard) this.dragulaCard.destroy()

    this.dragulaCard = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ]).on('drop', (el, wrap, target, siblings) => {
      console.log('drop')
    })
    console.log('new instance')
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
