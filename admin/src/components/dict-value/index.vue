<template>
    <div>
        <template v-for="(item, index) in options">
            <span v-if="values.includes(item.value)" :key="index">{{ item.name }}</span>
        </template>
    </div>
</template>
<script lang="ts" setup>
const props = defineProps<{
    options: any[]
    value: any
}>()

const values = computed(() => {
    if (props.value !== null && typeof props.value !== 'undefined') {
        return Array.isArray(props.value) ? props.value : [String(props.value)]
    } else {
        return []
    }
})
</script>
