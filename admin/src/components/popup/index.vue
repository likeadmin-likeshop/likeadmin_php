<template>
    <div class="dialog">
        <div class="dialog__trigger" @click="open">
            <!-- 触发弹窗 -->
            <slot name="trigger"></slot>
        </div>
        <el-dialog
            v-model="visible"
            :custom-class="customClass"
            :append-to-body="true"
            :width="width"
            :close-on-click-modal="clickModalClose"
        >
            <!-- 弹窗内容 -->
            <template v-if="title" #title>
                {{ title }}
            </template>
            <template v-else #title>
                <div class="flex col-center">
                    <el-icon :size="25" :color="$variables.color_warning"
                        ><warning-filled
                    /></el-icon>
                    <span class="m-l-6">温馨提示</span>
                </div>
            </template>

            <!-- 自定义内容 -->
            <slot>
                {{ content }}
            </slot>
            <!-- 底部弹窗页脚 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button v-if="cancelButtonText" size="small" @click="handleEvent('cancel')">
                        {{ cancelButtonText }}
                    </el-button>
                    <el-button
                        v-if="confirmButtonText"
                        size="small"
                        type="primary"
                        @click="handleEvent('confirm')"
                    >
                        {{ confirmButtonText }}
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { defineComponent, provide, ref } from 'vue'
export default defineComponent({
    components: {},
    props: {
        title: {
            // 弹窗标题
            type: String,
            default: ''
        },
        content: {
            // 弹窗内容
            type: String,
            default: '确认要删除？'
        },
        confirmButtonText: {
            // 确认按钮内容
            type: [String, Boolean],
            default: '确认'
        },
        cancelButtonText: {
            // 取消按钮内容
            type: [String, Boolean],
            default: '取消'
        },
        width: {
            // 弹窗的宽度
            type: String,
            default: '400px'
        },
        disabled: {
            // 是否禁用
            type: Boolean,
            default: false
        },
        async: {
            // 是否开启异步关闭
            type: Boolean,
            default: false
        },
        clickModalClose: {
            // 点击遮罩层关闭对话窗口
            type: Boolean,
            default: true
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit }) {
        const visible = ref(false)

        const handleEvent = (type: 'confirm' | 'cancel') => {
            emit(type)
            if (!props.async || type === 'cancel') {
                close()
            }
        }

        const close = () => {
            visible.value = false
        }
        const open = () => {
            if (props.disabled) {
                return
            }
            visible.value = true
        }
        provide('visible', visible)
        return {
            visible,
            handleEvent,
            close,
            open
        }
    }
})
</script>

<style scoped lang="scss">
.dialog-body {
    white-space: pre-line;
}
</style>
