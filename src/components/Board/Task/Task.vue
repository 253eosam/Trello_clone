<template>
  <div class="task" :data-tid="tid" @click="isShowDialog = true">
    <input
      v-if="isShowInput"
           placeholder="input task title.."
           ref="newTaskInput"
           class="task__title-input"
           type="text"
           v-model="newTaskTitle"
           @keypress.enter="updateTitle"
    />
    <h3 v-else>{{task.title}}</h3>
    <el-dialog
      :visible.sync="isShowDialog"
      center
    >
      <detail-task-view></detail-task-view>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDialog = false">Cancel</el-button>
        <el-button type="primary" @click="isShowDialog = false">Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import detailTaskView from './Detail'

export default {
  name: 'Task',
  props: ['tid'],
  components: {
    detailTaskView
  },
  data () {
    return {
      task: {
        title: ''
      },
      newTaskTitle: '',
      isShowDialog: false
    }
  },
  computed: {
    isShowInput () {
      return this.task.title.length === 0
    }
  },
  created () {
    this.fetchTaskInfo()
  },
  mounted () {
    if (this.task.title === '') {
      this.$refs.newTaskInput.focus()
    }
  },
  methods: {
    ...mapActions([
      'findTaskByTid', 'updateTask'
    ]),
    async updateTitle () {
      console.log('api handler update')
      this.task.title = this.newTaskTitle
      const res = await this.updateTask(this.task)
      this.task = res.fetchData
    },
    async fetchTaskInfo () {
      console.log('api handler find')
      const res = await this.findTaskByTid({
        id: this.tid
      })
      console.log(res)
      this.task = res.fetchData
    }
  }
}
</script>

<style lang="scss">
  .task{
    border-radius: 40px;
    background: #a6b9e5;
    width: 130px;
    height: 60px;
    display: flex;
    transition: transform 0.2s;
    h3 input {
      margin: auto;
    }
  }
  .task:hover {
    background: #F56C6C;
    transform: rotate(10deg);
  }
</style>
