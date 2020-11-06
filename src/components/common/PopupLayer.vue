<template>
  <div class="popup-wrap">
    <input type="checkbox" id="popup-visibility-flag" v-model="isVisible" />
    <div class="popup-background">
      <div class="popup-container">
        <div class="popup-header">
          <h1>{{title}}</h1>
          <label for="popup-visibility-flag"><font-awesome-icon icon="times" /></label>
        </div>
        <component :is="component" v-bind="data" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import EventBus from '@/utils/EventBus'
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class PopupLayer extends Vue {
  component = null;
  isVisible = false;
  title = ''
  data = {}

  mounted () {
    EventBus.$on('SHOW_POPUP', (pComponent: any, data: any): void => {
      this.isVisible = true
      this.component = pComponent
      this.title = data.title || ''
      this.data = data
    })
  }
}
</script>
<style lang="scss" scoped>
.popup-wrap {
  #popup-visibility-flag {
    display: none;
  }
  #popup-visibility-flag:checked + .popup-background {
    visibility: visible;
  }
  #popup-visibility-flag + .popup-background {
    visibility: hidden;
  }

  .popup-background {
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
