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
import EventBus from '@/utils/EventBus'

library.add(faTimes, faArrowDown)

Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(ElementUI)

Vue.prototype.$showPopup = ({ component, title, props }: { component: any; title: string; props: any}) => {
  EventBus.$emit('SHOW_POPUP', { component, title, props })
}
Vue.prototype.$showLoading = () => {
  EventBus.$emit('SHOW_LOADING')
}
Vue.prototype.$closeLoading = () => {
  EventBus.$emit('CLOSE_LOADING')
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
