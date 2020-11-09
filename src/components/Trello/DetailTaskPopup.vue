<template>
  <div class="task-detail-wrap">
    <div class="task-detail-header">
      <h2>{{title}}</h2>:
      <p>{{position}}</p>
    </div>
    <textarea v-model="newContent" class="task-detail-content" cols="60" rows="10"></textarea>
    <div class="task-detail-footer">
      <button @click="onClickUpdate" type="button" class="btn submit-btn">submit</button>
      <button @click="newContent=content" type="reset" class="btn reset-btn">reset</button>
    </div>
  </div>
</template>

<script lang="ts">
import { TaskType } from '@/model/Task'
import { Vue, Prop, Component } from 'vue-property-decorator'

@Component
export default class DetailTaskPopup extends Vue {
  @Prop({ type: Number, required: true }) id!: number
  @Prop({ type: String, default: 'empty title' }) title!: string
  @Prop({ type: String }) position!: string
  @Prop({ type: String, default: '' }) content!: string
  @Prop({ type: Function, required: true }) updateData!: (task: TaskType) => Promise<void>
  @Prop({ type: Function, required: true }) fetchData!: () => Promise<void>

  newContent = this.content

  async onClickUpdate () {
    await this.updateData({ id: this.id, content: this.newContent })
    await this.fetchData()

    this.$emit('close')
  }
}
</script>

<style lang="scss" scoped>
.task-detail-wrap {
  padding: 5px;
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
