<template>
  <div class="layout" :style="`width: ${width}px;`">
    <span v-if="title">{{title}}：</span>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: "searchInput",
  props: { title: { type: String }, width: { type: Number, default: 295 } },
  data() {
    return {};
  }
};
</script>


<style scoped>
.layout {
  margin: 0 10px 10px 0;
  float: left;
  font-size: 14px;
  /* border: 1px solid black; */
}

.el-input--suffix {
  width: 220px;
}

.el-select {
  width: 220px;
}

.el-date-editor--datetimerange {
  width: 220px;
}
.layout span {
  font-size: 1.1em;
  display: inline-block;
  /* float: left; */
  /* line-height: 40px; */
  /* width: 50%; */
  vertical-align: middle;
  margin-left: 0.5em;
  text-align: right;
}
</style>