/*文本溢出 需要固定父容器宽度， px, %都可 */
import textEllipsis from './index.vue'
const YhTextEllipsis = {
    install: function(Vue) {
      Vue.component('YhTextEllipsis', textEllipsis)
    }
}

export default YhTextEllipsis