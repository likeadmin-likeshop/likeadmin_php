
<template>
    <div class="material flex col-stretch">
        <div class="material__left">
            <el-scrollbar
                class="ls-scrollbar"
                style="height: calc(100% - 40px)"
            >
                <div class="material-left__content p-t-16 p-b-16">
                    <el-tree
                        node-key="id"
                        :data="cateLists"
                        empty-text=""
                        :highlight-current="true"
                        :expand-on-click-node="false"
                        icon-class="el-icon-arrow-right"
                        :current-node-key="cateId"
                        @node-click="currentChange"
                    >
                        <template v-slot="{ data }">
                            <div
                                class="flex flex-1 flex-center"
                                style="min-width: 0"
                            >
                                <img
                                    style="width: 20px; height: 16px"
                                    src="@/assets/images/icon_folder.png"
                                    alt=""
                                    class="m-r-10"
                                />
                                <span class="flex-1 line-1 m-r-10">{{
                                    data.name
                                }}</span>
                                <el-dropdown
                                    v-if="data.id > 0"
                                    :hide-on-click="false"
                                >
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
                                                    <el-dropdown-item
                                                        >命名分组</el-dropdown-item
                                                    >
                                                </popover-input>
                                            </div>
                                            <div
                                                @click="
                                                    handleDeleteCate(data.id)
                                                "
                                            >
                                                <el-dropdown-item
                                                    >删除分组</el-dropdown-item
                                                >
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
                <popover-input
                    tips="分类名称"
                    type="text"
                    @confirm="handleAddCate"
                >
                    <el-button size="small">添加分组</el-button>
                </popover-input>
            </div>
        </div>
        <div class="material__center">
            <div class="operate-btn flex">
                <div class="flex-1 flex">
                    <upload
                        class="m-r-10"
                        :data="{ cid: cateId }"
                        :type="type"
                        :show-progress="true"
                        @change="getFileList"
                    >
                        <el-button size="small" type="primary"
                            >本地上传</el-button
                        >
                    </upload>
                    <popup
                        class="m-r-10 inline"
                        content="确定删除选中的文件？"
                        :disabled="!select.length"
                        @confirm="batchFileDelete"
                    >
                        <template #trigger>
                            <el-button size="small" :disabled="!select.length"
                                >删除</el-button
                            >
                        </template>
                    </popup>
                    <popup
                        class="m-r-10 inline"
                        @confirm="batchFileMove"
                        :disabled="!select.length"
                        title="移动文件"
                    >
                        <template #trigger>
                            <el-button size="small" :disabled="!select.length"
                                >移动</el-button
                            >
                        </template>

                        <div>
                            <span class="m-r-20">移动文件至</span>
                            <el-select v-model="moveId" placeholder="请选择">
                                <el-option
                                    v-for="item in cateLists"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                >
                                </el-option>
                            </el-select>
                        </div>
                    </popup>
                </div>
                <el-input
                    size="small"
                    placeholder="请输入名字"
                    style="width: 280px"
                    v-model="fileParams.name"
                    @keyup.enter="getFileList"
                >
                    <template #append>
                        <el-button :icon="Search" @click="getFileList">
                        </el-button>
                    </template>
                </el-input>
            </div>
            <div class="material-center__content flex-col flex-1">
                <ul class="file-list flex flex-wrap m-t-16">
                    <li
                        class="file-item-wrap"
                        v-for="item in pager.lists"
                        :key="item.id"
                        :style="{ width: fileSize }"
                        @click="selectFile(item)"
                    >
                        <file-item :item="item" :size="fileSize">
                            <div
                                class="item-selected"
                                v-if="selectStatus(item.id)"
                            >
                                <el-icon color="#fff" size="24"
                                    ><check
                                /></el-icon>
                            </div>
                        </file-item>

                        <div class="item-name line-1 xs p-t-10">
                            {{ item.name }}
                        </div>
                        <!-- <div
                            v-if="mode == 'pages'"
                            class="operation-btns"
                            @click.stop=""
                        >
                            <ls-dialog
                                class="m-r-10 inline"
                                content="确定删除该文件？"
                                @confirm="batchFileDel([item.id])"
                            >
                                <el-button
                                    slot="trigger"
                                    size="small"
                                    type="text"
                                >删除</el-button>
                            </ls-dialog>
                            <popover-input
                                :value="item.name"
                                type="text"
                                @confirm="fileRename($event, item.id)"
                            >
                                <el-button
                                    size="small"
                                    type="text"
                                >重命名</el-button>
                            </popover-input>
                            <a
                                class="m-l-10"
                                :href="item.uri"
                                target="_blank"
                            >
                                <el-button
                                    size="small"
                                    type="text"
                                >查看</el-button>
                            </a>
                        </div> -->
                        <!-- <i
                            v-if="!selectStatus(item.id) && mode == 'popup'"
                            class="el-icon-close ls-icon-del"
                            @click.stop="batchFileDel([item.id])"
                        ></i> -->
                    </li>
                </ul>
                <div
                    class="flex flex-1 row-center col-center"
                    v-if="!pager.loading && !pager.lists.length"
                >
                    暂无数据~
                </div>
            </div>
        </div>
        <div class="material__right"></div>
    </div>
</template>


<script lang="ts">
import { defineComponent, inject, Ref, ref, watch } from 'vue'
import { useCate, useFile } from './hook'
import PopoverInput from '@/components/popover-input/index.vue'
import Pagination from '@/components/pagination/index.vue'
import Popup from '@/components/popup/index.vue'
import Upload from '@/components/upload/index.vue'
import FileItem from './file-item.vue'
import { Search } from '@element-plus/icons-vue'
export default defineComponent({
    components: {
        PopoverInput,
        Pagination,
        Popup,
        Upload,
        FileItem,
    },
    props: {
        fileSize: {
            type: String,
            default: '100px',
        },
    },
    setup() {
        const type = inject('type') as Ref<string>
        const typeValue = inject('typeValue') as Ref<10 | 20 | 30>
        const visible = inject('visible') as Ref<boolean>
        const {
            cateId,
            cateLists,
            handleAddCate,
            handleEditCate,
            handleDeleteCate,
            getCateLists,
        } = useCate(typeValue)
        const {
            moveId,
            pager,
            fileParams,
            select,
            getFileList,
            batchFileDelete,
            batchFileMove,
            selectFile,
            selectStatus,
        } = useFile(cateId, typeValue)

        const currentChange = (item: any) => {
            cateId.value = item.id
            getFileList()
        }

        watch(
            visible,
            (val: boolean) => {
                if (val) {
                    getCateLists()
                }
            },
            {
                immediate: true,
            }
        )
        watch(
            cateId,
            (val: string) => {
                getFileList()
            },
            {
                immediate: true,
            }
        )
        return {
            Search,
            type,
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
            getFileList,
            batchFileDelete,
            batchFileMove,
            selectFile,
            selectStatus,
        }
    },
})
</script>

<style scoped lang="scss">
.material {
    height: 100%;
    flex: 1;
    &__left {
        width: 170px;
        :deep(.el-tree-node__content) {
            height: 40px;
        }
    }
    &__center {
        flex: 1;
        border-left: 1px solid $border-color-base;
        padding: 16px;
        .file-list {
            .file-item-wrap {
                margin-right: 16px;
                margin-bottom: 16px;
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
    }
}
</style>
