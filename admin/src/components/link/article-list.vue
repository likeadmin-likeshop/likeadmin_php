<template>
    <div class="article-list">
        <el-form ref="formRef" :model="queryParams" :inline="true">
            <el-form-item class="w-[280px]" label="文章名称">
                <el-input
                    v-model="queryParams.name"
                    placeholder="请输入"
                    clearable
                    @keyup.enter="resetPage"
                >
                </el-input>
                <el-button type="primary" class="ml-4" :icon="Search" @click="resetPage" />
            </el-form-item>
        </el-form>

        <!-- 表格 -->
        <el-table
            size="large"
            v-loading="pager.loading"
            :data="pager.lists"
            height="432px"
            @row-click="handleSelectItem"
        >
            <el-table-column label="选择" min-width="50">
                <template #default="{ row }">
                    <div class="flex row-center">
                        <el-checkbox
                            :model-value="getSelectItem(row.id)"
                            size="large"
                            @change="handleSelectItem(row)"
                        ></el-checkbox>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="文章名称" min-width="180">
                <template #default="{ row }">
                    <div class="flex items-center">
                        <el-image
                            fit="cover"
                            :src="row.image"
                            class="flex-none w-[58px] h-[58px]"
                        />
                        <div class="ml-4 overflow-hidden">
                            <el-tooltip effect="dark" :content="row.title" placement="top">
                                <div class="text-base line-clamp-2">
                                    {{ row.title }}
                                </div>
                            </el-tooltip>
                        </div>
                    </div>
                </template>
            </el-table-column>
            <el-table-column label="创建时间" prop="create_time" min-width="140" />
        </el-table>

        <div class="flex justify-end mt-4">
            <pagination v-model="pager" @change="getLists" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { Search } from '@element-plus/icons-vue'
import type { PropType } from 'vue'

import { articleLists } from '@/api/article'
import { usePaging } from '@/hooks/usePaging'

import { LinkTypeEnum } from '.'

//TODO TODO
const props = defineProps({
    modelValue: {
        type: Object as PropType<any>,
        default: () => ({})
    }
})
const emit = defineEmits<{
    (event: 'update:modelValue', value: any): void
}>()

const selectData = ref<any>({
    path: '/pages/news_detail/news_detail',
    name: '',
    query: {},
    type: LinkTypeEnum.ARTICLE_LIST
})

const queryParams = reactive<any>({
    name: '',
    is_show: 1
})

const { pager, getLists, resetPage } = usePaging({
    fetchFun: articleLists,
    params: queryParams
})

const getSelectItem = (id: number) => {
    return id == Number(selectData.value.id)
}
/**
 * @description 选择
 */
const handleSelectItem = (event: any) => {
    selectData.value = {
        id: event.id,
        name: event.title,
        path: '/pages/news_detail/news_detail',
        query: {
            id: event.id
        },
        type: LinkTypeEnum.ARTICLE_LIST
    }

    emit('update:modelValue', selectData.value)
}
watch(
    () => props.modelValue,
    (value) => {
        if (value.type != LinkTypeEnum.ARTICLE_LIST) {
            return (selectData.value = {
                id: '',
                name: '',
                path: '/pages/news_detail/news_detail',
                type: LinkTypeEnum.SHOP_PAGES
            })
        }
        selectData.value = value
    },
    {
        immediate: true
    }
)

getLists()
</script>

<style lang="scss" scoped>
:deep(.el-input-group__append) {
    .el-button {
        margin: 0 0;
    }
}
</style>
