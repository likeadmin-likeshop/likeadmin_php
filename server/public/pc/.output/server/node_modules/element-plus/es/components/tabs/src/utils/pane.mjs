import '../../../../utils/index.mjs';
import { flattedChildren } from '../../../../utils/vue/vnode.mjs';
import { isVNode } from 'vue';

const getTabPanes = (vm) => {
  const nodes = flattedChildren(vm.subTree);
  return nodes.filter((n) => {
    var _a;
    return isVNode(n) && ((_a = n.type) == null ? void 0 : _a.name) === "ElTabPane" && !!n.component;
  });
};
const getOrderedPanes = (vm, panes) => {
  const nodes = getTabPanes(vm);
  const uids = nodes.map((n) => n.component.uid);
  return uids.map((uid) => panes[uid]).filter((p) => !!p);
};

export { getOrderedPanes, getTabPanes };
//# sourceMappingURL=pane.mjs.map
