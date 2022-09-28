<template>
    <div class="search">
        <div class="search-con flex items-center px-[15px]">
            <icon name="el-icon-Search" :size="17" />
            <span class="ml-[5px]">请输入关键词搜索</span>
        </div>
    </div>
</template>
<script lang="ts" setup></script>

<style lang="scss" scoped>
.search {
    background-color: #fff;
    padding: 7px 12px;
    .search-con {
        height: 100%;
        height: 36px;
        border-radius: 36px;
        background: #f4f4f4;
        color: #999999;
    }
}
</style>
