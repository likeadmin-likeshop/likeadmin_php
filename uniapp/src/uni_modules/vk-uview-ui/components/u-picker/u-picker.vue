<!-- 选择器 -->
<template>
	<u-popup
		:maskCloseAble="maskCloseAble"
		mode="bottom"
		:popup="false"
		v-model="popupValue"
		length="auto"
		:safeAreaInsetBottom="safeAreaInsetBottom"
		@close="close"
		:z-index="uZIndex"
		:blur="blur"
	>
		<view class="u-datetime-picker">
			<view class="u-picker-header" @touchmove.stop.prevent="">
				<view
					class="u-btn-picker u-btn-picker--tips"
					:style="{ color: cancelColor }"
					hover-class="u-opacity"
					:hover-stay-time="150"
					@click="getResult('cancel')"
				>
					{{ cancelText }}
				</view>
				<view class="u-picker__title">{{ title }}</view>
				<view
					class="u-btn-picker u-btn-picker--primary"
					:style="{ color: moving ? cancelColor : confirmColor }"
					hover-class="u-opacity"
					:hover-stay-time="150"
					@touchmove.stop=""
					@click.stop="getResult('confirm')"
				>
					{{ confirmText }}
				</view>
			</view>
			<view class="u-picker-body">
				<picker-view
					v-if="mode == 'region'"
					:value="valueArr"
					@change="change"
					class="u-picker-view"
					@pickstart="pickstart"
					@pickend="pickend"
				>
					<picker-view-column v-if="!reset && params.province">
						<view class="u-column-item" v-for="(item, index) in provinces" :key="index">
							<view class="u-line-1">{{ item.name }}</view>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.city">
						<view class="u-column-item" v-for="(item, index) in citys" :key="index">
							<view class="u-line-1">{{ item.name }}</view>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.area">
						<view class="u-column-item" v-for="(item, index) in areas" :key="index">
							<view class="u-line-1">{{ item.name }}</view>
						</view>
					</picker-view-column>
				</picker-view>
				<picker-view
					v-else-if="mode == 'time'"
					:value="valueArr"
					@change="change"
					class="u-picker-view"
					@pickstart="pickstart"
					@pickend="pickend"
				>
					<picker-view-column v-if="!reset && params.year">
						<view class="u-column-item" v-for="(item, index) in years" :key="index">
							{{ item }}
							<text class="u-text" v-if="showTimeTag">年</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.month">
						<view class="u-column-item" v-for="(item, index) in months" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">月</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.day">
						<view class="u-column-item" v-for="(item, index) in days" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">日</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.hour">
						<view class="u-column-item" v-for="(item, index) in hours" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">时</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.minute">
						<view class="u-column-item" v-for="(item, index) in minutes" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">分</text>
						</view>
					</picker-view-column>
					<picker-view-column v-if="!reset && params.second">
						<view class="u-column-item" v-for="(item, index) in seconds" :key="index">
							{{ formatNumber(item) }}
							<text class="u-text" v-if="showTimeTag">秒</text>
						</view>
					</picker-view-column>
				</picker-view>
				<picker-view
					v-else-if="mode == 'selector'"
					:value="valueArr"
					@change="change"
					class="u-picker-view"
					@pickstart="pickstart"
					@pickend="pickend"
				>
					<picker-view-column v-if="!reset">
						<view class="u-column-item" v-for="(item, index) in range" :key="index">
							<view class="u-line-1">{{ getItemValue(item, "selector") }}</view>
						</view>
					</picker-view-column>
				</picker-view>
				<picker-view
					v-else-if="mode == 'multiSelector'"
					:value="valueArr"
					@change="change"
					class="u-picker-view"
					@pickstart="pickstart"
					@pickend="pickend"
				>
					<picker-view-column v-if="!reset" v-for="(item, index) in range" :key="index">
						<view class="u-column-item" v-for="(item1, index1) in item" :key="index1">
							<view class="u-line-1">{{ getItemValue(item1, "multiSelector") }}</view>
						</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
	</u-popup>
</template>

<script>
import provinces from "../../libs/address/provinces.json";
import citys from "../../libs/address/citys.json";
import areas from "../../libs/address/areas.json";
/**
 * picker picker弹出选择器
 * @description 此选择器有两种弹出模式：一是时间模式，可以配置年，日，月，时，分，秒参数 二是地区模式，可以配置省，市，区参数
 * @tutorial https://www.uviewui.com/components/picker.html
 * @property {Object} params 需要显示的参数，见官网说明
 * @property {String} mode 模式选择，region-地区类型，time-时间类型（默认time）
 * @property {String Number} start-year 可选的开始年份，mode=time时有效（默认1950）
 * @property {String Number} end-year 可选的结束年份，mode=time时有效（默认2050）
 * @property {Boolean} safe-area-inset-bottom 是否开启底部安全区适配（默认false）
 * @property {Boolean} show-time-tag 时间模式时，是否显示后面的年月日中文提示
 * @property {String} cancel-color 取消按钮的颜色（默认#606266）
 * @property {String} confirm-color 确认按钮的颜色（默认#2979ff）
 * @property {String} default-time 默认选中的时间，mode=time时有效
 * @property {String} confirm-text 确认按钮的文字
 * @property {String} cancel-text 取消按钮的文字
 * @property {String} default-region 默认选中的地区，中文形式，mode=region时有效
 * @property {String} default-code 默认选中的地区，编号形式，mode=region时有效
 * @property {Boolean} mask-close-able 是否允许通过点击遮罩关闭Picker（默认true）
 * @property {String Number} z-index 弹出时的z-index值（默认1075）
 * @property {Array} default-selector 数组形式，其中每一项表示选择了range对应项中的第几个
 * @property {Array} range 自定义选择的数据，mode=selector或mode=multiSelector时有效
 * @property {String} range-key 当range参数的元素为对象时，指定Object中的哪个key的值作为选择器显示内容
 * @event {Function} confirm 点击确定按钮，返回当前选择的值
 * @event {Function} cancel 点击取消按钮，返回当前选择的值
 * @example <u-picker v-model="show" mode="time"></u-picker>
 */
export default {
	name: "u-picker",
	emits: ["update:modelValue", "input", "confirm", "cancel"],
	props: {
		// 通过双向绑定控制组件的弹出与收起
		value: {
			type: Boolean,
			default: false
		},
		modelValue: {
			type: Boolean,
			default: false
		},
		// picker中需要显示的参数
		params: {
			type: Object,
			default() {
				return {
					year: true,
					month: true,
					day: true,
					hour: false,
					minute: false,
					second: false,
					province: true,
					city: true,
					area: true,
					timestamp: true
				};
			}
		},
		// 当mode=selector或者mode=multiSelector时，提供的数组
		range: {
			type: Array,
			default() {
				return [];
			}
		},
		// 当mode=selector或者mode=multiSelector时，提供的默认选中的下标
		defaultSelector: {
			type: Array,
			default() {
				return [0];
			}
		},
		// 当 range 是一个 Array＜Object＞ 时，通过 range-key 来指定 Object 中 key 的值作为选择器显示内容
		rangeKey: {
			type: String,
			default: ""
		},
		// 模式选择，region-地区类型，time-时间类型，selector-单列模式，multiSelector-多列模式
		mode: {
			type: String,
			default: "time"
		},
		// 年份开始时间
		startYear: {
			type: [String, Number],
			default: 1950
		},
		// 年份结束时间
		endYear: {
			type: [String, Number],
			default: 2050
		},
		// "取消"按钮的颜色
		cancelColor: {
			type: String,
			default: "#606266"
		},
		// "确定"按钮的颜色
		confirmColor: {
			type: String,
			default: "#2979ff"
		},
		// 默认显示的时间，2025-07-02 || 2025-07-02 13:01:00 || 2025/07/02
		defaultTime: {
			type: String,
			default: ""
		},
		// 默认显示的地区，可传类似["河北省", "秦皇岛市", "北戴河区"]
		defaultRegion: {
			type: Array,
			default() {
				return [];
			}
		},
		// 时间模式时，是否显示后面的年月日中文提示
		showTimeTag: {
			type: Boolean,
			default: true
		},
		// 默认显示地区的编码，defaultRegion和areaCode同时存在，areaCode优先，可传类似["13", "1303", "130304"]
		areaCode: {
			type: Array,
			default() {
				return [];
			}
		},
		safeAreaInsetBottom: {
			type: Boolean,
			default: false
		},
		// 是否允许通过点击遮罩关闭Picker
		maskCloseAble: {
			type: Boolean,
			default: true
		},
		// 弹出的z-index值
		zIndex: {
			type: [String, Number],
			default: 0
		},
		// 顶部标题
		title: {
			type: String,
			default: ""
		},
		// 取消按钮的文字
		cancelText: {
			type: String,
			default: "取消"
		},
		// 确认按钮的文字
		confirmText: {
			type: String,
			default: "确认"
		},
		// 遮罩的模糊度
		blur: {
			type: [String, Number],
			default: 0
		}
	},
	data() {
		return {
			popupValue: false,
			years: [],
			months: [],
			days: [],
			hours: [],
			minutes: [],
			seconds: [],
			year: 0,
			month: 0,
			day: 0,
			hour: 0,
			minute: 0,
			second: 0,
			reset: false,
			startDate: "",
			endDate: "",
			valueArr: [],
			provinces: provinces,
			citys: citys[0],
			areas: areas[0][0],
			province: 0,
			city: 0,
			area: 0,
			moving: false // 列是否还在滑动中，微信小程序如果在滑动中就点确定，结果可能不准确
		};
	},
	mounted() {
		this.init();
	},
	computed: {
		valueCom() {
			// #ifndef VUE3
			return this.value;
			// #endif

			// #ifdef VUE3
			return this.modelValue;
			// #endif
		},
		propsChange() {
			// 引用这几个变量，是为了监听其变化
			return `${this.mode}-${this.defaultTime}-${this.startYear}-${this.endYear}-${
				this.defaultRegion
			}-${this.areaCode}`;
		},
		regionChange() {
			// 引用这几个变量，是为了监听其变化
			return `${this.province}-${this.city}`;
		},
		yearAndMonth() {
			return `${this.year}-${this.month}`;
		},
		uZIndex() {
			// 如果用户有传递z-index值，优先使用
			return this.zIndex ? this.zIndex : this.$u.zIndex.popup;
		}
	},
	watch: {
		propsChange() {
			this.reset = true;
			setTimeout(() => this.init(), 10);
		},
		// 如果地区发生变化，为了让picker联动起来，必须重置this.citys和this.areas
		regionChange(val) {
			this.citys = citys[this.province];
			this.areas = areas[this.province][this.city];
		},
		// watch监听月份的变化，实时变更日的天数，因为不同月份，天数不一样
		// 一个月可能有30，31天，甚至闰年2月的29天，平年2月28天
		yearAndMonth(val) {
			if (this.params.year) this.setDays();
		},
		// 微信和QQ小程序由于一些奇怪的原因(故同时对所有平台均初始化一遍)，需要重新初始化才能显示正确的值
		valueCom(n) {
			if (n) {
				this.reset = true;
				setTimeout(() => this.init(), 10);
			}
			this.popupValue = n;
		}
	},
	methods: {
		// 标识滑动开始，只有微信小程序才有这样的事件
		pickstart() {
			// #ifdef MP-WEIXIN
			this.moving = true;
			// #endif
		},
		// 标识滑动结束
		pickend() {
			// #ifdef MP-WEIXIN
			this.moving = false;
			// #endif
		},
		// 对单列和多列形式的判断是否有传入变量的情况
		getItemValue(item, mode) {
			// 目前(2020-05-25)uni-app对微信小程序编译有错误，导致v-if为false中的内容也执行，错误导致
			// 单列模式或者多列模式中的getItemValue同时被执行，故在这里再加一层判断
			if (this.mode == mode) {
				return typeof item == "object" ? item[this.rangeKey] : item;
			}
		},
		// 小于10前面补0，用于月份，日期，时分秒等
		formatNumber(num) {
			return +num < 10 ? "0" + num : String(num);
		},
		// 生成递进的数组
		generateArray: function(start, end) {
			// 转为数值格式，否则用户给end-year等传递字符串值时，下面的end+1会导致字符串拼接，而不是相加
			start = Number(start);
			end = Number(end);
			end = end > start ? end : start;
			// 生成数组，获取其中的索引，并剪出来
			return [...Array(end + 1).keys()].slice(start);
		},
		getIndex: function(arr, val) {
			let index = arr.indexOf(val);
			// 如果index为-1(即找不到index值)，~(-1)=-(-1)-1=0，导致条件不成立
			return ~index ? index : 0;
		},
		//日期时间处理
		initTimeValue() {
			// 格式化时间，在IE浏览器(uni不存在此情况)，无法识别日期间的"-"间隔符号
			let fdate = this.defaultTime.replace(/\-/g, "/");
			fdate = fdate && fdate.indexOf("/") == -1 ? `2020/01/01 ${fdate}` : fdate;
			let time = null;
			if (fdate) time = new Date(fdate);
			else time = new Date();
			// 获取年日月时分秒
			this.year = time.getFullYear();
			this.month = Number(time.getMonth()) + 1;
			this.day = time.getDate();
			this.hour = time.getHours();
			this.minute = time.getMinutes();
			this.second = time.getSeconds();
		},
		init() {
			this.valueArr = [];
			this.reset = false;
			if (this.mode == "time") {
				this.initTimeValue();
				if (this.params.year) {
					this.valueArr.push(0);
					this.setYears();
				}
				if (this.params.month) {
					this.valueArr.push(0);
					this.setMonths();
				}
				if (this.params.day) {
					this.valueArr.push(0);
					this.setDays();
				}
				if (this.params.hour) {
					this.valueArr.push(0);
					this.setHours();
				}
				if (this.params.minute) {
					this.valueArr.push(0);
					this.setMinutes();
				}
				if (this.params.second) {
					this.valueArr.push(0);
					this.setSeconds();
				}
			} else if (this.mode == "region") {
				if (this.params.province) {
					this.valueArr.push(0);
					this.setProvinces();
				}
				if (this.params.city) {
					this.valueArr.push(0);
					this.setCitys();
				}
				if (this.params.area) {
					this.valueArr.push(0);
					this.setAreas();
				}
			} else if (this.mode == "selector") {
				this.valueArr = this.defaultSelector;
			} else if (this.mode == "multiSelector") {
				this.valueArr = this.defaultSelector;
				this.multiSelectorValue = this.defaultSelector;
			}
			this.$forceUpdate();
		},
		// 设置picker的某一列值
		setYears() {
			// 获取年份集合
			this.years = this.generateArray(this.startYear, this.endYear);
			// 设置this.valueArr某一项的值，是为了让picker预选中某一个值
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.years, this.year));
		},
		setMonths() {
			this.months = this.generateArray(1, 12);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.months, this.month));
		},
		setDays() {
			let totalDays = new Date(this.year, this.month, 0).getDate();
			this.days = this.generateArray(1, totalDays);
			let index = 0;
			// 这里不能使用类似setMonths()中的this.valueArr.splice(this.valueArr.length - 1, xxx)做法
			// 因为this.month和this.year变化时，会触发watch中的this.setDays()，导致this.valueArr.length计算有误
			if (this.params.year && this.params.month) index = 2;
			else if (this.params.month) index = 1;
			else if (this.params.year) index = 1;
			else index = 0;
			// 当月份变化时，会导致日期的天数也会变化，如果原来选的天数大于变化后的天数，则重置为变化后的最大值
			// 比如原来选中3月31日，调整为2月后，日期变为最大29，这时如果day值继续为31显然不合理，于是将其置为29(picker-column从1开始)
			if (this.day > this.days.length) this.day = this.days.length;
			this.valueArr.splice(index, 1, this.getIndex(this.days, this.day));
		},
		setHours() {
			this.hours = this.generateArray(0, 23);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.hours, this.hour));
		},
		setMinutes() {
			this.minutes = this.generateArray(0, 59);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.minutes, this.minute));
		},
		setSeconds() {
			this.seconds = this.generateArray(0, 59);
			this.valueArr.splice(this.valueArr.length - 1, 1, this.getIndex(this.seconds, this.second));
		},
		setProvinces() {
			// 判断是否需要province参数
			if (!this.params.province) return;
			let tmp = "";
			let useCode = false;
			// 如果同时配置了defaultRegion和areaCode，优先使用areaCode参数
			if (this.areaCode.length) {
				tmp = this.areaCode[0];
				useCode = true;
			} else if (this.defaultRegion.length) tmp = this.defaultRegion[0];
			else tmp = 0;
			// 历遍省份数组匹配
			provinces.map((v, k) => {
				if (useCode ? v.code == tmp : v.name == tmp) {
					tmp = k;
				}
			});
			this.province = tmp;
			this.provinces = provinces;
			// 设置默认省份的值
			this.valueArr.splice(0, 1, this.province);
		},
		setCitys() {
			if (!this.params.city) return;
			let tmp = "";
			let useCode = false;
			if (this.areaCode.length) {
				tmp = this.areaCode[1];
				useCode = true;
			} else if (this.defaultRegion.length) tmp = this.defaultRegion[1];
			else tmp = 0;
			citys[this.province].map((v, k) => {
				if (useCode ? v.code == tmp : v.name == tmp) {
					tmp = k;
				}
			});
			this.city = tmp;
			this.citys = citys[this.province];
			this.valueArr.splice(1, 1, this.city);
		},
		setAreas() {
			if (!this.params.area) return;
			let tmp = "";
			let useCode = false;
			if (this.areaCode.length) {
				tmp = this.areaCode[2];
				useCode = true;
			} else if (this.defaultRegion.length) tmp = this.defaultRegion[2];
			else tmp = 0;
			areas[this.province][this.city].map((v, k) => {
				if (useCode ? v.code == tmp : v.name == tmp) {
					tmp = k;
				}
			});
			this.area = tmp;
			this.areas = areas[this.province][this.city];
			this.valueArr.splice(2, 1, this.area);
		},
		close() {
			this.$emit("input", false);
			this.$emit("update:modelValue", false);
		},
		// 用户更改picker的列选项
		change(e) {
			this.valueArr = e.detail.value;
			let i = 0;
			if (this.mode == "time") {
				// 这里使用i++，是因为this.valueArr数组的长度是不确定长度的，它根据this.params的值来配置长度
				// 进入if规则，i会加1，保证了能获取准确的值
				if (this.params.year) this.year = this.years[this.valueArr[i++]];
				if (this.params.month) this.month = this.months[this.valueArr[i++]];
				if (this.params.day) this.day = this.days[this.valueArr[i++]];
				if (this.params.hour) this.hour = this.hours[this.valueArr[i++]];
				if (this.params.minute) this.minute = this.minutes[this.valueArr[i++]];
				if (this.params.second) this.second = this.seconds[this.valueArr[i++]];
			} else if (this.mode == "region") {
				if (this.params.province) this.province = this.valueArr[i++];
				if (this.params.city) this.city = this.valueArr[i++];
				if (this.params.area) this.area = this.valueArr[i++];
			} else if (this.mode == "multiSelector") {
				let index = null;
				// 对比前后两个数组，寻找变更的是哪一列，如果某一个元素不同，即可判定该列发生了变化
				this.defaultSelector.map((val, idx) => {
					if (val != e.detail.value[idx]) index = idx;
				});
				// 为了让用户对多列变化时，对动态设置其他列的变更
				if (index != null) {
					this.$emit("columnchange", {
						column: index,
						index: e.detail.value[index]
					});
				}
			}
		},
		// 用户点击确定按钮
		getResult(event = null) {
			// #ifdef MP-WEIXIN
			if (this.moving) return;
			// #endif
			let result = {};
			// 只返回用户在this.params中配置了为true的字段
			if (this.mode == "time") {
				if (this.params.year) result.year = this.formatNumber(this.year || 0);
				if (this.params.month) result.month = this.formatNumber(this.month || 0);
				if (this.params.day) result.day = this.formatNumber(this.day || 0);
				if (this.params.hour) result.hour = this.formatNumber(this.hour || 0);
				if (this.params.minute) result.minute = this.formatNumber(this.minute || 0);
				if (this.params.second) result.second = this.formatNumber(this.second || 0);
				if (this.params.timestamp) result.timestamp = this.getTimestamp();
			} else if (this.mode == "region") {
				if (this.params.province) result.province = provinces[this.province];
				if (this.params.city) result.city = citys[this.province][this.city];
				if (this.params.area) result.area = areas[this.province][this.city][this.area];
			} else if (this.mode == "selector") {
				result = this.valueArr;
			} else if (this.mode == "multiSelector") {
				result = this.valueArr;
			}
			if (event) this.$emit(event, result);
			this.close();
		},
		// 获取时间戳
		getTimestamp() {
			// yyyy-mm-dd为安卓写法，不支持iOS，需要使用"/"分隔，才能二者兼容
			let time =
				this.year +
				"/" +
				this.month +
				"/" +
				this.day +
				" " +
				this.hour +
				":" +
				this.minute +
				":" +
				this.second;
			return new Date(time).getTime() / 1000;
		},
		// 获得数据源
		getDateSource() {
			return {
				provinces,
				citys,
				areas
			};
		},
		// 智能识别省市区
		regionDiscern(addressText){
			// 街道地址
			let address = "";
			// 省
			let province = {};
			// 市
			let city = {};
			// 区
			let area = {};
			if (!addressText) return { code: -1, msg: "地址文本不能为空" };
			addressText.trim(); // 去除前后空格
			// 省
			// 1.先找出省份，通过匹配前面两个字(中国34个省份中，前面两个字不会重复)
			let firstTwoKey = addressText.substring(0, 2); //字符串开始的两个字符
			// 所在省的下标
			let provinceIndex = -1;
			
			for (let i = 0; i < provinces.length; i++) {
				let { code, name } = provinces[i];
				if (name.indexOf(firstTwoKey) == 0) {
					province = { code, name };
					provinceIndex = i;
					break;
				}
			}
			if (provinceIndex == -1) return { code: -1, msg: `省份【${firstTwoKey}】没有找到，请输入正确的地址` };
			
			// 获取市
			let citysArr = citys[provinceIndex];
			// 所在市的下标
			let cityIndex = -1;
			
			for (let i = 0; i < citysArr.length; i++) {
				let { name, code } = citysArr[i];
				// 除去最后一个 市 字
				let cityName = name.substr(0, name.length - 1);
				// 用城市的名字去匹配 addressText 地址
				if (addressText.indexOf(cityName) > -1) {
					city = { code, name };
					cityIndex = i;
					break;
				}
			}
			if (cityIndex == -1) return { code: -1, msg: `地级市没有找到，请输入正确的地址` };
			
			// 区
			let areasArr = areas[provinceIndex][cityIndex];
			// 所在区的下标
			let areaIndex = -1;
			
			for (let i = 0; i < areasArr.length; i++) {
				let { code, name } = areasArr[i];
				// 区名(县名)一般为3个字，如江干区，有可能会简写成 江干
				// 区名(县名)为2个字时，不会简写，如蓉县
				let reg = name;
				if (name.length > 2) reg += `|${name.substr(0, name.length - 1)}`;
				// 查找地址中是否存在该区名
				let areaRegExp = new RegExp(reg);
				
				if (addressText.search(areaRegExp) > -1) {
					area = { code, name };
					// 详情地址
					address = addressText.replace(new RegExp(reg), "{{~}}").split("{{~}}")[1];
					areaIndex = i;
					break;
				}
			}
			if (areaIndex == -1) return { code: -1, msg: "县级市没有找到，请输入正确的地址" };
			let formatted_address = `${province.name}${city.name}${area.name}${address}`;
			let res = {
				code: 0,
				msg: "ok",
				data: {
					province, // 省
					city,	// 市
					area,	// 区
					address, // 街道地址
					formatted_address, // 完整格式化地址
				}
			};
			return res;
		},
		
		// 智能识别收货信息
		addressDiscern(text) {
			// 收货人姓名
			let name = "";
			// 收货人手机
			let mobile = "";
			// 街道地址
			let address = "";
			// 省
			let province = {};
			// 市
			let city = {};
			// 区
			let area = {};

			if (!text) return { code: -1, msg: "地址文本不能为空" };
			//let newText = text.replace(/[^\a-\z\A-\Z0-9\u4E00-\u9FA5\ ]/g,' ');
			let textArr = text.split(/[^\u4e00-\u9fa5a-zA-Z0-9+-（）()]+/g).filter(v => v.length);
			if (textArr.length != 3) return { code: -1, msg: "地址格式不正确，请按姓名 手机号 收货地址格式。" };
			// 获取姓名和手机号
			let temp;
			let addressText; // 地址原文
			for (let [k, v] of textArr.entries()) {
				if (/^1[3,4,5,6,7,8,9][0-9]{9}$/.test(v)) {
					mobile = v;
					continue;
				}
				//记录第一次出现的字符串
				if (!temp) {
					temp = v;
					continue;
				}
				// 当前字符串的长度和之前字符串的长度的对比，进而确定姓名和地址信息
				temp.length > v.length? ((addressText = temp), (name = v)): ((addressText = v), (name = temp));
			}
			let positionRes = this.regionDiscern(addressText);
			if (positionRes.code !== 0) return positionRes;
			
			let res = {
				code: 0,
				msg: "ok",
				data: {
					name, // 姓名
					mobile, // 手机号
					position: positionRes.data, // 省市区街道信息
				}
			};
			return res;
		}
		
	}
};
</script>

<style lang="scss" scoped>
.u-datetime-picker {
	position: relative;
	z-index: 999;
}

.u-picker-view {
	height: 100%;
	box-sizing: border-box;
}

.u-picker-header {
	width: 100%;
	height: 90rpx;
	padding: 0 40rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-sizing: border-box;
	font-size: 30rpx;
	background: #fff;
	position: relative;
}

.u-picker-header::after {
	content: "";
	position: absolute;
	border-bottom: 1rpx solid #eaeef1;
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	bottom: 0;
	right: 0;
	left: 0;
}

.u-picker__title {
	color: $u-content-color;
}

.u-picker-body {
	width: 100%;
	height: 500rpx;
	overflow: hidden;
	background-color: #fff;
}

.u-column-item {
	display: flex;
	align-items: center;
	justify-content: center;
	font-size: 32rpx;
	color: $u-main-color;
	padding: 0 8rpx;
}

.u-text {
	font-size: 24rpx;
	padding-left: 8rpx;
}

.u-btn-picker {
	padding: 16rpx;
	box-sizing: border-box;
	text-align: center;
	text-decoration: none;
}

.u-opacity {
	opacity: 0.5;
}

.u-btn-picker--primary {
	color: $u-type-primary;
}

.u-btn-picker--tips {
	color: $u-tips-color;
}
</style>
