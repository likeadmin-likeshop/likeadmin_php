
<!-- 下拉框 -->
<el-form-item label="{字段描述}" prop="{字段名称}">
    <el-select v-model="formData.{字段名称}" clearable placeholder="请选择{字段描述}">
        <el-option 
            v-for="(item, index) in dictData.{字典类型}" 
            :key="index" 
            :label="item.label"
            :value="item.value"
        />
    </el-select>
</el-form-item>