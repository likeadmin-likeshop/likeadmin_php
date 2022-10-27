import { wxLogin } from '~~/api/account'
import {
    PopupTypeEnum,
    useAccount
} from '~~/layouts/components/account/useAccount'
import { useAppStore } from '~~/stores/app'
import { useUserStore } from '~~/stores/user'

export default defineNuxtRouteMiddleware(async (to, from) => {
    const appStore = useAppStore()
    const userStore = useUserStore()
    const { setPopupType, toggleShowPopup } = useAccount()
    const isForceBindMobile = appStore.getLoginConfig.coerce_mobile
    const { code, state } = to.query
    delete to.query.code
    delete to.query.state
    try {
        if (code && state) {
            const data = await wxLogin({ code, state })
            if (isForceBindMobile && !data.mobile) {
                userStore.temToken = data.token
                setPopupType(PopupTypeEnum.BIND_MOBILE)
                toggleShowPopup(true)
                return
            }
            userStore.login(data.token)
            await userStore.getUser()
            return navigateTo(to)
        }
    } catch (error) {
        return navigateTo(to)
    }
})
