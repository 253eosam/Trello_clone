<template>
  <section>
    <el-tag>{{ task.board.tag }}</el-tag>
    <hr />
    <textarea v-model="updateTask.content"></textarea>
    <span>
      <el-button type="primary" @click="onClickUpdateTaskBtn"
        >Update</el-button
      >
      <el-button @click="onClickCancelBtn">Cancel</el-button>
    </span>
  </section>
</template>

<script>
import { TaskType } from '@/model/Task'
export default {
  name: 'TaskDetail',
  props: {
    task: {
      type: TaskType
    }
  },
  data () {
    return {
      updateTask: {
        content: ''
      }
    }
  },
  created () {
    this.updateTask.content = this.task.content
  },
  methods: {
    onClickUpdateTaskBtn () {
      this.task.content = this.updateTask.content
      this.$emit('emitClose', this.task)
    },
    onClickCancelBtn () {
      this.$emit('emitClose')
    }
  }
}
</script>
<style lang="scss" scoped>
textarea {
  width: 100%;
}
</style>
