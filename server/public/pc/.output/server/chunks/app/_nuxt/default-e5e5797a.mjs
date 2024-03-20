import { defineComponent, openBlock, createBlock, Transition, mergeProps, unref, toHandlers, withCtx, renderSlot, useSSRContext, Fragment, renderList, createVNode, ref, provide, inject, computed, getCurrentInstance, reactive, watch, h, withDirectives, vShow, watchEffect, createTextVNode, isRef, resolveComponent, toDisplayString, withAsyncContext, createCommentVNode, toRef, createElementBlock, normalizeClass, createSlots, normalizeStyle, withModifiers, createElementVNode, nextTick, normalizeProps, guardReactiveProps, resolveDynamicComponent, readonly } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0 } from './nuxt-link-ec400f73.mjs';
import { h as useNamespace, d as buildProps, q as definePropType, p as iconPropType, K as EVENT_CODE, w as withInstall, m as withNoopInstall, S as mutable, aq as more_default, _ as _export_sfc$1, F as useDeprecated, aj as throwError, Q as arrow_down_default, l as arrow_right_default, j as ElIcon, f as flattedChildren, a as useAccount, u as useUserStore, ad as useRouter, o as useRoute, R as ElInput, ar as search_default, n as useAppStore, at as isExternal, E as ElButton, B as useLocale, Y as addUnit, C as useId, z as useFormSize, am as FOCUS_TRAP_INJECTION_KEY, r as feedback, ab as logout, as as useState, aa as PopupTypeEnum, an as addClass, ao as removeClass, ap as hasClass } from '../server.mjs';
import { b as useTooltipTriggerProps, u as useTooltipContentProps, a as ElTooltip, C as ClickOutside, E as ElScrollbar, O as OnlyChild, c as composeEventHandlers, w as whenMouse } from './index-8ec5874f.mjs';
import { useResizeObserver, useTimeoutFn, useEventListener } from '@vueuse/core';
import { castArray, isNil } from 'lodash-unified';
import { isString, isObject, isFunction } from '@vue/shared';
import { E as ElAvatar } from './index-cffad930.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';
import { g as getNormalPath } from './util-8f61b923.mjs';
import { TinyColor } from '@ctrl/tinycolor';
import { _ as __nuxt_component_0$1 } from './client-only-29ef7f45.mjs';
import { u as useAsyncData } from './asyncData-caab651e.mjs';
import { f as getArticleCate } from './news-b55b8675.mjs';
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
import '@vue/reactivity';
import '@popperjs/core';

const composeRefs = (...refs) => {
  return (el) => {
    refs.forEach((ref2) => {
      if (isFunction(ref2)) {
        ref2(el);
      } else {
        ref2.value = el;
      }
    });
  };
};
const __default__ = /* @__PURE__ */ defineComponent({
  name: "ElCollapseTransition"
});
const _sfc_main$r = /* @__PURE__ */ defineComponent({
  ...__default__,
  setup(__props) {
    const ns = useNamespace("collapse-transition");
    const reset = (el) => {
      el.style.maxHeight = "";
      el.style.overflow = el.dataset.oldOverflow;
      el.style.paddingTop = el.dataset.oldPaddingTop;
      el.style.paddingBottom = el.dataset.oldPaddingBottom;
    };
    const on = {
      beforeEnter(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        if (el.style.height)
          el.dataset.elExistsHeight = el.style.height;
        el.style.maxHeight = 0;
        el.style.paddingTop = 0;
        el.style.paddingBottom = 0;
      },
      enter(el) {
        requestAnimationFrame(() => {
          el.dataset.oldOverflow = el.style.overflow;
          if (el.dataset.elExistsHeight) {
            el.style.maxHeight = el.dataset.elExistsHeight;
          } else if (el.scrollHeight !== 0) {
            el.style.maxHeight = `${el.scrollHeight}px`;
          } else {
            el.style.maxHeight = 0;
          }
          el.style.paddingTop = el.dataset.oldPaddingTop;
          el.style.paddingBottom = el.dataset.oldPaddingBottom;
          el.style.overflow = "hidden";
        });
      },
      afterEnter(el) {
        el.style.maxHeight = "";
        el.style.overflow = el.dataset.oldOverflow;
      },
      enterCancelled(el) {
        reset(el);
      },
      beforeLeave(el) {
        if (!el.dataset)
          el.dataset = {};
        el.dataset.oldPaddingTop = el.style.paddingTop;
        el.dataset.oldPaddingBottom = el.style.paddingBottom;
        el.dataset.oldOverflow = el.style.overflow;
        el.style.maxHeight = `${el.scrollHeight}px`;
        el.style.overflow = "hidden";
      },
      leave(el) {
        if (el.scrollHeight !== 0) {
          el.style.maxHeight = 0;
          el.style.paddingTop = 0;
          el.style.paddingBottom = 0;
        }
      },
      afterLeave(el) {
        reset(el);
      },
      leaveCancelled(el) {
        reset(el);
      }
    };
    return (_ctx, _cache) => {
      return openBlock(), createBlock(Transition, mergeProps({
        name: unref(ns).b()
      }, toHandlers(on)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16, ["name"]);
    };
  }
});
var CollapseTransition = /* @__PURE__ */ _export_sfc$1(_sfc_main$r, [["__file", "collapse-transition.vue"]]);
CollapseTransition.install = (app) => {
  app.component(CollapseTransition.name, CollapseTransition);
};
const _CollapseTransition = CollapseTransition;
const _sfc_main$q = /* @__PURE__ */ defineComponent({
  inheritAttrs: false
});
function _sfc_render$b(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var Collection = /* @__PURE__ */ _export_sfc$1(_sfc_main$q, [["render", _sfc_render$b], ["__file", "collection.vue"]]);
const _sfc_main$p = /* @__PURE__ */ defineComponent({
  name: "ElCollectionItem",
  inheritAttrs: false
});
function _sfc_render$a(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var CollectionItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$p, [["render", _sfc_render$a], ["__file", "collection-item.vue"]]);
const COLLECTION_ITEM_SIGN = `data-el-collection-item`;
const createCollectionWithScope = (name) => {
  const COLLECTION_NAME = `El${name}Collection`;
  const COLLECTION_ITEM_NAME = `${COLLECTION_NAME}Item`;
  const COLLECTION_INJECTION_KEY2 = Symbol(COLLECTION_NAME);
  const COLLECTION_ITEM_INJECTION_KEY2 = Symbol(COLLECTION_ITEM_NAME);
  const ElCollection2 = {
    ...Collection,
    name: COLLECTION_NAME,
    setup() {
      const collectionRef = ref(null);
      const itemMap = /* @__PURE__ */ new Map();
      const getItems = () => {
        const collectionEl = unref(collectionRef);
        if (!collectionEl)
          return [];
        const orderedNodes = Array.from(collectionEl.querySelectorAll(`[${COLLECTION_ITEM_SIGN}]`));
        const items = [...itemMap.values()];
        return items.sort((a, b) => orderedNodes.indexOf(a.ref) - orderedNodes.indexOf(b.ref));
      };
      provide(COLLECTION_INJECTION_KEY2, {
        itemMap,
        getItems,
        collectionRef
      });
    }
  };
  const ElCollectionItem2 = {
    ...CollectionItem,
    name: COLLECTION_ITEM_NAME,
    setup(_, { attrs }) {
      const collectionItemRef = ref(null);
      inject(COLLECTION_INJECTION_KEY2, void 0);
      provide(COLLECTION_ITEM_INJECTION_KEY2, {
        collectionItemRef
      });
    }
  };
  return {
    COLLECTION_INJECTION_KEY: COLLECTION_INJECTION_KEY2,
    COLLECTION_ITEM_INJECTION_KEY: COLLECTION_ITEM_INJECTION_KEY2,
    ElCollection: ElCollection2,
    ElCollectionItem: ElCollectionItem2
  };
};
const rovingFocusGroupProps = buildProps({
  style: { type: definePropType([String, Array, Object]) },
  currentTabId: {
    type: definePropType(String)
  },
  defaultCurrentTabId: String,
  loop: Boolean,
  dir: {
    type: String,
    values: ["ltr", "rtl"],
    default: "ltr"
  },
  orientation: {
    type: definePropType(String)
  },
  onBlur: Function,
  onFocus: Function,
  onMousedown: Function
});
const {
  ElCollection: ElCollection$1,
  ElCollectionItem: ElCollectionItem$1,
  COLLECTION_INJECTION_KEY: COLLECTION_INJECTION_KEY$1,
  COLLECTION_ITEM_INJECTION_KEY: COLLECTION_ITEM_INJECTION_KEY$1
} = createCollectionWithScope("RovingFocusGroup");
const ROVING_FOCUS_GROUP_INJECTION_KEY = Symbol("elRovingFocusGroup");
const ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY = Symbol("elRovingFocusGroupItem");
const MAP_KEY_TO_FOCUS_INTENT = {
  ArrowLeft: "prev",
  ArrowUp: "prev",
  ArrowRight: "next",
  ArrowDown: "next",
  PageUp: "first",
  Home: "first",
  PageDown: "last",
  End: "last"
};
const getDirectionAwareKey = (key, dir) => {
  if (dir !== "rtl")
    return key;
  switch (key) {
    case EVENT_CODE.right:
      return EVENT_CODE.left;
    case EVENT_CODE.left:
      return EVENT_CODE.right;
    default:
      return key;
  }
};
const getFocusIntent = (event, orientation, dir) => {
  const key = getDirectionAwareKey(event.key, dir);
  if (orientation === "vertical" && [EVENT_CODE.left, EVENT_CODE.right].includes(key))
    return void 0;
  if (orientation === "horizontal" && [EVENT_CODE.up, EVENT_CODE.down].includes(key))
    return void 0;
  return MAP_KEY_TO_FOCUS_INTENT[key];
};
const reorderArray = (array, atIdx) => {
  return array.map((_, idx) => array[(idx + atIdx) % array.length]);
};
const focusFirst = (elements) => {
  const { activeElement: prevActive } = document;
  for (const element of elements) {
    if (element === prevActive)
      return;
    element.focus();
    if (prevActive !== document.activeElement)
      return;
  }
};
const CURRENT_TAB_ID_CHANGE_EVT = "currentTabIdChange";
const ENTRY_FOCUS_EVT = "rovingFocusGroup.entryFocus";
const EVT_OPTS = { bubbles: false, cancelable: true };
const _sfc_main$o = /* @__PURE__ */ defineComponent({
  name: "ElRovingFocusGroupImpl",
  inheritAttrs: false,
  props: rovingFocusGroupProps,
  emits: [CURRENT_TAB_ID_CHANGE_EVT, "entryFocus"],
  setup(props, { emit }) {
    var _a;
    const currentTabbedId = ref((_a = props.currentTabId || props.defaultCurrentTabId) != null ? _a : null);
    const isBackingOut = ref(false);
    const isClickFocus = ref(false);
    const rovingFocusGroupRef = ref(null);
    const { getItems } = inject(COLLECTION_INJECTION_KEY$1, void 0);
    const rovingFocusGroupRootStyle = computed(() => {
      return [
        {
          outline: "none"
        },
        props.style
      ];
    });
    const onItemFocus = (tabbedId) => {
      emit(CURRENT_TAB_ID_CHANGE_EVT, tabbedId);
    };
    const onItemShiftTab = () => {
      isBackingOut.value = true;
    };
    const onMousedown = composeEventHandlers((e) => {
      var _a2;
      (_a2 = props.onMousedown) == null ? void 0 : _a2.call(props, e);
    }, () => {
      isClickFocus.value = true;
    });
    const onFocus = composeEventHandlers((e) => {
      var _a2;
      (_a2 = props.onFocus) == null ? void 0 : _a2.call(props, e);
    }, (e) => {
      const isKeyboardFocus = !unref(isClickFocus);
      const { target, currentTarget } = e;
      if (target === currentTarget && isKeyboardFocus && !unref(isBackingOut)) {
        const entryFocusEvt = new Event(ENTRY_FOCUS_EVT, EVT_OPTS);
        currentTarget == null ? void 0 : currentTarget.dispatchEvent(entryFocusEvt);
        if (!entryFocusEvt.defaultPrevented) {
          const items = getItems().filter((item) => item.focusable);
          const activeItem = items.find((item) => item.active);
          const currentItem = items.find((item) => item.id === unref(currentTabbedId));
          const candidates = [activeItem, currentItem, ...items].filter(Boolean);
          const candidateNodes = candidates.map((item) => item.ref);
          focusFirst(candidateNodes);
        }
      }
      isClickFocus.value = false;
    });
    const onBlur = composeEventHandlers((e) => {
      var _a2;
      (_a2 = props.onBlur) == null ? void 0 : _a2.call(props, e);
    }, () => {
      isBackingOut.value = false;
    });
    const handleEntryFocus = (...args) => {
      emit("entryFocus", ...args);
    };
    provide(ROVING_FOCUS_GROUP_INJECTION_KEY, {
      currentTabbedId: readonly(currentTabbedId),
      loop: toRef(props, "loop"),
      tabIndex: computed(() => {
        return unref(isBackingOut) ? -1 : 0;
      }),
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      orientation: toRef(props, "orientation"),
      dir: toRef(props, "dir"),
      onItemFocus,
      onItemShiftTab,
      onBlur,
      onFocus,
      onMousedown
    });
    watch(() => props.currentTabId, (val) => {
      currentTabbedId.value = val != null ? val : null;
    });
    useEventListener(rovingFocusGroupRef, ENTRY_FOCUS_EVT, handleEntryFocus);
  }
});
function _sfc_render$9(_ctx, _cache, $props, $setup, $data, $options) {
  return renderSlot(_ctx.$slots, "default");
}
var ElRovingFocusGroupImpl = /* @__PURE__ */ _export_sfc$1(_sfc_main$o, [["render", _sfc_render$9], ["__file", "roving-focus-group-impl.vue"]]);
const _sfc_main$n = /* @__PURE__ */ defineComponent({
  name: "ElRovingFocusGroup",
  components: {
    ElFocusGroupCollection: ElCollection$1,
    ElRovingFocusGroupImpl
  }
});
function _sfc_render$8(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_group_impl = resolveComponent("el-roving-focus-group-impl");
  const _component_el_focus_group_collection = resolveComponent("el-focus-group-collection");
  return openBlock(), createBlock(_component_el_focus_group_collection, null, {
    default: withCtx(() => [
      createVNode(_component_el_roving_focus_group_impl, normalizeProps(guardReactiveProps(_ctx.$attrs)), {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 16)
    ]),
    _: 3
  });
}
var ElRovingFocusGroup = /* @__PURE__ */ _export_sfc$1(_sfc_main$n, [["render", _sfc_render$8], ["__file", "roving-focus-group.vue"]]);
const _sfc_main$m = /* @__PURE__ */ defineComponent({
  components: {
    ElRovingFocusCollectionItem: ElCollectionItem$1
  },
  props: {
    focusable: {
      type: Boolean,
      default: true
    },
    active: {
      type: Boolean,
      default: false
    }
  },
  emits: ["mousedown", "focus", "keydown"],
  setup(props, { emit }) {
    const { currentTabbedId, loop, onItemFocus, onItemShiftTab } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
    const { getItems } = inject(COLLECTION_INJECTION_KEY$1, void 0);
    const id = useId();
    const rovingFocusGroupItemRef = ref(null);
    const handleMousedown = composeEventHandlers((e) => {
      emit("mousedown", e);
    }, (e) => {
      if (!props.focusable) {
        e.preventDefault();
      } else {
        onItemFocus(unref(id));
      }
    });
    const handleFocus = composeEventHandlers((e) => {
      emit("focus", e);
    }, () => {
      onItemFocus(unref(id));
    });
    const handleKeydown = composeEventHandlers((e) => {
      emit("keydown", e);
    }, (e) => {
      const { key, shiftKey, target, currentTarget } = e;
      if (key === EVENT_CODE.tab && shiftKey) {
        onItemShiftTab();
        return;
      }
      if (target !== currentTarget)
        return;
      const focusIntent = getFocusIntent(e);
      if (focusIntent) {
        e.preventDefault();
        const items = getItems().filter((item) => item.focusable);
        let elements = items.map((item) => item.ref);
        switch (focusIntent) {
          case "last": {
            elements.reverse();
            break;
          }
          case "prev":
          case "next": {
            if (focusIntent === "prev") {
              elements.reverse();
            }
            const currentIdx = elements.indexOf(currentTarget);
            elements = loop.value ? reorderArray(elements, currentIdx + 1) : elements.slice(currentIdx + 1);
            break;
          }
        }
        nextTick(() => {
          focusFirst(elements);
        });
      }
    });
    const isCurrentTab = computed(() => currentTabbedId.value === unref(id));
    provide(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, {
      rovingFocusGroupItemRef,
      tabIndex: computed(() => unref(isCurrentTab) ? 0 : -1),
      handleMousedown,
      handleFocus,
      handleKeydown
    });
    return {
      id,
      handleKeydown,
      handleFocus,
      handleMousedown
    };
  }
});
function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_roving_focus_collection_item = resolveComponent("el-roving-focus-collection-item");
  return openBlock(), createBlock(_component_el_roving_focus_collection_item, {
    id: _ctx.id,
    focusable: _ctx.focusable,
    active: _ctx.active
  }, {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 8, ["id", "focusable", "active"]);
}
var ElRovingFocusItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$m, [["render", _sfc_render$7], ["__file", "roving-focus-item.vue"]]);
const dropdownProps = buildProps({
  trigger: useTooltipTriggerProps.trigger,
  effect: {
    ...useTooltipContentProps.effect,
    default: "light"
  },
  type: {
    type: definePropType(String)
  },
  placement: {
    type: definePropType(String),
    default: "bottom"
  },
  popperOptions: {
    type: definePropType(Object),
    default: () => ({})
  },
  id: String,
  size: {
    type: String,
    default: ""
  },
  splitButton: Boolean,
  hideOnClick: {
    type: Boolean,
    default: true
  },
  loop: {
    type: Boolean,
    default: true
  },
  showTimeout: {
    type: Number,
    default: 150
  },
  hideTimeout: {
    type: Number,
    default: 150
  },
  tabindex: {
    type: definePropType([Number, String]),
    default: 0
  },
  maxHeight: {
    type: definePropType([Number, String]),
    default: ""
  },
  popperClass: {
    type: String,
    default: ""
  },
  disabled: {
    type: Boolean,
    default: false
  },
  role: {
    type: String,
    default: "menu"
  },
  buttonProps: {
    type: definePropType(Object)
  },
  teleported: useTooltipContentProps.teleported
});
const dropdownItemProps = buildProps({
  command: {
    type: [Object, String, Number],
    default: () => ({})
  },
  disabled: Boolean,
  divided: Boolean,
  textValue: String,
  icon: {
    type: iconPropType
  }
});
const dropdownMenuProps = buildProps({
  onKeydown: { type: definePropType(Function) }
});
const FIRST_KEYS = [
  EVENT_CODE.down,
  EVENT_CODE.pageDown,
  EVENT_CODE.home
];
const LAST_KEYS = [EVENT_CODE.up, EVENT_CODE.pageUp, EVENT_CODE.end];
const FIRST_LAST_KEYS = [...FIRST_KEYS, ...LAST_KEYS];
const {
  ElCollection,
  ElCollectionItem,
  COLLECTION_INJECTION_KEY,
  COLLECTION_ITEM_INJECTION_KEY
} = createCollectionWithScope("Dropdown");
const DROPDOWN_INJECTION_KEY = Symbol("elDropdown");
const { ButtonGroup: ElButtonGroup } = ElButton;
const _sfc_main$l = /* @__PURE__ */ defineComponent({
  name: "ElDropdown",
  components: {
    ElButton,
    ElButtonGroup,
    ElScrollbar,
    ElDropdownCollection: ElCollection,
    ElTooltip,
    ElRovingFocusGroup,
    ElOnlyChild: OnlyChild,
    ElIcon,
    ArrowDown: arrow_down_default
  },
  props: dropdownProps,
  emits: ["visible-change", "click", "command"],
  setup(props, { emit }) {
    const _instance = getCurrentInstance();
    const ns = useNamespace("dropdown");
    const { t } = useLocale();
    const triggeringElementRef = ref();
    const referenceElementRef = ref();
    const popperRef = ref(null);
    const contentRef = ref(null);
    const scrollbar = ref(null);
    const currentTabId = ref(null);
    const isUsingKeyboard = ref(false);
    const triggerKeys = [EVENT_CODE.enter, EVENT_CODE.space, EVENT_CODE.down];
    const wrapStyle = computed(() => ({
      maxHeight: addUnit(props.maxHeight)
    }));
    const dropdownTriggerKls = computed(() => [ns.m(dropdownSize.value)]);
    const trigger = computed(() => castArray(props.trigger));
    const defaultTriggerId = useId().value;
    const triggerId = computed(() => {
      return props.id || defaultTriggerId;
    });
    watch([triggeringElementRef, trigger], ([triggeringElement, trigger2], [prevTriggeringElement]) => {
      var _a, _b, _c;
      if ((_a = prevTriggeringElement == null ? void 0 : prevTriggeringElement.$el) == null ? void 0 : _a.removeEventListener) {
        prevTriggeringElement.$el.removeEventListener("pointerenter", onAutofocusTriggerEnter);
      }
      if ((_b = triggeringElement == null ? void 0 : triggeringElement.$el) == null ? void 0 : _b.removeEventListener) {
        triggeringElement.$el.removeEventListener("pointerenter", onAutofocusTriggerEnter);
      }
      if (((_c = triggeringElement == null ? void 0 : triggeringElement.$el) == null ? void 0 : _c.addEventListener) && trigger2.includes("hover")) {
        triggeringElement.$el.addEventListener("pointerenter", onAutofocusTriggerEnter);
      }
    }, { immediate: true });
    function handleClick() {
      handleClose();
    }
    function handleClose() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onClose();
    }
    function handleOpen() {
      var _a;
      (_a = popperRef.value) == null ? void 0 : _a.onOpen();
    }
    const dropdownSize = useFormSize();
    function commandHandler(...args) {
      emit("command", ...args);
    }
    function onAutofocusTriggerEnter() {
      var _a, _b;
      (_b = (_a = triggeringElementRef.value) == null ? void 0 : _a.$el) == null ? void 0 : _b.focus();
    }
    function onItemEnter() {
    }
    function onItemLeave() {
      const contentEl = unref(contentRef);
      trigger.value.includes("hover") && (contentEl == null ? void 0 : contentEl.focus());
      currentTabId.value = null;
    }
    function handleCurrentTabIdChange(id) {
      currentTabId.value = id;
    }
    function handleEntryFocus(e) {
      if (!isUsingKeyboard.value) {
        e.preventDefault();
        e.stopImmediatePropagation();
      }
    }
    function handleBeforeShowTooltip() {
      emit("visible-change", true);
    }
    function handleShowTooltip(event) {
      if ((event == null ? void 0 : event.type) === "keydown") {
        contentRef.value.focus();
      }
    }
    function handleBeforeHideTooltip() {
      emit("visible-change", false);
    }
    provide(DROPDOWN_INJECTION_KEY, {
      contentRef,
      role: computed(() => props.role),
      triggerId,
      isUsingKeyboard,
      onItemEnter,
      onItemLeave
    });
    provide("elDropdown", {
      instance: _instance,
      dropdownSize,
      handleClick,
      commandHandler,
      trigger: toRef(props, "trigger"),
      hideOnClick: toRef(props, "hideOnClick")
    });
    const onFocusAfterTrapped = (e) => {
      var _a, _b;
      e.preventDefault();
      (_b = (_a = contentRef.value) == null ? void 0 : _a.focus) == null ? void 0 : _b.call(_a, {
        preventScroll: true
      });
    };
    const handlerMainButtonClick = (event) => {
      emit("click", event);
    };
    return {
      t,
      ns,
      scrollbar,
      wrapStyle,
      dropdownTriggerKls,
      dropdownSize,
      triggerId,
      triggerKeys,
      currentTabId,
      handleCurrentTabIdChange,
      handlerMainButtonClick,
      handleEntryFocus,
      handleClose,
      handleOpen,
      handleBeforeShowTooltip,
      handleShowTooltip,
      handleBeforeHideTooltip,
      onFocusAfterTrapped,
      popperRef,
      contentRef,
      triggeringElementRef,
      referenceElementRef
    };
  }
});
function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_el_dropdown_collection = resolveComponent("el-dropdown-collection");
  const _component_el_roving_focus_group = resolveComponent("el-roving-focus-group");
  const _component_el_scrollbar = resolveComponent("el-scrollbar");
  const _component_el_only_child = resolveComponent("el-only-child");
  const _component_el_tooltip = resolveComponent("el-tooltip");
  const _component_el_button = resolveComponent("el-button");
  const _component_arrow_down = resolveComponent("arrow-down");
  const _component_el_icon = resolveComponent("el-icon");
  const _component_el_button_group = resolveComponent("el-button-group");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.ns.b(), _ctx.ns.is("disabled", _ctx.disabled)])
  }, [
    createVNode(_component_el_tooltip, {
      ref: "popperRef",
      role: _ctx.role,
      effect: _ctx.effect,
      "fallback-placements": ["bottom", "top"],
      "popper-options": _ctx.popperOptions,
      "gpu-acceleration": false,
      "hide-after": _ctx.trigger === "hover" ? _ctx.hideTimeout : 0,
      "manual-mode": true,
      placement: _ctx.placement,
      "popper-class": [_ctx.ns.e("popper"), _ctx.popperClass],
      "reference-element": (_a = _ctx.referenceElementRef) == null ? void 0 : _a.$el,
      trigger: _ctx.trigger,
      "trigger-keys": _ctx.triggerKeys,
      "trigger-target-el": _ctx.contentRef,
      "show-after": _ctx.trigger === "hover" ? _ctx.showTimeout : 0,
      "stop-popper-mouse-event": false,
      "virtual-ref": _ctx.triggeringElementRef,
      "virtual-triggering": _ctx.splitButton,
      disabled: _ctx.disabled,
      transition: `${_ctx.ns.namespace.value}-zoom-in-top`,
      teleported: _ctx.teleported,
      pure: "",
      persistent: "",
      onBeforeShow: _ctx.handleBeforeShowTooltip,
      onShow: _ctx.handleShowTooltip,
      onBeforeHide: _ctx.handleBeforeHideTooltip
    }, createSlots({
      content: withCtx(() => [
        createVNode(_component_el_scrollbar, {
          ref: "scrollbar",
          "wrap-style": _ctx.wrapStyle,
          tag: "div",
          "view-class": _ctx.ns.e("list")
        }, {
          default: withCtx(() => [
            createVNode(_component_el_roving_focus_group, {
              loop: _ctx.loop,
              "current-tab-id": _ctx.currentTabId,
              orientation: "horizontal",
              onCurrentTabIdChange: _ctx.handleCurrentTabIdChange,
              onEntryFocus: _ctx.handleEntryFocus
            }, {
              default: withCtx(() => [
                createVNode(_component_el_dropdown_collection, null, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "dropdown")
                  ]),
                  _: 3
                })
              ]),
              _: 3
            }, 8, ["loop", "current-tab-id", "onCurrentTabIdChange", "onEntryFocus"])
          ]),
          _: 3
        }, 8, ["wrap-style", "view-class"])
      ]),
      _: 2
    }, [
      !_ctx.splitButton ? {
        name: "default",
        fn: withCtx(() => [
          createVNode(_component_el_only_child, {
            id: _ctx.triggerId,
            ref: "triggeringElementRef",
            role: "button",
            tabindex: _ctx.tabindex
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 8, ["id", "tabindex"])
        ])
      } : void 0
    ]), 1032, ["role", "effect", "popper-options", "hide-after", "placement", "popper-class", "reference-element", "trigger", "trigger-keys", "trigger-target-el", "show-after", "virtual-ref", "virtual-triggering", "disabled", "transition", "teleported", "onBeforeShow", "onShow", "onBeforeHide"]),
    _ctx.splitButton ? (openBlock(), createBlock(_component_el_button_group, { key: 0 }, {
      default: withCtx(() => [
        createVNode(_component_el_button, mergeProps({ ref: "referenceElementRef" }, _ctx.buttonProps, {
          size: _ctx.dropdownSize,
          type: _ctx.type,
          disabled: _ctx.disabled,
          tabindex: _ctx.tabindex,
          onClick: _ctx.handlerMainButtonClick
        }), {
          default: withCtx(() => [
            renderSlot(_ctx.$slots, "default")
          ]),
          _: 3
        }, 16, ["size", "type", "disabled", "tabindex", "onClick"]),
        createVNode(_component_el_button, mergeProps({
          id: _ctx.triggerId,
          ref: "triggeringElementRef"
        }, _ctx.buttonProps, {
          role: "button",
          size: _ctx.dropdownSize,
          type: _ctx.type,
          class: _ctx.ns.e("caret-button"),
          disabled: _ctx.disabled,
          tabindex: _ctx.tabindex,
          "aria-label": _ctx.t("el.dropdown.toggleDropdown")
        }), {
          default: withCtx(() => [
            createVNode(_component_el_icon, {
              class: normalizeClass(_ctx.ns.e("icon"))
            }, {
              default: withCtx(() => [
                createVNode(_component_arrow_down)
              ]),
              _: 1
            }, 8, ["class"])
          ]),
          _: 1
        }, 16, ["id", "size", "type", "class", "disabled", "tabindex", "aria-label"])
      ]),
      _: 3
    })) : createCommentVNode("v-if", true)
  ], 2);
}
var Dropdown = /* @__PURE__ */ _export_sfc$1(_sfc_main$l, [["render", _sfc_render$6], ["__file", "dropdown.vue"]]);
const _sfc_main$k = /* @__PURE__ */ defineComponent({
  name: "DropdownItemImpl",
  components: {
    ElIcon
  },
  props: dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click", "clickimpl"],
  setup(_, { emit }) {
    const ns = useNamespace("dropdown");
    const { role: menuRole } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const { collectionItemRef: dropdownCollectionItemRef } = inject(COLLECTION_ITEM_INJECTION_KEY, void 0);
    const { collectionItemRef: rovingFocusCollectionItemRef } = inject(COLLECTION_ITEM_INJECTION_KEY$1, void 0);
    const {
      rovingFocusGroupItemRef,
      tabIndex,
      handleFocus,
      handleKeydown: handleItemKeydown,
      handleMousedown
    } = inject(ROVING_FOCUS_GROUP_ITEM_INJECTION_KEY, void 0);
    const itemRef = composeRefs(dropdownCollectionItemRef, rovingFocusCollectionItemRef, rovingFocusGroupItemRef);
    const role = computed(() => {
      if (menuRole.value === "menu") {
        return "menuitem";
      } else if (menuRole.value === "navigation") {
        return "link";
      }
      return "button";
    });
    const handleKeydown = composeEventHandlers((e) => {
      const { code } = e;
      if (code === EVENT_CODE.enter || code === EVENT_CODE.space) {
        e.preventDefault();
        e.stopImmediatePropagation();
        emit("clickimpl", e);
        return true;
      }
    }, handleItemKeydown);
    return {
      ns,
      itemRef,
      dataset: {
        [COLLECTION_ITEM_SIGN]: ""
      },
      role,
      tabIndex,
      handleFocus,
      handleKeydown,
      handleMousedown
    };
  }
});
const _hoisted_1$1 = ["aria-disabled", "tabindex", "role"];
function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_icon = resolveComponent("el-icon");
  return openBlock(), createElementBlock(Fragment, null, [
    _ctx.divided ? (openBlock(), createElementBlock("li", mergeProps({
      key: 0,
      role: "separator",
      class: _ctx.ns.bem("menu", "item", "divided")
    }, _ctx.$attrs), null, 16)) : createCommentVNode("v-if", true),
    createElementVNode("li", mergeProps({ ref: _ctx.itemRef }, { ..._ctx.dataset, ..._ctx.$attrs }, {
      "aria-disabled": _ctx.disabled,
      class: [_ctx.ns.be("menu", "item"), _ctx.ns.is("disabled", _ctx.disabled)],
      tabindex: _ctx.tabIndex,
      role: _ctx.role,
      onClick: _cache[0] || (_cache[0] = (e) => _ctx.$emit("clickimpl", e)),
      onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.handleFocus && _ctx.handleFocus(...args)),
      onKeydown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
      onMousedown: _cache[3] || (_cache[3] = (...args) => _ctx.handleMousedown && _ctx.handleMousedown(...args)),
      onPointermove: _cache[4] || (_cache[4] = (e) => _ctx.$emit("pointermove", e)),
      onPointerleave: _cache[5] || (_cache[5] = (e) => _ctx.$emit("pointerleave", e))
    }), [
      _ctx.icon ? (openBlock(), createBlock(_component_el_icon, { key: 0 }, {
        default: withCtx(() => [
          (openBlock(), createBlock(resolveDynamicComponent(_ctx.icon)))
        ]),
        _: 1
      })) : createCommentVNode("v-if", true),
      renderSlot(_ctx.$slots, "default")
    ], 16, _hoisted_1$1)
  ], 64);
}
var ElDropdownItemImpl = /* @__PURE__ */ _export_sfc$1(_sfc_main$k, [["render", _sfc_render$5], ["__file", "dropdown-item-impl.vue"]]);
const useDropdown = () => {
  const elDropdown = inject("elDropdown", {});
  const _elDropdownSize = computed(() => elDropdown == null ? void 0 : elDropdown.dropdownSize);
  return {
    elDropdown,
    _elDropdownSize
  };
};
const _sfc_main$j = /* @__PURE__ */ defineComponent({
  name: "ElDropdownItem",
  components: {
    ElDropdownCollectionItem: ElCollectionItem,
    ElRovingFocusItem,
    ElDropdownItemImpl
  },
  inheritAttrs: false,
  props: dropdownItemProps,
  emits: ["pointermove", "pointerleave", "click"],
  setup(props, { emit, attrs }) {
    const { elDropdown } = useDropdown();
    const _instance = getCurrentInstance();
    const itemRef = ref(null);
    const textContent = computed(() => {
      var _a, _b;
      return (_b = (_a = unref(itemRef)) == null ? void 0 : _a.textContent) != null ? _b : "";
    });
    const { onItemEnter, onItemLeave } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const handlePointerMove = composeEventHandlers((e) => {
      emit("pointermove", e);
      return e.defaultPrevented;
    }, whenMouse((e) => {
      if (props.disabled) {
        onItemLeave(e);
        return;
      }
      const target = e.currentTarget;
      if (target === document.activeElement || target.contains(document.activeElement)) {
        return;
      }
      onItemEnter(e);
      if (!e.defaultPrevented) {
        target == null ? void 0 : target.focus();
      }
    }));
    const handlePointerLeave = composeEventHandlers((e) => {
      emit("pointerleave", e);
      return e.defaultPrevented;
    }, whenMouse((e) => {
      onItemLeave(e);
    }));
    const handleClick = composeEventHandlers((e) => {
      if (props.disabled) {
        return;
      }
      emit("click", e);
      return e.type !== "keydown" && e.defaultPrevented;
    }, (e) => {
      var _a, _b, _c;
      if (props.disabled) {
        e.stopImmediatePropagation();
        return;
      }
      if ((_a = elDropdown == null ? void 0 : elDropdown.hideOnClick) == null ? void 0 : _a.value) {
        (_b = elDropdown.handleClick) == null ? void 0 : _b.call(elDropdown);
      }
      (_c = elDropdown.commandHandler) == null ? void 0 : _c.call(elDropdown, props.command, _instance, e);
    });
    const propsAndAttrs = computed(() => {
      return { ...props, ...attrs };
    });
    return {
      handleClick,
      handlePointerMove,
      handlePointerLeave,
      textContent,
      propsAndAttrs
    };
  }
});
function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_el_dropdown_item_impl = resolveComponent("el-dropdown-item-impl");
  const _component_el_roving_focus_item = resolveComponent("el-roving-focus-item");
  const _component_el_dropdown_collection_item = resolveComponent("el-dropdown-collection-item");
  return openBlock(), createBlock(_component_el_dropdown_collection_item, {
    disabled: _ctx.disabled,
    "text-value": (_a = _ctx.textValue) != null ? _a : _ctx.textContent
  }, {
    default: withCtx(() => [
      createVNode(_component_el_roving_focus_item, {
        focusable: !_ctx.disabled
      }, {
        default: withCtx(() => [
          createVNode(_component_el_dropdown_item_impl, mergeProps(_ctx.propsAndAttrs, {
            onPointerleave: _ctx.handlePointerLeave,
            onPointermove: _ctx.handlePointerMove,
            onClickimpl: _ctx.handleClick
          }), {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default")
            ]),
            _: 3
          }, 16, ["onPointerleave", "onPointermove", "onClickimpl"])
        ]),
        _: 3
      }, 8, ["focusable"])
    ]),
    _: 3
  }, 8, ["disabled", "text-value"]);
}
var DropdownItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$j, [["render", _sfc_render$4], ["__file", "dropdown-item.vue"]]);
const _sfc_main$i = /* @__PURE__ */ defineComponent({
  name: "ElDropdownMenu",
  props: dropdownMenuProps,
  setup(props) {
    const ns = useNamespace("dropdown");
    const { _elDropdownSize } = useDropdown();
    const size = _elDropdownSize.value;
    const { focusTrapRef, onKeydown } = inject(FOCUS_TRAP_INJECTION_KEY, void 0);
    const { contentRef, role, triggerId } = inject(DROPDOWN_INJECTION_KEY, void 0);
    const { collectionRef: dropdownCollectionRef, getItems } = inject(COLLECTION_INJECTION_KEY, void 0);
    const {
      rovingFocusGroupRef,
      rovingFocusGroupRootStyle,
      tabIndex,
      onBlur,
      onFocus,
      onMousedown
    } = inject(ROVING_FOCUS_GROUP_INJECTION_KEY, void 0);
    const { collectionRef: rovingFocusGroupCollectionRef } = inject(COLLECTION_INJECTION_KEY$1, void 0);
    const dropdownKls = computed(() => {
      return [ns.b("menu"), ns.bm("menu", size == null ? void 0 : size.value)];
    });
    const dropdownListWrapperRef = composeRefs(contentRef, dropdownCollectionRef, focusTrapRef, rovingFocusGroupRef, rovingFocusGroupCollectionRef);
    const composedKeydown = composeEventHandlers((e) => {
      var _a;
      (_a = props.onKeydown) == null ? void 0 : _a.call(props, e);
    }, (e) => {
      const { currentTarget, code, target } = e;
      currentTarget.contains(target);
      if (EVENT_CODE.tab === code) {
        e.stopImmediatePropagation();
      }
      e.preventDefault();
      if (target !== unref(contentRef))
        return;
      if (!FIRST_LAST_KEYS.includes(code))
        return;
      const items = getItems().filter((item) => !item.disabled);
      const targets = items.map((item) => item.ref);
      if (LAST_KEYS.includes(code)) {
        targets.reverse();
      }
      focusFirst(targets);
    });
    const handleKeydown = (e) => {
      composedKeydown(e);
      onKeydown(e);
    };
    return {
      size,
      rovingFocusGroupRootStyle,
      tabIndex,
      dropdownKls,
      role,
      triggerId,
      dropdownListWrapperRef,
      handleKeydown,
      onBlur,
      onFocus,
      onMousedown
    };
  }
});
const _hoisted_1 = ["role", "aria-labelledby"];
function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("ul", {
    ref: _ctx.dropdownListWrapperRef,
    class: normalizeClass(_ctx.dropdownKls),
    style: normalizeStyle(_ctx.rovingFocusGroupRootStyle),
    tabindex: -1,
    role: _ctx.role,
    "aria-labelledby": _ctx.triggerId,
    onBlur: _cache[0] || (_cache[0] = (...args) => _ctx.onBlur && _ctx.onBlur(...args)),
    onFocus: _cache[1] || (_cache[1] = (...args) => _ctx.onFocus && _ctx.onFocus(...args)),
    onKeydown: _cache[2] || (_cache[2] = withModifiers((...args) => _ctx.handleKeydown && _ctx.handleKeydown(...args), ["self"])),
    onMousedown: _cache[3] || (_cache[3] = withModifiers((...args) => _ctx.onMousedown && _ctx.onMousedown(...args), ["self"]))
  }, [
    renderSlot(_ctx.$slots, "default")
  ], 46, _hoisted_1);
}
var DropdownMenu = /* @__PURE__ */ _export_sfc$1(_sfc_main$i, [["render", _sfc_render$3], ["__file", "dropdown-menu.vue"]]);
const ElDropdown = withInstall(Dropdown, {
  DropdownItem,
  DropdownMenu
});
const ElDropdownItem = withNoopInstall(DropdownItem);
const ElDropdownMenu = withNoopInstall(DropdownMenu);
const _sfc_main$h = /* @__PURE__ */ defineComponent({
  name: "ElMenuCollapseTransition",
  setup() {
    const ns = useNamespace("menu");
    const listeners = {
      onBeforeEnter: (el) => el.style.opacity = "0.2",
      onEnter(el, done) {
        addClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "1";
        done();
      },
      onAfterEnter(el) {
        removeClass(el, `${ns.namespace.value}-opacity-transition`);
        el.style.opacity = "";
      },
      onBeforeLeave(el) {
        if (!el.dataset) {
          el.dataset = {};
        }
        if (hasClass(el, ns.m("collapse"))) {
          removeClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          addClass(el, ns.m("collapse"));
        } else {
          addClass(el, ns.m("collapse"));
          el.dataset.oldOverflow = el.style.overflow;
          el.dataset.scrollWidth = el.clientWidth.toString();
          removeClass(el, ns.m("collapse"));
        }
        el.style.width = `${el.scrollWidth}px`;
        el.style.overflow = "hidden";
      },
      onLeave(el) {
        addClass(el, "horizontal-collapse-transition");
        el.style.width = `${el.dataset.scrollWidth}px`;
      }
    };
    return {
      listeners
    };
  }
});
function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createBlock(Transition, mergeProps({ mode: "out-in" }, _ctx.listeners), {
    default: withCtx(() => [
      renderSlot(_ctx.$slots, "default")
    ]),
    _: 3
  }, 16);
}
var ElMenuCollapseTransition = /* @__PURE__ */ _export_sfc$1(_sfc_main$h, [["render", _sfc_render$2], ["__file", "menu-collapse-transition.vue"]]);
function useMenu$1(instance, currentIndex) {
  const indexPath = computed(() => {
    let parent = instance.parent;
    const path = [currentIndex.value];
    while (parent.type.name !== "ElMenu") {
      if (parent.props.index) {
        path.unshift(parent.props.index);
      }
      parent = parent.parent;
    }
    return path;
  });
  const parentMenu = computed(() => {
    let parent = instance.parent;
    while (parent && !["ElMenu", "ElSubMenu"].includes(parent.type.name)) {
      parent = parent.parent;
    }
    return parent;
  });
  return {
    parentMenu,
    indexPath
  };
}
function useMenuColor(props) {
  const menuBarColor = computed(() => {
    const color = props.backgroundColor;
    if (!color) {
      return "";
    } else {
      return new TinyColor(color).shade(20).toString();
    }
  });
  return menuBarColor;
}
const useMenuCssVar = (props, level) => {
  const ns = useNamespace("menu");
  return computed(() => {
    return ns.cssVarBlock({
      "text-color": props.textColor || "",
      "hover-text-color": props.textColor || "",
      "bg-color": props.backgroundColor || "",
      "hover-bg-color": useMenuColor(props).value || "",
      "active-color": props.activeTextColor || "",
      level: `${level}`
    });
  });
};
const subMenuProps = buildProps({
  index: {
    type: String,
    required: true
  },
  showTimeout: Number,
  hideTimeout: Number,
  popperClass: String,
  disabled: Boolean,
  popperAppendToBody: {
    type: Boolean,
    default: void 0
  },
  teleported: {
    type: Boolean,
    default: void 0
  },
  popperOffset: Number,
  expandCloseIcon: {
    type: iconPropType
  },
  expandOpenIcon: {
    type: iconPropType
  },
  collapseCloseIcon: {
    type: iconPropType
  },
  collapseOpenIcon: {
    type: iconPropType
  }
});
const COMPONENT_NAME$2 = "ElSubMenu";
var SubMenu = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME$2,
  props: subMenuProps,
  setup(props, { slots, expose }) {
    useDeprecated({
      from: "popper-append-to-body",
      replacement: "teleported",
      scope: COMPONENT_NAME$2,
      version: "2.3.0",
      ref: "https://element-plus.org/en-US/component/menu.html#submenu-attributes"
    }, computed(() => props.popperAppendToBody !== void 0));
    const instance = getCurrentInstance();
    const { indexPath, parentMenu } = useMenu$1(instance, computed(() => props.index));
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    const rootMenu = inject("rootMenu");
    if (!rootMenu)
      throwError(COMPONENT_NAME$2, "can not inject root menu");
    const subMenu = inject(`subMenu:${parentMenu.value.uid}`);
    if (!subMenu)
      throwError(COMPONENT_NAME$2, "can not inject sub menu");
    const items = ref({});
    const subMenus = ref({});
    let timeout;
    const mouseInChild = ref(false);
    const verticalTitleRef = ref();
    const vPopper = ref(null);
    const currentPlacement = computed(() => mode.value === "horizontal" && isFirstLevel.value ? "bottom-start" : "right-start");
    const subMenuTitleIcon = computed(() => {
      return mode.value === "horizontal" && isFirstLevel.value || mode.value === "vertical" && !rootMenu.props.collapse ? props.expandCloseIcon && props.expandOpenIcon ? opened.value ? props.expandOpenIcon : props.expandCloseIcon : arrow_down_default : props.collapseCloseIcon && props.collapseOpenIcon ? opened.value ? props.collapseOpenIcon : props.collapseCloseIcon : arrow_right_default;
    });
    const isFirstLevel = computed(() => {
      return subMenu.level === 0;
    });
    const appendToBody = computed(() => {
      var _a;
      const value = (_a = props.teleported) != null ? _a : props.popperAppendToBody;
      return value === void 0 ? isFirstLevel.value : value;
    });
    const menuTransitionName = computed(() => rootMenu.props.collapse ? `${nsMenu.namespace.value}-zoom-in-left` : `${nsMenu.namespace.value}-zoom-in-top`);
    const fallbackPlacements = computed(() => mode.value === "horizontal" && isFirstLevel.value ? [
      "bottom-start",
      "bottom-end",
      "top-start",
      "top-end",
      "right-start",
      "left-start"
    ] : [
      "right-start",
      "right",
      "right-end",
      "left-start",
      "bottom-start",
      "bottom-end",
      "top-start",
      "top-end"
    ]);
    const opened = computed(() => rootMenu.openedMenus.includes(props.index));
    const active = computed(() => {
      let isActive = false;
      Object.values(items.value).forEach((item2) => {
        if (item2.active) {
          isActive = true;
        }
      });
      Object.values(subMenus.value).forEach((subItem) => {
        if (subItem.active) {
          isActive = true;
        }
      });
      return isActive;
    });
    const mode = computed(() => rootMenu.props.mode);
    reactive({
      index: props.index,
      indexPath,
      active
    });
    const ulStyle = useMenuCssVar(rootMenu.props, subMenu.level + 1);
    const subMenuPopperOffset = computed(() => {
      var _a;
      return (_a = props.popperOffset) != null ? _a : rootMenu.props.popperOffset;
    });
    const subMenuPopperClass = computed(() => {
      var _a;
      return (_a = props.popperClass) != null ? _a : rootMenu.props.popperClass;
    });
    const subMenuShowTimeout = computed(() => {
      var _a;
      return (_a = props.showTimeout) != null ? _a : rootMenu.props.showTimeout;
    });
    const subMenuHideTimeout = computed(() => {
      var _a;
      return (_a = props.hideTimeout) != null ? _a : rootMenu.props.hideTimeout;
    });
    const doDestroy = () => {
      var _a, _b, _c;
      return (_c = (_b = (_a = vPopper.value) == null ? void 0 : _a.popperRef) == null ? void 0 : _b.popperInstanceRef) == null ? void 0 : _c.destroy();
    };
    const handleCollapseToggle = (value) => {
      if (!value) {
        doDestroy();
      }
    };
    const handleClick = () => {
      if (rootMenu.props.menuTrigger === "hover" && rootMenu.props.mode === "horizontal" || rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled)
        return;
      rootMenu.handleSubMenuClick({
        index: props.index,
        indexPath: indexPath.value,
        active: active.value
      });
    };
    const handleMouseenter = (event, showTimeout = subMenuShowTimeout.value) => {
      var _a;
      if (event.type === "focus") {
        return;
      }
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical" || props.disabled) {
        subMenu.mouseInChild.value = true;
        return;
      }
      subMenu.mouseInChild.value = true;
      timeout == null ? void 0 : timeout();
      ({ stop: timeout } = useTimeoutFn(() => {
        rootMenu.openMenu(props.index, indexPath.value);
      }, showTimeout));
      if (appendToBody.value) {
        (_a = parentMenu.value.vnode.el) == null ? void 0 : _a.dispatchEvent(new MouseEvent("mouseenter"));
      }
    };
    const handleMouseleave = (deepDispatch = false) => {
      var _a;
      if (rootMenu.props.menuTrigger === "click" && rootMenu.props.mode === "horizontal" || !rootMenu.props.collapse && rootMenu.props.mode === "vertical") {
        subMenu.mouseInChild.value = false;
        return;
      }
      timeout == null ? void 0 : timeout();
      subMenu.mouseInChild.value = false;
      ({ stop: timeout } = useTimeoutFn(() => !mouseInChild.value && rootMenu.closeMenu(props.index, indexPath.value), subMenuHideTimeout.value));
      if (appendToBody.value && deepDispatch) {
        (_a = subMenu.handleMouseleave) == null ? void 0 : _a.call(subMenu, true);
      }
    };
    watch(() => rootMenu.props.collapse, (value) => handleCollapseToggle(Boolean(value)));
    {
      const addSubMenu = (item2) => {
        subMenus.value[item2.index] = item2;
      };
      const removeSubMenu = (item2) => {
        delete subMenus.value[item2.index];
      };
      provide(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        handleMouseleave,
        mouseInChild,
        level: subMenu.level + 1
      });
    }
    expose({
      opened
    });
    return () => {
      var _a;
      const titleTag = [
        (_a = slots.title) == null ? void 0 : _a.call(slots),
        h(ElIcon, {
          class: nsSubMenu.e("icon-arrow"),
          style: {
            transform: opened.value ? props.expandCloseIcon && props.expandOpenIcon || props.collapseCloseIcon && props.collapseOpenIcon && rootMenu.props.collapse ? "none" : "rotateZ(180deg)" : "none"
          }
        }, {
          default: () => isString(subMenuTitleIcon.value) ? h(instance.appContext.components[subMenuTitleIcon.value]) : h(subMenuTitleIcon.value)
        })
      ];
      const child = rootMenu.isMenuPopup ? h(ElTooltip, {
        ref: vPopper,
        visible: opened.value,
        effect: "light",
        pure: true,
        offset: subMenuPopperOffset.value,
        showArrow: false,
        persistent: true,
        popperClass: subMenuPopperClass.value,
        placement: currentPlacement.value,
        teleported: appendToBody.value,
        fallbackPlacements: fallbackPlacements.value,
        transition: menuTransitionName.value,
        gpuAcceleration: false
      }, {
        content: () => {
          var _a2;
          return h("div", {
            class: [
              nsMenu.m(mode.value),
              nsMenu.m("popup-container"),
              subMenuPopperClass.value
            ],
            onMouseenter: (evt) => handleMouseenter(evt, 100),
            onMouseleave: () => handleMouseleave(true),
            onFocus: (evt) => handleMouseenter(evt, 100)
          }, [
            h("ul", {
              class: [
                nsMenu.b(),
                nsMenu.m("popup"),
                nsMenu.m(`popup-${currentPlacement.value}`)
              ],
              style: ulStyle.value
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)])
          ]);
        },
        default: () => h("div", {
          class: nsSubMenu.e("title"),
          onClick: handleClick
        }, titleTag)
      }) : h(Fragment, {}, [
        h("div", {
          class: nsSubMenu.e("title"),
          ref: verticalTitleRef,
          onClick: handleClick
        }, titleTag),
        h(_CollapseTransition, {}, {
          default: () => {
            var _a2;
            return withDirectives(h("ul", {
              role: "menu",
              class: [nsMenu.b(), nsMenu.m("inline")],
              style: ulStyle.value
            }, [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)]), [[vShow, opened.value]]);
          }
        })
      ]);
      return h("li", {
        class: [
          nsSubMenu.b(),
          nsSubMenu.is("active", active.value),
          nsSubMenu.is("opened", opened.value),
          nsSubMenu.is("disabled", props.disabled)
        ],
        role: "menuitem",
        ariaHaspopup: true,
        ariaExpanded: opened.value,
        onMouseenter: handleMouseenter,
        onMouseleave: () => handleMouseleave(),
        onFocus: handleMouseenter
      }, [child]);
    };
  }
});
const menuProps = buildProps({
  mode: {
    type: String,
    values: ["horizontal", "vertical"],
    default: "vertical"
  },
  defaultActive: {
    type: String,
    default: ""
  },
  defaultOpeneds: {
    type: definePropType(Array),
    default: () => mutable([])
  },
  uniqueOpened: Boolean,
  router: Boolean,
  menuTrigger: {
    type: String,
    values: ["hover", "click"],
    default: "hover"
  },
  collapse: Boolean,
  backgroundColor: String,
  textColor: String,
  activeTextColor: String,
  closeOnClickOutside: Boolean,
  collapseTransition: {
    type: Boolean,
    default: true
  },
  ellipsis: {
    type: Boolean,
    default: true
  },
  popperOffset: {
    type: Number,
    default: 6
  },
  ellipsisIcon: {
    type: iconPropType,
    default: () => more_default
  },
  popperEffect: {
    type: String,
    values: ["dark", "light"],
    default: "dark"
  },
  popperClass: String,
  showTimeout: {
    type: Number,
    default: 300
  },
  hideTimeout: {
    type: Number,
    default: 300
  }
});
const checkIndexPath = (indexPath) => Array.isArray(indexPath) && indexPath.every((path) => isString(path));
const menuEmits = {
  close: (index, indexPath) => isString(index) && checkIndexPath(indexPath),
  open: (index, indexPath) => isString(index) && checkIndexPath(indexPath),
  select: (index, indexPath, item, routerResult) => isString(index) && checkIndexPath(indexPath) && isObject(item) && (routerResult === void 0 || routerResult instanceof Promise)
};
var Menu$1 = /* @__PURE__ */ defineComponent({
  name: "ElMenu",
  props: menuProps,
  emits: menuEmits,
  setup(props, { emit, slots, expose }) {
    const instance = getCurrentInstance();
    const router = instance.appContext.config.globalProperties.$router;
    const menu = ref();
    const nsMenu = useNamespace("menu");
    const nsSubMenu = useNamespace("sub-menu");
    const sliceIndex = ref(-1);
    const openedMenus = ref(props.defaultOpeneds && !props.collapse ? props.defaultOpeneds.slice(0) : []);
    const activeIndex = ref(props.defaultActive);
    const items = ref({});
    const subMenus = ref({});
    const isMenuPopup = computed(() => {
      return props.mode === "horizontal" || props.mode === "vertical" && props.collapse;
    });
    const initMenu = () => {
      const activeItem = activeIndex.value && items.value[activeIndex.value];
      if (!activeItem || props.mode === "horizontal" || props.collapse)
        return;
      const indexPath = activeItem.indexPath;
      indexPath.forEach((index) => {
        const subMenu = subMenus.value[index];
        subMenu && openMenu(index, subMenu.indexPath);
      });
    };
    const openMenu = (index, indexPath) => {
      if (openedMenus.value.includes(index))
        return;
      if (props.uniqueOpened) {
        openedMenus.value = openedMenus.value.filter((index2) => indexPath.includes(index2));
      }
      openedMenus.value.push(index);
      emit("open", index, indexPath);
    };
    const close = (index) => {
      const i = openedMenus.value.indexOf(index);
      if (i !== -1) {
        openedMenus.value.splice(i, 1);
      }
    };
    const closeMenu = (index, indexPath) => {
      close(index);
      emit("close", index, indexPath);
    };
    const handleSubMenuClick = ({
      index,
      indexPath
    }) => {
      const isOpened = openedMenus.value.includes(index);
      if (isOpened) {
        closeMenu(index, indexPath);
      } else {
        openMenu(index, indexPath);
      }
    };
    const handleMenuItemClick = (menuItem) => {
      if (props.mode === "horizontal" || props.collapse) {
        openedMenus.value = [];
      }
      const { index, indexPath } = menuItem;
      if (isNil(index) || isNil(indexPath))
        return;
      if (props.router && router) {
        const route = menuItem.route || index;
        const routerResult = router.push(route).then((res) => {
          if (!res)
            activeIndex.value = index;
          return res;
        });
        emit("select", index, indexPath, { index, indexPath, route }, routerResult);
      } else {
        activeIndex.value = index;
        emit("select", index, indexPath, { index, indexPath });
      }
    };
    const updateActiveIndex = (val) => {
      const itemsInData = items.value;
      const item = itemsInData[val] || activeIndex.value && itemsInData[activeIndex.value] || itemsInData[props.defaultActive];
      if (item) {
        activeIndex.value = item.index;
      } else {
        activeIndex.value = val;
      }
    };
    const calcMenuItemWidth = (menuItem) => {
      const computedStyle = getComputedStyle(menuItem);
      const marginLeft = Number.parseInt(computedStyle.marginLeft, 10);
      const marginRight = Number.parseInt(computedStyle.marginRight, 10);
      return menuItem.offsetWidth + marginLeft + marginRight || 0;
    };
    const calcSliceIndex = () => {
      var _a, _b;
      if (!menu.value)
        return -1;
      const items2 = Array.from((_b = (_a = menu.value) == null ? void 0 : _a.childNodes) != null ? _b : []).filter((item) => item.nodeName !== "#comment" && (item.nodeName !== "#text" || item.nodeValue));
      const moreItemWidth = 64;
      const computedMenuStyle = getComputedStyle(menu.value);
      const paddingLeft = Number.parseInt(computedMenuStyle.paddingLeft, 10);
      const paddingRight = Number.parseInt(computedMenuStyle.paddingRight, 10);
      const menuWidth = menu.value.clientWidth - paddingLeft - paddingRight;
      let calcWidth = 0;
      let sliceIndex2 = 0;
      items2.forEach((item, index) => {
        calcWidth += calcMenuItemWidth(item);
        if (calcWidth <= menuWidth - moreItemWidth) {
          sliceIndex2 = index + 1;
        }
      });
      return sliceIndex2 === items2.length ? -1 : sliceIndex2;
    };
    const getIndexPath = (index) => subMenus.value[index].indexPath;
    const debounce = (fn, wait = 33.34) => {
      let timmer;
      return () => {
        timmer && clearTimeout(timmer);
        timmer = setTimeout(() => {
          fn();
        }, wait);
      };
    };
    let isFirstTimeRender = true;
    const handleResize = () => {
      const callback = () => {
        sliceIndex.value = -1;
        nextTick(() => {
          sliceIndex.value = calcSliceIndex();
        });
      };
      isFirstTimeRender ? callback() : debounce(callback)();
      isFirstTimeRender = false;
    };
    watch(() => props.defaultActive, (currentActive) => {
      if (!items.value[currentActive]) {
        activeIndex.value = "";
      }
      updateActiveIndex(currentActive);
    });
    watch(() => props.collapse, (value) => {
      if (value)
        openedMenus.value = [];
    });
    watch(items.value, initMenu);
    let resizeStopper;
    watchEffect(() => {
      if (props.mode === "horizontal" && props.ellipsis)
        resizeStopper = useResizeObserver(menu, handleResize).stop;
      else
        resizeStopper == null ? void 0 : resizeStopper();
    });
    const mouseInChild = ref(false);
    {
      const addSubMenu = (item) => {
        subMenus.value[item.index] = item;
      };
      const removeSubMenu = (item) => {
        delete subMenus.value[item.index];
      };
      const addMenuItem = (item) => {
        items.value[item.index] = item;
      };
      const removeMenuItem = (item) => {
        delete items.value[item.index];
      };
      provide("rootMenu", reactive({
        props,
        openedMenus,
        items,
        subMenus,
        activeIndex,
        isMenuPopup,
        addMenuItem,
        removeMenuItem,
        addSubMenu,
        removeSubMenu,
        openMenu,
        closeMenu,
        handleMenuItemClick,
        handleSubMenuClick
      }));
      provide(`subMenu:${instance.uid}`, {
        addSubMenu,
        removeSubMenu,
        mouseInChild,
        level: 0
      });
    }
    {
      const open = (index) => {
        const { indexPath } = subMenus.value[index];
        indexPath.forEach((i) => openMenu(i, indexPath));
      };
      expose({
        open,
        close,
        handleResize
      });
    }
    return () => {
      var _a, _b;
      let slot = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) != null ? _b : [];
      const vShowMore = [];
      if (props.mode === "horizontal" && menu.value) {
        const originalSlot = flattedChildren(slot);
        const slotDefault = sliceIndex.value === -1 ? originalSlot : originalSlot.slice(0, sliceIndex.value);
        const slotMore = sliceIndex.value === -1 ? [] : originalSlot.slice(sliceIndex.value);
        if ((slotMore == null ? void 0 : slotMore.length) && props.ellipsis) {
          slot = slotDefault;
          vShowMore.push(h(SubMenu, {
            index: "sub-menu-more",
            class: nsSubMenu.e("hide-arrow"),
            popperOffset: props.popperOffset
          }, {
            title: () => h(ElIcon, {
              class: nsSubMenu.e("icon-more")
            }, {
              default: () => h(props.ellipsisIcon)
            }),
            default: () => slotMore
          }));
        }
      }
      const ulStyle = useMenuCssVar(props, 0);
      const directives = props.closeOnClickOutside ? [
        [
          ClickOutside,
          () => {
            if (!openedMenus.value.length)
              return;
            if (!mouseInChild.value) {
              openedMenus.value.forEach((openedMenu) => emit("close", openedMenu, getIndexPath(openedMenu)));
              openedMenus.value = [];
            }
          }
        ]
      ] : [];
      const vMenu = withDirectives(h("ul", {
        key: String(props.collapse),
        role: "menubar",
        ref: menu,
        style: ulStyle.value,
        class: {
          [nsMenu.b()]: true,
          [nsMenu.m(props.mode)]: true,
          [nsMenu.m("collapse")]: props.collapse
        }
      }, [...slot, ...vShowMore]), directives);
      if (props.collapseTransition && props.mode === "vertical") {
        return h(ElMenuCollapseTransition, () => vMenu);
      }
      return vMenu;
    };
  }
});
const menuItemProps = buildProps({
  index: {
    type: definePropType([String, null]),
    default: null
  },
  route: {
    type: definePropType([String, Object])
  },
  disabled: Boolean
});
const menuItemEmits = {
  click: (item) => isString(item.index) && Array.isArray(item.indexPath)
};
const COMPONENT_NAME$1 = "ElMenuItem";
const _sfc_main$g = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME$1,
  components: {
    ElTooltip
  },
  props: menuItemProps,
  emits: menuItemEmits,
  setup(props, { emit }) {
    const instance = getCurrentInstance();
    const rootMenu = inject("rootMenu");
    const nsMenu = useNamespace("menu");
    const nsMenuItem = useNamespace("menu-item");
    if (!rootMenu)
      throwError(COMPONENT_NAME$1, "can not inject root menu");
    const { parentMenu, indexPath } = useMenu$1(instance, toRef(props, "index"));
    const subMenu = inject(`subMenu:${parentMenu.value.uid}`);
    if (!subMenu)
      throwError(COMPONENT_NAME$1, "can not inject sub menu");
    const active = computed(() => props.index === rootMenu.activeIndex);
    const item = reactive({
      index: props.index,
      indexPath,
      active
    });
    const handleClick = () => {
      if (!props.disabled) {
        rootMenu.handleMenuItemClick({
          index: props.index,
          indexPath: indexPath.value,
          route: props.route
        });
        emit("click", item);
      }
    };
    return {
      parentMenu,
      rootMenu,
      active,
      nsMenu,
      nsMenuItem,
      handleClick
    };
  }
});
function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
  const _component_el_tooltip = resolveComponent("el-tooltip");
  return openBlock(), createElementBlock("li", {
    class: normalizeClass([
      _ctx.nsMenuItem.b(),
      _ctx.nsMenuItem.is("active", _ctx.active),
      _ctx.nsMenuItem.is("disabled", _ctx.disabled)
    ]),
    role: "menuitem",
    tabindex: "-1",
    onClick: _cache[0] || (_cache[0] = (...args) => _ctx.handleClick && _ctx.handleClick(...args))
  }, [
    _ctx.parentMenu.type.name === "ElMenu" && _ctx.rootMenu.props.collapse && _ctx.$slots.title ? (openBlock(), createBlock(_component_el_tooltip, {
      key: 0,
      effect: _ctx.rootMenu.props.popperEffect,
      placement: "right",
      "fallback-placements": ["left"],
      persistent: ""
    }, {
      content: withCtx(() => [
        renderSlot(_ctx.$slots, "title")
      ]),
      default: withCtx(() => [
        createElementVNode("div", {
          class: normalizeClass(_ctx.nsMenu.be("tooltip", "trigger"))
        }, [
          renderSlot(_ctx.$slots, "default")
        ], 2)
      ]),
      _: 3
    }, 8, ["effect"])) : (openBlock(), createElementBlock(Fragment, { key: 1 }, [
      renderSlot(_ctx.$slots, "default"),
      renderSlot(_ctx.$slots, "title")
    ], 64))
  ], 2);
}
var MenuItem = /* @__PURE__ */ _export_sfc$1(_sfc_main$g, [["render", _sfc_render$1], ["__file", "menu-item.vue"]]);
const menuItemGroupProps = {
  title: String
};
const COMPONENT_NAME = "ElMenuItemGroup";
const _sfc_main$f = /* @__PURE__ */ defineComponent({
  name: COMPONENT_NAME,
  props: menuItemGroupProps,
  setup() {
    const ns = useNamespace("menu-item-group");
    return {
      ns
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return openBlock(), createElementBlock("li", {
    class: normalizeClass(_ctx.ns.b())
  }, [
    createElementVNode("div", {
      class: normalizeClass(_ctx.ns.e("title"))
    }, [
      !_ctx.$slots.title ? (openBlock(), createElementBlock(Fragment, { key: 0 }, [
        createTextVNode(toDisplayString(_ctx.title), 1)
      ], 64)) : renderSlot(_ctx.$slots, "title", { key: 1 })
    ], 2),
    createElementVNode("ul", null, [
      renderSlot(_ctx.$slots, "default")
    ])
  ], 2);
}
var MenuItemGroup = /* @__PURE__ */ _export_sfc$1(_sfc_main$f, [["render", _sfc_render], ["__file", "menu-item-group.vue"]]);
const ElMenu = withInstall(Menu$1, {
  MenuItem,
  MenuItemGroup,
  SubMenu
});
const ElMenuItem = withNoopInstall(MenuItem);
withNoopInstall(MenuItemGroup);
const ElSubMenu = withNoopInstall(SubMenu);
const _sfc_main$e = /* @__PURE__ */ defineComponent({
  __name: "user",
  __ssrInlineRender: true,
  setup(__props) {
    useAccount();
    const userStore = useUserStore();
    const handleCommand = async (command) => {
      switch (command) {
        case "logout":
          await feedback.confirm("\u786E\u5B9A\u9000\u51FA\u767B\u5F55\u5417\uFF1F");
          await logout();
          userStore.logout();
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(userStore).isLogin) {
        _push(ssrRenderComponent(unref(ElDropdown), { onCommand: handleCommand }, {
          dropdown: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(ElDropdownMenu), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: "/user/info" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ElDropdownItem), { command: "user" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`\u4E2A\u4EBA\u4FE1\u606F`);
                              } else {
                                return [
                                  createTextVNode("\u4E2A\u4EBA\u4FE1\u606F")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ElDropdownItem), { command: "user" }, {
                              default: withCtx(() => [
                                createTextVNode("\u4E2A\u4EBA\u4FE1\u606F")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: "/user/collection" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ElDropdownItem), { command: "collect" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` \u6211\u7684\u6536\u85CF `);
                              } else {
                                return [
                                  createTextVNode(" \u6211\u7684\u6536\u85CF ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ElDropdownItem), { command: "collect" }, {
                              default: withCtx(() => [
                                createTextVNode(" \u6211\u7684\u6536\u85CF ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_NuxtLink, { to: "/account/security" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ElDropdownItem), { command: "account" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` \u8D26\u53F7\u5B89\u5168 `);
                              } else {
                                return [
                                  createTextVNode(" \u8D26\u53F7\u5B89\u5168 ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ElDropdownItem), { command: "account" }, {
                              default: withCtx(() => [
                                createTextVNode(" \u8D26\u53F7\u5B89\u5168 ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(unref(ElDropdownItem), { command: "logout" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`\u9000\u51FA\u767B\u5F55`);
                        } else {
                          return [
                            createTextVNode("\u9000\u51FA\u767B\u5F55")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_NuxtLink, { to: "/user/info" }, {
                        default: withCtx(() => [
                          createVNode(unref(ElDropdownItem), { command: "user" }, {
                            default: withCtx(() => [
                              createTextVNode("\u4E2A\u4EBA\u4FE1\u606F")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtLink, { to: "/user/collection" }, {
                        default: withCtx(() => [
                          createVNode(unref(ElDropdownItem), { command: "collect" }, {
                            default: withCtx(() => [
                              createTextVNode(" \u6211\u7684\u6536\u85CF ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_NuxtLink, { to: "/account/security" }, {
                        default: withCtx(() => [
                          createVNode(unref(ElDropdownItem), { command: "account" }, {
                            default: withCtx(() => [
                              createTextVNode(" \u8D26\u53F7\u5B89\u5168 ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(unref(ElDropdownItem), { command: "logout" }, {
                        default: withCtx(() => [
                          createTextVNode("\u9000\u51FA\u767B\u5F55")
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
                createVNode(unref(ElDropdownMenu), null, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, { to: "/user/info" }, {
                      default: withCtx(() => [
                        createVNode(unref(ElDropdownItem), { command: "user" }, {
                          default: withCtx(() => [
                            createTextVNode("\u4E2A\u4EBA\u4FE1\u606F")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtLink, { to: "/user/collection" }, {
                      default: withCtx(() => [
                        createVNode(unref(ElDropdownItem), { command: "collect" }, {
                          default: withCtx(() => [
                            createTextVNode(" \u6211\u7684\u6536\u85CF ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_NuxtLink, { to: "/account/security" }, {
                      default: withCtx(() => [
                        createVNode(unref(ElDropdownItem), { command: "account" }, {
                          default: withCtx(() => [
                            createTextVNode(" \u8D26\u53F7\u5B89\u5168 ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(unref(ElDropdownItem), { command: "logout" }, {
                      default: withCtx(() => [
                        createTextVNode("\u9000\u51FA\u767B\u5F55")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ];
            }
          }),
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="flex items-center"${_scopeId}>`);
              _push2(ssrRenderComponent(unref(ElAvatar), {
                size: 25,
                src: unref(userStore).userInfo.avatar
              }, null, _parent2, _scopeId));
              _push2(`<div class="ml-1 text-white text-lg flex"${_scopeId}><span class="mr-2"${_scopeId}>\u4E2A\u4EBA\u4E2D\u5FC3</span>`);
              _push2(ssrRenderComponent(unref(ElIcon), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(arrow_down_default), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(arrow_down_default))
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</div></div>`);
            } else {
              return [
                createVNode("div", { class: "flex items-center" }, [
                  createVNode(unref(ElAvatar), {
                    size: 25,
                    src: unref(userStore).userInfo.avatar
                  }, null, 8, ["src"]),
                  createVNode("div", { class: "ml-1 text-white text-lg flex" }, [
                    createVNode("span", { class: "mr-2" }, "\u4E2A\u4EBA\u4E2D\u5FC3"),
                    createVNode(unref(ElIcon), null, {
                      default: withCtx(() => [
                        createVNode(unref(arrow_down_default))
                      ]),
                      _: 1
                    })
                  ])
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<div class="cursor-pointer text-lg"> \u767B\u5F55/\u6CE8\u518C </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/header/user.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const _sfc_main$d = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const searchKeyword = ref();
    const handleToSearch = () => {
      if (!searchKeyword.value)
        return feedback.msgError("\u8BF7\u8F93\u5165\u5173\u952E\u8BCD");
      router.push({
        path: "/information/search",
        query: {
          keywords: searchKeyword.value
        }
      });
    };
    watch(
      route,
      (routeNew) => {
        if (routeNew.path == "/information/search") {
          searchKeyword.value = routeNew.query.keywords;
        } else {
          searchKeyword.value = "";
        }
      },
      {
        immediate: true
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "w-[250px] search" }, _attrs))} data-v-a5c2cedb>`);
      _push(ssrRenderComponent(unref(ElInput), {
        modelValue: unref(searchKeyword),
        "onUpdate:modelValue": ($event) => isRef(searchKeyword) ? searchKeyword.value = $event : null,
        modelModifiers: { trim: true },
        placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD",
        "suffix-icon": unref(search_default),
        onKeyup: handleToSearch
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/header/search.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const Search = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-a5c2cedb"]]);
const _sfc_main$c = /* @__PURE__ */ defineComponent({
  __name: "logo",
  __ssrInlineRender: true,
  setup(__props) {
    const appStore = useAppStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      if (unref(appStore).getWebsiteConfig.pc_logo) {
        _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
          class: "flex",
          to: "/"
        }, _attrs), {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<img${ssrRenderAttr("src", unref(appStore).getWebsiteConfig.pc_logo)} class="h-[26px]"${_scopeId}>`);
            } else {
              return [
                createVNode("img", {
                  src: unref(appStore).getWebsiteConfig.pc_logo,
                  class: "h-[26px]"
                }, null, 8, ["src"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/header/logo.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const NAVBAR = [
  {
    name: "\u9996\u9875",
    path: "/"
  },
  {
    name: "\u8D44\u8BAF\u4E2D\u5FC3",
    path: "/information",
    component: "information"
  },
  {
    name: "\u79FB\u52A8\u7AEF",
    path: "/mobile",
    component: "mobile"
  },
  {
    name: "\u7BA1\u7406\u540E\u53F0",
    path: "/admin",
    component: "admin"
  }
];
const SIDEBAR = [
  {
    module: "personal",
    hidden: true,
    children: [
      {
        name: "\u4E2A\u4EBA\u4E2D\u5FC3",
        path: "/user",
        children: [
          {
            name: "\u4E2A\u4EBA\u4FE1\u606F",
            path: "info"
          },
          {
            name: "\u6211\u7684\u6536\u85CF",
            path: "collection"
          }
        ]
      },
      {
        name: "\u8D26\u6237\u8BBE\u7F6E",
        path: "/account",
        children: [
          {
            name: "\u8D26\u6237\u5B89\u5168",
            path: "security"
          }
        ]
      }
    ]
  }
];
function useMenu() {
  const menu = useState(() => NAVBAR, "$rhqQh4BJeQ");
  const route = useRoute();
  const sidebar = computed(() => getSidebar(route.meta.module));
  const hasSidebar = computed(() => sidebar.value.length);
  return {
    menu,
    sidebar,
    hasSidebar
  };
}
function getSidebar(module) {
  const queue = [];
  SIDEBAR.forEach((item) => queue.push(item));
  while (queue.length) {
    const item = queue.shift();
    if (item.module && item.module == module) {
      return item.children;
    }
    item.children && item.children.forEach((child) => queue.push(child));
  }
  return [];
}
const _sfc_main$b = /* @__PURE__ */ defineComponent({
  __name: "menu-item",
  __ssrInlineRender: true,
  props: {
    menuItem: {
      type: Object,
      default: () => ({})
    },
    routePath: {
      type: String,
      required: true
    }
  },
  setup(__props) {
    const props = __props;
    const hasShowChild = computed(() => {
      var _a;
      const children = (_a = props.menuItem.children) != null ? _a : [];
      return !!children.filter((item) => !(item == null ? void 0 : item.hidden)).length;
    });
    const resolvePath = (path) => {
      if (isExternal(path)) {
        return path;
      }
      const newPath = getNormalPath(`${props.routePath}/${path}`);
      return newPath;
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a;
      const _component_NuxtLink = __nuxt_component_0;
      const _component_MenuItem = resolveComponent("MenuItem", true);
      if (!((_a = __props.menuItem) == null ? void 0 : _a.hidden)) {
        _push(`<!--[-->`);
        if (!unref(hasShowChild)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: __props.routePath,
            class: "flex items-center w-full",
            custom: __props.menuItem.type == "custom",
            external: unref(isExternal)(__props.routePath),
            target: unref(isExternal)(__props.routePath) ? "_blank" : ""
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(unref(ElMenuItem), {
                  class: "w-full",
                  index: __props.routePath
                }, {
                  title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<span${_scopeId2}>${ssrInterpolate(__props.menuItem.name)}</span>`);
                    } else {
                      return [
                        createVNode("span", null, toDisplayString(__props.menuItem.name), 1)
                      ];
                    }
                  }),
                  _: 1
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(unref(ElMenuItem), {
                    class: "w-full",
                    index: __props.routePath
                  }, {
                    title: withCtx(() => [
                      createVNode("span", null, toDisplayString(__props.menuItem.name), 1)
                    ]),
                    _: 1
                  }, 8, ["index"])
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(ssrRenderComponent(unref(ElSubMenu), {
            index: __props.routePath,
            "popper-offset": 12
          }, {
            title: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<span${_scopeId}>${ssrInterpolate(__props.menuItem.name)}</span>`);
              } else {
                return [
                  createVNode("span", null, toDisplayString(__props.menuItem.name), 1)
                ];
              }
            }),
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<!--[-->`);
                ssrRenderList(__props.menuItem.children, (item) => {
                  _push2(ssrRenderComponent(_component_MenuItem, {
                    key: resolvePath(item.path),
                    "menu-item": item,
                    "route-path": resolvePath(item.path)
                  }, null, _parent2, _scopeId));
                });
                _push2(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(__props.menuItem.children, (item) => {
                    return openBlock(), createBlock(_component_MenuItem, {
                      key: resolvePath(item.path),
                      "menu-item": item,
                      "route-path": resolvePath(item.path)
                    }, null, 8, ["menu-item", "route-path"]);
                  }), 128))
                ];
              }
            }),
            _: 1
          }, _parent));
        }
        _push(`<!--]-->`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/menu/menu-item.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const _sfc_main$a = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    menu: {
      type: Array,
      default: () => []
    },
    ...menuProps
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ElMenu), mergeProps({ class: "menu" }, _ctx.$props, { ellipsis: true }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(__props.menu, (item) => {
              _push2(`<div data-v-858b94a4${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "item", { item }, () => {
                _push2(ssrRenderComponent(_sfc_main$b, {
                  "menu-item": item,
                  "route-path": item.path
                }, null, _parent2, _scopeId));
              }, _push2, _parent2, _scopeId);
              _push2(`</div>`);
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(true), createBlock(Fragment, null, renderList(__props.menu, (item) => {
                return openBlock(), createBlock("div", {
                  key: item.path
                }, [
                  renderSlot(_ctx.$slots, "item", { item }, () => [
                    createVNode(_sfc_main$b, {
                      "menu-item": item,
                      "route-path": item.path
                    }, null, 8, ["menu-item", "route-path"])
                  ], true)
                ]);
              }), 128))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/menu/index.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const Menu = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-858b94a4"]]);
const _sfc_main$9 = /* @__PURE__ */ defineComponent({
  __name: "admin",
  __ssrInlineRender: true,
  props: {
    menuItem: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const appStore = useAppStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: unref(appStore).getAdminUrl,
        target: "_blank"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(ElMenuItem), {
              index: __props.menuItem.path
            }, {
              title: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<span${_scopeId2}>${ssrInterpolate(__props.menuItem.name)}</span>`);
                } else {
                  return [
                    createVNode("span", null, toDisplayString(__props.menuItem.name), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(ElMenuItem), {
                index: __props.menuItem.path
              }, {
                title: withCtx(() => [
                  createVNode("span", null, toDisplayString(__props.menuItem.name), 1)
                ]),
                _: 1
              }, 8, ["index"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/header/admin.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "information",
  __ssrInlineRender: true,
  props: {
    menuItem: {
      type: Object,
      default: () => ({})
    }
  },
  async setup(__props) {
    let __temp, __restore;
    const { data } = ([__temp, __restore] = withAsyncContext(() => useAsyncData(() => getArticleCate(), "$W6AA6qpnyW")), __temp = await __temp, __restore(), __temp);
    computed(() => {
      return data.value && data.value.length;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, {}, _parent));
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/header/information.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "mobile",
  __ssrInlineRender: true,
  props: {
    menuItem: {
      type: Object,
      default: () => ({})
    }
  },
  setup(__props) {
    const appStore = useAppStore();
    computed(() => appStore.getQrcodeConfig.mnp);
    computed(() => appStore.getQrcodeConfig.oa);
    const showMobilePopup = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(unref(ElMenuItem), {
        index: __props.menuItem.path,
        onClick: ($event) => showMobilePopup.value = true
      }, {
        title: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span${_scopeId}>${ssrInterpolate(__props.menuItem.name)}</span>`);
          } else {
            return [
              createVNode("span", null, toDisplayString(__props.menuItem.name), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/header/mobile.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "navbar",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const activeMenu = computed(() => route.path);
    const { menu } = useMenu();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<nav${ssrRenderAttrs(_attrs)} data-v-229e85dd>`);
      _push(ssrRenderComponent(Menu, {
        class: "navbar",
        menu: unref(menu),
        "default-active": unref(activeMenu),
        mode: "horizontal"
      }, {
        item: withCtx(({ item }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (!item.component) {
              _push2(ssrRenderComponent(_sfc_main$b, {
                "menu-item": item,
                "route-path": item.path
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<div data-v-229e85dd${_scopeId}>`);
              if (item.component == "information") {
                _push2(ssrRenderComponent(_sfc_main$8, { "menu-item": item }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (item.component == "mobile") {
                _push2(ssrRenderComponent(_sfc_main$7, { "menu-item": item }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              if (item.component == "admin") {
                _push2(ssrRenderComponent(_sfc_main$9, { "menu-item": item }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            }
          } else {
            return [
              !item.component ? (openBlock(), createBlock(_sfc_main$b, {
                key: 0,
                "menu-item": item,
                "route-path": item.path
              }, null, 8, ["menu-item", "route-path"])) : (openBlock(), createBlock("div", { key: 1 }, [
                item.component == "information" ? (openBlock(), createBlock(_sfc_main$8, {
                  key: 0,
                  "menu-item": item
                }, null, 8, ["menu-item"])) : createCommentVNode("", true),
                item.component == "mobile" ? (openBlock(), createBlock(_sfc_main$7, {
                  key: 1,
                  "menu-item": item
                }, null, 8, ["menu-item"])) : createCommentVNode("", true),
                item.component == "admin" ? (openBlock(), createBlock(_sfc_main$9, {
                  key: 2,
                  "menu-item": item
                }, null, 8, ["menu-item"])) : createCommentVNode("", true)
              ]))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</nav>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/header/navbar.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const Navbar = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-229e85dd"]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<header${ssrRenderAttrs(mergeProps({ class: "layout-header text-white bg-primary" }, _attrs))} data-v-273b586b><div class="header-contain" data-v-273b586b>`);
      _push(ssrRenderComponent(_sfc_main$c, { class: "flex-none mr-4" }, null, _parent));
      _push(ssrRenderComponent(Navbar, { class: "w-[600px]" }, null, _parent));
      _push(`<div class="flex-1" data-v-273b586b></div>`);
      _push(ssrRenderComponent(Search, { class: "mr-[40px] flex-none" }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$e, { class: "flex-none" }, null, _parent));
      _push(`</div></header>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/header/index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const LayoutHeader = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-273b586b"]]);
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const activeMenu = computed(() => {
      var _a;
      return (_a = route.meta.activeMenu) != null ? _a : route.path;
    });
    const { sidebar, hasSidebar } = useMenu();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "mx-auto w-[1200px] py-4" }, _attrs))}>`);
      if (unref(sidebar).length) {
        _push(`<div class="mr-4 bg-white rounded-[8px] overflow-hidden">`);
        _push(ssrRenderComponent(Menu, {
          menu: unref(sidebar),
          "default-active": unref(activeMenu),
          mode: "vertical"
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([
        "layout-page flex-1 min-w-0 rounded-[8px]",
        {
          "bg-body": unref(hasSidebar)
        }
      ])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div></main>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/main/index.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
var PolicyAgreementEnum = /* @__PURE__ */ ((PolicyAgreementEnum2) => {
  PolicyAgreementEnum2["SERVICE"] = "service";
  PolicyAgreementEnum2["PRIVACY"] = "privacy";
  return PolicyAgreementEnum2;
})(PolicyAgreementEnum || {});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const appStore = useAppStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<footer${ssrRenderAttrs(mergeProps({ class: "layout-footer text-center bg-[#222222] py-[30px]" }, _attrs))}><div class="text-[#bebebe]">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/policy/${unref(PolicyAgreementEnum).SERVICE}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u7528\u6237\u534F\u8BAE `);
          } else {
            return [
              createTextVNode(" \u7528\u6237\u534F\u8BAE ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \uFF5C `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/policy/${unref(PolicyAgreementEnum).PRIVACY}`
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u9690\u79C1\u653F\u7B56 `);
          } else {
            return [
              createTextVNode(" \u9690\u79C1\u653F\u7B56 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` \uFF5C `);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/user/info" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` \u4F1A\u5458\u4E2D\u5FC3 `);
          } else {
            return [
              createTextVNode(" \u4F1A\u5458\u4E2D\u5FC3 ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="mt-4 text-tx-secondary"><!--[-->`);
      ssrRenderList(unref(appStore).getCopyrightConfig, (item) => {
        _push(`<a class="mx-1 hover:underline"${ssrRenderAttr("href", item.value)} target="_blank">${ssrInterpolate(item.key)}</a>`);
      });
      _push(`<!--]--></div></footer>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/footer/index.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { popupType, showPopup } = useAccount();
    const userStore = useUserStore();
    watch(showPopup, (value) => {
      if (!value)
        userStore.temToken = null;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      if (unref(showPopup)) {
        _push(`<div${ssrRenderAttrs(mergeProps({ class: "account" }, _attrs))}>`);
        _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/account/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "to-login",
  __ssrInlineRender: true,
  setup(__props) {
    const { setPopupType, toggleShowPopup } = useAccount();
    const toLogin = () => {
      setPopupType(PopupTypeEnum.LOGIN);
      toggleShowPopup(true);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col justify-center items-center" }, _attrs))}><div class="text-tx-regular mb-4">\u60A8\u8FD8\u672A\u767B\u5F55\uFF0C\u8BF7\u5148\u767B\u5F55</div>`);
      _push(ssrRenderComponent(unref(ElButton), { onClick: toLogin }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`\u767B\u5F55`);
          } else {
            return [
              createTextVNode("\u767B\u5F55")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/account/to-login.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const userStore = useUserStore();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "layout-default min-w-[1200px]" }, _attrs))} data-v-4ffa4ee5>`);
      _push(ssrRenderComponent(LayoutHeader, null, null, _parent));
      _push(`<div class="main-contain" data-v-4ffa4ee5>`);
      _push(ssrRenderComponent(_sfc_main$4, { class: "flex-1 min-h-0 flex" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(userStore).isLogin || !_ctx.$route.meta.auth) {
              ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
            } else {
              _push2(ssrRenderComponent(_sfc_main$1, { class: "h-full" }, null, _parent2, _scopeId));
            }
          } else {
            return [
              unref(userStore).isLogin || !_ctx.$route.meta.auth ? renderSlot(_ctx.$slots, "default", { key: 0 }, void 0, true) : (openBlock(), createBlock(_sfc_main$1, {
                key: 1,
                class: "h-full"
              }))
            ];
          }
        }),
        _: 3
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$3, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`</section>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _default = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4ffa4ee5"]]);

export { _default as default };
//# sourceMappingURL=default-e5e5797a.mjs.map
