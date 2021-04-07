import Vue from 'vue'

declare module 'vue/types/vue' {
    interface Vue {
        $showPopup: any;
        $showLoading: any;
        $closeLoading: any;
    }
}
