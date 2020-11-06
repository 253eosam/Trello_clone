import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faArrowDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faArrowDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$showPopup = function (popup: any, data: any) { this.$emit('SHOW_POPUP', { popup, ...data }) }
Vue.prototype.$hidePopup = function () { this.$emit('HIDE_POPUP') }

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
