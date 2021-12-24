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


<script>
import { onMounted, reactive, toRefs } from 'vue'
export default {
    components: {},
    props: {
        pageSize: {
            type: Number,
            default: 15,
        },
        pageSizes: {
            type: Array,
            default: () => [10, 20, 30, 40],
        },
        layout: {
            type: String,
            default: 'sizes, prev, pager, next',
        },
        params: {
            type: Object,
            default: () => ({}),
        },
        fun: {
            type: Function,
            default: () => {},
        },
    },
    setup(props) {
        const { pageSize, pageSizes, layout, params } = toRefs(props)
        const pages = reactive({
            page_no: 1,
            page_size: pageSize.value,
            lists: [],
            total: 0,
            loading: true
        })

        const getLists = () => {
            props
                .fun({
                    page_no: pages.page_no,
                    page_size: pages.page_size,
                    ...params.value,
                })
                .then(() => {})
                .finally(() => {
                    pages.loading = false
                })
        }
        const refresh = () => {
            pages.page_no = 1
            pages.lists = []
            getLists()
        }
        onMounted(() => {
            getLists()
        })
        return {
            pages,
            pageSizes,
            layout,
            getLists,
            refresh
        }
    },
}
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