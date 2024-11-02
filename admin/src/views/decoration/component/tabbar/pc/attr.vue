<template>
    <div
        class="title flex items-center before:w-[3px] before:h-[14px] before:block before:bg-primary before:mr-2"
    >
        pc导航设置
    </div>
    <el-form class="mt-4" label-width="70px">
        <el-tabs model-value="nav">
            <el-tab-pane label="主导航设置" name="nav">
                <menu-set v-model="data.nav" />
            </el-tab-pane>
            <el-tab-pane label="菜单设置" name="menu">
                <menu-set v-model="data.menu" />
            </el-tab-pane>
        </el-tabs>
    </el-form>
</template>
<script lang="ts" setup>
import MenuSet from './menu-set.vue'

const props = defineProps({
    modelValue: {
        type: Object,
        default: () => ({
            nav: [],
            menu: {}
        })
    }
})
const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void
}>()
const data = computed({
    get() {
        return props.modelValue
    },
    set(value) {
        emit('update:modelValue', value)
    }
})
</script>
