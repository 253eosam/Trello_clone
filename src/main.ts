import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$showPopup = function (popup: any, data: any) { this.$events.$emit('SHOW_POPUP', { popup, ...data }) }
Vue.prototype.$hidePopup = function () { this.$events.$emit('HIDE_POPUP') }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
