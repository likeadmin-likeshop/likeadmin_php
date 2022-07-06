<template>
  <div class="icon-select">
    <el-popover v-model:visible="state.popoverVisible" :width="state.popoverWidth">
      <div
        @mouseover.stop="state.mouseoverSelect = true"
        @mouseout.stop="state.mouseoverSelect = false"
      >
        <div>
          <div class="m-b-12">请选择图标</div>
          <div style="height: 300px;">
            <el-scrollbar>
              <div class="flex flex-wrap">
                <div v-for="item in iconNamesFliter" :key="item" class="m-4">
                  <el-button @click="handleSelect(item)">
                    <icon :name="item" :size="18" />
                  </el-button>
                </div>
              </div>
            </el-scrollbar>
          </div>
        </div>
      </div>
      <template #reference>
        <el-input
          ref="inputRef"
          v-model.trim="state.inputValue"
          placeholder="搜索图标"
          :disabled="disabled"
          @focus="handleFocus"
          @blur="handleBlur"
        >
          <template #prepend>
            <div class="flex w-4">
              <icon v-if="modelValue" :key="modelValue" :name="modelValue" />
              <template v-else>无</template>
            </div>
          </template>
          <template #append>
            <el-button link>
              <icon name="el-icon-Close" :size="18" @click="handleClear" />
            </el-button>
          </template>
        </el-input>
      </template>
    </el-popover>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, onMounted, reactive, shallowRef, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import { ElInput } from 'element-plus'
import { throttle } from 'lodash'
import { getElementPlusIconNames } from '@/plugins/element'
interface Props {
  modelValue: string
  disabled?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  disabled: false
})

const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'change', value: string): void
}>()

const iconNames = getElementPlusIconNames()
const inputRef = shallowRef<InstanceType<typeof ElInput>>()

const state = reactive({
  inputValue: '',
  popoverVisible: false,
  popoverWidth: 0,
  mouseoverSelect: false,
  inputFocus: false
})

// input 框聚焦
const handleFocus = () => {
  state.inputFocus = state.popoverVisible = true
}

// // input 框失去焦点
const handleBlur = () => {
  state.inputFocus = false
  state.popoverVisible = state.mouseoverSelect
}

// 选中图标
const handleSelect = (icon: string) => {
  state.mouseoverSelect = state.popoverVisible = false
  emits('update:modelValue', icon)
  emits('change', icon)
}
//取消选中
const handleClear = () => {
  emits('update:modelValue', '')
  emits('change', '')
}

//根据输入框内容塞选
const iconNamesFliter = computed(() => {
  if (!state.inputValue) {
    return iconNames
  }
  const inputValue = state.inputValue.toLowerCase()
  return iconNames.filter((icon: string) => {
    if (icon.toLowerCase().indexOf(inputValue) !== -1) {
      return icon
    }
  })
})

// 获取 input 的宽度
const getInputWidth = () => {
  nextTick(() => {
    const inputWidth = inputRef.value?.$el.offsetWidth
    state.popoverWidth = inputWidth < 300 ? 300 : inputWidth
  })
}

//监听body点击事件
useEventListener(document.body, 'click', () => {
  state.popoverVisible = state.inputFocus || state.mouseoverSelect ? true : false
})

watch(
  () => state.popoverVisible,
  async (value) => {
    await nextTick()
    if (value) {
      inputRef.value?.focus()
    } else {
      inputRef.value?.blur()
    }
  }
)

onMounted(() => {
  getInputWidth()
})
</script>
