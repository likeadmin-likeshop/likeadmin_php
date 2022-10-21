<template>
    <div class="px-[30px] py-5 user-info">
        <div class="border-b border-br pb-5">
            <span class="text-2xl font-medium">个人信息</span>
        </div>
        <div class="mt-5">
            <div class="info-item">
                <div class="item-name">头像</div>
                <div class="avatar">
                    <ElAvatar :size="60" :src="userInfo.avatar"></ElAvatar>
                    <div class="change-btn">
                        <CropperUploaad>
                            <span class="text-xs text-white">修改</span>
                        </CropperUploaad>
                    </div>
                </div>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">账号</div>
                <div>
                    {{ userInfo.account }}
                    <PopoverInput class="inline-block">
                        <ElButton link>
                            <Icon name="el-icon-Edit" :size="16" />
                        </ElButton>
                    </PopoverInput>
                </div>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">昵称</div>
                <div>
                    {{ userInfo.nickname }}
                    <PopoverInput class="inline-block">
                        <ElButton link>
                            <Icon name="el-icon-Edit" :size="16" />
                        </ElButton>
                    </PopoverInput>
                </div>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">性别</div>
                <div>
                    <span>
                        {{ userInfo.sex }}
                    </span>
                    <PopoverInput class="inline-block">
                        <ElButton link>
                            <Icon name="el-icon-Edit" :size="16" />
                        </ElButton>
                    </PopoverInput>
                </div>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">手机号</div>
                <div>
                    {{ userInfo.mobile }}
                    <ElButton link type="primary"> 更换手机号 </ElButton>
                </div>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">注册时间</div>
                <div>
                    {{ userInfo.create_time }}
                </div>
            </div>
        </div>
        <div class="mt-[60px] flex justify-center">
            <ElButton type="primary">退出登录</ElButton>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ElAvatar, ElButton } from 'element-plus'
import { getUserInfo, userEdit } from '@/api/user'
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
    .avatar {
        @apply relative flex cursor-pointer;
        .change-btn {
            display: none;
            @apply absolute bg-[rgba(0,0,0,0.5)]  w-full text-center bottom-0 rounded-b-full h-1/2;
        }
        &:hover {
            .change-btn {
                display: block;
            }
        }
    }
}
</style>
