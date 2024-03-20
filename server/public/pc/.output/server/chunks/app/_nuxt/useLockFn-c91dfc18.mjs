import { useSSRContext, ref, defineComponent, computed, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderVNode, ssrRenderAttrs, ssrRenderAttr } from 'vue/server-renderer';
import { s as EL_ICON_PREFIX, j as ElIcon, L as LOCAL_ICON_PREFIX } from '../server.mjs';
import { a as addUnit } from './util-8f61b923.mjs';
import { _ as _export_sfc } from './_plugin-vue_export-helper-cc2b3d55.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  props: {
    name: {
      type: String,
      required: true
    },
    size: {
      type: [Number, String],
      default: 16
    },
    color: {
      type: String,
      default: "inherit"
    }
  },
  setup(props) {
    const symbolId = computed(() => `#${props.name}`);
    const styles = computed(() => {
      return {
        width: addUnit(props.size),
        height: addUnit(props.size),
        color: props.color
      };
    });
    return { symbolId, styles };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    "aria-hidden": "true",
    style: _ctx.styles
  }, _attrs))}><use${ssrRenderAttr("xlink:href", _ctx.symbolId)} fill="currentColor"></use></svg>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/svg-icon.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const SvgIcon = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  props: {
    name: {
      type: String,
      default: ""
    },
    size: {
      type: [String, Number],
      default: "14px"
    },
    color: {
      type: String,
      default: "inherit"
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      if (__props.name.includes(unref(EL_ICON_PREFIX))) {
        _push(ssrRenderComponent(unref(ElIcon), props, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(__props.name), null, null), _parent2, _scopeId);
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(__props.name)))
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (__props.name.includes(unref(LOCAL_ICON_PREFIX))) {
        _push(`<span class="local-icon">`);
        _push(ssrRenderComponent(SvgIcon, props, null, _parent));
        _push(`</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
function useLockFn(fn) {
  const isLock = ref(false);
  const lockFn = async (...args) => {
    if (isLock.value)
      return;
    isLock.value = true;
    try {
      const res = await fn(...args);
      isLock.value = false;
      return res;
    } catch (e) {
      isLock.value = false;
      throw e;
    }
  };
  return {
    isLock,
    lockFn
  };
}

export { _sfc_main as _, useLockFn as u };
//# sourceMappingURL=useLockFn-c91dfc18.mjs.map
