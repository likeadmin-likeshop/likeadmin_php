<template>
    <div class="decoration-pc min-w-[1100px]">
        <el-card shadow="never" class="!border-none flex-1 flex">
            <div class="text-xl font-medium">首页装修</div>
            <router-link
                :to="{
                    path: '/decoration/pc_details',
                    query: {
                        url: state.pc_url
                    }
                }"
            >
                <el-button class="m-5" type="primary" size="large">去装修</el-button>
            </router-link>
            <el-form>
                <el-form-item label="最近更新">{{ state.update_time }}</el-form-item>
                <el-form-item label="PC端链接">
                    <el-input style="width: 350px" v-model="state.pc_url" disabled></el-input>
                    <el-button type="primary" v-copy="state.pc_url">复制</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>
<script lang="ts" setup name="decorationPc">
import { getDecoratePc } from '@/api/decoration'

const state = ref({
    update_time: '',
    pc_url: ''
})

const getData = async () => {
    try {
        state.value = await getDecoratePc()
    } catch (error) {
        console.log(error)
    }
}

getData()
</script>
