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
    <el-tabs class="margin" v-model="activeName" @tab-click="handleClick(selectObj, activeName)">
      <!-- 1 即时价格跟踪 -->
      <el-tab-pane label="boll" name="first">
        <!-- <p>比亚迪</p> -->
        <!-- 为了方便页面搜索关键字 -->
        <div class="main" style="width: 90%; height: 400px" />
        <!-- <p>比亚迪</p> -->
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
          height="1300px"
          originHeight="1600px"
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

      <!-- 4 个股k线，及筹码 -->
      <!-- <el-tab-pane label="筹码" name="third">
        <iframePage
          :url="iframeUrl3"
          width="1060px"
          originWidth="1000px"
          height="1300px"
          originHeight="1600px"
          margin="-400px 0px 0px 20px"
          style="margin-left: 120px"
        />
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>
<script>
var echarts = require("echarts");
import std from "@/mixins/std";
import priceData from "@/mixins/data/priceData";
import searchSelect from "@/components/searchSelect/index";
import iframePage from "@/components/iframePage/index";

import { getLatestP, getConfigsP } from "@/api/index";

export default {
  data() {
    return {
      selectVal: "0.002594",
      stcokCode: 'sz002594',
      iframeUrl: `http://quote.eastmoney.com/changes/stocks/${this.stcokCode || 'sz002594'}.html`,
      iframeUrl2: `http://quote.eastmoney.com/concept/${this.stcokCode || 'sz002594'}.html`,
      // iframeUrl3: `http://quote.eastmoney.com/concept/${this.stcokCode || 'sz002594'}.html`,
      tabs: {
        first: this.first,
        second: this.second,
        third: this.third,
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

      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      // this.myCharts.myChart0.setOption({
        //   title: {
          //     text: "ECharts 入门示例",
      //   },
      //   tooltip: {},
      //   xAxis: {
        //     data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      //   },
      //   yAxis: {},
      //   series: [
        //     {
          //       name: "销量",
      //       type: "bar",
      //       data: [5, 20, 36, 10, 10, 20],
      //     },
      //   ],
      // });

      // this.$nextTick(() => {
        // });
    },
    async getData() {
      /* 图表数据 */
      let res = await getLatestP({ secid: this.selectVal });
      this.dataObj.byd = res.data;
    },
    /* 下拉切换 */
    handleName(val, activeName) {
      val = this.toArr(val)
      this.selectObj = val // 更新下拉选择的对象
      this.selectVal = val.key;
      this.tabs[activeName](val);
    },
    /* 选项卡切换 */
    handleClick(val, activeName) {
      this.tabs[activeName](val);
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
      this.iframeUrl = `http://quote.eastmoney.com/changes/stocks/${this.stcokCode}.html`
    },
    /* 筹码分布 */
    third(val) {
      // this.selectVal = val.key;
      this.stcokCode = `${val.marketT}${val.key.slice(2)}`;
      this.iframeUrl2 = `http://quote.eastmoney.com/concept/${this.stcokCode}.html`
    },
    toArr(val) {
      return Array.from(val)[0];
    },
  },
  components: {
    searchSelect,
    iframePage,
  },
  async created() {
    /* 下拉配置 */
    const { configsP } = (await getConfigsP()) || [];
    this.configsP = configsP;
    this.selectObj = configsP.find(row => row.key === this.selectVal) // 初始化对象
    this.init();
  },
  mounted() {
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