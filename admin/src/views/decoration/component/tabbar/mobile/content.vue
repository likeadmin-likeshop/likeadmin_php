<template>
    <div class="tabbar flex">
        <template v-for="(item, index) in showTabbarList" :key="index">
            <div
                class="tabbar-item flex flex-col justify-center items-center flex-1"
                :style="{ color: style.default_color }"
            >
                <decoration-img width="22px" height="22px" :src="item.unselected" fit="cover" />
                <div class="leading-3 text-[12px] mt-[4px]">
                    {{ item.name }}
                </div>
            </div>
        </template>
    </div>
</template>
<script lang="ts" setup>
import type { PropType } from 'vue'

import DecorationImg from '../../decoration-img.vue'

const props = defineProps({
    style: {
        type: Object,
        default: () => ({})
    },
    list: {
        type: Array as PropType<any[]>,
        default: () => []
    }
})

const showTabbarList = computed(() => {
    return props.list?.filter((tab: any) => tab.is_show == 1) || []
})
</script>
<style lang="scss" scoped>
.tabbar {
    position: absolute;
    height: 50px;
    background-color: #fff;
    bottom: 0;
    width: 100%;
    border: 2px solid var(--el-color-primary);
}
</style>
