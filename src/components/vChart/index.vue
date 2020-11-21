<template>
  <div>
    <div id="main" style="width: 90%;height:400px;"></div>
    <button>我是comp1</button>
  </div>
</template>
<script src="./module/echarts.min.js"></script>
<script>
 require('./module/echarts.min.js')
  // 2 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.getElementById('main'));
  
  // 3 指定图表的配置项和数据
  option = {
      title: {
          text: '融资融券'
      },
      tooltip : {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: 'red'
              }
          }
      },
      legend: {
          data:['融资','融券', '劵资比']
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '30%',
          containLabel: true
      },
      xAxis : [
          {
              type : 'category',
              boundaryGap : false,
              data : ['周一','周二','周三','周四','周五','周六','周日']
          }
      ],
      yAxis : [
          {
              type : 'value'
          }
      ],
      series : [
          {
              name:'融资',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[120, 132, 101, 134, 90, 230, 210]
          },
          {
              name:'劵资比',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[150, 232, 201, 154, 190, 330, 410]
          },
          {
              name:'融券',
              type:'line',
              stack: '总量',
              areaStyle: {normal: {}},
              data:[220, 182, 191, 234, 290, 330, 310]
          },
      ]
  };    // 4 使用刚指定的配置项和数据显示图表。
    
  myChart.setOption(option);
  //继续更新
  setInterval(()=>{
      console.log(option.series[0].data.length)
      
      for(var i;i<option.series[0].data.length;i++){
          alert('ok')
          console.log(option.series[0].data.length)
          option.series[0].data[i] = Math.random()*100;
    }
    myChart.setOption(option);
  },2000)

export default {
  name: 'comp1',
  data() {
    return {
    };
  },
  methods: {},
  components: {},
  created() {      
  },
  mounted() {},
  computed: {}
};
</script>
<style scoped>
</style>