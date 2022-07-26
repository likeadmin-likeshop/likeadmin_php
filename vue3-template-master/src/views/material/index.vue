<template>
    <div class="material-index">
        <el-card class="!border-none" shadow="never">
            <el-tabs v-model="activeTab">
                <el-tab-pane
                    v-for="item in tabsMap"
                    :label="item.name"
                    :name="item.type"
                    :index="item.type"
                    :key="item.type"
                >
                    <material
                        :type="item.type"
                        mode="page"
                        file-size="120px"
                        :limit="-1"
                        :page-size="20"
                    />
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
const tabsMap = [
    {
        type: 'image',
        name: '图片'
    },
    {
        type: 'video',
        name: '视频'
    }
]
const activeTab = ref('image')
</script>

<style lang="scss" scoped>
.material-index {
    :deep(.el-tabs) {
        min-height: calc(100vh - 140px);
        display: flex;
        flex-direction: column;
        .el-tabs__header {
            margin-bottom: 0 !important;
        }
        .el-tabs__content,
        .el-tab-pane {
            min-height: 0;
            flex: 1;
            display: flex;
            flex-direction: column;
        }
    }
}
</style>
