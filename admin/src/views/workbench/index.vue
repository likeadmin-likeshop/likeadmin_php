<template>
    <div class="workbench">
        <div class="flex workbench-header">
            <el-card class="flex-1" shadow="never">
                <template #header>
                    <span class="card-title">账号信息</span>
                </template>
                <div>
                    <div class="m-b-20">版本号：v1.4.0</div>
                    <div>官网地址：www.likeadmin.cn</div>
                </div>
            </el-card>
            <el-card class="flex-3 m-l-15" shadow="never">
                <template #header>
                    <div>
                        <span class="card-title">今日数据</span>
                        <span class="muted xs m-l-15"
                            >更新时间：2021-11-15 11:16</span
                        >
                    </div>
                </template>

                <div class="flex">
                    <div class="flex-1">
                        <div class="lighter m-b-10">访问量</div>
                        <div class="f-s-32 m-b-10">290</div>
                        <div class="lighter">总访问量：3000</div>
                    </div>
                    <div class="flex-1">
                        <div class="lighter m-b-10">访问量</div>
                        <div class="f-s-32 m-b-10">290</div>
                        <div class="lighter">总访问量：3000</div>
                    </div>
                    <div class="flex-1">
                        <div class="lighter m-b-10">访问量</div>
                        <div class="f-s-32 m-b-10">290</div>
                        <div class="lighter">总访问量：3000</div>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="m-t-15 function">
            <el-card class="flex-1" shadow="never">
                <template #header>
                    <span class="card-title">常用功能</span>
                </template>
                <div class="nav-lists">
                    <div
                        class="nav-item flex flex-col flex-center m-t-10"
                        v-for="item in 15"
                        :key="item"
                    >
                        <el-image style="width: 48px; height: 48px" src="">
                        </el-image>
                        <div class="m-t-8">工作台</div>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="flex m-t-15 ranking">
            <el-card class="flex-1" shadow="never">
                <template #header>
                    <span class="card-title">访问量趋势图</span>
                </template>
                <div class="ranking-centent">
                    <!-- <e-chart class="chart" :option="business" /> -->
                </div>
            </el-card>
            <el-card class="flex-1 m-l-15" shadow="never">
                <template #header>
                    <div>
                        <span class="card-title">文章阅读量排名</span>
                    </div>
                </template>

                <div class="ranking-centent">
                    <el-table :data="[]" size="medium">
                        <el-table-column label="排名" min-width="70">
                        </el-table-column>
                        <el-table-column
                            label="用户信息"
                            min-width="300"
                            show-overflow-tooltip
                        >
                            <template v-slot="scope">
                                <div class="flex">
                                    <el-image
                                        :src="scope.row.avatar"
                                        style="width: 34px; height: 34px"
                                        class="flex-none"
                                    >
                                    </el-image>
                                    <div class="m-l-10 line-1">
                                        {{ scope.row.nickname }}
                                    </div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="total_num" label="成交单数">
                        </el-table-column>
                        <el-table-column
                            prop="total_order_amount"
                            label="消费金额"
                        >
                            <template v-slot="scope">
                                ¥{{ scope.row.total_order_amount }}
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>

            <!-- <material-select /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    setup() {
       
    },
})
</script>

<style lang="scss" scoped>
.workbench {
    .card-title {
        position: relative;
        font-weight: 500;
        padding-left: 10px;
        &::before {
            position: absolute;
            content: '';
            display: inline-block;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 3px;
            height: 80%;
            background: $color-primary;
        }
    }
    .function {
        .nav-lists {
            display: flex;
            flex-wrap: wrap;
            .nav-item {
                min-width: 120px;
            }
        }
    }
    .ranking {
        &-centent {
            height: 530px;
        }
    }
}
</style>
