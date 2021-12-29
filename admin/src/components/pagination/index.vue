<template>
    <div class="pagination" v-loading="pages.loading">
        <div class="pagination-main">
            <slot :lists="pages.lists"></slot>
        </div>
        <div class="pagination-footer">
            <el-pagination
                v-model:currentPage="pages.page_no"
                v-model:pageSize="pages.page_size"
                :page-sizes="pageSizes"
                :layout="layout"
                :total="pages.total"
                @size-change="getLists"
                @current-change="getLists"
                hide-on-single-page
            >
            </el-pagination>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, reactive, toRefs } from 'vue'
export default defineComponent({
    components: {},
    props: {
        // 每一页条数
        pageSize: {
            type: Number,
            default: 15,
        },
        // 允许选择的每一页条数
        pageSizes: {
            type: Array,
            default: () => [10, 20, 30, 40],
        },
        // 分页的布局（参考element的分页组件）
        layout: {
            type: String,
            default: 'sizes, prev, pager, next',
        },
        // 额外参数
        params: {
            type: Object,
            default: () => ({}),
        },
        // 请求函数
        fun: {
            type: Function
        },
    },
    setup(props) {
        const { pageSize, pageSizes, layout, params } = toRefs(props)
        const pages = reactive({
            page_no: 1,
            page_size: pageSize.value,
            lists: [],
            total: 0,
            loading: false,
        })

        const getLists = () => {
            if (!props.fun) return
            pages.loading = true
            props
                .fun({
                    page_no: pages.page_no,
                    page_size: pages.page_size,
                    ...params.value,
                })
                .then((data: any) => {
                    pages.lists = data.lists
                    pages.total = data.total
                })
                .finally(() => {
                    pages.loading = false
                })
        }
        const refresh = () => {
            pages.page_no = 1
            pages.lists = []
            getLists()
        }

        const getPages = () => pages

        onMounted(() => {
            getLists()
        })
        return {
            pages,
            pageSizes,
            layout,
            getLists,
            refresh,
            getPages,
        }
    },
})
</script>


<style lang="scss">
.pagination {
    .pagination-footer {
        margin-top: 20px;
        display: flex;
        justify-content: flex-end;
    }
}
</style>