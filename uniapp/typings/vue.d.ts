import 'vue'
declare module 'vue' {
    interface ComponentCustomProperties {
        $theme: {
            primaryColor: string
            pageStyle: string
            navColor: string
            navBgColor: string
            title: string
        }
    }
}
