<template>
  <div>
    <h1 class="title">Hello Trello</h1>
    <el-button @click="onClickStart">시작하기</el-button>
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
  .title{
    color: #F56C6C;
    font-size: 82px;
    text-align: center;
  }
</style>
