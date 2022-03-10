<template>
    <div class="error">
        <div>
            <div class="error-code">{{ code }}</div>
            <div class="lg lighter m-t-30 m-b-30">
                {{ title }}
            </div>
            <el-button type="primary" size="small" @click="$router.go(-1)">
                {{ second }} 秒后返回上一页
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { useAdmin } from '@/core/hooks/app'
import { defineComponent, onUnmounted, ref } from 'vue'
export default defineComponent({
    props: {
        code: Number,
        title: String
    },
    setup() {
        let timer: any = null
        const second = ref(5)
        const { router } = useAdmin()
        timer = setInterval(() => {
            if (second.value === 0) {
                clearInterval(timer)
                router.go(-1)
            } else {
                second.value--
            }
        }, 1000)
        onUnmounted(() => {
            clearInterval(timer)
        })

        return {
            second
        }
    }
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
        color: $color-primary;
        font-size: 150px;
    }
    .el-button {
        width: 176px;
    }
}
</style>
