<template>
    <view>
        <u-popup v-model="showPopup" mode="bottom" border-radius="14" :mask-close-able="false">
            <view class="h-[1000rpx] p-[40rpx]">
                <view class="flex items-center">
                    <image
                        class="w-[100rpx] h-[100rpx] rounded"
                        mode="heightFix"
                        :src="logo"
                    ></image>
                    <text class="text-3xl ml-5 font-bold">{{ title }}</text>
                </view>
                <view class="mt-5 text-muted">
                    建议使用您的微信头像和昵称，以便获得更好的体验
                </view>
                <view class="mt-[30rpx]">
                    <form @submit="handleSubmit">
                        <u-form-item required label="头像" :labelWidth="120">
                            <view class="flex-1">
                                <avatar-upload v-model="avatar"></avatar-upload>
                            </view>
                        </u-form-item>
                        <u-form-item required label="昵称" :labelWidth="120">
                            <input
                                class="flex-1 h-[60rpx]"
                                name="nickname"
                                type="nickname"
                                placeholder="请输入昵称"
                            />
                        </u-form-item>
                        <view class="mt-[80rpx]">
                            <button
                                class="bg-primary rounded-full text-white text-lg h-[80rpx] leading-[80rpx]"
                                hover-class="none"
                                form-type="submit"
                            >
                                确定
                            </button>
                        </view>

                        <view class="flex justify-center mt-[60rpx]">
                            <view class="text-muted" @click="showPopup = false">暂不登录</view>
                        </view>
                    </form>
                </view>
            </view>
        </u-popup>
    </view>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
const props = defineProps({
    show: {
        type: Boolean
    },
    logo: {
        type: String
    },
    title: {
        type: String
    }
})
const emit = defineEmits<{
    (event: 'update:show', show: boolean): void
    (event: 'update', value: any): void
}>()

const showPopup = computed({
    get() {
        return props.show
    },
    set(val) {
        emit('update:show', val)
    }
})

const avatar = ref()

const handleSubmit = (e: any) => {
    const { nickname } = e.detail.value
    if (!avatar.value)
        return uni.$u.toast({
            title: '请添加头像'
        })
    if (!nickname)
        return uni.$u.toast({
            title: '请输入昵称'
        })
    emit('update', {
        avatar: avatar.value,
        nickname
    })
}
</script>

<style lang="scss" scoped></style>
