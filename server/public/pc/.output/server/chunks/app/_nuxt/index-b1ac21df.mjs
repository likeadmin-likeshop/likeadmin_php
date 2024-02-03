import { _ as __nuxt_component_0 } from './nuxt-link-18fd3caa.mjs';
import { _ as _sfc_main$1 } from './card-12511822.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData-0c28975d.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus';
import { d as useAppStore } from '../server.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import './items-3c8ae112.mjs';
import '@element-plus/icons-vue';
import './empty_news-14d41c6f.mjs';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'lodash-es';
import 'element-plus/es/locale/lang/zh-cn';

function getIndex() {
  return $request.get({ url: "/pc/index" });
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const appStore = useAppStore();
    const { data: pageData } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => getIndex(), {
      default: () => ({
        all: [],
        hot: [],
        new: [],
        page: {}
      })
    }, "$pqtWcjQkdb")), __temp = await __temp, __restore(), __temp);
    const getSwiperData = computed(() => {
      var _a;
      try {
        const data = JSON.parse(pageData.value.page.data);
        return (_a = data.find((item) => item.name === "banner")) == null ? void 0 : _a.content;
      } catch (error) {
        return {};
      }
    });
    const showList = computed(() => {
      var _a, _b;
      return ((_b = (_a = getSwiperData.value) == null ? void 0 : _a.data) == null ? void 0 : _b.filter((item) => item.is_show == "1")) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_InformationCard = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "index" }, _attrs))}><div class="flex">`);
      if (unref(getSwiperData).enabled) {
        _push(ssrRenderComponent(unref(ElCarousel), {
          class: "w-[750px] flex-none mr-5",
          trigger: "click",
          height: "340px"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(showList), (item) => {
                _push2(ssrRenderComponent(unref(ElCarouselItem), { key: item }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_NuxtLink, {
                        to: item.link.path,
                        target: "_blank"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(unref(ElImage), {
                              class: "w-full h-full rounded-[8px] bg-white overflow-hidden",
                              src: unref(appStore).getImageUrl(item.image),
                              fit: "contain"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(unref(ElImage), {
                                class: "w-full h-full rounded-[8px] bg-white overflow-hidden",
                                src: unref(appStore).getImageUrl(item.image),
                                fit: "contain"
                              }, null, 8, ["src"])
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_NuxtLink, {
                          to: item.link.path,
                          target: "_blank"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(ElImage), {
                              class: "w-full h-full rounded-[8px] bg-white overflow-hidden",
                              src: unref(appStore).getImageUrl(item.image),
                              fit: "contain"
                            }, null, 8, ["src"])
                          ]),
                          _: 2
                        }, 1032, ["to"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(unref(showList), (item) => {
                  return openBlock(), createBlock(unref(ElCarouselItem), { key: item }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, {
                        to: item.link.path,
                        target: "_blank"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(ElImage), {
                            class: "w-full h-full rounded-[8px] bg-white overflow-hidden",
                            src: unref(appStore).getImageUrl(item.image),
                            fit: "contain"
                          }, null, 8, ["src"])
                        ]),
                        _: 2
                      }, 1032, ["to"])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_InformationCard, {
        link: "/information/new",
        class: "flex-1 min-w-0",
        header: "\u6700\u65B0\u8D44\u8BAF",
        data: unref(pageData).new,
        "show-time": false
      }, null, _parent));
      _push(`</div><div class="mt-5 flex">`);
      _push(ssrRenderComponent(_component_InformationCard, {
        link: "/information",
        class: "w-[750px] flex-none mr-5",
        header: "\u5168\u90E8\u8D44\u8BAF",
        data: unref(pageData).all,
        "only-title": false
      }, null, _parent));
      _push(ssrRenderComponent(_component_InformationCard, {
        link: "/information/hot",
        class: "flex-1",
        header: "\u70ED\u95E8\u8D44\u8BAF",
        data: unref(pageData).hot,
        "only-title": false,
        "image-size": "mini",
        "show-author": false,
        "show-desc": false,
        "show-click": false,
        border: false,
        "title-line": 2
      }, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-b1ac21df.mjs.map
