<script src="src/api/userAPI.js"></script>
<template>
  <div class="task-detail">
    <h1 class="task-detail-title" v-text="task !== null ? task.title : ''"></h1>
    <hr />
    <div class="task-detail-navigator">
      <ul>
        <li><span>STATUS</span><el-tag>TAG</el-tag></li>
      </ul>
    </div>
    <div class="task-detail-content">
      <p>text-area</p>
    </div>
    <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
  </div>
</template>

<script>
import taskAPI from '@/api/taskAPI'
import { Task } from '@/model/Task'

export default {
  name: 'TaskDetail',
  data () {
    return {
      task: null
    }
  },
  created () {
    console.log(this.$route.params.tid)
    taskAPI
      .findByTid(
        { tid: this.$route.params.tid },
        res => {
          this.task = new Task(res.data)
          console.log(this.task)
        },
        err => console.log(err),
        () => console.log('final')
      )
  }
}
</script>

<style>
  .task-detail{
    text-align: left;
  }
  .task-detail-title{
    margin-left: 10px;
  }
  .task-detail-navigator {
    margin-left: 10px;
  }
  .task-detail-content{
    margin-left: 5px;
    padding: 10px;
    border: black solid 1px;
  }

</style>
