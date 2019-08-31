<template>
  <div>
    <h1>collapse</h1>
    <el-collapse
      ref="collapse"
      v-model="activeNames"
      v-for="(item, index) in tableDatas"
      class="colapse"
      :key="index"
      :name="index"
      @change="collapseChange"
    >
      <el-collapse-item :title="item[0].name" :name="index">
        <el-select v-model="item[0].name" placeholder="请选择活动区域" clearable>
          <el-option label="供货商1" value="供货商1"></el-option>
          <el-option label="供货商2" value="供货商2"></el-option>
        </el-select>
        <dynamicTable :data="tableData" />
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import dynamicTable from "../table/index";

const tableData = [
  {
    date: "2016-05-02",
    name: "张三",
    province: "四川",
    city: "成都",
    address: "春熙路",
    zip: 999
  },
  {
    date: "2016-05-04",
    name: "李四",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1517 弄",
    zip: 666
  }
];
const tableData2 = [
  {
    date: "2016-05-02",
    name: "飞云无名",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1518 弄",
    zip: 200332
  },
  {
    date: "2016-05-04",
    name: "无极而生",
    province: "上海",
    city: "普陀区",
    address: "上海市普陀区金沙江路 1517 弄",
    zip: 200333
  }
];

export default {
  data() {
    return {
      radio: "",
      activeNames: [],
      tableData,
      tableDatas: [tableData, tableData2]
    };
  },
  props: {},
  methods: {
    collapseChange(val) {
      console.log(val);
    }
  },
  components: {
    dynamicTable
  },
  created() {
    this.activeNames = 0; // 将折叠版容器value与callapse-item的name值保持一样,可默认展开所有
  },
  mounted() {
    this.$refs.collapse
    // debugger
    console.log('this.$refs.collapse')
    console.log(this.$refs.collapse)
  },
  computed: {}
};
</script>
<style scoped>
</style>