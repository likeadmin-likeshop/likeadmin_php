import echarts from '@/install/plugins/echart'
import { nextTick, onUnmounted, unref } from 'vue'
import type { ShallowRef } from 'vue'
import type { EChartsOption } from 'echarts'
import { useEventListener } from '@vueuse/core'
import { throttle } from 'lodash'
interface IOptions {
  //vue ShallowRef对象
  elRef: ShallowRef<HTMLElement> | HTMLElement
  // 自动重新渲染图
  autoSize?: boolean
}

const defaultOptions = {
  elRef: null,
  autoSize: true
}

export default function useChart(options: IOptions) {
  const mergeOptions: IOptions = Object.assign({}, defaultOptions, options)
  let chartInstance: echarts.ECharts | null = null
  const initCharts = () => {
    const el = unref(mergeOptions.elRef)
    if (!el) {
      throw new Error('options elRel is null or undefined')
    }
    chartInstance = echarts.init(el)
  }
  // 设置数据
  const setOption = (option: EChartsOption) => {
    nextTick(() => {
      initCharts()
      if (!chartInstance) {
        throw new Error('chartInstance is null')
      }
      chartInstance.setOption(option)
    })
  }
  // 自动重新渲染图
  if (mergeOptions.autoSize) {
    useEventListener(
      window,
      'resize',
      throttle(() => {
        chartInstance?.resize()
      }, 500)
    )
  }

  // 组件卸载，销毁实例
  onUnmounted(() => {
    chartInstance?.dispose()
  })
  return {
    setOption
  }
}
