<template>
  <div class="task">
    <div @click="onClickShowDetailTask" >
      <el-card class="task-card" shadow="hover">
        <div class="task-box">
          <span v-if="firstFlag">{{text}}</span>
          <input placeholder="input task.." ref="newTaskInput" class="task-first-title" type="text" v-else v-model="text" @keypress.enter="firstFlag = true"/>
        </div>
      </el-card>
    </div>
    <el-dialog :visible.sync="dialogFormVisible">
      <task-detail :title="text"></task-detail>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Cancel</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import TaskDetail from '../../../views/Trello/Board/Task/Detail'
export default {
  name: 'Task',
  components: { TaskDetail },
  props: ['tid', 'pTitle'],
  data () {
    return {
      text: '',
      firstFlag: false,
      dialogFormVisible: false
    }
  },
  mounted () {
    if (this.pTitle === '' || this.pTitle === null) { this.$refs.newTaskInput.focus() } else {
      this.text = this.pTitle
      this.firstFlag = true
    }
  },
  methods: {
    onClickDeleteTask () {
      this.$emit('onEmitDeleteTask', this.tid)
    },
    onClickShowDetailTask () {
      if (!this.firstFlag) return
      console.log('Board component, onClickShowDetailTask method' + `, tid : ${this.tid}`)
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>
  .task-card{
    border-radius: 40px;
    padding: 7px;
    margin-bottom: 5px;
    background: #EBEEF5;
  }
  .task-first-stitle {
    border: white;
  }
</style>
