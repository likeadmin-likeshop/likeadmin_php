<template>
    <div class="workbench">
        <div class="lg:flex">
            <el-card class="!border-none mb-4 lg:mr-4 lg:w-[350px]" shadow="never">
                <template #header>
                    <span class="card-title">版本信息</span>
                </template>
                <div>
                    <div class="flex leading-9">
                        <div class="w-20">平台名称</div>
                        <span> {{ workbenchData.version.name }}</span>
                    </div>
                    <div class="flex leading-9">
                        <div class="w-20">当前版本</div>
                        <span> {{ workbenchData.version.version }}</span>
                    </div>
                    <div class="flex leading-9">
                        <div class="w-20">获取渠道</div>
                        <div>
                            <a :href="workbenchData.version.channel.website" target="_blank">
                                <el-button type="success" size="small">官网</el-button>
                            </a>
                            <a
                                class="ml-3"
                                :href="workbenchData.version.channel.gitee"
                                target="_blank"
                            >
                                <el-button type="danger" size="small">Gitee</el-button>
                            </a>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="!border-none mb-4 flex-1" shadow="never">
                <template #header>
                    <div>
                        <span class="card-title">今日数据</span>
                        <span class="text-tx-secondary text-xs ml-4">
                            更新时间：{{ workbenchData.today.time }}
                        </span>
                    </div>
                </template>

                <div class="flex flex-wrap">
                    <div class="w-1/2 md:w-1/4">
                        <div class="leading-10">销售额</div>
                        <div class="text-6xl">{{ workbenchData.today.today_sales }}</div>
                        <div class="text-tx-secondary text-xs">
                            总：{{ workbenchData.today.total_sales }}
                        </div>
                    </div>
                    <div class="w-1/2 md:w-1/4">
                        <div class="leading-10">成交订单</div>
                        <div class="text-6xl">{{ workbenchData.today.order_num }}</div>
                        <div class="text-tx-secondary text-xs">
                            总：{{ workbenchData.today.order_sum }}
                        </div>
                    </div>
                    <div class="w-1/2 md:w-1/4">
                        <div class="leading-10">新增用户</div>
                        <div class="text-6xl">{{ workbenchData.today.today_new_user }}</div>
                        <div class="text-tx-secondary text-xs">
                            总：{{ workbenchData.today.total_new_user }}
                        </div>
                    </div>
                    <div class="w-1/2 md:w-1/4">
                        <div class="leading-10">新增访问量</div>
                        <div class="text-6xl">{{ workbenchData.today.today_visitor }}</div>
                        <div class="text-tx-secondary text-xs">
                            总：{{ workbenchData.today.total_visitor }}
                        </div>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="function mb-4">
            <el-card class="flex-1 !border-none" shadow="never">
                <template #header>
                    <span>常用功能</span>
                </template>
                <div class="flex flex-wrap">
                    <div
                        v-for="item in workbenchData.menu"
                        class="md:w-[12.5%] w-1/4 flex flex-col items-center"
                        :key="item"
                    >
                        <router-link :to="item.url" class="mb-3 flex flex-col items-center">
                            <image-contain width="40px" height="40px" :src="item?.image" />
                            <div class="mt-2">{{ item.name }}</div>
                        </router-link>
                    </div>
                </div>
            </el-card>
        </div>
        <div class="md:flex">
            <el-card class="flex-1 !border-none md:mr-4 mb-4" shadow="never">
                <template #header>
                    <span>访问量趋势图</span>
                </template>
                <div>
                    <v-charts
                        style="height: 350px"
                        :option="workbenchData.visitorOption"
                        :autoresize="true"
                    />
                </div>
            </el-card>
        </div>
    </div>
</template>

<script lang="ts" setup name="workbench">
import { getWorkbench } from '@/api/app'
import vCharts from 'vue-echarts'
// 表单数据
const workbenchData: any = reactive({
    version: {
        version: '', // 版本号
        website: '', // 官网
        based: '',
        channel: {
            gitee: '',
            website: ''
        }
    },
    support: [],
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
                type: 'line',
                smooth: true
            }
        ]
    }
})

// 获取工作台主页数据
const getData = () => {
    getWorkbench()
        .then((res: any) => {
            workbenchData.version = res.version
            workbenchData.today = res.today
            workbenchData.menu = res.menu
            workbenchData.visitor = res.visitor
            workbenchData.support = res.support

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
    getData()
})
</script>

<style lang="scss" scoped></style>
