<template>
    <div class="flex flex-col justify-center items-center">
        <div class="text-tx-regular mb-4">您还未登录，请先登录</div>
        <ElButton @click="toLogin">登录</ElButton>
    </div>
</template>
<script lang="ts" setup>
import { useAccount, PopupTypeEnum } from './useAccount'
import { ElButton } from 'element-plus'
const { setPopupType, toggleShowPopup } = useAccount()
const toLogin = () => {
    setPopupType(PopupTypeEnum.LOGIN)
    toggleShowPopup(true)
}
</script>

<style lang="scss" scoped></style>
