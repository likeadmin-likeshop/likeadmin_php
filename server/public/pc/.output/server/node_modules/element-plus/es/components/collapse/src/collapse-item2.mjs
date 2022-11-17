import { defineComponent, inject, ref, computed, openBlock, createElementBlock, normalizeClass, unref, createElementVNode, withKeys, withModifiers, renderSlot, createTextVNode, toDisplayString, createVNode, withCtx, withDirectives, vShow } from 'vue';
import '../../../utils/index.mjs';
import _CollapseTransition from '../../collapse-transition/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { ArrowRight } from '@element-plus/icons-vue';
import '../../../hooks/index.mjs';
import '../../../tokens/index.mjs';
import { collapseItemProps } from './collapse-item.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { collapseContextKey } from '../../../tokens/collapse.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { generateId } from '../../../utils/rand.mjs';

const _hoisted_1 = ["aria-expanded", "aria-controls", "aria-describedby"];
const _hoisted_2 = ["id", "tabindex", "onKeypress"];
const _hoisted_3 = ["id", "aria-hidden", "aria-labelledby"];
const __default__ = defineComponent({
  name: "ElCollapseItem"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: collapseItemProps,
  setup(__props, { expose }) {
    const props = __props;
    const collapse = inject(collapseContextKey);
    const ns = useNamespace("collapse");
    const focusing = ref(false);
    const isClick = ref(false);
    const id = ref(generateId());
    const isActive = computed(() => collapse == null ? void 0 : collapse.activeNames.value.includes(props.name));
    const handleFocus = () => {
      setTimeout(() => {
        if (!isClick.value) {
          focusing.value = true;
        } else {
          isClick.value = false;
        }
      }, 50);
    };
    const handleHeaderClick = () => {
      if (props.disabled)
        return;
      collapse == null ? void 0 : collapse.handleItemClick(props.name);
      focusing.value = false;
      isClick.value = true;
    };
    const handleEnterClick = () => {
      collapse == null ? void 0 : collapse.handleItemClick(props.name);
    };
    expose({
      isActive
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass([
          unref(ns).b("item"),
          unref(ns).is("active", unref(isActive)),
          unref(ns).is("disabled", _ctx.disabled)
        ])
      }, [
        createElementVNode("div", {
          role: "tab",
          "aria-expanded": unref(isActive),
          "aria-controls": unref(ns).b(`content-${id.value}`),
          "aria-describedby": unref(ns).b(`content-${id.value}`)
        }, [
          createElementVNode("div", {
            id: unref(ns).b(`head-${id.value}`),
            class: normalizeClass([
              unref(ns).be("item", "header"),
              unref(ns).is("active", unref(isActive)),
              { focusing: focusing.value && !_ctx.disabled }
            ]),
            role: "button",
            tabindex: _ctx.disabled ? -1 : 0,
            onClick: handleHeaderClick,
            onKeypress: withKeys(withModifiers(handleEnterClick, ["stop", "prevent"]), ["space", "enter"]),
            onFocus: handleFocus,
            onBlur: _cache[0] || (_cache[0] = ($event) => focusing.value = false)
          }, [
            renderSlot(_ctx.$slots, "title", {}, () => [
              createTextVNode(toDisplayString(_ctx.title), 1)
            ]),
            createVNode(unref(ElIcon), {
              class: normalizeClass([unref(ns).be("item", "arrow"), unref(ns).is("active", unref(isActive))])
            }, {
              default: withCtx(() => [
                createVNode(unref(ArrowRight))
              ]),
              _: 1
            }, 8, ["class"])
          ], 42, _hoisted_2)
        ], 8, _hoisted_1),
        createVNode(unref(_CollapseTransition), null, {
          default: withCtx(() => [
            withDirectives(createElementVNode("div", {
              id: unref(ns).b(`content-${id.value}`),
              class: normalizeClass(unref(ns).be("item", "wrap")),
              role: "tabpanel",
              "aria-hidden": !unref(isActive),
              "aria-labelledby": unref(ns).b(`head-${id.value}`)
            }, [
              createElementVNode("div", {
                class: normalizeClass(unref(ns).be("item", "content"))
              }, [
                renderSlot(_ctx.$slots, "default")
              ], 2)
            ], 10, _hoisted_3), [
              [vShow, unref(isActive)]
            ])
          ]),
          _: 3
        })
      ], 2);
    };
  }
});
var CollapseItem = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/collapse/src/collapse-item.vue"]]);

export { CollapseItem as default };
//# sourceMappingURL=collapse-item2.mjs.map
