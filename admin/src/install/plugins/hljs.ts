import 'highlight.js/styles/github.css'

import hljsVuePlugin from '@highlightjs/vue-plugin'
import hljs from 'highlight.js'
import type { App } from 'vue'
console.log(hljs)

export default (app: App<Element>) => {
    app.use(hljsVuePlugin)
}
