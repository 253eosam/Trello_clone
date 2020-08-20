<template>
  <article class="board">
    <div class="board-title">
      <el-tag @click="onClickShowTagDialog" class="board-tag" type="primary">{{board.tag}}</el-tag>
      <el-dialog title="Update Tag Name" :visible.sync="tagDialog.isShow">
        <div class="block">
          <el-input v-model="tagDialog.tag" placeholder="Please input your update Tag Name"/>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onClickUpdateBtnOfTagDialog" type="primary">Update</el-button>
          <el-button @click="onClickDeleteBtnOfTagDialog" type="danger">Delete</el-button>
        </div>
      </el-dialog>
    </div>
    <ul class="card-list" :data-bid="bid" @drop="onDrop" @dragover="onDragOver">
      <li v-for="(task, idx) in board.tasks" :key="idx">
        <TaskComponent :tid="task.id"></TaskComponent>
      </li>
    </ul>
    <div class="card-util__btn" @click="onClickCreateTaskBtn">
      <el-card shadow="hover">
        <p>+</p>
      </el-card>
    </div>
  </article>
</template>

<script lang="ts">
import TaskComponent from './Task/Task.vue'
import { Task } from '../../model/Task'
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Action, Getter } from 'vuex-class'
import { UserType } from '@/model/User'

  @Component({
    components: {
      TaskComponent
    }
  })
export default class Board extends Vue {
  @Prop(Number) bid!: number
  @Getter('user') user!: UserType
  @Action('findBoardByBid') findBoardByBid!: Promise<any> | any
  @Action('updateBoard') updateBoard!: Promise<any> | any
  @Action('deleteBoard') deleteBoard!: Promise<any> | any
  @Action('saveTask') saveTask!: Promise<any> | any
  @Action('updateTask') updateTask!: Promise<any> | any

  tagDialog = {
    tag: 'Task',
    isShow: false
  }

  board = {
    tag: '',
    tasks: []
  }

  created () {
    this.getBoardInfoByBid(this.bid)
  }

  async onDrop (event: any) {
    /*
        Note that each handler calls preventDefault() to prevent additional event processing for this event
        (such as touch events or pointer events).
       */
    event.preventDefault()
    console.log(event)
    const dropData = {
      tid: event.dataTransfer.getData('tid'),
      bid: event.dataTransfer.getData('bid')
    }
    const dropZoneBid = event.target.dataset.bid
    const res = await this.updateTaskInfo(dropData.tid, dropZoneBid)
    console.log(res.fetchData)
    this.board.tasks.push(res.fetchData)
  }

  onDragOver (event: any) {
    event.preventDefault()
  }

  async updateTaskInfo (tid: number, bid: number) {
    const res = await this.updateTask({
      id: tid,
      board: bid
    })
    console.log(res)
    this.$message(res.content)
    return res
  }

  async getBoardInfoByBid (bid: number) { // props bid
    const res = await this.findBoardByBid(bid)
    console.log(res)
    this.board = res.fetchData
  }

  async onClickCreateTaskBtn () {
    const res = await this.saveTask({ board: this.bid })
    console.log(res)
    this.$message(res.content)
    if (res.isOk) {
      this.board.tasks.push(res.fetchData)
    }
  }

  onClickShowTagDialog () {
    this.tagDialog.isShow = true
    this.tagDialog.tag = this.board.tag
  }

  async onClickUpdateBtnOfTagDialog () {
    this.board.tag = this.tagDialog.tag
    const res = await this.updateBoard(this.board)
    console.log(res)
    this.$message(res.content)
    if (res.isOk) {
      this.board = res.fetchData
      this.tagDialog.isShow = false
    }
  }

  async onClickDeleteBtnOfTagDialog () {
    this.$message('서비스 준비중')
    const res = await this.deleteBoard(this.bid)
    console.log(res)
    this.$message(res.content)
    if (res.isOk) {
      // destroy the vue listeners, etc
      this.$destroy()

      // remove the element from the DOM
      if (this.$el.parentNode !== null) { this.$el.parentNode.removeChild(this.$el) }
    }
  }
}

</script>

<style lang="scss">
  .board {
    margin: 5px;

    .board-title > span {
      cursor: pointer;
    }

    .card-list {
      height: 450px;
      padding-bottom: 10px;
      padding-top: 10px;
      list-style: none;
      padding-inline-start: 0px;
      overflow: auto;

      li {
        padding: 4px;
      }

      li > div {
        margin: auto;
      }
    }

    .card-util__btn > .el-card {
      cursor: pointer;

      .el-card__body {
        height: 25px;

        p {
          margin: auto;
        }
      }
    }
  }
</style>
