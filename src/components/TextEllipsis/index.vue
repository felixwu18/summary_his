<template>
  <el-tooltip
    effect="dark"
    :content="text + ''"
    placement="top"
    :disabled="isDisabled"
    style="height: initial;"
  >
    <div class="word-nowrap" @mouseenter="isShowToolTip">{{text}}</div>
  </el-tooltip>
</template>
<script>
export default {
  name: 'ShowToolTips',
  data: function() {
    return {
      isDisabled: false
    };
  },
  props: {
    text: { type: [String, Number], default: '' },
    isLink: { type: Boolean, default: false, required: false }
  },
  methods: {
    isShowToolTip(e) {
      const clientWidth = e.target.clientWidth;
      const scrollWidth = e.target.scrollWidth;
      this.isDisabled = scrollWidth <= clientWidth;
    }
  },
};
</script>
<style>
.word-nowrap {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>