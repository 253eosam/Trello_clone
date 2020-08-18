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
    <ul class="card-list" :data-bid="bid">
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

<script>
import TaskComponent from './Task/Task.vue'
import { Task } from '../../model/Task'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Board',
  props: {
    bid: {
      type: Number
    }
  },
  components: {
    TaskComponent
  },
  data () {
    return {
      tagDialog: {
        tag: 'Task',
        isShow: false
      },
      board: {
        tag: '',
        tasks: []
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  created () {
    // get board info by bid
    this.getBoardInfoByBid()
  },
  methods: {
    ...mapActions(['findBoardByBid', 'updateBoard', 'deleteBoard', 'saveTask']),
    async getBoardInfoByBid () { // props bid
      const res = await this.findBoardByBid(this.bid)
      console.log(res)
      this.board = res.fetchData
    },
    async onClickCreateTaskBtn () {
      const res = await this.saveTask({ board: this.bid })
      console.log(res)
      this.$message(res.content)
      if (res.isOk) {
        this.board.tasks.push(res.fetchData)
      }
    },
    onClickShowTagDialog () {
      this.tagDialog.isShow = true
      this.tagDialog.tag = this.board.tag
    },
    async onClickUpdateBtnOfTagDialog () {
      this.board.tag = this.tagDialog.tag
      const res = await this.updateBoard(this.board)
      console.log(res)
      this.$message(res.content)
      if (res.isOk) {
        this.board = res.fetchData
        this.tagDialog.isShow = false
      }
    },
    async onClickDeleteBtnOfTagDialog () {
      this.$message('서비스 준비중')
      const res = await this.deleteBoard(this.bid)
      console.log(res)
      this.$message(res.content)
      if (res.isOk) {
        // destroy the vue listeners, etc
        this.$destroy()

        // remove the element from the DOM
        this.$el.parentNode.removeChild(this.$el)
      }
    }
  }
}

</script>

<style lang="scss">
.board {
  margin: 5px;
  .board-title>span {
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
    li>div {
      margin: auto;
    }
  }
  .card-util__btn>.el-card {
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
