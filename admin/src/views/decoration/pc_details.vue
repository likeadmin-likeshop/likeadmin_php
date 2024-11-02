<template>
    <div class="decoration-pages min-w-[1100px]">
        <el-card shadow="never" class="!border-none !rounded-none !bg-primary">
            <div class="flex justify-between w-full">
                <el-button
                    link
                    type="primary"
                    :icon="ArrowLeft"
                    style="color: #fff"
                    @click="handleBack"
                >
                    返回
                </el-button>
                <el-button v-perms="['decorate:pages:save']" @click="setData"> 保存 </el-button>
            </div>
        </el-card>
        <div class="flex-1 h-full">
            <preview-pc v-model="selectWidgetIndex" :pageData="getPageData" />
        </div>
    </div>
</template>
<script lang="ts" setup name="decorationPc">
import { ArrowLeft } from '@element-plus/icons-vue'

import { getDecoratePages, setDecoratePages } from '@/api/decoration'
import feedback from '@/utils/feedback'

import PreviewPc from './component/pages/preview-pc.vue'

const router = useRouter()

enum pagesTypeEnum {
    HOME = '4'
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

const handleBack = async () => {
    await feedback.confirm('确定离开此页面？系统可能不会保存您所做的更改。')
    router.back()
}

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
    min-height: calc(100vh);
    @apply flex flex-col;
}
</style>
