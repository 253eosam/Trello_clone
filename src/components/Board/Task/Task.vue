<template>
  <div class="task">
    <el-card shadow="hover">
      <div class="task-box">
        <span @click="onClickShowDetailTask">{{text}}</span>
        <el-button style="float: right; padding: 1px 0" @click="onClickDeleteTask" type="danger" icon="el-icon-delete" circle></el-button>
      </div>
    </el-card>
    <el-dialog :visible.sync="dialogFormVisible">
      <task-detail></task-detail>
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
  props: ['tid'],
  data () {
    return {
      text: this.tid + '. Task',
      dialogFormVisible: false
    }
  },
  methods: {
    onClickDeleteTask () {
      this.$emit('onEmitDeleteTask', this.tid)
    },
    onClickShowDetailTask () {
      console.log('Board component, onClickShowDetailTask method' + `, tid : ${this.tid}`)
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>
</style>
