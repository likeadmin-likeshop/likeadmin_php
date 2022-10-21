<template>
    <div class="px-[30px] py-5 user-info">
        <div class="border-b border-br pb-5">
            <span class="text-2xl font-medium">账号安全</span>
        </div>
        <div class="mt-5">
            <div class="info-item leading-10 flex justify-between">
                <div class="item-name">登录密码</div>
                <div>
                    <ElButton link type="primary">
                        点击修改
                        <Icon name="el-icon-ArrowRight" />
                    </ElButton>
                </div>
            </div>
            <div class="info-item leading-10 flex justify-between">
                <div class="item-name">绑定微信</div>
                <div>
                    {{ userInfo.has_auth ? '已绑定' : '未绑定' }}
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ElAvatar, ElButton } from 'element-plus'
import { getUserInfo } from '@/api/user'
import CropperUploaad from '@/components/cropper-upload/index.vue'
import PopoverInput from '@/components/popover-input/index.vue'
const { data: userInfo } = await useAsyncData(() => getUserInfo())
definePageMeta({
    module: 'personal',
    auth: true
})
</script>
<style lang="scss" scoped>
.user-info {
    .info-item {
        display: flex;
        align-items: center;
        border-bottom: 1px solid var(--el-border-color);
        padding: 10px 0;
        .item-name {
            width: 80px;
            color: var(--el-text-color-regular);
        }
    }
}
</style>
