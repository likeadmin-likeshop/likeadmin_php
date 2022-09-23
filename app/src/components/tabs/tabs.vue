<template>
    <view class="tabs">
        <u-sticky :enable="isFixed" :bg-color="stickyBgColor" :offset-top="top" :h5-nav-height="0">
            <view
                :id="id"
                :style="{
                    background: bgColor
                }"
            >
                <scroll-view
                    :style="{ height: height + 'rpx' }"
                    scroll-x
                    class="scroll-view"
                    :scroll-left="scrollLeft"
                    scroll-with-animation
                >
                    <view class="scroll-box" :class="{ 'tabs-scorll-flex': !isScroll }">
                        <view
                            class="tab-item line1"
                            :id="'tab-item-' + index"
                            v-for="(item, index) in list"
                            :key="index"
                            @tap="clickTab(index)"
                            :style="[tabItemStyle(index)]"
                        >
                            <u-badge
                                :count="item[count] || item['dot'] || 0"
                                :offset="offset"
                                size="mini"
                            ></u-badge>
                            {{ item[name] || item['name'] }}
                        </view>
                        <view v-if="showBar" class="tab-bar" :style="[tabBarStyle]"></view>
                    </view>
                </scroll-view>
            </view>
        </u-sticky>
        <view
            class="tab-content"
            @touchstart="onTouchStart"
            @touchmove="onTouchMove"
            @touchcancel="onTouchEnd"
            @touchend="onTouchEnd"
        >
            <!-- <view class="tab-track" :class="{'tab-animated': animated}" :style="[trackStyle]"> -->
            <view>
                <slot></slot>
            </view>
            <!-- </view> -->
        </view>
    </view>
</template>

<script lang="ts" setup>
import { getRect } from '@/utils/util'
import {
    ref,
    reactive,
    computed,
    watch,
    provide,
    nextTick,
    onMounted,
    getCurrentInstance
} from 'vue'
import { useTouch } from '@/hooks/useTouch'

// Touch 钩子
const { touch, resetTouchStatus, touchStart, touchMove } = useTouch()

const emit = defineEmits<{
    (event: 'change', value: number): void
}>()

const props = withDefaults(
    defineProps<{
        isScroll?: boolean // 导航菜单是否需要滚动，如只有2或者3个的时候，就不需要滚动了，此时使用flex平分tab的宽度
        current?: number | string // 当前活动tab的索引
        height?: number | string // 导航栏的高度和行高
        fontSize?: number | string // 字体大小
        duration?: number | string // 过渡动画时长, 单位ms
        activeColor?: number | string // 选中项的主题颜色
        inactiveColor?: number | string // 未选中项的颜色
        barWidth?: number | string // 菜单底部移动的bar的宽度，单位rpx
        barHeight?: number // 移动bar的高度
        gutter?: number | string // 单个tab的左或有内边距（左右相同）
        bgColor?: number | string // 导航栏的背景颜色
        name?: string // 读取传入的数组对象的属性(tab名称)
        count?: string // 读取传入的数组对象的属性(徽标数)
        offset?: number[] // 徽标数位置偏移
        bold?: boolean // 活动tab字体是否加粗
        activeItemStyle?: any // 当前活动tab item的样式
        showBar?: boolean // 是否显示底部的滑块
        barStyle?: any // 底部滑块的自定义样式
        itemWidth?: string // 标签的宽度
        isFixed?: boolean // 吸顶是否固定
        top?: number | string // 吸顶顶部距离
        stickyBgColor?: string // 吸顶颜色

        swipeable: boolean // 是否允许滑动切换
        // animated: boolean                   // 切换动画
    }>(),
    {
        isScroll: true,
        current: 0,
        height: 80,
        fontSize: 28,
        duration: 0.3,
        activeColor: '#2073F4',
        inactiveColor: '#333',
        barWidth: 40,
        barHeight: 4,
        gutter: 30,
        bgColor: '#FFFFFF',
        name: 'name',
        count: 'count',
        offset: [5, 20],
        bold: true,
        activeItemStyle: {},
        showBar: true,
        barStyle: {},
        itemWidth: 'auto',
        isFixed: false,
        top: 0,
        stickyBgColor: '#FFFFFF',

        swipeable: true
        // animated: true
    }
)

const list = ref<any>([])
const childrens = ref<any>([])
const scrollLeft = ref<number>(0) // 滚动scroll-view的左边滚动距离
const tabQueryInfo = ref<any>([]) // 存放对tab菜单查询后的节点信息
const componentWidth = ref<number>(0) // 屏幕宽度，单位为px
const scrollBarLeft = ref<number>(0) // 移动bar需要通过translateX()移动的距离
const parentLeft = ref<number>(0) // 父元素(tabs组件)到屏幕左边的距离
const id = ref<string>('cu-tab') // id值
const currentIndex = ref<any>(props.current)
const barFirstTimeMove = ref<boolean>(true) // 滑块第一次移动时(页面刚生成时)，无需动画，否则给人怪异的感觉
const swiping = ref<boolean>(false)

//@ts-ignore
const ctx = getCurrentInstance()

// 监听tab的变化，重新计算tab菜单的布局信息，因为实际使用中菜单可能是通过
// 后台获取的（如新闻app顶部的菜单），获取返回需要一定时间，所以list变化时，重新获取布局信息
watch(
    () => list.value,
    async (n, o) => {
        // list变动时，重制内部索引，否则可能导致超出数组边界的情况
        if (!barFirstTimeMove.value && n.length !== o.length) {
            currentIndex.value = 0
        }
        // 用$nextTick等待视图更新完毕后再计算tab的局部信息，否则可能因为tab还没生成就获取，就会有问题
        await nextTick()
        init()
    }
)
watch(
    () => props.current,
    (nVal, oVal) => {
        // 视图更新后再执行移动操作、
        nextTick(() => {
            currentIndex.value = nVal
            scrollByIndex()
        })
    },
    { immediate: true }
)

// 移动bar的样式
const tabBarStyle = computed(() => {
    const style = {
        width: props.barWidth + 'rpx',
        transform: `translate(${scrollBarLeft.value}px, -100%)`,
        // 滑块在页面渲染后第一次滑动时，无需动画效果
        'transition-duration': `${barFirstTimeMove.value ? 0 : props.duration}s`,
        'background-color': props.activeColor,
        height: props.barHeight + 'rpx',
        opacity: barFirstTimeMove.value ? 0 : 1,
        // 设置一个很大的值，它会自动取能用的最大值，不用高度的一半，是因为高度可能是单数，会有小数出现
        'border-radius': `${props.barHeight / 2}px`
    }
    Object.assign(style, props.barStyle)
    return style
})
// tab的样式
const tabItemStyle = computed(() => {
    return (index) => {
        let style: any = {
            height: props.height + 'rpx',
            'line-height': props.height + 'rpx',
            'font-size': props.fontSize + 'rpx',
            padding: props.isScroll ? `0 ${props.gutter}rpx` : '',
            flex: props.isScroll ? 'auto' : '1',
            width: `${props.itemWidth}rpx`
        }
        // 字体加粗
        if (index == currentIndex.value && props.bold) style.fontWeight = 'bold'
        if (index == currentIndex.value) {
            style.color = props.activeColor
            // 给选中的tab item添加外部自定义的样式
            style = Object.assign(style, props.activeItemStyle)
        } else {
            style.color = props.inactiveColor
        }
        return style
    }
})

// const trackStyle = computed(() => {
//     if (!props.animated) return ''
//     return {
//         left: -100 * currentIndex.value + '%',
//         'transition-duration': props.duration + 's',
//         '-webkit-transition-duration': props.duration + 's',
//     }
// })

const updateTabs = () => {
    list.value = childrens.value.map((item) => {
        const { name, dot, active, inited } = item.event
        const { updateRender } = item
        return {
            name,
            dot,
            active,
            inited,
            updateRender
        }
    })
    // nextTick(() => {
    //     init()
    // })
}

// 设置一个init方法，方便多处调用
const init = async () => {
    // 获取tabs组件的尺寸信息
    const tabRect = await getRect('#' + id.value, false, ctx)
    // tabs组件距离屏幕左边的宽度
    parentLeft.value = tabRect.left
    // tabs组件的宽度
    componentWidth.value = tabRect.width
    getTabRect()
}

// 点击某一个tab菜单
const clickTab = (index) => {
    // 点击当前活动tab，不触发事件
    if (index == currentIndex.value) return
    nextTick(() => {
        currentIndex.value = index
        scrollByIndex()
    })
    // 发送事件给父组件
    emit('change', index)
}

// 查询tab的布局信息
const getTabRect = () => {
    // 创建节点查询
    const query: any = uni.createSelectorQuery().in(ctx)
    // 历遍所有tab，这里是执行了查询，最终使用exec()会一次性返回查询的数组结果
    for (let i = 0; i < list.value.length; i++) {
        // 只要size和rect两个参数
        query.select(`#tab-item-${i}`).fields({
            size: true,
            rect: true
        })
    }
    // 执行查询，一次性获取多个结果
    query.exec((res) => {
        tabQueryInfo.value = res
        // 初始化滚动条和移动bar的位置
        scrollByIndex()
    })
}

// 滚动scroll-view，让活动的tab处于屏幕的中间位置
const scrollByIndex = () => {
    // 当前活动tab的布局信息，有tab菜单的width和left(为元素左边界到父元素左边界的距离)等信息
    const tabInfo = tabQueryInfo.value[currentIndex.value]
    if (!tabInfo) return
    // 活动tab的宽度
    const tabWidth = tabInfo.width
    // 活动item的左边到tabs组件左边的距离，用item的left减去tabs的left
    const offsetLeft = tabInfo.left - parentLeft.value
    // 将活动的tabs-item移动到屏幕正中间，实际上是对scroll-view的移动
    const scrollLefts = offsetLeft - (componentWidth.value - tabWidth) / 2
    scrollLeft.value = scrollLefts < 0 ? 0 : scrollLefts
    // 当前活动item的中点点到左边的距离减去滑块宽度的一半，即可得到滑块所需的移动距离
    const left = tabInfo.left + tabInfo.width / 2 - parentLeft.value
    // 计算当前活跃item到组件左边的距离
    scrollBarLeft.value = left - uni.upx2px(props.barWidth) / 2
    // 第一次移动滑块的时候，barFirstTimeMove为true，放到延时中将其设置false
    // 延时是因为scrollBarLeft作用于computed计算时，需要一个过程需，否则导致出错
    if (barFirstTimeMove.value == true) {
        setTimeout(() => {
            barFirstTimeMove.value = false
        }, 100)
    }

    // 更新子组件的显示
    childrens.value.forEach((item, ind) => {
        const active = ind === currentIndex.value
        if (active !== item.event.active || !item.event.inited) {
            item.updateRender(active)
        }
    })
}
// 子组件调用此函数而产生的事件通信
const handleChange = (event, updateRender) => {
    childrens.value.push({ event: event, updateRender })
}
// 手指触摸
const onTouchStart = (event) => {
    if (!props.swipeable) return
    swiping.value = true
    touchStart(event)
}
// 手指滑动
const onTouchMove = (event) => {
    if (!props.swipeable || !swiping.value) return
    touchMove(event)
}
// 手指滑动结束
const onTouchEnd = () => {
    if (!props.swipeable || !swiping.value) return
    const minSwipeDistance = 50
    if (touch.direction === 'horizontal' && touch.offsetX >= minSwipeDistance) {
        let index,
            len = list.value.length,
            curIndex = currentIndex.value
        if (touch.deltaX <= 0) {
            curIndex >= len - 1 ? (index = 0) : (index = curIndex + 1)
        } else {
            curIndex <= 0 ? (index = len - 1) : (index = curIndex - 1)
        }
        nextTick(() => {
            currentIndex.value = index
            scrollByIndex()
        })
        // 发送事件给父组件
        emit('change', index)
    }
    swiping.value = false
}

onMounted(() => {
    updateTabs()
})

provide('handleChange', handleChange)
provide('updateTabs', updateTabs)
</script>

<style lang="scss" scoped>
/* #ifndef APP-NVUE */
::-webkit-scrollbar,
::-webkit-scrollbar,
::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
}

/* #endif */

.scroll-box {
    height: 100%;
    position: relative;
    /* #ifdef MP-TOUTIAO */
    white-space: nowrap;
    /* #endif */
}

.tab-fixed {
    position: sticky;
    top: 0;
    width: 100%;
}

/* #ifdef H5 */
// 通过样式穿透，隐藏H5下，scroll-view下的滚动条
scroll-view ::v-deep ::-webkit-scrollbar {
    display: none;
    width: 0 !important;
    height: 0 !important;
    -webkit-appearance: none;
    background: transparent;
}

/* #endif */

.scroll-view {
    width: 100%;
    white-space: nowrap;
    position: relative;
}

.tab-item {
    position: relative;
    /* #ifndef APP-NVUE */
    display: inline-block;
    /* #endif */
    text-align: center;
    transition-property: background-color, color;
}

.tab-bar {
    position: absolute;
    bottom: 6rpx;
}

.tabs-scorll-flex {
    display: flex;
    justify-content: space-between;
}

// .tab-content {
//     overflow: hidden;
//     .tab-track {
//         position: relative;
//         width: 100%;
//         height: 100%;
//     }
//     .tab-animated {
//         display: flex;
//         transition-property: left;
//     }
// }
</style>
