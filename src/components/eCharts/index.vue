<template>
  <div style="padding-bottom: 80px; padding-top: 26px">
    <el-form inline>
      <el-form-item label="名称：" label-width="60px">
        <searchSelect
          :insert-value.sync="selectVal"
          :configure="configsP"
          @change="handleName(arguments, activeName)"
        />
      </el-form-item>
    </el-form>
    <el-tabs
      class="margin"
      v-model="activeName"
      @tab-click="handleClick(selectObj, activeName)"
    >
      <!-- 1 即时价格跟踪 -->
      <el-tab-pane label="个股boll" name="first">
        <!-- <p>比亚迪</p> -->
        <!-- 为了方便页面搜索关键字 -->
        <div class="main" style="width: 90%; height: 400px" />
        <!-- <p>比亚迪</p> -->
        <div class="main" style="width: 90%; height: 400px" />
        <div class="main" style="width: 90%; height: 400px" />
        <div class="main" style="width: 90%; height: 400px" />
        <div class="main" style="width: 90%; height: 400px" />
        <div class="main" style="width: 90%; height: 400px" />
      </el-tab-pane>

      <!-- 2 个股异动 -->
      <el-tab-pane label="异动" name="second">
        <iframePage
          :url="iframeUrl"
          width="1060px"
          originWidth="1000px"
          height="1500px"
          originHeight="1850px"
          margin="-400px 0px 0px 20px"
          style="margin-left: 120px"
        />
      </el-tab-pane>

      <!-- 3 筹码，及个股k线 -->
      <el-tab-pane label="筹码" name="third">
        <iframePage
          :url="iframeUrl2"
          width="1500px"
          originWidth="1300px"
          height="1500px"
          originHeight="1600px"
          margin="-400px 0px 0px -800px"
          style="margin-left: 150px"
        />
      </el-tab-pane>

      <!-- 4 版块走势 -->
      <el-tab-pane label="版块" name="forth">
        <!-- 版块涨跌情况 -->
        <iframePage
          :url="iframeUrl3"
          width="1050px"
          originWidth="1200px"
          height="1150px"
          originHeight="1430px"
          margin="-400px 0px 0px -210px"
          style="margin-left: 120px"
        />
        <!-- 版块资金流向 -->
        <iframePage
          :url="iframeUrl4"
          width="930px"
          originWidth="1130px"
          height="2000px"
          originHeight="2250px"
          margin="-540px 0px 0px -210px"
          style="margin-left: 120px"
        />
      </el-tab-pane>

      <!-- 5 两融余额 -->
      <el-tab-pane label="两融余额" name="fifth">
        <div class="main" style="width: 1350px; height: 400px" />
        <iframePage
          :url="iframeUrl5"
          width="1050px"
          originWidth="1000px"
          height="1200"
          originHeight="1430px"
          margin="-510px 0px 0px -300px"
          style="margin-left: 120px"
        />
      </el-tab-pane>

      <!-- 跟踪个股 -->
      <el-tab-pane label="个股跟踪" name="sixth">
        <iframePage
          :url="iframeUrl6"
          width="960px"
          originWidth="1000px"
          height="2000px"
          originHeight="2000px"
          margin="-400px 0px 0px -210px"
          style="margin-left: 120px"
        />
      </el-tab-pane>
      <!-- 条件选股 -->
      <el-tab-pane label="条件选股" name="seventh">
        <form-table @handle-detail="handleDetail" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
var echarts = require("echarts");
import std from "@/mixins/std";
import priceData from "@/mixins/data/priceData";
import searchSelect from "@/components/searchSelect/index";
import iframePage from "@/components/iframePage/index";
import FormTable from "./components/FormTable";

import { getLatestP, getConfigsP, getbkLatestP, getRZRQ } from "@/api/index";

export default {
  data() {
    return {
      selectVal: "0.002594",
      stcokCode: "sz002594",
      iframeUrl: `http://quote.eastmoney.com/changes/stocks/${
        this.stcokCode || "sz002594"
      }.html`,
      iframeUrl2: `http://quote.eastmoney.com/concept/${
        this.stcokCode || "sz002594"
      }.html`,
      // iframeUrl3: `http://quote.eastmoney.com/concept/${this.stcokCode || 'sz002594'}.html`,
      iframeUrl3: `http://quote.eastmoney.com/center/hsbk.html`,
      iframeUrl4: `http://data.eastmoney.com/bkzj/hy.html`,
      iframeUrl5: 'http://data.eastmoney.com/rzrq/total.html',
      iframeUrl6: 'http://data.eastmoney.com/zjlx/002594.html',
      tabs: {
        first: this.first,
        second: this.second,
        third: this.third,
        forth: this.forth,
        sixth: this.sixth,
      },
      selectObj: {},
      configsP: [
        { key: "1", value: "一级城市" },
        { key: "2", value: "二级城市" },
        { key: "3", value: "三级城市" },
      ],
      myCharts: {},
      activeName: "first",
    };
  },
  mixins: [std, priceData],
  async created() {
    /* 下拉配置 */
    const { configsP } = (await getConfigsP()) || [];
    this.configsP = configsP;
    this.selectObj = configsP.find((row) => row.key === this.selectVal); // 初始化对象
    this.init();
  },
  mounted() {},
  methods: {
    async init() {
      /* 获取数据 */
      await this.getData();
      this.mixinInit();
      var boxes = document.getElementsByClassName("main");
      boxes = Array.prototype.slice.apply(boxes); // 或者 Array.from(boxes) 对象转数组
      boxes.forEach((box, index) => {
        // var eval(`myChart${index}`)
        this.myCharts[`myChart${index}`] = echarts.init(box); // 动态变量不行， 转对象属性
      });
    },
    async getData() {
      try {
        /* 图表数据 */
        let res = await getLatestP({ secid: this.selectVal });
        this.dataObj.byd = res.data;
        // let bkLatestP = getbkLatestP({ secid: '90.BK0711' }).then(data => {
        //   console.log(data, '---------data');
        // });
      } catch (error) {
        console.error(error);
      }
    },
    /* 下拉切换 */
    handleName(val, activeName) {
      val = this.toArr(val);
      this.selectObj = val; // 更新下拉选择的对象
      this.selectVal = val.key;
      this.tabs[activeName](val);
    },
    /* 选项卡切换 */
    handleClick(val, activeName) {
      if (['first', 'second', 'third', 'sixth'].includes(activeName)) {
        this.tabs[activeName](val);
      }
      activeName === "fifth" && this.triggerRZRQ();
    },
    /* 融资融券触发 */
    async triggerRZRQ() {
      // if(this.dataObj.rzrq.data) { return }
      const {data} = await getRZRQ();
      this.dataObj.rzrq.data = data
      this.rzrqInit(120)
      // this.dataObj.rzrq
    },
    /* 即使价格，及boll技术指标 */
    first(val) {
      // val = this.toArr(val);
      // this.selectVal = val.key;
      this.init();
    },
    /* 个股异动情况 */
    second(val) {
      // val = this.toArr(val);
      // this.selectVal = val.key;
      this.stcokCode = `${val.marketT}${val.key.slice(2)}`;
      this.iframeUrl = `http://quote.eastmoney.com/changes/stocks/${this.stcokCode}.html`;
    },
    /* 筹码分布 */
    third(val) {
      // this.selectVal = val.key;
      this.stcokCode = `${val.marketT}${val.key.slice(2)}`;
      this.iframeUrl2 = `http://quote.eastmoney.com/concept/${this.stcokCode}.html`;
    },
    /* 版块情况更新 */
    third(val) {
      this.iframeUrl3 = `http://quote.eastmoney.com/center/hsbk.html`;
    },
    sixth(val) {
      // this.selectVal = val.key;
      const stcokCode = `${val.key.slice(2)}`;
      this.iframeUrl6 = `http://data.eastmoney.com/zjlx/${stcokCode}.html`;
    },
    toArr(val) {
      return Array.from(val)[0];
    },
    handleDetail(row) {
      console.log(row)
    }
  },
  components: {
    searchSelect,
    iframePage,
    FormTable
  },
  computed: {
    // test() {
    //   this.selectVal
    //   console.log(this.selectVal, '-----父级父级this.selectVal');
    // }
  },
};
</script>
<style scoped>
div {
  margin-bottom: 15px;
}
p {
  text-align: left;
}
</style>