export default () => ({
    title: '导航菜单',
    name: 'nav',
    content: {
        enabled: 1,
        style: 1, // 展示样式1=固定显示，2=分页显示
        per_line: 5, // 每行显示数量
        show_line: 2, // 显示行数
        data: [
            {
                image: '',
                name: '导航名称',
                link: {}
            }
        ]
    },
    styles: {}
})
