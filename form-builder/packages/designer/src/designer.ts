import * as widgets from '@form-builder/widgets'
import { widgetCategory } from './constant'
import { ToolWidget } from './toolbar'
export class Designer {
  formWidget: any[]
  toolWidget: ToolWidget
  widget
  constructor() {
    this.formWidget = []
    this.toolWidget = new ToolWidget(widgetCategory, widgets)
  }
}
