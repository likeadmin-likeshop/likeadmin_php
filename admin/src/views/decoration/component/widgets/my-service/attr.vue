<template>
    <div>
        <el-form label-width="70px">
            <el-form-item label="排版样式">
                <el-radio-group v-model="content.style">
                    <el-radio :label="1">横排</el-radio>
                    <el-radio :label="2">竖排</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="标题名称">
                <el-input class="w-[400px]" v-model="content.title" />
            </el-form-item>
            <el-form-item label="菜单设置">
                <div class="flex-1">
                    <AddNav v-model="content.data" />
                </div>
            </el-form-item>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'
import type options from './options'
import AddNav from '../../add-nav.vue'
type OptionsType = ReturnType<typeof options>
defineProps({
    content: {
        type: Object as PropType<OptionsType['content']>,
        default: () => ({})
    },
    styles: {
        type: Object as PropType<OptionsType['styles']>,
        default: () => ({})
    }
})
</script>

<style lang="scss" scoped></style>
