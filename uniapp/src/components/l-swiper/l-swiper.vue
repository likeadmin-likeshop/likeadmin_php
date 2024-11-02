<template>
    <u-swiper
        v-if="lists.length"
        :list="lists"
        :mode="mode"
        :height="height"
        :effect3d="effect3d"
        :indicator-pos="indicatorPos"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
        :borderRadius="borderRadius"
        :current="current"
        :name="name"
        :bg-color="bgColor"
        @click="handleClick"
        @change="handleChange"
    >
    </u-swiper>
</template>

<script setup lang="ts">
import {useAppStore} from "@/stores/app";
import {navigateTo, navigateToMiniProgram, LinkTypeEnum} from "@/utils/util";
import {watchEffect, computed} from "vue";
import {useRouter} from "uniapp-router-next";

const emit = defineEmits(["change"]);
const props = withDefaults(
    defineProps<{
        content?: any; // 轮播图数据
        mode?: string; // 指示器模式 rect / dot / number / none
        height?: string; // 轮播图组件高度
        indicatorPos?: string; // 指示器的位置 topLeft / topCenter / topRight / bottomLeft / bottomRight
        effect3d?: boolean; // 是否开启3D效果
        autoplay?: boolean; // 是否自动播放
        interval?: number | string; // 自动轮播时间间隔，单位ms
        duration?: number | string; // 切换一张轮播图所需的时间，单位ms
        circular?: boolean; // 是否衔接播放
        current?: number; // 默认显示第几项
        name?: string; // 显示的属性
        borderRadius?: string; //轮播图圆角值，单位rpx
        bgColor?: string; // 背景颜色
    }>(),
    {
        content: {
            data: [],
        },
        mode: "round",
        indicatorPos: "bottomCenter",
        height: "340",
        effect3d: false,
        autoplay: true,
        interval: "2500",
        duration: 300,
        circular: true,
        current: 0,
        name: "image",
        borderRadius: "0",
        bgColor: "#f3f4f6",
    }
);

const {getImageUrl} = useAppStore();

watchEffect(() => {
    try {
        const content = props?.content;
        const len = content?.data?.length;
        if (!len) return;
        for (let i = 0; i < len; i++) {
            const item = content.data[i];
            item.image = getImageUrl(item.image);
        }
        emit("change", 0);
    } catch (error) {
        //TODO handle the exception
        console.log("轮播图数据错误", error);
    }
});

const lists = computed(() => props.content.data || []);
const router = useRouter();

const handleClick = (index: number) => {
    const link = props.content.data[index]?.link;
    if (!link) return
    navigateTo(link);
};

const handleChange = (index: number) => {
    emit("change", index);
};
</script>

<style></style>
