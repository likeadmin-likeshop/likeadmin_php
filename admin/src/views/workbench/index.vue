<template>
    <div class="workbench">
        <div class="flex workbench-header">
            <el-card class="flex-1" shadow="never">
                <template #header>
                    <span class="card-title">账号信息</span>
                </template>
                <div>
                    <div class="m-b-20">版本号：{{ workbenchData.version.version }}</div>
                    <div>官网地址：{{ workbenchData.version.website }}</div>
                </div>
            </el-card>
            <el-card class="flex-3 m-l-15" shadow="never">
                <template #header>
                    <div>
                        <span class="card-title">今日数据</span>
                        <span class="muted xs m-l-15"
                            >更新时间：{{ workbenchData.today.time }}</span
                        >
                    </div>
                </template>

                <div class="flex">
                    <div class="flex-1">
                        <div class="lighter m-b-10">访问量</div>
                        <div class="f-s-32 m-b-10">
                            {{ workbenchData.today.today_visitor }}
                        </div>
                        <div class="lighter">总访问量：{{ workbenchData.today.total_visitor }}</div>
                    </div>
                    <div class="flex-1">
                        <div class="lighter m-b-10">销售额</div>
                        <div class="f-s-32 m-b-10">
                            {{ workbenchData.today.today_sales }}
                        </div>
                        <div class="lighter">总销售额：{{ workbenchData.today.total_sales }}</div>
                    </div>
                    <div class="flex-1">
                        <div class="lighter m-b-10">新增用户</div>
                        <div class="f-s-32 m-b-10">
                            {{ workbenchData.today.today_new_user }}
                        </div>
                        <div class="lighter">
                            总访用户：{{ workbenchData.today.total_new_user }}
                        </div>
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
                        v-for="item in workbenchData.menu"
                        :key="item"
                        class="nav-item flex-col m-t-10"
                    >
                        <router-link :to="item.url">
                            <view class="flex flex-center">
                            	<el-image style="width: 48px; height: 48px" :src="item?.image"></el-image>
                            </view>
                            <div class="m-t-8 normal text-center">{{ item.name }}</div>
                        </router-link>
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
                    <v-chart class="chart" :option="workbenchData.visitorOption" />
                </div>
            </el-card>
            <el-card class="flex-1 m-l-15" shadow="never">
                <template #header>
                    <div>
                        <span class="card-title">文章阅读量排名</span>
                    </div>
                </template>

                <div class="ranking-centent">
                    <el-table :data="workbenchData.article" size="medium">
                        <el-table-column label="排名" min-width="70" type="index">
                            <template #default="scope">
                                <div
                                    v-if="scope.$index == 0"
                                    class="icon"
                                    style="background: #f86056; color: #fff"
                                >
                                    {{ scope.$index + 1 }}
                                </div>
                                <div
                                    v-if="scope.$index == 1"
                                    class="icon"
                                    style="background: #fc8d2e; color: #fff"
                                >
                                    {{ scope.$index + 1 }}
                                </div>
                                <div
                                    v-if="scope.$index == 2"
                                    class="icon"
                                    style="background: #fcbc2e; color: #fff"
                                >
                                    {{ scope.$index + 1 }}
                                </div>
                                <div v-if="scope.$index > 2" class="icon">
                                    {{ scope.$index + 1 }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="name" label="文章名称"> </el-table-column>
                        <el-table-column prop="read" label="阅读量"> </el-table-column>
                    </el-table>
                </div>
            </el-card>
        </div>

        <!-- <material-select /> -->
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { apiWorkbench } from '@/api/workbench'
export default defineComponent({
    setup() {
        // 表单数据
        const workbenchData = reactive({
            version: {
                version: '', // 版本号
                website: '' // 官网
            },

            today: {}, // 今日数据
            menu: [], // 常用功能
            visitor: [], // 访问量
            article: [], // 文章阅读量

            visitorOption: {
                xAxis: {
                    type: 'category',
                    data: [0]
                },
                yAxis: {
                    type: 'value'
                },
                legend: {
                    data: ['访问量']
                },
                itemStyle: {
                    // 点的颜色。
                    color: 'red'
                },
                tooltip: {
                    trigger: 'axis'
                },
                series: [
                    {
                        name: '访问量',
                        data: [0],
                        type: 'line'
                        //smooth: true,
                    }
                ]
            }
        })

        // 获取工作台主页数据
        const getWorkbench = () => {
            apiWorkbench()
                .then((res: any) => {
                    console.log('res', res)
                    workbenchData.version = res.version
                    workbenchData.today = res.today
                    workbenchData.menu = res.menu
                    workbenchData.visitor = res.visitor
                    workbenchData.article = res.article

                    // 清空echarts 数据
                    workbenchData.visitorOption.xAxis.data = []
                    workbenchData.visitorOption.series[0].data = []

                    // 写入从后台拿来的数据
                    res.visitor.date.reverse().forEach((item: any) => {
                        workbenchData.visitorOption.xAxis.data.push(item)
                    })
                    res.visitor.list[0].data.forEach((item: any) => {
                        workbenchData.visitorOption.series[0].data.push(item)
                    })
                })
                .catch((err: any) => {
                    console.log('err', err)
                })
        }

        onMounted(() => {
            getWorkbench()
        })

        return {
            workbenchData,
            getWorkbench
        }
    }
})
</script>

<style lang="scss" scoped>
.workbench {
    .card-title {
        position: relative;
        font-weight: 500;
        padding-left: 10px;
        font-size: 14px;
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
            // flex-wrap: wrap;

            .nav-item {
                min-width: 210px;
            }
        }
    }

    .ranking {
        &-centent {
            height: 530px;
        }
    }

    .icon {
        width: 25px;
        height: 25px;
        color: #333;
        border-radius: 2px;
        background: #f5f5f5;
        font-family: 'PingFang SC';
        font-weight: normal;
        font-size: 12px;
        line-height: 25px;
        text-align: center;
    }
}
</style>
