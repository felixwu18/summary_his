<template>
  <div class="container">
    <stock />
    <!-- <RZRJ /> -->
    <div style="color: red">
      <h1 :style="{ color: true ? 'blue' : '' }">异步组件测试</h1>
      点击按钮后 第一个延迟300毫秒，从服务器加载 第二个不延迟从服务器加载
      <template v-if="show">
        <later></later>
        <later2></later2>
      </template>
      <button
        @click="toggle"
        :class="{ classSelectorA: show, classSelectorB: !show }"
      >
        加载
      </button>
    </div>
    <collapse />
    <dynamicTable
      :formHead="formHead"
      :data="tableData"
      :configureSet="selectConfigureSet"
      :btnConfigure="btnConfigure"
      :editArr="['name', 'zip', 'province']"
      :switchArr="['state1', 'state2']"
      :selectArr="['name', 'zip']"
      :RegObj="{ zip: numberReg }"
      :handleArr="['查看', '新增', '删除', '审核', '点我啊', '果然']"
      :codeToLabel="codeToLabel"
      :fieldsWidth="fieldsWidth"
      :handle_width="240"
      :table_top="table_top"
      :multiple-head="3"
      :total="39"
      :pageSize.sync="pageSize"
      :currentPage="current"
      ref="singleTable"
      highlight-current-row
      @current-change="handleCurrentChange"
      @pageChange="pageChange"
      @newRow="addRow"
      @enterDetail="handleDetail"
      @deleteRow="deleteRow"
      @row-click="rowClick"
      @dynamicEvent="eventTrigger"
    />
    <el-button @click="setCurrent(tableData[1])">选中第二行</el-button>
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

    <!-- 列标头 通过外层div样式控制布局-->
    <div
      ref="fullScreenRef"
      style="width:50%; border: solid; padding-top: 20px; background: #fff"
    >
      <el-button type="primary" @click="changeFullScreen">{{
        fullScreen ? "退出全屏" : "全屏"
      }}</el-button>
      <colHeadTable
        :tableData="tableData2"
        :rowHeadArr="rowHeadArr"
        :tableStyle="{ width: '80%', margin: '0 auto' }"
      />
    </div>
    <!-- 验证组件 -->
    <searchInput />

    <!-- 封装验证组件(加布局) -->
    <!--
       注意事项 :
            (1)验证的对象(如:search)传给组件内
            (2)slot值 与 检验值 相同
            (3)slot值 与 检验值 一样
            (4)validate调用,验证结果
    -->
    <h1>封装验证组件</h1>
    <searchInput2
      :validateFields="search"
      ref="formCheck"
      :checkAdd="checkAdd"
      @validate="handleValidate"
    >
      <!-- <el-input slot="name" title="名称椒盐" :options="['required','blur',{min: 3, max: 9}]" v-model="search.name" clearable></el-input> -->
      <!-- <el-input slot="name" title="名称椒盐" :options="['required','blur','email']" v-model="search.name" clearable></el-input> -->
      <!-- <el-input slot="name" title="名称椒盐" :options="['required','blur',{rules:['repeat'],value1: '22'}]" v-model="search.name" clearable></el-input> -->
      <el-input
        v-enter-next-input
        slot="name"
        title="名称椒盐"
        :options="[{ rules: ['posNumber'] }]"
        v-model="search.name"
        clearable
      ></el-input>
      <!-- <el-input slot="name" title="名称椒盐" :options="['required','blur',{rules:['noChinese']}]" v-model="search.name" clearable></el-input> -->
      <el-select
        v-enter-next-input
        slot="region"
        title="区域选择"
        :options="['required']"
        v-model="search.region"
        clearable
        placeholder="请选择活动区域"
      >
        <el-option label="区域一" value="shanghai"></el-option>
        <el-option label="区域二" value="beijing"></el-option>
      </el-select>
      <el-date-picker
        v-enter-next-input
        slot="date1"
        title="时间选择器"
        :options="['date']"
        type="date"
        placeholder="选择日期"
        v-model="search.date1"
        style="width: 100%;"
      ></el-date-picker>
      <!-- <el-input slot="input" v-model="search.name"></el-input> -->
      <el-button @click="testFn" type="primary">立即创建</el-button>
    </searchInput2>

    <!-- 测试组件用 -->
    <testComponent />
    <!-- 时间组件 -->
    <dataSelector
      title="日期"
      :timeDefault="timeDefault"
      :start.sync="search.start"
      :end.sync="search.end"
    />
    <!-- 分页器 -->
    <Pagination :total="35" @current-change="handleCurrentChange" />
    <!-- 选择器 -->
    <searchSelect
      title="选择器"
      :insertValue.sync="selectVal"
      :configure="configue_level"
    />
    <searchLayout title="选择器实现2" :width="350">
      <setGetEnable
        @change="getObj"
        :syncObj.sync="syncObj"
        :insertValue.sync="selectVal"
        :configure="configue_level"
      />
    </searchLayout>
    <div>
      <div>{{ selectVal }}-------syncObj->----{{ syncObj.value }}</div>
    </div>
    <!-- <div v-pre>{{ selectVal }}-------syncObj->----{{ syncObj.value }}</div> -->
    <button @click="ceshi">ceshi</button>
    <!-- 上传组件 -->
    <!-- <UploadExcel /> -->
    <!-- 测试v-for -->
    <h1>测试v-for</h1>
    <!-- <label for>count:</label>
    <button v-for="(item,index) in test.count" :key="index">{{item}}--{{index}}</button>
    <br />-->
    <label for>obj:</label>
    <button v-for="(item, index) in test.obj" :key="index">
      {{ item }}--{{ index }}
    </button>
    <br />
    <label for>arr:</label>
    <button v-for="(item, index) in test.arr" :key="index">
      [{{ item }}-{{ index }}]
      <template v-for="(item, index) in [10, 11]">
        <span :key="index">{{ item }}----{{ index }}</span>
      </template>
    </button>
    <br />
    <h1>一个对象从另一个对象中找属性值</h1>
    <el-button @click="handleFind" :loading="true">查找</el-button>
    <!-- 输入框带搜索 -->
    <inputSearch />
    <!-- 输入框带建议 -->
    <inputSuggestion />
    <!-- 对象去重 -->
    <h1>对象的去重,去空</h1>
    <button @click="handleTest">去空,去重</button>
    <!-- async 测试 -->
    <h1>async wait 测试</h1>
    <button @click="handleAsync">点击测试</button>
    <!-- 动态切换class ref实现-->
    <h1 ref="waitToggle" class="default toggleAdd">
      动态切换class | isAdd:{{ addClassflag }}
      <br />
      skinColor is now: {{ changColor }}
    </h1>
    <button @click="switchSkin" class="marginLeft fontBold padding">
      切换皮肤
    </button>
    <button @click="ToggleClass" class="marginLeft fontBold padding">
      切换class
    </button>
    <button @click="addClass" class="marginLeft">添加class</button>
    <button @click="removeClass" class="marginLeft">删除class</button>
    <!-- 动态切换class and style color  数据驱动实现-->
    <h1
      ref="waitStyleChange"
      :style="{ background: styleColor, padding: '1em 0' }"
      :class="[...className]"
    >
      skinColor is now: {{ styleColor }}
    </h1>
    <button @click="changStyle" class="marginLeft fontBold padding">
      style切换
    </button>
    <button @click="changClassVal" class="marginLeft fontBold padding">
      class 数据切换
    </button>
    <!-- 对象去重 -->
    <h1>测试v-for 和 v-if 对页面渲染的影响</h1>
    <div v-for="(item, index) in configue_level" :key="index + 6">
      <span ref="vifInner" v-if="item.key === 1"
        >{{ item.key }}--outer--{{ item.value }}</span
      >
      <div v-for="(item_, index) in [11, 22, 33]" :key="index">
        <button>--inner--{{ index }}</button>
      </div>
    </div>
    <div>
      <!-- {{item.value}} -->
      <span
        ref="VforInner"
        v-for="(item, index) in configue_level"
        :key="index + 6"
        >{{ item.key }}---{{ item.value }}</span
      >
    </div>
    <button @click="tryVifAndVfor">测试渲染</button>
    <!-- 固定周期内不可触发事件 -->
    <h1>防抖debounce and 节流throttle</h1>
    <!-- 当前周期第一次触发才有效(周期内第一次触发记时开始) -->
    <span class="fontBold red padding border">{{ deSeconds }}</span>
    <!-- <button @click="handleThrottle(startCouter,10)()">节流测试</button> -->
    <button ref="testThrottle" @click="handleThrottle(startCouter, 10)()">
      节流测试
    </button>
    <!-- 事件触发间的时间间隔超过预设时间间隔delay, 方有事件触发(因每次触发,起始时间都会被初始当前时间,重新计算时间) -->
    <!-- <button @click="handleDebounce">防抖测试</button> -->
    <button @click="$message.success('暂未开放')">防抖测试</button>
    <!-- 测试svg组件 -->
    <h1 class="redBold">测试图标svg组件(未通)</h1>
    <!-- <svg-icon icon-class="plane" /> -->
    <!-- 测试lodash -->
    <h1>测试lodash</h1>
    <el-button @click="testLodash">click lodash</el-button>
    <!-- 测试插件,配合Vue.use -->
    <h1>测试插件</h1>
    <el-button @click="testPlugin">click lodash</el-button>
    <!-- 测试全局注册, 无需引入(高频使用的组件)) -->
    <h1>测试component全局注册</h1>
    <Comp1 />
    <Comp2 />
    <!-- render函数 对template的弥补-->
    <h1>render函数</h1>
    <Button :type="type" :text="text" @click="ceshiClick" />
    <!-- 精度权限控制 _自定义指令-->
    <h1>权限控制</h1>
    <div>
      <button v-display-key="10">我是权限1</button>
    </div>
    <div>
      <button v-display-key="'2'">我是权限2</button>
    </div>
    <!-- 测试编辑盒子 -->
    <EditDiv v-model="inputVal">
      <template v-slot:default="{ ceshiceshi }">
        当前父组件：{{ ceshiceshi }}
      </template>
    </EditDiv>
    <!-- <EditDiv v-model="inputVal" v-slot:test="slotProps">
         {{slotProps}}
         <template v-slot:test="slotProps">
           {{ slotProps }}
         </template>
         <span slot="test" style="color: red">test</span>
     </EditDiv> -->
    <div style="padding: 100px; border: 1px solid red">
      outer
      <div
        style="height: 300px; border: 1px solid green; padding: 50px"
        @mouseover="handleMouseover"
        @mouseenter="handleMouseenter"
      >
        inner
        <div style="height: 300px; border: 1px solid">
          innerinner
        </div>
      </div>
    </div>
    <fieldset style="text-align: left;">
      <legend>标题</legend>
      6666
    </fieldset>
    <!-- <canvas /> -->
  </div>
</template>
<script>
/**
 * v-for 不仅遍历数组 , 还可遍历对象,数字(需要变量转数字对象)
 * 遍历数字,item--依次从1到数字值大小
 * 遍历对象, item--依次为对象值,index为属性,
 * 遍历数组, item--依次为数组元素
 *
 * 一个优雅的实现前端模块化、并能按权重的优先级顺序异步加载的实现方案 --- vue的异步组件
 * 将页面核心功能（音、视频播放、文章、商品等等）打包成一个核心模块，通过框架优先加载。
 * 其他的一些周边功能打包后，通过服务器异步加载，从而解决业务需求越来越多导致的系统难维护、访问慢问题。
 */
import Vue from "vue";
import collapse from "@/components/collapse/index";
import dynamicTable from "./components/table/index";
import colHeadTable from "./components/table/colHeadTable";
import dataSelector from "./components/DateSelector/index";
// import Pagination from "./components/Pagination/pagination2.vue";
import Pagination from "./components/Pagination/index";
import searchSelect from "./components/searchSelect/index.vue";
import setGetEnable from "./components/searchSelect/setGetEnable";
// import setGetEnableSecond from "./components/searchSelect/setGetEnableSecond.vue"; // 通过$attrs $listeners 多层级传送
// import cccc from "./components/searchSelect";
import inputSearch from "./components/inputSearch/index";
import inputSuggestion from "./components/inputSuggestion/index";
import searchLayout from "./components/layout/searchLayout";
import searchInput from "@/components/searchInput/index";
import searchInput2 from "@/components/searchInput/index2";
import testComponent from "@/components/testComponent";
import EditDiv from "@/components/newTest/edit";
// import RZRJ from "@/components/vChart/index";
import stock from "@/components/eCharts/index";
// import canvas from "@/components/canvas/index";

// import router from "./plugin/index"
// Vue.use(router)
// console.log('router')
// console.log(router)
// window.this.timeDefault
// console.log('window.this.timeDefault')
// console.log(window.that)
// var that
// window.onload=function(){
//   that = window.that
// }
// setTimeout(_ => console.log('--',that = this.timeDefault, window.that), 1000)
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
// 先配标头(非叶子节点表头-没有children的对象,用不着prop)
const formHead = [
  { prop: "airQuality", label: "空气质量" },
  { prop: "level", label: "等级" },
  { prop: "state1", label: "状态1" },
  { prop: "state2", label: "状态2" },
  { prop: "name", label: "姓名" },
  {
    label: "日期",
    children: [
      { prop: "date", label: "日期" },
      {
        label: "时间",
        children: [
          { prop: "hour", label: "小时" },
          { prop: "minite", label: "分钟" },
        ],
      },
    ],
  },
  { prop: "province", label: "省份" },
  { prop: "city", label: "市区" },
  { prop: "address", label: "地址" },
  { prop: "zip", label: "邮编" },
];
//测试select 配数据
const selcet = [
  { prop: "name", label: "姓名-selcet1" },
  { prop: "time", label: "日期-selcet2" },
  { prop: "province", label: "省份-selcet6" },
  { prop: "city", label: "市区-selcet2" },
  { prop: "address", label: "地址-selcet1" },
  { prop: "zip", label: "邮编-selcet9" },
];

const tableData = [
  {
    airQuality: 1,
    level: 1,
    state1: false,
    state2: true,
    date: "2016-05-02",
    hour: "8小时",
    minite: "90分钟",
    name: "feichang",
    province: "四川",
    city: "成都",
    address: "春熙路",
    zip: 999,
  },
  {
    airQuality: 1,
    level: 2,
    state1: true,
    state2: false,
    date: "2016-05-02",
    hour: "8小时",
    minite: "90分钟",
    name: "felix",
    province: "四川",
    city: "成都",
    address: "春熙路",
    zip: 999,
  },
  {
    airQuality: 3,
    level: 3,
    state1: true,
    state2: true,
    date: "2016-05-04",
    hour: "10小时",
    minite: "30分钟",
    name: "李四",
    province: "上海",
    city: "",
    address: "上海市普陀区金沙江路 1517 弄",
    zip: 666,
  },
];
// 配置转换测试
const configue_level = [
  { key: 1, value: "一级城市" },
  { key: 2, value: "二级城市" },
  { key: 3, value: "三级城市" },
];

const configue_airQuality = [
  { key: 1, value: "优" },
  { key: 2, value: "良" },
  { key: 3, value: "差" },
];

// 第一列表头
const tableData2 = [
  { key: "单号", value: "1001" },
  { key: "商品名称", value: "篮球" },
  { key: "价格", value: "120.00" },
  { key: "订单日期", value: "2017-03-01" },
  { key: "付款方式", value: "在线支付" },
  { key: "收货地址", value: "北京市海淀区西北旺镇" },
];
const rowHeadArr = ["rowHead1", "rowHead2"];
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
    setGetEnable,
    inputSearch,
    inputSuggestion,
    searchLayout,
    searchInput,
    searchInput2,
    testComponent,
    // UploadExcel,
    // later,
    // later2,
    EditDiv,
    // RZRJ,
    stock,
    // canvas,
  },
  provide: {
    house: "有房子",
    car: "有车子",
    money: "￥10000",
  },
  data() {
    return {
      testPage: 66,
      // ipReg: /^([1-9]\d{0, 1}|1\d\d|2[0, 4]\d|25[0, 5])\.([1, 9]\d{0, 1}|1\d\d|2[0,4]\d|25[0, 5])\.([1-9]\d{0, 1}|1\d\d|2[0, 4]\d|25[0, 5])\.([1, 9]\d{0, 1}|1\d\d|2[0, 4]\d|25[0, 5])$))/
      dataFromFather: [
        {
          title: "独孤九剑",
          children: [{ title: "紫霞神功", children: [{ title: "冲灵剑法" }] }],
        },
        { title: "六脉神剑" },
        { title: "一阳指", children: [{ title: "玄铁重剑" }] },
      ],
      table_top: 320,
      type: "success",
      text: "成功",
      updateFlag: true,
      loading: true,
      syncObj: {},
      checkAdd: [
        {
          type: "_length",
          func: (obj) => {
            if (!obj.value) return true;
            return (
              obj.conditions[0] <= obj.value.length &&
              obj.value.length <= obj.conditions[1]
            );
          },
          falseMessage: "名称椒盐的长度在 2 到 10 个字符",
        },
      ],
      checkObj: {
        rules: ["_length"],
        conditions: ["2", "10"],
      },
      // that,
      pageSize: 10,
      current: 1,
      // 测试按钮配置
      btnConfigure: {
        prop: "level",
        btnStates: [
          { case: [1], btnArr: ["测试1"] },
          { case: [2, 3], btnArr: ["测试2", "测试3"] },
          { case: [4], btnArr: ["测试2", "测试4"] },
        ],
      },
      inputVal: "",
      deSeconds: 0, // 倒计时
      configue_level, // 测试v-for and v-if
      // 设置列宽(包括多级表列宽)
      fieldsWidth: {
        address: 200,
        date: 100,
        minite: 150,
      },
      className: [],
      styleColor: "switch not yet",
      changColor: "switch not yet",
      addClassflag: false,
      search: {
        start: "",
        end: "",
        name: "",
        region: "",
        date1: "",
      },
      timeDefault: [],
      rowHeadArr,
      codeToLabel: [
        { prop: "level", configue: configue_level },
        { prop: "airQuality", configue: configue_airQuality },
      ], // 转换的字段及配置对象数组
      test: {
        count: 3,
        arr: [2, 5, 9],
        obj: { n: 11, age: 31, name: "felix" },
      },
      selectConfigureSet: { name: formHead, zip: selcet }, //测试selet
      selectVal: null,
      // selectVal: '1',
      formHead, // 配置标头
      tableData,
      tableData2,
      numberReg: /^[0-9]+.?[0-9]*$/, // 输入验证
      show: false,
      fullScreen: false,
    };
  },
  methods: {
    changeFullScreen() {
      // const el = document.querySelector(`XXXX`) // 可以通过ref拿
      const el = this.$refs.fullScreenRef; // 可以通过ref拿
      console.log(el, "el---");
      this.fullScreen = !this.fullScreen;
      if (this.fullScreen) {
        el.style.position = "fixed";
        el.style.top = "0";
        el.style.left = "0";
        el.style.width = "100%";
        el.style.height = "100%";
        el.style.zIndex = "1000"; // 根据情况设定
      } else {
        el.style.position = "static";
      }
      // iframe兼容
      if (window.top !== window.self) {
        window.parent.postMessage(
          { type: this.isFullScreen ? "max" : "min" },
          "*"
        );
      }
    },
    handleMouseover() {
      console.log("Mouseover");
    },
    handleMouseenter() {
      console.log("Mouseenter");
    },
    ceshiClick() {
      console.log("ceshiClick");
    },
    testButton() {
      console.log("1111");
      // console.log()
    },
    testPlugin() {
      // this.use(router)
    },
    handleCurrentChange(val) {
      // console.log('测试pagination--')
      console.log("val===table");
      console.log(val);
    },
    setCurrent(row) {
      // this.$refs.singleTable
      // .setCurrentRow(row);
    },
    testFn() {
      // 按钮可灵活位置
      // this.$refs.formCheck
      // debugger
      const valid = this.$refs.formCheck.validate();
      // debugger
      valid && console.log("it's ok---");
    },
    handleValidate(valid) {
      // console.log("valid");
      // console.log(valid);
    },
    testLodash() {
      // 数据处理
      const num_before = "3.9";
      const num = this.$lodash.round(num_before, 0);
      // 是否为空
      const obj = { n: 3 };
      // 是否相同
      const arr1 = [{ name: "felix", in: { age: 12 } }];
      const arr2 = [{ name: "felix", in: { age: 11 }, arr: [] }];
      console.log("before-lodash-after");

      console.log(num);
      console.log((num - 1).toFixed(1));
      console.log(num_before);
      // console.log(this.$lodash.isEmpty(obj));
      // console.log(this.$lodash.isEqual(arr1, arr2));
      // const tmp = this.$lodash.cloneDeep(arr1);
      // tmp.name = "美眉";
      // console.log(tmp);
      // console.log(arr1);
      //  const fn = this.$lodash.once(_ => console.log(arr1))
      //  const fn = _ => console.log(arr1)
      // this.$lodash.throttle(_ => console.log(arr1), 1000)
      this.$lodash.pullAll(arr2, []);
    },
    pageChange(val) {
      this.current = val;
      console.log("val---");
      console.log(val);
    },
    getObj(val) {
      console.log("va---l");
      console.log(val);
    },
    ceshi(v) {
      // console.log("table-pageSize");
      // console.log(this.that);

      // // -----------测试变换数据结构通过引用间接操作数据,更新--------------------
      // const test = [];
      // this.tableData.forEach(ele => {
      //   if (ele.level === 3) {
      //     test.push(ele);
      //   }
      // });
      // for (var i = 0; i < test.length; i++) {
      //   // this.tableData[4] = test[i]
      //   // this.tableData
      //   // this.tableData.push(test[i])
      //   this.$set(this.tableData[2], "level", test[i]);
      //   // test[i].zip = 1200
      //   // test[i].minite = '666分钟'
      //   // this.$set(test[i],'zip','1000')
      // }
      // // this.$forceUpdate()
      // //  ----------------我是一条分割线[end]------------------------------------
      this.inputVal;
      this.timeDefault = ["2019-10-1", "2019-10-1"];
      // debugger
      // // this.selectVal = "三级城市";
      // this.selectVal = 3;
      // setTimeout(_ => {
      //   // this.selectVal = "二级城市";
      //   this.selectVal = 2;
      // }, 1000);
      // setTimeout(_ => {
      //   // this.selectVal = "一级城市";
      // this.selectVal = 1;
      // }, 2000);
      // //测试封装的存储
      // this.$utils.handleSave.set("try", "this time may ok-session");
      // this.$utils.handleSave.set(
      //   "try",
      //   "this time may ok-localStorage",
      //   "localStorage"
      // );
      // console.log("get---");
      // console.log(this.$utils.handleSave.get("try"));
      // console.log(this.$utils.handleSave.get("try", "localStorage"));
    },
    // 节流
    handleThrottle(fn, delay) {
      // 启动验证
      // (function phoneValidate(fn = startCouter, delay = 10) {
      console.log("this---");
      console.log(this);
      // 记录上一次函数触发的时间
      var lastTime = 0;
      return function() {
        // 记录当前函数触发的时间
        var nowTime = Date.now();
        if (nowTime - lastTime > delay) {
          fn();
          // 同步时间, 重新计算
          lastTime = nowTime;
          console.log("lastTime");
          console.log(lastTime);
        }
      };
      // })()
    },
    // 验证倒计时
    startCouter() {
      // 预定时间
      var now = Date.now();
      var endTime = now + 10 * 1000;
      var endDate = new Date(endTime);
      var end = endDate.getTime();
      var _this = this;
      (function countTime() {
        now = Date.now();
        //时间差
        var leftTime = end - now;
        var s;
        if (leftTime >= 0) {
          s = Math.ceil(leftTime / 1000);
          _this.deSeconds = s;

          // var value = document.getElementById("_s").value*1;
          // var type_of = typeof value
          // console.log(value*1,type_of);
        } else {
          // document.getElementById("_s").value = '重新获取验证码';
          _this.deSeconds = "重新获取验证码";

          // var type_of = typeof document.getElementById("_s").value
          // console.log(type_of);

          clearTimeout(timeId);
        }
        //递归每秒调用countTime方法，显示动态时间效果
        let timeId = setTimeout(countTime, 1000);
      })();
    },
    // 防抖
    handleDebounce() {},
    tryVifAndVfor() {
      console.log("this.$refs.vifInner.length");
      console.log(this.$refs.vifInner.length);
      // this.$refs.vforInner
    },
    changClassVal() {
      const waitSelectClasses = ["skin1", "skin2", "skin3"];
      const skinsMap = {
        skin1: "lawngreen",
        skin2: "lightseagreen",
        skin3: "lightsalmon",
      };
      const others = ["border"];
      if (!this.className.length) {
        this.className.push(waitSelectClasses[0]);
        // this.className[0] = waitSelectClasses[0];
        return;
      }
      const curIndex = this.$utils.getIndex(
        waitSelectClasses,
        this.className[0]
      );
      const selectedClass =
        curIndex === waitSelectClasses.length - 1
          ? waitSelectClasses[0]
          : waitSelectClasses[curIndex + 1];
      this.className = [];
      this.className.push(selectedClass);
      // 加其他class
      curIndex + 1 === waitSelectClasses.length - 1
        ? this.className.push(others[0])
        : "";
      // 提示
      this.styleColor = skinsMap[selectedClass];
    },
    changStyle() {
      const colors = ["lawngreen", "lightseagreen", "lightsalmon"];
      if (!this.styleColor) {
        this.styleColor = colors[0];
        return;
      }
      const curIndex = this.$utils.getIndex(colors, this.styleColor);
      this.styleColor =
        curIndex === colors.length - 1 ? colors[0] : colors[curIndex + 1];
    },
    // 更换皮肤
    switchSkin() {
      const skins = ["skin1", "skin2", "skin3"];
      const skinsMap = {
        skin1: "lawngreen",
        skin2: "lightseagreen",
        skin3: "lightsalmon",
      };
      // 检测元素添加的皮肤
      // const targetClassNames = this.$utils.cleanArray(this.$refs.waitToggle.className.trim().split(" "));
      const targetClassNames = this.$refs.waitToggle.className
        .trim()
        .split(" ");
      // 删除元素中间含有skins里的的皮肤
      this.removeMiddleSkin(skins, targetClassNames);
      var curSkin = targetClassNames[targetClassNames.length - 1];
      skins.includes(curSkin) ? "" : (curSkin = skins[0]); // 不删除非皮肤的class
      const flag = this.$utils.hasClass(this.$refs.waitToggle, curSkin);
      if (flag) {
        // 获取皮肤index
        const curIndex = this.$utils.getIndex(skins, curSkin);
        this.$utils.removeClass(this.$refs.waitToggle, curSkin);
        this.$utils.addClass(
          this.$refs.waitToggle,
          (curSkin =
            curIndex === skins.length - 1 ? skins[0] : skins[curIndex + 1])
        );
      } else {
        this.$utils.addClass(this.$refs.waitToggle, curSkin);
      }
      this.changColor = skinsMap[curSkin];
    },
    removeMiddleSkin(skins, targetClassNames) {
      // 删除元素中间含有skins里的的皮肤
      skins.forEach((str) => {
        if (
          targetClassNames.includes(str) &&
          targetClassNames[targetClassNames.length - 1] !== str
        ) {
          this.$utils.removeClass(this.$refs.waitToggle, str);
        }
      });
    },
    ToggleClass() {
      this.addClassflag = this.$utils.hasClass(
        this.$refs.waitToggle,
        "toggleAdd"
      );
      this.$utils.toggleClass(this.$refs.waitToggle, "toggleAdd"); // 正反切换
      this.addClassflag = this.$utils.hasClass(
        this.$refs.waitToggle,
        "toggleAdd"
      );
    },
    addClass() {
      this.$utils.addClass(this.$refs.waitToggle, "toggleAdd");
      this.addClassflag = true;
    },
    removeClass() {
      this.$utils.removeClass(this.$refs.waitToggle, "toggleAdd");
      this.addClassflag = false;
    },
    // 异步
    handleAsync() {
      this.asyncFn().then((res) => {
        // 要有返回就得在 async function里 return
        console.log("res----");
        console.log(res);
        // res()
      });
    },
    async asyncFn() {
      // return _ => {  // return function
      // setTimeout(_ => {
      // console.log('async test -- print delay about 1 s')
      return "async test -- print delay about 1s";
      // },1000)
      // };
    },
    handleTest() {
      var objArr = [
        { id: 1, age: 18 },
        { id: 6, age: 19 },
        { id: 6, age: 66 },
        { id: 6, age: 15 },
        {},
      ];
      // const obj = {id: 1, age: 18}
      // objArr = this.noSame(objArr, "id");
      console.log("去重(合并)去空");
      console.log(objArr);
      objArr = this.$utils.uniqueObjArr(
        this.$utils.deepClone(objArr),
        "id",
        "age"
      );
      objArr = this.$utils.removeUnexpectObj(objArr, "id");
      console.log(objArr);
    },
    handleFind() {
      if (!this.updateFlag) {
        return;
      }
      this.updateFlag = false;
      setTimeout((_) => (this.updateFlag = true), 3000);
      const toObj = {
        name: "",
        height: "",
        sex: "",
      };
      const fromObj = {
        name: "auli",
        age: "18",
        hobby: "sing",
        sex: "girl",
      };
      console.log("toObj");
      console.log(toObj);
      this.$utils.copyPropVal(fromObj, toObj);
      console.log(toObj);
      // 全局loading
      //   const loadingObj = this.$loading({
      //       lock: true,
      //       text: '提交中...',
      //       spinner: 'el-icon-loading',
      //       background: 'rgba(0, 0, 0, 0.7)',
      //       // target: document.querySelector('.submit-test-dialog')
      // });
      // //后端返回结果后，结束loadingObj，即loadingObj.close();
      // loadingObj.close();
    },
    // 赋值属性值
    findPropVal(fromObj, toObj) {
      Object.keys(toObj).forEach((ele) => {
        if (ele in fromObj && fromObj[ele]) {
          toObj[ele] = fromObj[ele];
        }
      });
    },
    //动态事件
    eventTrigger(row, eventName) {
      console.log("row--eventName");
      console.log(row, eventName);
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
      if (this.show) {
        // Vue.component("later", function(resolve) {
        //   setTimeout(function() {
        //     require(["./later.vue"], resolve);
        //   }, 3000);
        // });
        // 服务器异步组件2：
        Vue.component("later2", function(resolve) {
          require(["./later2.vue"], resolve);
        });
      }
    },
  },
  watch: {
    // 有change事件就可不用监听数据
    // radioVal(val){
    //  console.log('watch-val',val)
    // }
  },
  async created() {
    this.timeDefault = ["2019-6-8", "2019-7-8"];
    // window.that = this.timeDefault
    // __this = this
    var a1 = function() {
      console.log("a1");
    };
    var a2 = function() {
      console.log("a2");
    };
    var a3 = function() {
      console.log("a3");
    };
    const result = await Promise.all([a1, a2, a3]);
    console.log("result", result);
  },
  mounted() {
    this.table_top = this.$refs.singleTable.$el.offsetTop;
    // debugger
  },
  computed: {},
};
</script>
<style lang="less" scoped>
// html * {
//   outline: 1px solid red
// }
@import "~@/common/less/mixin.less";
.marginLeft {
  margin-left: 1em;
}
.fontBold {
  font-weight: bold;
}
.red {
  color: red;
}
.padding {
  padding: 0.5em 1em;
}
/* 动态class*/
.border {
  border-radius: 10px 50%;
  border: solid 2px;
}
.default {
  background: lightgreen;
}
.toggleAdd {
  color: red;
  padding: 1em 0;
}
.skin1 {
  background: lawngreen;
}
.skin2 {
  background: lightseagreen;
}
.skin3 {
  background: #ddd;
}

.container {
  text-align: center;
  padding-bottom: 3em;
}
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
