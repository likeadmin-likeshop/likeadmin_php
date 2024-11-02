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
                label-width="100px"
                :rules="rules"
            >
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基础信息" name="base">
                        <el-form-item label="表名称" prop="table_name">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.table_name"
                                    placeholder="请输入表名称"
                                    clearable
                                />
                            </div>
                        </el-form-item>
                        <el-form-item label="表描述" prop="table_comment">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.table_comment"
                                    placeholder="请输入表描述"
                                    clearable
                                />
                            </div>
                        </el-form-item>
                        <el-form-item label="作者">
                            <div class="w-80">
                                <el-input v-model="formData.author" clearable />
                            </div>
                        </el-form-item>
                        <el-form-item label="备注">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.remark"
                                    class="w-full"
                                    type="textarea"
                                    :autosize="{ minRows: 4, maxRows: 4 }"
                                    maxlength="200"
                                    show-word-limit
                                    clearable
                                />
                            </div>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="字段管理" name="column">
                        <el-table :data="formData.table_column">
                            <el-table-column label="字段列名" prop="column_name" />
                            <el-table-column label="字段描述" prop="column_comment" min-width="120">
                                <template v-slot="{ row }">
                                    <el-input v-model="row.column_comment" clearable />
                                </template>
                            </el-table-column>
                            <el-table-column label="物理类型" prop="column_type" />
                            <el-table-column label="必填" width="80">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_required"
                                        :true-value="1"
                                        :false-value="0"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column label="插入" width="80">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_insert"
                                        :true-value="1"
                                        :false-value="0"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column label="编辑" width="80">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_update"
                                        :true-value="1"
                                        :false-value="0"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column label="列表" width="80">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_lists"
                                        :true-value="1"
                                        :false-value="0"
                                    />
                                </template>
                            </el-table-column>
                            <el-table-column label="查询" width="80">
                                <template v-slot="{ row }">
                                    <el-checkbox
                                        v-model="row.is_query"
                                        :true-value="1"
                                        :false-value="0"
                                    />
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
                            <el-table-column label="显示类型" min-width="120">
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
                            <el-table-column label="字典类型" min-width="120">
                                <template v-slot="{ row }">
                                    <el-select
                                        v-model="row.dict_type"
                                        clearable
                                        :disabled="
                                            !(
                                                row.view_type == 'select' ||
                                                row.view_type == 'radio' ||
                                                row.view_type == 'checkbox'
                                            )
                                        "
                                        placeholder="字典类型"
                                    >
                                        <el-option
                                            v-for="(item, index) in optionsData.dict_type"
                                            :key="index"
                                            :label="item.name"
                                            :value="item.type"
                                            :disabled="!item.status"
                                        />
                                    </el-select>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="生成配置" name="config">
                        <el-form-item label="模板类型" prop="template_type">
                            <el-radio-group v-model="formData.template_type">
                                <el-radio :value="0">单表（curd）</el-radio>
                                <el-radio :value="1">树表（curd）</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="删除类型" prop="delete.type">
                            <el-radio-group v-model="formData.delete.type">
                                <el-radio :value="0">物理删除</el-radio>
                                <el-radio :value="1">软删除</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item
                            label="删除字段"
                            prop="delete.name"
                            v-if="formData.delete.type == 1"
                        >
                            <el-select class="w-80" v-model="formData.delete.name" clearable>
                                <el-option
                                    v-for="item in formData.table_column"
                                    :key="item.id"
                                    :value="item.column_name"
                                    :label="`${item.column_name}：${item.column_comment}`"
                                />
                            </el-select>
                        </el-form-item>
                        <template v-if="formData.template_type == 1">
                            <el-form-item label="树表ID" prop="treePrimary">
                                <div>
                                    <el-select
                                        class="w-80"
                                        v-model="formData.tree.tree_id"
                                        clearable
                                    >
                                        <el-option
                                            v-for="item in formData.table_column"
                                            :key="item.id"
                                            :value="item.column_name"
                                            :label="`${item.column_name}：${item.column_comment}`"
                                        />
                                    </el-select>
                                    <div class="form-tips">指定树表的主要ID，一般为主键</div>
                                </div>
                            </el-form-item>
                            <el-form-item label="树表父ID" prop="treeParent">
                                <div>
                                    <el-select
                                        class="w-80"
                                        v-model="formData.tree.tree_pid"
                                        clearable
                                    >
                                        <el-option
                                            v-for="item in formData.table_column"
                                            :key="item.id"
                                            :value="item.column_name"
                                            :label="`${item.column_name}：${item.column_comment}`"
                                        />
                                    </el-select>
                                    <div class="form-tips">指定树表的父ID，比如：parent_id</div>
                                </div>
                            </el-form-item>
                            <el-form-item label="树名称" prop="treeName">
                                <el-select class="w-80" v-model="formData.tree.tree_name" clearable>
                                    <el-option
                                        v-for="item in formData.table_column"
                                        :key="item.id"
                                        :value="item.column_name"
                                        :label="`${item.column_name}：${item.column_comment}`"
                                    />
                                </el-select>
                            </el-form-item>
                        </template>
                        <el-form-item label="类描述">
                            <div class="w-80">
                                <div>
                                    <el-input
                                        v-model="formData.class_comment"
                                        placeholder="请输入文件描述"
                                        clearable
                                    />
                                </div>
                                <div class="form-tips">
                                    <div>
                                        例：填写test,生成文件描述为test控制器(test逻辑/test模型)
                                    </div>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item label="生成方式" prop="generate_type">
                            <el-radio-group v-model="formData.generate_type">
                                <el-radio :value="0">压缩包下载</el-radio>
                                <el-radio :value="1">生成到模块</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="模块名" prop="module_name">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.module_name"
                                    placeholder="请输入模块名"
                                    clearable
                                />
                                <div class="form-tips">生成文件所在模块</div>
                            </div>
                        </el-form-item>
                        <el-form-item label="类目录">
                            <div class="w-80">
                                <div>
                                    <el-input
                                        v-model="formData.class_dir"
                                        placeholder="请输入文件所在目录"
                                        clearable
                                    />
                                </div>
                                <div class="form-tips">
                                    <div>
                                        例：填写test,则在app/模块名/controller/test下生成控制器
                                    </div>
                                </div>
                            </div>
                        </el-form-item>

                        <el-form-item label="父级菜单" prop="menu.pid">
                            <el-tree-select
                                class="w-80"
                                v-model="formData.menu.pid"
                                :data="optionsData.menu"
                                clearable
                                node-key="id"
                                :props="{
                                    label: 'name'
                                }"
                                default-expand-all
                                placeholder="请选择父级菜单"
                                check-strictly
                            />
                        </el-form-item>
                        <el-form-item label="菜单名称" prop="menu.name">
                            <div class="w-80">
                                <el-input
                                    v-model="formData.menu.name"
                                    placeholder="请输入菜单名称"
                                    clearable
                                />
                            </div>
                        </el-form-item>
                        <el-form-item label="菜单构建" prop="menu.type" required>
                            <div>
                                <el-radio-group v-model="formData.menu.type">
                                    <el-radio :value="1">自动构建</el-radio>
                                    <el-radio :value="0">手动添加</el-radio>
                                </el-radio-group>
                                <div class="form-tips">
                                    自动构建：自动执行生成菜单sql。手动添加：自行添加菜单。
                                </div>
                            </div>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="关联配置" name="relations">
                        <el-button type="primary" @click="showEditPopup('add')">
                            <template #icon>
                                <icon name="el-icon-Plus" />
                            </template>
                            新增关联
                        </el-button>
                        <div class="mt-4">
                            <el-table :data="formData.relations" size="small">
                                <el-table-column prop="type" label="关联类型">
                                    <template #default="{ row }">
                                        <dict-value :value="row.type" :options="relationTypes" />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="name" label="关联名称" />
                                <el-table-column prop="model" label="关联模型" />
                                <el-table-column prop="local_key" label="关联键">
                                    <template #default="{ row }">
                                        <dict-value
                                            :value="row.local_key"
                                            :options="formData.table_column"
                                            :config="{
                                                label: 'column_comment',
                                                value: 'column_name'
                                            }"
                                        />
                                    </template>
                                </el-table-column>
                                <el-table-column prop="foreign_key" label="外键" />
                                <el-table-column label="操作">
                                    <template #default="{ row, $index }">
                                        <el-button
                                            link
                                            type="primary"
                                            @click="showEditPopup('edit', row, $index)"
                                        >
                                            编辑
                                        </el-button>
                                        <el-button link type="danger" @click="handelDelete($index)">
                                            删除
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <relations-add
                                :column="formData.table_column"
                                :types="relationTypes"
                                v-if="showEdit"
                                ref="editRef"
                                @add="handleAdd"
                                @edit="handleEdit"
                                @close="showEdit = false"
                            />
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
        <footer-btns>
            <el-button type="primary" @click="onSubmit">保存</el-button>
        </footer-btns>
    </div>
</template>

<script lang="ts" setup name="tableEdit">
import type { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash'

import { menuAll } from '@/api/perms/menu'
import { dictTypeAll } from '@/api/setting/dict'
import { generateEdit, tableDetail } from '@/api/tools/code'
import { useDictOptions } from '@/hooks/useDictOptions'
import feedback from '@/utils/feedback'

import RelationsAdd from '../components/relations-add.vue'

const route = useRoute()
const router = useRouter()
const activeName = ref('column')
const showEdit = ref(false)
const relationTypes = [
    {
        name: '一对一',
        value: 'has_one'
    },
    {
        name: '一对多',
        value: 'has_many'
    }
]
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
    table_column: [] as any[],
    menu: {
        pid: 0,
        name: '',
        type: 0
    },
    tree: {
        tree_id: 0,
        tree_pid: 0,
        tree_name: 0
    },
    delete: {
        name: '',
        type: 0
    },
    relations: [] as any[]
})
let editIndex = 0
const formRef = shallowRef<FormInstance>()
const editRef = shallowRef<InstanceType<typeof RelationsAdd>>()
const rules = reactive({
    table_name: [{ required: true, message: '请输入表名称' }],
    table_comment: [{ required: true, message: '请输入表描述' }],
    module_name: [{ required: true, message: '请输入模块名' }],
    generate_type: [{ required: true, trigger: 'change' }],
    template_type: [{ required: true, trigger: 'change' }],
    ['menu.pid']: [{ required: true, message: '请选择父级菜单' }],
    ['menu.name']: [{ required: true, message: '请输入菜单名称' }],
    ['delete.type']: [{ required: true, trigger: 'change' }],
    ['delete.name']: [{ required: true, message: '请选择删除字段' }]
})

const showEditPopup = async (type: string, data?: any, index?: number) => {
    showEdit.value = true
    await nextTick()
    if (data && index !== undefined) {
        editRef.value?.setFormData(data)
        editIndex = index
    }
    editRef.value?.open(type)
}

const handleAdd = (data: any) => {
    const newData = cloneDeep(toRaw(data))
    formData.relations.push(newData)
}

const handleEdit = async (data: any) => {
    const newData = cloneDeep(toRaw(data))
    console.log(editIndex)
    formData.relations.splice(editIndex, 1, newData)
}

const handelDelete = (index: number) => {
    formData.relations.splice(index, 1)
}
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

const { optionsData } = useDictOptions<{
    dict_type: any[]
    menu: any[]
}>({
    dict_type: {
        api: dictTypeAll
    },
    menu: {
        api: menuAll,
        transformData(data) {
            const menu = { id: 0, name: '顶级', children: [] }
            menu.children = data
            return [menu]
        }
    }
})

const onSubmit = async () => {
    try {
        await formRef.value?.validate()
        await generateEdit(formData)
        router.back()
    } catch (error: any) {
        for (const err in error) {
            const isInRules = Object.keys(rules).includes(err)
            isInRules && feedback.msgError(error[err][0]?.message)
        }
    }
}

getDetails()
</script>
