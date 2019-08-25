<template>
  <div id="app" class="container">
    <h1>数据模型测试</h1>
    <h3>{{demoData.prop}}---{{demoData.label}}---{{demoData.time}}---{{demoData.money}}</h3>
  </div>
</template>
<script>
import getData from "@/api/demo";
export default {
  data() {
    return {
      demoData: {}
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      // const data = [
      //   { prop: "name", label: "姓名-selcet1" },
      //   { prop: "time", label: "日期-selcet2" },
      //   { prop: "province", label: "省份-selcet6" },
      //   { prop: "city", label: "市区-selcet2" },
      //   { prop: "address", label: "地址-selcet1" },
      //   { prop: "zip", label: "邮编-selcet9" }
      // ];
      getData().then(res => {
        this.demoData = res;
        console.log("res");
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  padding-bottom: 3em;
}
</style>
