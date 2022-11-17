import { c as _export_sfc, g as getUserInfo, u as useAccount, _ as _sfc_main$5, a as __nuxt_component_0$1, b as userChangePwd } from '../server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, ref, shallowRef, reactive, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode } from 'vue';
import { u as useAsyncData } from './asyncData.430aca6d.mjs';
import { u as useLockFn } from './useLockFn.da8853e7.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { ElButton } from 'element-plus';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'destr';
import 'h3';
import 'defu';
import '@vue/shared';
import '@element-plus/icons-vue';
import 'cookie-es';
import 'ohash';
import 'lodash-es';
import 'element-plus/es/locale/lang/zh-cn';
import '../../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "security",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: userInfo, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => getUserInfo(), {
      default: () => ({})
    }, "$aylh5XbgmP")), __temp = await __temp, __restore(), __temp);
    const showMobilePopup = ref(false);
    useAccount();
    const formRef = shallowRef();
    const formData = reactive({
      old_password: "",
      password: "",
      password_confirm: ""
    });
    const handleConfirm = async () => {
      var _a;
      await ((_a = formRef.value) == null ? void 0 : _a.validate());
      await userChangePwd(formData);
      showMobilePopup.value = false;
      refresh();
    };
    useLockFn(handleConfirm);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = _sfc_main$5;
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-[30px] py-5 user-info" }, _attrs))} data-v-d36a2f06><div class="border-b border-br pb-5" data-v-d36a2f06><span class="text-2xl font-medium" data-v-d36a2f06>\u8D26\u53F7\u5B89\u5168</span></div><div class="mt-5" data-v-d36a2f06><div class="info-item leading-10 flex justify-between" data-v-d36a2f06><div class="item-name" data-v-d36a2f06>\u767B\u5F55\u5BC6\u7801</div><div data-v-d36a2f06>`);
      _push(ssrRenderComponent(unref(ElButton), {
        link: "",
        type: "primary",
        onClick: ($event) => showMobilePopup.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(userInfo).has_password ? "\u70B9\u51FB\u4FEE\u6539" : "\u70B9\u51FB\u8BBE\u7F6E")} `);
            _push2(ssrRenderComponent(_component_Icon, { name: "el-icon-ArrowRight" }, null, _parent2, _scopeId));
          } else {
            return [
              createTextVNode(toDisplayString(unref(userInfo).has_password ? "\u70B9\u51FB\u4FEE\u6539" : "\u70B9\u51FB\u8BBE\u7F6E") + " ", 1),
              createVNode(_component_Icon, { name: "el-icon-ArrowRight" })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="info-item leading-10 flex justify-between" data-v-d36a2f06><div class="item-name" data-v-d36a2f06>\u7ED1\u5B9A\u5FAE\u4FE1</div><div data-v-d36a2f06>${ssrInterpolate(unref(userInfo).has_auth ? "\u5DF2\u7ED1\u5B9A" : "\u672A\u7ED1\u5B9A")}</div></div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account/security.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const security = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d36a2f06"]]);

export { security as default };
//# sourceMappingURL=security.ad690908.mjs.map
