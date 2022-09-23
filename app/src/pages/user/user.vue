<template>
    <view class="user">
        <view v-for="(item, index) in state.pages" :key="index">
            <template v-if="item.name == 'user-info'">
                <w-user-info
                    :content="item.content"
                    :styles="item.styles"
                    :user="userInfo"
                    :is-login="isLogin"
                />
            </template>
            <template v-if="item.name == 'my-service'">
                <w-my-service :content="item.content" :styles="item.styles" />
            </template>
            <template v-if="item.name == 'user-banner'">
                <w-user-banner :content="item.content" :styles="item.styles" />
            </template>
        </view>
        <tabbar />
    </view>
</template>

<script setup lang="ts">
import { getDecorate } from '@/api/shop'
import { useUserStore } from '@/stores/user'
import { onShow } from '@dcloudio/uni-app'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'
const state = reactive<{
    pages: any[]
}>({
    pages: []
})
const getData = async () => {
    const data = await getDecorate({ id: 2 })
    state.pages = JSON.parse(data.data)
}
const userStore = useUserStore()
const { userInfo, isLogin } = storeToRefs(userStore)
onShow(() => {
    userStore.getUser()
})
getData()
</script>

<style></style>
