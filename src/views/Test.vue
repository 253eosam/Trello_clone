<template>
  <section class="test">
    <h1>연구실</h1>
    <hr>
    <div class="test__body">
      <el-row>
        <el-col span='12'>
          <board-component bid="20"></board-component>
        </el-col>
        <el-col span='12'>
          <board-component bid="31"></board-component>
        </el-col>
      </el-row>
    </div>
    <div class="test__footer">
    </div>
  </section>
</template>

<script>
import BoardComponent from './../components/Board/Board'
export default {
  name: 'Test',
  components: {
    BoardComponent
  }
}
</script>

<!--
  대상-요소__상태
  대상의 요소나 부분을 의미할 때 언더스코어 두개(__)
  대상이나 요소의 상태나 속성을 의미할 때 하이픈 두 개(--)로 연결
  .form {}
  .form__button {}
  .form__button--disabled {}
-->
<style lang="scss" scoped>
.task {
  .task__body {
    padding: 0.01em 16px;
  }
}
</style>
