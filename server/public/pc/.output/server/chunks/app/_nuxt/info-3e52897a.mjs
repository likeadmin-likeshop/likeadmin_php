import { _ as __nuxt_component_0 } from './client-only-29ef7f45.mjs';
import { useSSRContext, defineComponent, shallowRef, reactive, withAsyncContext, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString } from 'vue';
import { u as useAsyncData } from './asyncData-caab651e.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
import { a as useAccount, u as useUserStore, g as getUserInfo, E as ElButton, a9 as userEdit, aa as PopupTypeEnum, r as feedback, ab as logout } from '../server.mjs';
import { E as ElAvatar } from './index-cffad930.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
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

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  emits: ["change"],
  setup(__props, { emit: __emit }) {
    shallowRef();
    shallowRef();
    reactive({
      cropperVisible: false,
      imagePath: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cropper-upload/index.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "info",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { setPopupType, toggleShowPopup, showPopup } = useAccount();
    const userStore = useUserStore();
    const { data: userInfo, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => getUserInfo(), {
      initialCache: false
    }, "$9W20iVVFEz")), __temp = await __temp, __restore(), __temp);
    const setUserInfo = async (value, type) => {
      await userEdit({
        field: type,
        value
      });
      refresh();
    };
    const changeMobile = () => {
      setPopupType(PopupTypeEnum.BIND_MOBILE);
      toggleShowPopup(true);
    };
    watch(showPopup, (value) => {
      if (!value) {
        refresh();
      }
    });
    const handleLogut = async () => {
      await feedback.confirm("\u786E\u5B9A\u9000\u51FA\u767B\u5F55\u5417\uFF1F");
      await logout();
      userStore.logout();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-[30px] py-5 user-info" }, _attrs))} data-v-1ed99166><div class="border-b border-br pb-5" data-v-1ed99166><span class="text-2xl font-medium" data-v-1ed99166>\u4E2A\u4EBA\u4FE1\u606F</span></div><div class="mt-5" data-v-1ed99166><div class="info-item" data-v-1ed99166><div class="item-name" data-v-1ed99166>\u5934\u50CF</div><div class="avatar" data-v-1ed99166>`);
      _push(ssrRenderComponent(unref(ElAvatar), {
        size: 60,
        src: unref(userInfo).avatar
      }, null, _parent));
      _push(`<div class="change-btn" data-v-1ed99166>`);
      _push(ssrRenderComponent(_sfc_main$1, {
        onChange: ($event) => setUserInfo(
          $event,
          "avatar"
          /* AVATAR */
        )
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-xs text-white" data-v-1ed99166${_scopeId}>\u4FEE\u6539</span>`);
          } else {
            return [
              createVNode("span", { class: "text-xs text-white" }, "\u4FEE\u6539")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="info-item leading-10" data-v-1ed99166><div class="item-name" data-v-1ed99166>\u8D26\u53F7</div><div data-v-1ed99166>${ssrInterpolate(unref(userInfo).account)} `);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div><div class="info-item leading-10" data-v-1ed99166><div class="item-name" data-v-1ed99166>\u6635\u79F0</div><div data-v-1ed99166>${ssrInterpolate(unref(userInfo).nickname)} `);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div><div class="info-item leading-10" data-v-1ed99166><div class="item-name" data-v-1ed99166>\u6027\u522B</div><div data-v-1ed99166><span data-v-1ed99166>${ssrInterpolate(unref(userInfo).sex)}</span>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div></div><div class="info-item leading-10" data-v-1ed99166><div class="item-name" data-v-1ed99166>\u624B\u673A\u53F7</div>`);
      if (unref(userInfo).mobile) {
        _push(`<div data-v-1ed99166>${ssrInterpolate(unref(userInfo).mobile)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(unref(ElButton), {
        link: "",
        type: "primary",
        onClick: changeMobile
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(userInfo).mobile ? "\u66F4\u6362\u624B\u673A\u53F7" : "\u7ED1\u5B9A\u624B\u673A\u53F7")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(userInfo).mobile ? "\u66F4\u6362\u624B\u673A\u53F7" : "\u7ED1\u5B9A\u624B\u673A\u53F7"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="info-item leading-10" data-v-1ed99166><div class="item-name" data-v-1ed99166>\u6CE8\u518C\u65F6\u95F4</div><div data-v-1ed99166>${ssrInterpolate(unref(userInfo).create_time)}</div></div></div><div class="mt-[60px] flex justify-center" data-v-1ed99166>`);
      _push(ssrRenderComponent(unref(ElButton), {
        type: "primary",
        onClick: handleLogut
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u9000\u51FA\u767B\u5F55`);
          } else {
            return [
              createTextVNode("\u9000\u51FA\u767B\u5F55")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/info.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const info = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1ed99166"]]);

export { info as default };
//# sourceMappingURL=info-3e52897a.mjs.map
