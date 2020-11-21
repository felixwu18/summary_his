<template>
  <div style="padding-bottom: 80px; padding-top: 26px">
    <el-form inline>
      <el-form-item label="名称：" label-width="60px">
        <searchSelect
          :insertValue.sync="selectVal"
          :configure="configue_level"
          @change="handleName"
        />
      </el-form-item>
    </el-form>

    <label>比亚迪</label>
    <!-- 为了方便页面搜索关键字 -->
    <div class="main" style="width: 90%; height: 400px">比亚迪</div>
    <label>比亚迪</label>
    <div class="main" style="width: 90%; height: 400px">比亚迪</div>
  </div>
</template>
<script>
var echarts = require("echarts");
import std from "@/mixins/std";
import priceData from "@/mixins/data/priceData";
import searchSelect from "@/components/searchSelect/index";

export default {
  data() {
    return {
      selectVal: "",
      configue_level: [
        { key: '1', value: "一级城市" },
        { key: '2', value: "二级城市" },
        { key: '3', value: "三级城市" },
      ],
      myCharts: {},
      option: {
        // 3 指定图表的配置项和数据
        title: {
          text: "布林上轨",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "30%",
          containLabel: true,
        },

        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "red",
            },
          },
        },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            name: "布林上轨",
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
          },
        ],
      },
    };
  },
  mixins: [std, priceData],
  methods: {
    init() {
      var boxes = document.getElementsByClassName("main");
      boxes = Array.prototype.slice.apply(boxes); // 或者 Array.from(boxes) 对象转数组
      boxes.forEach((box, index) => {
        // var eval(`myChart${index}`)
        this.myCharts[`myChart${index}`] = echarts.init(box); // 动态变量不行， 转对象属性
      });

      // 基于准备好的dom，初始化echarts实例
      // 绘制图表
      this.myCharts.myChart0.setOption({
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      });

      // this.$nextTick(() => {
      // });
    },
    handleName(val) {
      console.log(val);
    },
  },
  components: {
    searchSelect,
  },
  created() {},
  mounted() {
    this.init();
  },
  computed: {},
};
</script>
<style scoped>
div {
  margin-bottom: 15px;
}
</style>