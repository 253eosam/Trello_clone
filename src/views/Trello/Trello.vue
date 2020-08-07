<template>
  <div class="trello">
    <Header :subTitle="user.email"/>
    <div class="trello-navigation">
      <el-button @click="onClickAddBoard" icon="el-icon-folder-add" circle></el-button>
      <el-button @click="onClickSignOut" type="danger" plain>Logout</el-button>
    </div>
    <div class="trello-body">
      <el-row>
        <el-col v-for="(board, idx) in boards" :key="idx" :span="4">
          <Board :bid="board.id"/>
        </el-col>
      </el-row>
    </div>
    <div v-if="boards.length" class="trello-footer">
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
import boardAPI from '../../api/boardAPI'
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
      maxBoardCnt: 6
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    },
    boards () {
      return this.$store.getters.boards
    }
  },
  mounted () {
    // trello에서 boards api를 호출해서 아래 board components에 props로 bid를 뿌려준다.
    const uid = this.$route.params.uid
    console.log(`uid is ${uid}`)
    boardAPI
      .findByUid(
        uid,
        res => {
          console.log(res)
          const rBoards = res.data.map(o => new Board(o))
          console.log('rBoards')
          console.log(rBoards)
        },
        err => {
          console.log(err)
        },
        () => console.log('finall')
      )
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
      if (this.boards.length < this.maxBoardCnt) {
        console.log('Do net service open, create board component')
        boardAPI
          .save(
            {
              tag: 'temp tag name',
              user: {
                id: this.user.id
              }
            },
            res => {
              this.$store.commit('addBoard', res.data)
            },
            err => {
              console.log(err)
            },
            () => {
              console.log('final')
            }
          )
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
