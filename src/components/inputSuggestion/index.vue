<template>
  <div>
    <h1>input带建议</h1>
    <!-- autocomplete 是一个可带输入建议的输入框组件，可以直接使用 -->
    <!-- 分为两种，一种是激活就列出输入建议，一种是输入后匹配输入建议，目前需求是输入后再匹配，所以需要把trigger-on-focus的值设为false. -->
    <el-autocomplete
      class="el-input"
      v-model="houseNumber"
      :fetch-suggestions="querySearchAsync"
      placeholder="请输入房间号"
      :trigger-on-focus="false"
      @focus="getHouse"
    ></el-autocomplete>
  </div>
</template>
<script>
export default {
  data() {
    return {
      houseNumber: ""
    };
  },
  methods: {
    querySearchAsync(queryString, cb) {
      let houseNumberList = this.houseNumberList;
      let results = queryString
        ? houseNumberList.filter(this.createStateFilter(queryString))
        : houseNumberList;
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        cb(results);
      }, 1000 * Math.random());

      //       this.houseNumberList = [];
      // for(let i=0;i<res.data.hlHouse.length;i++){
      //    this.houseNumberList.push({'value':res.data.hlHouse[i].houseNumber})
      // }
      // return this.houseNumberList;
    },
    getHouse(val) {
      console.log("val");
      console.log(val);
    }
  },
  components: {},
  created() {},
  mounted() {},
  computed: {}
};
</script>
<style scoped>
</style>