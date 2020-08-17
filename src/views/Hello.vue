<template>
  <div class="hello">
    <h1 class="hello__title">Hello</h1>
      <span v-if="session" class="hello__nav">
        <ul>
          <li>
            <el-button @click="$router.push({ name: 'Trello' })" :type="session ? 'primary' : 'danger'" plain>Trello</el-button>
          </li>
          <li>
            <el-button @click="$router.push({ name: 'Test' })" :type="session ? 'primary' : 'danger'" plain>연구실</el-button>
          </li>
        </ul>
      </span>
      <br>
      <el-button @click="onClickSessionBtn" icon="el-icon-user" :type="session ? 'danger' : 'primary'" plain>{{session ? '로그아웃' : '로그인'}}</el-button>
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
    ul{
      list-style: none;
      padding-inline-start: 0px;
      li {
        padding: 2px;
      }
    }
  }

</style>
