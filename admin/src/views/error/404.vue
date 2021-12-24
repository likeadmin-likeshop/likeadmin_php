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

<script>
export default {
    data() {
        return {
            timer: 0,
            second: 5,
        }
    },

    mounted() {
        this.timer = setInterval(() => {
            if (this.second === 0) this.$router.go(-1)
            else this.second--
        }, 1000)
    },
    beforeUnmount() {
        clearInterval(this.timer)
    },
}
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

