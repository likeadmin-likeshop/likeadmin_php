// url中携带参数vconsole == vconsoleMd5时打开Vconsole，可以用于手机浏览器中调试
// 如/mobile/pages/user/user?vconsole=47b1e3a9d33e6064e58cc4796c708447，此时在个人中心页面打开vconsole

const vconsoleMd5 = '47b1e3a9d33e6064e58cc4796c708447'
export default async () => {
    // #ifdef H5
    const url = new URL(location.href)
    const searchParams = new URLSearchParams(url.search)
    const vconsole = searchParams.get('vconsole')
    if (vconsole == vconsoleMd5) {
        const module: any = await import('vconsole')
        const Vconsole = module.default
        const vConsole = new Vconsole()
        return vConsole
    }

    // #endif
}
