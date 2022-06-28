<el-table-column label="{字段描述}" prop="{字段名称}">
    <template #default="{ row }">
      <span>{{ timeFormat(row.{字段名称}, 'yyyy-mm-dd hh:MM:ss') }}</span>
    </template>
</el-table-column>