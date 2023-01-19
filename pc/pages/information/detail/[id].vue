<template>
    <div>
        <div class="flex items-center">
            当前位置：
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/information' }">
                    资讯中心
                </el-breadcrumb-item>
                <el-breadcrumb-item
                    :to="{
                        path: `/information/default`,
                        query: {
                            cid: newsDetail.cid,
                            name: newsDetail.cate_name
                        }
                    }"
                >
                    {{ newsDetail.cate_name }}
                </el-breadcrumb-item>
                <el-breadcrumb-item>文章详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="flex gap-4 mt-5">
            <div class="w-[750px] bg-body rounded-[8px] flex-none p-5">
                <div class="border-b border-br pb-4">
                    <span class="font-medium text-[22px]">
                        {{ newsDetail.title }}
                    </span>
                    <div
                        class="mt-3 text-tx-secondary flex items-center flex-wrap"
                    >
                        <span v-if="newsDetail.author">
                            {{ newsDetail.author }}&nbsp;|&nbsp;
                        </span>
                        <span class="mr-5">{{ newsDetail.create_time }}</span>
                        <div class="flex items-center">
                            <Icon name="el-icon-View" />
                            <span>&nbsp;{{ newsDetail.click }}人浏览</span>
                        </div>
                    </div>
                </div>
                <div
                    v-if="newsDetail.abstract"
                    class="bg-page mt-4 p-3 rounded-lg"
                >
                    摘要：{{ newsDetail.abstract }}
                </div>
                <div class="py-4" v-html="newsDetail.content"></div>
                <div class="flex justify-center mt-[40px]">
                    <ElButton size="large" round @click="handelCollectLock">
                        <Icon
                            :name="`el-icon-${
                                newsDetail.collect ? 'StarFilled' : 'Star'
                            }`"
                            :size="newsDetail.collect ? 20 : 16"
                            :color="newsDetail.collect ? '#FF2C2F' : 'inherit'"
                        />
                        {{ newsDetail.collect ? '取消收藏' : '点击收藏' }}
                    </ElButton>
                </div>
                <div class="border-t border-br mt-[30px]">
                    <div class="mt-5 flex">
                        <span class="text-tx-regular">上一篇：</span>
                        <NuxtLink
                            v-if="newsDetail.last.id"
                            class="flex-1 hover:underline"
                            :to="`/information/detail/${newsDetail.last?.id}`"
                        >
                            {{ newsDetail.last?.title }}
                        </NuxtLink>
                        <span v-else> 暂无相关文章 </span>
                    </div>
                    <div class="mt-5 flex">
                        <span class="text-tx-regular">下一篇：</span>
                        <NuxtLink
                            v-if="newsDetail.next.id"
                            class="flex-1 hover:underline"
                            :to="`/information/detail/${newsDetail.next?.id}`"
                        >
                            {{ newsDetail.next?.title }}
                        </NuxtLink>
                        <span v-else> 暂无相关文章 </span>
                    </div>
                </div>
            </div>
            <InformationCard
                class="flex-1"
                header="相关资讯"
                :data="newsDetail.new"
                :only-title="false"
                image-size="mini"
                :show-author="false"
                :show-desc="false"
                :show-click="false"
                :border="false"
                :title-line="2"
                source="new"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ElBreadcrumb, ElBreadcrumbItem, ElButton } from 'element-plus'
import { addCollect, cancelCollect, getArticleDetail } from '~~/api/news'
import feedback from '~~/utils/feedback'
const route = useRoute()
const { data: newsDetail, refresh } = await useAsyncData(
    () =>
        getArticleDetail({
            id: route.params.id,
            source: route.params.source
        }),
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

const handelCollect = async () => {
    const id = route.params.id
    if (newsDetail.value.collect) {
        await cancelCollect({ id })
        feedback.msgSuccess('已取消收藏')
    } else {
        await addCollect({ id })
        feedback.msgSuccess('收藏成功')
    }
    refresh()
}
const { lockFn: handelCollectLock } = useLockFn(handelCollect)
</script>
<style lang="scss" scoped></style>
