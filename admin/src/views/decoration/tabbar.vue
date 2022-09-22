<template>
    <div class="decoration-tabbar min-w-[800px]">
        <el-card shadow="never" class="!border-none flex-1" :body-style="{ height: '100%' }">
            <div class="flex h-full items-start">
                <div class="pages-preview mx-[30px]">
                    <div class="tabbar flex">
                        <div
                            class="tabbar-item flex flex-col justify-center items-center flex-1"
                            v-for="(item, index) in tabbar.list"
                            :key="index"
                            :style="{ color: tabbar.style.defaultColor }"
                        >
                            <img class="w-[22px] h-[22px]" :src="item.unselected" alt="" />
                            <div class="leading-3 text-[12px] mt-[4px]">{{ item.name }}</div>
                        </div>
                    </div>
                </div>
                <div class="flex-1">
                    <div
                        class="title flex items-center before:w-[3px] before:h-[14px] before:block before:bg-primary before:mr-2"
                    >
                        底部导航设置
                        <span class="form-tips ml-[10px] !mt-0">
                            至少添加2个导航，最多添加5个导航
                        </span>
                    </div>
                    <el-form label-width="70px">
                        <el-tabs model-value="content">
                            <el-tab-pane label="导航图片" name="content">
                                <div class="mb-[18px]">
                                    <draggable
                                        class="draggable"
                                        v-model="tabbar.list"
                                        animation="300"
                                        draggable=".draggable"
                                        :move="onMove"
                                    >
                                        <template v-slot:item="{ element, index }">
                                            <del-wrap
                                                @close="handleDelete(index)"
                                                class="max-w-[400px]"
                                                :class="{ draggable: index != 0 }"
                                            >
                                                <div class="bg-fill-light w-full p-4 mt-4">
                                                    <el-form-item label="导航图标">
                                                        <material-picker
                                                            v-model="element.unselected"
                                                            upload-class="bg-body"
                                                            size="60px"
                                                        >
                                                            <template #upload>
                                                                <div
                                                                    class="upload-btn w-[60px] h-[60px]"
                                                                >
                                                                    <icon
                                                                        name="el-icon-Plus"
                                                                        :size="16"
                                                                    />
                                                                    <span class="text-xs leading-5">
                                                                        未选中
                                                                    </span>
                                                                </div>
                                                            </template>
                                                        </material-picker>
                                                        <material-picker
                                                            v-model="element.selected"
                                                            upload-class="bg-body"
                                                            size="60px"
                                                        >
                                                            <template #upload>
                                                                <div
                                                                    class="upload-btn w-[60px] h-[60px]"
                                                                >
                                                                    <icon
                                                                        name="el-icon-Plus"
                                                                        :size="16"
                                                                    />
                                                                    <span class="text-xs leading-5">
                                                                        选中
                                                                    </span>
                                                                </div>
                                                            </template>
                                                        </material-picker>
                                                    </el-form-item>
                                                    <el-form-item label="导航名称">
                                                        <el-input
                                                            v-model="element.name"
                                                            placeholder="请输入名称"
                                                        />
                                                    </el-form-item>
                                                    <el-form-item label="链接地址">
                                                        <link-picker
                                                            v-model="element.link"
                                                            :disabled="index == 0"
                                                        />
                                                    </el-form-item>
                                                </div>
                                            </del-wrap>
                                        </template>
                                    </draggable>
                                </div>

                                <el-form-item v-if="tabbar.list?.length < max" label-width="0">
                                    <el-button type="primary" @click="handleAdd">
                                        添加导航
                                    </el-button>
                                </el-form-item>
                            </el-tab-pane>
                            <el-tab-pane label="样式设置" name="styles">
                                <el-form-item label="默认颜色">
                                    <color-picker
                                        class="max-w-[400px]"
                                        v-model="tabbar.style.defaultColor"
                                        default-color="#999999"
                                    />
                                </el-form-item>
                                <el-form-item label="选中颜色">
                                    <color-picker
                                        class="max-w-[400px]"
                                        v-model="tabbar.style.selectedColor"
                                        default-color="#4173ff"
                                    />
                                </el-form-item>
                            </el-tab-pane>
                        </el-tabs>
                    </el-form>
                </div>
            </div>
        </el-card>
        <footer-btns class="mt-4" :fixed="false" v-perms="['decorate:tabbar:save']">
            <el-button type="primary" @click="setData">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup name="decorationTabbar">
import { getDecorateTabbar, setDecorateTabbar } from '@/api/decoration'
import feedback from '@/utils/feedback'
import Draggable from 'vuedraggable'

const max = 5
const min = 2
const tabbar = reactive({
    style: {
        defaultColor: '',
        selectedColor: ''
    },
    list: [
        {
            name: '',
            selected: '',
            unselected: '',
            link: {}
        },
        {
            name: '',
            selected: '',
            unselected: '',
            link: {}
        }
    ]
})

const handleAdd = () => {
    if (tabbar.list?.length < max) {
        tabbar.list.push({
            name: '',
            selected: '',
            unselected: '',
            link: {}
        })
    } else {
        feedback.msgError(`最多添加${max}个`)
    }
}
const handleDelete = (index: number) => {
    if (tabbar.list?.length <= min) {
        return feedback.msgError(`最少保留${min}个`)
    }
    tabbar.list.splice(index, 1)
}

const onMove = (e: any) => {
    if (e.relatedContext.index == 0) {
        return false
    }
    return true
}

const getData = async () => {
    const data = await getDecorateTabbar()
    tabbar.list = data.list.map((item: any) => ({ ...item, link: JSON.parse(item.link) }))
    tabbar.style = data.style
}
const setData = async () => {
    await setDecorateTabbar(toRaw(tabbar))
    getData()
    feedback.msgSuccess('保存成功')
}
getData()
</script>
<style lang="scss" scoped>
.decoration-tabbar {
    min-height: calc(100vh - var(--navbar-height) - 80px);
    @apply flex flex-col;
    .pages-preview {
        background-color: #f7f7f7;
        width: 360px;
        height: 615px;
        color: #333;
        position: relative;
        .tabbar {
            position: absolute;
            height: 50px;
            background-color: #fff;
            bottom: 0;
            width: 100%;
            border: 2px solid var(--el-color-primary);
        }
    }
}
</style>
