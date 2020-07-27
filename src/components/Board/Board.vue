<template>
    <div>
      <h1>board component</h1>
      <task></task>
    </div>
</template>

<script>
import Task from './Task/Task.vue'

export default {
  name: 'Board',
  components: {
    Task
  }
}

</script>
