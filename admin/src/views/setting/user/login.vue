<!-- 用户设置 -->
<template>
	<div class="login-register">
		<el-form ref="formRef" :model="formData" label-width="160px">
			<!-- 通用设置 Start -->
			<el-card shadow="never" class="m-t-15">
				<template #header>
					<span>通用设置</span>
				</template>
				<el-form-item label="注册方式" required>
					<el-checkbox-group v-model="formData.register_way">
						<el-checkbox :label="1">手机号码注册</el-checkbox>
					</el-checkbox-group>
					<div class="muted xs">系统通用的注册用户方式，至少勾选一项，微信等渠道有其他授权注册方式，请合理设置</div>
				</el-form-item>
				<el-form-item label="手机号码注册需验证码" required>
					<!-- switch开关 -->
					<div class="flex col-center">
						<el-switch v-model="formData.is_mobile_register_code" :active-value="1" :inactive-value="0" />
						<span class="m-l-16">{{ formData.is_mobile_register_code ? '开启' : '关闭' }}</span>
					</div>
					<div class="muted xs">1、用户通过手机号码注册帐号时，是否需要短信验证码验证填写的手机号码，默认关闭</div>
					<div class="muted xs">2、请开启对应短信验证码功能</div>
				</el-form-item>
				<el-form-item label="强制绑定手机">
					<!-- switch开关 -->
					<div class="flex col-center">
						<el-switch v-model="formData.coerce_mobile" :active-value="1" :inactive-value="0" />
						<span class="m-l-16">{{ formData.coerce_mobile ? '开启' : '关闭' }}</span>
					</div>
					<div class="muted xs">用户无论通过何种方式注册用户时，是否需要强制绑定手机。绑定手机需要短信验证，请开启对应短信验证码功能</div>
				</el-form-item>
				<el-form-item label="登录方式" required>
					<!-- 多选框 -->
					<el-checkbox-group v-model="formData.login_way">
						<el-checkbox :label="1">手机号密码登录</el-checkbox>
						<el-checkbox :label="2">手机号验证码登录</el-checkbox>
					</el-checkbox-group>
					<div class="muted xs">
						系统通用的登录方式，至少勾选一项，需要和通用注册方式匹配。
						微信等渠道有其他授权注册方式，请合理设置
					</div>
				</el-form-item>
			</el-card>
			<!-- 通用设置 End  -->

			<!-- 微信公众号 Start -->
			<el-card shadow="never" class="m-t-15">
				<template #header>
					<span>微信公众号</span>
				</template>
				<el-form-item label="微信公众号">
					<a class="muted xs item-a" href="https://open.weixin.qq.com/">前往微信开放平台</a>
					<div class="muted xs">1、商城在各渠道使用微信授权登录时，强烈建议配置微信开放平台</div>
					<div class="muted xs">2、微信开放平台关联公众号、小程序和APP后，可实现各端用户账号统一，识别买家唯一微信身份</div>
					<div class="muted xs">3、没有配置微信开放平台，同一微信号会生成多个用户，配置微信开放平台后已生成的用户账号无法合并</div>
				</el-form-item>
			</el-card>
			<!-- 微信公众号 End  -->

			<!-- 微信开放平台 Start -->
			<el-card shadow="never" class="m-t-15">
				<template #header>
					<span>微信开放平台</span>
				</template>

				<el-form-item label="微信授权登录">
					<!-- switch开关 -->
					<div class="flex col-center">
						<el-switch v-model="formData.h5_wechat_auth" :active-value="1" :inactive-value="0" />
						<span class="m-l-16">{{ formData.h5_wechat_auth ? '开启' : '关闭' }}</span>
					</div>
					<div class="muted xs">微信公众号是否支持微信授权登录方式。关闭时，使用注册设置里面的配置方法完成用户注册和登录</div>
				</el-form-item>
				<el-form-item label="自动微信授权登录">
					<div class="flex col-center">
						<el-switch v-model="formData.h5_auto_wechat_auth" :active-value="1" :inactive-value="0" />
						<span class="m-l-16">{{ formData.h5_auto_wechat_auth ? '开启' : '关闭' }}</span>
					</div>
					<div class="muted xs">微信授权登录开启后，可以勾选是否需要自动授权登录，默认开启。</div>
				</el-form-item>
			</el-card>
			<!-- 微信开放平台 End  -->

			<!-- 微信小程序 Start -->
			<el-card shadow="never" class="m-t-15">
				<template #header>
					<span>微信小程序</span>
				</template>

				<el-form-item label="微信授权登录">
					<!-- switch开关 -->
					<div class="flex col-center">
						<el-switch v-model="formData.mnp_wechat_auth" :active-value="1" :inactive-value="0" />
						<span class="m-l-16">{{ formData.mnp_wechat_auth ? '开启' : '关闭' }}</span>
					</div>
					<div class="muted xs">微信小程序是否支持微信授权登录方式。关闭时，使用注册设置里面的配置方法完成用户注册和登录</div>
				</el-form-item>
				<el-form-item label="自动微信授权登录">
					<div class="flex col-center">
						<el-switch v-model="formData.mnp_auto_wechat_auth" :active-value="1" :inactive-value="0" />
						<span class="m-l-16">
							{{
								formData.mnp_auto_wechat_auth ? '开启' : '关闭'
							}}
						</span>
					</div>
					<div class="muted xs">微信授权登录开启后，可以勾选是否需要自动授权登录，默认开启</div>
				</el-form-item>
			</el-card>
			<!-- 微信小程序 End  -->

			<!-- H5 Start -->
			<el-card shadow="never" class="m-t-15">
				<template #header>
					<span>H5</span>
				</template>
				<el-form-item label>
					<div class="muted xs">用户访问H5商城时，使用注册设置里面的配置方法完成用户注册和登录</div>
				</el-form-item>
			</el-card>
			<!-- H5 End  -->

			<!-- APP设置 Start -->
			<el-card shadow="never" class="m-t-15">
				<template #header>
					<span>APP设置</span>
				</template>

				<el-form-item label="微信授权登录">
					<div class="flex col-center">
						<el-switch v-model="formData.app_wechat_auth" :active-value="1" :inactive-value="0" />
						<span class="m-l-16">{{ formData.app_wechat_auth ? '开启' : '关闭' }}</span>
					</div>
					<div class="muted xs">APP是否支持微信授权登录方式。关闭时，使用注册设置里面的配置方法完成用户注册和登录</div>
				</el-form-item>
			</el-card>
			<!-- APP设置 End  -->
		</el-form>

		<!-- Footer Start -->
		<footer-btns>
			<el-button type="primary" @click="onSubmit">保存</el-button>
		</footer-btns>
		<!-- Footer End -->
	</div>
</template>

<script lang="ts" setup>
import {
	reactive,
	ref
} from 'vue'
import {
	apiLoginConfigGet,
	apiLoginConfigSet
} from '@/api/setting'
import FooterBtns from '@/components/footer-btns/index.vue'

/** Data Start **/
const formData = ref<any>({
	register_way: [], // 注册方式：1-手机号码注册（注册设置必传）
	login_way: [], //登录方式：1-账号密码登录；2-手机短信验证码登录
	is_mobile_register_code: 0, // 手机号码注册需验证码：0-关闭；1-开启
	coerce_mobile: 0, // 手机号码注册需验证码：0-关闭；1-开启
	h5_wechat_auth: 0, // 微信公众号-微信授权登录：0-关闭；1-开启
	h5_auto_wechat_auth: 1, // 微信公众号-自动微信授权登录:0-关闭；1-开启;
	mnp_wechat_auth: 0, // 小程序-微信授权登录 :0-关闭；1-开启;
	mnp_auto_wechat_auth: 1, // 小程序-自动微信授权登录:0-关闭；1-开启;
	app_wechat_auth: 0, // app-微信授权登录:0-关闭；1-开启;
	scene: '', // 场景：user-用户设置；register-注册设置；withdraw-提现设置
	toutiao_auth: 0,
	toutiao_auto_auth: 0,
})
/** Data End **/

/** Methods Start **/
// 获取登录注册设置
const getLoginConfig = async (): Promise<void> => {
	formData.value = await apiLoginConfigGet()
	if (!formData.value.register_way) {
		formData.value.register_way = []
	}
	if (!formData.value.login_way) {
		formData.value.login_way = []
	}
}
// 编辑登录注册设置
const handleLoginConfigEdit = async (): Promise<void> => {
	await apiLoginConfigSet({
		...formData.value
	})
	getLoginConfig()
}
// 提交数据
const onSubmit = () => {
	handleLoginConfigEdit()
}
/** Methods End **/

/** LifeCycle Start **/
getLoginConfig()
	/** LifeCycle End **/
</script>

<style lang="scss" scoped>
.login-register {
	.item-a {
		color: #1684fc;
		text-decoration: underline;
	}
}
</style>
