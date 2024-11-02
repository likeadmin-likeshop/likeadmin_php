<template>
    <div class="dialog">
        <div class="dialog__trigger" @click="open">
            <!-- 触发弹窗 -->
            <slot name="trigger"></slot>
        </div>
        <el-dialog
            v-model="visible"
            :class="customClass"
            :center="center"
            :append-to-body="true"
            :width="width"
            :close-on-click-modal="clickModalClose"
            @closed="close"
        >
            <!-- 弹窗内容 -->
            <template v-if="title" #header>{{ title }}</template>

            <!-- 自定义内容 -->
            <slot>{{ content }}</slot>
            <!-- 底部弹窗页脚 -->
            <template #footer>
                <div class="dialog-footer">
                    <el-button v-if="cancelButtonText" @click="handleEvent('cancel')">
                        {{ cancelButtonText }}
                    </el-button>
                    <el-button
                        v-if="confirmButtonText"
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
export default defineComponent({
    props: {
        title: {
            // 弹窗标题
            type: String,
            default: ''
        },
        content: {
            // 弹窗内容
            type: String,
            default: ''
        },
        confirmButtonText: {
            // 确认按钮内容
            type: [String, Boolean],
            default: '确定'
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
            default: false
        },
        center: {
            // 是否居中布局
            type: Boolean,
            default: false
        },
        customClass: {
            type: String,
            default: ''
        }
    },
    emits: ['confirm', 'cancel', 'close', 'open'],
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
            nextTick(() => {
                emit('close')
            })
        }
        const open = () => {
            if (props.disabled) {
                return
            }
            emit('open')
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
