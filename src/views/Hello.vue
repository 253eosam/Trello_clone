<template>
  <div class="hello">
    <h1 class="hello__title">Hello</h1>
    <div class="hello__header">
      <el-button @click="onClickSignInBtn" icon="el-icon-user" :type="session ? 'primary' : 'danger'" circle></el-button>
    </div>
    <div v-if="session" class="hello__nav">
      <ul>
        <li>
          <el-button @click="onClickStartTrello" round>Start Trello</el-button>
        </li>
        <li>
          <el-button round @click="$router.push({ name: 'test'})">연구실</el-button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  computed: {
    session () {
      return this.$store.getters.user
    }
  },
  watch: {
    session (to, from) {
      console.log(`${to} , ${from}`)
    }
  },
  methods: {
    onClickSignInBtn () {
      this.$router.push('/sign-in')
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
