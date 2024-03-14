<template>
    <div>
        <el-form label-width="90px" size="large" label-position="top">
            <el-card shadow="never" class="!border-none flex mt-2">
                <el-form-item label="平台名称">
                    <el-input class="w-[400px]" show-word-limit maxlength="20" v-model="content.title"/>
                </el-form-item>

                <el-form-item label="客服二维码">
                    <div>
                        <material-picker v-model="content.qrcode" exclude-domain/>
                    </div>
                </el-form-item>

                <el-form-item label="备注">
                    <el-input class="w-[400px]" show-word-limit maxlength="20" v-model="content.remark"/>
                </el-form-item>
                <el-form-item label="联系电话">
                    <el-input class="w-[400px]" v-model="content.mobile"/>
                </el-form-item>
                <el-form-item label="服务时间">
                    <el-input class="w-[400px]" show-word-limit maxlength="20" v-model="content.time"/>
                </el-form-item>
            </el-card>
        </el-form>
    </div>
</template>
<script lang="ts" setup>
import type {PropType} from 'vue'
import type options from './options'

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
