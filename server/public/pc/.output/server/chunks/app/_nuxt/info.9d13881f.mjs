import { c as _export_sfc, u as useAccount, n as useUserStore, g as getUserInfo, o as _sfc_main$2, p as userEdit, P as PopupTypeEnum, l as feedback, q as logout, a as __nuxt_component_0$1 } from '../server.mjs';
import { useSSRContext, defineComponent, withAsyncContext, watch, mergeProps, unref, withCtx, createVNode, createTextVNode, toDisplayString } from 'vue';
import { u as useAsyncData } from './asyncData.430aca6d.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { ElAvatar, ElButton } from 'element-plus';
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
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-[30px] py-5 user-info" }, _attrs))} data-v-b6fdcbeb><div class="border-b border-br pb-5" data-v-b6fdcbeb><span class="text-2xl font-medium" data-v-b6fdcbeb>\u4E2A\u4EBA\u4FE1\u606F</span></div><div class="mt-5" data-v-b6fdcbeb><div class="info-item" data-v-b6fdcbeb><div class="item-name" data-v-b6fdcbeb>\u5934\u50CF</div><div class="avatar" data-v-b6fdcbeb>`);
      _push(ssrRenderComponent(unref(ElAvatar), {
        size: 60,
        src: unref(userInfo).avatar
      }, null, _parent));
      _push(`<div class="change-btn" data-v-b6fdcbeb>`);
      _push(ssrRenderComponent(_sfc_main$2, {
        onChange: ($event) => setUserInfo($event, "avatar")
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-xs text-white" data-v-b6fdcbeb${_scopeId}>\u4FEE\u6539</span>`);
          } else {
            return [
              createVNode("span", { class: "text-xs text-white" }, "\u4FEE\u6539")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="info-item leading-10" data-v-b6fdcbeb><div class="item-name" data-v-b6fdcbeb>\u8D26\u53F7</div><div data-v-b6fdcbeb>${ssrInterpolate(unref(userInfo).account)} `);
      _push(ssrRenderComponent(_component_ClientOnly, null, null, _parent));
      _push(`</div></div><div class="info-item leading-10" data-v-b6fdcbeb><div class="item-name" data-v-b6fdcbeb>\u6635\u79F0</div><div data-v-b6fdcbeb>${ssrInterpolate(unref(userInfo).nickname)} `);
      _push(ssrRenderComponent(_component_ClientOnly, null, null, _parent));
      _push(`</div></div><div class="info-item leading-10" data-v-b6fdcbeb><div class="item-name" data-v-b6fdcbeb>\u6027\u522B</div><div data-v-b6fdcbeb><span data-v-b6fdcbeb>${ssrInterpolate(unref(userInfo).sex)}</span>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, null, _parent));
      _push(`</div></div><div class="info-item leading-10" data-v-b6fdcbeb><div class="item-name" data-v-b6fdcbeb>\u624B\u673A\u53F7</div>`);
      if (unref(userInfo).mobile) {
        _push(`<div data-v-b6fdcbeb>${ssrInterpolate(unref(userInfo).mobile)}</div>`);
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
      _push(`</div><div class="info-item leading-10" data-v-b6fdcbeb><div class="item-name" data-v-b6fdcbeb>\u6CE8\u518C\u65F6\u95F4</div><div data-v-b6fdcbeb>${ssrInterpolate(unref(userInfo).create_time)}</div></div></div><div class="mt-[60px] flex justify-center" data-v-b6fdcbeb>`);
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
const info = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b6fdcbeb"]]);

export { info as default };
//# sourceMappingURL=info.9d13881f.mjs.map
