import { App } from '@vue/runtime-core'
import 'highlight.js/styles/github.css'
import highlight from 'highlight.js'
import hljsVuePlugin from '@highlightjs/vue-plugin'
console.log(highlight)
export default (app: App<Element>) => {
    app.use(hljsVuePlugin)
}