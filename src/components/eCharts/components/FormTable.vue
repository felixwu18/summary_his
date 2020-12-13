<template>
  <div class="wrap">
    <!-- 条件 -->
    <el-row>
      <el-col :span="12">
        <el-form label-width="83px" inline>
          <el-form-item label="股票名称：">
            <el-input type="text" v-model.trim="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="活动时间：">
            <el-date-picker
              type="date"
              placeholder="选择日期"
              v-model="form.date1"
              style="width: 100%"
            />
          </el-form-item>
          <el-form-item label="版块：" label-width="115px">
            <el-select v-model="form.region" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="特殊资源：">
            <el-radio-group v-model="form.resource">
              <el-radio label="线上品牌商赞助"></el-radio>
              <el-radio label="线下场地免费"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item>
            <el-button size="small" @click="handleQuery">重置</el-button>
            <el-button size="small" type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" class="xt-select">
           <el-button size="small" type="primary" @click="handleQuery">上升三法</el-button>      
      </el-col>
    </el-row>
    <!-- 表格 -->
    <div style="margin:0 50px 0;">
      <el-table :data="tableData" border stripe>
        <el-table-column type="index" label="序号" width="50" />
        <el-table-column prop="key" label="编码"> </el-table-column>
        <el-table-column prop="value" label="股票名称"> </el-table-column>
        <el-table-column prop="region" label="版块"> </el-table-column>
        <el-table-column prop="pym" label="拼音码"> </el-table-column>
        <el-table-column prop="marketT" label="市场类别"> </el-table-column>
        <el-table-column label="操作" width="100px">
          <template slot-scope="scope">
              <el-button size="small" type="text" @click="toDetail(scope.row)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import { getConfigsP } from "@/api/index";

export default {
  name: "FormTable",
  props: {

  },
  data() {
    return {
      form: {},
      tableData: [],
    };
  },
  methods: {
    handleQuery() {
       getConfigsP()
          .then(res => {
             this.tableData = res.configsP
          })
          .catch(err => {
             console.error(err)
          })
    },
    toDetail(row) {
      this.$emit('handle-detail', row)
    },
  },
  components: {},
  created() {},
  mounted() {},
  computed: {},
};
</script>
<style scoped>
 .wrap /deep/ .el-input__inner {
  width: 225px;
}
.xt-select {
  border-left: 1px solid;
  height: 180px;
  text-align: left;
  padding: 0 10px 0;
}
.wrap /deep/ .xt-select el-button {
    margin-right: 5px;
 }
</style>