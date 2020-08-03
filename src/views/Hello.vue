<template>
  <div class="hello">
    <h1 class="title">Hello Trello</h1>
    <el-button @click="onClickStart" round>시작하기</el-button>
  </div>
</template>

<script>
export default {
  name: 'Hello',
  methods: {
    onClickStart () {
      this.$router.push({ path: '/sign-in' })
    }
  }
}

</script>

<style>
  .hello {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -70%);
  }

  .title {
    color: #F56C6C;
    font-size: 82px;
    text-align: center;
  }
</style>
