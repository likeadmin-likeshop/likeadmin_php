<!-- 备案信息 -->
<template>
    <div class="website-filing">
        <el-card shadow="never" class="">
            <el-form
                ref="form"
                :rules="rules"
                class="ls-form"
                :model="formData"
                label-width="150px"
                size="small"
            >
                <!-- 版权信息输入框 -->
                <el-form-item label="版权信息" prop="info">
                    <el-input v-model="formData.info" placeholder="请输入版权信息"></el-input>
                    <div class="muted xs m-r-16">例如填写，Copyright © 2019-2020 公司名称</div>
                </el-form-item>

                <!-- ICP备案号输入框 -->
                <el-form-item label="ICP备案号" prop="icp_number">
                    <el-input
                        v-model="formData.icp_number"
                        placeholder="请输入ICP备案号"
                    ></el-input>
                </el-form-item>

                <!-- ICP备案号链接输入框 -->
                <el-form-item label="ICP备案号链接" prop="icp_link">
                    <el-input
                        v-model="formData.icp_link"
                        placeholder="请输入ICP备案号链接"
                    ></el-input>
                    <div class="muted xs m-r-16">
                        例如填写域名信息备案系统链接，http://beian.miit.gov.cn
                    </div>
                </el-form-item>

                <!--公安备案号输入框 -->
                <el-form-item label="公安备案号" prop="public_number">
                    <el-input
                        v-model="formData.public_number"
                        placeholder="请输入公安备案号"
                    ></el-input>
                </el-form-item>

                <!-- 公安备案号链接输入框 -->
                <el-form-item label="公安备案号链接" prop="public_link">
                    <el-input
                        v-model="formData.public_link"
                        placeholder="请输入公安备案号链接"
                    ></el-input>
                    <div class="muted xs m-r-16">
                        例如填写公安信息备案系统链接，http://www.beian.gov.cn
                    </div>
                </el-form-item>
            </el-form>
        </el-card>

        <footer-btns>
            <el-button type="primary" size="small" @click="setCopyright">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, onMounted } from 'vue'
import { apiGetCopyright, apiSetCopyright } from '@/api/setting'
import FooterBtns from '@/components/footer-btns/index.vue'
export default defineComponent({
    components: {
        FooterBtns
    },
    setup() {
        // 表单数据
        const formData = reactive({
            info: '', // 版权信息
            icp_number: '', // icp备案号
            icp_link: '', // icp备案链接
            public_number: '', // 公安备案号
            public_link: '' // 公安备案链接
        })

        // 表单验证
        const rules = {
            // info: [
            //     {
            //         required: true,
            //         message: '请输入版权信息',
            //         trigger: ['blur'],
            //     },
            // ],
        }

        // 获取备案信息
        const getCopyright = () => {
            apiGetCopyright().then((res: any) => {
                console.log('res', res)
                formData.info = res.info
                formData.icp_number = res.icp_number
                formData.icp_link = res.icp_link
                formData.public_number = res.public_number
                formData.public_link = res.public_link
            })
        }

        // 设置备案信息
        const setCopyright = () => {
            apiSetCopyright({
                info: formData.info,
                icp_number: formData.icp_number,
                icp_link: formData.icp_link,
                public_number: formData.public_number,
                public_link: formData.public_link
            })
                .then((res: any) => {
                    console.log('res', res)
                    getCopyright()
                })
                .catch((err: any) => {
                    console.log('err', err)
                })
        }

        onMounted(() => {
            getCopyright()
        })

        return {
            formData,
            rules,
            getCopyright,
            setCopyright
        }
    }
})
</script>

<style lang="scss" scoped></style>
