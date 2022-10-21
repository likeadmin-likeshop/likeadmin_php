<template>
    <div>
        <div class="bg-white px-5">
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
        </div>
    </div>
</template>
<script lang="ts" setup>
import { getArticleList } from '~~/api/news'
const route = useRoute()
const params = reactive({
    keyword: ''
})
const { data, refresh } = await useAsyncData(() => getArticleList(params))
watch(
    () => route.query.keywords,
    (value) => {
        params.keyword = value as string
        refresh()
    }
)
</script>
<style lang="scss" scoped></style>
