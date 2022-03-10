import ECharts from 'vue-echarts'
import { use } from 'echarts/core'
import { App } from '@vue/runtime-core'

// 手动引入 ECharts 各模块来减小打包体积
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart, LineChart } from 'echarts/charts'
import {
    GridComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent
} from 'echarts/components'

use([
    CanvasRenderer,
    BarChart,
    PieChart,
    GridComponent,
    TooltipComponent,
    TitleComponent,
    LegendComponent,
    LineChart
])

export default (app: App) => {
    app.component('VChart', ECharts)
}
