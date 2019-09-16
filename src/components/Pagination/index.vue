<template>
  <div>
    <!-- <h1>分页器</h1> -->
    <el-pagination
      :background="background"
      :layout="layout"
      :hide-on-single-page="true"
      :page-size.sync="pageSize"
      :current-page="currentPage"
      v-on="$listeners"
      v-bind="$attrs"
    />
      <!--
        此两,封装的组件,外部一个继承原有事件,一个继承原有的属性
      v-on="$listeners"
      v-bind="$attrs"
       -->

      <!-- 
      :background="background"
      :current-page.sync="currentPage"
      :page-size.sync="pageSize"
      :layout="layout"
      :page-sizes="pageSizes"
      :total="total"
      v-bind="$attrs"
      :hide-on-single-page="true"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange" 
      -->
  </div>
</template>

<script>
// import { scrollTo } from '@/tools/scroll-to'

export default {
  name: "Pagination",
  props: {
    // total: {
    //   // required: true,
    //   type: Number,
    //   default: 0
    // },
    page: {
      type: Number,
      default: 1
    },
    limit: { // 分页一页条数
      type: Number,
      default: 20
    },
    // pageSizes: {
    //   type: Array,
    //   default() {
    //     return [15, 25, 35, 50, 70];
    //   }
    // },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    },
    background: {
      type: Boolean,
      default: true
    },
    // autoScroll: {
    //   type: Boolean,
    //   default: true
    // }
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      }
      // ,
      // set(val) {
      //   this.$emit("update:page", val);
      // }
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      }
    },
    // isHide(){
    //   return false
    // }
  },
  methods: {
    // handleSizeChange(val) {
    //   this.$emit("pagination", { page: this.currentPage, limit: val });

    //   // 解决正常方法无法滚动
    //   // let main = document.getElementsByClassName("el-table")[0];
    //   // main.parentNode.style.position = "absolute";
    //   // setTimeout(() => {
    //   //   main.parentNode.style.position = "static";
    //   // }, 0);

    //   // if (this.autoScroll) {
    //   //   scrollTo(0, 1000);
    //   // }
    // },
    handleCurrentChange(val) {
      this.$emit("pageChange", val);
      console.log(val)
      // 解决正常方法无法滚动
      // let main = document.getElementsByClassName("el-table")[0];
      // main.parentNode.style.position = "absolute";
      // setTimeout(() => {
      //   main.parentNode.style.position = "static";
      // }, 300);

      // if (this.autoScroll) {
      //   scrollTo(-20, 1000);
      // }
      // window.scrollTo(0,0);
    }
  }
};
</script>

<style scoped>
</style>
