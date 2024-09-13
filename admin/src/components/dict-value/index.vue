<template>
    <div>
        <template v-for="(item, index) in getOptions" :key="index">
            <span>{{ index != 0 ? '、' : '' }}{{ item[config.label] }}</span>
        </template>
    </div>
</template>
<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        options: any[]
        value: any
        config?: Record<string, string>
    }>(),
    {
        options: () => [],
        config: () => ({
            label: 'name',
            value: 'value'
        })
    }
)

const values = computed(() => {
    if (props.value !== null && typeof props.value !== 'undefined') {
        return Array.isArray(props.value) ? props.value : String(props.value).split(',')
    } else {
        return []
    }
})

const getOptions = computed(() => {
    return props.options.filter((item) => values.value.includes(item[props.config.value]))
})
</script>
