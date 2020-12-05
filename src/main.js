import Vue from 'vue'
import ElementUI from 'element-ui'
console.log(ElementUI, 'ElementUI-----');
// import ComponentLib from 'component-lib'
// console.log(ComponentLib, 'ComponentLib-----');

import 'element-ui/lib/theme-chalk/index.css'

// 全局注册
import '@/components/global.js'
import { checkArray } from '@/common/array.js'
//vue的自定义指令
Vue.directive('display-key',{
  inserted(el, binding) {
    console.log('el-bing')
    console.log(el)
    console.log(binding)
    const displayKey = binding.value
    if(displayKey){
      const hasPermisson = checkArray(displayKey)
      console.log(hasPermisson)
      // 没有权限
      if(!hasPermisson){
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('没有权限key')
    }
  }
})

Vue.use(ElementUI)
// Vue.use(ComponentLib)

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

/* 注入挂载Vue */
import select2 from '@/components/select2/index'
Vue.use(select2)

// 引入lodash
import _ from 'lodash'
Vue.prototype.$lodash = _


new Vue({
  el: '#app',
  render: h => h(App)
})
