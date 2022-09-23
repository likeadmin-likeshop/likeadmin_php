<template>
    <view
        :class="{ active, inactive: !active, tab: true }"
        :style="shouldShow ? '' : 'display: none;'"
    >
        <slot v-if="shouldRender"></slot>
    </view>
</template>

<script lang="ts" setup>
import { ref, provide, inject, watch, computed, onMounted, getCurrentInstance } from 'vue'

const props = withDefaults(
    defineProps<{
        dot?: boolean | string
        name?: boolean | string
        info?: any
    }>(),
    {
        dot: false,
        name: ''
    }
)

const active = ref<boolean>(false)
const shouldShow = ref<boolean>(false)
const shouldRender = ref<boolean>(false)
const inited = ref(undefined)

const updateTabs: any = inject('updateTabs')
const handleChange: any = inject('handleChange')

const updateRender = (value) => {
    inited.value = inited.value || value
    active.value = value
    shouldRender.value = inited.value!
    shouldShow.value = value
}
const update = () => {
    if (updateTabs) {
        updateTabs()
    }
}

const instance = getCurrentInstance()
console.log(instance)
handleChange(instance?.props, updateRender)

onMounted(() => {
    update()
})

const changeData = computed(() => {
    const { dot, info } = props
    return {
        dot,
        info
    }
})

watch(
    () => changeData.value,
    () => {
        update()
    }
)
watch(
    () => props.name,
    (val) => {
        update()
    }
)
</script>

<style>
.tab.active {
    height: auto;
}

.tab.inactive {
    height: 0;
    overflow: visible;
}
</style>
