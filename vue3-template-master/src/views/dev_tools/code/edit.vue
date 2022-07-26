<template>
    <div class="code-edit">
        <el-card class="!border-none" shadow="never">
            <el-page-header content="编辑数据表" @back="$router.back()" />
        </el-card>
        <el-card class="mt-4 !border-none" shadow="never">
            <el-form
                ref="formRef"
                class="ls-form"
                :model="formData"
                label-width="120px"
                :rules="rules"
            >
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基础信息" name="base">
                        <el-form-item label="表名称" prop="table_name">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.table_name"
                                    placeholder="请输入表名称"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item label="表描述" prop="table_comment">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.table_comment"
                                    placeholder="请输入表描述"
                                />
                            </div>
                        </el-form-item>
                        <el-form-item label="作者">
                            <div class="w-80">
                                <el-input v-model="formData.author" />
                            </div>
                        </el-form-item>
                        <el-form-item label="备注">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.remark"
                                    class="el-input"
                                    type="textarea"
                                    :rows="4"
                                />
                            </div>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="字段管理" name="field">
                        <el-table :data="formData.table_column">
                            <el-table-column label="字段列名" prop="column_name" />
                            <el-table-column label="字段描述" prop="column_comment">
                                <template v-slot="{ row }">
                                    <el-input v-model="row.column_comment"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="物理类型" prop="column_type" />
                            <el-table-column label="必填" width="80">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_required"
                                        :true-label="1"
                                        :false-label="0"
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="插入" width="80">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_insert"
                                        :true-label="1"
                                        :false-label="0"
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="编辑" width="80">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_update"
                                        :true-label="1"
                                        :false-label="0"
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="列表" width="80">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_lists"
                                        :true-label="1"
                                        :false-label="0"
                                    ></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="查询" width="80">
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
                                        <el-option label="图片选择控件" value="imageSelect" />
                                        <el-option label="富文本控件" value="editor" />
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="字典类型">
                                <template v-slot="{ row }">
                                    <el-select v-model="row.dict_type" placeholder="字典类型">
                                        <el-option
                                            v-for="(item, index) in dictData"
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
                        <el-form-item label="模板类型" prop="template_type">
                            <el-radio-group v-model="formData.template_type">
                                <el-radio :label="0">单表（curd）</el-radio>
                                <!-- <el-radio :label="1">树表（curd）</el-radio> -->
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="生成方式" prop="generate_type">
                            <el-radio-group v-model="formData.generate_type">
                                <el-radio :label="0">压缩包下载</el-radio>
                                <el-radio :label="1">生成到模块</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="模块名" prop="module_name">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.module_name"
                                    placeholder="请输入模块名"
                                />
                                <div class="form-tips">生成文件所在模块</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="类目录">
                            <div>
                                <div class="w-80">
                                    <el-input v-model="formData.class_dir"></el-input>
                                </div>
                                <div class="form-tips">
                                    生成文件所在目录名,不填则在模块对应文件夹内生成。
                                    <br />例：填写test，则控制器xxxControlle文件生成在app/模块名/controller/test文件夹下。
                                    <br />不填时，xxxController生成在app/模块名/controller文件夹下。
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="类描述">
                            <div>
                                <div class="w-80">
                                    <el-input v-model="formData.class_comment"></el-input>
                                </div>
                                <div class="form-tips">
                                    生成文件描述。
                                    <br />例：填写用户，生成控制器名/逻辑/模型等，文件内描述为用户控制器/用户逻辑/用户模型
                                </div>
                            </div>
                        </el-form-item>
                        <el-form-item label="父级菜单" prop="menu.pid">
                            <el-tree-select
                                class="w-80"
                                v-model="formData.menu.pid"
                                :data="menuOptions"
                                clearable
                                node-key="id"
                                :props="{
                                    label: 'name'
                                }"
                                placeholder="请选择父级菜单"
                                check-strictly
                            />
                        </el-form-item>
                        <el-form-item label="菜单名称" prop="menu.name">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.menu.name"
                                    placeholder="请输入菜单名称"
                                ></el-input>
                            </div>
                        </el-form-item>
                        <el-form-item label="菜单构建" prop="menu.type" required>
                            <div>
                                <el-radio-group v-model="formData.menu.type">
                                    <el-radio :label="1">自动构建</el-radio>
                                    <el-radio :label="0">手动添加</el-radio>
                                </el-radio-group>
                                <div class="form-tips">
                                    自动构建：自动执行生成菜单sql。手动添加：自行添加菜单。
                                </div>
                            </div>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <footer-btns>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts" setup>
import { generateEdit, tableDetail } from '@/api/tools/code'
import { dictTypeLists } from '@/api/setting/dict'
import type { FormInstance } from 'element-plus'
import feedback from '@/utils/feedback'
import { menuLists } from '@/api/perms/menu'
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
    table_column: [],
    menu: {
        pid: 0,
        name: '',
        type: 0
    }
})

const formRef = shallowRef<FormInstance>()
const dictData = ref<any[]>([])
const menuOptions = ref<any[]>([])
const rules = reactive({
    table_name: [{ required: true, message: '请输入表名称', trigger: 'blur' }],
    table_comment: [{ required: true, message: '请输入表描述', trigger: 'blur' }],
    module_name: [{ required: true, message: '请输入模块名', trigger: 'blur' }],
    generate_type: [{ required: true, trigger: 'change' }],
    template_type: [{ required: true, trigger: 'change' }],
    ['menu.pid']: [{ required: true, message: '请选择父级菜单', trigger: 'blur' }],
    ['menu.name']: [{ required: true, message: '请输入菜单名称', trigger: 'blur' }]
})

const getDetails = async () => {
    const data = await tableDetail({
        id: route.query.id
    })
    Object.keys(formData).forEach((key) => {
        //@ts-ignore
        formData[key] = data[key]
    })

    watch(
        () => formData.generate_type,
        (value) => {
            if (value == 1) {
                feedback
                    .confirm('生成到模块方式如遇同名文件会覆盖旧文件，确定要选择此方式吗？')
                    .catch(() => {
                        formData.generate_type = 0
                    })
            }
        }
    )
}
const getDict = async () => {
    const data: any = await dictTypeLists({
        page_type: 0
    })
    dictData.value = data.lists
}

const getMenu = async () => {
    const data: any = await menuLists({ page_type: 0 })
    const menu = { id: 0, name: '顶级', children: [] }
    menu.children = data.lists
    menuOptions.value.push(menu)
}

const onSubmit = async () => {
    await formRef.value?.validate()
    await generateEdit(formData)
    router.back()
}

getDetails()
getDict()
getMenu()
</script>
