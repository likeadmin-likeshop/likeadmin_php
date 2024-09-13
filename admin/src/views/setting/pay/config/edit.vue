<template>
    <el-drawer
        v-model="drawer"
        destroy-on-close
        :title="`${popupTitle}配置`"
        direction="rtl"
        size="50%"
        @close="afterClose"
        :before-close="beforeClose"
    >
        <div
            class="h-full flex flex-col"
            v-loading="loading"
            element-loading-text="加载中..."
            element-loading-background="var(--el-bg-color)"
        >
            <el-form ref="formRef" :model="formData" label-width="9rem" :rules="formRules">
                <el-form-item label="支付方式">
                    <el-radio :value="popupTitle" :model-value="popupTitle">
                        {{ popupTitle }}
                    </el-radio>
                </el-form-item>
                <el-form-item label="显示名称" prop="name">
                    <el-input
                        v-model="formData.name"
                        placeholder="请输入显示名称"
                        style="max-width: 250px"
                    />
                </el-form-item>
                <el-form-item label="图标" prop="image">
                    <div>
                        <material-picker :limit="1" :disabled="false" v-model="formData.icon" />
                        <div class="form-tips">建议尺寸：200*200px</div>
                    </div>
                </el-form-item>
                <template v-if="formData.pay_way == PayWayEnum.WECHAT">
                    <el-form-item prop="config.interface_version" label="微信支付接口版本">
                        <div>
                            <el-radio-group v-model="formData.config.interface_version">
                                <el-radio value="v3">V3</el-radio>
                            </el-radio-group>
                            <div class="form-tips">暂时只支持V3版本</div>
                        </div>
                    </el-form-item>

                    <el-form-item label="商户类型" prop="config.merchant_type">
                        <div>
                            <el-radio-group v-model="formData.config.merchant_type">
                                <el-radio value="ordinary_merchant">普通商户</el-radio>
                            </el-radio-group>
                            <div class="form-tips">
                                暂时只支持普通商户类型，服务商户类型模式暂不支持
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="微信支付商户号" prop="config.mch_id">
                        <div>
                            <el-input
                                v-model="formData.config.mch_id"
                                placeholder="请输入微信支付商户号"
                                style="max-width: 250px"
                            />
                            <div class="form-tips">微信支付商户号（MCHID）</div>
                        </div>
                    </el-form-item>

                    <el-form-item label="商户API密钥" prop="config.pay_sign_key">
                        <div>
                            <el-input
                                v-model="formData.config.pay_sign_key"
                                placeholder="请输入微信支付商户API密钥"
                                style="max-width: 250px"
                            />
                            <div class="form-tips">微信支付商户API密钥（paySignKey）</div>
                        </div>
                    </el-form-item>

                    <el-form-item label="微信支付证书" prop="config.apiclient_cert">
                        <div>
                            <el-input
                                type="textarea"
                                :rows="3"
                                v-model="formData.config.apiclient_cert"
                                placeholder="请输入微信支付证书"
                                style="max-width: 400px"
                            />

                            <div class="form-tips">
                                微信支付证书（apiclient_cert.pem），前往微信商家平台生成并黏贴至此处
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="微信支付证书密钥" prop="config.apiclient_key">
                        <div>
                            <el-input
                                type="textarea"
                                :rows="3"
                                v-model="formData.config.apiclient_key"
                                placeholder="请输入微信支付证书密钥"
                                style="max-width: 400px"
                            />
                            <div class="form-tips">
                                微信支付证书密钥（apiclient_key.pem），前往微信商家平台生成并黏贴至此处
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="支付授权目录">
                        <div>
                            <div>
                                <span class="mr-[20px]">https://前台手机域名地址/</span>
                            </div>
                        </div>
                    </el-form-item>
                </template>
                <template v-if="formData.pay_way == PayWayEnum.ALIPAY">
                    <el-form-item label="模式" prop="config.mode">
                        <div>
                            <el-radio-group v-model="formData.config.mode">
                                <el-radio value="normal_mode">普通模式</el-radio>
                            </el-radio-group>
                            <div class="form-tips">暂时仅支持支付宝普通模式</div>
                        </div>
                    </el-form-item>

                    <el-form-item label="商户类型" prop="config.merchant_type">
                        <div>
                            <el-radio-group v-model="formData.config.merchant_type">
                                <el-radio value="ordinary_merchant">普通商户</el-radio>
                            </el-radio-group>
                            <div class="form-tips">
                                暂时只支持普通商户类型，服务商户类型模式暂不支持
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="应用ID" prop="config.app_id">
                        <div class="flex-1">
                            <el-input
                                v-model="formData.config.app_id"
                                placeholder="请输入支付宝应用ID"
                                style="max-width: 250px"
                            />
                            <div class="form-tips">支付宝应用APP_ID</div>
                        </div>
                    </el-form-item>

                    <el-form-item label="应用私钥" prop="config.private_key">
                        <div class="flex-1">
                            <el-input
                                type="textarea"
                                :rows="3"
                                v-model="formData.config.private_key"
                                placeholder="请输入支付宝应用私钥"
                                style="max-width: 400px"
                            />
                            <div class="form-tips">支付宝应用私钥（private_key）</div>
                        </div>
                    </el-form-item>

                    <el-form-item label="支付宝公钥" prop="config.ali_public_key">
                        <div class="flex-1">
                            <el-input
                                type="textarea"
                                :rows="3"
                                v-model="formData.config.ali_public_key"
                                placeholder="请输入支付宝公钥"
                                style="max-width: 400px"
                            />
                            <div class="form-tips">支付宝公钥（alipayCertPublicKey）</div>
                        </div>
                    </el-form-item>
                </template>
                <el-form-item label="排序" prop="sort">
                    <div>
                        <el-input-number v-model="formData.sort" :min="0" :max="9999" />
                        <div class="form-tips">默认为0， 数值越大越排前</div>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" :loading="isLock" @click="lockSubmit">保存</el-button>
                </el-form-item>
            </el-form>
        </div>
    </el-drawer>
</template>

<script lang="ts" setup>
import type { FormRules } from 'element-plus'
import { ElForm, ElMessageBox } from 'element-plus'

import { getPayConfig, setPayConfig } from '@/api/setting/pay'
import { useLockFn } from '@/hooks/useLockFn'
import { useComponentRef } from '@/utils/getExposeType'

interface Config {
    interface_version?: string
    merchant_type?: string
    mch_id?: string
    pay_sign_key?: string
    apiclient_cert?: string
    apiclient_key?: string
    mode?: string
    app_id?: string
    private_key?: string
    ali_public_key?: string
}

interface FormData {
    id: string
    pay_way: number
    name: string
    icon: string
    sort: number
    remark: string
    domain: string
    config: Partial<Config>
}

enum PayWayEnum {
    BALANCE = 1,
    WECHAT = 2,
    ALIPAY = 3
}

const drawer = ref(false)
const formRef = useComponentRef(ElForm)
const tenantId = ref<number>()
const activeName = ref<'profile' | 'accounts' | 'users'>('profile')
const editStatus = ref<boolean>(false)
const loading = ref<boolean>(true)

const popupTitle = computed(() => {
    switch (formData.value.pay_way) {
        case PayWayEnum.BALANCE:
            return '余额支付'
        case PayWayEnum.WECHAT:
            return '微信支付'
        case PayWayEnum.ALIPAY:
            return '支付宝支付'
        default:
            return ''
    }
})
const formData = ref<FormData>({
    id: '',
    pay_way: 0,
    name: '',
    icon: '',
    sort: 0,
    remark: '',
    domain: '',
    config: {
        interface_version: '',
        merchant_type: '',
        mch_id: '',
        pay_sign_key: '',
        apiclient_cert: '',
        apiclient_key: '',
        mode: '',
        app_id: '',
        private_key: '',
        ali_public_key: ''
    }
})

const formRules: FormRules = {
    name: [
        {
            required: true,
            message: '请输入显示名称'
        }
    ],
    'config.mch_id': [
        {
            required: true,
            message: '请输入微信支付商户号'
        }
    ],
    'config.pay_sign_key': [
        {
            required: true,
            message: '请输入微信支付商户API密钥'
        }
    ],
    'config.apiclient_cert': [
        {
            required: true,
            message: '请输入微信支付证书'
        }
    ],
    'config.apiclient_key': [
        {
            required: true,
            message: '请输入微信支付证书密钥'
        }
    ],
    'config.app_id': [
        {
            required: true,
            message: '请输入支付宝应用ID'
        }
    ],
    'config.private_key': [
        {
            required: true,
            message: '请输入支付宝应用私钥'
        }
    ],
    'config.ali_public_key': [
        {
            required: true,
            message: '请输入支付宝公钥'
        }
    ]
}

const emits = defineEmits(['refresh'])

const openHandle = (id: number, status?: boolean, tabIndex?: 'profile' | 'accounts' | 'users') => {
    loading.value = true
    activeName.value = tabIndex || 'profile'
    editStatus.value = status || false
    getDetails(id)
    tenantId.value = id
    drawer.value = true
}
const getDetails = async (id: number) => {
    const data: FormData = await getPayConfig({
        id: id
    })
    if (!data.config) {
        data.config = formData.value.config
    }
    loading.value = false
    formData.value = data
}

const beforeClose = (done: () => void) => {
    ElMessageBox.confirm('修改还未保存，确认退出编辑吗？')
        .then(() => {
            done()
        })
        .catch(() => {})
}
const afterClose = () => {
    formRef.value?.resetFields()
}

const submitEdit = async () => {
    await formRef.value?.validate()
    await setPayConfig(formData.value)
    drawer.value = false
    emits('refresh')
}

const { isLock, lockFn: lockSubmit } = useLockFn(submitEdit)

defineExpose({
    openHandle
})
</script>

<style lang="scss" scoped>
:deep(.el-tabs__content) {
    flex: 1;

    .el-tab-pane {
        height: 100%;
    }
}
:deep(.el-form-item__content) {
    align-items: start;
}
</style>
