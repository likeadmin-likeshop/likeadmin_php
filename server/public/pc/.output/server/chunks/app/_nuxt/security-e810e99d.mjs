import { u as useLockFn, _ as _sfc_main$1 } from './useLockFn-c91dfc18.mjs';
import { _ as __nuxt_component_0 } from './client-only-29ef7f45.mjs';
import { useSSRContext, defineComponent, withAsyncContext, ref, shallowRef, reactive, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode } from 'vue';
import { u as useAsyncData } from './asyncData-caab651e.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { g as getUserInfo, u as useUserStore, a as useAccount, E as ElButton, b as userChangePwd } from '../server.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import './util-8f61b923.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'lodash-es';
import '@vueuse/core';
import '@vue/shared';
import 'lodash-unified';
import '@ctrl/tinycolor';
import '@vue/reactivity';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "security",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: userInfo, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => getUserInfo(), {
      default: () => ({}),
      initialCache: false
    }, "$aylh5XbgmP")), __temp = await __temp, __restore(), __temp);
    const userStore = useUserStore();
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
      userStore.logout();
      showMobilePopup.value = false;
      refresh();
    };
    useLockFn(handleConfirm);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = _sfc_main$1;
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-[30px] py-5 user-info" }, _attrs))} data-v-329000e7><div class="border-b border-br pb-5" data-v-329000e7><span class="text-2xl font-medium" data-v-329000e7>\u8D26\u53F7\u5B89\u5168</span></div><div class="mt-5" data-v-329000e7><div class="info-item leading-10 flex justify-between" data-v-329000e7><div class="item-name" data-v-329000e7>\u767B\u5F55\u5BC6\u7801</div><div data-v-329000e7>`);
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
      _push(`</div></div><div class="info-item leading-10 flex justify-between" data-v-329000e7><div class="item-name" data-v-329000e7>\u7ED1\u5B9A\u5FAE\u4FE1</div><div data-v-329000e7>${ssrInterpolate(unref(userInfo).has_auth ? "\u5DF2\u7ED1\u5B9A" : "\u672A\u7ED1\u5B9A")}</div></div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
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
const security = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-329000e7"]]);

export { security as default };
//# sourceMappingURL=security-e810e99d.mjs.map
