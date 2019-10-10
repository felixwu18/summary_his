<template lang="html">
  <div class="about com_border">
    <h2>About组件</h2>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  props: {
    //接受上级传来的数据,先声明一个props属性接受
    msg: String,
  }
};
</script>

<style lang="less">
.about {
  color: green;
  font-size: bold;
}
</style>
