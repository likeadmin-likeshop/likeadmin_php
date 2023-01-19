<template>
    <div class="min-h-full flex flex-col">
        <div class="text-4xl mb-5">
            <span v-if="route.query.keywords">
                查找"{{ route.query.keywords }}"
            </span>
            <span v-else>{{ route.query.name || getSourceText }}</span>
        </div>
        <div v-loading="pending">
            <div
                class="bg-white px-5 rounded overflow-hidden"
                v-if="data.lists.length"
            >
                <div class="pt-5 text-tx-secondary" v-if="route.query.keywords">
                    为您找到相关结果 {{ data.count }}个
                </div>
                <InformationItems
                    v-for="item in data.lists"
                    :key="item.id"
                    :id="item.id"
                    :title="item.title"
                    :desc="item.desc"
                    :click="item.click"
                    :author="item.author"
                    :create-time="item.create_time"
                    :image="item.image"
                    :only-title="false"
                />
                <div class="py-4 flex justify-end">
                    <el-pagination
                        v-model:current-page="params.page_no"
                        :total="data.count"
                        :page-size="params.page_size"
                        hide-on-single-page
                        @current-change="refresh()"
                    />
                </div>
            </div>
            <div v-else class="flex-1 flex justify-center items-center">
                <el-empty
                    :image="empty_news"
                    description="暂无资讯"
                    :image-size="250"
                />
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ElPagination, ElEmpty } from 'element-plus'
import empty_news from '@/assets/images/empty_news.png'
import { getArticleList } from '~~/api/news'
const route = useRoute()
const sort = computed(() => route.params.source)
const keyword = computed(() => route.query.keywords || '')
const cid = computed(() => route.query.cid || '')
const params = reactive({
    page_no: 1,
    page_size: 15,
    keyword,
    cid,
    sort
})
const { data, refresh, pending } = await useAsyncData(
    () => getArticleList(params),
    {
        initialCache: false
    }
)

const getSourceText = computed(() => {
    switch (route.params.source) {
        case 'hot':
            return '热门资讯'
        case 'new':
            return ' 最新资讯'
        default:
            return '全部资讯'
    }
})

watch([() => route.query.keywords, () => route.query.cid], () => {
    refresh()
})
</script>
<style lang="scss" scoped></style>
