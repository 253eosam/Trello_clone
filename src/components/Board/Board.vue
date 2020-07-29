<template>
    <div class="board">
      <div>
        <el-tag @click="onClickUpdateTagName" class="board-tag" type="primary">{{tagName}}</el-tag>
        <el-dialog title="Update Tag Name" :visible.sync="outerVisible">
          <div class="block">
          <el-input placeholder="Please input your update Tag Name"></el-input>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary">Update</el-button>
            <el-button @click="outerVisible = false">Cancel</el-button>
          </div>
        </el-dialog>
      </div>
      <ul>
        <li v-for="(idx) in tasks" :key="idx">
          <task :tid="idx" @onEmitDeleteTask="onEmitDeleteTask"></task>
        </li>
        <li @click="onClickAddTask">
          <el-card shadow="hover">
              <span>+</span>
          </el-card>
        </li>
      </ul>
    </div>
</template>

<script>
import Task from './Task/Task.vue'

export default {
  name: 'Board',
  components: {
    Task
  },
  data () {
    return {
      tagName: 'Task',
      tasks: [],
      outerVisible: false
    }
  },
  computed: {
    uid () {
      return this.$store.getters.userInfo.uid
    }
  },
  methods: {
    onEmitDeleteTask (payload) {
      console.log('Board component, onEmitDeleteTask')
      this.tasks--
    },
    onClickAddTask () {
      this.tasks++
    },
    onClickUpdateTagName () {
      console.log('Board component, onClickUpdateTagName method')
      this.outerVisible = true
    }
  }
}

</script>

<style>
  .add-task-btn {
    /*float: right;*/
  }
  .board {
    margin-bottom: 100px;
    overflow: auto;
    height: 400px;
    padding: 10px;
  }
  .board-tag{
    cursor: pointer;
  }
  ul {
    padding-inline-start: 0px;
    list-style:none;
  }
  li {
    padding-bottom: 4px;
    cursor: pointer;
  }
</style>
