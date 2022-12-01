/**
 * @description 定义所有的位置
 */
export type WidgetConfigArea = 'left' | 'right' | 'top' | 'main' | 'bottom'

/**
 * @description 基础骨架组件基础配置
 */
export interface WidgetConfig {
  //名称
  name: string
  //插入的区域
  area: WidgetConfigArea
  //区域中的位置
  align?: 'left' | 'right' | 'bottom' | 'center' | 'top'
  //组件内容
  content?: any
  //组件属性
  contentProps?: Record<string, any>
  [extra: string]: any
}
