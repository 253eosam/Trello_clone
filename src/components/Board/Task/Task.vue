<template>
  <article class="task" draggable @dragend="onDragEnd" @dragstart="onDragStart"  :data-tid="tid">
    <div class="task_content" @click="onClickShowDetailDialog" >
      <h3 class="task_title" v-if="!isShowInput">{{task.title}}</h3>
      <input
        class="task_title_input"
        v-else
        placeholder="input task title.."
        ref="newTaskInput"
        type="text"
        v-model="newTaskTitle"
        @keypress.enter="updateTitle"
      />
    </div>
    <el-dialog
      destroy-on-close
      :visible.sync="detailDialog.isShowDialog"
      :title="task.title"
    >
      <detail-task-view @emitClose="onEmitCloseDialog" :task="task"/>
    </el-dialog>
  </article>
</template>

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import detailTaskView from './Detail.vue'
import { TaskType } from '@/model/Task'
@Component({
  components: {
    detailTaskView
  }
})
export default class Task extends Vue {
  @Prop(Number) tid!: number

  @Action('findTaskByTid') findTaskByTid!: Promise<any> | any
  @Action('updateTask') updateTask!: Promise<any> | any

  @Ref('newTaskInput') newTaskInput!: HTMLInputElement

  // data
  task = {
    title: '',
    board: {
      id: ''
    }
  }

  newTaskTitle = ''
  detailDialog = {
    isShowDialog: false
  }

  // method
  onDragStart (event: any) {
    console.info('drag start')
    event.dataTransfer.setData('tid', event.target.dataset.tid)
    event.dataTransfer.setData('bid', this.task.board.id)
  }

  onDragEnd (event: any) {
    console.log('drag end')
    console.log(event)
    console.log(event.target.parentNode.parentNode.removeChild(this.$el.parentNode))
  }

  onClickShowDetailDialog () {
    if (this.isShowInput) return
    this.detailDialog.isShowDialog = true
  }

  async onEmitCloseDialog (payload: TaskType | undefined) {
    if (payload !== undefined) await this.updateTaskInfo(payload)
    this.detailDialog.isShowDialog = false
  }

  async onClickUpdateTaskBtn () {
    await this.updateTitle()
    this.detailDialog.isShowDialog = false
  }

  async updateTitle () {
    this.task.title = this.newTaskTitle
    const res = await this.updateTask(this.task)
    this.task = res.fetchData
  }

  async fetchTaskInfo () {
    console.log('api handler find')
    const res = await this.findTaskByTid({
      id: this.tid
    })
    console.log(res)
    this.task = res.fetchData
  }

  async updateTaskInfo (task: number) {
    console.log(task)
    const res = await this.updateTask(task)
    console.log(res)
    this.$message(res.content)
    this.task = res.fetchData
  }

  // computed
  get isShowInput () {
    return this.task.title === null || this.task.title.length === 0
  }

  // created
  created () {
    this.fetchTaskInfo()
  }

  // mounted
  mounted () {
    if (this.task.title === '') {
      this.newTaskInput.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.task {
  height: 50px;
  width: 140px;
  margin:5px;
  background: #4385ff;
  border: 1px solid black;
  border-radius: 10px;
  box-shadow: 0 0 2px 0 black;
  overflow: hidden;
  &:hover {
    box-shadow: 0 0 4px 0 black;
    background: #f56c6c;
  }
  & {
    transform: rotate(10px);
    border-radius: 50px;
  }
  cursor: pointer;
  .task_content {
    text-align: center;
    width: 130px;
    .task_title {
      display: inline-block;
      width: 100%;
    }
    .task_title_input {
      display: inline-block;
      width: 100%;
    }
  }
}
</style>
