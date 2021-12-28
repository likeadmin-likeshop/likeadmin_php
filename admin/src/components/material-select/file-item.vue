
<template>
    <del-wrap>
        <div class="file-item">
            <el-image
                class="image"
                :style="{ height: fileSize, width: fileSize }"
                v-if="type == 'image'"
                fit="contain"
                :src="item.uri"
            ></el-image>
            <video
                class="video"
                :style="{ height: fileSize, width: fileSize }"
                v-else-if="type == 'video'"
                :src="item.uri"
            ></video>
            <slot></slot>
        </div>
    </del-wrap>
</template>


<script lang="ts">
import DelWrap from '@/components/del-wrap/index.vue'
import { defineComponent, inject } from 'vue'
export default defineComponent({
    components: {
        DelWrap
    },
    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
    },
    setup() {
        const fileSize = inject('fileSize')
        const type = inject('type')
        return {
            fileSize,
            type,
        }
    },
})
</script>

<style scoped lang="scss">
.file-item {
    background-color: $border-color-light;
    border: 1px solid $border-color-light;
    box-sizing: border-box;
    position: relative;
    .image,
    .video {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
}
</style>
