import { defineComponent, computed, provide, openBlock, createBlock, resolveDynamicComponent, normalizeClass, unref, normalizeStyle, withCtx, renderSlot } from 'vue';
import '../../../hooks/index.mjs';
import '../../../tokens/index.mjs';
import { rowProps } from './row.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { rowContextKey } from '../../../tokens/row.mjs';

const __default__ = defineComponent({
  name: "ElRow"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: rowProps,
  setup(__props) {
    const props = __props;
    const ns = useNamespace("row");
    const gutter = computed(() => props.gutter);
    provide(rowContextKey, {
      gutter
    });
    const style = computed(() => {
      const styles = {};
      if (!props.gutter) {
        return styles;
      }
      styles.marginRight = styles.marginLeft = `-${props.gutter / 2}px`;
      return styles;
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.tag), {
        class: normalizeClass([
          unref(ns).b(),
          unref(ns).is(`justify-${props.justify}`, _ctx.justify !== "start"),
          unref(ns).is(`align-${props.align}`, _ctx.align !== "top")
        ]),
        style: normalizeStyle(unref(style))
      }, {
        default: withCtx(() => [
          renderSlot(_ctx.$slots, "default")
        ]),
        _: 3
      }, 8, ["class", "style"]);
    };
  }
});
var Row = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/row/src/row.vue"]]);

export { Row as default };
//# sourceMappingURL=row2.mjs.map
