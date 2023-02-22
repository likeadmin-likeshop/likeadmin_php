// url中携带参数vconsole== vconsoleKey时打开Vconsole，可以用于手机浏览器中调试
// 如/mobile/pages/user/user?vconsole=vconsole2022，此时在个人中心页面打开vconsole

const vconsoleKey = 'vconsole2022'
export default async () => {
    // #ifdef H5
    const url = new URL(location.href)
    const searchParams = new URLSearchParams(url.search)
    const vconsole = searchParams.get('vconsole')
    if (vconsole == vconsoleKey) {
        const module: any = await import('vconsole')
        const Vconsole = module.default
        const vConsole = new Vconsole()
        return vConsole
    }

    // #endif
}
