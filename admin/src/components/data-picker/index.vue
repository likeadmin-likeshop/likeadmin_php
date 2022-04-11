<template>
    <el-date-picker
        v-model="content"
        type="datetimerange"
        :shortcuts="shortcuts"
        range-separator="-"
        format="YYYY-MM-DD HH:mm:ss"
        value-format="YYYY-MM-DD HH:mm:ss"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
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
            end_time: '',
        }
    )
    /* Props E */

    /* Emit S */
    const emit = defineEmits(['update:start_time', 'update:end_time'])
    /* Emit E */

    /* Computed S */
    let content = computed({
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
        },
    })
    /* Computed E */

    /* Data S */
    const shortcuts = [
        {
            text: '最近一个星期',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
                return [start, end]
            },
        },
        {
            text: '最近一个月',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
                return [start, end]
            },
        },
        {
            text: '最近三个月',
            value: () => {
                const end = new Date()
                const start = new Date()
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
                return [start, end]
            },
        },
        {
            text: '未来一个星期',
            value: () => {
                const end = new Date()
                const start = new Date()
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 7)
                return [start, end]
            },
        },
        {
            text: '未来一个月',
            value: () => {
                const end = new Date()
                const start = new Date()
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 30)
                return [start, end]
            },
        },
        {
            text: '未来三个月',
            value: () => {
                const end = new Date()
                const start = new Date()
                end.setTime(end.getTime() + 3600 * 1000 * 24 * 90)
                return [start, end]
            },
        },
    ]
    /* Data E */
</script>

<style></style>
