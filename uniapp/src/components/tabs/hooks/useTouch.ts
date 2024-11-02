import { reactive } from 'vue'

/**
 * @description 触碰屏幕钩子函数
 * @return { Function } 暴露钩子
 */
export function useTouch() {
    // 最小移动距离
    const MIN_DISTANCE = 10

    const touch = reactive<any>({
        direction: '',
        deltaX: 0,
        deltaY: 0,
        offsetX: 0,
        offsetY: 0
    })

    /**
     * @description 计算距离
     * @return { string } 空字符串
     */
    const getDirection = (x: number, y: number) => {
        if (x > y && x > MIN_DISTANCE) {
            return 'horizontal'
        }
        if (y > x && y > MIN_DISTANCE) {
            return 'vertical'
        }
        return ''
    }

    /**
     * @description 重置参数
     */
    const resetTouchStatus = () => {
        touch.direction = ''
        touch.deltaX = 0
        touch.deltaY = 0
        touch.offsetX = 0
        touch.offsetY = 0
    }

    /**
     * @description 触发
     */
    const touchStart = (event: any) => {
        resetTouchStatus()
        const events = event.touches[0]
        touch.startX = events.clientX
        touch.startY = events.clientY
    }

    /**
     * @description 移动
     */
    const touchMove = (event: any) => {
        const events = event.touches[0]
        touch.deltaX = events.clientX - touch.startX
        touch.deltaY = events.clientY - touch.startY
        touch.offsetX = Math.abs(touch.deltaX)
        touch.offsetY = Math.abs(touch.deltaY)
        touch.direction = touch.direction || getDirection(touch.offsetX, touch.offsetY)
    }

    return {
        touch,
        resetTouchStatus,
        touchStart,
        touchMove
    }
}
