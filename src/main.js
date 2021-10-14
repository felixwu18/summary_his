import Vue from 'vue'
import ElementUI from 'element-ui'
console.log(ElementUI, 'ElementUI-----');
// import ComponentLib from 'component-lib'
// console.log(ComponentLib, 'ComponentLib-----');

import './mixins/data/index' // webpack的读文件功能

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
// 自定义指令，实现按下enter后，光标自动跳转下一个输入框
Vue.directive('enterNextInput', {
  inserted: function (el) {
    el.addEventListener("keypress",function(e){
      e = e || window.event;
      console.log(e, ' e = e || window.event');
      // let charcode = typeof e.charCode == 'number' ? e.charCode : e.keyCode;
      if(e.keyCode == 13){
        var dom = document.getElementsByTagName("input")
        for (var i = 0; i < dom.length; i++) {
          if (dom[i] == document.activeElement) {
            if (i==dom.length) {
              return
            }
            dom[i+1].focus()
            return
          } 
        }
      }
    });
  }
});
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
