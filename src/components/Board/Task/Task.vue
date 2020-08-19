<template>
  <article draggable @dragstart="onDragStart" class="task" :data-tid="tid">
    <div class="task__content" @click="onClickShowDetailDialog" >
      <h3 v-if="!isShowInput">{{task.title}}</h3>
      <input
        v-else
        placeholder="input task title.."
        ref="newTaskInput"
        class="task__title-input"
        type="text"
        v-model="newTaskTitle"
        @keypress.enter="updateTitle"
      />
    </div>
    <article>
      <el-dialog
        destroy-on-close
        :visible.sync="detailDialog.isShowDialog"
        :title="task.title"
      >
        <detail-task-view @emitClose="onEmitCloseDialog" :task="task"/>
      </el-dialog>
    </article>
  </article>
</template>

<script>
import { mapActions } from 'vuex'
import detailTaskView from '@/views/Trello/Board/Task/Detail'

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
      detailDialog: {
        isShowDialog: false
      }
    }
  },
  computed: {
    isShowInput () {
      return this.task.title === null || this.task.title.length === 0
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
    onDragStart (event) {
      event.dataTransfer.setData('text', event.target.dataset.tid)
    },
    onClickShowDetailDialog () {
      if (this.isShowInput) return
      this.detailDialog.isShowDialog = true
    },
    async onEmitCloseDialog (payload) {
      if (payload !== undefined) await this.updateTaskInfo(payload)
      this.detailDialog.isShowDialog = false
    },
    async onClickUpdateTaskBtn () {
      await this.updateTitle()
      this.detailDialog.isShowDialog = false
    },
    async updateTitle () {
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
    },
    async updateTaskInfo (task) {
      console.log(task)
      const res = await this.updateTask(task)
      console.log(res)
      this.$message(res.content)
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
    // &:hover {
    //   transition: transform 0.2s;
    //   transform: rotate(10deg);
    // }
    .task__content {
      width: 100%;
      height: 100%;
      &:hover {
        cursor: pointer;
        border-radius: 40px;
        background: #F56C6C;
      }
      h3 input {
        margin: auto;
      }
    }
  }
</style>
