<template>
    <div class="popover-input">
        <el-popover v-model:visible="visible" placement="top" :width="width">
            <div class="flex">
                <div class="popover-input__input m-r-10 flex-1">
                    <el-input v-model.trim="value" :type="type" :placeholder="placeholder"></el-input>
                </div>
                <div class="popover-input__btns flex-none">
                    <el-button type="text" @click="close">取消</el-button>
                    <el-button type="primary" @click="handleConfirm">确定</el-button>
                </div>
            </div>
            <template #reference>
                <div class="inline" type="text" @click="open">
                    <slot></slot>
                </div>
            </template>
        </el-popover>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
export default defineComponent({
    props: {
        type: {
            type: String,
            default: 'number'
        },
        width: {
            type: Number,
            default: 250
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['confirm'],
    setup(props, { emit }) {
        const visible = ref(false)
        const value = ref('')
        const open = () => {
            if (props.disabled) {
                return
            }
            visible.value = true
        }
        const close = () => {
            visible.value = false
        }

        const handleConfirm = () => {
            if (value.value) {
                emit('confirm', value.value)
                value.value = ''
            }
            close()
        }
        return {
            visible,
            value,
            open,
            close,
            handleConfirm
        }
    }
})
</script>
