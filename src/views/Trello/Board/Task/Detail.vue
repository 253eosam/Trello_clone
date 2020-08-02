<template>
  <div class="task-detail">
    <h1 class="task-detail-title">{{title}}</h1>
    <hr />
    <div class="task-detail-navigator">
      <ul>
        <li><span>STATUS</span><el-tag>TAG</el-tag></li>
      </ul>
    </div>
    <div class="task-detail-content">
      <p>text-area</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskDetail',
  props: {
    title: {
      type: String
    }
  }

}
</script>

<style>
  .task-detail{
    text-align: left;
  }
  .task-detail-title{
    margin-left: 10px;
  }
  .task-detail-navigator {
    margin-left: 10px;
  }
  .task-detail-content{
    margin-left: 5px;
    padding: 10px;
    border: black solid 1px;
  }

</style>
