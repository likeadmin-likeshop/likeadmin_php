<template>
    <div class="edit-popup">
        <popup
            ref="popupRef"
            :title="popupTitle"
            :async="true"
            width="500px"
            @confirm="handleSubmit"
            @close="handleClose"
        >
            <el-form
                ref="formRef"
                :model="formData"
                label-width="84px"
                :rules="formRules"
                class="pr-10"
            >
                <el-form-item label="规则名称" prop="name">
                    <div class="flex-1">
                        <el-input v-model="formData.name" placeholder="请输入规则名称" />
                        <div class="form-tips">方便通过名称管理关注回复内容</div>
                    </div>
                </el-form-item>
                <el-form-item label="关键词" prop="keyword" v-if="formData.reply_type == 2">
                    <div class="flex-1">
                        <el-input v-model="formData.keyword" placeholder="请输入关键词" />
                        <div class="form-tips">方便通过名称管理关注回复内容</div>
                    </div>
                </el-form-item>
                <el-form-item label="匹配方式" prop="matching_type" v-if="formData.reply_type == 2">
                    <div class="flex-1">
                        <el-radio-group v-model="formData.matching_type">
                            <el-radio :value="1">全匹配</el-radio>
                            <el-radio :value="2">模糊匹配</el-radio>
                        </el-radio-group>
                        <div class="form-tips">模糊匹配时，关键词部分匹配用户输入的内容即可</div>
                    </div>
                </el-form-item>
                <el-form-item label="回复类型" prop="content_type" :min="0">
                    <div class="flex-1">
                        <el-radio-group v-model="formData.content_type">
                            <el-radio :value="1">文本</el-radio>
                        </el-radio-group>
                        <div class="form-tips">暂时只支持文本类型</div>
                    </div>
                </el-form-item>
                <el-form-item label="回复内容" prop="content">
                    <div class="flex-1">
                        <el-input
                            v-model="formData.content"
                            :autosize="{ minRows: 4, maxRows: 4 }"
                            type="textarea"
                            maxlength="200"
                            show-word-limit
                            placeholder="请输入回复内容"
                        />
                    </div>
                </el-form-item>
                <el-form-item label="排序">
                    <div class="flex-1">
                        <el-input-number v-model="formData.sort" :min="0" :max="9999" />
                    </div>
                </el-form-item>
                <el-form-item
                    label="回复数量"
                    prop="reply_num"
                    required
                    v-if="formData.reply_type == 2"
                >
                    <div class="flex-1">
                        <el-radio-group v-model="formData.reply_num">
                            <el-radio :value="1">回复匹配首词条</el-radio>
                        </el-radio-group>
                        <div class="form-tips">
                            设置关键词匹配多条时回复的数量，暂时支持回复一条内容
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="启用状态">
                    <el-switch v-model="formData.status" :active-value="1" :inactive-value="0" />
                </el-form-item>
            </el-form>
        </popup>
    </div>
</template>
<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import type { FormRules } from 'element-plus'

import { getOaReplyDetail, oaReplyAdd, oaReplyEdit } from '@/api/channel/wx_oa'
import Popup from '@/components/popup/index.vue'

const emit = defineEmits(['success', 'close'])

const formRef = shallowRef<FormInstance>()
const popupRef = shallowRef<InstanceType<typeof Popup>>()
const mode = ref('add')
const popupTitle = computed(() => {
    return mode.value == 'edit' ? '编辑' : '新增'
})
const formData = reactive({
    id: '',
    name: '',
    reply_type: 0,
    content_type: 1,
    keyword: '',
    content: '',
    matching_type: 1,
    status: 1,
    sort: 0,
    reply_num: 1
})

const formRules: FormRules = {
    name: [
        {
            required: true,
            message: '请输入规则名称',
            trigger: ['blur']
        }
    ],
    keyword: [
        {
            required: true,
            message: '请输入关键词',
            trigger: ['blur']
        }
    ],
    matching_type: [
        {
            required: true,
            message: '请选择匹配方式',
            trigger: ['blur']
        }
    ],
    content_type: [
        {
            required: true,
            message: '请选择回复类型',
            trigger: ['blur']
        }
    ],
    content: [
        {
            required: true,
            message: '请输入回复内容',
            trigger: ['blur']
        }
    ]
}

const handleSubmit = async () => {
    await formRef.value?.validate()
    mode.value == 'edit' ? await oaReplyEdit(formData) : await oaReplyAdd(formData)
    popupRef.value?.close()
    emit('success')
}

const open = (modes = 'add', type = 0) => {
    mode.value = modes
    formData.reply_type = type
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
    const data = await getOaReplyDetail({
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
