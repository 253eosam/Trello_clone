<template>
  <div class="task" @click="onClickShowDetailTask" >
    <input type="hidden" :value="tid"/>
      <el-card class="task-card" >
          <span v-if="title.length">{{title}}</span>
          <input v-else style="width: 100%;" placeholder="input task.." ref="newTaskInput" class="task-first-title" type="text" v-model="newTitle" @keypress.enter="onEnterTitleOfInputTag"/>
      </el-card>
  </div>
</template>

<script>
import taskAPI from '../../../api/taskAPI'

export default {
  name: 'Task',
  props: ['tid', 'pTitle'],
  data () {
    return {
      title: '',
      newTitle: ''

    }
  },
  mounted () {
    if (this.pTitle === '' || this.pTitle === null) {
      this.$refs.newTaskInput.focus()
    } else {
      this.title = this.pTitle
    }
  },
  methods: {
    onEnterTitleOfInputTag () {
      if (this.newTitle === '' || this.newTitle === null) {
        alert('title is Empty, Please full input...')
        return
      }
      taskAPI
        .update(
          {
            tid: this.tid,
            title: this.newTitle
          },
          res => {
            console.log(res)
            this.title = res.data.title
          },
          err => {
            console.log(err)
          },
          () => {
            console.log('update task title, finish')
          }
        )
    },
    onClickShowDetailTask () {
      if (!this.title.length) return
      this.$router.push({ path: `/user/1/trello/task/${this.tid}` })
    }
  }
}
</script>

<style>
  .task-card:hover {
    background: #F56C6C;
    transform: rotate(10deg);
  }
  .task-card{
    border-radius: 40px;
    margin-bottom: 5px;
    margin-right: 10px;
    margin-left: 10px;
    background: #EBEEF5;
  }
</style>
