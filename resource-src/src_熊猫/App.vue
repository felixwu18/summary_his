<template>
  <div class="com_border root">
    <img src="./assets/news.png" alt />
    <img src="./assets/panda_big.jpg" alt />
    <h1 @click="testClick" ref="app">App组件</h1>
    <div>
      <router-link to="/about">About</router-link>
      <router-link to="/home">Home</router-link>
    </div>
    <div>
      <router-view msg="我是通过<router-view>传递的数据,上级传给我的"></router-view>
    </div>
    <!-- 测试父子组件同步 -->
    <div style="padding-top: 2em">
      我是App父组件
      <son :wisdom.sync="wisdom" :magic.sync="magic" :attack.sync="attack" :defense.sync="defense"></son>
      <p>智力： {{ wisdom }}</p>
      <p>膜法： {{ magic }}</p>
      <p>攻击： {{ attack }}</p>
      <p>防御： {{ defense }}</p>
    </div>
    <div style="padding-top: 2em"><button @keydown.9="testKeyEvent">测试键盘事件</button></div>
  </div>
</template>

<script>
import son from './views/son'
import { qsStringify } from "./utils"

export default {
  data: function() {
    return {   // 测试父子组件同步
      wisdom: 90,
      magic: 160,
      attack: 100,
      defense: 80
    };
  },
  methods: {
    testClick(e) {
      console.log("click-ok");
      console.log(e);
      this.$refs.app.click(); // 手动调触发
      // obj to urlString
      let obj = {
        name: ['wufei','felix'],
        friends: {
           1: {name: 'zhangs'},
           2: {name: 'lisi',age: 18}
        }
      }
    let urlString = qsStringify (obj)
    console.log('urlString')
    console.log(urlString)
    },
    testKeyEvent(event){
      console.log(event.key)      // 英文标识符, 与code相同
      console.log(event.keyCode)  // 键盘编码
    }
  },
    components: {
    son: son
  }
};
</script>

<style lang="less">
.root h1 {
  margin: 0;
  padding-bottom: 0.2em;
  background-color: red;
}
</style>
