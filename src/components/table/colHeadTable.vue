<template>
  <div style="margin-top: 2em;">
    <h1>列表头 table</h1>
    <table
      class="mailTable"
      :style="styleObject"
      v-if="s_showByRow"
      cellspacing="0"
      cellpadding="10"
    >
      <tr v-for="index in rowCount" :key="index">
        <th class="column">{{tableData[index*2-2].key}}</th>
        <td>{{tableData[index*2-2].value}}</td>
        <th class="column">{{tableData[index*2-1] !== undefined ? tableData[index*2-1].key : ''}}</th>
        <td>{{tableData[index*2-1] !== undefined ? tableData[index*2-1].value : ''}}</td>
      </tr>
    </table>

    <table class="mailTable" :style="styleObject" v-else>
      <tr v-for="index in rowCount" :key="index">
        <th class="column">{{tableData[index-1].key}}</th>
        <td>{{tableData[index-1].value}}</td>
        <th
          class="column"
        >{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].key : ''}}</th>
        <td>{{tableData[rowCount+index-1] !== undefined ? tableData[rowCount+index-1].value : ''}}</td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      styleObject: {},
      s_showByRow: true
    };
  },
  props: ["tableData", "tableStyle", "showByRow"],
  methods: {},
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
      return Math.ceil(this.tableData.length / 2);
    }
  }
};
</script>
<style scoped>
.mailTable {
  border: solid 1px lightgreen;
}
th,
td {
  border: solid 0.5px lightgreen;
}
</style>