
<!-- 时间范围 -->
<el-form-item label="{字段描述}" prop="{字段名称}">
    <data-picker
        v-model:start_time="queryParams.start_{字段名称}"
        v-model:end_time="queryParams.end_{字段名称}"
    />
</el-form-item>
