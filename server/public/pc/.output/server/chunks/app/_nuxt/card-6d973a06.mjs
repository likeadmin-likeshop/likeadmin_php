import { _ as __nuxt_component_0 } from './nuxt-link-ec400f73.mjs';
import { _ as _sfc_main$1 } from './items-e56c0477.mjs';
import { defineComponent, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderSlot, ssrRenderList } from 'vue/server-renderer';
import { a as ElEmpty, e as empty_news } from './empty_news-b14ccf66.mjs';
import { E as ElButton, j as ElIcon, l as arrow_right_default } from '../server.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "card",
  __ssrInlineRender: true,
  props: {
    header: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => []
    },
    source: {
      type: String,
      default: "default"
    },
    onlyTitle: {
      type: Boolean,
      default: true
    },
    titleLine: {
      type: Number,
      default: 1
    },
    border: {
      type: Boolean,
      default: true
    },
    imageSize: {
      type: String,
      default: "default"
    },
    showAuthor: {
      type: Boolean,
      default: true
    },
    showDesc: {
      type: Boolean,
      default: true
    },
    showClick: {
      type: Boolean,
      default: true
    },
    showTime: {
      type: Boolean,
      default: true
    },
    showSort: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_InformationItems = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-[8px]" }, _attrs))}><div class="flex items-center h-[60px] border-b border-br ml-5 pr-5"><div class="flex-1 flex min-w-0 mr-4 h-full"><span class="text-2xl truncate font-medium h-full border-b-2 border-tx-primary mt-[1px] flex items-center">${ssrInterpolate(__props.header)}</span></div>`);
      if (__props.link) {
        _push(ssrRenderComponent(unref(ElButton), {
          class: "button",
          link: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: __props.link,
                class: "flex"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u66F4\u591A `);
                    _push3(ssrRenderComponent(unref(ElIcon), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(arrow_right_default), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(arrow_right_default))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" \u66F4\u591A "),
                      createVNode(unref(ElIcon), null, {
                        default: withCtx(() => [
                          createVNode(unref(arrow_right_default))
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_NuxtLink, {
                  to: __props.link,
                  class: "flex"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" \u66F4\u591A "),
                    createVNode(unref(ElIcon), null, {
                      default: withCtx(() => [
                        createVNode(unref(arrow_right_default))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["to"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.data.length) {
        ssrRenderSlot(_ctx.$slots, "content", { data: __props.data }, () => {
          _push(`<div class="px-5 pb-5"><!--[-->`);
          ssrRenderList(__props.data, (item, index) => {
            ssrRenderSlot(_ctx.$slots, "item", {
              item,
              index
            }, () => {
              _push(ssrRenderComponent(_component_InformationItems, {
                index,
                "show-sort": __props.showSort,
                id: item.id,
                title: item.title,
                desc: item.desc,
                click: item.click,
                author: item.author,
                "create-time": item.create_time,
                image: item.image,
                "only-title": __props.onlyTitle,
                "image-size": __props.imageSize,
                "show-author": __props.showAuthor,
                "show-desc": __props.showDesc,
                "show-click": __props.showClick,
                border: __props.border,
                "title-line": __props.titleLine,
                "show-time": __props.showTime,
                source: __props.source
              }, null, _parent));
            }, _push, _parent);
          });
          _push(`<!--]--></div>`);
        }, _push, _parent);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(ElEmpty), {
          image: unref(empty_news),
          description: "\u6682\u65E0\u8D44\u8BAF",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/information/card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=card-6d973a06.mjs.map
