<template>
    <el-form :inline="true" label-position="top" :model="form" :rules="rules" ref="menuFormRef">
        <el-form-item label="菜单名称" prop="name" v-if="mode !== 'index'">
            <el-input class="ls-input-menu" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item :label="mode !== 'index' ? '菜单类型' : ''" prop="type">
            <el-select v-model="form.type" placeholder="请选择">
                <el-option label="网页" value="view"></el-option>
                <el-option label="小程序" value="miniprogram"></el-option>
            </el-select>
        </el-form-item>

        <div v-if="form.type === 'view'">
            <el-form-item label="网址" prop="url" required>
                <el-input class="ls-input-menu" v-model="form.url"></el-input>
            </el-form-item>
        </div>

        <div v-if="form.type === 'miniprogram'">
            <el-form-item label="网址" prop="url" required>
                <el-input class="ls-input-menu" v-model="form.url"></el-input>
            </el-form-item>
            <el-form-item label="AppID" prop="appid" required>
                <el-input class="ls-input-menu" v-model="form.appid"></el-input>
            </el-form-item>
            <el-form-item label="路径" prop="pagepath" required>
                <el-input class="ls-input-menu" v-model="form.pagepath"></el-input>
            </el-form-item>
        </div>
    </el-form>
</template>

<script lang="ts" setup>
import { Ref, ref, watch, watchEffect, withDefaults } from 'vue'

/** Emit Start **/
const emit = defineEmits(['update:name', 'update:type', 'update:url', 'update:appid', 'update:pagepath'])
/** Emit End **/

/** Props Start **/
const props = withDefaults(defineProps<{
    mode: any
    name?: string
    type?: string
    url?: string
    appid?: string
    pagepath?: string
}>(), {
    mode: 'normal',
    name: '',
    type: '',
    url: '',
    appid: '',
    pagepath: ''
})
/** Props End **/

/** Data Start **/
const menuFormRef = ref<any>(null)
// 表单数据
let form = ref({...props})

// 表单检验
const rules = ref<object>({
    name: [
        { required: true, message: '必填项不能为空', trigger: ['blur', 'change'] },
        { min: 1, max: 18, message: '长度限制18个字符', trigger: ['blur', 'change'] }
    ],
    type: [{ required: true, message: '必填项不能为空', trigger: ['blur', 'change'] }],
    url: [
        { required: true, message: '必填项不能为空', trigger: ['blur', 'change'] },
        {
            pattern: /[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+\.?/,
            message: '请输入合法链接',
            trigger: ['blur', 'change']
        }
    ],
    appid: [
        {
            validator: (rule: object, value: string, callback: Function) => {
                if (value || form.value.type !== 'miniprogram') callback()
                else callback(new Error())
            },
            message: '必填项不能为空',
            trigger: ['blur', 'change']
        }
    ],
    pagepath: [
        {
            validator: (rule: object, value: string, callback: Function) => {
                if (value || form.value.type !== 'miniprogram') callback()
                else callback(new Error())
            },
            message: '必填项不能为空',
            trigger: ['blur', 'change']
        }
    ],
})
/** Data End **/

/** Watch Start **/
watchEffect(() => {
    form.value = props
    if(props.mode === 'index') {
        emit('update:appid', form.value.appid)
        emit('update:url', form.value.url)
        emit('update:type', form.value.type)
        emit('update:pagepath', form.value.pagepath)
    }
})
/** Watch End **/

defineExpose({
    menuFormRef,
    form,
})
</script>

<style lang="scss" scoped>

	:deep .ls-input-menu {
		width: 280px;
	}
	
</style>