import { e as useAppStore, f as __nuxt_component_0$2, h as _sfc_main$3 } from '../server.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, unref, withCtx, createVNode, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { u as useAsyncData } from './asyncData.430aca6d.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { ElCarousel, ElCarouselItem, ElImage } from 'element-plus';
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
    const getSwioperData = computed(() => {
      var _a;
      try {
        const data = JSON.parse(pageData.value.page.data);
        return (_a = data.find((item) => item.name === "banner")) == null ? void 0 : _a.content;
      } catch (error) {
        return {};
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_InformationCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "index" }, _attrs))}><div class="flex">`);
      if (unref(getSwioperData).enabled) {
        _push(ssrRenderComponent(unref(ElCarousel), {
          class: "w-[750px] flex-none mr-5",
          trigger: "click",
          height: "340px"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(unref(getSwioperData).data, (item) => {
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
                (openBlock(true), createBlock(Fragment, null, renderList(unref(getSwioperData).data, (item) => {
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
//# sourceMappingURL=index.99e6af96.mjs.map
