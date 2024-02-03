import { _ as __nuxt_component_0 } from './nuxt-link-18fd3caa.mjs';
import { defineComponent, computed, mergeProps, withCtx, unref, createVNode, openBlock, createBlock, renderSlot, toDisplayString, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { ElImage, ElIcon } from 'element-plus';
import { View } from '@element-plus/icons-vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "items",
  __ssrInlineRender: true,
  props: {
    index: {
      type: Number
    },
    id: {
      type: Number
    },
    title: {
      type: String
    },
    desc: {
      type: String
    },
    image: {
      type: String
    },
    author: {
      type: String
    },
    click: {
      type: Number
    },
    createTime: {
      type: String
    },
    onlyTitle: {
      type: Boolean,
      default: true
    },
    isHorizontal: {
      type: Boolean,
      default: false
    },
    titleLine: {
      type: Number,
      default: 1
    },
    border: {
      type: Boolean,
      default: true
    },
    source: {
      type: String,
      default: "default"
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
    const props = __props;
    const getImageStyle = computed(() => {
      switch (props.imageSize) {
        case "default":
          return {
            width: "180px",
            height: "135px"
          };
        case "mini":
          return {
            width: "120px",
            height: "90px"
          };
        case "large":
          return {
            width: "260px",
            height: "195px"
          };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/information/detail/${__props.id}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.onlyTitle) {
              _push2(`<div class="before:w-[6px] mt-4 before:h-[6px] before:bg-primary before:block flex items-center before:rounded-[6px] before:mr-2.5 before:flex-none"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", { title: __props.title }, () => {
                _push2(`<span class="line-clamp-1 flex-1 font-medium"${_scopeId}>${ssrInterpolate(__props.title)}</span>`);
              }, _push2, _parent2, _scopeId);
              if (__props.showTime) {
                _push2(`<span class="text-tx-secondary ml-4"${_scopeId}>${ssrInterpolate(__props.createTime)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="${ssrRenderClass({
                "border-b border-br pb-4": __props.border,
                "flex pt-4 items-center": !__props.isHorizontal
              })}"${_scopeId}><div class="flex relative"${_scopeId}>`);
              if (__props.image) {
                _push2(ssrRenderComponent(unref(ElImage), {
                  class: ["flex-none", {
                    "mr-4": !__props.isHorizontal
                  }],
                  src: __props.image,
                  fit: "cover",
                  style: unref(getImageStyle)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="${ssrRenderClass([{
                "p-2": __props.isHorizontal
              }, "flex-1"])}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", { title: __props.title }, () => {
                _push2(`<div class="${ssrRenderClass([`line-clamp-${__props.titleLine}`, "text-lg font-medium"])}"${_scopeId}>${ssrInterpolate(__props.title)}</div>`);
              }, _push2, _parent2, _scopeId);
              if (__props.showDesc && __props.desc) {
                _push2(`<div class="text-tx-regular line-clamp-2 mt-4"${_scopeId}>${ssrInterpolate(__props.desc)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.showAuthor || __props.showTime || __props.showClick) {
                _push2(`<div class="mt-5 text-tx-secondary flex items-center flex-wrap"${_scopeId}>`);
                if (__props.showAuthor && __props.author) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(__props.author)}\xA0|\xA0 </span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.showTime) {
                  _push2(`<span class="mr-5"${_scopeId}>${ssrInterpolate(__props.createTime)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.showClick) {
                  _push2(`<div class="flex items-center"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(ElIcon), null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(View), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(View))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(`<span${_scopeId}>\xA0${ssrInterpolate(__props.click)}\u4EBA\u6D4F\u89C8</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            }
          } else {
            return [
              __props.onlyTitle ? (openBlock(), createBlock("div", {
                key: 0,
                class: "before:w-[6px] mt-4 before:h-[6px] before:bg-primary before:block flex items-center before:rounded-[6px] before:mr-2.5 before:flex-none"
              }, [
                renderSlot(_ctx.$slots, "title", { title: __props.title }, () => [
                  createVNode("span", { class: "line-clamp-1 flex-1 font-medium" }, toDisplayString(__props.title), 1)
                ]),
                __props.showTime ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-tx-secondary ml-4"
                }, toDisplayString(__props.createTime), 1)) : createCommentVNode("", true)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: {
                  "border-b border-br pb-4": __props.border,
                  "flex pt-4 items-center": !__props.isHorizontal
                }
              }, [
                createVNode("div", { class: "flex relative" }, [
                  __props.image ? (openBlock(), createBlock(unref(ElImage), {
                    key: 0,
                    class: ["flex-none", {
                      "mr-4": !__props.isHorizontal
                    }],
                    src: __props.image,
                    fit: "cover",
                    style: unref(getImageStyle)
                  }, null, 8, ["class", "src", "style"])) : createCommentVNode("", true)
                ]),
                createVNode("div", {
                  class: ["flex-1", {
                    "p-2": __props.isHorizontal
                  }]
                }, [
                  renderSlot(_ctx.$slots, "title", { title: __props.title }, () => [
                    createVNode("div", {
                      class: ["text-lg font-medium", `line-clamp-${__props.titleLine}`]
                    }, toDisplayString(__props.title), 3)
                  ]),
                  __props.showDesc && __props.desc ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-tx-regular line-clamp-2 mt-4"
                  }, toDisplayString(__props.desc), 1)) : createCommentVNode("", true),
                  __props.showAuthor || __props.showTime || __props.showClick ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-5 text-tx-secondary flex items-center flex-wrap"
                  }, [
                    __props.showAuthor && __props.author ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(__props.author) + "\xA0|\xA0 ", 1)) : createCommentVNode("", true),
                    __props.showTime ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "mr-5"
                    }, toDisplayString(__props.createTime), 1)) : createCommentVNode("", true),
                    __props.showClick ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "flex items-center"
                    }, [
                      createVNode(unref(ElIcon), null, {
                        default: withCtx(() => [
                          createVNode(unref(View))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "\xA0" + toDisplayString(__props.click) + "\u4EBA\u6D4F\u89C8", 1)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ], 2)
              ], 2))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/information/items.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=items-3c8ae112.mjs.map
