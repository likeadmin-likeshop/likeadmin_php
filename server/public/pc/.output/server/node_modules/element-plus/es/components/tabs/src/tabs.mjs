import { defineComponent, getCurrentInstance, ref, shallowReactive, shallowRef, computed, watch, nextTick, provide, createVNode, renderSlot } from 'vue';
import '../../../utils/index.mjs';
import '../../../constants/index.mjs';
import { ElIcon } from '../../icon/index.mjs';
import { Plus } from '@element-plus/icons-vue';
import '../../../tokens/index.mjs';
import '../../../hooks/index.mjs';
import TabNav from './tab-nav.mjs';
import { getOrderedPanes } from './utils/pane.mjs';
import { buildProps, definePropType } from '../../../utils/vue/props/runtime.mjs';
import { isString } from '@vue/shared';
import { isNumber } from '@vueuse/core';
import { UPDATE_MODEL_EVENT } from '../../../constants/event.mjs';
import { useNamespace } from '../../../hooks/use-namespace/index.mjs';
import { isUndefined } from '../../../utils/types.mjs';
import { useDeprecated } from '../../../hooks/use-deprecated/index.mjs';
import { tabsRootContextKey } from '../../../tokens/tabs.mjs';
import { EVENT_CODE } from '../../../constants/aria.mjs';

const tabsProps = buildProps({
  type: {
    type: String,
    values: ["card", "border-card", ""],
    default: ""
  },
  activeName: {
    type: [String, Number]
  },
  closable: Boolean,
  addable: Boolean,
  modelValue: {
    type: [String, Number]
  },
  editable: Boolean,
  tabPosition: {
    type: String,
    values: ["top", "right", "bottom", "left"],
    default: "top"
  },
  beforeLeave: {
    type: definePropType(Function),
    default: () => true
  },
  stretch: Boolean
});
const isPaneName = (value) => isString(value) || isNumber(value);
const tabsEmits = {
  [UPDATE_MODEL_EVENT]: (name) => isPaneName(name),
  tabClick: (pane, ev) => ev instanceof Event,
  tabChange: (name) => isPaneName(name),
  edit: (paneName, action) => ["remove", "add"].includes(action),
  tabRemove: (name) => isPaneName(name),
  tabAdd: () => true
};
var Tabs = defineComponent({
  name: "ElTabs",
  props: tabsProps,
  emits: tabsEmits,
  setup(props, {
    emit,
    slots,
    expose
  }) {
    var _a, _b;
    const vm = getCurrentInstance();
    const ns = useNamespace("tabs");
    const nav$ = ref();
    const panes = shallowReactive({});
    const orderedPanes = shallowRef([]);
    const currentName = ref((_b = (_a = props.modelValue) != null ? _a : props.activeName) != null ? _b : "0");
    const changeCurrentName = (value) => {
      currentName.value = value;
      emit(UPDATE_MODEL_EVENT, value);
      emit("tabChange", value);
    };
    const setCurrentName = async (value) => {
      var _a2, _b2, _c;
      if (currentName.value === value || isUndefined(value))
        return;
      try {
        const canLeave = await ((_a2 = props.beforeLeave) == null ? void 0 : _a2.call(props, value, currentName.value));
        if (canLeave !== false) {
          changeCurrentName(value);
          (_c = (_b2 = nav$.value) == null ? void 0 : _b2.removeFocus) == null ? void 0 : _c.call(_b2);
        }
      } catch (e) {
      }
    };
    const handleTabClick = (tab, tabName, event) => {
      if (tab.props.disabled)
        return;
      setCurrentName(tabName);
      emit("tabClick", tab, event);
    };
    const handleTabRemove = (pane, ev) => {
      if (pane.props.disabled || isUndefined(pane.props.name))
        return;
      ev.stopPropagation();
      emit("edit", pane.props.name, "remove");
      emit("tabRemove", pane.props.name);
    };
    const handleTabAdd = () => {
      emit("edit", void 0, "add");
      emit("tabAdd");
    };
    useDeprecated({
      from: '"activeName"',
      replacement: '"model-value" or "v-model"',
      scope: "ElTabs",
      version: "2.3.0",
      ref: "https://element-plus.org/en-US/component/tabs.html#attributes",
      type: "Attribute"
    }, computed(() => !!props.activeName));
    watch(() => props.activeName, (modelValue) => setCurrentName(modelValue));
    watch(() => props.modelValue, (modelValue) => setCurrentName(modelValue));
    watch(currentName, async () => {
      var _a2;
      await nextTick();
      (_a2 = nav$.value) == null ? void 0 : _a2.scrollToActiveTab();
    });
    {
      const registerPane = (pane) => {
        panes[pane.uid] = pane;
        orderedPanes.value = getOrderedPanes(vm, panes);
      };
      const unregisterPane = (uid) => {
        delete panes[uid];
        orderedPanes.value = getOrderedPanes(vm, panes);
      };
      provide(tabsRootContextKey, {
        props,
        currentName,
        registerPane,
        unregisterPane
      });
    }
    expose({
      currentName
    });
    return () => {
      const newButton = props.editable || props.addable ? createVNode("span", {
        "class": ns.e("new-tab"),
        "tabindex": "0",
        "onClick": handleTabAdd,
        "onKeydown": (ev) => {
          if (ev.code === EVENT_CODE.enter)
            handleTabAdd();
        }
      }, [createVNode(ElIcon, {
        "class": ns.is("icon-plus")
      }, {
        default: () => [createVNode(Plus, null, null)]
      })]) : null;
      const header = createVNode("div", {
        "class": [ns.e("header"), ns.is(props.tabPosition)]
      }, [newButton, createVNode(TabNav, {
        "ref": nav$,
        "currentName": currentName.value,
        "editable": props.editable,
        "type": props.type,
        "panes": orderedPanes.value,
        "stretch": props.stretch,
        "onTabClick": handleTabClick,
        "onTabRemove": handleTabRemove
      }, null)]);
      const panels = createVNode("div", {
        "class": ns.e("content")
      }, [renderSlot(slots, "default")]);
      return createVNode("div", {
        "class": [ns.b(), ns.m(props.tabPosition), {
          [ns.m("card")]: props.type === "card",
          [ns.m("border-card")]: props.type === "border-card"
        }]
      }, [...props.tabPosition !== "bottom" ? [header, panels] : [panels, header]]);
    };
  }
});

export { Tabs as default, tabsEmits, tabsProps };
//# sourceMappingURL=tabs.mjs.map
