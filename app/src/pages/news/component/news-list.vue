<template>
    <z-paging
        auto-show-back-to-top
        :auto="i == index"
        ref="paging"
        v-model="dataList"
        :data-key="i"
        @query="queryList"
        :fixed="false"
        height="100%"
    >
        <block v-for="(newsItem, newsIndex) in dataList" :key="newsIndex">
            <news-card :item="newsItem" :newsId="newsItem.id"></news-card>
        </block>
    </z-paging>
</template>

<script lang="ts" setup>
import { ref, watch, nextTick, shallowRef } from 'vue'
import { getArticleList } from '@/api/news'

const props = withDefaults(
    defineProps<{
        cid: number
        i: number
        index: number
    }>(),
    {
        cid: 0
    }
)

const paging = shallowRef<any>(null)
const dataList = ref([])
const isFirst = ref<boolean>(true)

watch(
    () => props.index,
    async () => {
        await nextTick()
        if (props.i == props.index && isFirst.value) {
            isFirst.value = false
            paging.value?.reload()
        }
    },
    { immediate: true }
)

const queryList = async (pageNo, pageSize) => {
    try {
        const { lists } = await getArticleList({
            cid: props.cid,
            pageNo,
            pageSize
        })
        paging.value.complete(lists)
    } catch (e) {
        console.log('报错=>', e)
        //TODO handle the exception
        paging.value.complete(false)
    }
}
</script>

<style scoped></style>
