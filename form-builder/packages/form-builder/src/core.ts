import { Designer, setupDefault, setupDesigner } from '@form-builder/designer'
import type { DesignerConfig } from '@form-builder/designer'
import type { App, Plugin } from 'vue'

export default {
  install(app: App, config?: DesignerConfig) {
    const designer = new Designer(config)
    setupDesigner(designer, app)
    setupDefault(designer, app)
  }
} as Plugin
