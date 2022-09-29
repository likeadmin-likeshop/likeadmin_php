<template>
    <div class="error404">
        <error code="403" title="您的账号权限不足，请联系管理员添加权限！" :show-btn="false">
            <template #content>
                <div class="flex justify-center">
                    <img class="w-[150px] h-[150px]" src="@/assets/images/no_perms.png" alt="" />
                </div>
            </template>
        </error>
    </div>
</template>

<script lang="ts" setup>
import Error from './components/error.vue'
</script>
