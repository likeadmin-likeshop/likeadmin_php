export default () => ({
    title: '首页轮播图',
    name: 'banner',
    content: {
        enabled: 1,
        style: 1, // 展示样式---1=常规，2=大屏
        bg_style: 0, // 背景联动---0=关闭，1=开启
        data: [
            {
                is_show: '1',
                image: '',
                bg: '',
                name: '',
                link: {}
            }
        ]
    },
    styles: {}
})
