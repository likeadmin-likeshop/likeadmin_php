<template>
    <div class="decoration-pages min-w-[1100px]">
        <div class="flex flex-1 h-full justify-between">
            <el-card
                shadow="never"
                class="!border-none flex scroll-view-content"
                :body-style="{ 'padding-right': 0 }"
            >
                <Menu v-model="activeMenu" :menus="menus" />
            </el-card>

            <preview
                class="flex-1 scroll-view-content"
                v-model="selectWidgetIndex"
                @updatePageData="updatePageData"
                :pageData="getPageData"
                :pageMeta="getPageMeta"
            />

            <attr-setting
                class="w-[560px] scroll-view-content"
                :widget="getSelectWidget"
                @update:content="updateContent"
            />
        </div>
        <footer-btns class="mt-4" :fixed="false" v-perms="['decorate:pages:save']">
            <el-button type="primary" @click="setData">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup name="decorationPages">
import { getDecoratePages, setDecoratePages } from '@/api/decoration'
import { getNonDuplicateID } from '@/utils/util'

import AttrSetting from '../component/pages/attr-setting.vue'
import Menu from '../component/pages/menu.vue'
import Preview from '../component/pages/preview.vue'
import widgets from '../component/widgets'

enum pagesTypeEnum {
    HOME = '1',
    USER = '2',
    SERVICE = '3'
}

const updatePageData = (value: any) => {
    menus[activeMenu.value].pageData = [...value]
}

const generatePageData = (widgetNames: string[]) => {
    return widgetNames.map((widgetName) => {
        const options = {
            id: getNonDuplicateID(),
            ...(widgets[widgetName]?.options() || {})
        }
        return options
    })
}

const updateContent = (content: any) => {
    if (menus[activeMenu.value]?.pageData) {
        menus[activeMenu.value].pageData[selectWidgetIndex.value].content = content
    }
}

const menus: Record<
    string,
    {
        id: number
        name: string
        pageMeta?: any
        pageData: any[]
    }
> = reactive({
    [pagesTypeEnum.HOME]: {
        id: 1,
        type: 1,
        name: '首页装修',
        pageMeta: generatePageData(['page-meta']),
        pageData: generatePageData(['search', 'banner', 'nav', 'news'])
    },
    [pagesTypeEnum.USER]: {
        id: 2,
        type: 2,
        name: '个人中心',
        pageMeta: generatePageData(['page-meta']),
        pageData: generatePageData(['user-info', 'my-service', 'user-banner'])
    },
    [pagesTypeEnum.SERVICE]: {
        id: 3,
        type: 3,
        name: '客服设置',
        pageMeta: null,
        pageData: generatePageData(['customer-service'])
    }
})

const activeMenu = ref<string>('1')
const selectWidgetIndex = ref<number>(-1)
const getPageData = computed(() => {
    return menus[activeMenu.value]?.pageData ?? []
})
const getPageMeta = computed(() => {
    return menus[activeMenu.value]?.pageMeta ?? null
})
const getSelectWidget = computed(() => {
    if (selectWidgetIndex.value === -1) {
        return menus[activeMenu.value]?.pageMeta[0] ?? ''
    } else {
        return menus[activeMenu.value]?.pageData[selectWidgetIndex.value] ?? ''
    }
})

const getData = async () => {
    const data = await getDecoratePages({ id: activeMenu.value })
    menus[String(data.id)].pageData = JSON.parse(data.data)
    menus[String(data.id)].pageMeta = data?.meta ? JSON.parse(data?.meta) : null
}

const setData = async () => {
    const data = menus[activeMenu.value]
    await setDecoratePages({
        ...data,
        data: JSON.stringify(data.pageData),
        meta: data?.pageMeta ? JSON.stringify(data?.pageMeta) : null
    })
    getData()
}
watch(
    activeMenu,
    () => {
        selectWidgetIndex.value = getPageData.value.findIndex((item) => !item.disabled)
        getData()
    },
    {
        immediate: true
    }
)
</script>
<style lang="scss" scoped>
$scroll-height: calc(100vh - var(--navbar-height) - 74px);
.decoration-pages {
    height: $scroll-height;
    @apply flex flex-col;
    .scroll-view-content {
        height: calc($scroll-height - 60px);
    }
}
</style>
