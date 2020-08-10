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
          <boardComponent :bid="board.id"/>
        </el-col>
      </el-row>
    </div>
    <div v-if="boards.length" class="trello-footer">
      <el-row>
        <el-button style="height: 100%; width: 100%;" plain type="danger" icon="el-icon-delete">Delete Button
        </el-button>
      </el-row>
    </div>
    <el-dialog :visible.sync="isDialogOfDetailTask">
      <router-view @closeDialog="isDialogOfDetailTask = false"></router-view>
    </el-dialog>
  </div>
</template>

<script>
import boardComponent from '@/components/Board/Board.vue'
import Header from '@/components/common/Header/Header.vue'
import boardAPI from '../../api/boardAPI'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import { Board } from '@/model/Board'
import { userSessionHandler } from '@/mixins/userSessionHandler'
import taskAPI from '@/api/taskAPI'

export default {
  name: 'Trello',
  components: {
    boardComponent,
    Header
  },
  data () {
    return {
      maxBoardCnt: 6,
      boards: [],
      isDialogOfDetailTask: false,
      dragula: null
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  watch: {
    '$route.params.tid' (tid) {
      console.log(`route change ${tid}`)
      this.isDialogOfDetailTask = (tid !== undefined)
    },
    isDialogOfDetailTask (value) {
      if (!value) this.$router.push({ name: 'Trello' })
    }
  },
  created () {
    console.log('created Trello view')
    // trello에서 boards api를 호출해서 아래 board components에 props로 bid를 뿌려준다.
    const uid = this.$route.params.uid
    boardAPI
      .findByUid(
        uid,
        res => {
          const rBoards = res.data.map(o => new Board(o))
          console.log(rBoards)
          this.boards = rBoards
        },
        err => {
          console.log(err)
        },
        () => {
          console.log('finish get user board info')
        }
      )
    if (this.$route.params.tid) this.isDialogOfDetailTask = true
  },
  updated () {
    // feature drag & drop
    // rendering all child component then do instance dragula object
    if (this.dragulaCard) this.dragulaCard.destroy()

    this.dragulaCard = dragula([
      ...Array.from(this.$el.querySelectorAll('.card-list'))
    ]).on('drop', (el, wrap, target, siblings) => {
      console.log('drop')
      const dragTaskId = el.querySelector('.task>input').value
      const dropBoardId = wrap.querySelector('.card-list>input').value
      console.log(`drag : ${dragTaskId}, drop : ${dropBoardId}`)
      this.onDragAndDropTask(dragTaskId, dropBoardId)
    })
    console.log('new instance')
    // --------------------------------------------------------------------
  },
  methods: {
    onDragAndDropTask (dragTaskId, dropBoardId) {
      taskAPI
        .updateBid(
          {
            tid: dragTaskId,
            bid: dropBoardId
          },
          res => {
            console.log(res)
          },
          err => {
            console.log(err)
          },
          () => {
            console.log('finish onDragAndDropTask')
          }
        )
    },
    onClickShowDetailTask () {
      this.isDialogOfDetailTask = true
    },
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
              const rBoard = new Board(res.data)
              console.log(rBoard)
              this.boards.push(rBoard)
            },
            err => {
              console.log(err)
            },
            () => {
              console.log('finish create board')
            }
          )
      } else {
        alert('Don\'t create board..')
      }
    },
    onClickSignOut () {
      userSessionHandler.methods.logout()
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
  .trello-footer {

  }
</style>
