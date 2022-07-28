<template>
    <div class="navbar">
        <div class="flex-1 flex items-center">
            <icon
                class="mr-4 cursor-pointer"
                :name="`local-icon-${isCollapse ? 'close' : 'open'}`"
                :size="22"
                @click="toggleSidebar"
            />
            <icon
                class="mr-4 cursor-pointer"
                name="el-icon-RefreshRight"
                :size="20"
                @click="refreshView"
            />
            <div>
                <breadcrumb />
            </div>
        </div>
        <div class="flex items-center">
            <el-dropdown @command="handleCommand">
                <div class="flex items-center">
                    <el-avatar :size="34" :src="userInfo.avatar" />
                    <div class="ml-3 mr-1">{{ userInfo.name }}</div>
                    <icon name="el-icon-ArrowDown" />
                </div>

                <template #dropdown>
                    <el-dropdown-menu>
                        <router-link to="/user/setting">
                            <el-dropdown-item>个人设置</el-dropdown-item>
                        </router-link>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
            <icon class="ml-4 cursor-pointer" name="el-icon-Setting" @click="openSetting" />
        </div>
    </div>
</template>

<script setup lang="ts">
import useAppStore from '@/stores/modules/app'
import useUserStore from '@/stores/modules/user'
import useSettingStore from '@/stores/modules/setting'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()
const settingStore = useSettingStore()
const isCollapse = computed(() => appStore.sidebar.opened)

const userInfo = computed(() => userStore.userInfo)
// 折叠展开菜单
const toggleSidebar = () => {
    appStore.toggleSidebar()
}
// 刷新页面
const refreshView = () => {
    appStore.refreshView()
}

const handleCommand = (command: string) => {
    switch (command) {
        case 'logout':
            userStore.logout().then(() => {
                router.push('/login')
                userStore.resetLoginInfo()
            })
    }
}

const openSetting = () => {
    settingStore.setSetting({
        key: 'show',
        value: true
    })
}
</script>

<style lang="scss">
.navbar {
    height: var(--header-height);
    @apply flex items-center pl-4 pr-4 bg-body;
}
</style>
