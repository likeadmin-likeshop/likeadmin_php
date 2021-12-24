<template>
    <div class="workbench">
        工作台
        <!-- <el-button @click="refresh">刷新</el-button>
        <pagination :page-size="10" :fun="login" ref="paginationRefs">
            <template v-slot="{ lists }">
                <el-table :data="lists" style="width: 100%">
                    <el-table-column prop="date" label="Date" width="180" />
                    <el-table-column prop="name" label="Name" width="180" />
                    <el-table-column prop="address" label="Address" />
                </el-table>
            </template>
        </pagination> -->
    </div>
</template>

<script>
import pagination from '@/components/pagination'
import { login } from '@/api/user'
import { onMounted, ref } from 'vue'
export default {
    components: {
        pagination,
    },
    setup() {
        const paginationRefs = ref(null)

        const refresh = () => {
            paginationRefs.value.refresh()
        }
        onMounted(() => {
            console.log(paginationRefs)
        })
        return {
            login,
            paginationRefs,
            refresh
        }
    },
}
</script>

<style lang="scss" scoped>
</style>
