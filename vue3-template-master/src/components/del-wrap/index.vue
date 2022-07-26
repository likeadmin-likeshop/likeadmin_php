<template>
    <div class="del-wrap">
        <slot></slot>
        <div v-if="showClose" class="icon-close" @click.stop="handleClose">
            <icon :size="12" name="el-icon-CloseBold" />
        </div>
    </div>
</template>

<script lang="ts">
export default defineComponent({
    props: {
        showClose: {
            type: Boolean,
            default: true
        }
    },
    emits: ['close'],
    setup(props, { emit }) {
        const handleClose = () => {
            emit('close')
        }
        return {
            handleClose
        }
    }
})
</script>

<style scoped lang="scss">
.del-wrap {
    position: relative;
    &:hover > .icon-close {
        display: flex;
    }
    .icon-close {
        display: none;
        position: absolute;
        top: -8px;
        right: -8px;
        width: 16px;
        height: 16px;
        background-color: rgba(0, 0, 0, 0.3);
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        color: #fff;
        cursor: pointer;
    }
}
</style>
