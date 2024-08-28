<template>
    <div>
        <el-card header="基础使用" shadow="never" class="!border-none">
            <div class="flex flex-wrap">
                <div class="m-4">
                    <popover-input @confirm="onConfirm">
                        <template #default>
                            <el-button> 点击输入 </el-button>
                        </template>
                    </popover-input>
                </div>
                <div class="m-4">
                    <popover-input type="number" @confirm="onConfirm">
                        <template #default>
                            <el-button> 输入数字 </el-button>
                        </template>
                    </popover-input>
                </div>
                <div class="m-4">
                    <popover-input size="small" @confirm="onConfirm">
                        <template #default>
                            <el-button> 调整大小 </el-button>
                        </template>
                    </popover-input>
                </div>
                <div class="m-4">
                    <popover-input :limit="20" :show-limit="true" @confirm="onConfirm">
                        <template #default>
                            <el-button> 限制输入长度 </el-button>
                        </template>
                    </popover-input>
                </div>
                <div class="m-4">
                    <popover-input value="默认值" @confirm="onConfirm">
                        <template #default>
                            <el-button> 默认值 </el-button>
                        </template>
                    </popover-input>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script lang="ts" setup>
const onConfirm = (value: string) => {
    console.log(value)
}
</script>
