import { defineComponent, reactive, withAsyncContext, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { j as empty_news, l as feedback } from '../server.mjs';
import { u as useAsyncData } from './asyncData.430aca6d.mjs';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { e as getCollect, c as cancelCollect } from './news.50c5a1de.mjs';
import { ElImage, ElButton, ElPagination, ElEmpty } from 'element-plus';
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
  __name: "collection",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const params = reactive({
      page_no: 1,
      page_size: 15
    });
    const { data, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => getCollect(params), {
      initialCache: false
    }, "$0MtqemkOuk")), __temp = await __temp, __restore(), __temp);
    const handelCollect = async (id) => {
      await cancelCollect({ id });
      feedback.msgSuccess("\u5DF2\u53D6\u6D88\u6536\u85CF");
      refresh();
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "px-[30px] py-5 user-info min-h-full flex flex-col" }, _attrs))}><div class="border-b border-br pb-5"><span class="text-2xl font-medium">\u6211\u7684\u6536\u85CF</span></div>`);
      if (unref(data).lists.length) {
        _push(`<div><!--[-->`);
        ssrRenderList(unref(data).lists, (item) => {
          _push(`<div class="cursor-pointer"><div class="border-b border-br py-4 flex items-center">`);
          if (item.image) {
            _push(ssrRenderComponent(unref(ElImage), {
              class: "flex-none w-[180px] h-[135px] mr-4",
              src: item.image,
              fit: "cover"
            }, null, _parent));
          } else {
            _push(`<!---->`);
          }
          _push(`<div class="flex-1"><div class="text-lg font-medium line-clamp-1">${ssrInterpolate(item.title)}</div><div class="text-tx-regular line-clamp-2 mt-4">${ssrInterpolate(item.desc)}</div><div class="mt-5 text-tx-secondary flex justify-between"><div>\u6536\u85CF\u4E8E${ssrInterpolate(item.collect_time)}</div>`);
          _push(ssrRenderComponent(unref(ElButton), {
            link: "",
            onClick: ($event) => handelCollect(item.article_id)
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` \u53D6\u6D88\u6536\u85CF `);
              } else {
                return [
                  createTextVNode(" \u53D6\u6D88\u6536\u85CF ")
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div></div></div>`);
        });
        _push(`<!--]--><div class="py-4 flex justify-end">`);
        _push(ssrRenderComponent(unref(ElPagination), {
          "current-page": params.page_no,
          "onUpdate:current-page": ($event) => params.page_no = $event,
          total: unref(data).count,
          "page-size": params.page_size,
          "hide-on-single-page": "",
          layout: "total, prev, pager, next, jumper",
          onCurrentChange: ($event) => unref(refresh)()
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<div class="flex flex-1 justify-center items-center">`);
        _push(ssrRenderComponent(unref(ElEmpty), {
          image: unref(empty_news),
          description: "\u6682\u65E0\u6536\u85CF",
          "image-size": 250
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/user/collection.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=collection.b24d3d03.mjs.map
