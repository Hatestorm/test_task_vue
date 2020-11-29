import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './registerServiceWorker'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import lodashPlugin from '@/utils/lodash.plugin.js'
import Spinner from '@/components/Spinner/Spinner.vue'
import priceFilter from '@/filters/price.filter.js'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

Vue.use(lodashPlugin)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

Vue.filter('price', priceFilter)
Vue.component('Spinner', Spinner)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
