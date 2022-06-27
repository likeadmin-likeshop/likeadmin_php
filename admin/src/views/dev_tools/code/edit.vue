<template>
    <div class="code-edit">
        <el-card shadow="never">
            <el-page-header content="编辑" @back="$router.back()" />
        </el-card>
        <el-card class="m-t-16" shadow="never">
            <el-form
                class="ls-form"
                :model="formData"
                size="small"
                label-width="80px"
                :rules="rules"
            >
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基础信息" name="base">
                        <el-form-item label="表名称" prop="table_name">
                            <el-input v-model="formData.table_name" placeholder="请输入表名称"></el-input>
                        </el-form-item>
                        <el-form-item label="表描述" prop="table_comment">
                            <el-input v-model="formData.table_comment" placeholder="请输入表描述"></el-input>
                        </el-form-item>
                        <el-form-item label="作者">
                            <el-input v-model="formData.author"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input
                                v-model="formData.remark"
                                class="el-input"
                                type="textarea"
                                :rows="4"
                            ></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="字段管理" name="field">
                        <el-table :data="formData.table_column" style="width: 100%">
                            <el-table-column label="字段列名" prop="column_name" />
                            <el-table-column label="字段描述" prop="column_comment">
                                <template v-slot="{ row }">
                                    <el-input v-model="row.column_comment"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="物理类型" prop="column_type" />
                            <el-table-column label="必填" width="50">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_required"
                                        :true-label="1"
                                        :false-label="0"
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="插入" width="50">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_insert"
                                        :true-label="1"
                                        :false-label="0"
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="编辑" width="50">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_update"
                                        :true-label="1"
                                        :false-label="0"
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="列表" width="50">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_lists"
                                        :true-label="1"
                                        :false-label="0"
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="查询" width="50">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_query"
                                        :true-label="1"
                                        :false-label="0"
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="查询方式">
                                <template v-slot="{ row }">
                                    <el-select v-model="row.query_type">
                                        <el-option label="=" value="=" />
                                        <el-option label="!=" value="!=" />
                                        <el-option label=">" value=">" />
                                        <el-option label=">=" value=">=" />
                                        <el-option label="<" value="<" />
                                        <el-option label="<=" value="<=" />
                                        <el-option label="LIKE" value="like" />
                                        <el-option label="BETWEEN" value="between" />
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="显示类型">
                                <template v-slot="{ row }">
                                    <el-select v-model="row.view_type">
                                        <el-option label="文本框" value="input" />
                                        <el-option label="文本域" value="textarea" />
                                        <el-option label="下拉框" value="select" />
                                        <el-option label="单选框" value="radio" />
                                        <el-option label="复选框" value="checkbox" />
                                        <el-option label="日期控件" value="datetime" />
                                        <el-option label="图片选择控件" value="imageSelect" />
                                        <el-option label="富文本控件" value="editor" />
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="字典类型">
                                <template v-slot="{ row }">
                                    <el-select v-model="row.dict_type" placeholder="字典类型">
                                        <el-option
                                            v-for="(item,index) in dictData"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.type"
                                        />
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="生成配置" name="config">
                        <el-form-item label="模板类型" required>
                            <el-radio-group v-model="formData.template_type">
                                <el-radio :label="0">单表（curd）</el-radio>
                                <!-- <el-radio :label="1">树表（curd）</el-radio> -->
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="生成方式" required>
                            <el-radio-group v-model="formData.generate_type">
                                <el-radio :label="0">压缩包下载</el-radio>
                                <el-radio :label="1">生成到模块</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="模块名" prop="module_name">
                            <el-input v-model="formData.module_name" placeholder="请输入模块名"></el-input>
                            <div class="muted">生成文件所在模块</div>
                        </el-form-item>
                        <el-form-item label="类目录">
                            <el-input v-model="formData.class_dir"></el-input>
                            <div class="muted">
                                生成文件所在目录名,不填则在模块对应文件夹内生成。
                                <br />例：填写test，则控制器xxxControlle文件生成在app/模块名/controller/test文件夹下。不填时，xxxController生成在app/模块名/controller文件夹下。
                            </div>
                        </el-form-item>
                        <el-form-item label="类描述">
                            <el-input v-model="formData.class_comment"></el-input>
                            <div class="muted">
                                生成文件描述。
                                <br />例：填写用户，生成控制器名/逻辑/模型等，文件内描述为用户控制器/用户逻辑/用户模型
                            </div>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <footer-btns>
            <el-button type="primary" size="small" @click="onSubmit">保存</el-button>
        </footer-btns>

        <popup
            ref="popupRef"
            class="inline"
            content="生成到模块方式如遇同名文件会覆盖旧文件，确定要选择此方式吗？"
            @cancel="formData.generate_type = 0"
        />
    </div>
</template>

<script lang="ts" setup>
import { apiGenerateEdit, apiTableDetail } from "@/api/dev_tools"
import { reactive, ref, shallowRef, watch } from "vue"
import { useRoute, useRouter } from 'vue-router'
import FooterBtns from '@/components/footer-btns/index.vue'
import Popup from '@/components/popup/index.vue'
import Editor from '@/components/editor/index.vue'
import { apiDictTypeLists } from "@/api/dict"
const route = useRoute()
const router = useRouter()
const activeName = ref('base')
const formData = reactive({
    id: '',
    table_name: '',
    table_comment: '',
    author: '',
    remark: '',
    template_type: 0,
    generate_type: 0,
    module_name: '',
    class_dir: '',
    class_comment: '',
    table_column: []
})

const isRadioClick = ref(false)

const popupRef = shallowRef<InstanceType<typeof Popup>>()

const dictData = ref<any[]>([])
const rules = reactive({
    table_name: [
        { required: true, message: '请输入表名称', trigger: 'blur' },
    ],
    table_comment: [
        { required: true, message: '请输入表描述', trigger: 'blur' },
    ],
    module_name: [
        { required: true, message: '请输入模块名', trigger: 'blur' },
    ],
})

const getDetails = async () => {
    const data = await apiTableDetail({
        id: route.query.id
    })
    Object.keys(formData).forEach((key) => {
        //@ts-ignore
        formData[key] = data[key]
    })

    watch(() => formData.generate_type, (value) => {
        if (value == 1) {
            popupRef.value?.open()
        }
    })

}
const getDict = async () => {
    const data: any = await apiDictTypeLists({
        page_type: 0
    })
    dictData.value = data.lists
}

const onSubmit = async () => {
    await apiGenerateEdit(formData)
    router.back()
}


getDetails()
getDict()
</script>