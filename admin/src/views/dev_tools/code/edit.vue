<template>
    <div class="code-edit">
        <el-card shadow="never">
            <el-page-header content="编辑" @back="$router.back()" />
        </el-card>
        <el-card class="m-t-16" shadow="never">
            <el-form :model="formData" size="small" label-width="80px">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="基础信息" name="base">
                        <el-form-item label="表名称">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="表描述">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="作者">
                            <el-input></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input type="textarea" :rows="4"></el-input>
                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="字段管理" name="field">
                        <el-table :data="[{}]" style="width: 100%">
                            <el-table-column label="字段列名" />
                            <el-table-column label="字段描述" width="180">
                                <template v-slot="{}">
                                    <el-input></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column label="物理类型" />
                            <el-table-column label="必填" width="50">
                                <template v-slot="{}">
                                    <el-checkbox></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="插入" width="50">
                                <template v-slot="{}">
                                    <el-checkbox></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="编辑" width="50">
                                <template v-slot="{}">
                                    <el-checkbox></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="列表" width="50">
                                <template v-slot="{}">
                                    <el-checkbox></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="查询" width="50">
                                <template v-slot="{}">
                                    <el-checkbox></el-checkbox>
                                </template>
                            </el-table-column>
                            <el-table-column label="查询方式">
                                <template v-slot="{}">
                                    <el-select class="m-2" placeholder="Select"></el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="显示类型">
                                <template v-slot="{}">
                                    <el-select class="m-2" placeholder="Select"></el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="字典类型">
                                <template v-slot="{}">
                                    <el-select class="m-2" placeholder="Select"></el-select>
                                </template>
                            </el-table-column>
                            <el-table-column label="示例">
                                <template v-slot="{}">
                                    <el-input></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="生成配置" name="config">
                        <el-form-item label="模块名">
                            <el-input></el-input>
                            <div class="muted">生成文件所在模块</div>
                        </el-form-item>
                        <el-form-item label="模板类型">
                            <el-radio-group v-model="radio">
                                <el-radio :label="3">单表（curd）</el-radio>
                                <el-radio :label="6">树表（curd）</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="生成方式">
                            <el-radio-group v-model="radio">
                                <el-radio :label="3">压缩包下载</el-radio>
                                <el-radio :label="6">生成到模块</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="类目录">
                            <el-input></el-input>
                            <div class="muted">生成文件所在目录名,不填则在模块对应文件夹内生成。
例：填写test，则控制器xxxControlle文件生成在app/模块名/controller/test文件夹下。不填时，xxxController生成在app/模块名/controller文件夹下。</div>
                        </el-form-item>
                        <el-form-item label="类描述">
                            <el-input></el-input>
                            <div class="muted">生成文件描述。
例：填写用户，生成控制器名/逻辑/模型等，文件内描述为用户控制器/用户逻辑/用户模型</div>
                        </el-form-item>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
const activeName = ref('base')
const formData = reactive({

})
</script>