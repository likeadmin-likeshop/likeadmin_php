<template>
    <view class="">
        <u-parse :html="agreementContent"></u-parse>
    </view>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { AgreementEnum } from '@/enums/agreementEnums'
import { getPolicy } from '@/api/app'

let agreementType = ref('') // 协议类型
const agreementContent = ref('') // 协议内容

const getData = async (type) => {
    const res = await getPolicy({ type })
    console.log(res, 'res')

    agreementContent.value = res.content

    uni.setNavigationBarTitle({
        title: res.name
    })
}

onLoad((options: any) => {
    if (options.type) {
        agreementType = options.type
        getData(agreementType)
    }
})
</script>

<style lang="scss" scoped></style>
