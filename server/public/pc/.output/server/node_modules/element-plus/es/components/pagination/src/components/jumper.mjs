import { defineComponent, ref, computed, openBlock, createElementBlock, normalizeClass, unref, createTextVNode, toDisplayString, createVNode } from 'vue';
import '../../../../hooks/index.mjs';
import { ElInput } from '../../../input/index.mjs';
import { usePagination } from '../usePagination.mjs';
import _export_sfc from '../../../../_virtual/plugin-vue_export-helper.mjs';
import { useLocale } from '../../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../../hooks/use-namespace/index.mjs';

const _hoisted_1 = ["disabled"];
const __default__ = defineComponent({
  name: "ElPaginationJumper"
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  ...__default__,
  setup(__props) {
    const { t } = useLocale();
    const ns = useNamespace("pagination");
    const { pageCount, disabled, currentPage, changeEvent } = usePagination();
    const userInput = ref();
    const innerValue = computed(() => {
      var _a;
      return (_a = userInput.value) != null ? _a : currentPage == null ? void 0 : currentPage.value;
    });
    function handleInput(val) {
      userInput.value = +val;
    }
    function handleChange(val) {
      val = Math.trunc(+val);
      changeEvent == null ? void 0 : changeEvent(+val);
      userInput.value = void 0;
    }
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock("span", {
        class: normalizeClass(unref(ns).e("jump")),
        disabled: unref(disabled)
      }, [
        createTextVNode(toDisplayString(unref(t)("el.pagination.goto")) + " ", 1),
        createVNode(unref(ElInput), {
          size: "small",
          class: normalizeClass([unref(ns).e("editor"), unref(ns).is("in-pagination")]),
          min: 1,
          max: unref(pageCount),
          disabled: unref(disabled),
          "model-value": unref(innerValue),
          "validate-event": false,
          type: "number",
          "onUpdate:modelValue": handleInput,
          onChange: handleChange
        }, null, 8, ["class", "max", "disabled", "model-value"]),
        createTextVNode(" " + toDisplayString(unref(t)("el.pagination.pageClassifier")), 1)
      ], 10, _hoisted_1);
    };
  }
});
var Jumper = /* @__PURE__ */ _export_sfc(_sfc_main, [["__file", "/home/runner/work/element-plus/element-plus/packages/components/pagination/src/components/jumper.vue"]]);

export { Jumper as default };
//# sourceMappingURL=jumper.mjs.map
