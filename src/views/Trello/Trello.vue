<template>
  <div class="container">
    <t-header title="Trello"/>
    <div class="con_util_wrap">
      <el-button @click="onClickCreateBoardBtn" icon="el-icon-folder-add" circle></el-button>
      <el-button @click="onClickGoHome" icon="el-icon-s-home" circle></el-button>
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
import dragula from 'dragula'
import 'dragula/dist/dragula.css'
import { Board } from '@/model/Board'
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
    ...mapActions(['findBoardByUid', 'createBoard']),
    async getBoardListByUid () {
      const res = await this.findBoardByUid(this.user.id)
      console.log(res)
      this.boards = res.fetchData
    },
    onDragAndDropTask () {
      this.$message('서비스 준비중...')
    },
    onClickShowDetailTask () {
      this.isDialogOfDetailTask = true
    },
    async onClickCreateBoardBtn () {
      if (this.boards.length < this.maxBoardCnt) {
        const res = await this.createBoard()
        console.log(res)
        this.$message(res.content)
        this.boards.push(res.fetchData)
      } else {
        this.$message('Don\'t create board..')
      }
    },
    onClickGoHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss">
  .con_util_wrap {
    width: 100%;
    margin-bottom: 30px;
    text-align: right;
  }
</style>
