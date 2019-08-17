<template>
  <svg :class="svgClass" aria-hidden="true" v-if="login">
    <use :xlink:href="iconName" />
  </svg>
  <i :class="iconClass" v-else></i>
</template>
<script>
export default {
  name: "svg-icon",
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String
    },
    login: {
      type: Boolean
    }
  },
  computed: {
    iconName() {
      return `#icon-${this.iconClass}`;
    },
    svgClass() {
      if (this.className) {
        return "svg-icon " + this.className;
      } else {
        return "svg-icon";
      }
    }
  }
};
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}

i {
  font-size: 16px;
  padding-right: 8px;
}
</style>