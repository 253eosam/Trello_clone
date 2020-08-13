<template>
  <div class="hello">
    <h1 class="hello__title">Hello</h1>
    <el-dropdown @command="handleCommand">
      <el-button @click="onClickSessionBtn" icon="el-icon-user" :type="session ? 'primary' : 'danger'" circle></el-button>
      <el-dropdown-menu v-if="session" slot="dropdown">
        <el-dropdown-item command="Trello">Start Trello</el-dropdown-item>
        <el-dropdown-item command="Test">연구실</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Hello',
  computed: {
    session () {
      return this.$store.getters.user
    }
  },
  methods: {
    ...mapMutations([
      'setUser'
    ]),
    onClickSessionBtn () {
      if (this.session) {
        this.setUser()
        this.$message('로그아웃 성공..!!')
      } else this.$router.push('/sign-in')
    },
    handleCommand (command) {
      this.$router.push({ name: command })
    },
    onClickStartTrello () {
      this.$router.push({ path: '/sign-in' })
    }
  }
}

</script>

<style lang="scss">
  .hello {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);

    .hello__title {
      color: #F56C6C;
      font-size: 82px;
      text-align: center;
    }
    .hello__nav ul{
      list-style: none;
    }
  }

</style>
