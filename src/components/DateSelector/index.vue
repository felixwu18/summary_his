<template>
  <div>
    <h1>日期</h1>
    <el-date-picker
      v-model="time"
      @change="monitorTime(time)"
      value-format="yyyy-MM-dd"
      type="daterange"
      range-separator="至"
      start-placeholder="开始日期"
      end-placeholder="结束日期"
      size="medium"
    ></el-date-picker>
  </div>
</template>
<script>
export default {
  name: "toDateSelector",
  data() {
    return {
      time: [], 
      start: "",
      end: ""
    };
  },
  // props: ["timeDefault"],
  props: {timeDefault: {type: Array, default: _ => []}},
  created(){
    // this.time = ["2019-6-8", "2019-7-8"]
  },
  methods: {
    monitorTime(time) {
      if (time) {
        this.start = time[0];
        this.end = time[1];
      } else {
        this.start = "";
        this.end = "";
      }
      // console.log('monitorTime', this.start);
      this.$emit("update:start", this.start);
      this.$emit("update:end", this.end);
    },
    clearData() {
      this.time = [];
      this.start = "";
      this.end = "";
    }
  },
  watch: {
    timeDefault(newValue, oldValue) {
      // console.log('timeDefault change', newValue, oldValue);
      // this.time = newValue;
      this.time = this.timeDefault
    }
  }
};
</script>
<style scoped>
.el-range-editor--medium {
  width: 260px;
}
</style>