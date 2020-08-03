<template>
  <div class="trello">
    <Header :subTitle="user.email"/>
    <div class="trello-navigation">
      <el-button @click="onClickAddBoard" icon="el-icon-folder-add" circle></el-button>
      <el-button @click="onClickSignOut" type="danger" plain>Logout</el-button>
    </div>
    <div class="trello-body">
      <el-row>
        <el-col v-for="idx in boardCnt" :key="idx" :span="4">
          <Board/>
        </el-col>
      </el-row>
    </div>
    <div v-if="boardCnt" class="trello-footer">
      <el-row>
        <el-button style="height: 100%; width: 100%;" plain type="danger" icon="el-icon-delete">Delete Button
        </el-button>
      </el-row>
    </div>
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
    Board,
    Header
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
    // feature drag & drop
    // rendering all child component then do instance dragula object
    if (this.dragulaCard) this.dragulaCard.destroy()

    this.dragulaCard = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ]).on('drop', (el, wrap, target, siblings) => {
      console.log('drop')
    })
    console.log('new instance')
    // --------------------------------------------------------------------
  },
  methods: {
    onClickAddBoard () {
      if (this.boardCnt < this.maxBoardCnt) {
        this.boardCnt++
      } else {
        alert('Don\'t create board..')
      }
    },
    onClickSignOut () {
      this.$store.commit('setUser')
      this.$router.push('/sign-in')
    }
  }
}
</script>

<style>
  .trello-navigation {
    width: 100%;
    margin-bottom: 30px;
    text-align: right;
  }
</style>
