<template>
    <div class="decoration-pc min-w-[1100px]">
        <el-card shadow="never" class="!border-none flex-1 flex">
            <div class="text-xl font-medium">首页装修</div>
            <router-link to="/decoration/pc_details">
                <el-button class="m-5" type="primary" size="large">去装修</el-button>
            </router-link>
            <el-form>
                <el-form-item label="最近更新">2024-03-18 12:26:28</el-form-item>
                <el-form-item label="PC端链接">
                    <el-input style="width: 350px" v-model="value"></el-input>
                    <el-button type="primary" v-copy="value">复制</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script lang="ts" setup name="decorationPc">
const value = ref('https://php.likeadmin.cn/pc/');
</script>
