import Vue from 'vue'
function changeStr(str) {
// chartAt取首字母, 
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const requireComponent = require.context('.', false, /\.vue$/) // false 是否使用子目录

requireComponent.keys().forEach(fileName => {
  // 第i个
  const config = requireComponent(fileName)
//   console.log('config') // 路径
//   console.log(config)
//   console.log(requireComponent.keys())
  const componentName = changeStr(
    fileName.replace(/^\.\//,'').replace(/\.\w+$/, '')
  )
    console.log(componentName)
    Vue.component(componentName, config.default || config)
})