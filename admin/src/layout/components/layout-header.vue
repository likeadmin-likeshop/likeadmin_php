<template>
    <div class="layout-header">
        <input class="search-input" placeholder="请输入搜索内容…" type="text" />
        <div class="admin-info flex flex-center m-l-40">
            <el-avatar :size="40" src=""></el-avatar>
            <div class="m-l-10">
                <el-dropdown trigger="hover">
                    <div class="flex flex-center">
                        管理员
                        <el-icon class="el-icon--right"><arrow-down /></el-icon>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
        </div>
    </div>
</template>


<script>
export default {}
</script>


<style lang="scss" scoped>
.layout-header {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    flex: none;
    height: $layout-header-height;
    background: #fff;
    padding: 0 24px;
    .search-input {
        width: 460px;
        height: 40px;
        border-radius: 20px;
        background: #f6f6f6;
        padding: 0 20px;
    }
}
</style>