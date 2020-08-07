<template>
  <div class="board">
    <div>
      <el-tag @click="onClickShowDialogForUpdateTag" class="board-tag" type="primary">{{tag.name}}</el-tag>
      <el-dialog title="Update Tag Name" :visible.sync="tag.dialogVisible">
        <div class="block">
          <el-input v-model="updateTagNameDialog.newTagName" placeholder="Please input your update Tag Name"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onClickUpdateBtnOfTagDialog" type="primary">Update</el-button>
          <el-button @click="tag.dialogVisible = false, updateTagNameDialog.newTagName = ''">Cancel</el-button>
        </div>
      </el-dialog>
    </div>
    <ul class="card-list">
      <li v-for="(task, idx) in tasks" :key="idx">
        <div>
          <task :tid="task.id" :pTitle="task.title"></task>
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
import Task from './Task/Task.vue'
import boardAPI from '@/api/boardAPI.js'
import taskAPI from '../../api/taskAPI'

export default {
  name: 'Board',
  props: {
    bid: {
      type: Number
    }
  },
  components: {
    Task
  },
  data () {
    return {
      tag: {
        name: 'Task',
        color: 'primary',
        dialogVisible: false
      },
      tasks: [],
      updateTagNameDialog: {
        newTagName: ''
      },
      dragulaCard: null
    }
  },
  mounted () {
    this.findBoardInfoByBid()
  },
  methods: {
    findBoardInfoByBid () { // request api , move >> vuex action
      boardAPI
        .findByBid(
          this.bid,
          res => {
            this.tag.name = res.data.tag
            this.tasks = res.data.tasks
          },
          err => console.log(err),
          () => console.log('final')
        )
    },
    onEmitDeleteTask () {
      console.log('Board component, onEmitDeleteTask')
      this.tasks--
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
          },
          err => {
            console.log(err)
          },
          () => console.log('finally')
        )
      this.tasks++
    },
    onClickShowDialogForUpdateTag () {
      console.log('Board component, onClickUpdateTagName method')
      this.tag.dialogVisible = true
    },
    onClickUpdateBtnOfTagDialog () {
      this.tagName = this.updateTagNameDialog.newTagName
      this.tag.dialogVisible = false
    }
  }
}

</script>

<style>
  .board {
    overflow: auto;
    height: 400px;
    padding: 10px;
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 100px;
    border-radius: 10px;
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
