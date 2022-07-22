<!-- 备案信息 -->
<template>
  <div class="website-filing">
    <el-card shadow="never" class="!border-none">
      <el-form ref="form" class="ls-form" :model="formData" label-width="120px">
        <!-- 版权信息输入框 -->
        <el-form-item label="版权信息" prop="info">
          <div>
            <div class="w-80">
              <el-input v-model="formData.info" placeholder="请输入版权信息" />
            </div>
            <div class="form-tips">例如填写，Copyright © 2019-2020 公司名称</div>
          </div>
        </el-form-item>

        <!-- ICP备案号输入框 -->
        <el-form-item label="ICP备案号" prop="icp_number">
          <div class="w-80">
            <el-input v-model="formData.icp_number" placeholder="请输入ICP备案号" />
          </div>
        </el-form-item>

        <!-- ICP备案号链接输入框 -->
        <el-form-item label="ICP备案号链接" prop="icp_link">
          <div>
            <div class="w-80">
              <el-input v-model="formData.icp_link" placeholder="请输入ICP备案号链接" />
            </div>
            <div class="form-tips">例如填写域名信息备案系统链接，http://beian.miit.gov.cn</div>
          </div>
        </el-form-item>

        <!--公安备案号输入框 -->
        <el-form-item label="公安备案号" prop="public_number">
          <div class="w-80">
            <el-input v-model="formData.public_number" placeholder="请输入公安备案号" />
          </div>
        </el-form-item>

        <!-- 公安备案号链接输入框 -->
        <el-form-item label="公安备案号链接" prop="public_link">
          <div>
            <div class="w-80">
              <el-input v-model="formData.public_link" placeholder="请输入公安备案号链接" />
            </div>
            <div class="form-tips">例如填写公安信息备案系统链接，http://www.beian.gov.cn</div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <footer-btns v-perms="['setting.web.web_setting/setCopyright']">
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </footer-btns>
  </div>
</template>

<script lang="ts" setup>
import { getCopyright, setCopyright } from '@/api/setting/website'
// 表单数据
const formData = reactive({
  info: '', // 版权信息
  icp_number: '', // icp备案号
  icp_link: '', // icp备案链接
  public_number: '', // 公安备案号
  public_link: '' // 公安备案链接
})

// 获取备案信息
const getData = async () => {
  const data = await getCopyright()
  for (const key in formData) {
    //@ts-ignore
    formData[key] = data[key]
  }
}

// 设置备案信息
const handleSubmit = async () => {
  await setCopyright(formData)
  getData()
}

getData()
</script>
