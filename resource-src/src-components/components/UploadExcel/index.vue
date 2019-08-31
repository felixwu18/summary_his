<template>
    <div>
        <el-upload class="upload-demo" :on-success="uploadWin" drag :action="audit+URL" :headers="{token:token,from:'check'}"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传excel相关文件，且不超过500kb</div>
        </el-upload>
    </div>
</template>

<script>
    // import { audit } from '@/api/http';
    const audit = ''
    export default {
        name: 'uploadingExcel',
        props: { URL: { type: String } },
        computed: { token() { return 'this.$store.state.spStore.token' } },
        data() { return { audit } },
        methods: { uploadWin(err, file, fileList) { this.$message({ message: err.errMsg, type: `${err.code == 200 ? 'success' : 'error'}` }); }, },
        created() { }
    }
</script>

<style scoped>
    .upload-demo {
        text-align: center;
    }
</style>