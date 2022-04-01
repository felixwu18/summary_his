<template>
  <div>
    feng
    <setGetEnable v-on="$listeners" v-bind="$attrs" />
  </div>
</template>
<script>
import setGetEnable from "./setGetEnable.vue";
export default {
  name: "setGetEnableSecond",
  data() {
    return {
      testSon: 222,
    };
  },
  components: {
    setGetEnable,
  },
  methods: {
    testGetSonMethod() {
      console.log("测试this.$parent");
    },
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {
    console.log(this.$parent, "===>this.$parent");
  },
  activated() {},
};
</script>
<style scoped></style>
