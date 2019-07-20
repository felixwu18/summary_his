import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

import * as utils from './utils/index'
Vue.prototype.$utils = utils
Vue.use(ElementUI)

new Vue({
  el: '#app',
  render: h => h(App)
})
