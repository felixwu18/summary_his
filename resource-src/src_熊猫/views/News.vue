<template lang="html">
    <ul class='com_border'>
      <h3>News组件</h3>
      <li class="newLi" v-for='(news,index) in newsArr' :key='index'>{{news}}</li>
    </ul>
</template>

<script>
export default {
  data (){
    return{
    newsArr:['news001','news002','news003']
    }
  }
}
</script>

<style lang="less">
 .newLi{
   background-color: yellowgreen;
 }
</style>
