<template>
    <el-form label-width="140px">
        <div>
            <div class="text-xl font-medium mb-[20px]">系统主题色</div>
            <el-form-item label-width="50">
                <ThemePicker
                    class="mt-[20px]"
                    v-model="formData.themeId"
                    :theme-colors="themeColors"
                    @change="selectThemeColor"
                />
            </el-form-item>
        </div>
        <div>
            <div class="text-xl font-medium mt-[40px] mb-[20px]">样式设置</div>
            <el-form-item label="自定义主题颜色" v-if="formData.themeId == 5">
                <div>
                    <color-picker v-model="formData.primaryColor"></color-picker>
                    <color-picker v-model="formData.minorColor" class="mt-2"></color-picker>
                    <div>
                        <span class="form-tips">自定义主题渐变色，用于按钮类和主要文字</span>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="按钮文字颜色">
                <div>
                    <el-radio-group v-model="formData.buttonColor">
                        <el-radio label="white" size="large">白色</el-radio>
                        <el-radio label="black" size="large">黑色</el-radio>
                    </el-radio-group>
                </div>
            </el-form-item>
        </div>
        <div>
            <div class="flex" v-show="formData.themeId == 1">
                <img class="max-w-[800px] w-full" src="../../image/pc_green.png" />
            </div>
            <div class="flex" v-show="formData.themeId == 2">
                <img class="max-w-[800px] w-full" src="../../image/pc_blue.png" />
            </div>
            <div class="flex" v-show="formData.themeId == 3">
                <img class="max-w-[800px] w-full" src="../../image/pc_purple.png" />
            </div>
            <div class="flex" v-show="formData.themeId == 4">
                <img class="max-w-[800px] w-full" src="../../image/pc_yellow.png" />
            </div>
        </div>
    </el-form>
</template>
<script setup lang="ts">
import ThemePicker from './theme-picker.vue'
import { useVModel } from '@vueuse/core'
const props = defineProps<{
    modelValue: Record<string, any>
}>()

const emit = defineEmits<{
    (event: 'update:modelValue', value: Record<string, any>): void
}>()

const themeColors = ref([
    {
        id: 1,
        name: '青草绿',
        color1: '#19e8b7',
        color2: '#00abff',
        btnColor: 'white'
    },
    { id: 2, name: '科技蓝', color1: '#00ABFF', color2: '#0B85FF', btnColor: 'white' },
    { id: 3, name: '梦幻紫', color1: '#A33AFE', color2: '#762AFF', btnColor: 'white' },
    { id: 4, name: '高级黄', color1: '#FFC94D', color2: '#FBAE00', btnColor: 'black' },
    { id: 5, name: '自定义', color1: '#F8F8F8', color2: '#F5F5F5', btnColor: 'white' }
])

//选择主题颜色
const selectThemeColor = (item: any) => {
    if (item.id != 5) {
        formData.value.primaryColor = item.color1
        formData.value.minorColor = item.color2
        formData.value.buttonColor = item.btnColor
    }
}

//表单数据
const formData = useVModel(props, 'modelValue', emit)
</script>
