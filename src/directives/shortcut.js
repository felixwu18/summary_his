import Vue from 'vue'

/**
 * @Descripttion: 快捷键功能指令
 *
 * eg:
 *  <div ... v-shortcut:alt="{k: 'q'}">   => alt + q 组合键
 *  <div ... v-shortcut="{k: 'q'}">   => q 单键
 * ps:
 *  暂时不用再同一页面(包括弹窗) 中绑定重复的按键， 如果需要， 请使用 keysMixins.js 混入方式
 */

const handleAddKeyEvent = (e, el, binding) => {
       const key = binding.value && binding.value['k'].toUpperCase();
       const fnKey = binding.arg ? binding.arg.toLowerCase() : '';
       const fnKeyAttr = fnKey + 'Key';

       if(!key && !fnKey) {
              console.warn('v-shortcut 指令value不能为空')
              return
       }

       // 单键
       if(!fnKey && !key === e.key.toUpperCase()) {
              el.click()
              e.preventDefault()
              e.returnValue = false
              return false
       }

       // 组合键
       if(key === e.key.toUpperCase() && fnKey && e[fnKeyAttr]) {
              el.click()
              e.preventDefault()
              e.returnValue = false
              return false
       }
}

const shortcut = Vue.directive('shortcut', {
          inserted(el, binding, vNode) {
              document.removeEventListener('keydown', function(e) {
                            handleAddKeyEvent(e, el, binding)
              }, true)
          },
          unbind(el, binding) {
              document.removeEventListener('keydown', function(e) {
                            handleAddKeyEvent(e, el, binding)
              })
          }
})

export default shortcut