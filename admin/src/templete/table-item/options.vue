<el-table-column label="{字段描述}" prop="{字段名称}">
    <template v-solt="{ row }">
        <dict-value :options="dictData.{字典类型}" :value="row.{字段名称}" />
    </template>
</el-table-column>