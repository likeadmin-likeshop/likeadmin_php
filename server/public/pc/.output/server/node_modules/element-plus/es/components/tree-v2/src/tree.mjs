import { defineComponent, provide, getCurrentInstance, resolveComponent, openBlock, createElementBlock, normalizeClass, createBlock, withCtx, normalizeStyle, createElementVNode, toDisplayString } from 'vue';
import '../../../hooks/index.mjs';
import '../../../tokens/index.mjs';
import '../../virtual-list/index.mjs';
import { useTree } from './composables/useTree.mjs';
import ElTreeNode from './tree-node.mjs';
import { treeProps, treeEmits, ROOT_TREE_INJECTION_KEY } from './virtual-tree.mjs';
import _export_sfc from '../../../_virtual/plugin-vue_export-helper.mjs';
import FixedSizeList from '../../virtual-list/src/components/fixed-size-list.mjs';
import { formItemContextKey } from '../../../tokens/form.mjs';
import { useLocale } from '../../../hooks/use-locale/index.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';

const _sfc_main = defineComponent({
  name: "ElTreeV2",
  components: {
    ElTreeNode,
    FixedSizeList
  },
  props: treeProps,
  emits: treeEmits,
  setup(props, ctx) {
    provide(ROOT_TREE_INJECTION_KEY, {
      ctx,
      props,
      instance: getCurrentInstance()
    });
    provide(formItemContextKey, void 0);
    const { t } = useLocale();
    const ns = useNamespace("tree");
    const {
      flattenTree,
      isNotEmpty,
      toggleExpand,
      isExpanded,
      isIndeterminate,
      isChecked,
      isDisabled,
      isCurrent,
      isForceHiddenExpandIcon,
      toggleCheckbox,
      handleNodeClick,
      handleNodeCheck,
      getCurrentNode,
      getCurrentKey,
      setCurrentKey,
      getCheckedKeys,
      getCheckedNodes,
      getHalfCheckedKeys,
      getHalfCheckedNodes,
      setChecked,
      setCheckedKeys,
      filter,
      setData,
      getNode,
      expandNode,
      collapseNode,
      setExpandedKeys
    } = useTree(props, ctx.emit);
    ctx.expose({
      getCurrentNode,
      getCurrentKey,
      setCurrentKey,
      getCheckedKeys,
      getCheckedNodes,
      getHalfCheckedKeys,
      getHalfCheckedNodes,
      setChecked,
      setCheckedKeys,
      filter,
      setData,
      getNode,
      expandNode,
      collapseNode,
      setExpandedKeys
    });
    return {
      t,
      ns,
      flattenTree,
      itemSize: 26,
      isNotEmpty,
      toggleExpand,
      toggleCheckbox,
      isExpanded,
      isIndeterminate,
      isChecked,
      isDisabled,
      isCurrent,
      isForceHiddenExpandIcon,
      handleNodeClick,
      handleNodeCheck
    };
  }
});
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  var _a;
  const _component_el_tree_node = resolveComponent("el-tree-node");
  const _component_fixed_size_list = resolveComponent("fixed-size-list");
  return openBlock(), createElementBlock("div", {
    class: normalizeClass([_ctx.ns.b(), { [_ctx.ns.m("highlight-current")]: _ctx.highlightCurrent }]),
    role: "tree"
  }, [
    _ctx.isNotEmpty ? (openBlock(), createBlock(_component_fixed_size_list, {
      key: 0,
      "class-name": _ctx.ns.b("virtual-list"),
      data: _ctx.flattenTree,
      total: _ctx.flattenTree.length,
      height: _ctx.height,
      "item-size": _ctx.itemSize,
      "perf-mode": _ctx.perfMode
    }, {
      default: withCtx(({ data, index, style }) => [
        (openBlock(), createBlock(_component_el_tree_node, {
          key: data[index].key,
          style: normalizeStyle(style),
          node: data[index],
          expanded: _ctx.isExpanded(data[index]),
          "show-checkbox": _ctx.showCheckbox,
          checked: _ctx.isChecked(data[index]),
          indeterminate: _ctx.isIndeterminate(data[index]),
          disabled: _ctx.isDisabled(data[index]),
          current: _ctx.isCurrent(data[index]),
          "hidden-expand-icon": _ctx.isForceHiddenExpandIcon(data[index]),
          onClick: _ctx.handleNodeClick,
          onToggle: _ctx.toggleExpand,
          onCheck: _ctx.handleNodeCheck
        }, null, 8, ["style", "node", "expanded", "show-checkbox", "checked", "indeterminate", "disabled", "current", "hidden-expand-icon", "onClick", "onToggle", "onCheck"]))
      ]),
      _: 1
    }, 8, ["class-name", "data", "total", "height", "item-size", "perf-mode"])) : (openBlock(), createElementBlock("div", {
      key: 1,
      class: normalizeClass(_ctx.ns.e("empty-block"))
    }, [
      createElementVNode("span", {
        class: normalizeClass(_ctx.ns.e("empty-text"))
      }, toDisplayString((_a = _ctx.emptyText) != null ? _a : _ctx.t("el.tree.emptyText")), 3)
    ], 2))
  ], 2);
}
var TreeV2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "/home/runner/work/element-plus/element-plus/packages/components/tree-v2/src/tree.vue"]]);

export { TreeV2 as default };
//# sourceMappingURL=tree.mjs.map
