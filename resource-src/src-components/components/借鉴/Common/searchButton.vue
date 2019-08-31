<template>
    <div>
        <slot></slot>
    </div>
</template>


<script>
    export default { name: 'searchButton', }
</script>

<style scoped>
    div {
        width: 100%;
        margin-top: 5px;
        display: inline-block;
        overflow: hidden;
    }
</style>