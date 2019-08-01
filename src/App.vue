<template>
  <div style="text-align: center;padding-bottom: 3em">
    <div>
      <h1>异步组件测试</h1>点击按钮后
      第一个延迟300毫秒，从服务器加载
      第二个不延迟从服务器加载
      <template v-if="show">
        <later></later>
        <later2></later2>
      </template>
      <button @click="toggle">加载</button>
    </div>

    <collapse />
    <dynamicTable
      :formHead="formHead"
      :configureSet="configureSet"
      :data="tableData"
      :editArr="['name','zip']"
      :selectArr="['name','zip']"
      :RegObj="{zip:numberReg}"
      :handleArr="['查看','新增','删除','审核','点我啊','果然']"
      @newRow="addRow"
      @enterDetail="handleDetail"
      @deleteRow="deleteRow"
      @row-click="rowClick"
      @dynamicEvent="eventTrigger"
    />
    <!-- 
      :formHead="formHead"
      :data="tableData"
      :editArr="['name','city']"
      :RegObj="{city:numberReg}"
      :radio="true"
      :selection="true"
      :handleArr="['查看','新增','删除','审核']"
      @newRow="addRow"
      @enterDetail="handleDetail"
      @deleteRow="deleteRow"
    @row-click="rowClick"-->

    <!-- 列标头 -->
    <colHeadTable :tableData="tableData2" :tableStyle="{ width:'80%',margin:'0 auto' }" />
    <!-- 时间组件 -->
   <dataSelector :timeDefault="['2019-6-8','2019-7-8']"/>
    <!-- 分页器 -->
    <Pagination :total="30"/>
    <!-- 选择器 -->
    <searchSelect title="选择器" :insertValue.sync="selectVal" :configure="formHead" />
    {{selectVal}}
    <button @click="ceshi">ceshi</button>
    <!-- 上传组件 -->   
    <!-- <UploadExcel /> -->

  </div>
</template>
<script>
/**
 * v-for 不仅遍历数组, 还可遍历对象
 * 一个优雅的实现前端模块化、并能按权重的优先级顺序异步加载的实现方案 --- vue的异步组件
 * 将页面核心功能（音、视频播放、文章、商品等等）打包成一个核心模块，通过框架优先加载。
 * 其他的一些周边功能打包后，通过服务器异步加载，从而解决业务需求越来越多导致的系统难维护、访问慢问题。
 */
import Vue from "vue";
import collapse from "./components/collapse/index";
import dynamicTable from "./components/table/index";
import colHeadTable from "./components/table/colHeadTable";
import dataSelector from "./components/DateSelector/index";
import Pagination from "./components/Pagination/index";
import searchSelect from "./components/searchSelect/index";
// import UploadExcel from "./components/UploadExcel/index";
// 服务器异步组件1：
const later = Vue.component("later", function(resolve) {
  setTimeout(function() {
    require(["./later.vue"], resolve);
  }, 3000);
});
// 服务器异步组件2：
const later2 = Vue.component("later2", function(resolve) {
  require(["./later2.vue"], resolve);
});
// 先配标头
const formHead = [
  { prop: "name", label: "姓名" },
  { prop: "date", label: "日期" },
  { prop: "province", label: "省份" },
  { prop: "city", label: "市区" },
  { prop: "address", label: "地址" },
  { prop: "zip", label: "邮编" }
];
//测试select 配数据
const selcet = [
  { prop: "name", label: "姓名-selcet" },
  { prop: "date", label: "日期-selcet" },
  { prop: "province", label: "省份-selcet" },
  { prop: "city", label: "市区-selcet" },
  { prop: "address", label: "地址-selcet" },
  { prop: "zip", label: "邮编-selcet" }
];

const tableData = [
  {
    date: "2016-05-02",
    name: "",
    province: "四川",
    city: "成都",
    address: "春熙路",
    zip: 999
  },
  {
    date: "2016-05-04",
    name: "李四",
    province: "上海",
    city: "",
    address: "上海市普陀区金沙江路 1517 弄",
    zip: 666
  }
];
// 第一列表头
const tableData2 = [
  { key: "单号", value: "1001" },
  { key: "商品名称", value: "篮球" },
  { key: "价格", value: "120.00" },
  { key: "订单日期", value: "2017-03-01" },
  { key: "付款方式", value: "在线支付" },
  { key: "收货地址", value: "北京市海淀区西北旺镇" }
];

// const AsyncComponent = () => ({
//   // 需要加载的组件 (应该是一个 `Promise` 对象)
//   component: import('./later.vue'),
//   // 异步组件加载时使用的组件
//   loading: LoadingComponent,
//   // 加载失败时使用的组件
//   error: ErrorComponent,
//   // 展示加载时组件的延时时间。默认值是 200 (毫秒)
//   delay: 200,
//   // 如果提供了超时时间且组件加载也超时了，
//   // 则使用加载失败时使用的组件。默认值是：`Infinity`
//   timeout: 3000
// })

// const defaultFormHead = ['日期','省份','市区','地址','邮编']
/**
 * 一旦后端 按key-value 对象数组传值, 渲染table就会很简单
 */

export default {
  components: {
    collapse,
    dynamicTable,
    colHeadTable,
    dataSelector,
    Pagination,
    searchSelect,
    // UploadExcel,
    later,
    later2
  },
  data() {
    return {
      configureSet:{name: formHead, zip: selcet}, //测试selet
      selectVal:'',
      formHead, // 配置标头
      tableData,
      tableData2,
      numberReg: /^[0-9]+.?[0-9]*$/, // 输入验证
      show: false
    };
  },
  methods: {
    ceshi(){
      console.log('this.selectval')
      console.log(this.selectVal)
      this.selectVal= 'zip'
      
      setTimeout(_=>{this.selectVal = 'date'},1000)
      setTimeout(_=>{this.selectVal = 'address'},2000)
    },
    //动态事件
    eventTrigger(row, eventName){
       console.log('row--eventName')
       console.log(row, eventName)
    },
    addRow(row, newRow) {
      // if (row.name && row.zip) {
      //   // this.$refs.dynamicTable.data.push(params);
      //   this.tableData.push(newRow);
      // }
    },
    handleDetail(row) {
      console.log("row");
      console.log(row);
    },
    deleteRow() {
      // console.log('this.tableData')
      // console.log(this.tableData)
    },
    rowClick(row) {
      // console.log("row");
      // console.log(row);
    },
    toggle() {
      this.show = !this.show;
    }
  },
  watch: {
    // 有change事件就可不用监听数据
    // radioVal(val){
    //  console.log('watch-val',val)
    // }
  },
  created() {},
  mounted() {},
  computed: {}
};
</script>
<style>
.colapse {
  width: 50%;
  margin: 0 auto;
}
.cell {
  text-align: center;
}
.el-radio__label {
  display: none;
}
</style>