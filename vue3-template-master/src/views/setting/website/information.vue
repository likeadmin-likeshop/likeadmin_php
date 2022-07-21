<!-- 网站信息 -->
<template>
  <div class="website-information">
    <el-card shadow="never">
      <el-form ref="formRef" :rules="rules" class="ls-form" :model="formData" label-width="120px">
        <el-form-item label="网站名称" prop="name">
          <div class="w-80">
            <el-input
              v-model="formData.name"
              placeholder="请输入网站名称"
              maxlength="12"
              show-word-limit
            ></el-input>
          </div>
        </el-form-item>
        <el-form-item label="网站图标" prop="web_favicon" required>
          <div>
            <material-picker v-model="formData.web_favicon" :limit="1" />
            <div class="form-tips">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
          </div>
        </el-form-item>
        <el-form-item label="网站LOGO" prop="web_logo" required>
          <div>
            <material-picker v-model="formData.web_logo" :limit="1" />
            <div class="form-tips">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
          </div>
        </el-form-item>
        <el-form-item label="登录页广告图" prop="login_image" required>
          <div>
            <material-picker v-model="formData.login_image" :limit="1" />
            <div class="form-tips">建议尺寸：100*100像素，支持jpg，jpeg，png格式</div>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <footer-btns v-perms="['setting.web.web_setting/setWebsite']">
      <el-button type="primary" @click="handleSubmit">保存</el-button>
    </footer-btns>
  </div>
</template>

<script lang="ts" setup>
import { getWebsite, setWebsite } from '@/api/setting/website'
import type { FormInstance } from 'element-plus'
const formRef = ref<FormInstance>()

// 表单数据
const formData = reactive({
  name: '', // 网站名称
  web_favicon: '', // 网站图标
  web_logo: '', // 网站logo
  login_image: '' // 登录页广告图
})

// 表单验证
const rules = {
  name: [
    {
      required: true,
      message: '请输入网站名称',
      trigger: ['blur']
    }
  ]
}

// 获取备案信息
const getData = () => {
  getWebsite().then((res: any) => {
    console.log('res', res)
    formData.name = res.name
    formData.web_favicon = res.web_favicon
    formData.web_logo = res.web_logo
    formData.login_image = res.login_image
  })
}

// 设置备案信息
const handleSubmit = () => {
  formRef.value?.validate((valid: boolean) => {
    if (!valid) {
      return
    }

    console.log('fasdfasd')
    setWebsite({
      name: formData.name,
      web_favicon: formData.web_favicon,
      web_logo: formData.web_logo,
      login_image: formData.login_image
    })
      .then((res: any) => {
        console.log('res', res)
        getData()
      })
      .catch((err: any) => {
        console.log('err', err)
      })
  })
}

getData()
</script>

<style lang="scss" scoped></style>
