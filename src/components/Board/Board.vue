<template>
  <div class="board">
    <div>
      <el-tag @click="onClickShowDialogForUpdateTag" class="board-tag" type="primary">{{tag.name}}</el-tag>
      <el-dialog title="Update Tag Name" :visible.sync="tag.dialogVisible">
        <div class="block">
          <el-input v-model="tag.newName" placeholder="Please input your update Tag Name"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onClickUpdateBtnOfTagDialog" type="primary">Update</el-button>
          <el-button @click="tag.dialogVisible = false, tag.newName = ''">Cancel</el-button>
        </div>
      </el-dialog>
    </div>
    <ul class="card-list">
      <li v-for="(task, idx) in tasks" :key="idx">
        <div>
          <TaskComponent :tid="task.id" :pTitle="task.title"></TaskComponent>
        </div>
      </li>
    </ul>
    <div class="add-task-card" @click="onClickAddTask">
      <el-card shadow="hover">
        <span>+</span>
      </el-card>
    </div>
  </div>
</template>

<script>
import TaskComponent from './Task/Task.vue'
import { Task } from '../../model/Task'
import boardAPI from '../../api/boardAPI.js'
import taskAPI from '../../api/taskAPI.js'

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
      tag: {
        name: 'Task',
        newName: '',
        color: 'primary',
        dialogVisible: false
      },
      tasks: []
    }
  },
  created () {
    console.log(`created board_${this.bid} component`)
    this.findBoardInfoByBid()
  },
  methods: {
    findBoardInfoByBid () { // request api , move >> vuex action
      boardAPI
        .findByBid(
          this.bid,
          res => {
            console.log(res)
            this.tag.name = res.data.tag + this.bid
            this.tasks = res.data.tasks
          },
          err => console.log(err),
          () => console.log('finish get board info')
        )
    },
    onEmitDeleteTask () {
      console.log('Board component, onEmitDeleteTask')
    },
    onClickAddTask () {
      // request api
      taskAPI
        .save(
          {
            title: null,
            content: null,
            board: {
              id: this.bid
            }
          },
          res => {
            console.log(res)
            this.tasks.push(new Task(res.data))
          },
          err => {
            console.log(err)
          },
          () => console.log('finish create task ')
        )
    },
    onClickShowDialogForUpdateTag () {
      console.log('Board component, onClickUpdateTagName method')
      this.tag.dialogVisible = true
      this.tag.newName = this.tag.name
    },
    onClickUpdateBtnOfTagDialog () {
      boardAPI
        .update(
          {
            bid: this.bid,
            tag: this.tag.newName
          },
          res => {
            console.log(res)
            this.tag.name = this.tag.newName
          },
          err => {
            console.log(err)
          },
          () => {
            console.log('onClickUpdateBtnOfTagDialog board component, finally')
            this.tag.dialogVisible = false
          }
        )
    }
  }
}

</script>

<style>
  .board {
    padding: 10px;
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 10px;
  }
  .card-list {
    overflow: auto;
    height: 400px;
  }

  .board-tag {
    cursor: pointer;
  }

  ul {
    padding-inline-start: 0px;
    list-style: none;
  }

  li {
    padding-bottom: 4px;
    cursor: pointer;
  }
</style>
