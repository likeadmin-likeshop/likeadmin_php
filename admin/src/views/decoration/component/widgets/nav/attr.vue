<template>
    <div>
        <el-form label-width="70px">
            <el-card shadow="never" class="!border-none flex mt-2">
                <div class="flex items-end mb-4">
                    <div class="text-base text-[#101010] font-medium">展示样式</div>
                </div>
                <el-radio-group v-model="content.style">
                    <el-radio :label="1">固定显示</el-radio>
                    <el-radio :label="2">分页滑动</el-radio>
                </el-radio-group>
                <el-form-item label="每行数量" class="mt-4">
                    <el-select
                        v-model="content.per_line"
                        style="width: 300px"
                    >
                        <el-option
                            v-for="item in 5"
                            :key="item"
                            :label="item + '个'"
                            :value="item"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item label="显示行数">
                    <el-select
                        v-model="content.show_line"
                        style="width: 300px"
                    >
                        <el-option
                            v-for="item in 2"
                            :key="item"
                            :label="item + '行'"
                            :value="item"
                        />
                    </el-select>
                </el-form-item>
            </el-card>
            <el-card shadow="never" class="!border-none flex mt-2">
                <div class="flex items-end">
                    <div class="text-base text-[#101010] font-medium">菜单设置</div>
                    <div class="text-xs text-tx-secondary ml-2">
                        建议图片尺寸：100px*100px
                    </div>
                </div>
                <div class="flex-1 mt-4">
                    <AddNav v-model="content.data" />
                </div>
            </el-card>
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
