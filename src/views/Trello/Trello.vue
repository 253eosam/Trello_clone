<template>
  <div class="container">
    <t-header title="Trello"/>
    <div class="con_util_wrap">
      <el-button @click="onClickAddBoard" icon="el-icon-folder-add" circle></el-button>
      <el-button @click="onClickSignOut" type="danger" plain>Logout</el-button>
    </div>
    <section class="content">
      <el-row>
        <el-col v-for="(board, idx) in boards" :key="idx" :span="4">
          <boardComponent :bid="board.id"/>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script>
import boardComponent from '@/components/Board/Board.vue'
import tHeader from '@/components/common/Header/Header.vue'
import boardAPI from '../../api/boardAPI'
import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import { Board } from '@/model/Board'
import { userSessionHandler } from '@/mixins/userSessionHandler'
import taskAPI from '@/api/taskAPI'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Trello',
  components: {
    boardComponent,
    tHeader
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
    ...mapGetters([
      'user'
    ])
  },
  created () {
    this.getBoardListByUid()
  },
  updated () {
    // feature drag & drop
    // rendering all child component then do instance dragula object
    // if (this.dragulaCard) this.dragulaCard.destroy()
    //
    // this.dragulaCard = dragula([
    //   ...Array.from(this.$el.querySelectorAll('.card-list'))
    // ]).on('drop', (el, wrap, target, siblings) => {
    //   console.log('drop')
    //   const dragTaskId = el.querySelector('.task>input').value
    //   const dropBoardId = wrap.querySelector('.card-list>input').value
    //   console.log(`drag : ${dragTaskId}, drop : ${dropBoardId}`)
    //   this.onDragAndDropTask(dragTaskId, dropBoardId)
    // })
    // console.log('new instance')
    // --------------------------------------------------------------------
  },
  methods: {
    ...mapActions(['findBoardByUid']),
    async getBoardListByUid () {
      const res = await this.findBoardByUid(this.user.id)
      console.log(res)
      this.boards = res.fetchData
    },
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
  .con_util_wrap {
    width: 100%;
    margin-bottom: 30px;
    text-align: right;
  }
  .trello__footer {

  }
</style>
