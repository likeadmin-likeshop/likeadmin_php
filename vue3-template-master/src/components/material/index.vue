<template>
  <div v-loading="pager.loading" class="material flex">
    <div class="material__left flex flex-col">
      <div class="flex-1 min-h-0">
        <el-scrollbar class="ls-scrollbar">
          <div class="material-left__content pt-4 pb-4">
            <el-tree
              ref="treeRef"
              node-key="id"
              :data="cateLists"
              empty-text="''"
              :highlight-current="true"
              :expand-on-click-node="false"
              :icon="ArrowRight"
              :current-node-key="cateId"
              @node-click="currentChange"
            >
              <template #default="{ data }">
                <div class="flex flex-1 items-center" style="min-width: 0">
                  <img
                    style="width: 20px; height: 16px"
                    src="@/assets/images/icon_folder.png"
                    class="mr-3"
                  />
                  <span class="flex-1 truncate mr-2">{{ data.name }}</span>
                  <el-dropdown v-if="data.id > 0" :hide-on-click="false">
                    <span class="text-muted mr-2 text-xs">···</span>
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
      </div>
      <div class="flex justify-center mb-3">
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
            :type="type.type"
            :show-progress="true"
            @change="refresh"
          >
            <el-button type="primary">本地上传</el-button>
          </upload>
          <popup
            class="mr-3 inline-block"
            content="确定删除选中的文件？"
            :disabled="!select.length"
            @confirm="batchFileDelete()"
          >
            <template #trigger>
              <el-button :disabled="!select.length">删除</el-button>
            </template>
          </popup>
          <popup
            class="mr-3 inline-block"
            :disabled="!select.length"
            title="移动文件"
            @confirm="batchFileMove"
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
          v-model.trim="fileParams.name"
          placeholder="请输入名字"
          style="width: 280px"
          @keyup.enter="refresh"
        >
          <template #append>
            <el-button :icon="Search" @click="refresh"></el-button>
          </template>
        </el-input>
      </div>
      <div class="material-center__content flex flex-col flex-1">
        <ul class="file-list flex flex-wrap mt-3">
          <li
            v-for="item in pager.lists"
            :key="item.id"
            class="file-item-wrap"
            :style="{ width: fileSize }"
          >
            <file-item
              :uri="item.uri"
              :file-size="fileSize"
              @click="selectFile(item)"
              @close="batchFileDelete([item.id])"
            >
              <div v-if="selectStatus(item.id)" class="item-selected">
                <icon name="el-icon-Check" :size="24" color="#fff" />
              </div>
            </file-item>
            <el-tooltip effect="light" placement="top" :content="item.name">
              <div class="item-name truncate mt-2">{{ item.name }}</div>
            </el-tooltip>
            <div class="operation-btn flex">
              <popover-input>
                <el-button type="primary" link>重命名</el-button>
              </popover-input>
              <el-button type="primary" link @click="previewLists = [item.uri]"> 查看 </el-button>
            </div>
          </li>
        </ul>
        <div
          v-if="!pager.loading && !pager.lists.length"
          class="flex flex-1 items-center justify-center"
        >
          暂无数据~
        </div>
      </div>
      <div class="material-center__footer flex justify-between">
        <pagination
          v-model="pager"
          layout="total, prev, pager, next, jumper"
          @change="getFileList"
        />
      </div>
    </div>
    <div class="material__right flex flex-col">
      <div class="flex p-2">
        <div class="sm flex-1">
          已选择 {{ select.length }}
          <span v-if="limit">/{{ limit }}</span>
        </div>
        <el-button type="primary" link @click="clearSelect">清空</el-button>
      </div>
      <div class="flex-1 min-h-0">
        <el-scrollbar class="ls-scrollbar">
          <ul class="select-lists flex flex-col">
            <li v-for="item in select" :key="item.id" class="mb-3">
              <div class="select-item">
                <file-item
                  :uri="item.uri"
                  file-size="100px"
                  @close="cancelSelete(item.id)"
                ></file-item>
              </div>
            </li>
          </ul>
        </el-scrollbar>
      </div>
    </div>
    <el-image-viewer
      v-if="previewLists.length"
      :url-list="previewLists"
      hide-on-click-modal
      @close="previewLists = []"
    />
  </div>
</template>

<script lang="ts" setup>
import { inject, ref, shallowRef, toRefs, watch } from 'vue'
import type { Ref } from 'vue'
import { useCate, useFile } from './hook'
import FileItem from './file-item.vue'
import { Search, ArrowRight } from '@element-plus/icons-vue'
import { ElTree, ElImageViewer } from 'element-plus'
const props = defineProps({
  fileSize: {
    type: String,
    default: '100px'
  },
  limit: {
    type: Number,
    default: 1
  }
})
const emit = defineEmits(['change'])
const treeRef = shallowRef<InstanceType<typeof ElTree>>()
const type = inject('type') as Ref<any>
const { limit } = toRefs(props)
const typeValue = inject('typeValue') as Ref<10 | 20 | 30>
const visible = inject('visible') as Ref<boolean>
const previewLists = ref<any[]>([])
const { cateId, cateLists, handleAddCate, handleEditCate, handleDeleteCate, getCateLists } =
  useCate(typeValue)
const {
  moveId,
  pager,
  fileParams,
  select,
  getFileList,
  refresh,
  batchFileDelete,
  batchFileMove,
  selectFile,
  selectStatus,
  clearSelect,
  cancelSelete
} = useFile(cateId, typeValue, limit)

const currentChange = (item: any) => {
  cateId.value = item.id
}
watch(
  visible,
  async (val: boolean) => {
    if (val) {
      await getCateLists()
      treeRef.value?.setCurrentKey(cateId.value)
      getFileList()
    }
  },
  {
    immediate: true
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
  },
  {
    deep: true
  }
)
defineExpose({
  clearSelect
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
    border-left: 1px solid var(--el-border-color);
    padding: 16px;
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
        .operation-btn {
          visibility: hidden;
        }
        &:hover .operation-btn {
          visibility: visible;
        }
      }
    }
  }
  &__right {
    border-left: 1px solid var(--el-border-color);
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
