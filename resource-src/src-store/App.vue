<template>
  <div class="container">
    <!-- 多状态对象测试用 -->
    <!-- <p>click {{$store.state.counter.count}} times, count is {{evenOrOdd}}</p> -->
    <p>click {{$store.state.count}} times, count is {{evenOrOdd}}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
    <button @click="incrementIfOdd">increment if odd</button>
    <button @click="incrementAsync">increment async</button>
    <!-- 多状态对象测试用 -->
    <!-- <h1>{{$store.state.alertTip.greeting}}</h1>
    <button @click="sayHello">click say hello</button> -->
  </div>
</template>

 <script>
 import { mapGetters, mapActions } from 'vuex'
 console.log('mapstate')
export default {
  data() {
    return {
      words: 'hello nice to meet u !' // 测试多状态对象
    }
  },
  // -------------------------------------
    // computed: {
    //   // 计算属性对应到store里的getters属性
    //   evenOrOdd() {
    //     return this.$store.getters.evenOrOdd;
    //   }
    // },
  //辅助函数 mapGetters
   computed: mapGetters(['evenOrOdd']),
  // -------------------------------------
    // methods: {
    //   increment() {
    //     //通知vuex去增加
    //     this.$store.dispatch("increment"); //触发store中对应的action调用
    //   },
    //   //减少
    //   decrement() {
    //     this.$store.dispatch("decrement");
    //   },
    //   //如果是奇数才增加
    //   incrementIfOdd() {
    //     this.$store.dispatch("incrementIfOdd");
    //   },
    //   // 过1s才增加
    //   incrementAsync() {
    //     this.$store.dispatch("incrementAsync");
    //   },
    //   //多状态对象测试
    //   // sayHello() {
    //   //   this.$store.dispatch("sayHello", this.words);
    //   // }
    // },
  //辅助函数 mapActions
   methods: {
     ...mapActions(['increment','decrement','incrementIfOdd','incrementAsync'])
   },
  // -------------------------------------
  created(){
  },
  mounted(){
  }
};
</script>

<style lang="less">
button{
  padding: .5em 1em;
  font-size: 1em;
}
.container {
  text-align: center;
  .footerGuide {
    position: fixed;
    bottom: 3em;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
}
</style>
