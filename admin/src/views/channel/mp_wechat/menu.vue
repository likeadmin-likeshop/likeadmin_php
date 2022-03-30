<template>
    <!-- Header Alert Start -->
    <el-card shadow="never">
        <el-alert
            title="温馨提示：点击保存并发布菜单后，菜单才会发布至微信公众号，需提前设置好公众号相关配置。"
            type="primary"
            :closable="false"
            show-icon
        />
    </el-card>
    <!-- Header Alert End -->

    <div class="flex m-t-16">
        <!-- Phone Start -->
        <el-card shadow="never">
            <div class="mp_wechat__phone">
                <div class="mp_wechat__phone-menu mp_wechat__phone-active">
                    <div
                        class="mp_wechat__phone-menu-item"
                        v-for="(item, index) in formData.menu"
                        :key="index"
                    >
                        <div class="mp_wechat__phone-menu-item--title">
                            <span>{{ item.name }}</span>
                        </div>
                        <div class="mp_wechat__phone-submenu" v-show="item.has_menu">
                            <div
                                class="mp_wechat__phone-submenu-item"
                                v-for="(item2, index2) in item.sub_button"
                                :key="index2"
                            >{{ item2.name }}</div>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
        <!-- Phone End -->

        <!-- Menu Config Start -->
        <el-card shadow="never" class="m-l-16 mp_wechat__form">
            <div class="mp_wechat__form--title">菜单配置</div>
            <div class="m-t-16">
                <el-button type="primary" plain size="small" @click="onMenuAdd">
                    <i class="el-icon-plus"></i>
                    <span>新增主菜单（{{ formData.menu.length || 0 }}/3）</span>
                </el-button>
            </div>
            <div class="mp_wechat__form--content m-t-24">
                <div class="menu-item" v-for="(item, index) in formData.menu" :key="index">
                    <!-- 删除菜单 -->
                    <div class="menu-item__delete">
                        <popup class="m-l-10 inline" top="35vh" @confirm="handleMenuDel(index)">
                            <template #trigger>
                                <el-icon size="16">
                                    <close />
                                </el-icon>
                            </template>
                        </popup>
                    </div>

                    <el-form
                        ref="formRef"
                        :model="formData.menu[index]"
                        :rules="rules"
                        label-position="top"
                        size="small"
                    >
                        <!-- 主菜单名称 -->
                        <el-form-item label="主菜单" prop="name">
                            <el-input
                                class="ls-input"
                                v-model="formData.menu[index].name"
                                show-word-limit
                            />
                        </el-form-item>
                        <!-- 主菜单类型 -->
                        <el-form-item label="主菜单类型">
                            <el-radio-group v-model="formData.menu[index].has_menu">
                                <el-radio :label="false">不配置子菜单</el-radio>
                                <el-radio :label="true">配置子菜单</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <!-- 没有子菜单 -->
                        <div v-if="!formData.menu[index].has_menu">
                            <MPWechatMenuForm
                                mode="index"
                                v-model:url="formData.menu[index].url"
                                v-model:appid="formData.menu[index].appid"
                                v-model:type="formData.menu[index].type"
                                v-model:pagepath="formData.menu[index].pagepath"
                            />
                        </div>

                        <!-- 存在子菜单 -->
                        <div v-if="formData.menu[index].has_menu">
                            <ul>
                                <li
                                    class="flex"
                                    v-for="(subItem, subIndex) in formData.menu[index].sub_button"
                                    :key="subIndex"
                                    style="padding: 8px;"
                                >
                                    <span style="margin-right: auto">{{ subItem.name }}</span>
                                    <!-- 编辑子菜单 -->
                                    <popup
                                        top="40vh"
                                        title="子菜单"
                                        :async="true"
                                        :clickModalClose="false"
                                        @close="handleSubMenuReset"
                                        @confirm="onSubMenuEdit(index, subIndex)"
                                        :ref="(el: Event | any) => subMenuFormEditPopupRef = el"
                                    >
                                        <MPWechatMenuForm
                                            :name="subItem.name"
                                            :url="subItem.url"
                                            :appid="subItem.appid"
                                            :type="subItem.type"
                                            :pagepath="subItem.pagepath"
                                            :ref="(el: Event | any) => subMenuFormEditRef = el"
                                        />
                                        <template #trigger>
                                            <el-icon size="16">
                                                <Edit />
                                            </el-icon>
                                        </template>
                                    </popup>
                                    <!-- 删除子菜单 -->
                                    <popup
                                        class="m-l-10 inline"
                                        top="35vh"
                                        @confirm="handleSubMenuDel(index, subIndex)"
                                    >
                                        <template #trigger>
                                            <el-icon size="16">
                                                <close />
                                            </el-icon>
                                        </template>
                                    </popup>
                                </li>
                            </ul>
                            <popup
                                top="40vh"
                                :async="true"
                                :clickModalClose="false"
                                title="新增子菜单"
                                :ref="(el: Event | any) => subMenuFormAddPopupRef = el"
                                @confirm="handleSubMenuAdd(index)"
                            >
                                <MPWechatMenuForm
                                    :ref="(el: Event | any) => subMenuFormAddRef = el"
                                />
                                <template #trigger>
                                    <el-button
                                        type="text"
                                        size="small"
                                    >添加子菜单（{{ formData.menu[index].sub_button.length || 0 }}/5）</el-button>
                                </template>
                            </popup>
                        </div>
                    </el-form>
                </div>
            </div>
        </el-card>
        <!-- Menu Config Start -->
    </div>

    <!-- Footer Start -->
    <footer-btns>
        <el-button size="small" @click="onFromSave">保存</el-button>
        <el-button type="primary" size="small" @click="onFromPublish">保存并发布</el-button>
    </footer-btns>
    <!-- Footer End -->
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { apiMpWeChatMenuDetail, apiMpWeChatMenuSave, apiMpWeChatMenuPublish } from '@/api/channel/mp_wechat'
import { MPWeChatMenu } from '@/api/channel/mp_wechat.d.ts'
import Popup from '@/components/popup/index.vue'
import FooterBtns from '@/components/footer-btns/index.vue'
import { ElMessage } from "element-plus";
import MPWechatMenuForm from './components/menu-form.vue'
import { deepClone } from '@/utils/util'

/** Interface Start **/
interface MenuFrom {
    menu: Array<MPWeChatMenu>
}
/** Interface Start **/

/** Data Start **/
// 子菜单添加的Ref
const subMenuFormAddRef = ref<InstanceType<typeof MPWechatMenuForm> | null>(null)
// 子菜单添加的弹出窗口
const subMenuFormAddPopupRef = ref<InstanceType<typeof Popup> | null>(null)
// 子菜单编辑的Ref
const subMenuFormEditRef = ref<InstanceType<typeof MPWechatMenuForm> | null>(null)
// 子菜单编辑的弹出窗口
const subMenuFormEditPopupRef = ref<InstanceType<typeof Popup> | null>(null)
// 菜单数据
const formData = ref<MenuFrom>({
    menu: []
})
// 校验
const rules = reactive<object>({
    name: [
        { required: true, message: '必填项不能为空', trigger: ['blur', 'change'] },
        { min: 1, max: 12, message: '长度限制12个字符', trigger: ['blur', 'change'] }
    ],
})
/** Data End **/


/** Methods Start **/
// 添加主菜单
const onMenuAdd = () => {
    if (formData.value.menu.length >= 3)
        return ElMessage.info('主菜单仅限有3项!')
    formData.value.menu.push({
        name: '',
        type: '',
        has_menu: false,
        key: '', // 关键字
        url: '', // 网页URL
        appid: '', // 小程序AppID
        pagepath: '', // 小程序路径
        sub_button: [] as Array<object>, // 二级菜单
    })
}

// 添加子菜单
const handleSubMenuAdd = async (index: number): Promise<void> => {
    await subMenuFormAddRef.value?.menuFormRef.validate()

    formData.value.menu[index].sub_button.push({ ...deepClone(subMenuFormAddRef.value?.menuFormRef.model) })
    ElMessage.success('添加成功')

    subMenuFormAddPopupRef.value?.close()
    subMenuFormAddRef.value?.menuFormRef.resetFields()
}

// 子菜单编辑
const onSubMenuEdit = async (index: number, subIndex: number): Promise<void> => {
    await subMenuFormEditRef.value?.menuFormRef.validate()

    formData.value.menu[index].sub_button[subIndex] = { ...deepClone(subMenuFormEditRef.value?.menuFormRef.model) }
    ElMessage.success('修改成功')

    subMenuFormEditRef.value?.menuFormRef.resetFields()
    subMenuFormEditPopupRef.value?.close()
}

// 取消编辑恢复数据
const handleSubMenuReset = (): void => {
    subMenuFormEditRef.value?.menuFormRef.resetFields()
}

// 删除菜单
const handleMenuDel = (index: number): void => {
    formData.value?.menu.splice(index, 1)
}

// 删除子菜单
const handleSubMenuDel = (index: number, subIndex: number): void => {
    const menu: MPWeChatMenu = formData.value.menu[index]
    menu.sub_button.splice(subIndex, 1)
}

// 初始化菜单数据
const initMPWeChatMenuData = async (): Promise<void> => {
    formData.value.menu = await apiMpWeChatMenuDetail()
}

// 表单保存
const onFromSave = async (): Promise<void> => {
    await apiMpWeChatMenuSave({ ...formData.value })
    initMPWeChatMenuData()
}

// 保存并发布
const onFromPublish = async (): Promise<void> => {
    await apiMpWeChatMenuPublish({ ...formData.value })
    initMPWeChatMenuData()
}
/** Methods End **/

/** Life Cycle Start **/
initMPWeChatMenuData()
/** Life Cycle End **/
</script>


<style lang="scss" scoped>
.mp_wechat__phone {
    position: relative;
    width: 312.5px;
    height: 676.67px;
    background: url("../../../assets/images/mobile.png") no-repeat;
    background-size: 100% 100%;

    &-menu {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 40px;
        display: flex;
        height: 60px;
        margin: 0 16px;
        border-top: 1px solid #e4e4e4;
        background-color: rgb(247, 247, 247);

        &-item {
            flex: 1;
            position: relative;
            display: flex;
            justify-content: center;
            align-items: center;

            &:nth-child(n + 2)::before {
                position: absolute;
                left: 0;
                height: 50%;
                display: block;
                content: "";
                border-left: 1px solid #e4e4e4;
            }

            &--title {
                font-weight: 500;
            }
        }

        .mp_wechat__phone-submenu {
            position: absolute;
            z-index: 99;
            bottom: calc(100% + 10px);
            min-width: 100px;
            background-color: rgb(247, 247, 247);
            box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.3);

            &-item {
                padding: 16px 4px;
            }

            &-item:nth-child(n + 2) {
                border-top: 1px solid #e4e4e4;
            }
        }
    }

    &-active {
        border: 2px dashed $color-primary;
    }
}

.mp_wechat__form {
    width: 100%;
    height: 100%;
    flex: 1;

    &--title {
        font-size: 14px;
        font-weight: 500;
    }

    &--content {
        display: flex;
        flex-wrap: wrap;

        .menu-item {
            position: relative;
            box-sizing: border-box;
            width: 340px;
            padding: 24px;
            border-radius: 8px;
            margin-right: 16px;
            margin-bottom: 16px;
            background-color: #efefef;
            overflow: hidden;

            &__delete {
                position: absolute;
                top: 14px;
                right: 20px;
                color: $color-primary;
                cursor: pointer;
            }
        }
    }
}
</style>