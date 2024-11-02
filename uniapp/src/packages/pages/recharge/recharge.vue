<template>
    <page-meta :page-style="$theme.pageStyle">
        <!-- #ifndef H5 -->
        <navigation-bar
            :front-color="$theme.navColor"
            :background-color="$theme.navBgColor"
        />
        <!-- #endif -->
    </page-meta>
    <view class="recharge p-[20rpx]">
        <view class="bg-white rounded-[14rpx] p-[40rpx]">
            <view class="text-content">充值金额</view>
            <view class="border-0 border-b border-solid border-light">
                <input
                    v-model="money"
                    class="text-[60rpx] h-[60rpx] py-[24rpx]"
                    placeholder="0.00"
                    type="digit"
                />
            </view>
            <view class="mt-[20rpx] text-xs text-muted">
                当前可用余额
                <text class="text-primary"> {{ wallet.user_money }}</text>
            </view>
        </view>
        <view class="mt-[40rpx]">
            <u-button :loading="isLock" type="primary" shape="circle" @click="rechargeLock">
                立即充值
            </u-button>
        </view>
        <view class="flex justify-center m-[60rpx]">
            <navigator url="/packages/pages/recharge_record/recharge_record" hover-class="none">
                <text class="text-content text-sm">充值记录</text>
            </navigator>
        </view>
        <payment
            v-model:show="payState.showPay"
            v-model:show-check="payState.showCheck"
            :order-id="payState.orderId"
            :from="payState.from"
            :redirect="payState.redirect"
            @success="handlePaySuccess"
            @fail="handlePayFail"
        />
    </view>
</template>
<script lang="ts" setup>
import { recharge, rechargeConfig } from '@/api/recharge'
import { useLockFn } from '@/hooks/useLockFn'
import { onLoad, onShow } from '@dcloudio/uni-app'
import { reactive, ref } from 'vue'
const money = ref('')

const payState = reactive({
    orderId: '',
    from: '',
    showPay: false,
    showCheck: false,
    redirect: '/packages/pages/recharge/recharge'
})
const wallet = reactive({
    user_money: '',
    min_amount: 0
})

const { isLock, lockFn: rechargeLock } = useLockFn(async () => {
    const minNum = wallet.min_amount
    if (!money.value) return uni.$u.toast('请输入充值金额')
    if (minNum == 0 && Number(money.value) == minNum) {
        return uni.$u.toast(`充值金额必须大于0`)
    }
    if (Number(money.value) < minNum) return uni.$u.toast(`最低充值金额${minNum}`)
    const data = await recharge({
        money: money.value
    })
    payState.orderId = data.order_id
    payState.from = data.from
    payState.showPay = true
})

const handlePaySuccess = async () => {
    payState.showPay = false
    payState.showCheck = false
    uni.navigateTo({
        url: `/pages/payment_result/payment_result?id=${payState.orderId}&from=${payState.from}`
    })
}

const handlePayFail = async () => {
    uni.$u.toast('支付失败')
}

const getWallet = async () => {
    const data = await rechargeConfig()
    Object.assign(wallet, data)
}

onLoad((options: any) => {
    // h5支付用于弹起手动确认支付弹窗
    if (options?.checkPay) {
        payState.orderId = options.id
        payState.from = options.from
        payState.showCheck = true
    }
})
onShow(() => {
    getWallet()
})
</script>
