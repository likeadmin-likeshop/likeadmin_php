import { defineComponent, getCurrentInstance, ref, computed, unref, watch, shallowRef, onMounted, onBeforeUnmount, provide, openBlock, createElementBlock, normalizeClass, withModifiers, createElementVNode, normalizeStyle, createBlock, Transition, withCtx, withDirectives, createVNode, vShow, createCommentVNode, renderSlot, Fragment, renderList, toDisplayString } from 'vue';
import { throttle } from 'lodash-unified';
import { useResizeObserver } from '@vueuse/core';
import '../../../utils/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { ArrowLeft, ArrowRight } from '@element-plus/icons-vue';
import '../../../hooks/index.mjs';
import '../../../tokens/index.mjs';
import { carouselProps, carouselEmits } from './carousel.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { useOrderedChildren } from '../../../hooks/use-ordered-children/index.mjs';
import { isString } from '@vue/shared';
import { debugWarn } from '../../../utils/error.mjs';
import { carouselContextKey } from '../../../tokens/carousel.mjs';

const _hoisted_1 = ["onMouseenter", "onMouseleave"];
const _hoisted_2 = ["onMouseenter", "onClick"];
const _hoisted_3 = { key: 0 };
const COMPONENT_NAME = "ElCarousel";
const THROTTLE_TIME = 300;
const __default__ = defineComponent({
  name: "ElCarousel"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: carouselProps,
  emits: carouselEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const ns = useNamespace("carousel");
    const {
      children: items,
      addChild: addItem,
      removeChild: removeItem
    } = useOrderedChildren(getCurrentInstance(), "ElCarouselItem");
    const activeIndex = ref(-1);
    const timer = ref(null);
    const hover = ref(false);
    const root = ref();
    const arrowDisplay = computed(() => props.arrow !== "never" && !unref(isVertical));
    const hasLabel = computed(() => {
      return items.value.some((item) => item.props.label.toString().length > 0);
    });
    const carouselClasses = computed(() => {
      const classes = [ns.b(), ns.m(props.direction)];
      if (unref(isCardType)) {
        classes.push(ns.m("card"));
      }
      return classes;
    });
    const indicatorsClasses = computed(() => {
      const classes = [ns.e("indicators"), ns.em("indicators", props.direction)];
      if (hasLabel.value) {
        classes.push(ns.em("indicators", "labels"));
      }
      if (props.indicatorPosition === "outside" || unref(isCardType)) {
        classes.push(ns.em("indicators", "outside"));
      }
      return classes;
    });
    const isCardType = computed(() => props.type === "card");
    const isVertical = computed(() => props.direction === "vertical");
    const throttledArrowClick = throttle((index) => {
      setActiveItem(index);
    }, THROTTLE_TIME, { trailing: true });
    const throttledIndicatorHover = throttle((index) => {
      handleIndicatorHover(index);
    }, THROTTLE_TIME);
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
        debugWarn(COMPONENT_NAME, "index must be integer.");
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
      startTimer();
    }
    watch(() => activeIndex.value, (current, prev2) => {
      resetItemPosition(prev2);
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
    watch(() => items.value, () => {
      if (items.value.length > 0)
        setActiveItem(props.initialIndex);
    });
    const resizeObserver = shallowRef();
    onMounted(() => {
      resizeObserver.value = useResizeObserver(root.value, () => {
        resetItemPosition();
      });
      startTimer();
    });
    onBeforeUnmount(() => {
      pauseTimer();
      if (root.value && resizeObserver.value)
        resizeObserver.value.stop();
    });
    provide(carouselContextKey, {
      root,
      isCardType,
      isVertical,
      items,
      loop: props.loop,
      addItem,
      removeItem,
      setActiveItem
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
        onMouseenter: withModifiers(handleMouseEnter, ["stop"]),
        onMouseleave: withModifiers(handleMouseLeave, ["stop"])
      }, [
        createElementVNode("div", {
          class: normalizeClass(unref(ns).e("container")),
          style: normalizeStyle({ height: _ctx.height })
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
                onMouseenter: _cache[0] || (_cache[0] = ($event) => handleButtonEnter("left")),
                onMouseleave: handleButtonLeave,
                onClick: _cache[1] || (_cache[1] = withModifiers(($event) => unref(throttledArrowClick)(activeIndex.value - 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowLeft))
                  ]),
                  _: 1
                })
              ], 34), [
                [
                  vShow,
                  (_ctx.arrow === "always" || hover.value) && (props.loop || activeIndex.value > 0)
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
                onMouseenter: _cache[2] || (_cache[2] = ($event) => handleButtonEnter("right")),
                onMouseleave: handleButtonLeave,
                onClick: _cache[3] || (_cache[3] = withModifiers(($event) => unref(throttledArrowClick)(activeIndex.value + 1), ["stop"]))
              }, [
                createVNode(unref(ElIcon), null, {
                  default: withCtx(() => [
                    createVNode(unref(ArrowRight))
                  ]),
                  _: 1
                })
              ], 34), [
                [
                  vShow,
                  (_ctx.arrow === "always" || hover.value) && (props.loop || activeIndex.value < unref(items).length - 1)
                ]
              ])
            ]),
            _: 1
          })) : createCommentVNode("v-if", true),
          renderSlot(_ctx.$slots, "default")
        ], 6),
        _ctx.indicatorPosition !== "none" ? (openBlock(), createElementBlock("ul", {
          key: 0,
          class: normalizeClass(unref(indicatorsClasses))
        }, [
          (openBlock(true), createElementBlock(Fragment, null, renderList(unref(items), (item, index) => {
            return openBlock(), createElementBlock("li", {
              key: index,
              class: normalizeClass([
                unref(ns).e("indicator"),
                unref(ns).em("indicator", _ctx.direction),
                unref(ns).is("active", index === activeIndex.value)
              ]),
              onMouseenter: ($event) => unref(throttledIndicatorHover)(index),
              onClick: withModifiers(($event) => handleIndicatorClick(index), ["stop"])
            }, [
              createElementVNode("button", {
                class: normalizeClass(unref(ns).e("button"))
              }, [
                unref(hasLabel) ? (openBlock(), createElementBlock("span", _hoisted_3, toDisplayString(item.props.label), 1)) : createCommentVNode("v-if", true)
              ], 2)
            ], 42, _hoisted_2);
          }), 128))
        ], 2)) : createCommentVNode("v-if", true)
      ], 42, _hoisted_1);
    };
  }
});
var Carousel = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel.vue"]]);

export { Carousel as default };
//# sourceMappingURL=carousel2.mjs.map
