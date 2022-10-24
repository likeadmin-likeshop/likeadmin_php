<template>
    <div class="px-[30px] py-5 user-info">
        <div class="border-b border-br pb-5">
            <span class="text-2xl font-medium">我的收藏</span>
        </div>
        <div
            class="cursor-pointer"
            v-for="item in data.lists"
            :key="item.id"
            @click="
                $router.push(`/information/default/detail/${item.article_id}`)
            "
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
                    <div class="mt-5 text-tx-secondary flex justify-between">
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
    </div>
</template>
<script lang="ts" setup>
import { cancelCollect, getCollect } from '~~/api/news'
import { ElImage, ElButton } from 'element-plus'
import feedback from '~~/utils/feedback'
const pages = reactive({
    page_no: 1,
    page_size: 15
})
const { data, refresh } = useAsyncData(() => getCollect(pages), {
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
