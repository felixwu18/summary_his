<template>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page" :page-size="rows" layout="total, sizes, prev, pager, next, jumper" :total="count" background>
    </el-pagination>
</template>
<script>
export default {
    name: 'pageTurning',
    data() {
        return {
        }
    },
    props: { count: { type: Number },page: { type: Number },rows: { type: Number }, },
    methods: {
        handleSizeChange(val) {
            this.rows = val;
            this.$emit('update:rows', this.rows);
            this.$emit('init');
        },
        handleCurrentChange(val) {
            this.page = val;
            this.$emit('update:page', this.page);
            this.$emit('init');
        }
    }
}
</script>
<style scoped>
.el-pagination {
    margin-top: 10px;
}
</style>