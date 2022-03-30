<template>
    <div class="information-edit">
        <el-card shadow="never">
            <el-page-header content="新增资讯" @back="$router.back()" />
        </el-card>

        <el-card class="m-t-15" shadow="never">
            <el-form
                ref="formDataRefs"
                class="ls-form"
                :model="formData"
                :rules="rules"
                label-width="150px"
                size="small"
            >
                <el-form-item label="资讯标题：" prop="title">
                    <el-input
                        class="ls-input"
                        type="textarea"
                        v-model="formData.title"
                        placeholder="多行输入"
                        :rows="6"
                    ></el-input>
                </el-form-item>

                <el-form-item label="封面图：" prop="image">
                    <material-select v-model="formData.image" :limit="1"></material-select>
                    <div class="muted">建议尺寸：240*180，支持jpg、png格式</div>
                </el-form-item>

                <el-form-item label="所属分类：">
                    <el-select v-model="formData.cid" placeholder="请选择">
                        <el-option
                            v-for="(item, index) in informationClassify"
                            :key="index"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="状态：" prop="is_show">
                    <el-switch
                        v-model="formData.is_show"
                        size="small"
                        :active-text="formData.is_show ? '启用' : '关闭'"
                        :active-value="1"
                        :inactive-value="0"
                    />
                </el-form-item>

                <el-form-item label="文章内容：" class="rich-text">
                    <editor v-model="formData.content" height="664"></editor>
                </el-form-item>
            </el-form>
        </el-card>

        <footer-btns>
            <el-button type="primary" size="small" @click="onSubmit(formDataRefs)">保存</el-button>
        </footer-btns>
    </div>
</template>

<script setup lang="ts">
    import { onMounted, reactive, ref } from 'vue'
    import type { ElForm } from 'element-plus'
    import MaterialSelect from '@/components/material-select/index.vue'
    import FooterBtns from '@/components/footer-btns/index.vue'
    import Editor from '@/components/editor/index.vue'
    import {
        apiArticleAdd,
        apiArticleEdit,
        apiArticleDetail,
        apiAllArticleCategory,
    } from '@/api/information'
    import { useAdmin } from '@/core/hooks/app'

    interface formDataObj {
        title: string
        image: string
        cid: number | string
        is_show: number
        content: string
    }

    // 所属分类
    let informationClassify = ref<any[]>([])

    type FormInstance = InstanceType<typeof ElForm>
    const formDataRefs = ref<FormInstance>()

    const { router, route } = useAdmin()
    const id: any = route.query.id

    // 表单数据
    let formData = ref<formDataObj>({
        title: '', // 资讯标题
        image: '', // 封面图
        cid: '', // 所属分类
        is_show: 1, // 状态
        content: '',
    })

    // 表单校验规则
    const rules = reactive<any>({
        title: [{ required: true, message: '请输入标题', trigger: ['blur'] }],
        image: [{ required: true, message: '不能为空', trigger: ['blur'] }],
    })

    // 获取详情
    const getInformationDetali = async (id: number) => {
        ;(formData.value as {}) = await apiArticleDetail({ id })
    }

    // 添加
    const handleInformationAdd = async () => {
        await apiArticleAdd({ ...formData.value })
        router.back()
    }

    // 编辑
    const handleInformationEdit = async () => {
        await apiArticleEdit({ ...formData.value })
        router.back()
    }

    // 获取所属分类
    const getInformationClassify = async () => {
        ;(informationClassify.value as {}) = await apiAllArticleCategory()
    }

    // 提交数据
    const onSubmit = (formEl: FormInstance | undefined) => {
        if (!formEl) return
        formEl.validate((valid) => {
            if (!valid) return false
            if (!id) handleInformationAdd()
            else handleInformationEdit()
        })
    }

    onMounted(() => {
        if (id) getInformationDetali(id)
        getInformationClassify()
    })
</script>

<style lang="scss" scoped>
    .ls-input {
        width: 340px;
    }

    .rich-text {
        width: 1000px;
    }
</style>
