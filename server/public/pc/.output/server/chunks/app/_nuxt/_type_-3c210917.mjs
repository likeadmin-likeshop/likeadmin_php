import { defineComponent, withAsyncContext, mergeProps, unref, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData-0c28975d.mjs';
import { e as useRoute, h as getPolicy } from '../server.mjs';
import { ssrRenderAttrs, ssrInterpolate } from 'vue/server-renderer';
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
import 'element-plus';
import '@element-plus/icons-vue';
import 'element-plus/es/locale/lang/zh-cn';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[type]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      () => getPolicy({
        type: route.params.type
      }),
      {
        initialCache: false
      },
      "$wG0VOjeE4Z"
    )), __temp = await __temp, __restore(), __temp);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white render-html p-[30px] w-[1200px] mx-auto min-h-screen" }, _attrs))}><h1 class="text-center">${ssrInterpolate(unref(data).title)}</h1><div class="mx-auto">${unref(data).content}</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/policy/[type].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_type_-3c210917.mjs.map
