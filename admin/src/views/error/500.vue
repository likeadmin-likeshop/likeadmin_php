<template>
    <div class="error500">
        <error :code="500" title="哎呀，出错了！系统错误，请稍后再试…"></error>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Error from './components/error.vue'
export default defineComponent({
    components: {
        Error
    },
    setup() {}
})
</script>
<style lang="scss" scoped></style>
