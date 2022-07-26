<template>
    <div class="error404">
        <error
            code="403"
            title="您的账号权限不足，请联系管理员添加权限！"
            :show-btn="false"
        ></error>
    </div>
</template>

<script lang="ts" setup>
import Error from './components/error.vue'
</script>
