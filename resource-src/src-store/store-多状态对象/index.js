import Vue from "vue";
import Vuex from "vuex";
import counter from "./modules/counter/counter";
import alertTip from "./modules/alertTip/alertTip";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  // 多状态对象注入
  modules: {
    counter,
    alertTip
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
})
console.log('vuex-store')
console.log(new Vuex.Store({
  // 多状态对象注入
  modules: {
    counter,
    alertTip
  },
  strict: debug
  // plugins: debug ? [createLogger()] : []
}))