<template>
    <!-- Header Start -->
    <el-card shadow="never">
        <el-page-header @back="$router.back()" content="编辑消息通知" />
    </el-card>
    <!-- Header End -->

    <!-- Header Start -->
    <el-card shadow="never" class="m-t-15">
        <div class="xxl m-b-20">通知名称</div>
        <div class="m-l-30 m-t-10">通知名称： {{ formData.scene_name }}</div>
        <div class="m-l-30 m-t-10">通知类型： 业务通知</div>
        <div class="m-l-30 m-t-10">通知业务： {{ formData.scene_desc }}</div>
    </el-card>
    <!-- Header End -->

    <!-- 系统通知 Start -->
    <el-card shadow="never" class="m-t-15" v-if="formData.system_notice.is_show">
        <div class="xxl m-b-20">系统通知</div>

        <div class style="width: 90%">
            <el-form ref="form" label-width="135px">
                <el-form-item label="开启状态" required>
                    <el-radio v-model="formData.system_notice.status" :label="'0'">关闭</el-radio>
                    <el-radio v-model="formData.system_notice.status" :label="'1'">开启</el-radio>
                </el-form-item>

                <el-form-item label="通知标题" size="mini" required>
                    <el-input v-model="formData.system_notice.title"></el-input>
                </el-form-item>

                <el-form-item label="通知内容" size="mini" required>
                    <el-input
                        type="textarea"
                        class="text"
                        style="width: 300px"
                        placeholder="请输入内容"
                        v-model="formData.system_notice.content"
                    ></el-input>
                </el-form-item>
            </el-form>

            <div class="desc m-t-20" style="margin-left: 135px">
                <div v-for="(item, index) in formData.system_notice.tips" :key="index">
                    {{ item }}
                </div>
            </div>
        </div>
    </el-card>
    <!-- 系统通知 End -->

    <!-- 短信通知 Start -->
    <el-card shadow="never" class="m-t-15" v-if="formData.sms_notice.is_show">
        <div class="xxl m-b-20">短信通知</div>

        <div style="width: 90%">
            <el-form ref="form" label-width="135px">
                <el-form-item label="开启状态" required>
                    <el-radio v-model="formData.sms_notice.status" :label="'0'">关闭</el-radio>
                    <el-radio v-model="formData.sms_notice.status" :label="'1'">开启</el-radio>
                </el-form-item>

                <el-form-item label="模板ID" size="mini" required>
                    <el-input v-model="formData.sms_notice.template_id"></el-input>
                </el-form-item>

                <el-form-item label="短信内容" size="mini" required>
                    <el-input
                        type="textarea"
                        class="text"
                        style="width: 300px"
                        placeholder="请输入内容"
                        v-model="formData.sms_notice.content"
                    ></el-input>
                </el-form-item>
            </el-form>

            <div class="desc m-t-20" style="margin-left: 135px">
                <div v-for="(item, index) in formData.sms_notice.tips" :key="index">{{ item }}</div>
            </div>
        </div>
    </el-card>
    <!-- 短信通知 End -->

    <!-- 微信模板消息 Start -->
    <el-card shadow="never" class="m-t-15" v-if="formData.oa_notice.is_show">
        <div class="xxl m-b-20">微信模板消息</div>

        <el-alert
            title="温馨提示：
1. 请前往微信公众平台，将【主营行业：IT科技/互联网|电子商务 副营行业：消费品】类目添加至您的服务类目，否则将影响订阅通知的正常发送。
2. 查找订阅通知并选用，调整关键词的顺序后，复制模板ID，粘贴在此页面对应的模板ID输入框中"
            type="success"
            show-icon
            :closable="false"
        />

        <div class style="width: 90%">
            <el-form ref="form" label-width="135px">
                <el-form-item label="开启状态" required>
                    <el-radio v-model="formData.oa_notice.status" :label="'0'">关闭</el-radio>
                    <el-radio v-model="formData.oa_notice.status" :label="'1'">开启</el-radio>
                </el-form-item>

                <el-form-item label="模板ID" size="mini" required>
                    <el-input v-model="formData.oa_notice.template_id"></el-input>
                </el-form-item>

                <el-form-item label="模板字段first内容" size="mini" required>
                    <el-input v-model="formData.oa_notice.first"></el-input>
                </el-form-item>

                <el-form-item label="模板字段remrk内容" size="mini" required>
                    <el-input v-model="formData.oa_notice.remark"></el-input>
                </el-form-item>

                <el-form-item label="模板内容" size="mini" required>
                    <el-button type="primary" size="mini" @click="onAddModeField"
                        >新增模板字段</el-button
                    >

                    <el-table
                        class="m-t-12"
                        :data="formData.oa_notice.tpl"
                        style="width: 100%"
                        size="mini"
                    >
                        <el-table-column label="字段名" width="120">
                            <template #="scope">
                                <el-input
                                    v-model="formData.oa_notice.tpl[scope.$index].tpl_name"
                                    placeholder="例如:订单编号"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="字段值" width="120">
                            <template #="scope">
                                <el-input
                                    v-model="formData.oa_notice.tpl[scope.$index].tpl_keyword"
                                    placeholder="例如:keyword1.DT"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="字段内容" width="180">
                            <template #="scope">
                                <el-input
                                    v-model="formData.oa_notice.tpl[scope.$index].tpl_content"
                                    placeholder="例如:${order.sn}"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template #="scope">
                                <el-button
                                    type="text"
                                    size="mall"
                                    @click="formData.oa_notice.tpl.splice(scope.$index, 1)"
                                    >删除</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>

            <div class="desc m-t-20" style="margin-left: 135px">
                <div v-for="(item, index) in formData.oa_notice.tips" :key="index">{{ item }}</div>
            </div>
        </div>
    </el-card>
    <!-- 微信模板消息 End -->

    <!-- 微信小程序提醒 Start -->
    <el-card shadow="never" class="m-t-15" v-if="formData.mnp_notice.is_show">
        <div class="xxl m-b-20">微信小程序提醒</div>

        <el-alert
            title="温馨提示：
1. 请前往微信公众平台，将【主营行业：IT科技/互联网|电子商务 副营行业：消费品】类目添加至您的服务类目，否则将影响订阅通知的正常发送。
2. 查找订阅通知并选用，调整关键词的顺序后，复制模板ID，粘贴在此页面对应的模板ID输入框中"
            type="success"
            show-icon
            :closable="false"
        />

        <div class style="width: 90%">
            <el-form ref="form" label-width="135px">
                <el-form-item label="开启状态" required>
                    <el-radio v-model="formData.mnp_notice.status" :label="'0'">关闭</el-radio>
                    <el-radio v-model="formData.mnp_notice.status" :label="'1'">开启</el-radio>
                </el-form-item>

                <el-form-item label="模板ID" size="mini" required>
                    <el-input v-model="formData.mnp_notice.template_id"></el-input>
                </el-form-item>

                <el-form-item label="模板内容" size="mini" required>
                    <el-button type="primary" size="mini" @click="onAddWeChatModeField"
                        >新增模板字段</el-button
                    >

                    <el-table
                        class="m-t-12"
                        :data="formData.mnp_notice.tpl"
                        style="width: 100%"
                        size="mini"
                    >
                        <el-table-column label="字段名" width="120">
                            <template #="scope">
                                <el-input
                                    v-model="formData.mnp_notice.tpl[scope.$index].tpl_name"
                                    placeholder="例如:订单编号"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="字段值" width="120">
                            <template #="scope">
                                <el-input
                                    v-model="formData.mnp_notice.tpl[scope.$index].tpl_keyword"
                                    placeholder="例如:keyword1.DT"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="字段内容" width="180">
                            <template #="scope">
                                <el-input
                                    v-model="formData.mnp_notice.tpl[scope.$index].tpl_content"
                                    placeholder="例如:${order.sn}"
                                ></el-input>
                            </template>
                        </el-table-column>
                        <el-table-column label="操作" width="120">
                            <template #="scope">
                                <el-button
                                    type="text"
                                    size="mall"
                                    @click="formData.mnp_notice.tpl.splice(scope.$index, 1)"
                                    >删除</el-button
                                >
                            </template>
                        </el-table-column>
                    </el-table>
                </el-form-item>
            </el-form>

            <div class="desc m-t-20" style="margin-left: 135px">
                <div v-for="(item, index) in formData.mnp_notice.tips" :key="index">{{ item }}</div>
            </div>
        </div>
    </el-card>
    <!-- 微信小程序提醒 End -->

    <!-- Footer Start -->
    <footer-btns>
        <el-button type="primary" size="small" @click="onSubmit()">保存</el-button>
    </footer-btns>
    <!-- Footer End -->
</template>

<script lang="ts" setup>
    import { ref } from 'vue'
    import { apiNoticeDetail, apiNoticeEdit } from '@/api/application'
    import { useAdmin } from '@/core/hooks/app'
    import FooterBtns from '@/components/footer-btns/index.vue'

    /** Data Start **/
    const { router, route } = useAdmin()
    const id = ref<any>(route.query.id)
    const formData = ref<any>({
        // 系统通知
        system_notice: {
            is_show: false,
            content: '',
            status: '',
            title: '',
        },
        // 短信通知
        sms_notice: {
            content: '',
            is_show: true,
            status: '',
            template_id: '',
        },
        // 微信模板
        oa_notice: {
            first: '',
            is_show: false,
            name: '',
            remark: '',
            status: '',
            template_id: '',
            template_sn: '',
            tpl: [],
        },
        // 微信小程序
        mnp_notice: {
            is_show: false,
            name: '',
            status: '',
            template_id: '',
            template_sn: '',
            tpl: [],
        },
    })
    /** Data End **/

    /** Methods Start **/
    // 提交保存
    const onSubmit = async (): Promise<void> => {
        const params = {
            id: id.value,
            template: [
                {
                    type: 'system',
                    ...formData.value.system_notice,
                },
                {
                    type: 'sms',
                    ...formData.value.sms_notice,
                },
                {
                    type: 'oa',
                    ...formData.value.oa_notice,
                },
                {
                    type: 'mnp',
                    ...formData.value.mnp_notice,
                },
            ],
        }
        await apiNoticeEdit({ ...params })
        router.back()
    }
    // 获取详情
    const getNoticeDetail = async (): Promise<void> => {
        formData.value = await apiNoticeDetail({ id: id.value })
    }
    // 新增微信模板字段
    const onAddModeField = (): void => {
        formData.value.oa_notice.tpl.push({
            tpl_name: '',
            tpl_keyword: '',
            tpl_content: '',
        })
    }
    // 新增微信小程序模板字段
    const onAddWeChatModeField = (): void => {
        formData.value.mnp_notice.tpl.push({
            tpl_name: '',
            tpl_keyword: '',
            tpl_content: '',
        })
    }
    /** Methods End **/

    /** Life Cycle Start **/
    if (id.value) getNoticeDetail()
    /** Life Cycle End **/
</script>

<style lang="scss" scoped>
    ::v-deep .text .el-textarea__inner {
        height: 100px !important;
    }
</style>
