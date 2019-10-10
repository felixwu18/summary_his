import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

Vue.mixin({
  // created: function(){
  //  console.log('minx====') //混入全局(加入Vue原型或原型链中)
  // //  console.log()
  // }
  // $data: {
  //   quanjuzhuru: 666
  // }
})

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
