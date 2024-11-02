<template>
    <div class="decoration-tabbar">
        <div class="flex-1 min-h-0 w-full">
            <div class="h-full">
                <ElScrollbar>
                    <div class="flex min-w-[900px] scroll-view-content">
                        <el-card
                            shadow="never"
                            class="!border-none flex"
                            :body-style="{ 'padding-right': 0 }"
                        >
                            <Menu class="!h-full flex-none" v-model="activeMenu" :menus="menus" />
                        </el-card>
                        <div class="flex-1 pages-preview-box">
                            <div class="pages-preview mx-[30px]">
                                <el-scrollbar height="100%">
                                    <component
                                        :is="currentTab.component?.content"
                                        v-bind="currentTab.data"
                                    />
                                </el-scrollbar>
                            </div>
                        </div>
                        <el-scrollbar class="attr-setting flex-none">
                            <div class="px-5 pb-5">
                                <component
                                    :is="currentTab.component?.attr"
                                    v-model="currentTab.data"
                                />
                            </div>
                        </el-scrollbar>
                    </div>
                </ElScrollbar>
            </div>
        </div>

        <footer-btns :fixed="true" v-perms="['decorate:tabbar:save']">
            <el-button type="primary" @click="setData">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup name="decorationTabbar">
import { markRaw } from 'vue'

import { getDecorateTabbar, setDecorateTabbar } from '@/api/decoration'

import Menu from './component/pages/menu.vue'
import mobileTab from './component/tabbar/mobile'
// import pcTab from './component/tabbar/pc'

enum ClientTypeEnum {
    MOBILE = '1',
    PC = '2'
}

const activeMenu = ref(ClientTypeEnum.MOBILE)
const menus: Record<
    string,
    {
        id: number
        name: string
        type: number
        data: any
        component: any
    }
> = reactive({
    [ClientTypeEnum.MOBILE]: {
        id: 1,
        type: 1,
        name: '移动端导航栏',
        data: {
            style: {
                default_color: '',
                selected_color: ''
            },
            list: []
        },
        component: markRaw(mobileTab)
    }
})
const currentTab = computed(() => {
    return menus[activeMenu.value]
})
const getData = async () => {
    const data = await getDecorateTabbar({
        type: activeMenu.value
    })
    menus['1'].data = data
}
const setData = async () => {
    const { data } = currentTab.value

    await setDecorateTabbar({
        ...data
    })
    getData()
}

watch(
    activeMenu,
    () => {
        getData()
    },
    {
        immediate: true
    }
)
</script>
<style lang="scss" scoped>
$scroll-height: calc(100vh - var(--navbar-height) - 74px);
.decoration-tabbar {
    height: $scroll-height;
    width: 100%;
    @apply flex flex-col;
    .scroll-view-content {
        height: calc($scroll-height - 60px);
    }

    .pages-preview-box {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        height: 100%;

        .pages-preview {
            background-color: #ffffff;
            width: 360px;
            height: 615px;
            color: #333;
            position: relative;
        }
    }

    .nav-item {
        &:hover {
            .drag-move {
                display: block;
            }
        }
    }

    .attr-setting {
        width: 450px;
        height: 100%;
    }
}
</style>
