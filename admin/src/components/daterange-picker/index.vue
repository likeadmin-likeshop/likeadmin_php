<template>
    <el-date-picker
        v-model="content"
        type="datetimerange"
        range-separator="-"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
        clearable
    ></el-date-picker>
</template>

<script lang="ts" setup>
const props = withDefaults(
    defineProps<{
        startTime?: string
        endTime?: string
    }>(),
    {
        startTime: '',
        endTime: ''
    }
)
const emit = defineEmits(['update:startTime', 'update:endTime'])

const content = computed<any>({
    get: () => {
        return [props.startTime, props.endTime]
    },
    set: (value: Event | any) => {
        if (value === null) {
            emit('update:startTime', '')
            emit('update:endTime', '')
        } else {
            emit('update:startTime', value[0])
            emit('update:endTime', value[1])
        }
    }
})
</script>
