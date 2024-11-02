<template>
    <div>
        <div>
            <el-button
                type="primary"
                v-perms="['setting.pay.pay_way/setPayWay']"
                @click="handelSetupPayWay"
            >
                设置支付方式
            </el-button>
        </div>

        <el-card
            shadow="never"
            class="mt-4 !border-none"
            v-for="(value, scene) in payWay"
            :key="scene"
        >
            <div>
                <div class="text-lg mb-[24px]" v-if="scene == PaySceneEnum.MP_WEIXIN">
                    微信小程序
                    <span class="form-tips ml-[10px]">在微信小程序中付款的场景</span>
                </div>
                <div class="text-lg mb-[24px]" v-if="scene == PaySceneEnum.OA">
                    微信公众号
                    <span class="form-tips ml-[10px]">
                        在微信公众号H5页面中付款的场景，公众号类型一般为服务号
                    </span>
                </div>
                <div class="text-lg mb-[24px]" v-if="scene == PaySceneEnum.H5">
                    H5支付
                    <span class="form-tips ml-[10px]">在浏览器H5页面中付款的场景</span>
                </div>
                <div class="text-lg mb-[24px]" v-if="scene == PaySceneEnum.PC">
                    PC支付
                    <span class="form-tips ml-[10px]">在浏览器PC页面中付款的场景</span>
                </div>
                <div class="text-lg mb-[24px]" v-if="scene == PaySceneEnum.APP">
                    APP支付
                    <span class="form-tips ml-[10px]">在APP付款的场景</span>
                </div>
                <el-table v-if="value.length" :data="value" style="width: 100%">
                    <el-table-column label="图标" min-width="150">
                        <template #default="{ row }">
                            <el-image
                                :src="row.icon"
                                alt="图标"
                                style="width: 34px; height: 34px"
                            />
                        </template>
                    </el-table-column>
                    <el-table-column prop="pay_way_name" label="支付方式" min-width="150" />
                    <el-table-column label="默认支付" min-width="150">
                        <template #default="{ row, $index }">
                            <div>
                                <template v-if="setupPayWay">
                                    <el-radio
                                        v-model="row.is_default"
                                        :label="1"
                                        @change="changePayDefault($index, scene)"
                                    >
                                        设为默认
                                    </el-radio>
                                </template>
                                <template v-else>
                                    <el-tag v-if="row.is_default == 1">默认</el-tag>
                                    <span v-else>-</span>
                                </template>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="开启状态" min-width="150">
                        <template #default="{ row }">
                            <el-switch
                                v-if="setupPayWay"
                                v-model="row.status"
                                :active-value="1"
                                :inactive-value="0"
                            />
                            <span v-else>
                                {{ row.status == 1 ? '开启' : '关闭' }}
                            </span>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
        </el-card>
        <footer-btns v-if="setupPayWay">
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts" setup>
import { cloneDeep } from 'lodash'

import { getPayWay, setPayWay } from '@/api/setting/pay'

enum PaySceneEnum {
    MP_WEIXIN = 1,
    OA = 2,
    H5 = 3,
    PC = 4,
    APP = 5
}
const payWay = ref<Record<number, any[]>>({})
const setupPayWay = ref(false)
let defaultPayWay = {}
const getConfig = async () => {
    payWay.value = await getPayWay()
    defaultPayWay = cloneDeep(payWay.value)
}

const handelSetupPayWay = () => {
    setupPayWay.value = true
}

const changePayDefault = (index: number, scene: number) => {
    payWay.value[scene].forEach((item: any) => {
        item.is_default = 0
    })
    payWay.value[scene][index].is_default = 1
}

const handleCancel = () => {
    payWay.value = cloneDeep(defaultPayWay)
    setupPayWay.value = false
}

const handleSubmit = async () => {
    await setPayWay(payWay.value)
    setupPayWay.value = false
    getConfig()
}

getConfig()
</script>
