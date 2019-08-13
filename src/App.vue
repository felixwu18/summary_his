<template>
  <div class="container">
    <div>
      <h1>异步组件测试</h1>点击按钮后
      第一个延迟300毫秒，从服务器加载
      第二个不延迟从服务器加载
      <template v-if="show">
        <later></later>
        <later2></later2>
      </template>
      <button @click="toggle" :class="{classSelectorA: show,classSelectorB: !show}">加载</button>
    </div>

    <collapse />
    <dynamicTable
      :formHead="formHead"
      :configureSet="configureSet"
      :data="tableData"
      :editArr="['name','zip', 'province']"
      :selectArr="['name','zip']"
      :RegObj="{zip:numberReg}"
      :handleArr="['查看','新增','删除','审核','点我啊','果然']"
      :codeToLabel="codeToLabel"
      :fieldsWidth="fieldsWidth"
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

    <!-- 列标头 通过外层div样式控制布局-->
    <div style="width:50%">
      <colHeadTable
        :tableData="tableData2"
        :rowHeadArr="rowHeadArr"
        :tableStyle="{ width:'80%',margin:'0 auto' }"
      />
    </div>
    <!-- 时间组件 -->
    <dataSelector :timeDefault="timeDefault" :start.sync="search.start" :end.sync="search.end" />
    <!-- 分页器 -->
    <Pagination :total="30" />
    <!-- 选择器 -->
    <searchSelect title="选择器" :insertValue.sync="selectVal" :configure="formHead" />
    {{selectVal}}
    <button @click="ceshi">ceshi</button>
    <!-- 上传组件 -->
    <!-- <UploadExcel /> -->
    <!-- 测试v-for -->
    <h1>测试v-for</h1>
    <!-- <label for>count:</label>
    <button v-for="(item,index) in test.count" :key="index">{{item}}--{{index}}</button>
    <br />-->
    <label for>obj:</label>
    <button v-for="(item,index) in test.obj" :key="index">{{item}}--{{index}}</button>
    <br />
    <label for>arr:</label>
    <button v-for="(item,index) in test.arr" :key="index">{{item}}-{{index}}</button>
    <br />
    <h1>一个对象从另一个对象中找属性值</h1>
    <button @click="handleFind">查找</button>
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
      动态切换class | isAdd:{{addClassflag}}
      <br />
      skinColor is now: {{changColor}}
    </h1>
    <button @click="switchSkin" class="marginLeft fontBold padding">切换皮肤</button>
    <button @click="ToggleClass" class="marginLeft fontBold padding">切换class</button>
    <button @click="addClass" class="marginLeft">添加class</button>
    <button @click="removeClass" class="marginLeft">删除class</button>
    <!-- 动态切换class and style color  数据驱动实现-->
    <h1
      ref="waitStyleChange"
      :style="{background: styleColor, padding: '1em 0'}"
      :class="[...className]"
    >skinColor is now: {{styleColor}}</h1>
    <button @click="changStyle" class="marginLeft fontBold padding">style切换</button>
    <button @click="changClassVal" class="marginLeft fontBold padding">class 数据切换</button>
    <!-- 对象去重 -->
    <h1>测试v-for 和 v-if 对页面渲染的影响</h1>
    <div v-for="(item, index) in configue_level" :key="index+6">
      <span ref="vifInner" v-if="item.key === 1">{{item.key}}---{{item.value}}</span>
    </div>
    <div>
      <!-- {{item.value}} -->
      <span ref="VforInner" v-for="(item, index) in configue_level" :key="index+6" >{{item.key}}---{{item.value}}</span>
    </div>
    <button @click="tryVifAndVfor">测试渲染</button>
    <!-- 固定周期内不可触发事件 -->
    <h1>防抖debounce and 节流throttle</h1>
    <!-- 当前周期第一次触发才有效(周期内第一次触发记时开始) -->
    <span class="fontBold red padding border">{{deSeconds}}</span>
    <!-- <button @click="handleThrottle(startCouter,10)()">节流测试</button> -->
    <button ref="testThrottle" @click="handleThrottle(startCouter,10)()" >节流测试</button>
    <!-- 事件触发间的时间间隔超过预设时间间隔delay, 方有事件触发(因每次触发,起始时间都会被初始当前时间,重新计算时间) -->
    <!-- <button @click="handleDebounce">防抖测试</button> -->
    <button @click="$message.success('暂未开放')">防抖测试</button>
  </div>
</template>
<script>
/**
 * v-for 不仅遍历数组, 还可遍历对象,数字(需要变量转数字对象)
 * 遍历数字,item--依次从1到数字值大小
 * 遍历对象, item--依次为对象值,index为属性,
 * 遍历数组, item--依次为数组元素
 *
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
import inputSearch from "./components/inputSearch/index";
import inputSuggestion from "./components/inputSuggestion/index";

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
  { prop: "name", label: "姓名" },
  {
    label: "日期",
    children: [
      { prop: "date", label: "日期" },
      {
        label: "时间",
        children: [
          { prop: "hour", label: "小时" },
          { prop: "minite", label: "分钟" }
        ]
      }
    ]
  },
  { prop: "province", label: "省份" },
  { prop: "city", label: "市区" },
  { prop: "address", label: "地址" },
  { prop: "zip", label: "邮编" }
];
//测试select 配数据
const selcet = [
  { prop: "name", label: "姓名-selcet" },
  { prop: "time", label: "日期-selcet" },
  { prop: "province", label: "省份-selcet" },
  { prop: "city", label: "市区-selcet" },
  { prop: "address", label: "地址-selcet" },
  { prop: "zip", label: "邮编-selcet" }
];

const tableData = [
  {
    airQuality: 1,
    level: 1,
    date: "2016-05-02",
    hour: "8小时",
    minite: "90分钟",
    name: "feichang",
    province: "四川",
    city: "成都",
    address: "春熙路",
    zip: 999
  },
  {
    airQuality: 1,
    level: 1,
    date: "2016-05-02",
    hour: "8小时",
    minite: "90分钟",
    name: "felix",
    province: "四川",
    city: "成都",
    address: "春熙路",
    zip: 999
  },
  {
    airQuality: 3,
    level: 3,
    date: "2016-05-04",
    hour: "10小时",
    minite: "30分钟",
    name: "李四",
    province: "上海",
    city: "",
    address: "上海市普陀区金沙江路 1517 弄",
    zip: 666
  }
];
// 配置转换测试
const configue_level = [
  { key: 1, value: "一级城市" },
  { key: 2, value: "二级城市" },
  { key: 3, value: "三级城市" }
];
const configue_airQuality = [
  { key: 1, value: "优" },
  { key: 2, value: "良" },
  { key: 3, value: "差" }
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
    inputSearch,
    inputSuggestion,
    // UploadExcel,
    later,
    later2
  },
  data() {
    return {
      deSeconds: 0, // 倒计时
      configue_level, // 测试v-for and v-if
      // 设置列宽(包括多级表列宽)
      fieldsWidth: {
        address: 200,
        date: 100,
        minite: 150
      },
      className: [],
      styleColor: "switch not yet",
      changColor: "switch not yet",
      addClassflag: false,
      search: {
        start: "",
        end: ""
      },
      timeDefault: [],
      rowHeadArr,
      codeToLabel: [
        { prop: "level", configue: configue_level },
        { prop: "airQuality", configue: configue_airQuality }
      ], // 转换的字段及配置对象数组
      test: {
        count: 3,
        arr: [2, 5, 9],
        obj: { n: 11, age: 31, name: "felix" }
      },
      configureSet: { name: formHead, zip: selcet }, //测试selet
      selectVal: "",
      formHead, // 配置标头
      tableData,
      tableData2,
      numberReg: /^[0-9]+.?[0-9]*$/, // 输入验证
      show: false
    };
  },
  methods: {
    ceshi() {
      this.timeDefault = ["2019-6-8", "2019-7-8"];
      this.selectVal = "zip";

      setTimeout(_ => {
        this.selectVal = "date";
      }, 1000);
      setTimeout(_ => {
        this.selectVal = "address";
      }, 2000);
      this.$utils.handleSave.set("try", "this time may ok-session");
      this.$utils.handleSave.set(
        "try",
        "this time may ok-localStorage",
        "localStorage"
      );
      console.log("get---");
      console.log(this.$utils.handleSave.get("try"));
      console.log(this.$utils.handleSave.get("try", "localStorage"));
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
          // debugger
          fn();
          // 同步时间, 重新计算
          lastTime = nowTime;
          console.log('lastTime')
          console.log(lastTime)
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
        skin3: "lightsalmon"
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
        skin3: "lightsalmon"
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
      skins.forEach(str => {
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
      this.asyncFn().then(res => {
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
        {}
      ];
      // const obj = {id: 1, age: 18}
      // objArr = this.noSame(objArr, "id");
      console.log("去重");
      console.log(objArr);
      objArr = this.$utils.uniqueObjArr(objArr, "id");
      objArr = this.$utils.removeUnexpectObj(objArr, "id");
      console.log(objArr);
    },
    handleFind() {
      const toObj = {
        name: "",
        height: "",
        sex: ""
      };
      const fromObj = {
        name: "auli",
        age: "18",
        hobby: "sing",
        sex: "girl"
      };
      console.log("toObj");
      console.log(toObj);
      this.$utils.copyPropVal(fromObj, toObj);
      console.log(toObj);
    },
    // 赋值属性值
    findPropVal(fromObj, toObj) {
      Object.keys(toObj).forEach(ele => {
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
<style lang="less" scoped>
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
  background: lightsalmon;
}

.classSelectorA {
  padding: 0.5em 2em;
  background: lightgreen;
}
.classSelectorB {
  padding: 0.5em 2em;
  background: lightblue;
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
<style lang="less">
// @import "../common/less/mixin.less";
</style>