<template>
    <div class="hot-search">
        <el-card class="!border-none" shadow="never">
            <el-form ref="formRef" :model="formData" label-width="100px">
                <el-form-item label="功能状态" style="margin-bottom: 0">
                    <div>
                        <el-radio-group v-model="formData.status">
                            <el-radio :value="1">开启</el-radio>
                            <el-radio :value="0">关闭</el-radio>
                        </el-radio-group>

                        <div class="form-tips">默认开启，关闭则前端不显示该功能</div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="!border-none mt-4" shadow="never">
            <div class="lg:flex">
                <div class="flex-1 min-w-0">
                    <el-button type="primary" class="mb-4" @click="handleAdd">添加</el-button>
                    <el-table size="large" :data="formData.data">
                        <el-table-column label="关键词" prop="describe" min-width="160">
                            <template #default="{ row }">
                                <el-input
                                    v-model="row.name"
                                    clearable
                                    placeholder="请输入关键字"
                                    show-word-limit
                                    maxlength="30"
                                />
                            </template>
                        </el-table-column>
                        <el-table-column label="排序" prop="describe" min-width="160">
                            <template #default="{ row }">
                                <el-input v-model="row.sort" type="number" />
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" min-width="80" fixed="right">
                            <template #default="{ $index }">
                                <el-button
                                    v-perms="['setting:storage:edit']"
                                    type="danger"
                                    link
                                    @click="handleDel($index)"
                                >
                                    删除
                                </el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="hot-search-phone mt-4 lg:mt-0 lg:ml-4 flex-none">
                    <div class="mb-4 text-center">- 热搜预览图 -</div>
                    <div class="hot-search-phone-content">
                        <!-- 搜索框 -->
                        <div class="search-com">
                            <div class="search-con flex items-center px-[15px]">
                                <icon name="el-icon-Search" :size="17" />
                                <span class="ml-[5px]">请输入关键词搜索</span>
                            </div>
                        </div>
                        <!-- 热门搜索 -->
                        <div class="hot-search-title">热门搜索</div>
                        <div class="hot-search-text">
                            <span v-for="(text, index) in list" :key="index">
                                {{ text.name }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>

        <footer-btns v-perms="['setting.hot_search/setConfig']">
            <el-button type="primary" @click="handleSave">保存</el-button>
        </footer-btns>
    </div>
</template>

<script setup lang="ts" name="search">
import type { Search } from '@/api/setting/search'
import { getSearch, setSearch } from '@/api/setting/search'

const formData = reactive<Search>({
    status: 1,
    data: []
})

const list = computed(() => {
    return formData.data.filter((text) => text.name).sort((v1, v2) => v2.sort - v1.sort)
})

// 获取登录注册数据
const getData = async () => {
    try {
        const data = await getSearch()
        for (const key in formData) {
            //@ts-ignore
            formData[key] = data[key]
        }
    } catch (error) {
        console.log('获取=>', error)
    }
}

const handleAdd = () => {
    formData.data.push({
        name: '',
        sort: 0
    })
}

const handleDel = (index: number) => {
    formData.data.splice(index, 1)
}

const handleSave = async () => {
    try {
        await setSearch(formData)
        getData()
    } catch (error) {
        console.log('保存=>', error)
    }
}

getData()
</script>

<style lang="scss" scoped>
.hot-search {
    .hot-search-phone {
        width: 300px;
        background-color: #fff;
        &-content {
            width: 100%;
            height: 530px;
            padding: 12px 12px;
            border-radius: 10px;
            border: 1px solid #e6e6e6;

            .search-com {
                .search-con {
                    height: 100%;
                    height: 36px;
                    border-radius: 36px;
                    background: #f4f4f4;
                    color: #999999;
                }
            }

            .hot-search-title {
                padding: 10px 0;
                font-size: 13px;
            }

            .hot-search-text {
                span {
                    font-size: 12px;
                    border-radius: 100px;
                    padding: 5px 10px;
                    margin: 0 6px 6px 0;
                    display: inline-block;
                    background-color: #f4f4f4;
                }
            }
        }
    }
}
</style>
