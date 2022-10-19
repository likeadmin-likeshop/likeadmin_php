<template>
    <div class="account">
        <ClientOnly>
            <ElDialog
                v-model="showPopup"
                :width="400"
                :close-on-click-modal="false"
            >
                <div class="px-5">
                    <Login v-if="popupType == PopupTypeEnum.LOGIN" />
                    <Register v-if="popupType == PopupTypeEnum.REGISTER" />
                    <ForgotPwd v-if="popupType == PopupTypeEnum.FORGOT_PWD" />
                    <BindMobile v-if="popupType == PopupTypeEnum.BIND_MOBILE" />
                </div>
            </ElDialog>
        </ClientOnly>
    </div>
</template>
<script lang="ts" setup>
import { ElDialog } from 'element-plus'
import Login from './login.vue'
import { useAccount, PopupTypeEnum } from './useAccount'
import Register from './register.vue'
import ForgotPwd from './forgot-pwd.vue'
import BindMobile from './bind-mobile.vue'
const { popupType, showPopup } = useAccount()
</script>

<style lang="scss" scoped></style>
