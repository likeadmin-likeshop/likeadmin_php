<template>
    <div class="w-[250px] search">
        <ElInput
            v-model.trim="searchKeyword"
            placeholder="请输入关键词"
            :suffix-icon="Search"
            @keyup.enter="handleToSearch"
        />
    </div>
</template>
<script lang="ts" setup>
import { ElInput } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import feedback from '~~/utils/feedback'
const router = useRouter()
const route = useRoute()
const searchKeyword = ref()
const handleToSearch = () => {
    if (!searchKeyword.value) return feedback.msgError('请输入关键词')
    router.push({
        path: '/information/search',
        query: {
            keywords: searchKeyword.value
        }
    })
}
watch(
    route,
    (routeNew) => {
        if (routeNew.path == '/information/search') {
            searchKeyword.value = routeNew.query.keywords
        } else {
            searchKeyword.value = ''
        }
    },
    {
        immediate: true
    }
)
</script>

<style lang="scss" scoped>
.search {
    :deep(.el-input) {
        .el-input__wrapper {
            border-radius: 16px;
        }
    }
}
</style>
