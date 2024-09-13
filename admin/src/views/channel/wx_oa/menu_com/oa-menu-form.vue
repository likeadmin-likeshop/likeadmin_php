<template>
    <el-form ref="menuFormRef" :rules="rules" :model="menuForm" label-width="100px">
        <!-- 菜单名称 -->
        <el-form-item :label="modular === 'master' ? '主菜单名称' : '子菜单名称'" prop="name">
            <el-input v-model="menuForm.name" />
        </el-form-item>

        <!-- 菜单类型 -->
        <el-form-item label="主菜单类型" prop="menuType" v-if="modular === 'master'">
            <el-radio-group v-model="menuForm.menuType">
                <el-radio :value="false">不配置子菜单</el-radio>
                <el-radio :value="true">配置子菜单</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-if="menuForm.menuType && modular === 'master'">
            <slot></slot>
        </el-form-item>

        <template v-if="!menuForm.menuType">
            <!-- 跳转链接 -->
            <el-form-item label="跳转链接" prop="visitType">
                <el-radio-group v-model="menuForm.visitType">
                    <el-radio value="view">网页</el-radio>
                    <el-radio value="miniprogram">小程序</el-radio>
                </el-radio-group>
            </el-form-item>

            <!-- 网址 -->
            <el-form-item label="网址" prop="url">
                <el-input v-model="menuForm.url" />
            </el-form-item>

            <template v-if="menuForm.visitType == 'miniprogram'">
                <!-- AppId -->
                <el-form-item label="AppId" prop="appId">
                    <el-input v-model="menuForm.appId" />
                </el-form-item>

                <!-- 路径 -->
                <el-form-item label="路径" prop="pagePath">
                    <el-input v-model="menuForm.pagePath" />
                </el-form-item>
            </template>
        </template>
    </el-form>
</template>

<script lang="ts" setup>
import type { FormInstance } from 'element-plus'

import { rules } from './useMenuOa'

const emit = defineEmits([
    'update:name',
    'update:menuType',
    'update:visitType',
    'update:url',
    'update:appId',
    'update:pagePath'
])

const props = withDefaults(
    defineProps<{
        modular?: string
        name?: string
        menuType?: boolean
        visitType?: string
        url?: string
        appId?: string
        pagePath?: string
    }>(),
    {
        modular: 'master',
        name: '',
        menuType: false,
        visitType: 'view',
        url: '',
        appId: '',
        pagePath: ''
    }
)

const menuFormRef = shallowRef<FormInstance>()
// 表单数据
const menuForm = ref({ ...props })

watch(
    () => props,
    (value) => {
        menuForm.value = value
    },
    { immediate: true }
)

watchEffect(() => {
    if (props.modular === 'master') {
        emit('update:menuType', menuForm.value.menuType)
    }
    emit('update:name', menuForm.value.name)
    emit('update:visitType', menuForm.value.visitType)
    emit('update:url', menuForm.value.url)
    emit('update:appId', menuForm.value.appId)
    emit('update:pagePath', menuForm.value.pagePath)
})

defineExpose({
    menuFormRef
})
</script>
