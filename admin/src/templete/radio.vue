<!-- 单选框 -->

<el-form-item label="{字段描述}" prop="{字段名称}">
    <el-radio-group v-model="formData.{字段名称}" placeholder="请选择{字段描述}">
        <el-radio 
            v-for="(item, index) in dictData.{字典类型}" 
            :key="index" 
            :label="item.value"
        >{{ item.label }}</el-radio>
    </el-radio-group>
</el-form-item>