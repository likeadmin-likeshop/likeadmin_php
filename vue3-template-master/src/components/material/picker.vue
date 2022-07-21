<template>
  <div class="material-select flex-1">
    <popup
      ref="popupRef"
      width="950px"
      custom-class="body-padding"
      :title="`选择${tipsText}`"
      @confirm="handleConfirm"
    >
      <template v-if="!hiddenUpload" #trigger>
        <div class="material-select__trigger clearfix" @click.stop>
          <draggable v-model="fileList" class="draggable" animation="300" item-key="id">
            <template #item="{ element, index }">
              <div
                class="material-preview"
                :class="{
                  'is-disabled': disabled,
                  'is-one': limit == 1
                }"
                @click="showPopup(index)"
              >
                <file-item :uri="element" :file-size="size" @close="deleteImg(index)" />
                <div class="operation text-xs text-center">
                  <span>修改</span>
                  |
                  <span @click.stop="previewLists = [element]">查看</span>
                </div>
              </div>
            </template>
          </draggable>
          <div
            v-show="showUpload"
            class="material-upload"
            :class="{
              'is-disabled': disabled,
              'is-one': limit == 1
            }"
            @click="showPopup(-1)"
          >
            <slot name="upload">
              <div
                class="upload-btn"
                :style="{
                  width: size,
                  height: size
                }"
              >
                <icon name="el-icon-Plus" :size="25" />
                <span class="text-sm">添加</span>
              </div>
            </slot>
          </div>
        </div>
      </template>
      <div class="material-wrap">
        <material
          ref="materialRef"
          :file-size="fileSize"
          :limit="meterialLimit"
          @change="selectChange"
        />
      </div>
    </popup>
    <el-image-viewer
      v-if="previewLists.length"
      :url-list="previewLists"
      hide-on-click-modal
      @close="previewLists = []"
    />
  </div>
</template>

<script lang="ts" setup>
import { provide, computed, ref, toRefs, watchEffect, nextTick, shallowRef } from 'vue'
import Draggable from 'vuedraggable'
import Popup from '@/components/popup/index.vue'
import FileItem from './file-item.vue'
import Material from './index.vue'
const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: () => []
  },
  // 文件类型
  type: {
    type: String,
    default: 'image'
  },
  // 选择器尺寸
  size: {
    type: String,
    default: '100px'
  },
  // 文件尺寸
  fileSize: {
    type: String,
    default: '100px'
  },
  // 选择数量限制
  limit: {
    // type: Number,
    default: 1
  },
  // 禁用选择
  disabled: {
    type: Boolean,
    default: false
  },
  // 隐藏上传框*(目前在富文本中使用到)
  hiddenUpload: {
    type: Boolean,
    default: false
  }
})
const emit = defineEmits(['change', 'update:modelValue'])
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const materialRef = shallowRef<InstanceType<typeof Material>>()
const fileList = ref<any[]>([])
const select = ref<any[]>([])
const isAdd = ref(true)
const previewLists = ref<any[]>([])
const currentIndex = ref(-1)
const { disabled, limit, modelValue } = toRefs(props)
const tipsText = computed(() => {
  switch (props.type) {
    case 'image':
      return '图片'
    case 'video':
      return '视频'
    default:
      return ''
  }
})
const typeValue = computed(() => {
  switch (props.type) {
    case 'image':
      return 10
    case 'video':
      return 20
    case 'file':
      return 30
    default:
      return ''
  }
})
const showUpload = computed(() => {
  return props.limit - fileList.value.length > 0
})
const meterialLimit: any = computed(() => {
  if (!isAdd.value) {
    return 1
  }
  if (!limit.value) {
    return null
  }
  return limit.value - fileList.value.length
})
const handleConfirm = () => {
  const selectUri = select.value.map((item) => item.uri)
  if (!isAdd.value) {
    fileList.value.splice(currentIndex.value, 1, selectUri.shift())
  } else {
    fileList.value = [...fileList.value, ...selectUri]
  }
  handleChange()
}
const showPopup = (index: number) => {
  if (disabled.value) {
    return
  }
  if (index >= 0) {
    isAdd.value = false
    currentIndex.value = index
  } else {
    isAdd.value = true
  }
  popupRef.value?.open()
}

const selectChange = (val: any[]) => {
  select.value = val
}
const handleChange = () => {
  const valueImg = limit.value != 1 ? fileList.value : fileList.value[0] || ''
  emit('update:modelValue', valueImg)
  emit('change', valueImg)
  nextTick(() => {
    materialRef.value?.clearSelect()
  })
}

const deleteImg = (index: number) => {
  fileList.value.splice(index, 1)
  handleChange()
}

watchEffect(() => {
  const val: any[] | string = modelValue.value
  fileList.value = Array.isArray(val) ? val : val == '' ? [] : [val]
})
provide('type', props)
provide('fileSize', props.fileSize)
provide('limit', props.limit)
provide('typeValue', typeValue)
provide('hiddenUpload', props.hiddenUpload)
</script>

<style scoped lang="scss">
.material-select {
  .material-upload,
  .material-preview {
    position: relative;
    border-radius: 4px;
    cursor: pointer;
    color: var(--el-text-color-secondary);
    margin-right: 8px;
    margin-bottom: 8px;
    box-sizing: border-box;
    float: left;
    &.is-disabled {
      cursor: not-allowed;
    }
    &.is-one {
      margin-bottom: 0;
    }
    &:hover {
      .operation {
        display: block;
      }
    }
    .operation {
      display: none;
      background-color: rgba(0, 0, 0, 0.4);
      position: absolute;
      bottom: 0;
      border-radius: 4px;
      width: 100%;
      line-height: 2;
      @apply text-white;
    }
  }
  .material-upload {
    .upload-btn {
      box-sizing: border-box;
      border-radius: 4px;
      border: 1px dashed var(--el-border-color-dark);
      @apply flex flex-col justify-center items-center;
    }
  }
}
.material-wrap {
  height: 540px;
}
</style>
