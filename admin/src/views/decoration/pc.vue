<template>
    <div class="decoration-pages min-w-[1100px]">
        <el-card shadow="never" class="!border-none flex-1 flex" :body-style="{ flex: 1 }">
            <div class="flex h-full items-start">
                <Menu v-model="activeMenu" :menus="menus" />
                <preview-pc class="mx-4" v-model="selectWidgetIndex" :pageData="getPageData" />
                <attr-setting class="flex-1" :widget="getSelectWidget" type="pc" />
            </div>
        </el-card>
        <footer-btns class="mt-4" :fixed="false" v-perms="['decorate:pages:save']">
            <el-button type="primary" @click="setData">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup name="decorationPc">
import Menu from './component/pages/menu.vue'
import PreviewPc from './component/pages/preview-pc.vue'
import AttrSetting from './component/pages/attr-setting.vue'
import widgets from './component/widgets'
import { getDecoratePages, setDecoratePages } from '@/api/decoration'
import { getNonDuplicateID } from '@/utils/util'
enum pagesTypeEnum {
    HOME = '4'
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

const menus: Record<
    string,
    {
        id: number
        name: string
        pageData: any[]
    }
> = reactive({
    [pagesTypeEnum.HOME]: {
        id: 4,
        type: 4,
        name: '首页装修',
        pageData: []
    }
})

const activeMenu = ref('4')
const selectWidgetIndex = ref(0)
const getPageData = computed(() => {
    return menus[activeMenu.value]?.pageData ?? []
})
const getSelectWidget = computed(() => {
    return menus[activeMenu.value]?.pageData[selectWidgetIndex.value] ?? ''
})

const getData = async () => {
    const data = await getDecoratePages({ id: activeMenu.value })
    menus[String(data.id)].pageData = JSON.parse(data.data)
    selectWidgetIndex.value = getPageData.value.findIndex((item) => !item.disabled)
}

const setData = async () => {
    await setDecoratePages({
        ...menus[activeMenu.value],
        data: JSON.stringify(menus[activeMenu.value].pageData)
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
.decoration-pages {
    min-height: calc(100vh - var(--navbar-height) - 80px);
    @apply flex flex-col;
}
</style>
