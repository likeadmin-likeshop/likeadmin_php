import { wxLogin } from '~~/api/account'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const { code, state } = from.query
    if (code && state) {
        const a = await wxLogin({ code, state })
        console.log(a)
    }
})
