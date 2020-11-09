<template>
  <div class="popup-wrap">
    <input type="checkbox" id="popup-visibility-flag" v-model="data.isVisible" />
    <div class="popup-wrap">
      <div class="popup-container">
        <div class="popup-header">
          <h1>{{data.title}}</h1>
          <label for="popup-visibility-flag"><font-awesome-icon icon="times" /></label>
        </div>
        <component :is="data.component" v-bind="data.propsData" @close="data.isVisible = false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EventBus from '@/utils/EventBus'
import { Component, Vue, Watch } from 'vue-property-decorator'

const initData = () => {
  return {
    component: null,
    isVisible: false,
    title: '',
    propsData: {}
  }
}

@Component
export default class PopupLayer extends Vue {
  data = initData()

  mounted () {
    EventBus.$on('SHOW_POPUP', (pComponent: any, title: string, propsData: any): void => {
      this.data.isVisible = true
      this.data.component = pComponent
      this.data.title = title || ''
      this.data.propsData = propsData
    })
  }

  @Watch('data.isVisible')
  onVisibleChaged (newValue: boolean) {
    !newValue && (this.data = initData())
  }
}
</script>
<style lang="scss" scoped>
.popup-wrap {
  #popup-visibility-flag {
    display: none;
  }
  #popup-visibility-flag:checked + .popup-wrap {
    visibility: visible;
  }
  #popup-visibility-flag + .popup-wrap {
    visibility: hidden;
  }

  .popup-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    z-index: 100;
  }

  .popup-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    min-width: 500px;
    min-height: 100px;
    background: white;
    z-index: 2;
    .popup-header {
      display: flex;
      width: 100%;
      height: 59px;
      border-bottom: 1px solid black;
      h1 {
        margin: auto 10px;
      }
      >label {
        position: absolute;
        top: 0%;
        right: 0%;
        padding: 20px;
        background: inherit;
        z-index: 1;
      }
    }
  }

}
</style>
