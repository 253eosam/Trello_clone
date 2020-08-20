<template>
  <article draggable @dragend="onDragEnd" @dragstart="onDragStart" class="task" :data-tid="tid">
    <div class="task__content" @click="onClickShowDetailDialog" >
      <h3 v-if="!isShowInput">{{task.id}}</h3>
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

<script lang="ts">
import { Component, Prop, Ref, Vue } from 'vue-property-decorator'
import { Action } from 'vuex-class'
import detailTaskView from '@/views/Trello/Board/Task/Detail.vue'
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
    title: ''
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
