<template>
  <div class="container">
    <div class="content">
      <div class="title_wrap">
        <h1 class="title">DDD's Life</h1>
      </div>
      <div class="service_list_wrap">
        <ul class="service_list">
          <li>
            <strong class="blind">Trello</strong>
            <service-box class="service_box"></service-box>
          </li>
          <li>
            <strong class="blind">Ledger</strong>
            <service-box class="service_box"></service-box>
          </li>
          <li>
            <strong class="blind">Bunchang company</strong>
            <service-box class="service_box"></service-box>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import ServiceBox from '@/components/common/ServiceBox'

export default {
  name: 'Hello',
  components: {
    ServiceBox
  }
}
</script>
<style lang="scss" scoped>
.container {
  height: 100%;
  width: 100%;
  display: flex;
  .content {
    margin: auto;
    height: 600px;
    width: 600px;
    .title_wrap {
      width: 600px;
      height: 150px;
      text-align: center;
      .title {
        font-family: 'Courier New', Courier, monospace;
        font-size: 70px;
        text-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
      }
    }
    .service_list_wrap {
      width: 600px;
      height: 460px;
      .service_list {
        list-style: none;
        width: 100%;
        height: 100%;
        padding: 10px 15px;
        line-height: 10px;
      }
      .service_list>li {
        text-align: center;
        .service_box {
          display: inline-block;
          margin: 10px 0;
        }
      }
    }
  }
}
</style>
