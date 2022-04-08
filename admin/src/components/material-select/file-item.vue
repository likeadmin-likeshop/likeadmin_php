
<template>
    <div>
        <del-wrap @close="$emit('close')">
            <div
                class="file-item"
                :style="{ height: fileSize, width: fileSize }"
            >
                <el-image
                    class="image"
                    v-if="type.type == 'image'"
                    fit="contain"
                    :src="uri"
                ></el-image>
                <video
                    class="video"
                    v-else-if="type.type == 'video'"
                    :src="uri"
                ></video>
                <slot></slot>
            </div>
        </del-wrap>
    </div>
</template>


<script lang="ts">
import DelWrap from '@/components/del-wrap/index.vue'
import { defineComponent, inject } from 'vue'
export default defineComponent({
    components: {
        DelWrap,
    },
    props: {
        // 图片地址
        uri: {
            type: String,
        },
        // 图片尺寸
        fileSize: {
            type: String,
            default: '100px',
        },
    },
    emits: ['close'],
    setup() {
        const type = inject<any>('type')
        return {
            type
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
    border-radius: 4px;
    overflow: hidden;
    .image,
    .video {
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
    }
}
</style>
