/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                white: 'var(--color-white)',
                primary: {
                    DEFAULT: 'var(--el-color-primary)',
                    'light-3': 'var(--el-color-primary-light-3)',
                    'light-5': 'var(--el-color-primary-light-5)',
                    'light-7': 'var(--el-color-primary-light-7)',
                    'light-8': 'var(--el-color-primary-light-8)',
                    'light-9': 'var(--el-color-primary-light-9)',
                    'dark-2': 'var(--el-color-primary-dark-2)'
                },
                success: {
                    DEFAULT: 'var(--el-color-success)',
                    'light-3': 'var(--el-color-success-light-3)',
                    'light-5': 'var(--el-color-success-light-5)',
                    'light-7': 'var(--el-color-success-light-7)',
                    'light-8': 'var(--el-color-success-light-8)',
                    'light-9': 'var(--el-color-success-light-9)',
                    'dark-2': 'var(--el-color-success-dark-2)'
                },
                warning: {
                    DEFAULT: 'var(--el-color-warning)',
                    'light-3': 'var(--el-color-warning-light-3)',
                    'light-5': 'var(--el-color-warning-light-5)',
                    'light-7': 'var(--el-color-warning-light-7)',
                    'light-8': 'var(--el-color-warning-light-8)',
                    'light-9': 'var(--el-color-warning-light-9)',
                    'dark-2': 'var(--el-color-warning-dark-2)'
                },
                danger: {
                    DEFAULT: 'var(--el-color-danger)',
                    'light-3': 'var(--el-color-danger-light-3)',
                    'light-5': 'var(--el-color-danger-light-5)',
                    'light-7': 'var(--el-color-danger-light-7)',
                    'light-8': 'var(--el-color-danger-light-8)',
                    'light-9': 'var(--el-color-danger-light-9)',
                    'dark-2': 'var(--el-color-danger-dark-2)'
                },
                error: {
                    DEFAULT: 'var(--el-color-error)',
                    'light-3': 'var(--el-color-error-light-3)',
                    'light-5': 'var(--el-color-error-light-5)',
                    'light-7': 'var(--el-color-error-light-7)',
                    'light-8': 'var(--el-color-error-light-8)',
                    'light-9': 'var(--el-color-error-light-9)',
                    'dark-2': 'var(--el-color-error-dark-2)'
                },
                info: {
                    DEFAULT: 'var(--el-color-info)',
                    'light-3': 'var(--el-color-info-light-3)',
                    'light-5': 'var(--el-color-info-light-5)',
                    'light-7': 'var(--el-color-info-light-7)',
                    'light-8': 'var(--el-color-info-light-8)',
                    'light-9': 'var(--el-color-info-light-9)',
                    'dark-2': 'var(--el-color-info-dark-2)'
                },
                body: 'var(--el-bg-color)',
                page: 'var(--el-bg-color-page)',
                'tx-primary': 'var(--el-text-color-primary)',
                'tx-regular': 'var(--el-text-color-regular)',
                'tx-secondary': 'var(--el-text-color-secondary)',
                'tx-placeholder': 'var(--el-text-color-placeholder)',
                'tx-disabled': 'var(--el-text-color-disabled)',
                br: 'var(--el-border-color)',
                'br-light': 'var(--el-border-color-light)',
                'br-extra-light': 'var(--el-border-color-extra-light)',
                'br-dark': 'var( --el-border-color-dark)',
                fill: 'var(--el-fill-color)',
                'fill-light': 'var(--el-fill-color-light)',
                'fill-lighter': 'var(--el-fill-color-lighter)',
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
            },
            spacing: {
                px: '1px',
                0: '0px',
                0.5: '2px',
                1: '4px',
                1.5: '6px',
                2: '8px',
                2.5: '10px',
                3: '12px',
                3.5: '14px',
                4: '16px',
                5: '20px',
                6: '24px',
                7: '28px',
                8: '32px',
                9: '36px',
                10: '40px',
                11: '44px',
                12: '48px',
                14: '56px',
                16: '64px',
                20: '80px',
                24: '96px',
                28: '112px',
                32: '128px',
                36: '144px',
                40: '160px',
                44: '176px',
                48: '192px',
                52: '208px',
                56: '224px',
                60: '240px',
                64: '256px',
                72: '288px',
                80: '320px',
                96: '384px'
            },
            lineHeight: {
                none: '1',
                tight: '1.25',
                snug: '1.375',
                normal: '1.5',
                relaxed: '1.625',
                loose: '2',
                3: '12px',
                4: '16px',
                5: '20px',
                6: '24px',
                7: '28px',
                8: '32px',
                9: '36px',
                10: '40px'
            }
        }
    }
}
