
<template>
    <div class="material flex col-stretch" v-loading="pager.loading">
        <div class="material__left">
            <el-scrollbar class="ls-scrollbar" style="height: calc(100% - 40px)">
                <div class="material-left__content p-t-16 p-b-16">
                    <el-tree
                        ref="treeRefs"
                        node-key="id"
                        :data="cateLists"
                        empty-text
                        :highlight-current="true"
                        :expand-on-click-node="false"
                        icon-class="el-icon-arrow-right"
                        :current-node-key="cateId"
                        @node-click="currentChange"
                    >
                        <template v-slot="{ data }">
                            <div class="flex flex-1 flex-center" style="min-width: 0">
                                <img
                                    style="width: 20px; height: 16px"
                                    src="@/assets/images/icon_folder.png"
                                    class="m-r-10"
                                />
                                <span class="flex-1 line-1 m-r-10">
                                    {{
                                        data.name
                                    }}
                                </span>
                                <el-dropdown v-if="data.id > 0" :hide-on-click="false">
                                    <span class="muted m-r-10">···</span>
                                    <template #dropdown>
                                        <el-dropdown-menu>
                                            <div>
                                                <popover-input
                                                    type="text"
                                                    tips="分类名称"
                                                    @confirm="
                                                    handleEditCate(
                                                        $event,
                                                        data.id
                                                    )
                                                    "
                                                >
                                                    <el-dropdown-item>命名分组</el-dropdown-item>
                                                </popover-input>
                                            </div>
                                            <div
                                                @click="
                                                handleDeleteCate(data.id)
                                                "
                                            >
                                                <el-dropdown-item>删除分组</el-dropdown-item>
                                            </div>
                                        </el-dropdown-menu>
                                    </template>
                                </el-dropdown>
                            </div>
                        </template>
                    </el-tree>
                </div>
            </el-scrollbar>
            <div class="flex flex-center">
                <popover-input tips="分类名称" type="text" @confirm="handleAddCate">
                    <el-button>添加分组</el-button>
                </popover-input>
            </div>
        </div>
        <div class="material__center flex flex-col">
            <div class="operate-btn flex">
                <div class="flex-1 flex">
                    <upload
                        class="m-r-10"
                        :data="{ cid: cateId }"
                        :type="type"
                        :show-progress="true"
                        @change="refresh"
                    >
                        <el-button type="primary">本地上传</el-button>
                    </upload>
                    <popup
                        v-if="mode == 'page'"
                        class="m-r-10 inline"
                        content="确认删除后，本地或云存储图片也将同步删除，如图片已被使用，请谨慎操作！"
                        :disabled="!select.length"
                        @confirm="batchFileDelete()"
                    >
                        <template #trigger>
                            <el-button :disabled="!select.length">删除</el-button>
                        </template>
                    </popup>
                    <popup
                        v-if="mode == 'page'"
                        class="m-r-10 inline"
                        @confirm="batchFileMove"
                        :disabled="!select.length"
                        title="移动文件"
                    >
                        <template #trigger>
                            <el-button :disabled="!select.length">移动</el-button>
                        </template>

                        <div>
                            <span class="m-r-20">移动文件至</span>
                            <el-select v-model="moveId" placeholder="请选择">
                                <template v-for="item in cateLists" :key="item.id">
                                    <el-option
                                        v-if="item.id !== ''"
                                        :label="item.name"
                                        :value="item.id"
                                    ></el-option>
                                </template>
                            </el-select>
                        </div>
                    </popup>
                </div>
                <el-input
                    placeholder="请输入名称"
                    style="width: 280px"
                    v-model="fileParams.name"
                    @keyup.enter="refresh"
                >
                    <template #append>
                        <el-button :icon="Search" @click="refresh"></el-button>
                    </template>
                </el-input>
                <div class="flex col-center m-l-10">
                    <el-tooltip content="列表视图" placement="top">
                        <div
                            class="list-icon"
                            :class="{
                                select: listShowType == 'table'
                            }"
                            @click="listShowType = 'table'"
                        >
                            <icon name="el-icon-Fold" :size="18" />
                        </div>
                    </el-tooltip>
                    <el-tooltip content="平铺视图" placement="top">
                        <div
                            class="list-icon"
                            :class="{
                                select: listShowType == 'normal'
                            }"
                            @click="listShowType = 'normal'"
                        >
                            <icon name="el-icon-Menu" :size="18" />
                        </div>
                    </el-tooltip>
                </div>
            </div>
            <div class="m-t-10" v-if="mode == 'page'">
                <el-checkbox
                    :disabled="!pager.lists.length"
                    v-model="isCheckAll"
                    @change="selectAll"
                    :indeterminate="isIndeterminate"
                >当页全选</el-checkbox>
            </div>
            <div class="material-center__content flex flex-col flex-1 m-b-4">
                <ul v-show="listShowType == 'normal'" class="file-list flex flex-wrap m-t-14">
                    <li
                        class="file-item-wrap"
                        v-for="item in pager.lists"
                        :key="item.id"
                        :style="{ width: fileSize }"
                    >
                        <file-item
                            :uri="item.uri"
                            :file-size="fileSize"
                            :type="type"
                            @click="selectFile(item)"
                        >
                            <div class="item-selected" v-if="selectStatus(item.id)">
                                <el-icon color="#fff" :size="24">
                                    <check />
                                </el-icon>
                            </div>
                        </file-item>

                        <div class="item-name line-1 p-t-10">{{ item.name }}</div>
                        <div class="operation-btns flex col-center">
                            <popover-input
                                type="text"
                                :value="item.name"
                                @confirm="fileRename($event, item.id)"
                            >
                                <el-button type="primary" link>重命名</el-button>
                            </popover-input>
                            <el-button type="primary" link @click="handlePreview(item.uri)">查看</el-button>
                            <popup
                                class="m-r-10 inline"
                                content="确认删除后，本地或云存储图片也将同步删除，如图片已被使用，请谨慎操作！"
                                @confirm="batchFileDelete([item.id])"
                            >
                                <template #trigger>
                                    <el-button type="primary" link>删除</el-button>
                                </template>
                            </popup>
                        </div>
                    </li>
                </ul>
                <el-table
                    ref="tableRef"
                    class="m-t-16"
                    v-show="listShowType == 'table'"
                    :data="pager.lists"
                    width="100%"
                    height="100%"
                    @row-click="selectFile"
                >
                    <el-table-column width="55">
                        <template #default="{ row }">
                            <el-checkbox
                                :modelValue="isSelected(row.id)"
                                @change="selectFile(row)"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column label="图片" width="60">
                        <template #default="{ row }">
                            <file-item :uri="row.uri" file-size="40px"></file-item>
                        </template>
                    </el-table-column>
                    <el-table-column label="名称" min-width="100" show-overflow-tooltip>
                        <template #default="{ row }">
                            <el-link @click.stop="handlePreview(row.uri)">{{ row.name }}</el-link>
                        </template>
                    </el-table-column>
                    <el-table-column prop="create_time" label="上传时间" min-width="100" />
                    <el-table-column label="操作" width="150" fixed="right">
                        <template #default="{ row }">
                            <popover-input
                                class="inline"
                                type="text"
                                :value="row.name"
                                @confirm="fileRename($event, row.id)"
                                @click.stop
                            >
                                <el-button type="primary" link>重命名</el-button>
                            </popover-input>
                            <el-button type="primary" link @click.stop="handlePreview(row.uri)">查看</el-button>
                            <popup
                                class="m-r-10 inline"
                                content="确认删除后，本地或云存储图片也将同步删除，如图片已被使用，请谨慎操作！"
                                @confirm="batchFileDelete([row.id])"
                                @click.stop
                            >
                                <template #trigger>
                                    <el-button type="primary" link>删除</el-button>
                                </template>
                            </popup>
                        </template>
                    </el-table-column>
                </el-table>
                <div
                    class="flex flex-1 row-center col-center"
                    v-if="!pager.loading && !pager.lists.length"
                >暂无数据~</div>
            </div>
            <div class="material-center__footer flex row-between col-center">
                <div class="flex">
                    <template v-if="mode == 'page'">
                        <span class="m-r-10">
                            <el-checkbox
                                :disabled="!pager.lists.length"
                                v-model="isCheckAll"
                                @change="selectAll"
                                :indeterminate="isIndeterminate"
                            >当页全选</el-checkbox>
                        </span>
                        <popup
                            class="m-r-10 inline"
                            content="确认删除后，本地或云存储图片也将同步删除，如图片已被使用，请谨慎操作！"
                            :disabled="!select.length"
                            @confirm="batchFileDelete()"
                        >
                            <template #trigger>
                                <el-button :disabled="!select.length">删除</el-button>
                            </template>
                        </popup>
                        <popup
                            class="m-r-10 inline"
                            @confirm="batchFileMove"
                            :disabled="!select.length"
                            title="移动文件"
                        >
                            <template #trigger>
                                <el-button :disabled="!select.length">移动</el-button>
                            </template>

                            <div>
                                <span class="m-r-20">移动文件至</span>
                                <el-select v-model="moveId" placeholder="请选择">
                                    <template v-for="item in cateLists" :key="item.id">
                                        <el-option
                                            v-if="item.id !== ''"
                                            :label="item.name"
                                            :value="item.id"
                                        ></el-option>
                                    </template>
                                </el-select>
                            </div>
                        </popup>
                    </template>
                </div>
                <pagination
                    v-model="pager"
                    @change="getFileList"
                    layout="total, prev, pager, next, jumper"
                />
            </div>
        </div>
        <div class="material__right" v-if="mode == 'select'">
            <div class="flex row-between p-l-10 p-r-10">
                <div class="sm flex flex-center">
                    已选择 {{ select.length }}
                    <span v-if="limit">/{{ limit }}</span>
                </div>
                <el-button type="text" @click="clearSelect">清空</el-button>
            </div>

            <el-scrollbar class="ls-scrollbar" style="height: calc(100% - 32px)">
                <ul class="select-lists flex-col p-t-10">
                    <li class="m-b-16" v-for="item in select" :key="item.id">
                        <div class="select-item">
                            <del-wrap @close="cancelSelete(item.id)">
                                <file-item :uri="item.uri" file-size="100px" :type="type"></file-item>
                            </del-wrap>
                        </div>
                    </li>
                </ul>
            </el-scrollbar>
        </div>
        <preview v-model="showPreview" :url="previewUrl" :type="type" />
    </div>
</template>


<script lang="ts">
import { computed, defineComponent, inject, onMounted, Ref, ref, toRefs, watch, provide } from 'vue'
import { useCate, useFile } from './hook'
import PopoverInput from '@/components/popover-input/index.vue'
import Pagination from '@/components/pagination/index.vue'
import Popup from '@/components/popup/index.vue'
import Upload from '@/components/upload/index.vue'
import FileItem from './file-item.vue'
import { Search } from '@element-plus/icons-vue'
import { ElTree } from 'element-plus'
import Preview from './preview.vue'
export default defineComponent({
    components: {
        PopoverInput,
        Pagination,
        Popup,
        Upload,
        FileItem,
        Preview
    },
    props: {
        fileSize: {
            type: String,
            default: '100px',
        },
        limit: {
            type: Number,
            default: 1,
        },
        type: {
            type: String,
            default: 'image',
        },
        mode: {
            type: String,
            default: 'select',
        },
        pageSize: {
            type: Number,
            default: 10,
        }
    },
    emits: ['change'],
    setup(props, { emit }) {
        const treeRefs: Ref<typeof ElTree | null> = ref(null)

        const { limit } = toRefs(props)
        const typeValue = computed(() => {
            switch (props.type) {
                case 'image':
                    return 10
                case 'video':
                    return 20
                case 'file':
                    return 30
            }
        })
        const visible = inject('visible') as Ref<boolean>
        const previewUrl = ref("")
        const showPreview = ref(false)
        const {
            cateId,
            cateLists,
            handleAddCate,
            handleEditCate,
            handleDeleteCate,
            getCateLists,
        } = useCate(typeValue)
        const {
            tableRef,
            listShowType,
            moveId,
            pager,
            fileParams,
            select,
            isCheckAll,
            isIndeterminate,
            getFileList,
            refresh,
            batchFileDelete,
            batchFileMove,
            selectFile,
            selectStatus,
            clearSelect,
            cancelSelete,
            selectAll,
            fileRename
        } = useFile(cateId, typeValue, limit, props.pageSize)

        const currentChange = (item: any) => {
            cateId.value = item.id
        }
        const getData = async () => {
            await getCateLists()
            treeRefs.value?.setCurrentKey(cateId.value)
            getFileList()
        }

        const isSelected = (id: number) => {
            return select.value.findIndex((item) => item.id == id) != -1
        }
        const handlePreview = (url: string) => {
            previewUrl.value = url
            showPreview.value = true
        }
        watch(
            visible,
            async (val: boolean) => {
                if (val) {
                    getData()
                }
            },
            {
                immediate: true,
            }
        )
        watch(cateId, (val: string) => {
            fileParams.name = ''
            refresh()
        })
        watch(
            select,
            (val: any[]) => {
                emit('change', val)
                if (val.length == pager.lists.length && val.length !== 0) {
                    isIndeterminate.value = false
                    isCheckAll.value = true
                    return
                }
                if (val.length > 0) {
                    isIndeterminate.value = true
                } else {
                    isCheckAll.value = false
                    isIndeterminate.value = false
                }
            },
            {
                deep: true
            }
        )

        onMounted(() => {
            props.mode == 'page' && getData()
        })


        return {
            showPreview,
            handlePreview,
            isSelected,
            tableRef,
            listShowType,
            previewUrl,
            treeRefs,
            Search,
            limit,
            cateId,
            cateLists,
            handleAddCate,
            handleEditCate,
            handleDeleteCate,
            currentChange,
            moveId,
            pager,
            fileParams,
            select,
            isCheckAll,
            isIndeterminate,
            getFileList,
            refresh,
            batchFileDelete,
            batchFileMove,
            selectFile,
            selectStatus,
            clearSelect,
            cancelSelete,
            selectAll,
            fileRename
        }
    },
})
</script>

<style scoped lang="scss">
.material {
    height: 100%;
    flex: 1;
    min-height: 0;
    &__left {
        width: 180px;
        :deep(.el-tree-node__content) {
            height: 40px;
        }
    }
    &__center {
        flex: 1;
        border-left: 1px solid $border-color-base;
        padding: 16px 16px 5px;
        min-width: 0;
        min-height: 0;
        .material-center__content {
            min-height: 0;
        }
        .list-icon {
            border-radius: 3px;
            display: flex;
            padding: 5px;
            cursor: pointer;
            &.select {
                background-color: $color-primary-light-8;
                color: $color-primary;
            }
        }
        .file-list {
            .file-item-wrap {
                margin-right: 16px;
                line-height: 1.3;
                cursor: pointer;
                .item-selected {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    border-radius: 4px;
                    background-color: rgba(0, 0, 0, 0.5);
                    box-sizing: border-box;
                }
                .operation-btns {
                    height: 28px;
                    visibility: hidden;
                }
                &:hover .operation-btns {
                    visibility: visible;
                }
            }
        }
    }
    &__right {
        border-left: 1px solid $border-color-base;
        width: 150px;
        .select-lists {
            padding: 10px;

            .select-item {
                width: 100px;
                height: 100px;
            }
        }
    }
}
</style>
