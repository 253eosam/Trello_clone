<template>
  <header>
    <h1 class="title">{{ title }}</h1>
    <h5 class="subtitle">{{ subTitle }}</h5>
  </header>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'Trello'
    },
    subTitle: {
      type: String,
      default: 'We Make Price'
    }
  }
}
</script>

<style lang="scss">
header {
  text-align: center;

  .title {
    color: #F56C6C;
    font-size: 82px;
  }
}
</style>
