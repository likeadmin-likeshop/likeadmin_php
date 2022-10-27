<template>
    <div>
        <div class="text-4xl mb-5">资讯中心</div>
        <div class="flex flex-wrap gap-4">
            <InformationCard
                v-for="item in newsLists"
                style="width: calc(50% - 8px)"
                :key="item.id"
                :header="item.name"
                :data="item.article"
                :link="`/information/default?cid=${item.id}&name=${item.name}`"
            >
                <template #content="{ data }">
                    <div class="px-4 py-5">
                        <div class="flex gap-2.5">
                            <div
                                class="w-[180px] bg-page rounded overflow-hidden"
                                v-for="(item, index) in splitData(data)
                                    .topThree"
                                :key="item.id"
                            >
                                <InformationItems
                                    :index="index"
                                    :id="item.id"
                                    :title="item.title"
                                    :desc="item.desc"
                                    :click="item.click"
                                    :author="item.author"
                                    :create-time="item.create_time"
                                    :image="item.image || placeholder"
                                    :only-title="false"
                                    :border="false"
                                    :show-author="false"
                                    :show-desc="false"
                                    :show-time="false"
                                    :show-click="false"
                                    :is-horizontal="true"
                                >
                                    <template #title="{ title }">
                                        <span class="line-clamp-2">{{
                                            title
                                        }}</span>
                                    </template>
                                </InformationItems>
                            </div>
                        </div>
                        <div
                            v-for="item in splitData(data).remain"
                            :key="item.id"
                        >
                            <InformationItems
                                :id="item.id"
                                :title="item.title"
                                :desc="item.desc"
                                :click="item.click"
                                :author="item.author"
                                :create-time="item.create_time"
                                :image="item.image"
                                :only-title="true"
                                :show-time="false"
                            >
                                <template #title="{ title }">
                                    <span class="line-clamp-1">{{
                                        title
                                    }}</span>
                                </template>
                            </InformationItems>
                        </div>
                    </div>
                </template>
            </InformationCard>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getArticleCenter } from '~~/api/news'
import placeholder from '@/assets/images/placeholder.png'
const { data: newsLists } = await useAsyncData(() => getArticleCenter())
const splitData = (data) => {
    const size = 3
    return {
        topThree: data.slice(0, size),
        remain: data.slice(size)
    }
}
</script>
<style lang="scss" scoped></style>
