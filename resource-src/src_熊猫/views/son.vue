<template lang="html">
  <div class="about com_border">
    <p>我是子组件</p>
    <p>智力： {{ wisdom }}</p>
    <p>膜法： {{ magic }}</p>
    <p>攻击： {{ attack }}</p>
    <p>防御： {{ defense }}</p>
    <button @click="increment('wisdom')">增加智力</button>
    <button @click="increment('magic')">增加膜法</button>
    <button @click="increment('attack')">增加攻击</button>
    <button @click="increment('defense')">增加防御</button>
  </div>
</template>

<script>
export default {
  props: {
    // 测试父子组件数据同步
    // wisdom: Number,
    wisdom: {type: Number},
    magic: Number,
    attack: Number,
    defense: Number
  },
  methods: {
    increment(dataName) {
      let newValue = this[dataName] + 1;  // 获取父亲的值, 可data里转, 也可以通过this
      this.$emit(`update:${dataName}`, newValue);
    }
  }
};
</script>

<style lang="less">
.about {
  color: green;
  font-size: bold;
}
</style>
