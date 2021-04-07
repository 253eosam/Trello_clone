<template>
  <div id="popup-layer" v-if="data.isVisible">
    <section>
      <header id="popup-header">
        <h2>{{data.title}}</h2>
        <button type="button" class="close-btn" @click="data.isVisible = false">close</button>
      </header>
      <component :is="data.component" v-bind="data.propsData"></component>
    </section>
  </div>
</template>

<script lang="ts">
import EventBus from '@/utils/EventBus'
import { Component, Vue, Watch } from 'vue-property-decorator'

const initData = () => {
  return {
    component: null,
    isVisible: false,
    title: 'ff',
    propsData: {}
  }
}

@Component
export default class PopupLayer extends Vue {
  data = initData();

  mounted () {
    EventBus.$on('SHOW_POPUP', ({ component, title, props }: any): void => {
      this.data.isVisible = true
      this.data.component = component
      this.data.title = title || ''
      this.data.propsData = props
    })
  }

  @Watch('data.isVisible')
  onVisibleChaged (newValue: boolean) {
    if (!newValue) this.data = initData()
  }
}
</script>
<style lang="scss" scoped>
#popup-layer {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba($color: #000000, $alpha: .6);

  section {
    position: absolute;
    display: inline-block;
    min-width: 500px;
    min-height: 300px;
    background: #ffffff;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);

    header {
      position: relative;
      height: 50px;
      border-bottom: 1px solid rgba($color: #000000, $alpha: .2);
      h2 {
        line-height: 50px;
        padding: 0 20px;
        font-size: 130%;
      }
      .close-btn {
        position: absolute;
        top: 15px;
        bottom: 15px;
        right: 20px;
        width: 20px;
        text-indent: -99999px;
        background: #ffffff;
        border: 0;
        border-radius: 2px;
        box-shadow: 0 0 4px;
        &::before {
          display: inline-block;
        }
      }
    }
  }
}
</style>
