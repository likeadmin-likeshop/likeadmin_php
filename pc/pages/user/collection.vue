<template>
    <div class="px-[30px] py-5 user-info min-h-full flex flex-col">
        <div class="border-b border-br pb-5">
            <span class="text-2xl font-medium">我的收藏</span>
        </div>
        <div v-if="data.lists.length">
            <div
                class="cursor-pointer"
                v-for="item in data.lists"
                :key="item.id"
                @click="$router.push(`/information/detail/${item.article_id}`)"
            >
                <div class="border-b border-br py-4 flex items-center">
                    <ElImage
                        v-if="item.image"
                        class="flex-none w-[180px] h-[135px] mr-4"
                        :src="item.image"
                        fit="cover"
                    />
                    <div class="flex-1">
                        <div class="text-lg font-medium line-clamp-1">
                            {{ item.title }}
                        </div>

                        <div class="text-tx-regular line-clamp-2 mt-4">
                            {{ item.desc }}
                        </div>
                        <div
                            class="mt-5 text-tx-secondary flex justify-between"
                        >
                            <div>收藏于{{ item.collect_time }}</div>
                            <ElButton
                                link
                                @click.stop="handelCollect(item.article_id)"
                            >
                                取消收藏
                            </ElButton>
                        </div>
                    </div>
                </div>
            </div>
            <div class="py-4 flex justify-end">
                <el-pagination
                    v-model:current-page="params.page_no"
                    :total="data.count"
                    :page-size="params.page_size"
                    hide-on-single-page
                    layout="total, prev, pager, next, jumper"
                    @current-change="refresh()"
                />
            </div>
        </div>

        <div class="flex flex-1 justify-center items-center" v-else>
            <el-empty
                :image="empty_news"
                description="暂无收藏"
                :image-size="250"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { cancelCollect, getCollect } from '~~/api/news'
import empty_news from '@/assets/images/empty_news.png'
import { ElImage, ElButton, ElPagination, ElEmpty } from 'element-plus'
import feedback from '~~/utils/feedback'
const params = reactive({
    page_no: 1,
    page_size: 15
})
const { data, refresh } = await useAsyncData(() => getCollect(params), {
    initialCache: false
})
const handelCollect = async (id) => {
    await cancelCollect({ id })
    feedback.msgSuccess('已取消收藏')
    refresh()
}
definePageMeta({
    module: 'personal',
    auth: true
})
</script>
<style lang="scss" scoped></style>
