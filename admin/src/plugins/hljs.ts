import { App } from '@vue/runtime-core'
import 'highlight.js/styles/github.css'
import 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'

export default (app: App<Element>) => {
    app.use(hljsVuePlugin)
}