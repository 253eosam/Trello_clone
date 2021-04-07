<template>
<div id="loading-wrap" v-if="isShow">
  <div id="loading">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
</div>
</template>

<script>
import EventBus from '@/utils/EventBus'
export default {
  name: 'Loading',
  data () {
    return {
      isShow: false
    }
  },
  mounted () {
    EventBus.$on('SHOW_LOADING', () => {
      this.isShow = true
    })
    EventBus.$on('CLOSE_LOADING', () => {
      this.isShow = false
    })
  }
}
</script>

<style lang="scss" scoped>
#loading-wrap {
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translate(-50%,-50%);
}
#loading {
  width: 200px;
  height: 200px;
  position: relative;
  animation: rint 3s linear 0s infinite;
  transform-style: preserve-3d;

  @keyframes rint {
    from {
      transform: rotateX(0) rotateY(0) rotateZ(0);
    }
    to {
      transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg);
    }
  }

  div {
    width: 200px;
    height: 200px;
    position: absolute;
    left: 0;
    top: 0;
    opacity: 0.3;
  }

  /* 옆면 */
  div:nth-child(1) {
    transform: rotateY(0deg) translate3d(0px, 0px, 100px);
    background: red;
  }
  div:nth-child(2) {
    transform: rotateY(90deg) translate3d(0px, 0px, 100px);
    background: green;
  }
  div:nth-child(3) {
    transform: rotateY(180deg) translate3d(0px, 0px, 100px);
    background: blue;
  }
  div:nth-child(4) {
    transform: rotateY(270deg) translate3d(0px, 0px, 100px);
    background: yellow;
  }

  /* 윗면과 아랫면 */
  div:nth-child(5) {
    transform: rotateX(90deg) translate3d(0px, 0px, 100px);
    background: brown;
  }
  div:nth-child(6) {
    transform: rotateX(270deg) translate3d(0px, 0px, 100px);
    background: pink;
  }
}
</style>
