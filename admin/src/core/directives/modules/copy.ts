/**
 * copy 复制指令(用于复制文本)
 * 指令用法：
 *  <el-button v-copy="copyValue">复制</el-button>
 * copyValue为需要复制的值
 */

import { ElMessage } from 'element-plus'
import Clipboard from 'clipboard'
;(function copyboard() {
    const clipboard = new Clipboard('.copy-btn')

    clipboard.on('success', e => {
        ElMessage.success('复制成功')
        e.clearSelection()
    })

    clipboard.on('error', err => {
        console.error(err)
        ElMessage.success('复制失败')
    })
})()

export default {
    mounted: (el: HTMLElement, binding: any) => {
        el.className = el.className + ' copy-btn'
        el.setAttribute('data-clipboard-text', binding.value)
    },
    updated: (el: HTMLElement, binding: any) => {
        el.setAttribute('data-clipboard-text', binding.value)
    }
}
