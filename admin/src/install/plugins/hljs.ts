import type { App } from 'vue'
import 'highlight.js/styles/github.css'
import hljs from 'highlight.js/lib/common'
import hljsVuePlugin from '@highlightjs/vue-plugin'
console.log(hljs)
export default (app: App<Element>) => {
    app.use(hljsVuePlugin)
}
