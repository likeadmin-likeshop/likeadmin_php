<template>
    <div class="pagination">
        <el-pagination
            v-model:currentPage="modelValue.page"
            v-model:pageSize="modelValue.size"
            :page-sizes="pageSizes"
            :layout="layout"
            :total="modelValue.count"
            @size-change="handleChange"
            @current-change="handleChange"
            hide-on-single-page
        >
        </el-pagination>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
    components: {},
    props: {
        // 每一页条数
        modelValue: {
            type: Object,
            default: () => ({}),
        },
        // 允许选择的每一页条数
        pageSizes: {
            type: Array,
            default: () => [10, 20, 30, 40],
        },
        // 分页的布局（参考element的分页组件）
        layout: {
            type: String,
            default: 'total, sizes, prev, pager, next, jumper',
        },
    },
    emits: ['change'],
    setup(props, { emit }) {
        const handleChange = () => {
            emit('change')
        }

        return {
            handleChange,
        }
    },
})
</script>


<style lang="scss">
.pagination {
    height: 100%;
    .pagination-footer {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>