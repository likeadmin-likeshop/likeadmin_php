import { _ as _sfc_main$1 } from './items-e56c0477.mjs';
import { o as useRoute, v as vLoading } from '../server.mjs';
import { defineComponent, computed, reactive, withAsyncContext, watch, mergeProps, unref, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData-caab651e.mjs';
import { ssrRenderAttrs, ssrInterpolate, ssrGetDirectiveProps, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { a as ElEmpty, e as empty_news } from './empty_news-b14ccf66.mjs';
import { g as getArticleList } from './news-b55b8675.mjs';
import { E as ElPagination } from './index-44118cde.mjs';
import './nuxt-link-ec400f73.mjs';
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
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import './index-8ec5874f.mjs';
import '@popperjs/core';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const sort = computed(() => route.params.source);
    const keyword = computed(() => route.query.keywords || "");
    const cid = computed(() => route.query.cid || "");
    const params = reactive({
      page_no: 1,
      page_size: 15,
      keyword,
      cid,
      sort
    });
    const { data, refresh, pending } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      () => getArticleList(params),
      {
        initialCache: false
      },
      "$ewxCUYuASd"
    )), __temp = await __temp, __restore(), __temp);
    const getSourceText = computed(() => {
      switch (route.params.source) {
        case "hot":
          return "\u70ED\u95E8\u8D44\u8BAF";
        case "new":
          return " \u6700\u65B0\u8D44\u8BAF";
        default:
          return "\u5168\u90E8\u8D44\u8BAF";
      }
    });
    watch([() => route.query.keywords, () => route.query.cid], () => {
      refresh();
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_InformationItems = _sfc_main$1;
      const _directive_loading = vLoading;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-full flex flex-col" }, _attrs))}><div class="text-4xl mb-5">`);
      if (unref(route).query.keywords) {
        _push(`<span> \u67E5\u627E&quot;${ssrInterpolate(unref(route).query.keywords)}&quot; </span>`);
      } else {
        _push(`<span>${ssrInterpolate(unref(route).query.name || unref(getSourceText))}</span>`);
      }
      _push(`</div><div${ssrRenderAttrs(ssrGetDirectiveProps(_ctx, _directive_loading, unref(pending)))}>`);
      if (unref(data).lists.length) {
        _push(`<div class="bg-white px-5 rounded overflow-hidden">`);
        if (unref(route).query.keywords) {
          _push(`<div class="pt-5 text-tx-secondary"> \u4E3A\u60A8\u627E\u5230\u76F8\u5173\u7ED3\u679C ${ssrInterpolate(unref(data).count)}\u4E2A </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--[-->`);
        ssrRenderList(unref(data).lists, (item) => {
          _push(ssrRenderComponent(_component_InformationItems, {
            key: item.id,
            id: item.id,
            title: item.title,
            desc: item.desc,
            click: item.click,
            author: item.author,
            "create-time": item.create_time,
            image: item.image,
            "only-title": false
          }, null, _parent));
        });
        _push(`<!--]--><div class="py-4 flex justify-end">`);
        _push(ssrRenderComponent(unref(ElPagination), {
          "current-page": unref(params).page_no,
          "onUpdate:currentPage": ($event) => unref(params).page_no = $event,
          total: unref(data).count,
          "page-size": unref(params).page_size,
          "hide-on-single-page": "",
          onCurrentChange: ($event) => unref(refresh)()
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="flex-1 flex justify-center items-center">`);
        _push(ssrRenderComponent(unref(ElEmpty), {
          image: unref(empty_news),
          description: "\u6682\u65E0\u8D44\u8BAF",
          "image-size": 250
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/information/[source]/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-40615dcc.mjs.map
