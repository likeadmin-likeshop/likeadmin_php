<template>
    <el-date-picker
        v-model="content"
        type="datetimerange"
        range-separator="-"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        clearable
    ></el-date-picker>
</template>

<script lang="ts" setup>
import { withDefaults, computed } from 'vue'

/* Props S */
const props = withDefaults(
    defineProps<{
        start_time?: string
        end_time?: string
    }>(),
    {
        start_time: '',
        end_time: ''
    }
)
const emit = defineEmits(['update:start_time', 'update:end_time'])

const content = computed({
    get: () => {
        return [props.start_time, props.end_time]
    },
    set: (value: Event | any) => {
        if (value === null) {
            emit('update:start_time', '')
            emit('update:end_time', '')
        } else {
            emit('update:start_time', value[0])
            emit('update:end_time', value[1])
        }
    }
})
</script>
