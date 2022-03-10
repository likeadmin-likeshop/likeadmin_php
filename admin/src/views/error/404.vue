<template>
    <div class="error404">
        <error :code="404" title="哎呀，出错了！您访问的页面不存在…"></error>
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
