<template lang="html">
  <div class="com_border">
    <h3>Message组件</h3>
    <ul>
      <li v-for='(message,index) in messages' :key='message.id' class="classLi">
        <router-link :to="`/home/Message/detail/${message.id}`">{{message.title}}</router-link>
        <button @click='pushShow(message.id)'>push查看</button>
        <button @click='replaceShow(message.id)'>replace查看</button>
      </li>
    </ul>
    <button @click='$router.back()'>回退</button>
    <!-- 下面是完整写法,与上面简写等效 -->
    <!-- <button @click='this.$router.back()'>回退</button> -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data (){
    return {
      messages:[]
    }
  },
  mounted () {
   //模拟ajax请求从后台获取数据
   setTimeout(() => {
     const messages = [
       {
         id:1,
         title: 'messages001',
       },
       {
         id:2,
         title: 'messages002',
       },
       {
         id:4,
         title: 'messages004',
       },
     ];
     this.messages = messages
   },1000)
 },
 methods: {
   pushShow (id){
     this.$router.push(`/home/Message/detail/${id}`)  //需要动态的id
   },
   replaceShow (id){
     this.$router.replace(`/home/Message/detail/${id}`)  //需要动态的id
   },
 }
}
</script>

<style lang="less">
 .classLi{
   background-color: yellowgreen
 }

</style>
