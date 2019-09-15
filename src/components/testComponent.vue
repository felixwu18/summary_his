<template>
  <div>
    <h1>testcomponent</h1>
    {{ car }}
    {{ house }}
    {{ money }}
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  inject: { // 不同祖先级provide同属性的值, 当前inject取最近的,且不受隔层同属性值的变化影响
    house: {
      default: "没房"
    },
    car: {
      default: "没车"
    },
    money: {
      // 长大工作了虽然有点钱
      // 仅供生活费，需要向父母要
      default: "￥4500"
    }
  },
  methods: {},
  components: {},
  created() {      
    console.log("test----component");
    console.log(this.car);
  },
  mounted() {},
  computed: {}
};
</script>
<style scoped>
</style>