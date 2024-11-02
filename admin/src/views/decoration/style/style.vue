<template>
    <el-card shadow="never" class="!border-none">
        <div class="mt-[-10px]">
            <el-tabs v-model="currentTabIndex">
                <el-tab-pane
                    v-for="(item, index) in tabsList"
                    :key="item.id"
                    :label="item.name"
                    :name="index"
                >
                    <component :is="item.component" v-model="item.data" />
                </el-tab-pane>
            </el-tabs>
        </div>
    </el-card>
    <footer-btns class="mt-4" :fixed="true">
        <el-button type="primary" @click="setData">保存</el-button>
    </footer-btns>
</template>
<script setup lang="ts">
import { markRaw } from 'vue'

import { getDecoratePages, setDecoratePages } from '@/api/decoration'

import MobileStyle from './components/mobile-style.vue'

const currentTabIndex = ref(0)
const tabsList = ref([
    {
        name: '移动端',
        id: 5,
        component: markRaw(MobileStyle),
        data: {
            themeColorId: 1,
            topTextColor: 'white',
            navigationBarColor: '',
            themeColor1: '',
            themeColor2: '',
            buttonColor: 'white'
        }
    }
])
const currentTab = computed(() => tabsList.value[currentTabIndex.value] || {})
//获取数据
const getData = async () => {
    const res = await getDecoratePages({ id: currentTab.value.id })
    currentTab.value.data = JSON.parse(res.data)
}

//保存数据
const setData = async () => {
    await setDecoratePages({
        id: currentTab.value.id,
        type: currentTab.value.id,
        data: JSON.stringify(currentTab.value.data)
    })
    getData()
}

//初始化数据
onMounted(async () => {
    await getData()
})
</script>
