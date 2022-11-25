import { FormBuildView } from '@form-builder/designer'
import type { App } from 'vue'
const install = function (app: App) {
  app.use(FormBuildView)
}

export default {
  install,
  FormBuildView
}
