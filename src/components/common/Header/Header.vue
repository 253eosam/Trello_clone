<template>
  <div class="header">
    <header>
      <h1>{{ title }}</h1>
    </header>
    <footer>
      <strong>We Make Price</strong>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    title: {
      type: String,
      default: 'Hello'
    }
  }
}
</script>

<style lang="scss">
.header {
  text-align: center;
  h1 {
    color: #F56C6C;
    font-size: 82px;
  }
  strong {
    font-size: 13px;
  }
}
</style>
