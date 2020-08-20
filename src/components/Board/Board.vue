<template>
  <article class="board">
    <dl class="board_wrap">
      <dt class="board_term">
        <h3 class="blind">
          {{board.tag}}
        </h3>
        <button @click="onClickShowTagDialog" class="board_tag" type="button">
          {{board.tag}}
        </button>
        <el-dialog title="Update Tag Name" :visible.sync="tagDialog.isShow">
          <div class="block">
            <el-input v-model="tagDialog.tag" placeholder="Please input your update Tag Name"/>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button @click="onClickUpdateBtnOfTagDialog" type="primary">Update</el-button>
            <el-button @click="onClickDeleteBtnOfTagDialog" type="danger">Delete</el-button>
          </div>
        </el-dialog>
      </dt>
      <dd class="task_util_btns_wrap">
        <button class="task_create_btn" type="button" @click="onClickCreateTaskBtn">
          추가하기
        </button>
      </dd>
      <div class="task_list_wrap" :data-bid="bid" @drop="onDrop" @dragover="onDragOver">
        <dd class="task_list" v-for="(task, idx) in board.tasks" :key="idx">
          <task-component :tid="task.id"></task-component>
        </dd>
      </div>
    </dl>
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
<style lang="scss" scoped>
.board {
  height: 600px;
  width: 150px;
  .board_wrap {
    margin: 0;
    padding: 0;
    box-shadow: 0 0 4px 0 #4385ff;;
    border-radius: 10px;
    height: 100%;
    width: 100%;
    .task_util_btns_wrap {
      margin: 0;
      height: 25px;
      .task_create_btn {
        display: block;
        width: 100%;
        height: 22.5px;
        padding: 1px 0;
      }
    }
    .task_list_wrap {
      height: 530px;
      .task_list {
        margin: 0;
      }
    }
    .board_term {
      text-align: center;
      padding-top: 10px;
      margin-bottom: 10px;
      .board_tag {
        display: inline-block;
        padding: 0;
        width: 100%;
        height: 100%;
        border: 0;
        background: inherit;
        font-size: 20px;
        cursor: pointer;
        &:hover {
          color: #f56c6c;
        }
      }
    }
  }
}
</style>
