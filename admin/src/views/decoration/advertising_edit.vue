<template>
    <!-- Header Start -->
    <el-card shadow="never">
        <el-page-header :content="id ? '编辑广告' : '新增广告'" @back="$router.back()" />
    </el-card>
    <!-- Header End -->

    <!-- Main Start -->
    <el-form
        ref="formRef"
        :model="formData"
        :rules="rules"
        label-width="120px"
        class="formData"
        size="small"
    >
        <el-card shadow="never" style="margin-top: 15px">
            <el-form-item label="广告名称:" prop="name">
                <el-input class="ls-input" v-model="formData.name" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="广告位置:" prop="name">
                <el-select v-model="formData.pid" class="ls-input" placeholder="请选择">
                    <el-option
                        v-for="(item, index) in adPositionLists"
                        :key="index"
                        :label="item.name"
                        :value="item.id"
                    ></el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="图标:">
                <material-select v-model="formData.image" :limit="1"></material-select>
                <div class="muted">
                    建议尺寸：宽750*高
                    {{ formData.pid == 2 ? '200' : '340' }}
                    像素的jpg，jpeg，png，gif图片
                </div>
            </el-form-item>

            <el-form-item label="链接地址:" prop="link_address">
                <el-radio v-model="formData.link_type" name="1" :label="1">商城页面</el-radio>
                <!-- <el-radio v-model="formData.link_type" name="2" :label="2">商品分类</el-radio> -->
                <el-radio v-model="formData.link_type" name="3" :label="3">自定义链接</el-radio>
                <div>
                    <!-- 商城页面 -->
                    <el-select
                        v-model="goodsLink"
                        class="ls-input"
                        v-if="formData.link_type === 1"
                        placeholder="请选择"
                    >
                        <el-option
                            v-for="(item, index) in showPageData"
                            :key="index"
                            :label="item.name"
                            :value="item.index + ''"
                        ></el-option>
                    </el-select>

                    <!-- 自定义链接 -->
                    <el-input
                        class="ls-input"
                        v-if="formData.link_type === 3"
                        v-model="customLink"
                        placeholder="请输入"
                    ></el-input>
                </div>
            </el-form-item>

            <el-form-item label="排序:">
                <el-input class="ls-input" v-model="formData.sort" placeholder="请输入"></el-input>
            </el-form-item>

            <el-form-item label="状态:" prop="status">
                <el-switch
                    v-model="formData.status"
                    size="small"
                    :active-text="formData.status ? '启用' : '关闭'"
                    :active-value="1"
                    :inactive-value="0"
                />
            </el-form-item>
        </el-card>
    </el-form>
    <!-- Main End -->

    <!-- Footer Start -->
    <footer-btns>
        <el-button type="primary" size="small" @click="onSubmit(formRef)">保存</el-button>
    </footer-btns>
    <!-- Footer End -->
</template>

<script lang="ts" setup>
    import {
        apiAdAdd,
        apiAdEdit,
        apiAdDetail,
        apiShowPage,
        apiAdPositionLists,
    } from '@/api/decoration'
    import { ref, reactive, onMounted } from 'vue'
    import FooterBtns from '@/components/footer-btns/index.vue'
    import MaterialSelect from '@/components/material-select/index.vue'
    import type { ElForm } from 'element-plus'
    import { useAdmin } from '@/core/hooks/app'

    /** Interface Start **/
    interface formDataObj {
        name?: string //菜单名称
        image?: string //菜单图片
        pid: string | number //广告位
        link_type?: number | string //链接类型：1-商城页面；2-商品分类；3-自定义链接
        link_address: string | number //链接地址
        sort: number //排序
        status: number //状态
    }

    interface ListsObj {
        name: string
        index: number
        id: number | string
    }

    type FormInstance = InstanceType<typeof ElForm>
    const formRef = ref<FormInstance>()
    /** Interface End **/

    /** Data Start **/
    const { router, route } = useAdmin()
    const id: any = route.query.id

    let formData = ref<formDataObj>({
        name: '',
        image: '',
        pid: '',
        link_type: 1,
        link_address: '',
        sort: 0,
        status: 1,
    })

    let adPositionLists = ref<Array<ListsObj> | null>([]) //广告位列表
    let showPageData = ref<Array<ListsObj> | null>([]) //商品页面
    let goodsCategoryPage = ref<Array<ListsObj> | null>([]) //分类页面数据

    const goodsLink = ref<number | string>('') //link_type === 1 时商品页面的选择
    const categoryLink = ref<number | string>('') //link_type === 2 时分类页面的选择
    const customLink = ref<number | string>('') //自定义路径

    // 表单娇艳规则
    const rules = reactive<object>({
        name: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }],
        link_address: [{ required: true, message: '链接地址不能为空', trigger: [] }],
        status: [{ required: true, message: '请选择状态', trigger: 'change' }],
    })
    /** Data End **/

    /** Methods Start **/
    // 获取详情
    const getAdDetail = async (id: number): Promise<void> => {
        (formData.value as object) = await apiAdDetail({ id })
        switch (formData.value.link_type) {
            case 1:
                goodsLink.value = formData.value.link_address
                break
            case 2:
                categoryLink.value = formData.value.link_address
                break
            case 3:
                customLink.value = formData.value.link_address
                break
        }
    }

    //获取广告位列表
    const getAdPositionLists = async (): Promise<void> => {
        const res = await apiAdPositionLists()
        ;(adPositionLists.value as object) = (res as any).lists
    }

    // 获取商城页面
    const getShowPage = async (): Promise<void> => {
        ;(showPageData.value as object) = await apiShowPage()
    }

    // 添加菜单
    const handleAdAdd = async (): Promise<void> => {
        await apiAdAdd({ ...formData.value })
        router.back()
    }

    // 编辑菜单
    const handleAdEdit = async (): Promise<void> => {
        await apiAdEdit({ ...formData.value })
        router.back()
    }

    // 提交数据
    const onSubmit = (formEl: FormInstance | undefined): void => {
        switch (formData.value.link_type) {
            case 1:
                formData.value.link_address = goodsLink.value
                break
            case 2:
                formData.value.link_address = categoryLink.value
                break
            case 3:
                formData.value.link_address = customLink.value
                break
        }
        if (!formEl) return
        formEl.validate((valid): boolean | undefined => {
            if (!valid) return false
            if (!id) handleAdAdd()
            else handleAdEdit()
        })
    }
    /** Methods End **/

    /** LifeCycle Start **/
    // 请求详情 => 如果是编辑的话
    onMounted(() => {
        if (id) getAdDetail(id)
        getAdPositionLists()
        getShowPage()
    })

    /** LifeCycle End **/
</script>

<style lang="scss">
    .ls-input,
    .select {
        width: 340px;
    }
</style>
