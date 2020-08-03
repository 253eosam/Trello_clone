<template>
  <div class="board">
    <div>
      <el-tag @click="onClickShowUpdateTagNameDialog" class="board-tag" type="primary">{{tagName}}</el-tag>
      <el-dialog title="Update Tag Name" :visible.sync="outerVisible">
        <div class="block">
          <el-input v-model="updateTagNameDialog.newTagName" placeholder="Please input your update Tag Name"></el-input>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="onClickUpdateTagName" type="primary">Update</el-button>
          <el-button @click="outerVisible = false, updateTagNameDialog.newTagName = ''">Cancel</el-button>
        </div>
      </el-dialog>
    </div>
    <ul class="card-list">
      <li v-for="(idx) in tasks" :key="idx">
        <div>
          <task :tid="idx"></task>
        </div>
      </li>
    </ul>
    <div class="add-task-card" @click="onClickAddTask">
      <el-card shadow="hover">
        <span>+</span>
      </el-card>
    </div>
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
      outerVisible: false,
      updateTagNameDialog: {
        newTagName: ''
      },
      dragulaCard: null
    }
  },
  computed: {
    uid () {
      return this.$store.getters.userInfo.uid
    }
  },
  methods: {
    onEmitDeleteTask () {
      console.log('Board component, onEmitDeleteTask')
      this.tasks--
    },
    onClickAddTask () {
      this.tasks++
    },
    onClickShowUpdateTagNameDialog () {
      console.log('Board component, onClickUpdateTagName method')
      this.outerVisible = true
    },
    onClickUpdateTagName () {
      this.tagName = this.updateTagNameDialog.newTagName
      this.outerVisible = false
    }
  }
}

</script>

<style>
  .board {
    overflow: auto;
    height: 400px;
    padding: 10px;
    background: white;
    margin-left: 10px;
    margin-right: 10px;
    margin-bottom: 100px;
    border-radius: 10px;
  }

  .board-tag {
    cursor: pointer;
  }

  ul {
    padding-inline-start: 0px;
    list-style: none;
  }

  li {
    padding-bottom: 4px;
    cursor: pointer;
  }
</style>
