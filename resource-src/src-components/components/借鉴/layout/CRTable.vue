<template>
  <div>
    <el-table
      border
      @selection-change="handleSelectionChange"
      :data="tableData"
      tooltip-effect="dark"
      :header-cell-style="headerCellStyle"
      :cell-style="cellStyle"
      v-loading='loading'
    >
      <slot></slot>
    </el-table>
  </div>
</template>


<script>
export default {
  name: "MonthStatistics",
  data() {
    return {};
  },
  props: {
    tableData: { type: Array },
    headerCellStyle: {
      type: Object,
      default: () => ({
        "text-align": "center",
        'background': "#F4F8FB",
        "font-weight": "500",
        "font-size": ".9em",
        "color":"black"
      })
    },
    cellStyle: {
      type: Object,
      default: () => ({
        "text-align": "center",
        "font-size": ".85em",
        'padding': ".2em"
      })
    },
    loading: {
      type: Boolean,
      default: false
    },
    handleSelectionChange: {type: Function, default: () => {}
    }
  }
};
</script >
