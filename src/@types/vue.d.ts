import Vue from 'vue' // $router, $store 자동등록

declare module 'vue/types/vue' {
  interface Vue {
    $showPopup: any;
    $eventBus: any;
  }
}
