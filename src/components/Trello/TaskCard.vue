<template>
  <div class="task-container">
    <strong class="title">{{title}}</strong>
    <p class="content">{{content}}</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

@Component
export default class Task extends Vue {
  @Prop({ default: 'Empty title', type: String }) title!: string
  @Prop(String) content!: string | null
}
</script>

<style lang="scss" scoped>
.task-container {
  width: 200px;
  height: 80px;
  border-radius: 20px;
  background: white;
  line-height: 24px;
  .title {
    font-size: 15px;
  }
  .content {
    margin: 0 auto;
    font-size: 13px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    width: 95%;
    line-height: 1.2em;
    height: 3.6em;
  }
}
</style>
