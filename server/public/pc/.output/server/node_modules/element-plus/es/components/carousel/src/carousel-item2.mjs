import { defineComponent, inject, getCurrentInstance, ref, computed, unref, onMounted, reactive, onUnmounted, withDirectives, openBlock, createElementBlock, normalizeClass, normalizeStyle, vShow, createCommentVNode, renderSlot } from 'vue';
import '../../../utils/index.mjs';
import '../../../hooks/index.mjs';
import '../../../tokens/index.mjs';
import { carouselItemProps } from './carousel-item.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { carouselContextKey } from '../../../tokens/carousel.mjs';
import { debugWarn } from '../../../utils/error.mjs';
import { isUndefined } from '../../../utils/types.mjs';

const COMPONENT_NAME = "ElCarouselItem";
const CARD_SCALE = 0.83;
const __default__ = defineComponent({
  name: "ElCarouselItem"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: carouselItemProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("carousel");
    const carouselContext = inject(carouselContextKey);
    const instance = getCurrentInstance();
    if (!carouselContext) {
      debugWarn(COMPONENT_NAME, "usage: <el-carousel></el-carousel-item></el-carousel>");
    }
    if (!instance) {
      debugWarn(COMPONENT_NAME, "compositional hook can only be invoked inside setups");
    }
    const hover = ref(false);
    const translate = ref(0);
    const scale = ref(1);
    const active = ref(false);
    const ready = ref(false);
    const inStage = ref(false);
    const animating = ref(false);
    const { isCardType, isVertical } = carouselContext;
    const itemStyle = computed(() => {
      const translateType = `translate${unref(isVertical) ? "Y" : "X"}`;
      const _translate = `${translateType}(${unref(translate)}px)`;
      const _scale = `scale(${unref(scale)})`;
      const transform = [_translate, _scale].join(" ");
      return {
        transform
      };
    });
    function processIndex(index, activeIndex, length) {
      const lastItemIndex = length - 1;
      const prevItemIndex = activeIndex - 1;
      const nextItemIndex = activeIndex + 1;
      const halfItemIndex = length / 2;
      if (activeIndex === 0 && index === lastItemIndex) {
        return -1;
      } else if (activeIndex === lastItemIndex && index === 0) {
        return length;
      } else if (index < prevItemIndex && activeIndex - index >= halfItemIndex) {
        return length + 1;
      } else if (index > nextItemIndex && index - activeIndex >= halfItemIndex) {
        return -2;
      }
      return index;
    }
    function calcCardTranslate(index, activeIndex) {
      var _a;
      const parentWidth = ((_a = carouselContext.root.value) == null ? void 0 : _a.offsetWidth) || 0;
      if (inStage.value) {
        return parentWidth * ((2 - CARD_SCALE) * (index - activeIndex) + 1) / 4;
      } else if (index < activeIndex) {
        return -(1 + CARD_SCALE) * parentWidth / 4;
      } else {
        return (3 + CARD_SCALE) * parentWidth / 4;
      }
    }
    function calcTranslate(index, activeIndex, isVertical2) {
      const rootEl = carouselContext.root.value;
      if (!rootEl)
        return 0;
      const distance = (isVertical2 ? rootEl.offsetHeight : rootEl.offsetWidth) || 0;
      return distance * (index - activeIndex);
    }
    const translateItem = (index, activeIndex, oldIndex) => {
      var _a;
      const _isCardType = unref(isCardType);
      const carouselItemLength = (_a = carouselContext.items.value.length) != null ? _a : Number.NaN;
      const isActive = index === activeIndex;
      if (!_isCardType && !isUndefined(oldIndex)) {
        animating.value = isActive || index === oldIndex;
      }
      if (!isActive && carouselItemLength > 2 && carouselContext.loop) {
        index = processIndex(index, activeIndex, carouselItemLength);
      }
      const _isVertical = unref(isVertical);
      active.value = isActive;
      if (_isCardType) {
        if (_isVertical) {
          debugWarn("Carousel", "vertical direction is not supported for card mode");
        }
        inStage.value = Math.round(Math.abs(index - activeIndex)) <= 1;
        translate.value = calcCardTranslate(index, activeIndex);
        scale.value = unref(active) ? 1 : CARD_SCALE;
      } else {
        translate.value = calcTranslate(index, activeIndex, _isVertical);
      }
      ready.value = true;
    };
    function handleItemClick() {
      if (carouselContext && unref(isCardType)) {
        const index = carouselContext.items.value.findIndex(({ uid }) => uid === instance.uid);
        carouselContext.setActiveItem(index);
      }
    }
    onMounted(() => {
      carouselContext.addItem({
        props,
        states: reactive({
          hover,
          translate,
          scale,
          active,
          ready,
          inStage,
          animating
        }),
        uid: instance.uid,
        translateItem
      });
    });
    onUnmounted(() => {
      carouselContext.removeItem(instance.uid);
    });
    return (_ctx, _cache) => {
      return withDirectives((openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).e("item"),
          unref(ns).is("active", active.value),
          unref(ns).is("in-stage", inStage.value),
          unref(ns).is("hover", hover.value),
          unref(ns).is("animating", animating.value),
          { [unref(ns).em("item", "card")]: unref(isCardType) }
        ]),
        style: normalizeStyle(unref(itemStyle)),
        onClick: handleItemClick
      }, [
        unref(isCardType) ? withDirectives((openBlock(), createElementBlock("div", {
          key: 0,
          class: normalizeClass(unref(ns).e("mask"))
        }, null, 2)), [
          [vShow, !active.value]
        ]) : createCommentVNode("v-if", true),
        renderSlot(_ctx.$slots, "default")
      ], 6)), [
        [vShow, ready.value]
      ]);
    };
  }
});
var CarouselItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/carousel/src/carousel-item.vue"]]);

export { CarouselItem as default };
//# sourceMappingURL=carousel-item2.mjs.map
