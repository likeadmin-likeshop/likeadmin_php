<template>
    <div class="error">
        <div>
            <slot name="content">
                <div class="error-code">{{ code }}</div>
            </slot>
            <div class="text-lg text-tx-secondary mt-7 mb-7">{{ title }}</div>
            <el-button v-if="showBtn" type="primary" @click="router.go(-1)">
                {{ second }} 秒后返回上一页
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
    code: String,
    title: String,
    showBtn: {
        type: Boolean,
        default: true
    }
})
let timer: any = null
const second = ref(5)
const router = useRouter()
props.showBtn &&
    (timer = setInterval(() => {
        if (second.value === 0) {
            clearInterval(timer)
            router.go(-1)
        } else {
            second.value--
        }
    }, 1000))
onUnmounted(() => {
    timer && clearInterval(timer)
})
</script>
<style lang="scss" scoped>
.error {
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    .error-code {
        @apply text-primary;
        font-size: 150px;
    }
    .el-button {
        width: 176px;
    }
}
</style>
