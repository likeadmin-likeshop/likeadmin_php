<template>
    <div class="pages-setting">
        <el-card shadow="never" class="!border-none flex">
            <div
                class="title flex items-center before:w-[3px] before:h-[14px] before:block before:bg-primary before:mr-2 text-xl font-medium"
            >
                {{ widget?.title }}
            </div>
        </el-card>
        <el-scrollbar class="w-full" style="height: calc(100% - 60px)">
            <keep-alive>
                <component
                    :is="widgets[widget?.name]?.attr"
                    :content="widget?.content"
                    :styles="widget?.styles"
                    :type="type"
                    @update:content="handleUpdateContent"
                />
            </keep-alive>
        </el-scrollbar>
    </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

import widgets from '../widgets'

const emits = defineEmits(['update:content'])
const handleUpdateContent = (data: any) => {
    emits('update:content', data)
}

defineProps({
    widget: {
        type: Object as PropType<Record<string, any>>,
        default: () => ({})
    },
    type: {
        type: String as PropType<'mobile' | 'pc'>,
        default: 'mobile'
    }
})
</script>
