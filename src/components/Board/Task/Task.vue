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
      <router-view @cancel="dialogFormVisible = false"></router-view>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'Task',
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
    onClickShowDetailTask () {
      if (!this.firstFlag) return
      this.$router.push(`/user/1/trello/task/${this.tid}`)
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
