<template>
  <div class="columnTable">
    <h1>列表头 table (calc计算过)</h1>
    <!-- 仅带行表头 -->
    <table
      class="mailTable"
      :style="styleObject"
      v-if="s_showByRow"
      cellspacing="0"
      cellpadding="10"
    >
      <tr v-for="index in rowCount" :key="index">
        <th class="columnHead">{{getColHead(index) !== undefined ? getColHead(index) : ''}}</th>
        <td class="cell">{{getCellVal(index) !== undefined ? getCellVal(index) : ''}}</td>
      </tr>
    </table>
   <!-- 带列表头 -->
    <table class="mailTable" :style="styleObject" v-else>
      <tr>
        <th
          v-for="(rowHead, index) in rowHeadArr"
          :key="index"
          class="rowHead"
        >{{rowHead !== undefined ? rowHead : '-'}}</th>
      </tr>
      <tr v-for="index in rowCount" :key="index">
        <th class="columnHead">{{getColHead(index) !== undefined ? getColHead(index) : '-'}}</th>
        <td class="cell">{{getCellVal(index) !== undefined ? getCellVal(index) : '-'}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      styleObject: {},
      s_showByRow: false
    };
  },
  props: ["tableData", "tableStyle", "showByRow", "rowHeadArr"],
  methods: {
    // 获取属性, params 标识属性--值
    getProp(obj = {}, params) {
      if (params === "key") {
        return Object.keys(obj)[0];
      }
      if (params == "value") {
        return Object.keys(obj)[1];
      }
    },
    // 暂时未实现
    getColHead(index = 1) {
      return this.tableData[index - 1][
        this.getProp(this.tableData[index - 1], "key")
      ];
    },
    getCellVal(index = 1) {
      return this.tableData[index - 1][
        this.getProp(this.tableData[index - 1], "value")
      ];
    }
  },
  components: {},
  created() {
    this.styleObject = this.tableStyle;
    if (this.showByRow !== undefined) {
      this.s_showByRow = this.showByRow;
    }
  },
  mounted() {},
  computed: {
    rowCount: function() {
      // return Math.ceil(this.tableData.length / 2);
      return this.tableData.length;
    }
  }
};
</script>
<style scoped>
/* 控制列标题样式 */
/* .rowHead{
  color: purple;
} */
/* .columnHead{
  color: red;
} */
/* .cell{
  background: yellowgreen
} */
.columnTable{
 margin-top: 2em;
}
.mailTable {
  border: solid 1px lightgreen;
  /* 运算符合两边需要 */
  height:  calc(100vh - 500px - 30px);
}
th,
td {
  border: solid 1px lightgreen;
}
</style>