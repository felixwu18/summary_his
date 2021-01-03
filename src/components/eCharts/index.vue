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

      <!-- 6 北上资金流向 -->
      <el-tab-pane label="资金流向" name="sixth">
        <iframePage
          :url="iframeUrl6"
          width="1050px"
          originWidth="1000px"
          height="1200px"
          originHeight="1530px"
          margin="-620px 0px 0px -300px"
          style="margin-left: 230px"
        />
      </el-tab-pane>

      <!-- 7 跟踪个股 -->
      <el-tab-pane label="个股跟踪" name="seventh">
        <iframePage
          :url="iframeUrl7"
          width="960px"
          originWidth="1000px"
          height="2000px"
          originHeight="2000px"
          margin="-400px 0px 0px -210px"
          style="margin-left: 120px"
        />
      </el-tab-pane>
      <!-- 条件选股 -->
      <el-tab-pane label="条件选股" name="eighth">
        <el-button @click="handleOpen">open music</el-button>
        <el-button @click="handleOpen">ceshi</el-button>
        <span><a href="myprotocol://H:\stock\myprotocol.reg" style="margin: 200px auto;">打开音乐</a></span>
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

import { getLatestP, getFSP, getConfigsP, getbkLatestP, getRZRQ, pushLatestFSP, getCacheFSP, setCacheData, getHistoryCashFlow,  getImediateCashFlow } from "@/api/index";

export default {
  data() {
    return {
      selectVal: "0.002594",
      // selectVal: "0.000895",
      stcokCode: "sz002594",
      iframeUrl: `http://quote.eastmoney.com/changes/stocks/${
        this.stcokCode || "sz002594"
      }.html`,
      iframeUrl2: `http://quote.eastmoney.com/concept/${
        this.stcokCode || "sz002594"
      }.html`, // 筹码分布
      iframeUrl3: `http://quote.eastmoney.com/center/hsbk.html`,
      iframeUrl4: `http://data.eastmoney.com/bkzj/hy.html`,
      iframeUrl5: 'http://data.eastmoney.com/rzrq/total.html',
      iframeUrl6: 'http://data.eastmoney.com/hsgt/index.html',
      iframeUrl7: 'http://data.eastmoney.com/zjlx/002594.html',
      tabs: {
        first: this.first,
        second: this.second,
        third: this.third,
        forth: this.forth,
        seventh: this.seventh,
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
    const configsP = (await getConfigsP()) || [];
    this.configsP = configsP;
    this.selectObj = configsP.find((row) => row.key === this.selectVal); // 初始化对象
    this.init();
  },
  mounted() {},
  methods: {
    async handleOpen() {
      // window.location.href='myprotocol://H:\\stock\\myprotocol.reg'
      //   let { data: HistoryCashFlow } = await getHistoryCashFlow({"secid": this.selectVal,});  // 时间降序
      // console.log(HistoryCashFlow, 'HistoryCashFlow')
    },
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
        let resFSP = await getFSP({ secid: this.selectVal, ndays: 5 }); // 时间降序
        let cacheFSP = await getCacheFSP({"secid": this.selectVal,});  // 时间降序
        let { data: { data: historyCashFlow } } = await getHistoryCashFlow({"secid": this.selectVal,});  // 时间降序
        // debugger
        // console.log(resFSP, 'cacheFSP=====')
        // console.log(cacheFSP, 'cacheFSP=====')
        // this.dataObj.byd = res.data;
        // this.dataObj.FSP = JSON.parse(JSON.stringify(resFSP))
        // return
        /* latestP缓存后台 限制时间延时推送 */
        if (this.isUpdate(Date.now())) {
          setTimeout(() => {
            setCacheData({
              secid: this.selectVal,
              data: res
            })
          }, 500)
        }
        /* 将三方最新5天分时价同步并缓存 */
          if (cacheFSP == '文件读取失败' || cacheFSP === '') {
            /* 限制时间推送后台 */
            if (this.isUpdate(Date.now())) {
              pushLatestFSP({
                secid: this.selectVal,
                data: resFSP
              })
            }
          } else {
            /* 缓存数据已是最新，不处理 */
            if (resFSP.slice(-1)[0].slice(0, 10) !== cacheFSP.slice(-1)[0].slice(0, 10)) { 
              resFSP = this.mergeFSP({resFSP, cacheFSP}) // 同步三方重写
              if (!resFSP) { return }
              /* 限制时间推送后台 */
              if (this.isUpdate(Date.now())) {
                /* 同步推送后台 */
                pushLatestFSP({
                  secid: this.selectVal,
                  data: resFSP
                })
              }
            } else {
              resFSP = this.mergeFSP({resFSP, cacheFSP}) // 同步三方重写
            }
          }

        // console.log(resFSP, 'resFSP---')
        /* 数据入口 */
        this.dataObj.byd = res.data;
        this.dataObj.FSP = JSON.parse(JSON.stringify(resFSP))
        this.dataObj.historyCashFlow = historyCashFlow
        debugger
        // let bkLatestP = getbkLatestP({ secid: '90.BK0711' }).then(data => {
        //   console.log(data, '---------data');
        // });
      } catch (error) {
        console.error(error);
      }
    },
    /* 限制时间更新后台  当天09:15前 16:00 后更新(数据全) 或者星期六星期天 */
    isUpdate(nowTime) {
      const year =new Date().getFullYear()
      const mounth =new Date().getMonth() + 1
      const day =new Date().getDate()
      const noUpdateStartTime = `${year}-${mounth}-${day} 09:00`
      const noUpdateEndTime = `${year}-${mounth}-${day} 13:00`
      return (nowTime < new Date(noUpdateStartTime).getTime()) || (nowTime > new Date(noUpdateEndTime).getTime()) || [6, 0].includes(new Date().getDay())
    },
    /* 同步三方分时价 */
    mergeFSP({resFSP, cacheFSP}) {
      const concatArr = cacheFSP.concat(resFSP)
      const formartTrends = [] // 二维数组，分时数据一天为一个数组
      const fsDaysCount = concatArr.length / 241
      for (let index = 0; index < fsDaysCount; index++) {
           formartTrends.push(concatArr.slice(index * 241, 241 * (index + 1)))
      }
      // const resFSP_reverse = JSON.parse(JSON.stringify(resFSP)).reverse() // 三方
      // const cacheFSP_reverse = JSON.parse(JSON.stringify(cacheFSP)).reverse() // 后台
      return this.unique(formartTrends)
    },
    /* 去重 */
    unique(arr) {
      if (!arr) { return }
      const signObj = {}
      const uniqueArr = []
      arr.forEach(item => {
        if (!signObj[item[0].slice(0, 10)]) {
          signObj[item[0].slice(0, 10)] = 1
          uniqueArr.push(...item) // 二维数组打平
        }
      })
      return uniqueArr
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
      if (['first', 'second', 'third', 'seventh'].includes(activeName)) {
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
    seventh(val) {
      // this.selectVal = val.key;
      const stcokCode = `${val.key.slice(2)}`;
      this.iframeUrl7 = `http://data.eastmoney.com/zjlx/${stcokCode}.html`;
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