<template>
<div>
  <el-button @click="ceshi">ceshi</el-button>
  <div
    class="edit-div"
    v-text="innerText"
    :contenteditable="canEdit"
    @focus="isLocked = true"
    @blur="isLocked = false"
    :class="{div: isLocked}"
    @input="changeText"
  >
  </div>
  <slot name="test" :ceshiceshi="ceshiceshi" />
  <slot :ceshiceshi="ceshiceshi" />
    <!-- {{ ceshiceshi }} -->
</div>
</template>
<script>
export default {
  name: "editDiv",
  props: {
    value: {
      type: String,
      default: ""
    },
    canEdit: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      innerText: this.value,
      isLocked: false,
      ceshiceshi: '来自子组件内部数据'
    };
  },
  watch: {
    value() {
      if (!this.isLocked || !this.innerText) {
        this.innerText = this.value;
      }
    }
  },
  methods: {
    ceshi() {
      this.value
      this.innerText      
      debugger
    },
    changeText() {
      this.$emit("input", this.$el.innerHTML);
    }
  },
  components: { },
  created() {      
  },
  mounted() {},
  computed: {}
};
</script>
<style lang="less" scoped>
.div{
  border: solid 1px #cccccc;
}
// .edit-div {
//   width: 100%;
//   height: 100%;
//   overflow: auto;
//   word-break: break-all;
//   outline: none;
//   user-select: text;
//   white-space: pre-wrap;
//   text-align: left;
//   padding: 5px;
//   & [contenteditable="true"] {
//     &:empty:before {
//       content: attr(placeholder);
//       display: block;
//       color: #ccc;
//     }
//   }
// }
</style>