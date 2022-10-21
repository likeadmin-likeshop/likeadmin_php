<template>
    <div class="flex flex-wrap gap-4">
        <InformationCard
            v-for="item in newsLists"
            style="width: calc(50% - 8px)"
            :key="item.id"
            :header="item.name"
            content-class="flex gap-2.5 pt-4"
            :data="item.article"
        >
            <template #default="{ item }">
                <InformationItems
                    class="w-[180px] bg-page"
                    :key="item.id"
                    :id="item.id"
                    :title="item.title"
                    :desc="item.desc"
                    :click="item.click"
                    :author="item.author"
                    :create-time="item.create_time"
                    :image="item.image"
                    :only-title="false"
                    :border="false"
                    :show-author="false"
                    :show-desc="false"
                    :show-time="false"
                    :show-click="false"
                    :is-horizontal="true"
                >
                    <template #title="{ title }">
                        <span class="line-clamp-2">{{ title }}</span>
                    </template>
                </InformationItems>
            </template>
        </InformationCard>
    </div>
</template>
<script lang="ts" setup>
import { getArticleCenter } from '~~/api/news'

const { data: newsLists } = await useAsyncData(() => getArticleCenter())
</script>
<style lang="scss" scoped></style>
