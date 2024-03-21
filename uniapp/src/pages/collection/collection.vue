<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <z-paging
        ref="paging"
        v-model="collectData"
        @query="queryList"
        :fixed="false"
        height="100%"
        use-page-scroll
    >
        <u-swipe-action
            :show="item.show"
            :index="index"
            v-for="(item, index) in collectData"
            :key="item.id"
            @click="handleCollect"
            :options="options"
            btn-width="120"
        >
            <news-card :item="item" :newsId="item.article_id"></news-card>
        </u-swipe-action>
    </z-paging>
</template>

<script lang="ts" setup>
import { ref, reactive, shallowRef } from 'vue'
import { getCollect, cancelCollect } from '@/api/news'

const paging = shallowRef()
const options = reactive([
    {
        text: '取消收藏',
        style: {
            color: '#FFFFFF',
            backgroundColor: '#FF2C3C'
        }
    }
])
const collectData: any = ref([])

const queryList = async (pageNo, pageSize) => {
    const { lists } = await getCollect()
    lists.forEach((item: any) => {
        item.show = false
    })
    collectData.value = lists
    paging.value.complete(lists)
}

const handleCollect = async (index: number): Promise<void> => {
    try {
        const article_id: number = collectData.value[index].article_id
        await cancelCollect({ id: article_id })
        uni.$u.toast('已取消收藏')
        paging.value.reload()
    } catch (err) {
        //TODO handle the exception
        console.log('取消收藏报错=>', err)
    }
}
</script>

<style scoped></style>
