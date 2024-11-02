<template>
    <el-form ref="form" label-width="80px" size="large">
        <el-card shadow="never" class="!border-none flex mt-2">
            <el-form-item label="页面标题">
                <el-radio-group v-model="contentData.title_type">
                    <el-radio value="1">文字</el-radio>
                    <el-radio value="2">图片</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="content.title_type == 1">
                <el-input
                    v-model="contentData.title"
                    maxlength="8"
                    show-word-limit
                    class="w-[300px]"
                    placeholder="请输入页面标题"
                ></el-input>
            </el-form-item>
            <el-form-item v-if="content.title_type == 2">
                <material-picker v-model="contentData.title_img" :limit="1" size="100px" />
                <div class="form-tips">建议图片尺寸：300px*40px</div>
            </el-form-item>
            <el-form-item label="文字颜色" v-if="content.title_type == 1">
                <el-radio-group v-model="contentData.text_color">
                    <el-radio value="1">白色</el-radio>
                    <el-radio value="2">黑色</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="页面背景">
                <el-radio-group v-model="contentData.bg_type">
                    <el-radio value="1">背景颜色</el-radio>
                    <el-radio value="2">背景图片</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item v-if="content.bg_type == 1">
                <color-picker v-model="contentData.bg_color" reset-color="#F5F5F5" />
            </el-form-item>
            <el-form-item v-if="content.bg_type == 2">
                <material-picker v-model="contentData.bg_image" :limit="1" size="100px" />
                <div class="form-tips">建议图片尺寸：750px*高度不限</div>
            </el-form-item>
        </el-card>
    </el-form>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

import type options from './options'

type OptionsType = ReturnType<typeof options>
const emits = defineEmits<(event: 'update:content', data: OptionsType['content']) => void>()
const props = defineProps({
    content: {
        type: Object as PropType<OptionsType['content']>,
        default: () => ({})
    },
    styles: {
        type: Object as PropType<OptionsType['styles']>,
        default: () => ({})
    }
})

const contentData = computed({
    get: () => props.content,
    set: (newValue) => {
        emits('update:content', newValue)
    }
})
</script>

<style lang="scss" scoped></style>
