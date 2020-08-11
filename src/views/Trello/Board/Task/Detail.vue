<template>
  <div class="task-detail">
    <div>
      <h1 class="task-detail-title">{{task.title}}</h1><el-tag style="display: inline;">{{task.board.tag}}</el-tag>
    </div>
    <textarea class="task-detail-content" v-model="task.content"></textarea>
    <div class="task-detail-footer">
        <el-button type="danger" @click="onClickDeleteBtn">Delete</el-button>
        <el-button type="primary" @click="onClickUpdateBtn">Close</el-button>
      </div>
  </div>
</template>

<script>
import taskAPI from '@/api/taskAPI'
import { Task } from '@/model/Task'

export default {
  name: 'TaskDetail',
  props: {
    tid: {
      type: String
    }
  },
  data () {
    return {
      task: {
        title: '',
        content: '',
        board: {
          id: 0,
          tag: ''
        }
      },
      updateTask: {
        content: ''
      }
    }
  },
  created () {
    this.getTaskInfo()
  },
  methods: {
    getTaskInfo () {
      taskAPI
        .findByTid(
          { tid: this.tid },
          res => {
            console.log(res)
            this.task = new Task(res.data)
            this.updateTask.content = this.task.content
          },
          err => console.log(err),
          () => console.log('finish created detail page')
        )
    },
    onClickDeleteBtn () {
      taskAPI
        .delegate(
          { tid: this.tid },
          res => {
            console.log(res)
            this.$emit('closeDialog')
          },
          err => {
            console.log(err)
          },
          () => {
            console.log('finish onClick delete btn ')
          }
        )
    },
    onClickUpdateBtn () {
      console.log('update btn detail view')
      if (this.updateTask.content !== this.task.content) {
        const isApply = confirm('수정한 내용을 적용하시겠습니까?')
        if (isApply) {
          taskAPI
            .update(
              {
                tid: this.tid,
                title: this.task.title,
                content: this.task.content
              },
              res => {
                console.log(res)
              },
              err => {
                console.log(err)
              },
              () => {
                console.log('finish on click update btn of detail task page')
              }
            )
        }
      }
      this.$emit('closeDialog')
    }
  }
}
</script>

<style>
  .task-detail{
    text-align: left;
  }
  .task-detail-title{
    font-size: 40px;
  }
  .task-detail-navigator {
    margin-left: 10px;
  }
  .task-detail-content{
    display: block;
    margin: 10px;
    width: 90%;
    height: 100px;
  }
  .task-detail-footer {
    text-align: right;
  }

</style>
