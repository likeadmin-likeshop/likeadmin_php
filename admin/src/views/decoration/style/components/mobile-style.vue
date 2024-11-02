<template>
    <el-form label-width="140px">
        <div>
            <div class="text-xl font-medium mb-[20px]">系统主题色</div>
            <el-form-item label-width="50">
                <ThemePicker
                    v-model="formData.themeColorId"
                    :theme-colors="themeColors"
                    @change="selectThemeColor"
                />
            </el-form-item>
        </div>
        <div>
            <div class="text-xl font-medium mt-[40px] mb-[20px]">样式设置</div>

            <el-form-item label="导航顶部文字颜色">
                <div>
                    <el-radio-group v-model="formData.topTextColor">
                        <el-radio value="white" size="large">白色</el-radio>
                        <el-radio value="black" size="large">黑色</el-radio>
                    </el-radio-group>
                    <div>
                        <span class="form-tips">页面导航栏文字的颜色</span>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="导航顶部背景颜色">
                <div>
                    <color-picker
                        :resetColor="formData.themeColor1"
                        v-model="formData.navigationBarColor"
                    ></color-picker>
                    <div>
                        <span class="form-tips"> 页面顶部导航栏背景颜色，不设置则跟随主题色 </span>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="自定义主题颜色" v-if="formData.themeColorId == 7">
                <div>
                    <color-picker
                        v-model="formData.themeColor1"
                        default-color="#F8F8F8"
                    ></color-picker>
                    <color-picker
                        v-model="formData.themeColor2"
                        default-color="#F8F8F8"
                        class="mt-2"
                    ></color-picker>
                    <div>
                        <span class="form-tips">自定义主题渐变色，用于按钮类和主要文字</span>
                    </div>
                </div>
            </el-form-item>
            <el-form-item label="按钮文字颜色">
                <div>
                    <el-radio-group v-model="formData.buttonColor">
                        <el-radio value="white" size="large">白色</el-radio>
                        <el-radio value="black" size="large">黑色</el-radio>
                    </el-radio-group>
                </div>
            </el-form-item>
        </div>
        <div>
            <div class="flex" v-if="formData.themeColorId == 1">
                <img class="w-[200px]" src="@/assets/images/blue1.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/blue2.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/blue3.png" />
            </div>
            <div class="flex" v-if="formData.themeColorId == 2">
                <img class="w-[200px]" src="@/assets/images/green1.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/green2.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/green3.png" />
            </div>
            <div class="flex" v-if="formData.themeColorId == 3">
                <img class="w-[200px]" src="@/assets/images/purple1.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/purple2.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/purple3.png" />
            </div>
            <div class="flex" v-if="formData.themeColorId == 4">
                <img class="w-[200px]" src="@/assets/images/yellow1.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/yellow2.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/yellow3.png" />
            </div>
            <div class="flex" v-if="formData.themeColorId == 5">
                <img class="w-[200px]" src="@/assets/images/red1.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/red2.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/red3.png" />
            </div>
            <div class="flex" v-if="formData.themeColorId == 6">
                <img class="w-[200px]" src="@/assets/images/pink1.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/pink2.png" />
                <img class="w-[200px] ml-[30px]" src="@/assets/images/pink3.png" />
            </div>
        </div>
    </el-form>
</template>
<script setup lang="ts">
import { useVModel } from '@vueuse/core'

import ThemePicker from './theme-picker.vue'

const props = defineProps<{
    modelValue: Record<string, any>
}>()
const themeColors = ref([
    {
        id: 1,
        name: '科技蓝',
        color1: '#2F80ED',
        color2: '#56CCF2',
        btnColor: 'white'
    },
    { id: 2, name: '偏绿蓝', color1: '#2EC840', color2: '#3DE650', btnColor: 'white' },
    { id: 3, name: '商务紫', color1: '#A74BFD', color2: '#CB60FF', btnColor: 'white' },
    { id: 4, name: '活力橙', color1: '#F7971E', color2: '#FFD200', btnColor: 'black' },
    { id: 5, name: '经典红', color1: '#FF2C3C', color2: '#EF1D2D', btnColor: 'white' },
    { id: 6, name: '美妆色', color1: '#FD498F', color2: '#FA444D', btnColor: 'white' },
    { id: 7, name: '自定义', color1: '#F8F8F8', color2: '#F5F5F5', btnColor: 'white' }
])

const emit = defineEmits<{
    (event: 'update:modelValue', value: Record<string, any>): void
}>()

//选择主题颜色
const selectThemeColor = (item: any) => {
    if (item.id != 7) {
        formData.value.themeColor1 = item.color1
        formData.value.themeColor2 = item.color2
        formData.value.navigationBarColor = item.color1
        formData.value.buttonColor = item.btnColor
        formData.value.topTextColor = item.btnColor
    }
}
//表单数据
const formData = useVModel(props, 'modelValue', emit)
</script>
