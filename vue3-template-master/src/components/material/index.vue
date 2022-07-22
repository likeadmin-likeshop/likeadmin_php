<template>
  <div class="material" v-loading="pager.loading">
    <div class="material__left">
      <el-scrollbar style="height: calc(100% - 40px)">
        <div class="material-left__content pt-4 pr-4">
          <el-tree
            ref="treeRef"
            node-key="id"
            :data="cateLists"
            empty-text="''"
            :highlight-current="true"
            :expand-on-click-node="false"
            :current-node-key="cateId"
            @node-click="handleCatSelect"
          >
            <template v-slot="{ data }">
              <div class="flex flex-1 items-center min-w-0">
                <img class="w-[20px] h-[16px] mr-3" src="@/assets/images/icon_folder.png" />
                <span class="flex-1 truncate mr-2">
                  <overflow-tooltip :content="data.name" />
                </span>
                <el-dropdown v-if="data.id > 0" :hide-on-click="false">
                  <span class="muted m-r-10">···</span>
                  <template #dropdown>
                    <el-dropdown-menu>
                      <div>
                        <popover-input
                          type="text"
                          tips="分类名称"
                          @confirm="handleEditCate($event, data.id)"
                        >
                          <el-dropdown-item>命名分组</el-dropdown-item>
                        </popover-input>
                      </div>
                      <div @click="handleDeleteCate(data.id)">
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
      <div class="flex justify-center">
        <popover-input tips="分类名称" type="text" @confirm="handleAddCate">
          <el-button>添加分组</el-button>
        </popover-input>
      </div>
    </div>
    <div class="material__center flex flex-col">
      <div class="operate-btn flex">
        <div class="flex-1 flex">
          <upload
            class="mr-3"
            :data="{ cid: cateId }"
            :type="type"
            :show-progress="true"
            @change="refresh"
          >
            <el-button type="primary">本地上传</el-button>
          </upload>
          <el-button v-if="mode == 'page'" :disabled="!select.length" @click="batchFileDelete()">
            删除
          </el-button>

          <popup
            v-if="mode == 'page'"
            class="ml-3"
            @confirm="batchFileMove"
            :disabled="!select.length"
            title="移动文件"
          >
            <template #trigger>
              <el-button :disabled="!select.length">移动</el-button>
            </template>

            <div>
              <span class="mr-5">移动文件至</span>
              <el-select v-model="moveId" placeholder="请选择">
                <template v-for="item in cateLists" :key="item.id">
                  <el-option v-if="item.id !== ''" :label="item.name" :value="item.id"></el-option>
                </template>
              </el-select>
            </div>
          </popup>
        </div>
        <el-input
          class="w-72"
          placeholder="请输入名称"
          v-model="fileParams.name"
          @keyup.enter="refresh"
        >
          <template #append>
            <el-button @click="refresh">
              <template #icon>
                <icon name="el-icon-Search" />
              </template>
            </el-button>
          </template>
        </el-input>
        <div class="flex items-center ml-3">
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
      <div class="mt-3" v-if="mode == 'page'">
        <el-checkbox
          :disabled="!pager.lists.length"
          v-model="isCheckAll"
          @change="selectAll"
          :indeterminate="isIndeterminate"
        >
          当页全选
        </el-checkbox>
      </div>
      <div class="material-center__content flex flex-col flex-1 mb-1">
        <ul v-show="listShowType == 'normal'" class="file-list flex flex-wrap mt-4">
          <li
            class="file-item-wrap"
            v-for="item in pager.lists"
            :key="item.id"
            :style="{ width: fileSize }"
          >
            <file-item :uri="item.uri" :file-size="fileSize" :type="type" @click="selectFile(item)">
              <div class="item-selected" v-if="isSelect(item.id)">
                <icon :size="24" name="el-icon-Check" color="#fff" />
              </div>
            </file-item>
            <overflow-tooltip class="mt-1" :content="item.name" />
            <div class="operation-btns flex col-center">
              <el-button type="primary" link @confirm="handleFileRename($event, item.id)">
                重命名
              </el-button>
              <el-button type="primary" link @click="handlePreview(item.uri)">查看</el-button>
              <el-button type="primary" link @click="batchFileDelete([item.id])">删除</el-button>
            </div>
          </li>
        </ul>
        <el-table
          ref="tableRef"
          class="mt-4"
          v-show="listShowType == 'table'"
          :data="pager.lists"
          width="100%"
          height="100%"
          size="large"
          @row-click="selectFile"
        >
          <el-table-column width="55">
            <template #default="{ row }">
              <el-checkbox :modelValue="isSelect(row.id)" @change="selectFile(row)" />
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
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <!-- <popover-input
                class="inline"
                type="text"
                :value="row.name"
                @confirm="handleFileRename($event, row.id)"
                @click.stop
              > -->
              <el-button type="primary" link>重命名</el-button>
              <!-- </popover-input> -->
              <el-button type="primary" link @click.stop="handlePreview(row.uri)">查看</el-button>
              <el-button type="primary" link @confirm="batchFileDelete([row.id])">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="flex flex-1 row-center col-center" v-if="!pager.loading && !pager.lists.length">
          暂无数据~
        </div>
      </div>
      <div class="material-center__footer flex justify-between items-center">
        <div class="flex">
          <template v-if="mode == 'page'">
            <span class="mr-3">
              <el-checkbox
                :disabled="!pager.lists.length"
                v-model="isCheckAll"
                @change="selectAll"
                :indeterminate="isIndeterminate"
              >
                当页全选
              </el-checkbox>
            </span>
            <el-button :disabled="!select.length" @click="batchFileDelete()">删除</el-button>
            <popup
              class="ml-3 inline"
              @confirm="batchFileMove"
              :disabled="!select.length"
              title="移动文件"
            >
              <template #trigger>
                <el-button :disabled="!select.length">移动</el-button>
              </template>

              <div>
                <span class="mr-5">移动文件至</span>
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
    <div class="material__right" v-if="mode == 'picker'">
      <div class="flex row-between pl-3 pr-3">
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

<script lang="ts" setup>
import { useCate, useFile } from './hook'
import FileItem from './file.vue'
import Preview from './preview.vue'
import type { Ref } from 'vue'
const props = defineProps({
  fileSize: {
    type: String,
    default: '100px'
  },
  limit: {
    type: Number,
    default: 1
  },
  type: {
    type: String,
    default: 'image'
  },
  mode: {
    type: String,
    default: 'picker'
  },
  pageSize: {
    type: Number,
    default: 10
  }
})
const emit = defineEmits(['change'])
const { limit } = toRefs(props)
const typeValue = computed<number>(() => {
  switch (props.type) {
    case 'image':
      return 10
    case 'video':
      return 20
    case 'file':
      return 30
    default:
      return 0
  }
})
const visible: Ref<boolean> = inject('visible')!
const previewUrl = ref('')
const showPreview = ref(false)
const {
  treeRef,
  cateId,
  cateLists,
  handleAddCate,
  handleEditCate,
  handleDeleteCate,
  getCateLists,
  handleCatSelect
} = useCate(typeValue.value)

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
  isSelect,
  clearSelect,
  cancelSelete,
  selectAll,
  handleFileRename
} = useFile(cateId, typeValue, limit, props.pageSize)

const getData = async () => {
  await getCateLists()
  treeRef.value?.setCurrentKey(cateId.value)
  getFileList()
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
    immediate: true
  }
)
watch(cateId, () => {
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

defineExpose({
  clearSelect
})
</script>

<style scoped lang="scss">
.material {
  @apply h-full min-h-0 flex flex-1;
  &__left {
    width: 200px;
    :deep(.el-tree-node__content) {
      height: 36px;
    }
  }
  &__center {
    flex: 1;
    // border-left: 1px solid $border-color-base;

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
        @apply text-primary bg-primary-light-8;
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
    // border-left: 1px solid $border-color-base;
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
