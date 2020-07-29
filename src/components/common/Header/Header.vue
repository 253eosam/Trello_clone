<template>
  <div>
    <h1 class="title">{{title}}</h1>
    <h5 class="subtitle">{{subTitle}}</h5>
  </div>
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

<style>
.title{
  color: #F56C6C;
  font-size: 82px;
  text-align: center;
}
</style>
