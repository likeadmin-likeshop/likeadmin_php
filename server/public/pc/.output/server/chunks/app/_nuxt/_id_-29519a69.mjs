import { u as useLockFn, _ as _sfc_main$3 } from './useLockFn-c91dfc18.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-ec400f73.mjs';
import { _ as _sfc_main$4 } from './card-6d973a06.mjs';
import { defineComponent, ref, provide, openBlock, createElementBlock, normalizeClass, unref, renderSlot, getCurrentInstance, inject, createElementVNode, createBlock, withCtx, resolveDynamicComponent, toDisplayString, withAsyncContext, computed, createTextVNode, createVNode, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData-caab651e.mjs';
import { d as buildProps, p as iconPropType, h as useNamespace, q as definePropType, j as ElIcon, w as withInstall, m as withNoopInstall, o as useRoute, E as ElButton, _ as _export_sfc, r as feedback } from '../server.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { a as getArticleDetail, c as cancelCollect, b as addCollect } from './news-b55b8675.mjs';
import './util-8f61b923.mjs';
import './_plugin-vue_export-helper-cc2b3d55.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import './items-e56c0477.mjs';
import './empty_news-b14ccf66.mjs';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@vueuse/core';
import 'lodash-unified';
import '@vue/shared';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'lodash-es';
import '@ctrl/tinycolor';
import '@vue/reactivity';

const breadcrumbKey = Symbol("breadcrumbKey");
const breadcrumbProps = buildProps({
  separator: {
    type: String,
    default: "/"
  },
  separatorIcon: {
    type: iconPropType
  }
});
const __default__$1 = /* @__PURE__ */ defineComponent({
  name: "ElBreadcrumb"
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: breadcrumbProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("breadcrumb");
    const breadcrumb = ref();
    provide(breadcrumbKey, props);
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "breadcrumb",
        ref: breadcrumb,
        class: normalizeClass(unref(ns).b()),
        "aria-label": "Breadcrumb",
        role: "navigation"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var Breadcrumb = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "breadcrumb.vue"]]);
const breadcrumbItemProps = buildProps({
  to: {
    type: definePropType([String, Object]),
    default: ""
  },
  replace: {
    type: Boolean,
    default: false
  }
});
const __default__ = /* @__PURE__ */ defineComponent({
  name: "ElBreadcrumbItem"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: breadcrumbItemProps,
  setup(__props) {
    const props = __props;
    const instance = getCurrentInstance();
    const breadcrumbContext = inject(breadcrumbKey, void 0);
    const ns = useNamespace("breadcrumb");
    const router = instance.appContext.config.globalProperties.$router;
    const link = ref();
    const onClick = () => {
      if (!props.to || !router)
        return;
      props.replace ? router.replace(props.to) : router.push(props.to);
    };
    return (_ctx, _cache) => {
      var _a, _b;
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(unref(ns).e("item"))
      }, [
        createElementVNode("span", {
          ref_key: "link",
          ref: link,
          class: normalizeClass([unref(ns).e("inner"), unref(ns).is("link", !!_ctx.to)]),
          role: "link",
          onClick
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2),
        ((_a = unref(breadcrumbContext)) == null ? void 0 : _a.separatorIcon) ? (openBlock(), createBlock(unref(ElIcon), {
          key: 0,
          class: normalizeClass(unref(ns).e("separator"))
        }, {
          default: withCtx(() => [
            (openBlock(), createBlock(resolveDynamicComponent(unref(breadcrumbContext).separatorIcon)))
          ]),
          _: 1
        }, 8, ["class"])) : (openBlock(), createElementBlock("span", {
          key: 1,
          class: normalizeClass(unref(ns).e("separator")),
          role: "presentation"
        }, toDisplayString((_b = unref(breadcrumbContext)) == null ? void 0 : _b.separator), 3))
      ], 2);
    };
  }
});
var BreadcrumbItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "breadcrumb-item.vue"]]);
const ElBreadcrumb = withInstall(Breadcrumb, {
  BreadcrumbItem
});
const ElBreadcrumbItem = withNoopInstall(BreadcrumbItem);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const { data: newsDetail, refresh } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(
      () => getArticleDetail({
        id: route.params.id,
        source: route.params.source
      }),
      {
        initialCache: false
      },
      "$hLmIawyfea"
    )), __temp = await __temp, __restore(), __temp);
    computed(() => {
      switch (route.params.source) {
        case "hot":
          return "\u70ED\u95E8\u8D44\u8BAF";
        case "new":
          return " \u6700\u65B0\u8D44\u8BAF";
        default:
          return "\u5168\u90E8\u8D44\u8BAF";
      }
    });
    const handelCollect = async () => {
      const id = route.params.id;
      if (newsDetail.value.collect) {
        await cancelCollect({ id });
        feedback.msgSuccess("\u5DF2\u53D6\u6D88\u6536\u85CF");
      } else {
        await addCollect({ id });
        feedback.msgSuccess("\u6536\u85CF\u6210\u529F");
      }
      refresh();
    };
    const { lockFn: handelCollectLock } = useLockFn(handelCollect);
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b;
      const _component_Icon = _sfc_main$3;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_InformationCard = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex items-center"> \u5F53\u524D\u4F4D\u7F6E\uFF1A `);
      _push(ssrRenderComponent(unref(ElBreadcrumb), { separator: "/" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ElBreadcrumbItem), { to: { path: "/information" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` \u8D44\u8BAF\u4E2D\u5FC3 `);
                } else {
                  return [
                    createTextVNode(" \u8D44\u8BAF\u4E2D\u5FC3 ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ElBreadcrumbItem), {
              to: {
                path: `/information/default`,
                query: {
                  cid: unref(newsDetail).cid,
                  name: unref(newsDetail).cate_name
                }
              }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(newsDetail).cate_name)}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(newsDetail).cate_name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(ElBreadcrumbItem), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`\u6587\u7AE0\u8BE6\u60C5`);
                } else {
                  return [
                    createTextVNode("\u6587\u7AE0\u8BE6\u60C5")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ElBreadcrumbItem), { to: { path: "/information" } }, {
                default: withCtx(() => [
                  createTextVNode(" \u8D44\u8BAF\u4E2D\u5FC3 ")
                ]),
                _: 1
              }),
              createVNode(unref(ElBreadcrumbItem), {
                to: {
                  path: `/information/default`,
                  query: {
                    cid: unref(newsDetail).cid,
                    name: unref(newsDetail).cate_name
                  }
                }
              }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(unref(newsDetail).cate_name), 1)
                ]),
                _: 1
              }, 8, ["to"]),
              createVNode(unref(ElBreadcrumbItem), null, {
                default: withCtx(() => [
                  createTextVNode("\u6587\u7AE0\u8BE6\u60C5")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="flex gap-4 mt-5"><div class="w-[750px] bg-body rounded-[8px] flex-none p-5"><div class="border-b border-br pb-4"><span class="font-medium text-[22px]">${ssrInterpolate(unref(newsDetail).title)}</span><div class="mt-3 text-tx-secondary flex items-center flex-wrap">`);
      if (unref(newsDetail).author) {
        _push(`<span>${ssrInterpolate(unref(newsDetail).author)}\xA0|\xA0 </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<span class="mr-5">${ssrInterpolate(unref(newsDetail).create_time)}</span><div class="flex items-center">`);
      _push(ssrRenderComponent(_component_Icon, { name: "el-icon-View" }, null, _parent));
      _push(`<span>\xA0${ssrInterpolate(unref(newsDetail).click)}\u4EBA\u6D4F\u89C8</span></div></div></div>`);
      if (unref(newsDetail).abstract) {
        _push(`<div class="bg-page mt-4 p-3 rounded-lg"> \u6458\u8981\uFF1A${ssrInterpolate(unref(newsDetail).abstract)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="py-4">${unref(newsDetail).content}</div><div class="flex justify-center mt-[40px]">`);
      _push(ssrRenderComponent(unref(ElButton), {
        size: "large",
        round: "",
        onClick: unref(handelCollectLock)
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: `el-icon-${unref(newsDetail).collect ? "StarFilled" : "Star"}`,
              size: unref(newsDetail).collect ? 20 : 16,
              color: unref(newsDetail).collect ? "#FF2C2F" : "inherit"
            }, null, _parent2, _scopeId));
            _push2(` ${ssrInterpolate(unref(newsDetail).collect ? "\u53D6\u6D88\u6536\u85CF" : "\u70B9\u51FB\u6536\u85CF")}`);
          } else {
            return [
              createVNode(_component_Icon, {
                name: `el-icon-${unref(newsDetail).collect ? "StarFilled" : "Star"}`,
                size: unref(newsDetail).collect ? 20 : 16,
                color: unref(newsDetail).collect ? "#FF2C2F" : "inherit"
              }, null, 8, ["name", "size", "color"]),
              createTextVNode(" " + toDisplayString(unref(newsDetail).collect ? "\u53D6\u6D88\u6536\u85CF" : "\u70B9\u51FB\u6536\u85CF"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="border-t border-br mt-[30px]"><div class="mt-5 flex"><span class="text-tx-regular">\u4E0A\u4E00\u7BC7\uFF1A</span>`);
      if (unref(newsDetail).last.id) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "flex-1 hover:underline",
          to: `/information/detail/${(_a = unref(newsDetail).last) == null ? void 0 : _a.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b2;
            if (_push2) {
              _push2(`${ssrInterpolate((_a2 = unref(newsDetail).last) == null ? void 0 : _a2.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString((_b2 = unref(newsDetail).last) == null ? void 0 : _b2.title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span> \u6682\u65E0\u76F8\u5173\u6587\u7AE0 </span>`);
      }
      _push(`</div><div class="mt-5 flex"><span class="text-tx-regular">\u4E0B\u4E00\u7BC7\uFF1A</span>`);
      if (unref(newsDetail).next.id) {
        _push(ssrRenderComponent(_component_NuxtLink, {
          class: "flex-1 hover:underline",
          to: `/information/detail/${(_b = unref(newsDetail).next) == null ? void 0 : _b.id}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            var _a2, _b2;
            if (_push2) {
              _push2(`${ssrInterpolate((_a2 = unref(newsDetail).next) == null ? void 0 : _a2.title)}`);
            } else {
              return [
                createTextVNode(toDisplayString((_b2 = unref(newsDetail).next) == null ? void 0 : _b2.title), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<span> \u6682\u65E0\u76F8\u5173\u6587\u7AE0 </span>`);
      }
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_InformationCard, {
        class: "flex-1",
        header: "\u76F8\u5173\u8D44\u8BAF",
        data: unref(newsDetail).new,
        "only-title": false,
        "image-size": "mini",
        "show-author": false,
        "show-desc": false,
        "show-click": false,
        border: false,
        "title-line": 2,
        source: "new"
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/information/detail/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-29519a69.mjs.map
