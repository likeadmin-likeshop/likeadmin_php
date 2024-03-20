<template>
    <!-- #ifndef H5 -->
    <u-sticky h5-nav-height="0" bg-color="transparent">
        <u-navbar
            :class="{ 'fixed top-0 z-10': isLargeScreen }"
            :is-back="false"
            :is-fixed="true"
            :title="metaData.title"
            :custom-title="metaData.title_type == 2"
            :border-bottom="false"
            :title-bold="true"
            :background="{ background: 'rgba(256,256, 256, 0)' }"
            :title-color="percent > 0.5 ? '#000' : metaData.text_color == 1 ? '#fff' : '#000'"
        >
            <template #default>
                <navigator
                    url="/pages/search/search"
                    class="mini-search"
                    hover-class="none"
                    :style="{ opacity: isLargeScreen ? 1 : percent }"
                >
                    <u-icon name="search"></u-icon>
                </navigator>
            </template>
            <template #title>
                <image
                    class="!h-[54rpx]"
                    :src="metaData.title_img"
                    mode="widthFix"
                ></image>
            </template>
        </u-navbar>
    </u-sticky>
    <!-- #endif -->
    <navigator
        v-if="!isLargeScreen"
        url="/pages/search/search"
        class="px-[24rpx] mt-[24rpx] mb-[30rpx]"
        :style="{ opacity: 1 - percent }"
        hover-class="none"
    >
        <u-search
            placeholder="请输入关键词搜索"
            :height="72"
            :disabled="true"
            :show-action="false"
            bgColor="#ffffff"
        ></u-search>
    </navigator>
</template>

<script setup lang="ts">
import {computed} from "vue";

const props = defineProps({
    pageMeta: {
        type: Object,
        default: () => []
    },
    content: {
        type: Object,
        default: () => ({})
    },
    styles: {
        type: Object,
        default: () => ({})
    },
    isLargeScreen: {
        type: Boolean
    },
    percent: {
        type: Number
    }
})

const metaData: any = computed(() => {
    return props.pageMeta[0].content
})
</script>

<style scoped>
.mini-search {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60rpx;
    height: 60rpx;
    margin-left: 20rpx;
    background-color: #ffffff;
    border-radius: 50%;
    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
}
</style>
