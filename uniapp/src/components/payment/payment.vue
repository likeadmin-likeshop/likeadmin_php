<template>
    <u-popup
        v-model="showPay"
        mode="bottom"
        safe-area-inset-bottom
        :mask-close-able="false"
        border-radius="14"
        closeable
        @close="handleClose"
    >
        <view class="h-[900rpx]">
            <page-status :status="popupStatus" :fixed="false">
                <template #error>
                    <u-empty text="订单信息错误，无法查询到订单信息" mode="order"></u-empty>
                </template>
                <template #default>
                    <view class="payment h-full w-full flex flex-col">
                        <view class="header py-[50rpx] flex flex-col items-center">
                            <price
                                :content="payData.order_amount"
                                mainSize="44rpx"
                                minorSize="40rpx"
                                fontWeight="500"
                                color="#333"
                            ></price>
                        </view>
                        <view class="main flex-1 mx-[20rpx]">
                            <view>
                                <view class="payway-lists">
                                    <u-radio-group v-model="payWay" class="w-full">
                                        <view
                                            class="p-[20rpx] flex items-center w-full payway-item"
                                            v-for="(item, index) in payData.lists"
                                            :key="index"
                                            @click="selectPayWay(item.pay_way)"
                                        >
                                            <u-icon
                                                class="flex-none"
                                                :size="48"
                                                :name="item.icon"
                                            ></u-icon>
                                            <view class="mx-[16rpx] flex-1">
                                                <view class="payway-item--name flex-1">
                                                    {{ item.name }}
                                                </view>
                                                <view class="text-muted text-xs">{{
                                                    item.extra
                                                }}</view>
                                            </view>

                                            <u-radio activeColor="var(--color-primary)" class="mr-[-20rpx]" :name="item.pay_way">
                                            </u-radio>
                                        </view>
                                    </u-radio-group>
                                </view>
                            </view>
                        </view>

                        <view class="submit-btn p-[20rpx]">
                            <u-button
                                @click="handlePay"
                                shape="circle"
                                type="primary"
                                :loading="isLock"
                            >
                                立即支付
                            </u-button>
                        </view>
                    </view>
                </template>
            </page-status>
        </view>
    </u-popup>

    <u-popup
        class="pay-popup"
        v-model="showCheckPay"
        round
        mode="center"
        borderRadius="10"
        :maskCloseAble="false"
    >
        <view class="content bg-white w-[560rpx] p-[40rpx]">
            <view class="text-2xl font-medium text-center"> 支付确认 </view>
            <view class="pt-[30rpx] pb-[40rpx]">
                <view> 请在微信内完成支付，如果您已支付成功，请点击`已完成支付`按钮 </view>
            </view>
            <view class="flex">
                <view class="flex-1 mr-[20rpx]">
                    <u-button
                        shape="circle"
                        type="primary"
                        plain
                        size="medium"
                        hover-class="none"
                        :customStyle="{ width: '100%' }"
                        @click="queryPayResult(false)"
                    >
                        重新支付
                    </u-button>
                </view>
                <view class="flex-1">
                    <u-button
                        shape="circle"
                        type="primary"
                        size="medium"
                        hover-class="none"
                        :customStyle="{ width: '100%' }"
                        @click="queryPayResult()"
                    >
                        已完成支付
                    </u-button>
                </view>
            </view>
        </view>
    </u-popup>
</template>

<script lang="ts" setup>
import { pay, PayWayEnum } from '@/utils/pay'
import { getPayWay, prepay, getPayResult } from '@/api/pay'
import { computed, ref, watch } from 'vue'
import { useLockFn } from '@/hooks/useLockFn'
import { series } from '@/utils/util'
import { ClientEnum, PageStatusEnum, PayStatusEnum } from '@/enums/appEnums'
import { useUserStore } from '@/stores/user'
import { client } from '@/utils/client'
/*
页面参数 orderId：订单id，from：订单来源
*/

const props = defineProps({
    show: {
        type: Boolean,
        required: true
    },
    showCheck: {
        type: Boolean
    },
    // 订单id
    orderId: {
        type: Number,
        required: true
    },
    //订单来源
    from: {
        type: String,
        required: true
    },
    //h5微信支付回跳路径，一般为拉起支付的页面路径
    redirect: {
        type: String
    }
})

const emit = defineEmits(['update:showCheck', 'update:show', 'close', 'success', 'fail'])

const payWay = ref()
const popupStatus = ref(PageStatusEnum.LOADING)
const payData = ref<any>({
    order_amount: '',
    lists: []
})

const showCheckPay = computed({
    get() {
        return props.showCheck
    },
    set(value) {
        emit('update:showCheck', value)
    }
})

const showPay = computed({
    get() {
        return props.show
    },
    set(value) {
        emit('update:show', value)
    }
})

const handleClose = () => {
    showPay.value = false
    emit('close')
}
const getPayData = async () => {
    popupStatus.value = PageStatusEnum.LOADING
    try {
        payData.value = await getPayWay({
            order_id: props.orderId,
            from: props.from
        })
        popupStatus.value = PageStatusEnum.NORMAL
        const checkPay =
            payData.value.lists.find((item: any) => item.is_default) || payData.value.lists[0]
        payWay.value = checkPay?.pay_way
    } catch (error) {
        popupStatus.value = PageStatusEnum.ERROR
    }
}

const userStore = useUserStore()
const selectPayWay = (pay: number) => {
    payWay.value = pay
}
const payment = (() => {
    // 查询是否绑定微信
    const checkIsBindWx = async () => {
        if (
            userStore.userInfo.is_auth == 0 &&
            [ClientEnum.OA_WEIXIN, ClientEnum.MP_WEIXIN].includes(client) &&
            payWay.value == PayWayEnum.WECHAT
        ) {
            const res: any = await uni.showModal({
                title: '温馨提示',
                content: '当前账号未绑定微信，无法完成支付',
                confirmText: '去绑定'
            })
            if (res.confirm) {
                uni.navigateTo({
                    url: '/pages/user_set/user_set'
                })
            }
            return Promise.reject()
        }
    }

    // 调用预支付
    const prepayTask = async () => {
        uni.showLoading({
            title: '正在支付中'
        })
        const data = await prepay({
            order_id: props.orderId,
            from: props.from,
            pay_way: payWay.value,
            redirect: props.redirect
        })

        return data
    }

    //拉起支付
    const payTask = async (data: any) => {
        try {
            const res = await pay.payment(data.pay_way, data.config)
            return res
        } catch (error) {
            return Promise.reject(error)
        }
    }
    return series(checkIsBindWx, prepayTask, payTask)
})()
const { isLock, lockFn: handlePay } = useLockFn(async () => {
    try {
        const res: PayStatusEnum = await payment()
        handlePayResult(res)
        uni.hideLoading()
    } catch (error) {
        uni.hideLoading()
        console.log(error)
    }
})

const handlePayResult = (status: PayStatusEnum) => {
    switch (status) {
        case PayStatusEnum.SUCCESS:
            emit('success')
            break
        case PayStatusEnum.FAIL:
            emit('fail')
            break
    }
}

const queryPayResult = async (confirm = true) => {
    const res = await getPayResult({
        order_id: props.orderId,
        from: props.from
    })

    if (res.pay_status === 0) {
        if (confirm == true) {
            uni.$u.toast('您的订单还未支付，请重新支付')
        }
        showPay.value = true
        handlePayResult(PayStatusEnum.FAIL)
    } else {
        if (confirm == false) {
            uni.$u.toast('您的订单已经支付，请勿重新支付')
        }
        handlePayResult(PayStatusEnum.SUCCESS)
    }
    showCheckPay.value = false
}

watch(
    () => props.show,
    (value) => {
        if (value) {
            if (!props.orderId) {
                popupStatus.value = PageStatusEnum.ERROR
                return
            }
            getPayData()
        }
    },
    {
        immediate: true
    }
)
</script>

<style lang="scss">
.payway-lists {
    .payway-item {
        border-bottom: 1px solid;
        @apply border-page;
    }
}
</style>
