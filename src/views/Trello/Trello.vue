<template>
  <div class="container">
    <section class="content">
      <el-row>
        <el-col v-for="(board, idx) in boards" :key="idx" :span="4">
          <boardComponent :bid="board.id"/>
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import boardComponent from '@/components/Board/Board.vue'
import { Action, Getter } from 'vuex-class'
import { UserType } from '../../model/User'

@Component({
  components: {
    boardComponent
  }
})
export default class Trello extends Vue {
  @Getter('user') user!: UserType
  @Action('findBoardByUid') findBoardByUid!: Promise<any> | any
  @Action('createBoard') createBoard!: Promise<any> | any

  maxBoardCnt = 6
  boards = []
  isDialogOfDetailTask = false
  dragula = null

  created () {
    this.getBoardListByUid()
  }

  async getBoardListByUid () {
    const res = await this.findBoardByUid(this.user.id)
    console.log(res)
    this.boards = res.fetchData
  }

  async onClickCreateBoardBtn () {
    if (this.boards.length < this.maxBoardCnt) {
      const res = await this.createBoard()
      console.log(res)
      this.$message(res.content)
      this.boards.push(res.fetchData)
    } else {
      this.$message('Don\'t create board..')
    }
  }
}
</script>

<style lang="scss">
</style>
