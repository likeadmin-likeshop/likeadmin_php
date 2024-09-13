<template>
    <div>
        <el-card shadow="never" class="!border-none">
            <template #header>
                <span class="font-extrabold text-lg">充值设置</span>
            </template>
            <el-form :model="formData" label-width="120px">
                <el-form-item label="状态">
                    <div>
                        <el-radio-group v-model="formData.status" class="ml-4">
                            <el-radio :value="1">开启</el-radio>
                            <el-radio :value="0">关闭</el-radio>
                        </el-radio-group>
                        <div class="form-tips">关闭或开启充值功能，关闭后将不显示充值入口</div>
                    </div>
                </el-form-item>
                <el-form-item label="最低充值金额">
                    <div>
                        <el-input
                            v-model="formData.min_amount"
                            placeholder="请输入最低充值金额"
                            clearable
                        />
                        <div class="form-tips">
                            最低充值金额要求，不填或填0表示不限制最低充值金额
                        </div>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
        <footer-btns v-perms="['recharge.recharge/setConfig']">
            <el-button type="primary" @click="handleSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>
<script lang="ts" setup name="rechargeConfig">
import { getRechargeConfig, setRechargeConfig } from '@/api/app/recharge'

const formData = reactive({
    status: 1, //功能状态 1-开启 0-关闭
    min_amount: '' //最低充值金额
})

const getConfig = async () => {
    const data = await getRechargeConfig()
    Object.assign(formData, data)
}
const handleSubmit = async () => {
    await setRechargeConfig(formData)
    getConfig()
}
getConfig()
</script>
