import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)


import App from './App.vue'

import * as utils from './utils/index'
Vue.prototype.$utils = utils

// 验证挂在Vue实例
import validate from './utils/validate'
Vue.prototype.$validate  = validate


// 引入lodash
import _ from 'lodash'
Vue.prototype.$lodash = _


new Vue({
  el: '#app',
  render: h => h(App)
})
