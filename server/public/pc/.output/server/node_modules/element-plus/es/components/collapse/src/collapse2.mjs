import { defineComponent, ref, watch, provide, openBlock, createElementBlock, normalizeClass, unref, renderSlot } from 'vue';
import '../../../utils/index.mjs';
import '../../../constants/index.mjs';
import '../../../hooks/index.mjs';
import '../../../tokens/index.mjs';
import { collapseProps, collapseEmits } from './collapse.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { castArray } from 'lodash-unified';
import { UPDATE_MODEL_EVENT, CHANGE_EVENT } from '../../../constants/event.mjs';
import { collapseContextKey } from '../../../tokens/collapse.mjs';

const __default__ = defineComponent({
  name: "ElCollapse"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  props: collapseProps,
  emits: collapseEmits,
  setup(__props, { expose, emit }) {
    const props = __props;
    const ns = useNamespace("collapse");
    const activeNames = ref(castArray(props.modelValue));
    const setActiveNames = (_activeNames) => {
      activeNames.value = _activeNames;
      const value = props.accordion ? activeNames.value[0] : activeNames.value;
      emit(UPDATE_MODEL_EVENT, value);
      emit(CHANGE_EVENT, value);
    };
    const handleItemClick = (name) => {
      if (props.accordion) {
        setActiveNames([
          (activeNames.value[0] || activeNames.value[0] === 0) && activeNames.value[0] === name ? "" : name
        ]);
      } else {
        const _activeNames = [...activeNames.value];
        const index = _activeNames.indexOf(name);
        if (index > -1) {
          _activeNames.splice(index, 1);
        } else {
          _activeNames.push(name);
        }
        setActiveNames(_activeNames);
      }
    };
    watch(() => props.modelValue, () => activeNames.value = castArray(props.modelValue), { deep: true });
    provide(collapseContextKey, {
      activeNames,
      handleItemClick
    });
    expose({
      activeNames,
      setActiveNames
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("div", {
        class: normalizeClass(unref(ns).b()),
        role: "tablist",
        "aria-multiselectable": "true"
      }, [
        renderSlot(_ctx.$slots, "default")
      ], 2);
    };
  }
});
var Collapse = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/collapse/src/collapse.vue"]]);

export { Collapse as default };
//# sourceMappingURL=collapse2.mjs.map
