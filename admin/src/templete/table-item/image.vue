<el-table-column label="{字段描述}" prop="{字段名称}">
    <template v-solt="{ row }">
        <el-image style="width:50px;height:50px;" :src="row.{字段名称}" />
    </template>
</el-table-column>