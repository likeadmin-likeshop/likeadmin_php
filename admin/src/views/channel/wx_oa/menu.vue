<script setup lang="ts" name="wxOaMenu">
import OaAttr from './menu_com/oa-attr.vue'
import OaPhone from './menu_com/oa-phone.vue'
import { useMenuOa } from './menu_com/useMenuOa'

const { getOaMenuFunc, handleSave, handlePublish } = useMenuOa(undefined)
getOaMenuFunc()
</script>

<template>
    <div class="menu-oa">
        <el-card class="!border-none" shadow="never">
            <el-alert
                type="warning"
                title="配置微信公众号菜单，点击确认，保存菜单并发布至微信公众号"
                :closable="false"
                show-icon
            />
        </el-card>

        <el-card class="!border-none mt-4" shadow="never">
            <div class="lg:flex flex-1">
                <!-- Phone -->
                <oa-phone></oa-phone>

                <!-- Attr -->
                <div class="mt-4 lg:mt-0 max-w-[400px]">
                    <oa-attr></oa-attr>
                </div>
            </div>
        </el-card>

        <footer-btns>
            <el-button type="primary" @click="handleSave" v-perms="['channel:oaMenu:save']">
                保存
            </el-button>
            <el-button type="primary" @click="handlePublish" v-perms="['channel:oaMenu:publish']">
                发布
            </el-button>
        </footer-btns>
    </div>
</template>

<style lang="scss" scoped>
.menu-oa {
}
</style>
