<template>
  <div>
    <div ref="canvasWrap" style="height: 200px; border: solid">
       <canvas ref="canvasRef" />        
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
       canvas: null,
       ctx: null,
    };
  },
  methods: {
      initChart() {
         const canvas = this.$refs.canvasRef;
         this.canvas = canvas;
         console.log(canvas, 'canvas');
         this.ctx = canvas.getContext('2d');
         canvas.width = this.$refs.canvasWrap.offsetWidth;
         this.draw()     
      },
      draw() {
         const { ctx } = this
         console.log(ctx, 'ctx---');
         ctx.moveTo(0,0);
         ctx.lineTo(200,100);
         ctx.stroke();
      },
  },
  components: {

  },
  created() {      
    console.log("created----canvs");
  },
  mounted() {},
  computed: {}
};
</script>
<style scoped>
</style>