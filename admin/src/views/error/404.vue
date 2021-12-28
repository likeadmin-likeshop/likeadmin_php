<template>
    <div class="error404">
        <div>
            <img src="./images/404.png" alt="" />
            <div class="lg lighter m-t-30 m-b-30">
                哎呀，出错了！您访问的页面不存在…
            </div>
            <el-button type="primary" size="small" @click="$router.go(-1)">
                {{ second }} 秒后返回上一页
            </el-button>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onUnmounted, ref } from 'vue'
import { useRouter } from 'vue-router'
export default defineComponent({
    setup() {
        let timer: any = null
        const second = ref(5)
        const router = useRouter()
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
            second,
        }
    },
})
</script>
<style lang="scss" scoped>
.error404 {
    text-align: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 232px;
    }
    .el-button {
        width: 176px;
    }
}
</style>

