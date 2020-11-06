<template>
  <div class="task-detail-wrap">
    <div class="task-detail-header">
      <h2>{{task.title}}</h2>:
      <p>{{task.position}}</p>
    </div>
    <textarea v-model="task.content" class="task-detail-content" cols="60" rows="10"></textarea>
    <div class="task-detail-footer">
      <button type="button" class="btn submit-btn">submit</button>
      <button type="button" class="btn reset-btn">reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import { TaskType } from '@/model/Task'
import { Vue, Prop, Component } from 'vue-property-decorator'
import { namespace } from 'vuex-class'

const trelloModules = namespace('trelloModules')

@Component
export default class DetailTaskPopup extends Vue {
  @Prop({ type: Number, required: true }) id!: number
  task: TaskType = {}

  @trelloModules.Action('findTaskByTid') FETCH_TASK_DATA!: (id: number) => Promise<void>
  @trelloModules.State('task') TASK!: TaskType

  async created () {
    await this.FETCH_TASK_DATA(this.id)
    this.init()
  }

  init () {
    this.task = this.TASK
  }
}
</script>

<style lang="scss" scoped>
.task-detail-wrap {
  padding: 5px;
  height: 300px;
}
.task-detail-header {
  h2 {
    display: inline-block;
    margin: 0;
  }
  p {
    display: inline-block;
    font-size: 12px;
  }
}
.task-detail-footer {
  text-align: right;
  .btn {
    margin-right: 3px;
    color: white;
    border: 0;
  }
  .submit-btn {
    background: blue;
  }
  .reset-btn {
    background: red;
  }
}
</style>
