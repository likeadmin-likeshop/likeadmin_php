import { getDecorate } from '@/api/shop'
import { generateVars } from '@/utils/theme'
import { defineStore } from 'pinia'

interface ThemeStore {
    primaryColor: string
    minorColor: string
    btnColor: string
    navColor: string
    navBgColor: string
    vars: string
}
export const useThemeStore = defineStore({
    id: 'themeStore',
    state: (): ThemeStore => ({
        primaryColor: '',
        minorColor: '',
        btnColor: 'white',
        navColor: '#000000',
        navBgColor: '#ffffff',
        vars: ''
    }),
    actions: {
        async getTheme() {
            const data = await getDecorate({
                id: 5
            })
            const {
                themeColor1,
                themeColor2,
                buttonColor,
                navigationBarColor,
                topTextColor
            } = JSON.parse(data.data)
            this.primaryColor = themeColor1
            this.minorColor = themeColor2
            this.btnColor = buttonColor
            this.navColor = topTextColor === 'white' ? '#ffffff' : '#000000'
            this.navBgColor = navigationBarColor || themeColor1
            this.vars = generateVars(
                {
                    primary: themeColor1
                },
                {
                    '--color-minor': themeColor2,
                    '--color-btn-text': buttonColor
                }
            )
        },
        setTheme(color: string) {
            this.primaryColor = color
        }
    }
})
