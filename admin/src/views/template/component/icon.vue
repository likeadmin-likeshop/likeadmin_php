<template>
    <div>
        <el-card header="element-plus图标" shadow="never" class="!border-none">
            <div class="flex items-center">
                <icon class="m-4" :size="24" name="el-icon-Search" />
                <icon class="m-4" :size="24" name="el-icon-Plus" />
                <icon class="m-4" :size="24" name="el-icon-FullScreen" />
                <icon class="m-4" :size="24" name="el-icon-Setting" />
                <icon class="m-4" :size="24" name="el-icon-Warning" />
            </div>
        </el-card>
        <el-card header="本地图标" shadow="never" class="!border-none mt-4">
            <div class="flex items-center">
                <icon class="m-4" :size="24" name="local-icon-baoxian" />
                <icon class="m-4" :size="24" name="local-icon-youhui" />
                <icon class="m-4" :size="24" name="local-icon-daiyunying" />
                <icon class="m-4" :size="24" name="local-icon-diancanshezhi" />
                <icon class="m-4" :size="24" name="local-icon-dianzifapiao" />
            </div>
        </el-card>
        <el-card header="图标选择器" shadow="never" class="!border-none mt-4">
            <div class="flex items-center">
                <icon-picker v-model="state.value" />
            </div>
        </el-card>
        <el-card
            header="element-plus图标库大全（点击复制图标名称）"
            shadow="never"
            class="!border-none mt-4"
        >
            <div class="flex items-center">
                <div class="flex flex-wrap">
                    <div v-for="item in getElementPlusIconNames()" :key="item" class="m-1">
                        <el-button v-copy="item">
                            <icon :name="item" :size="20" />
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
        <el-card
            header="本地图标库大全（点击复制图标名称）"
            shadow="never"
            class="!border-none mt-4"
        >
            <div class="flex items-center">
                <div class="flex flex-wrap">
                    <div v-for="item in getLocalIconNames()" :key="item" class="m-1">
                        <el-button v-copy="item">
                            <icon :name="item" :size="20" />
                        </el-button>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
import { getElementPlusIconNames, getLocalIconNames } from '@/components/icon'
import Icon from '@/components/icon/index.vue'

const state = reactive({
    value: ''
})
</script>
