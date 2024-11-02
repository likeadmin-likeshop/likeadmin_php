<template>
    <div class="index">
        <div class="flex">
            <div class="w-[750px] h-[340px] flex-none mr-5">
                <ElCarousel
                    v-if="getSwiperData.enabled"
                    class="w-full"
                    trigger="click"
                    height="340px"
                >
                    <ElCarouselItem v-for="item in showList" :key="item">
                        <NuxtLink :to="item.link.path" target="_blank">
                            <ElImage
                                class="w-full h-full rounded-[8px] bg-white overflow-hidden"
                                :src="appStore.getImageUrl(item.image)"
                                fit="contain"
                            />
                        </NuxtLink>
                    </ElCarouselItem>
                </ElCarousel>
            </div>
            <InformationCard
                link="/information/new"
                class="flex-1 min-w-0"
                header="最新资讯"
                :data="pageData.new"
                :show-time="false"
            />
        </div>
        <div class="mt-5 flex">
            <InformationCard
                link="/information"
                class="w-[750px] flex-none mr-5"
                header="全部资讯"
                :data="pageData.all"
                :only-title="false"
            />
            <InformationCard
                link="/information/hot"
                class="flex-1"
                header="热门资讯"
                :data="pageData.hot"
                :only-title="false"
                image-size="mini"
                :show-author="false"
                :show-desc="false"
                :show-click="false"
                :border="false"
                :title-line="2"
            />
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus'
import { getIndex } from '@/api/shop'
import { useAppStore } from '~~/stores/app'
const appStore = useAppStore()
const { data: pageData } = await useAsyncData(() => getIndex(), {
    default: () => ({
        all: [],
        hot: [],
        new: [],
        page: {}
    })
})

const getSwiperData = computed(() => {
    try {
        const data = JSON.parse(pageData.value.page.data)
        console.log(data)
        return data.find((item) => item.name === 'pc-banner')?.content
    } catch (error) {
        return {}
    }
})
const showList = computed(() => {
    return (
        getSwiperData.value?.data ||
        []
    )
})

</script>
<style lang="scss" scoped></style>
