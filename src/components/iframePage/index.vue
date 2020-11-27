<template>
    <div class="iframe-warp" :style="{width, height}"> 
       <iframe :style="{margin, padding}" :src="url" :width="originWidth" :height="originHeight" scrolling="no"></iframe>
    </div> 
</template>

<script>
export default {
  name: "iframe-page",
  props: {
      url: { type: String, default: 'http://www.sci99.com/'},
      width: { type: String, default: '630px'},
      height: { type: String, default: '350px'},
      originWidth: { type: String, default: '960px'},
      originHeight: { type: String, default: '1280px'},
      margin: { type: String, default: '-810px 0px 0px -10px'},
      padding: { type: String, default: '10px'}
  },
  data() {
    return {
      isCollapse: false
    };
  },
  computed: {
    
  },
  methods: {
                 
  }           
};
</script>

<style scoped>
.iframe-warp {
  float:left;
  overflow:hidden;
  border:0px;
}
</style>
