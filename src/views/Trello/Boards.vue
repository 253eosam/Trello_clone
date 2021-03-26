<template>
  <section id="boards_wrap">
    <h2>Board list</h2>
    <article class="board-box board-item">
      <h3>Agile</h3>
    </article>
    <div class="board-box">Create new Board</div>
  </section>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Boards extends Vue {

}
</script>

<style lang="scss" scoped>
#boards_wrap {
  width: 800px;
  margin: 20px auto 0;
  &::after {
    display: block;
    content: '';
    clear: both;
  }
  h2 {
    font-size: 20px;
    font-weight: 700;
    padding: 0 0 5px 5px;
    border-bottom: 1px solid rgba($color: #000000, $alpha: 0.2);
    margin-bottom: 15px;
  }

  .board-box {
    width: 200px;
    height: 100px;
    background: #f2f3f5;
    border-radius: 3px;
    float: left;
    margin-right: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    user-select: none;

    &:last-child {
      text-align: center;
      line-height: 100px;
    }
  }

  .board-item {
    background: #333;
    color: #fff;
    h3 {
      padding: 10px;
      font-size: 17px;
      font-weight: 700;
      text-shadow: 0 0 2px #000;
    }
  }

}
</style>
