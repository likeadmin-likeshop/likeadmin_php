<!-- 网站信息 -->
<template>
    <div class="website-information">
        <el-card shadow="never" class="m-t-15">
            <el-form :rules="rules" ref="form" class="ls-form" :model="form" label-width="150px" size="small">
                <el-form-item label="网站名称" prop="name" required>
                    <el-input v-model="formData.name" placeholder="请输入网站名称"></el-input>
                </el-form-item>
                <el-form-item label="网站图标" prop="image" >
                    <!-- <material-select :limit="1" v-model="formData.image" /> -->
                    <div class="flex">
                        <div class="muted xs m-r-16">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
                        <el-popover placement="right" width="200" trigger="hover">
                            <el-image
                                src="https://img2.baidu.com/it/u=3357699356,1912406716&fm=26&fmt=auto&gp=0.jpg" />
                            <el-button slot="reference" type="text">查看示例</el-button>
                        </el-popover>
                    </div>
                </el-form-item>
                <el-form-item label="网站LOGO" prop="name" requir>
                    <div class="flex">
                        <div class="muted xs m-r-16">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
                        <el-popover placement="right" width="200" trigger="hover">
                            <el-image
                                src="https://img2.baidu.com/it/u=3357699356,1912406716&fm=26&fmt=auto&gp=0.jpg" />
                            <el-button slot="reference" type="text">查看示例</el-button>
                        </el-popover>
                    </div>
                </el-form-item>
                <el-form-item label="登录页广告图" prop="name" requir>
                    <div class="flex">
                        <div class="muted xs m-r-16">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
                        <el-popover placement="right" width="200" trigger="hover">
                            <el-image
                                src="https://img2.baidu.com/it/u=3357699356,1912406716&fm=26&fmt=auto&gp=0.jpg" />
                            <el-button slot="reference" type="text">查看示例</el-button>
                        </el-popover>
                    </div>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang="ts">
    import {
        defineComponent,
        reactive,
    } from "vue";
    // import MaterialSelect from '@/components/material-select/index.vue'
    export default defineComponent({
        // components: {
        //     MaterialSelect,
        // },
        setup() {
            // 表单数据
            const formData = reactive({
                account: '',
                name: '',
                role: '',
                image: '',
            })

            return {
                formData,
            }
        },
    })
</script>

<style lang="scss" scoped>
</style>
