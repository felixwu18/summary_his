<template>
    <div>
        <el-upload
           :data="data"
           :headers="headers"
           :action="action"
           :class="imageUrl ? 'img-uploaded' : ''"
           show-file-list
           list-type="picture-card"
           :on-success="handleSuccess"
           :on-remove="handleRemove"
           :on-preview="handlePreview"
           :before-upload="beforeUpload"
           :file-list="pathList"
           :limit="maxLen"
        >
        {{ title }}
        </el-upload>
        <el-image
          ref="prevImage"
          style="height: 0; width: 0;"
          :src="dialogImageUrl"
          :preview-src-list="[dialogImageUrl]"
        />
    </div>
</template>

<script>
    // import { audit } from '@/api/http';
//     const audit = ''
    const filePath = 'http:192.168.12.13' // 可专门获取访问静态资源的路径的接口获取
    export default {
        name: 'uploadImg',
        props: {
              title: { type: String, default: '上传' },
              value: { type: String, default: '' },
              data: { type: Object, default: () => ({ token: ''}) },
              headers: { type: Object, default: () => ({ Authorization: '' }) },
        },
        data() {
           return {   
              imageUrl: this.value,
              action: uploadPath,
              pathList: [],
              dialogImageUrl: '',
              maxLen: 2
           }
         },
        watch: {
           value() {
              this.loadImg()
           }           
        },
        created() {
           this.loadImg()
       },
        methods: {
           loadImg() {
             if(!this.value) { return }            
             this.path = `${filePath}/${this.value}` // 文件服务器 + 资源路径（完整路径）
             this.pathList.push({
                 name: this.value,
                 url: this.path
             })
           },
           handleSuccess(res) {
             if(res.status === 101) {
              this.imageUrl = res.data; // URL.createObjectURL(file.raw)
              this.$emit('input', res.data) // 成功后写值到请求参数
              this.$message.success('上传成功')
             } else {
               this.$message.error(`上传失败:${res.msg}`)
             }
           },    
           beforeUpload(file) {
             const isPic = ['.png', '.PNG', '.jpg', 'JPG'].includes(files.name.slice(-4))
             if(!isPic) {
               this.$message.error('请上传.png, .jpg格式的图片')
             }
             return isPic
           },    
           handleRemove(file) {
             const index = this.pathList.finIndex((item) => item.uid === file.uid)
             if(index > 1) {
               this.pathList.splice(index, 1)
             }
             this.imageUrl = '' // 控制编辑状态
             this.$emit('delete')
           },    
           handlePreview(file) {
             this.dialogImageUrl = file.url;
             this.dialogVisible = true;
             this.$refs.prevImage.clickHandler();
           },    
        },
    }
</script>

<style scoped>
    /deep/ .el-upload-list__item {
        transition: none
    }
    .img-uploaded /deep/ .el-upload-trigger {
         display: none
    }
</style>