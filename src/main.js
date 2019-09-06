import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


import App from './App.vue'

import * as utils from './utils/index'
Vue.prototype.$utils = utils

// 引入lodash
import _ from 'lodash'
Vue.prototype.$lodash = _


new Vue({
  el: '#app',
  render: h => h(App)
})
