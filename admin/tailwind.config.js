/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        colors: {
            //白色
            white: 'var(--color-white)',
            //主题色
            primary: {
                DEFAULT: 'var(--el-color-primary)',
                'light-3': 'var(--el-color-primary-light-3)',
                'light-5': 'var(--el-color-primary-light-5)',
                'light-7': 'var(--el-color-primary-light-7)',
                'light-8': 'var(--el-color-primary-light-8)',
                'light-9': 'var(--el-color-primary-light-9)',
                'dark-2': 'var(--el-color-primary-dark-2)'
            },
            //成功
            success: 'var(--el-color-success)',
            //警告
            warning: 'var(--el-color-warning)',
            //危险
            danger: 'var(--el-color-danger)',
            //危险
            error: 'var(--el-color-error)',
            //信息
            info: 'var(--el-color-info)',
            //body背景
            body: 'var(--el-bg-color)',
            //页面背景
            page: 'var(--el-bg-color-page)',
            //主要字体颜色
            'tx-primary': 'var(--el-text-color-primary)',
            //次要字体颜色
            'tx-regular': 'var(--el-text-color-regular)',
            //次次要字体颜色
            'tx-secondary': 'var(--el-text-color-secondary)',
            //占位字体颜色
            'tx-placeholder': 'var(--el-text-color-placeholder)',
            //禁用颜色
            'tx-disabled': 'var(--el-text-color-disabled)',
            //边框颜色
            br: 'var(--el-border-color)',
            //边框颜色-浅
            'br-light': 'var(--el-border-color-light)',
            //边框颜色-更浅
            'br-extra-light': 'var(--el-border-color-extra-light)',
            //边框颜色-深
            'br-dark': 'var( --el-border-color-dark)',
            //填充色
            fill: 'var(--el-fill-color)',
            'fill-lighter': 'var(--el-fill-color-lighter)',
            //朦层颜色
            mask: 'var(--el-mask-color)'
        },
        fontFamily: {
            sans: ['PingFang SC', 'Arial', 'Hiragino Sans GB', 'Microsoft YaHei', 'sans-serif']
        },
        boxShadow: {
            DEFAULT: 'var(--el-box-shadow)',
            light: 'var(--el-box-shadow-light)',
            lighter: 'var(--el-box-shadow-lighter)',
            dark: 'var(--el-box-shadow-dark)'
        },
        fontSize: {
            xs: 'var(--el-font-size-extra-small)',
            sm: 'var( --el-font-size-small)',
            base: 'var( --el-font-size-base)',
            lg: 'var( --el-font-size-medium)',
            xl: 'var( --el-font-size-large)',
            '2xl': 'var( --el-font-size-extra-large)',
            '3xl': '20px',
            '4xl': '24px',
            '5xl': '28px',
            '6xl': '30px',
            '7xl': '36px',
            '8xl': '48px',
            '9xl': '60px'
        }
    },

    plugins: []
}
