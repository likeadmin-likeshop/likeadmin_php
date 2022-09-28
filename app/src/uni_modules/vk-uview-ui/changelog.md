## 1.3.12（2022-08-30）
* 【优化】`u-keyboard` 组件内部细节。
## 1.3.11（2022-08-30）
* 【修复】`u-subsection` 组件的 `list` 属性不支持动态修改的问题。
## 1.3.10（2022-07-30）
* 【优化】上传组件部分细节
## 1.3.9（2022-07-07）
* 【更新】省市区数据源
* 【优化】`u-subsection` 组件支持在右上角显示数字角标 
```html
<template>
	<u-subsection :list="list"></u-subsection>
</template>
```

```js
export default {
	data() {
		return {
			list: [
				{
					name: '待发货',
					num: 10
				}, 
				{
					name: '待付款',
					num: 5
				}, 
				{
					name: '待评价',
					num: 15
				}
			]
		}
	}
}
```
## 1.3.8（2022-06-13）
* 【优化】组件 `u-icon`，使之更方便的兼容第三方icon（满足规则自动计算customPrefix）
**规则如下：**
* 当 `name` 中包含 `-icon-` 字符串时
* 如 `vk-icon-goods`，则组件的 `customPrefix` 属性自动识别为 `vk-icon` ，`name`属性 自动识别为 `goods`
* 如 `vk-2-icon-goods-list`，则组件的 `customPrefix` 属性自动识别为 `vk-2-icon` ，`name`属性 自动识别为 `goods-list`
## 1.3.7（2022-06-10）
* 【优化】组件 `u-action-sheet` `u-calendar` `u-dropdown-item` `u-field` `u-input` `u-keyboard` `u-modal` `u-radio-group` `u-rate` `u-search` `u-slider` `u-switch` `u-tabbar` `u-waterfall` 在 `vue3` 模式下的细节问题。
## 1.3.6（2022-06-10）
* 【优化】组件 `u-action-sheet` `u-calendar` `u-dropdown-item` `u-field` `u-input` `u-keyboard` `u-modal` `u-radio-group` `u-rate` `u-search` `u-slider` `u-switch` `u-tabbar` `u-waterfall` 在 `vue3` 模式下的细节问题。
## 1.3.5（2022-05-28）
* 【优化】组件 `u-mask` `u-popup` `u-select` `u-modal` `u-keyboard` `u-calendar` `u-action-sheet` `u-picker` 均新增 `blur` 属性，可用于设置弹出遮罩的模糊度，默认为0（不模糊）
* ![](https://vkceyugu.cdn.bspapp.com/VKCEYUGU-cf0c5e69-620c-4f3c-84ab-f4619262939f/49b773a3-273f-4b1c-95e8-a42dcba1a53c.png)
## 1.3.4（2022-05-03）
* 【修复】`u-tabs` 组件细节问题。
## 1.1.4（2022-03-22）
* 【修复】`u-field` 组件 `arrowDirection` 属性无效的问题。
## 1.1.3（2022-03-21）
* 【优化】部分细节。
## 1.1.2（2022-03-21）
* 【优化】部分细节。
## 1.1.1（2022-03-17）
* 【优化】部分细节。
## 1.1.0（2022-03-12）
* 【重要】`u-picker` 组件新增 `regionDiscern` 方法 智能识别省市区街道地址
如将字符串 `浙江省杭州市西湖区希望路1333弄是啊我庭12号楼1203` 中识别为
```json
{
	"province": {
		"code": "330000",
		"name": "浙江省"
	},
	"city": {
		"code": "330100",
		"name": "杭州市"
	},
	"area": {
		"code": "330106",
		"name": "西湖区"
	},
	"address": "龙井路1号",
	"formatted_address": "浙江省杭州市西湖区龙井路1号"
}
```
而组件的 `addressDiscern` 方法还可以识别收货信息，如 `张三 13888888888 上海市嘉定区希望路1333弄是啊我庭12号楼1203` 中识别姓名、手机号、地址（支持多种格式）
## 1.0.13（2022-03-12）
* 【优化】部分细节。
## 1.0.12（2022-03-09）
* 【修复】`u-radio-group` 在 vue3 模式下，设置默认值可能会无效的问题。
## 1.0.11（2022-03-07）
* 【优化】部分细节。
## 1.0.10（2022-03-05）
* 【修复】`u-radio` 中的值相等的判断 == 改为 === 
* 【优化】部分注释的错别字。
## 1.0.9（2022-03-03）
* 【修复】`u-parse` 在 vue3模式下编译到app无法正常显示的问题。
## 1.0.8（2022-02-26）
* 【优化】`u-form` 组件新增2个属性 `inputAlign` 和 `clearable` 用于统一设置表单内所有 `u-input` 组件的对应属性默认值
* 【优化】更新城市数据源信息
## 1.0.7（2022-02-25）
* 【重要】`u-picker` 组件新增 `addressDiscern` 方法 智能识别收货信息

如在 `张三 13888888888 上海市嘉定区希望路1333弄是啊我庭12号楼1203` 中识别姓名、手机号、地址（支持多种格式）
即使这样的字符串也能识别 `!!!!~~~$张三~~~上海市嘉定区希望路1333弄是啊我庭12号楼1203【【【【13888888888】`
## 1.0.6（2022-02-24）
* 【优化】`u-form-item` 组件的 `prop` 属性支持 a.b 形式
## 1.0.5（2022-01-11）
* 【修复】`u-sticky` 组件 在微信小程序中无法正常吸顶的问题
## 1.0.4（2021-12-31）
* 【优化】`u-dropdown-item` 组件 0和"" 无法区分的问题。
* 【修复】`u-modal` 在Vue3版本中使用了mask-close-able属性无效的问题
## 1.0.3（2021-12-20）
【优化】u-icon在微信小程序下可能会显示null字符串的问题
## 1.0.2（2021-12-09）
* 1、【优化】`u-button` 组件新增 `timerId` 属性
* 之前的效果是：所有按钮一定时间内只能点击1次（`共用计算时间`）导致点击按钮A后无法马上点击按钮B
* 优化的效果是：每个按钮一定时间内只能点击1次（`分开计算时间`）且支持设置相同的 timerId 来达到指定按钮 `共用计算时间`
## 1.0.1（2021-11-22）
* 修复 u-parse 组件在微信小程序上的显示问题。
## 1.0.0（2021-11-18）
uView Vue3.0 横空出世，继承uView1.0意志，再战江湖，风云再起！by vk 2021-11-18
