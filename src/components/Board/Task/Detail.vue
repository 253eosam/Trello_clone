<template>
  <section>
    <h3>{{task.title}}</h3>
    <p>{{task.board.tag}}</p>
    <hr>
    <p>{{task.content}}</p>
  </section>
</template>

<script>
export default {
  name: 'TaskDetail',
  data () {
    return {
      task: {
        title: '',
        content: '',
        board: {
          tag: ''
        }
      }
    }
  }
}
</script>
