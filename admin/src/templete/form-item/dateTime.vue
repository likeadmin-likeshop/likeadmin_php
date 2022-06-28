

<!-- 时间控件 -->

<!-- 时间范围 -->
<el-form-item label="{字段描述}" prop="{字段名称}">
    <data-picker
        v-model:start_time="formData.start_{字段名称}"
        v-model:end_time="formData.end_{字段名称}"
    />
</el-form-item>

<!-- 时间点 -->
<el-form-item label="{字段描述}" prop="{字段名称}">
    <el-date-picker 
        v-model="formData.{字段名称}"
        clearable
        type="datetime"
        value-format="YYYY-MM-DD HH:mm:ss"
        placeholder="选择{字段描述}">
    </el-date-picker>
</el-form-item>
