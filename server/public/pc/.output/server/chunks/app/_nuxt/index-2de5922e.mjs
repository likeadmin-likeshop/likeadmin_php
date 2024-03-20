import { _ as __nuxt_component_0 } from './nuxt-link-ec400f73.mjs';
import { _ as _sfc_main$3 } from './card-6d973a06.mjs';
import { defineComponent, computed, unref, openBlock, createElementBlock, normalizeClass, withModifiers, createElementVNode, normalizeStyle, createBlock, Transition, withCtx, withDirectives, createVNode, vShow, createCommentVNode, renderSlot, Fragment, renderList, toDisplayString, withAsyncContext, mergeProps, useSSRContext, getCurrentInstance, useSlots, ref, watch, shallowRef, provide, inject, onUnmounted, isVNode } from 'vue';
import { u as useAsyncData } from './asyncData-caab651e.mjs';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { d as buildProps, h as useNamespace, j as ElIcon, k as arrow_left_default, l as arrow_right_default, w as withInstall, m as withNoopInstall, n as useAppStore, i as isNumber, _ as _export_sfc, f as flattedChildren } from '../server.mjs';
import { throttle } from 'lodash-unified';
import { isString } from '@vue/shared';
import { E as ElImage } from './empty_news-b14ccf66.mjs';
import '../../nitro/node-server.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import './items-e56c0477.mjs';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'lodash-es';
import '@vueuse/core';
import '@ctrl/tinycolor';
import '@vue/reactivity';
import '../../handlers/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';

const getOrderedChildren = (vm, childComponentName, children) => {
  const nodes = flattedChildren(vm.subTree).filter((n) => {
    var _a;
    return isVNode(n) && ((_a = n.type) == null ? void 0 : _a.name) === childComponentName && !!n.component;
  });
  const uids = nodes.map((n) => n.component.uid);
  return uids.map((uid) => children[uid]).filter((p) => !!p);
};
const useOrderedChildren = (vm, childComponentName) => {
  const children = {};
  const orderedChildren = shallowRef([]);
  const addChild = (child) => {
    children[child.uid] = child;
    orderedChildren.value = getOrderedChildren(vm, childComponentName, children);
  };
  const removeChild = (uid) => {
    delete children[uid];
    orderedChildren.value = orderedChildren.value.filter((children2) => children2.uid !== uid);
  };
  return {
    children: orderedChildren,
    addChild,
    removeChild
  };
};
const carouselProps = buildProps({
  initialIndex: {
    type: Number,
    default: 0
  },
  height: {
    type: String,
    default: ""
  },
  trigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  autoplay: {
    type: Boolean,
    default: true
  },
  interval: {
    type: Number,
    default: 3e3
  },
  indicatorPosition: {
    type: String,
    values: ["", "none", "outside"],
    default: ""
  },
  arrow: {
    type: String,
    values: ["always", "hover", "never"],
    default: "hover"
  },
  type: {
    type: String,
    values: ["", "card"],
    default: ""
  },
  loop: {
    type: Boolean,
    default: true
  },
  direction: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "horizontal"
  },
  pauseOnHover: {
    type: Boolean,
    default: true
  }
});
const carouselEmits = {
  change: (current, prev) => [current, prev].every(isNumber)
};
const carouselContextKey = Symbol("carouselContextKey");
const THROTTLE_TIME = 300;
const useCarousel = (props, emit, componentName) => {
  const {
    children: items,
    addChild: addItem,
    removeChild: removeItem
  } = useOrderedChildren(getCurrentInstance(), "ElCarouselItem");
  const slots = useSlots();
  const activeIndex = ref(-1);
  const timer = ref(null);
  const hover = ref(false);
  const root = ref();
  const containerHeight = ref(0);
  const isItemsTwoLength = ref(true);
  const arrowDisplay = computed(() => props.arrow !== "never" && !unref(isVertical));
  const hasLabel = computed(() => {
    return items.value.some((item) => item.props.label.toString().length > 0);
  });
  const isCardType = computed(() => props.type === "card");
  const isVertical = computed(() => props.direction === "vertical");
  const containerStyle = computed(() => {
    if (props.height !== "auto") {
      return {
        height: props.height
      };
    }
    return {
      height: `${containerHeight.value}px`,
      overflow: "hidden"
    };
  });
  const throttledArrowClick = throttle((index) => {
    setActiveItem(index);
  }, THROTTLE_TIME, { trailing: true });
  const throttledIndicatorHover = throttle((index) => {
    handleIndicatorHover(index);
  }, THROTTLE_TIME);
  const isTwoLengthShow = (index) => {
    if (!isItemsTwoLength.value)
      return true;
    return activeIndex.value <= 1 ? index <= 1 : index > 1;
  };
  function pauseTimer() {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }
  function startTimer() {
    if (props.interval <= 0 || !props.autoplay || timer.value)
      return;
    timer.value = setInterval(() => playSlides(), props.interval);
  }
  const playSlides = () => {
    if (activeIndex.value < items.value.length - 1) {
      activeIndex.value = activeIndex.value + 1;
    } else if (props.loop) {
      activeIndex.value = 0;
    }
  };
  function setActiveItem(index) {
    if (isString(index)) {
      const filteredItems = items.value.filter((item) => item.props.name === index);
      if (filteredItems.length > 0) {
        index = items.value.indexOf(filteredItems[0]);
      }
    }
    index = Number(index);
    if (Number.isNaN(index) || index !== Math.floor(index)) {
      return;
    }
    const itemCount = items.value.length;
    const oldIndex = activeIndex.value;
    if (index < 0) {
      activeIndex.value = props.loop ? itemCount - 1 : 0;
    } else if (index >= itemCount) {
      activeIndex.value = props.loop ? 0 : itemCount - 1;
    } else {
      activeIndex.value = index;
    }
    if (oldIndex === activeIndex.value) {
      resetItemPosition(oldIndex);
    }
    resetTimer();
  }
  function resetItemPosition(oldIndex) {
    items.value.forEach((item, index) => {
      item.translateItem(index, activeIndex.value, oldIndex);
    });
  }
  function itemInStage(item, index) {
    var _a, _b, _c, _d;
    const _items = unref(items);
    const itemCount = _items.length;
    if (itemCount === 0 || !item.states.inStage)
      return false;
    const nextItemIndex = index + 1;
    const prevItemIndex = index - 1;
    const lastItemIndex = itemCount - 1;
    const isLastItemActive = _items[lastItemIndex].states.active;
    const isFirstItemActive = _items[0].states.active;
    const isNextItemActive = (_b = (_a = _items[nextItemIndex]) == null ? void 0 : _a.states) == null ? void 0 : _b.active;
    const isPrevItemActive = (_d = (_c = _items[prevItemIndex]) == null ? void 0 : _c.states) == null ? void 0 : _d.active;
    if (index === lastItemIndex && isFirstItemActive || isNextItemActive) {
      return "left";
    } else if (index === 0 && isLastItemActive || isPrevItemActive) {
      return "right";
    }
    return false;
  }
  function handleMouseEnter() {
    hover.value = true;
    if (props.pauseOnHover) {
      pauseTimer();
    }
  }
  function handleMouseLeave() {
    hover.value = false;
    startTimer();
  }
  function handleButtonEnter(arrow) {
    if (unref(isVertical))
      return;
    items.value.forEach((item, index) => {
      if (arrow === itemInStage(item, index)) {
        item.states.hover = true;
      }
    });
  }
  function handleButtonLeave() {
    if (unref(isVertical))
      return;
    items.value.forEach((item) => {
      item.states.hover = false;
    });
  }
  function handleIndicatorClick(index) {
    activeIndex.value = index;
  }
  function handleIndicatorHover(index) {
    if (props.trigger === "hover" && index !== activeIndex.value) {
      activeIndex.value = index;
    }
  }
  function prev() {
    setActiveItem(activeIndex.value - 1);
  }
  function next() {
    setActiveItem(activeIndex.value + 1);
  }
  function resetTimer() {
    pauseTimer();
    if (!props.pauseOnHover)
      startTimer();
  }
  function setContainerHeight(height) {
    if (props.height !== "auto")
      return;
    containerHeight.value = height;
  }
  function PlaceholderItem() {
    var _a;
    const defaultSlots = (_a = slots.default) == null ? void 0 : _a.call(slots);
    if (!defaultSlots)
      return null;
    const flatSlots = flattedChildren(defaultSlots);
    const carouselItemsName = "ElCarouselItem";
    const normalizeSlots = flatSlots.filter((slot) => {
      return isVNode(slot) && slot.type.name === carouselItemsName;
    });
    if ((normalizeSlots == null ? void 0 : normalizeSlots.length) === 2 && props.loop && !isCardType.value) {
      isItemsTwoLength.value = true;
      return normalizeSlots;
    }
    isItemsTwoLength.value = false;
    return null;
  }
  watch(() => activeIndex.value, (current, prev2) => {
    resetItemPosition(prev2);
    if (isItemsTwoLength.value) {
      current = current % 2;
      prev2 = prev2 % 2;
    }
    if (prev2 > -1) {
      emit("change", current, prev2);
    }
  });
  watch(() => props.autoplay, (autoplay) => {
    autoplay ? startTimer() : pauseTimer();
  });
  watch(() => props.loop, () => {
    setActiveItem(activeIndex.value);
  });
  watch(() => props.interval, () => {
    resetTimer();
  });
  shallowRef();
  provide(carouselContextKey, {
    root,
    isCardType,
    isVertical,
    items,
    loop: props.loop,
    addItem,
    removeItem,
    setActiveItem,
    setContainerHeight
  });
  return {
    root,
    activeIndex,
    arrowDisplay,
    hasLabel,
    hover,
    isCardType,
    items,
    isVertical,
    containerStyle,
    isItemsTwoLength,
    handleButtonEnter,
    handleButtonLeave,
    handleIndicatorClick,
    handleMouseEnter,
    handleMouseLeave,
    setActiveItem,
    prev,
    next,
    PlaceholderItem,
    isTwoLengthShow,
    throttledArrowClick,
    throttledIndicatorHover
  };
};
const _hoisted_1 = ["onMouseenter", "onClick"];
const _hoisted_2 = { key: 0 };
const COMPONENT_NAME$1 = "ElCarousel";
const __default__$1 = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME$1
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  ...__default__$1,
  props: carouselProps,
  emits: carouselEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const {
      root,
      activeIndex,
      arrowDisplay,
      hasLabel,
      hover,
      isCardType,
      items,
      isVertical,
      containerStyle,
      handleButtonEnter,
      handleButtonLeave,
      handleIndicatorClick,
      handleMouseEnter,
      handleMouseLeave,
      setActiveItem,
      prev,
      next,
      PlaceholderItem,
      isTwoLengthShow,
      throttledArrowClick,
      throttledIndicatorHover
    } = useCarousel(props, emit);
    const ns = useNamespace("carousel");
    const carouselClasses = computed(() => {
      const classes = [ns.b(), ns.m(props.direction)];
      if (unref(isCardType)) {
        classes.push(ns.m("card"));
      }
      return classes;
    });
    const indicatorsClasses = computed(() => {
      const classes = [ns.e("indicators"), ns.em("indicators", props.direction)];
      if (unref(hasLabel)) {
        classes.push(ns.em("indicators", "labels"));
      }
      if (props.indicatorPosition === "outside") {
        classes.push(ns.em("indicators", "outside"));
      }
      if (unref(isVertical)) {
        classes.push(ns.em("indicators", "right"));
      }
      return classes;
    });
    expose({
      setActiveItem,
      prev,
      next
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        ref_key: "root",
        ref: root,
        class: normalizeClass(unref(carouselClasses)),
        onMouseenter: _cache[6] || (_cache[6] = withModifiers((...args) => unref(handleMouseEnter) && unref(handleMouseEnter)(...args), ["stop"])),
        onMouseleave: _cache[7] || (_cache[7] = withModifiers((...args) => unref(handleMouseLeave) && unref(handleMouseLeave)(...args), ["stop"]))
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ns).e("container")),
          style: normalizeStyle(unref(containerStyle))
        }, [
          unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
            key: 0,
            name: "carousel-arrow-left",
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "left")]),
                onMouseenter: _cache[0] || (_cache[0] = ($event) => unref(handleButtonEnter)("left")),
                onMouseleave: _cache[1] || (_cache[1] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
                onClick: _cache[2] || (_cache[2] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) - 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_left_default))
                  ]),
                  _: 1
                })
              ], 34), [
                [
                  vShow,
                  (_ctx.arrow === "always" || unref(hover)) && (props.loop || unref(activeIndex) > 0)
                ]
              ])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          unref(arrowDisplay) ? (openBlock(), createBlock(Transition, {
            key: 1,
            name: "carousel-arrow-right",
            persisted: ""
          }, {
            default: withCtx(() => [
              withDirectives(createElementVNode("button", {
                type: "button",
                class: normalizeClass([unref(ns).e("arrow"), unref(ns).em("arrow", "right")]),
                onMouseenter: _cache[3] || (_cache[3] = ($event) => unref(handleButtonEnter)("right")),
                onMouseleave: _cache[4] || (_cache[4] = (...args) => unref(handleButtonLeave) && unref(handleButtonLeave)(...args)),
                onClick: _cache[5] || (_cache[5] = withModifiers(($event) => unref(throttledArrowClick)(unref(activeIndex) + 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(arrow_right_default))
                  ]),
                  _: 1
                })
              ], 34), [
                [
                  vShow,
                  (_ctx.arrow === "always" || unref(hover)) && (props.loop || unref(activeIndex) < unref(items).length - 1)
                ]
              ])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          createVNode(unref(PlaceholderItem)),
          renderSlot(_ctx.$slots, "default")
        ], 6),
        _ctx.indicatorPosition !== "none" ? (openBlock(), createElementBlock("ul", {
          key: 0,
          class: normalizeClass(unref(indicatorsClasses))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(items), (item, index) => {
            return withDirectives((openBlock(), createElementBlock("li", {
              key: index,
              class: normalizeClass([
                unref(ns).e("indicator"),
                unref(ns).em("indicator", _ctx.direction),
                unref(ns).is("active", index === unref(activeIndex))
              ]),
              onMouseenter: ($event) => unref(throttledIndicatorHover)(index),
              onClick: withModifiers(($event) => unref(handleIndicatorClick)(index), ["stop"])
            }, [
              createElementVNode("button", {
                class: normalizeClass(unref(ns).e("button"))
              }, [
                unref(hasLabel) ? (openBlock(), createElementBlock("span", _hoisted_2, toDisplayString(item.props.label), 1)) : createCommentVNode("v-if", true)
              ], 2)
            ], 42, _hoisted_1)), [
              [vShow, unref(isTwoLengthShow)(index)]
            ]);
          }), 128))
        ], 2)) : createCommentVNode("v-if", true)
      ], 34);
    };
  }
});
var Carousel = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "carousel.vue"]]);
const carouselItemProps = buildProps({
  name: { type: String, default: "" },
  label: {
    type: [String, Number],
    default: ""
  }
});
const useCarouselItem = (props, componentName) => {
  const carouselContext = inject(carouselContextKey);
  const instance = getCurrentInstance();
  const carouselItemRef = ref();
  const hover = ref(false);
  const translate = ref(0);
  const scale = ref(1);
  const active = ref(false);
  const ready = ref(false);
  const inStage = ref(false);
  const animating = ref(false);
  const { isCardType, isVertical } = carouselContext;
  function handleItemClick() {
    if (carouselContext && unref(isCardType)) {
      const index = carouselContext.items.value.findIndex(({ uid }) => uid === instance.uid);
      carouselContext.setActiveItem(index);
    }
  }
  onUnmounted(() => {
    carouselContext.removeItem(instance.uid);
  });
  return {
    carouselItemRef,
    active,
    animating,
    hover,
    inStage,
    isVertical,
    translate,
    isCardType,
    scale,
    ready,
    handleItemClick
  };
};
const __default__ = /* @__PURE__ */ defineComponent({
  name: "ElCarouselItem"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: carouselItemProps,
  setup(__props) {
    const ns = useNamespace("carousel");
    const {
      carouselItemRef,
      active,
      animating,
      hover,
      inStage,
      isVertical,
      translate,
      isCardType,
      scale,
      ready,
      handleItemClick
    } = useCarouselItem();
    const itemKls = computed(() => [
      ns.e("item"),
      ns.is("active", active.value),
      ns.is("in-stage", inStage.value),
      ns.is("hover", hover.value),
      ns.is("animating", animating.value),
      {
        [ns.em("item", "card")]: isCardType.value,
        [ns.em("item", "card-vertical")]: isCardType.value && isVertical.value
      }
    ]);
    const itemStyle = computed(() => {
      const translateType = `translate${unref(isVertical) ? "Y" : "X"}`;
      const _translate = `${translateType}(${unref(translate)}px)`;
      const _scale = `scale(${unref(scale)})`;
      const transform = [_translate, _scale].join(" ");
      return {
        transform
      };
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        ref_key: "carouselItemRef",
        ref: carouselItemRef,
        class: normalizeClass(unref(itemKls)),
        style: normalizeStyle(unref(itemStyle)),
        onClick: _cache[0] || (_cache[0] = (...args) => unref(handleItemClick) && unref(handleItemClick)(...args))
      }, [
        unref(isCardType) ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).e("mask"))
        }, null, 2)), [
          [vShow, !unref(active)]
        ]) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default")
      ], 6)), [
        [vShow, unref(ready)]
      ]);
    };
  }
});
var CarouselItem = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "carousel-item.vue"]]);
const ElCarousel = withInstall(Carousel, {
  CarouselItem
});
const ElCarouselItem = withNoopInstall(CarouselItem);
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
        console.log(data);
        return (_a = data.find((item) => item.name === "pc-banner")) == null ? void 0 : _a.content;
      } catch (error) {
        return {};
      }
    });
    const showList = computed(() => {
      var _a;
      return ((_a = getSwiperData.value) == null ? void 0 : _a.data) || [];
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_InformationCard = _sfc_main$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "index" }, _attrs))}><div class="flex"><div class="w-[750px] h-[340px] flex-none mr-5">`);
      if (unref(getSwiperData).enabled) {
        _push(ssrRenderComponent(unref(ElCarousel), {
          class: "w-full",
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
      _push(`</div>`);
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
//# sourceMappingURL=index-2de5922e.mjs.map
