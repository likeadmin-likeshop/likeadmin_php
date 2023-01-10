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
                        <CropperUpload
                            @change="setUserInfo($event, UserFieldEnum.AVATAR)"
                        >
                            <span class="text-xs text-white">修改</span>
                        </CropperUpload>
                    </div>
                </div>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">账号</div>
                <div>
                    {{ userInfo.account }}
                    <ClientOnly>
                        <PopoverInput
                            class="inline-block"
                            @confirm="
                                setUserInfo($event, UserFieldEnum.USERNAME)
                            "
                            :limit="30"
                            show-limit
                        >
                            <ElButton link>
                                <Icon name="el-icon-Edit" :size="16" />
                            </ElButton>
                        </PopoverInput>
                    </ClientOnly>
                </div>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">昵称</div>
                <div>
                    {{ userInfo.nickname }}
                    <ClientOnly>
                        <PopoverInput
                            class="inline-block"
                            @confirm="
                                setUserInfo($event, UserFieldEnum.NICKNAME)
                            "
                            :limit="30"
                            show-limit
                        >
                            <ElButton link>
                                <Icon name="el-icon-Edit" :size="16" />
                            </ElButton>
                        </PopoverInput>
                    </ClientOnly>
                </div>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">性别</div>
                <div>
                    <span>
                        {{ userInfo.sex }}
                    </span>
                    <ClientOnly>
                        <PopoverInput
                            class="inline-block"
                            type="select"
                            :teleported="false"
                            :options="[
                                {
                                    label: '未知',
                                    value: 0
                                },
                                {
                                    label: '男',
                                    value: 1
                                },
                                {
                                    label: '女',
                                    value: 2
                                }
                            ]"
                            @confirm="setUserInfo($event, UserFieldEnum.SEX)"
                        >
                            <ElButton link>
                                <Icon name="el-icon-Edit" :size="16" />
                            </ElButton>
                        </PopoverInput>
                    </ClientOnly>
                </div>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">手机号</div>
                <div v-if="userInfo.mobile">
                    {{ userInfo.mobile }}
                </div>

                <ElButton link type="primary" @click="changeMobile">
                    {{ userInfo.mobile ? '更换手机号' : '绑定手机号' }}
                </ElButton>
            </div>
            <div class="info-item leading-10">
                <div class="item-name">注册时间</div>
                <div>
                    {{ userInfo.create_time }}
                </div>
            </div>
        </div>
        <div class="mt-[60px] flex justify-center">
            <ElButton type="primary" @click="handleLogut">退出登录</ElButton>
        </div>
    </div>
</template>
<script lang="ts" setup>
import { ElAvatar, ElButton } from 'element-plus'
import { getUserInfo, userEdit } from '@/api/user'
import CropperUpload from '@/components/cropper-upload/index.vue'
import PopoverInput from '@/components/popover-input/index.vue'
import {
    useAccount,
    PopupTypeEnum
} from '@/layouts/components/account/useAccount'
import { logout } from '~~/api/account'
import feedback from '~~/utils/feedback'
import { useUserStore } from '~~/stores/user'
const { setPopupType, toggleShowPopup, showPopup } = useAccount()
const userStore = useUserStore()
// 用户资料
enum UserFieldEnum {
    NONE = '',
    AVATAR = 'avatar',
    USERNAME = 'account',
    NICKNAME = 'nickname',
    SEX = 'sex'
}

const { data: userInfo, refresh } = await useAsyncData(() => getUserInfo(), {
    initialCache: false
})
const setUserInfo = async (
    value: string,
    type: UserFieldEnum
): Promise<void> => {
    await userEdit({
        field: type,
        value: value
    })
    refresh()
}

const changeMobile = () => {
    setPopupType(PopupTypeEnum.BIND_MOBILE)
    toggleShowPopup(true)
}

watch(showPopup, (value) => {
    if (!value) {
        refresh()
    }
})

const handleLogut = async () => {
    await feedback.confirm('确定退出登录吗？')
    await logout()
    userStore.logout()
}

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
            height: 50%;
            line-height: 30px;
            @apply absolute bg-[rgba(0,0,0,0.5)]  w-full text-center bottom-0 rounded-b-full;
        }
        &:hover {
            .change-btn {
                display: block;
            }
        }
    }
}
</style>
