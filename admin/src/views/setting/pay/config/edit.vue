<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="550px"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form ref="formRef" :model="formData" label-width="84px" :rules="formRules">
                <el-form-item label="支付方式">
                    <el-radio :label="popupTitle" :model-value="popupTitle" />
                </el-form-item>
                <el-form-item label="显示名称" prop="name">
                    <el-input v-model="formData.name" placeholder="请输入显示名称" />
                </el-form-item>
                <el-form-item label="显示图标" prop="image">
                    <div>
                        <material-picker :limit="1" :disabled="false" v-model="formData.icon" />
                        <span class="form-tips">建议尺寸：200*200px</span>
                    </div>
                </el-form-item>
                <template v-if="formData.pay_way == PayWayEnum.WECHAT">
                    <el-form-item prop="config.interface_version" label="微信支付接口版本">
                        <div>
                            <el-radio-group v-model="formData.config.interface_version">
                                <el-radio label="v3"></el-radio>
                            </el-radio-group>
                            <div class="form-tips">暂时只支持V3版本</div>
                        </div>
                    </el-form-item>

                    <el-form-item label="商户类型" prop="config.merchant_type">
                        <div>
                            <el-radio-group v-model="formData.config.merchant_type">
                                <el-radio label="ordinary_merchant">普通商户</el-radio>
                            </el-radio-group>
                            <div class="form-tips">
                                暂时只支持普通商户类型，服务商户类型模式暂不支持
                            </div>
                        </div>
                    </el-form-item>

                    <el-form-item label="微信支付商户号" prop="config.mch_id">
                        <div class="flex-1">
                            <el-input
                                v-model="formData.config.mch_id"
                                placeholder="请输入微信支付商户号"
                            />
                            <div class="form-tips">微信支付商户号（MCHID）</div>
                        </div>
                    </el-form-item>

                    <el-form-item label="商户API密钥" prop="config.pay_sign_key">
                        <el-input
                            v-model="formData.config.pay_sign_key"
                            placeholder="请输入微信支付商户API密钥"
                        />
                        <span class="form-tips">微信支付商户API密钥（paySignKey）</span>
                    </el-form-item>

                    <el-form-item label="微信支付证书" prop="config.apiclient_cert">
                        <el-input
                            type="textarea"
                            rows="3"
                            v-model="formData.config.apiclient_cert"
                            placeholder="请输入微信支付证书"
                        />

                        <span class="form-tips">
                            微信支付证书（apiclient_cert.pem），前往微信商家平台生成并黏贴至此处
                        </span>
                    </el-form-item>

                    <el-form-item label="微信支付证书密钥" prop="config.apiclient_key">
                        <el-input
                            type="textarea"
                            rows="3"
                            v-model="formData.config.apiclient_key"
                            placeholder="请输入微信支付证书密钥"
                        />
                        <span class="form-tips">
                            微信支付证书密钥（apiclient_key.pem），前往微信商家平台生成并黏贴至此处
                        </span>
                    </el-form-item>

                    <el-form-item label="支付授权目录">
                        <div>
                            <div>
                                <span class="mr-[20px]">{{ formData.domain }}</span>
                                <el-button link type="primary" v-copy="formData.domain">
                                    复制
                                </el-button>
                            </div>
                            <span class="form-tips">
                                支付授权目录仅用于参考，复制后前往微信商家平台填写
                            </span>
                        </div>
                    </el-form-item>
                </template>
                <template v-if="formData.pay_way == PayWayEnum.ALIPAY">
                    <el-form-item label="模式" prop="config.mode">
                        <div>
                            <el-radio-group v-model="formData.config.mode">
                                <el-radio label="normal_mode">普通模式</el-radio>
                            </el-radio-group>
                            <div class="form-tips">暂时仅支持支付宝普通模式</div>
                        </div>
                    </el-form-item>

                    <el-form-item label="商户类型" prop="config.merchant_type">
                        <div>
                            <el-radio-group v-model="formData.config.merchant_type">
                                <el-radio label="ordinary_merchant">普通商户</el-radio>
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
                            />
                            <span class="form-tips"> 支付宝应用APP_ID </span>
                        </div>
                    </el-form-item>

                    <el-form-item label="应用私钥" prop="config.private_key">
                        <div class="flex-1">
                            <el-input
                                type="textarea"
                                rows="3"
                                v-model="formData.config.private_key"
                                placeholder="请输入支付宝应用私钥"
                            />
                            <span class="form-tips">支付宝应用私钥（private_key） </span>
                        </div>
                    </el-form-item>

                    <el-form-item label="支付宝公钥" prop="config.ali_public_key">
                        <div class="flex-1">
                            <el-input
                                type="textarea"
                                rows="3"
                                v-model="formData.config.ali_public_key"
                                placeholder="请输入支付宝公钥"
                            />
                            <span class="form-tips">支付宝公钥（ali_public_key） </span>
                        </div>
                    </el-form-item>
                </template>
                <el-form-item label="排序" prop="sort">
                    <div>
                        <el-input-number v-model="formData.sort" :min="0" :max="9999" />
                        <div class="form-tips">默认为0， 数值越大越排前</div>
                    </div>
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import { getPayConfig, setPayConfig } from '@/api/setting/pay'
import Popup from '@/components/popup/index.vue'
const emit = defineEmits(['success', 'close'])
const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
enum PayWayEnum {
    BALANCE = 1,
    WECHAT = 2,
    ALIPAY = 3
}
const popupTitle = computed(() => {
    switch (formData.pay_way) {
        case PayWayEnum.BALANCE:
            return '余额支付'
        case PayWayEnum.WECHAT:
            return '微信支付'
        case PayWayEnum.ALIPAY:
            return '支付宝支付'
    }
})
const formData = reactive({
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

const handleSubmit = async () => {
    await formRef.value?.validate()
    await setPayConfig(formData)
    popupRef.value?.close()
    emit('success')
}

const open = () => {
    popupRef.value?.open()
}

const setFormData = (data: Record<any, any>) => {
    for (const key in formData) {
        if (data[key] != null && data[key] != undefined) {
            //@ts-ignore
            formData[key] = data[key]
        }
    }
}

const getDetail = async (row: Record<string, any>) => {
    const data = await getPayConfig({
        id: row.id
    })
    setFormData(data)
}

const handleClose = () => {
    emit('close')
}

defineExpose({
    open,
    setFormData,
    getDetail
})
</script>
