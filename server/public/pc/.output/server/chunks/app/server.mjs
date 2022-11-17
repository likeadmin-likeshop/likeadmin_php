import { getCurrentInstance, toRef, isRef, inject, computed, defineComponent, provide, h, Suspense, Transition, reactive, useSSRContext, unref, withCtx, createVNode, resolveDynamicComponent, openBlock, createBlock, ref, createElementBlock, mergeProps, renderSlot, toDisplayString, createCommentVNode, createTextVNode, shallowRef, defineAsyncComponent, resolveComponent, watchEffect, markRaw, createApp, effectScope, onErrorCaptured, watch, isReactive, toRaw, onUnmounted, nextTick, toRefs } from 'vue';
import { $fetch } from 'ohmyfetch';
import { joinURL, hasProtocol, isEqual, parseURL } from 'ufo';
import { createHooks } from 'hookable';
import { getContext, executeAsync } from 'unctx';
import { RouterView, createMemoryHistory, createRouter } from 'vue-router';
import destr from 'destr';
import { createError as createError$1, appendHeader, sendRedirect } from 'h3';
import defu, { defuFn } from 'defu';
import { isFunction } from '@vue/shared';
import { ssrRenderComponent, ssrRenderVNode, ssrRenderSlot, ssrInterpolate, ssrRenderClass, ssrRenderAttrs, ssrRenderList, ssrRenderAttr, ssrRenderSuspense } from 'vue/server-renderer';
import { ElIcon, ElImage, ElButton, ElEmpty, ID_INJECTION_KEY, ElConfigProvider, ElMessage, ElMessageBox, ElNotification, ElLoading } from 'element-plus';
import * as ElementPlusIcons from '@element-plus/icons-vue';
import { View, ArrowRight } from '@element-plus/icons-vue';
import { parse, serialize } from 'cookie-es';
import { isEqual as isEqual$1 } from 'ohash';
import { merge, isFunction as isFunction$1, isObject } from 'lodash-es';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import { a as useRuntimeConfig$1 } from '../nitro/node-server.mjs';
import 'node-fetch-native/polyfill';
import 'http';
import 'https';
import 'radix3';
import 'unenv/runtime/fetch/index';
import 'scule';
import 'unstorage';
import 'fs';
import 'pathe';
import 'url';

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
const appConfig = useRuntimeConfig$1().app;
const baseURL = () => appConfig.baseURL;
const buildAssetsDir = () => appConfig.buildAssetsDir;
const buildAssetsURL = (...path) => joinURL(publicAssetsURL(), buildAssetsDir(), ...path);
const publicAssetsURL = (...path) => {
  const publicBase = appConfig.cdnURL || appConfig.baseURL;
  return path.length ? joinURL(publicBase, ...path) : publicBase;
};
globalThis.__buildAssetsURL = buildAssetsURL;
globalThis.__publicAssetsURL = publicAssetsURL;
const nuxtAppCtx = getContext("nuxt-app");
const NuxtPluginIndicator = "__nuxt_plugin";
function createNuxtApp(options) {
  const nuxtApp = {
    provide: void 0,
    globalName: "nuxt",
    payload: reactive({
      data: {},
      state: {},
      _errors: {},
      ...{ serverRendered: true }
    }),
    isHydrating: false,
    _asyncDataPromises: {},
    _asyncData: {},
    ...options
  };
  nuxtApp.hooks = createHooks();
  nuxtApp.hook = nuxtApp.hooks.hook;
  nuxtApp.callHook = nuxtApp.hooks.callHook;
  nuxtApp.provide = (name, value) => {
    const $name = "$" + name;
    defineGetter(nuxtApp, $name, value);
    defineGetter(nuxtApp.vueApp.config.globalProperties, $name, value);
  };
  defineGetter(nuxtApp.vueApp, "$nuxt", nuxtApp);
  defineGetter(nuxtApp.vueApp.config.globalProperties, "$nuxt", nuxtApp);
  {
    if (nuxtApp.ssrContext) {
      nuxtApp.ssrContext.nuxt = nuxtApp;
    }
    nuxtApp.ssrContext = nuxtApp.ssrContext || {};
    if (nuxtApp.ssrContext.payload) {
      Object.assign(nuxtApp.payload, nuxtApp.ssrContext.payload);
    }
    nuxtApp.ssrContext.payload = nuxtApp.payload;
    nuxtApp.payload.config = {
      public: options.ssrContext.runtimeConfig.public,
      app: options.ssrContext.runtimeConfig.app
    };
  }
  const runtimeConfig = options.ssrContext.runtimeConfig;
  const compatibilityConfig = new Proxy(runtimeConfig, {
    get(target, prop) {
      var _a;
      if (prop === "public") {
        return target.public;
      }
      return (_a = target[prop]) != null ? _a : target.public[prop];
    },
    set(target, prop, value) {
      {
        return false;
      }
    }
  });
  nuxtApp.provide("config", compatibilityConfig);
  return nuxtApp;
}
async function applyPlugin(nuxtApp, plugin) {
  if (typeof plugin !== "function") {
    return;
  }
  const { provide: provide2 } = await callWithNuxt(nuxtApp, plugin, [nuxtApp]) || {};
  if (provide2 && typeof provide2 === "object") {
    for (const key in provide2) {
      nuxtApp.provide(key, provide2[key]);
    }
  }
}
async function applyPlugins(nuxtApp, plugins2) {
  for (const plugin of plugins2) {
    await applyPlugin(nuxtApp, plugin);
  }
}
function normalizePlugins(_plugins2) {
  const plugins2 = _plugins2.map((plugin) => {
    if (typeof plugin !== "function") {
      return null;
    }
    if (plugin.length > 1) {
      return (nuxtApp) => plugin(nuxtApp, nuxtApp.provide);
    }
    return plugin;
  }).filter(Boolean);
  return plugins2;
}
function defineNuxtPlugin(plugin) {
  plugin[NuxtPluginIndicator] = true;
  return plugin;
}
function callWithNuxt(nuxt, setup, args) {
  const fn = () => args ? setup(...args) : setup();
  {
    return nuxtAppCtx.callAsync(nuxt, fn);
  }
}
function useNuxtApp() {
  const nuxtAppInstance = nuxtAppCtx.tryUse();
  if (!nuxtAppInstance) {
    const vm = getCurrentInstance();
    if (!vm) {
      throw new Error("nuxt instance unavailable");
    }
    return vm.appContext.app.$nuxt;
  }
  return nuxtAppInstance;
}
function useRuntimeConfig() {
  return useNuxtApp().$config;
}
function defineGetter(obj, key, val) {
  Object.defineProperty(obj, key, { get: () => val });
}
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = "$s" + _key;
  const nuxt = useNuxtApp();
  const state = toRef(nuxt.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxt.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useError = () => toRef(useNuxtApp().payload, "error");
const showError = (_err) => {
  const err = createError(_err);
  try {
    const nuxtApp = useNuxtApp();
    nuxtApp.callHook("app:error", err);
    const error = useError();
    error.value = error.value || err;
  } catch {
    throw err;
  }
  return err;
};
const createError = (err) => {
  const _err = createError$1(err);
  _err.__nuxt_error = true;
  return _err;
};
function useRequestEvent(nuxtApp = useNuxtApp()) {
  var _a;
  return (_a = nuxtApp.ssrContext) == null ? void 0 : _a.event;
}
const CookieDefaults = {
  path: "/",
  decode: (val) => destr(decodeURIComponent(val)),
  encode: (val) => encodeURIComponent(typeof val === "string" ? val : JSON.stringify(val))
};
function useCookie(name, _opts) {
  var _a, _b;
  const opts = { ...CookieDefaults, ..._opts };
  const cookies = readRawCookies(opts) || {};
  const cookie = ref((_b = cookies[name]) != null ? _b : (_a = opts.default) == null ? void 0 : _a.call(opts));
  {
    const nuxtApp = useNuxtApp();
    const writeFinalCookieValue = () => {
      if (!isEqual$1(cookie.value, cookies[name])) {
        writeServerCookie(useRequestEvent(nuxtApp), name, cookie.value, opts);
      }
    };
    const unhook = nuxtApp.hooks.hookOnce("app:rendered", writeFinalCookieValue);
    nuxtApp.hooks.hookOnce("app:redirected", () => {
      unhook();
      return writeFinalCookieValue();
    });
  }
  return cookie;
}
function readRawCookies(opts = {}) {
  var _a;
  {
    return parse(((_a = useRequestEvent()) == null ? void 0 : _a.req.headers.cookie) || "", opts);
  }
}
function serializeCookie(name, value, opts = {}) {
  if (value === null || value === void 0) {
    return serialize(name, value, { ...opts, maxAge: -1 });
  }
  return serialize(name, value, opts);
}
function writeServerCookie(event, name, value, opts = {}) {
  if (event) {
    appendHeader(event, "Set-Cookie", serializeCookie(name, value, opts));
  }
}
const useRouter = () => {
  var _a;
  return (_a = useNuxtApp()) == null ? void 0 : _a.$router;
};
const useRoute = () => {
  if (getCurrentInstance()) {
    return inject("_route", useNuxtApp()._route);
  }
  return useNuxtApp()._route;
};
const defineNuxtRouteMiddleware = (middleware) => middleware;
const navigateTo = (to, options) => {
  if (!to) {
    to = "/";
  }
  const toPath = typeof to === "string" ? to : to.path || "/";
  const isExternal2 = hasProtocol(toPath, true);
  if (isExternal2 && !(options == null ? void 0 : options.external)) {
    throw new Error("Navigating to external URL is not allowed by default. Use `nagivateTo (url, { external: true })`.");
  }
  if (isExternal2 && parseURL(toPath).protocol === "script:") {
    throw new Error("Cannot navigate to an URL with script protocol.");
  }
  const router = useRouter();
  {
    const nuxtApp = useNuxtApp();
    if (nuxtApp.ssrContext && nuxtApp.ssrContext.event) {
      const redirectLocation = isExternal2 ? toPath : joinURL(useRuntimeConfig().app.baseURL, router.resolve(to).fullPath || "/");
      return nuxtApp.callHook("app:redirected").then(() => sendRedirect(nuxtApp.ssrContext.event, redirectLocation, (options == null ? void 0 : options.redirectCode) || 302));
    }
  }
  if (isExternal2) {
    if (options == null ? void 0 : options.replace) {
      location.replace(toPath);
    } else {
      location.href = toPath;
    }
    return Promise.resolve();
  }
  return (options == null ? void 0 : options.replace) ? router.replace(to) : router.push(to);
};
const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  return defineComponent({
    name: componentName,
    props: {
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const to = computed(() => {
        return props.to || props.href || "";
      });
      const isExternal2 = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, true);
      });
      const prefetched = ref(false);
      return () => {
        var _a, _b, _c;
        if (!isExternal2.value) {
          return h(
            resolveComponent("RouterLink"),
            {
              ref: void 0,
              to: to.value,
              ...prefetched.value && !props.custom ? { class: props.prefetchedClass || options.prefetchedClass } : {},
              activeClass: props.activeClass || options.activeClass,
              exactActiveClass: props.exactActiveClass || options.exactActiveClass,
              replace: props.replace,
              ariaCurrentValue: props.ariaCurrentValue,
              custom: props.custom
            },
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_b = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _b : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          return slots.default({
            href,
            navigate,
            route: router.resolve(href),
            rel,
            target,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { href, rel, target }, (_c = slots.default) == null ? void 0 : _c.call(slots));
      };
    }
  });
}
const __nuxt_component_0$2 = defineNuxtLink({ componentName: "NuxtLink" });
const inlineConfig = {};
defuFn(inlineConfig);
function useHead(meta2) {
  const resolvedMeta = isFunction(meta2) ? computed(meta2) : meta2;
  useNuxtApp()._useHead(resolvedMeta);
}
const components = {};
const _nuxt_components_plugin_mjs_KR1HBZs4kY = defineNuxtPlugin((nuxtApp) => {
  for (const name in components) {
    nuxtApp.vueApp.component(name, components[name]);
    nuxtApp.vueApp.component("Lazy" + name, components[name]);
  }
});
var PROVIDE_KEY = `usehead`;
var HEAD_COUNT_KEY = `head:count`;
var HEAD_ATTRS_KEY = `data-head-attrs`;
var SELF_CLOSING_TAGS = ["meta", "link", "base"];
var BODY_TAG_ATTR_NAME = `data-meta-body`;
var createElement = (tag, attrs, document2) => {
  const el = document2.createElement(tag);
  for (const key of Object.keys(attrs)) {
    if (key === "body" && attrs.body === true) {
      el.setAttribute(BODY_TAG_ATTR_NAME, "true");
    } else {
      let value = attrs[key];
      if (key === "renderPriority" || key === "key" || value === false) {
        continue;
      }
      if (key === "children") {
        el.textContent = value;
      } else {
        el.setAttribute(key, value);
      }
    }
  }
  return el;
};
var stringifyAttrName = (str) => str.replace(/[\s"'><\/=]/g, "").replace(/[^a-zA-Z0-9_-]/g, "");
var stringifyAttrValue = (str) => str.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
var stringifyAttrs = (attributes) => {
  const handledAttributes = [];
  for (let [key, value] of Object.entries(attributes)) {
    if (key === "children" || key === "key") {
      continue;
    }
    if (value === false || value == null) {
      continue;
    }
    let attribute = stringifyAttrName(key);
    if (value !== true) {
      attribute += `="${stringifyAttrValue(String(value))}"`;
    }
    handledAttributes.push(attribute);
  }
  return handledAttributes.length > 0 ? " " + handledAttributes.join(" ") : "";
};
function isEqualNode(oldTag, newTag) {
  if (oldTag instanceof HTMLElement && newTag instanceof HTMLElement) {
    const nonce = newTag.getAttribute("nonce");
    if (nonce && !oldTag.getAttribute("nonce")) {
      const cloneTag = newTag.cloneNode(true);
      cloneTag.setAttribute("nonce", "");
      cloneTag.nonce = nonce;
      return nonce === oldTag.nonce && oldTag.isEqualNode(cloneTag);
    }
  }
  return oldTag.isEqualNode(newTag);
}
var tagDedupeKey = (tag) => {
  if (!["meta", "base", "script", "link"].includes(tag.tag)) {
    return false;
  }
  const { props, tag: tagName } = tag;
  if (tagName === "base") {
    return "base";
  }
  if (tagName === "link" && props.rel === "canonical") {
    return "canonical";
  }
  if (props.charset) {
    return "charset";
  }
  const name = ["key", "id", "name", "property", "http-equiv"];
  for (const n of name) {
    let value = void 0;
    if (typeof props.getAttribute === "function" && props.hasAttribute(n)) {
      value = props.getAttribute(n);
    } else {
      value = props[n];
    }
    if (value !== void 0) {
      return `${tagName}-${n}-${value}`;
    }
  }
  return false;
};
var acceptFields = [
  "title",
  "meta",
  "link",
  "base",
  "style",
  "script",
  "noscript",
  "htmlAttrs",
  "bodyAttrs"
];
var renderTemplate = (template, title) => {
  if (template == null)
    return "";
  if (typeof template === "string") {
    return template.replace("%s", title != null ? title : "");
  }
  return template(unref(title));
};
var headObjToTags = (obj) => {
  const tags = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    if (obj[key] == null)
      continue;
    switch (key) {
      case "title":
        tags.push({ tag: key, props: { children: obj[key] } });
        break;
      case "titleTemplate":
        break;
      case "base":
        tags.push({ tag: key, props: { key: "default", ...obj[key] } });
        break;
      default:
        if (acceptFields.includes(key)) {
          const value = obj[key];
          if (Array.isArray(value)) {
            value.forEach((item) => {
              tags.push({ tag: key, props: unref(item) });
            });
          } else if (value) {
            tags.push({ tag: key, props: value });
          }
        }
        break;
    }
  }
  return tags;
};
var setAttrs = (el, attrs) => {
  const existingAttrs = el.getAttribute(HEAD_ATTRS_KEY);
  if (existingAttrs) {
    for (const key of existingAttrs.split(",")) {
      if (!(key in attrs)) {
        el.removeAttribute(key);
      }
    }
  }
  const keys = [];
  for (const key in attrs) {
    const value = attrs[key];
    if (value == null)
      continue;
    if (value === false) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
    keys.push(key);
  }
  if (keys.length) {
    el.setAttribute(HEAD_ATTRS_KEY, keys.join(","));
  } else {
    el.removeAttribute(HEAD_ATTRS_KEY);
  }
};
var updateElements = (document2 = window.document, type, tags) => {
  var _a, _b;
  const head = document2.head;
  const body = document2.body;
  let headCountEl = head.querySelector(`meta[name="${HEAD_COUNT_KEY}"]`);
  let bodyMetaElements = body.querySelectorAll(`[${BODY_TAG_ATTR_NAME}]`);
  const headCount = headCountEl ? Number(headCountEl.getAttribute("content")) : 0;
  const oldHeadElements = [];
  const oldBodyElements = [];
  if (bodyMetaElements) {
    for (let i = 0; i < bodyMetaElements.length; i++) {
      if (bodyMetaElements[i] && ((_a = bodyMetaElements[i].tagName) == null ? void 0 : _a.toLowerCase()) === type) {
        oldBodyElements.push(bodyMetaElements[i]);
      }
    }
  }
  if (headCountEl) {
    for (let i = 0, j = headCountEl.previousElementSibling; i < headCount; i++, j = (j == null ? void 0 : j.previousElementSibling) || null) {
      if (((_b = j == null ? void 0 : j.tagName) == null ? void 0 : _b.toLowerCase()) === type) {
        oldHeadElements.push(j);
      }
    }
  } else {
    headCountEl = document2.createElement("meta");
    headCountEl.setAttribute("name", HEAD_COUNT_KEY);
    headCountEl.setAttribute("content", "0");
    head.append(headCountEl);
  }
  let newElements = tags.map((tag) => {
    var _a2;
    return {
      element: createElement(tag.tag, tag.props, document2),
      body: (_a2 = tag.props.body) != null ? _a2 : false
    };
  });
  newElements = newElements.filter((newEl) => {
    for (let i = 0; i < oldHeadElements.length; i++) {
      const oldEl = oldHeadElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldHeadElements.splice(i, 1);
        return false;
      }
    }
    for (let i = 0; i < oldBodyElements.length; i++) {
      const oldEl = oldBodyElements[i];
      if (isEqualNode(oldEl, newEl.element)) {
        oldBodyElements.splice(i, 1);
        return false;
      }
    }
    return true;
  });
  oldBodyElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  oldHeadElements.forEach((t) => {
    var _a2;
    return (_a2 = t.parentNode) == null ? void 0 : _a2.removeChild(t);
  });
  newElements.forEach((t) => {
    if (t.body === true) {
      body.insertAdjacentElement("beforeend", t.element);
    } else {
      head.insertBefore(t.element, headCountEl);
    }
  });
  headCountEl.setAttribute(
    "content",
    "" + (headCount - oldHeadElements.length + newElements.filter((t) => !t.body).length)
  );
};
var createHead = (initHeadObject) => {
  let allHeadObjs = [];
  let previousTags = /* @__PURE__ */ new Set();
  if (initHeadObject) {
    allHeadObjs.push(shallowRef(initHeadObject));
  }
  const head = {
    install(app) {
      app.config.globalProperties.$head = head;
      app.provide(PROVIDE_KEY, head);
    },
    get headTags() {
      const deduped = [];
      const deduping = {};
      const titleTemplate = allHeadObjs.map((i) => unref(i).titleTemplate).reverse().find((i) => i != null);
      allHeadObjs.forEach((objs, headObjectIdx) => {
        const tags = headObjToTags(unref(objs));
        tags.forEach((tag, tagIdx) => {
          tag._position = headObjectIdx * 1e4 + tagIdx;
          if (titleTemplate && tag.tag === "title") {
            tag.props.children = renderTemplate(
              titleTemplate,
              tag.props.children
            );
          }
          const dedupeKey = tagDedupeKey(tag);
          if (dedupeKey) {
            deduping[dedupeKey] = tag;
          } else {
            deduped.push(tag);
          }
        });
      });
      deduped.push(...Object.values(deduping));
      return deduped.sort((a, b) => a._position - b._position);
    },
    addHeadObjs(objs) {
      allHeadObjs.push(objs);
    },
    removeHeadObjs(objs) {
      allHeadObjs = allHeadObjs.filter((_objs) => _objs !== objs);
    },
    updateDOM(document2 = window.document) {
      let title;
      let htmlAttrs = {};
      let bodyAttrs = {};
      const actualTags = {};
      for (const tag of head.headTags.sort(sortTags)) {
        if (tag.tag === "title") {
          title = tag.props.children;
          continue;
        }
        if (tag.tag === "htmlAttrs") {
          Object.assign(htmlAttrs, tag.props);
          continue;
        }
        if (tag.tag === "bodyAttrs") {
          Object.assign(bodyAttrs, tag.props);
          continue;
        }
        actualTags[tag.tag] = actualTags[tag.tag] || [];
        actualTags[tag.tag].push(tag);
      }
      if (title !== void 0) {
        document2.title = title;
      }
      setAttrs(document2.documentElement, htmlAttrs);
      setAttrs(document2.body, bodyAttrs);
      const tags = /* @__PURE__ */ new Set([...Object.keys(actualTags), ...previousTags]);
      for (const tag of tags) {
        updateElements(document2, tag, actualTags[tag] || []);
      }
      previousTags.clear();
      Object.keys(actualTags).forEach((i) => previousTags.add(i));
    }
  };
  return head;
};
var tagToString = (tag) => {
  let isBodyTag = false;
  if (tag.props.body) {
    isBodyTag = true;
    delete tag.props.body;
  }
  if (tag.props.renderPriority) {
    delete tag.props.renderPriority;
  }
  let attrs = stringifyAttrs(tag.props);
  if (SELF_CLOSING_TAGS.includes(tag.tag)) {
    return `<${tag.tag}${attrs}${isBodyTag ? `  ${BODY_TAG_ATTR_NAME}="true"` : ""}>`;
  }
  return `<${tag.tag}${attrs}${isBodyTag ? ` ${BODY_TAG_ATTR_NAME}="true"` : ""}>${tag.props.children || ""}</${tag.tag}>`;
};
var sortTags = (aTag, bTag) => {
  const tagWeight = (tag) => {
    if (tag.props.renderPriority) {
      return tag.props.renderPriority;
    }
    switch (tag.tag) {
      case "base":
        return -1;
      case "meta":
        if (tag.props.charset) {
          return -2;
        }
        if (tag.props["http-equiv"] === "content-security-policy") {
          return 0;
        }
        return 10;
      default:
        return 10;
    }
  };
  return tagWeight(aTag) - tagWeight(bTag);
};
var renderHeadToString = (head) => {
  const tags = [];
  let titleTag = "";
  let htmlAttrs = {};
  let bodyAttrs = {};
  let bodyTags = [];
  for (const tag of head.headTags.sort(sortTags)) {
    if (tag.tag === "title") {
      titleTag = tagToString(tag);
    } else if (tag.tag === "htmlAttrs") {
      Object.assign(htmlAttrs, tag.props);
    } else if (tag.tag === "bodyAttrs") {
      Object.assign(bodyAttrs, tag.props);
    } else if (tag.props.body) {
      bodyTags.push(tagToString(tag));
    } else {
      tags.push(tagToString(tag));
    }
  }
  tags.push(`<meta name="${HEAD_COUNT_KEY}" content="${tags.length}">`);
  return {
    get headTags() {
      return titleTag + tags.join("");
    },
    get htmlAttrs() {
      return stringifyAttrs({
        ...htmlAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(htmlAttrs).join(",")
      });
    },
    get bodyAttrs() {
      return stringifyAttrs({
        ...bodyAttrs,
        [HEAD_ATTRS_KEY]: Object.keys(bodyAttrs).join(",")
      });
    },
    get bodyTags() {
      return bodyTags.join("");
    }
  };
};
const node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0 = defineNuxtPlugin((nuxtApp) => {
  const head = createHead();
  nuxtApp.vueApp.use(head);
  nuxtApp.hooks.hookOnce("app:mounted", () => {
    watchEffect(() => {
      head.updateDOM();
    });
  });
  nuxtApp._useHead = (_meta) => {
    const meta2 = ref(_meta);
    const headObj = computed(() => {
      const overrides = { meta: [] };
      if (meta2.value.charset) {
        overrides.meta.push({ key: "charset", charset: meta2.value.charset });
      }
      if (meta2.value.viewport) {
        overrides.meta.push({ name: "viewport", content: meta2.value.viewport });
      }
      return defu(overrides, meta2.value);
    });
    head.addHeadObjs(headObj);
    {
      return;
    }
  };
  {
    nuxtApp.ssrContext.renderMeta = () => {
      const meta2 = renderHeadToString(head);
      return {
        ...meta2,
        bodyScripts: meta2.bodyTags
      };
    };
  }
});
const removeUndefinedProps = (props) => Object.fromEntries(Object.entries(props).filter(([, value]) => value !== void 0));
const setupForUseMeta = (metaFactory, renderChild) => (props, ctx) => {
  useHead(() => metaFactory({ ...removeUndefinedProps(props), ...ctx.attrs }, ctx));
  return () => {
    var _a, _b;
    return renderChild ? (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a) : null;
  };
};
const globalProps = {
  accesskey: String,
  autocapitalize: String,
  autofocus: {
    type: Boolean,
    default: void 0
  },
  class: String,
  contenteditable: {
    type: Boolean,
    default: void 0
  },
  contextmenu: String,
  dir: String,
  draggable: {
    type: Boolean,
    default: void 0
  },
  enterkeyhint: String,
  exportparts: String,
  hidden: {
    type: Boolean,
    default: void 0
  },
  id: String,
  inputmode: String,
  is: String,
  itemid: String,
  itemprop: String,
  itemref: String,
  itemscope: String,
  itemtype: String,
  lang: String,
  nonce: String,
  part: String,
  slot: String,
  spellcheck: {
    type: Boolean,
    default: void 0
  },
  style: String,
  tabindex: String,
  title: String,
  translate: String
};
const Script = defineComponent({
  name: "Script",
  inheritAttrs: false,
  props: {
    ...globalProps,
    async: Boolean,
    crossorigin: {
      type: [Boolean, String],
      default: void 0
    },
    defer: Boolean,
    fetchpriority: String,
    integrity: String,
    nomodule: Boolean,
    nonce: String,
    referrerpolicy: String,
    src: String,
    type: String,
    charset: String,
    language: String
  },
  setup: setupForUseMeta((script) => ({
    script: [script]
  }))
});
const NoScript = defineComponent({
  name: "NoScript",
  inheritAttrs: false,
  props: {
    ...globalProps,
    title: String
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a;
    const noscript = { ...props };
    const textContent = (((_a = slots.default) == null ? void 0 : _a.call(slots)) || []).filter(({ children }) => children).map(({ children }) => children).join("");
    if (textContent) {
      noscript.children = textContent;
    }
    return {
      noscript: [noscript]
    };
  })
});
const Link = defineComponent({
  name: "Link",
  inheritAttrs: false,
  props: {
    ...globalProps,
    as: String,
    crossorigin: String,
    disabled: Boolean,
    fetchpriority: String,
    href: String,
    hreflang: String,
    imagesizes: String,
    imagesrcset: String,
    integrity: String,
    media: String,
    prefetch: {
      type: Boolean,
      default: void 0
    },
    referrerpolicy: String,
    rel: String,
    sizes: String,
    title: String,
    type: String,
    methods: String,
    target: String
  },
  setup: setupForUseMeta((link) => ({
    link: [link]
  }))
});
const Base = defineComponent({
  name: "Base",
  inheritAttrs: false,
  props: {
    ...globalProps,
    href: String,
    target: String
  },
  setup: setupForUseMeta((base) => ({
    base
  }))
});
const Title = defineComponent({
  name: "Title",
  inheritAttrs: false,
  setup: setupForUseMeta((_, { slots }) => {
    var _a, _b, _c;
    const title = ((_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children) || null;
    return {
      title
    };
  })
});
const Meta = defineComponent({
  name: "Meta",
  inheritAttrs: false,
  props: {
    ...globalProps,
    charset: String,
    content: String,
    httpEquiv: String,
    name: String
  },
  setup: setupForUseMeta((props) => {
    const meta2 = { ...props };
    if (meta2.httpEquiv) {
      meta2["http-equiv"] = meta2.httpEquiv;
      delete meta2.httpEquiv;
    }
    return {
      meta: [meta2]
    };
  })
});
const Style = defineComponent({
  name: "Style",
  inheritAttrs: false,
  props: {
    ...globalProps,
    type: String,
    media: String,
    nonce: String,
    title: String,
    scoped: {
      type: Boolean,
      default: void 0
    }
  },
  setup: setupForUseMeta((props, { slots }) => {
    var _a, _b, _c;
    const style = { ...props };
    const textContent = (_c = (_b = (_a = slots.default) == null ? void 0 : _a.call(slots)) == null ? void 0 : _b[0]) == null ? void 0 : _c.children;
    if (textContent) {
      style.children = textContent;
    }
    return {
      style: [style]
    };
  })
});
const Head = defineComponent({
  name: "Head",
  inheritAttrs: false,
  setup: (_props, ctx) => () => {
    var _a, _b;
    return (_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a);
  }
});
const Html = defineComponent({
  name: "Html",
  inheritAttrs: false,
  props: {
    ...globalProps,
    manifest: String,
    version: String,
    xmlns: String
  },
  setup: setupForUseMeta((htmlAttrs) => ({ htmlAttrs }), true)
});
const Body = defineComponent({
  name: "Body",
  inheritAttrs: false,
  props: globalProps,
  setup: setupForUseMeta((bodyAttrs) => ({ bodyAttrs }), true)
});
const Components = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  Script,
  NoScript,
  Link,
  Base,
  Title,
  Meta,
  Style,
  Head,
  Html,
  Body
}, Symbol.toStringTag, { value: "Module" }));
const appHead = { "meta": [], "link": [], "style": [], "script": [], "noscript": [], "charset": "utf-8", "viewport": "width=device-width, initial-scale=1" };
const appLayoutTransition = { "name": "layout", "mode": "out-in" };
const appPageTransition = { "name": "page", "mode": "out-in" };
const appKeepalive = false;
const metaMixin = {
  created() {
    const instance = getCurrentInstance();
    if (!instance) {
      return;
    }
    const options = instance.type;
    if (!options || !("head" in options)) {
      return;
    }
    const nuxtApp = useNuxtApp();
    const source = typeof options.head === "function" ? computed(() => options.head(nuxtApp)) : options.head;
    useHead(source);
  }
};
const node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2 = defineNuxtPlugin((nuxtApp) => {
  useHead(markRaw({ title: "", ...appHead }));
  nuxtApp.vueApp.mixin(metaMixin);
  for (const name in Components) {
    nuxtApp.vueApp.component(name, Components[name]);
  }
});
const interpolatePath = (route, match) => {
  return match.path.replace(/(:\w+)\([^)]+\)/g, "$1").replace(/(:\w+)[?+*]/g, "$1").replace(/:\w+/g, (r) => {
    var _a;
    return ((_a = route.params[r.slice(1)]) == null ? void 0 : _a.toString()) || "";
  });
};
const generateRouteKey = (override, routeProps) => {
  var _a;
  const matchedRoute = routeProps.route.matched.find((m) => {
    var _a2;
    return ((_a2 = m.components) == null ? void 0 : _a2.default) === routeProps.Component.type;
  });
  const source = (_a = override != null ? override : matchedRoute == null ? void 0 : matchedRoute.meta.key) != null ? _a : matchedRoute && interpolatePath(routeProps.route, matchedRoute);
  return typeof source === "function" ? source(routeProps.route) : source;
};
const wrapInKeepAlive = (props, children) => {
  return { default: () => children };
};
const Fragment = defineComponent({
  setup(_props, { slots }) {
    return () => {
      var _a;
      return (_a = slots.default) == null ? void 0 : _a.call(slots);
    };
  }
});
const _wrapIf = (component, props, slots) => {
  return { default: () => props ? h(component, props === true ? {} : props, slots) : h(Fragment, {}, slots) };
};
const isNestedKey = Symbol("isNested");
const NuxtPage = defineComponent({
  name: "NuxtPage",
  inheritAttrs: false,
  props: {
    name: {
      type: String
    },
    transition: {
      type: [Boolean, Object],
      default: void 0
    },
    keepalive: {
      type: [Boolean, Object],
      default: void 0
    },
    route: {
      type: Object
    },
    pageKey: {
      type: [Function, String],
      default: null
    }
  },
  setup(props, { attrs }) {
    const nuxtApp = useNuxtApp();
    const isNested = inject(isNestedKey, false);
    provide(isNestedKey, true);
    return () => {
      return h(RouterView, { name: props.name, route: props.route, ...attrs }, {
        default: (routeProps) => {
          var _a, _b, _c, _d;
          if (!routeProps.Component) {
            return;
          }
          const key = generateRouteKey(props.pageKey, routeProps);
          const transitionProps = (_b = (_a = props.transition) != null ? _a : routeProps.route.meta.pageTransition) != null ? _b : appPageTransition;
          return _wrapIf(
            Transition,
            transitionProps,
            wrapInKeepAlive(
              (_d = (_c = props.keepalive) != null ? _c : routeProps.route.meta.keepalive) != null ? _d : appKeepalive,
              isNested && nuxtApp.isHydrating ? h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) : h(Suspense, {
                onPending: () => nuxtApp.callHook("page:start", routeProps.Component),
                onResolve: () => nuxtApp.callHook("page:finish", routeProps.Component)
              }, { default: () => h(Component, { key, routeProps, pageKey: key, hasTransition: !!transitionProps }) })
            )
          ).default();
        }
      });
    };
  }
});
const Component = defineComponent({
  props: ["routeProps", "pageKey", "hasTransition"],
  setup(props) {
    const previousKey = props.pageKey;
    const previousRoute = props.routeProps.route;
    const route = {};
    for (const key in props.routeProps.route) {
      route[key] = computed(() => previousKey === props.pageKey ? props.routeProps.route[key] : previousRoute[key]);
    }
    provide("_route", reactive(route));
    return () => {
      return h(props.routeProps.Component);
    };
  }
});
const LOCAL_ICON_PREFIX = "local-icon-";
const EL_ICON_PREFIX = "el-icon-";
const plugins_icons_ts_sncVX745v6 = defineNuxtPlugin((nuxtApp) => {
  for (const [iconName, component] of Object.entries(ElementPlusIcons)) {
    const componenName = `${EL_ICON_PREFIX}${iconName}`;
    nuxtApp.vueApp.component(componenName, component);
  }
});
const addUnit = (value, unit = "px") => {
  return !Object.is(Number(value), NaN) ? `${value}${unit}` : value;
};
function getNormalPath(path) {
  if (path.length === 0 || !path || path == "undefined") {
    return path;
  }
  const newPath = path.replace("//", "/");
  const length = newPath.length;
  if (newPath[length - 1] === "/") {
    return newPath.slice(0, length - 1);
  }
  return newPath;
}
const _sfc_main$6 = defineComponent({
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
const _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<svg${ssrRenderAttrs(mergeProps({
    "aria-hidden": "true",
    style: _ctx.styles
  }, _attrs))}><use${ssrRenderAttr("xlink:href", _ctx.symbolId)} fill="currentColor"></use></svg>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/svg-icon.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const SvgIcon = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/icon/index.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_0$1 = defineComponent({
  name: "ClientOnly",
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots }) {
    const mounted = ref(false);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, null, fallbackStr);
    };
  }
});
function getUserCenter(headers) {
  return $request.get({ url: "/user/center", headers });
}
function getUserInfo() {
  return $request.get({ url: "/user/info" });
}
function userEdit(params) {
  return $request.post({ url: "/user/setInfo", params });
}
function userChangePwd(params) {
  return $request.post({ url: "/user/changePassword", params });
}
var PopupTypeEnum = /* @__PURE__ */ ((PopupTypeEnum2) => {
  PopupTypeEnum2[PopupTypeEnum2["LOGIN"] = 0] = "LOGIN";
  PopupTypeEnum2[PopupTypeEnum2["FORGOT_PWD"] = 1] = "FORGOT_PWD";
  PopupTypeEnum2[PopupTypeEnum2["REGISTER"] = 2] = "REGISTER";
  PopupTypeEnum2[PopupTypeEnum2["BIND_MOBILE"] = 3] = "BIND_MOBILE";
  return PopupTypeEnum2;
})(PopupTypeEnum || {});
const useAccount = () => {
  const popupType = useState(() => 0, "$mZqbhNIHWF");
  const setPopupType = (type = 0) => {
    popupType.value = type;
  };
  const showPopup = useState(() => false, "$WoucAawTnN");
  const toggleShowPopup = (toggle) => {
    showPopup.value = toggle != null ? toggle : !showPopup.value;
  };
  return {
    popupType,
    setPopupType,
    showPopup,
    toggleShowPopup
  };
};
const meta$7 = {
  module: "personal",
  auth: true
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "items",
  __ssrInlineRender: true,
  props: {
    index: {
      type: Number
    },
    id: {
      type: Number
    },
    title: {
      type: String
    },
    desc: {
      type: String
    },
    image: {
      type: String
    },
    author: {
      type: String
    },
    click: {
      type: Number
    },
    createTime: {
      type: String
    },
    onlyTitle: {
      type: Boolean,
      default: true
    },
    isHorizontal: {
      type: Boolean,
      default: false
    },
    titleLine: {
      type: Number,
      default: 1
    },
    border: {
      type: Boolean,
      default: true
    },
    source: {
      type: String,
      default: "default"
    },
    imageSize: {
      type: String,
      default: "default"
    },
    showAuthor: {
      type: Boolean,
      default: true
    },
    showDesc: {
      type: Boolean,
      default: true
    },
    showClick: {
      type: Boolean,
      default: true
    },
    showTime: {
      type: Boolean,
      default: true
    },
    showSort: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const getImageStyle = computed(() => {
      switch (props.imageSize) {
        case "default":
          return {
            width: "180px",
            height: "135px"
          };
        case "mini":
          return {
            width: "120px",
            height: "90px"
          };
        case "large":
          return {
            width: "260px",
            height: "195px"
          };
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_NuxtLink, mergeProps({
        to: `/information/detail/${__props.id}`
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.onlyTitle) {
              _push2(`<div class="before:w-[6px] mt-4 before:h-[6px] before:bg-primary before:block flex items-center before:rounded-[6px] before:mr-2.5 before:flex-none"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", { title: __props.title }, () => {
                _push2(`<span class="line-clamp-1 flex-1 font-medium"${_scopeId}>${ssrInterpolate(__props.title)}</span>`);
              }, _push2, _parent2, _scopeId);
              if (__props.showTime) {
                _push2(`<span class="text-tx-secondary ml-4"${_scopeId}>${ssrInterpolate(__props.createTime)}</span>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
            } else {
              _push2(`<div class="${ssrRenderClass({
                "border-b border-br pb-4": __props.border,
                "flex pt-4 items-center": !__props.isHorizontal
              })}"${_scopeId}><div class="flex relative"${_scopeId}>`);
              if (__props.image) {
                _push2(ssrRenderComponent(unref(ElImage), {
                  class: ["flex-none", {
                    "mr-4": !__props.isHorizontal
                  }],
                  src: __props.image,
                  fit: "cover",
                  style: unref(getImageStyle)
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div><div class="${ssrRenderClass([{
                "p-2": __props.isHorizontal
              }, "flex-1"])}"${_scopeId}>`);
              ssrRenderSlot(_ctx.$slots, "title", { title: __props.title }, () => {
                _push2(`<div class="${ssrRenderClass([`line-clamp-${__props.titleLine}`, "text-lg font-medium"])}"${_scopeId}>${ssrInterpolate(__props.title)}</div>`);
              }, _push2, _parent2, _scopeId);
              if (__props.showDesc && __props.desc) {
                _push2(`<div class="text-tx-regular line-clamp-2 mt-4"${_scopeId}>${ssrInterpolate(__props.desc)}</div>`);
              } else {
                _push2(`<!---->`);
              }
              if (__props.showAuthor || __props.showTime || __props.showClick) {
                _push2(`<div class="mt-5 text-tx-secondary flex items-center flex-wrap"${_scopeId}>`);
                if (__props.showAuthor && __props.author) {
                  _push2(`<span${_scopeId}>${ssrInterpolate(__props.author)}\xA0|\xA0 </span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.showTime) {
                  _push2(`<span class="mr-5"${_scopeId}>${ssrInterpolate(__props.createTime)}</span>`);
                } else {
                  _push2(`<!---->`);
                }
                if (__props.showClick) {
                  _push2(`<div class="flex items-center"${_scopeId}>`);
                  _push2(ssrRenderComponent(unref(ElIcon), null, {
                    default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                      if (_push3) {
                        _push3(ssrRenderComponent(unref(View), null, null, _parent3, _scopeId2));
                      } else {
                        return [
                          createVNode(unref(View))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent2, _scopeId));
                  _push2(`<span${_scopeId}>\xA0${ssrInterpolate(__props.click)}\u4EBA\u6D4F\u89C8</span></div>`);
                } else {
                  _push2(`<!---->`);
                }
                _push2(`</div>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div></div>`);
            }
          } else {
            return [
              __props.onlyTitle ? (openBlock(), createBlock("div", {
                key: 0,
                class: "before:w-[6px] mt-4 before:h-[6px] before:bg-primary before:block flex items-center before:rounded-[6px] before:mr-2.5 before:flex-none"
              }, [
                renderSlot(_ctx.$slots, "title", { title: __props.title }, () => [
                  createVNode("span", { class: "line-clamp-1 flex-1 font-medium" }, toDisplayString(__props.title), 1)
                ]),
                __props.showTime ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "text-tx-secondary ml-4"
                }, toDisplayString(__props.createTime), 1)) : createCommentVNode("", true)
              ])) : (openBlock(), createBlock("div", {
                key: 1,
                class: {
                  "border-b border-br pb-4": __props.border,
                  "flex pt-4 items-center": !__props.isHorizontal
                }
              }, [
                createVNode("div", { class: "flex relative" }, [
                  __props.image ? (openBlock(), createBlock(unref(ElImage), {
                    key: 0,
                    class: ["flex-none", {
                      "mr-4": !__props.isHorizontal
                    }],
                    src: __props.image,
                    fit: "cover",
                    style: unref(getImageStyle)
                  }, null, 8, ["class", "src", "style"])) : createCommentVNode("", true)
                ]),
                createVNode("div", {
                  class: ["flex-1", {
                    "p-2": __props.isHorizontal
                  }]
                }, [
                  renderSlot(_ctx.$slots, "title", { title: __props.title }, () => [
                    createVNode("div", {
                      class: ["text-lg font-medium", `line-clamp-${__props.titleLine}`]
                    }, toDisplayString(__props.title), 3)
                  ]),
                  __props.showDesc && __props.desc ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "text-tx-regular line-clamp-2 mt-4"
                  }, toDisplayString(__props.desc), 1)) : createCommentVNode("", true),
                  __props.showAuthor || __props.showTime || __props.showClick ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-5 text-tx-secondary flex items-center flex-wrap"
                  }, [
                    __props.showAuthor && __props.author ? (openBlock(), createBlock("span", { key: 0 }, toDisplayString(__props.author) + "\xA0|\xA0 ", 1)) : createCommentVNode("", true),
                    __props.showTime ? (openBlock(), createBlock("span", {
                      key: 1,
                      class: "mr-5"
                    }, toDisplayString(__props.createTime), 1)) : createCommentVNode("", true),
                    __props.showClick ? (openBlock(), createBlock("div", {
                      key: 2,
                      class: "flex items-center"
                    }, [
                      createVNode(unref(ElIcon), null, {
                        default: withCtx(() => [
                          createVNode(unref(View))
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "\xA0" + toDisplayString(__props.click) + "\u4EBA\u6D4F\u89C8", 1)
                    ])) : createCommentVNode("", true)
                  ])) : createCommentVNode("", true)
                ], 2)
              ], 2))
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/information/items.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const empty_news = "" + globalThis.__buildAssetsURL("empty_news.35f4c0a6.png");
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "card",
  __ssrInlineRender: true,
  props: {
    header: {
      type: String,
      default: ""
    },
    link: {
      type: String,
      default: ""
    },
    data: {
      type: Array,
      default: () => []
    },
    source: {
      type: String,
      default: "default"
    },
    onlyTitle: {
      type: Boolean,
      default: true
    },
    titleLine: {
      type: Number,
      default: 1
    },
    border: {
      type: Boolean,
      default: true
    },
    imageSize: {
      type: String,
      default: "default"
    },
    showAuthor: {
      type: Boolean,
      default: true
    },
    showDesc: {
      type: Boolean,
      default: true
    },
    showClick: {
      type: Boolean,
      default: true
    },
    showTime: {
      type: Boolean,
      default: true
    },
    showSort: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      const _component_InformationItems = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "bg-white rounded-[8px]" }, _attrs))}><div class="flex items-center h-[60px] border-b border-br ml-5 pr-5"><div class="flex-1 flex min-w-0 mr-4 h-full"><span class="text-2xl truncate font-medium h-full border-b-2 border-tx-primary mt-[1px] flex items-center">${ssrInterpolate(__props.header)}</span></div>`);
      if (__props.link) {
        _push(ssrRenderComponent(unref(ElButton), {
          class: "button",
          link: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: __props.link,
                class: "flex"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` \u66F4\u591A `);
                    _push3(ssrRenderComponent(unref(ElIcon), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(ArrowRight), null, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(ArrowRight))
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createTextVNode(" \u66F4\u591A "),
                      createVNode(unref(ElIcon), null, {
                        default: withCtx(() => [
                          createVNode(unref(ArrowRight))
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
                createVNode(_component_NuxtLink, {
                  to: __props.link,
                  class: "flex"
                }, {
                  default: withCtx(() => [
                    createTextVNode(" \u66F4\u591A "),
                    createVNode(unref(ElIcon), null, {
                      default: withCtx(() => [
                        createVNode(unref(ArrowRight))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["to"])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (__props.data.length) {
        ssrRenderSlot(_ctx.$slots, "content", { data: __props.data }, () => {
          _push(`<div class="px-5 pb-5"><!--[-->`);
          ssrRenderList(__props.data, (item, index2) => {
            ssrRenderSlot(_ctx.$slots, "item", {
              item,
              index: index2
            }, () => {
              _push(ssrRenderComponent(_component_InformationItems, {
                index: index2,
                "show-sort": __props.showSort,
                id: item.id,
                title: item.title,
                desc: item.desc,
                click: item.click,
                author: item.author,
                "create-time": item.create_time,
                image: item.image,
                "only-title": __props.onlyTitle,
                "image-size": __props.imageSize,
                "show-author": __props.showAuthor,
                "show-desc": __props.showDesc,
                "show-click": __props.showClick,
                border: __props.border,
                "title-line": __props.titleLine,
                "show-time": __props.showTime,
                source: __props.source
              }, null, _parent));
            }, _push, _parent);
          });
          _push(`<!--]--></div>`);
        }, _push, _parent);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(unref(ElEmpty), {
          image: unref(empty_news),
          description: "\u6682\u65E0\u8D44\u8BAF",
          "image-size": 250
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/information/card.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const isVue2 = false;
/*!
  * pinia v2.0.23
  * (c) 2022 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol();
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app) {
      setActivePinia(pinia);
      {
        pinia._a = app;
        app.provide(piniaSymbol, pinia);
        app.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentInstance()) {
    onUnmounted(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
function mergeReactiveObjects(target, patchToApply) {
  if (target instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target.set(key, value));
  }
  if (target instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target.add, target);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target[key] = subPatch;
    }
  }
  return target;
}
const skipHydrateSymbol = Symbol();
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store;
  function setup() {
    if (!initialState && (!("production" !== "production") )) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store2 = pinia._s.get(id);
        return getters[name].call(store2, store2);
      }));
      return computedGetters;
    }, {}));
  }
  store = createSetupStore(id, setup, options, pinia, hot, true);
  store.$reset = function $reset() {
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign($state, newState);
    });
  };
  return store;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
  };
  let isListening;
  let isSyncListening;
  let subscriptions = markRaw([]);
  let actionSubscriptions = markRaw([]);
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && (!("production" !== "production") )) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = noop;
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store = reactive(partialStore);
  pinia._s.set($id, store);
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return scope.run(() => setup());
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else ;
  }
  {
    assign(store, setupStore);
    assign(toRaw(store), setupStore);
  }
  Object.defineProperty(store, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign(store, scope.run(() => extender({
        store,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const currentInstance = getCurrentInstance();
    pinia = (pinia) || currentInstance && inject(piniaSymbol);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store = pinia._s.get(id);
    return store;
  }
  useStore.$id = id;
  return useStore;
}
function getConfig() {
  return $request.get({ url: "/pc/config" });
}
function getPolicy(params) {
  return $request.get({ url: "/index/policy", params });
}
const useAppStore = defineStore({
  id: "appStore",
  state: () => ({
    config: {}
  }),
  getters: {
    getImageUrl: (state) => (url) => url ? `${state.config.domain}${url}` : "",
    getWebsiteConfig: (state) => state.config.website || {},
    getLoginConfig: (state) => state.config.login || {},
    getCopyrightConfig: (state) => state.config.copyright || [],
    getQrcodeConfig: (state) => state.config.qrcode || {},
    getAdminUrl: (state) => state.config.admin_url
  },
  actions: {
    async getConfig() {
      const config = await getConfig();
      this.config = config;
    }
  }
});
const meta$6 = void 0;
const meta$5 = void 0;
const _Feedback = class {
  constructor() {
    __publicField(this, "loadingInstance", null);
  }
  static getInstance() {
    var _a;
    return (_a = this.instance) != null ? _a : this.instance = new _Feedback();
  }
  msg(msg) {
    ElMessage.info(msg);
  }
  msgError(msg) {
    ElMessage.error(msg);
  }
  msgSuccess(msg) {
    ElMessage.success(msg);
  }
  msgWarning(msg) {
    ElMessage.warning(msg);
  }
  alert(msg) {
    ElMessageBox.alert(msg, "\u7CFB\u7EDF\u63D0\u793A");
  }
  alertError(msg) {
    ElMessageBox.alert(msg, "\u7CFB\u7EDF\u63D0\u793A", { type: "error" });
  }
  alertSuccess(msg) {
    ElMessageBox.alert(msg, "\u7CFB\u7EDF\u63D0\u793A", { type: "success" });
  }
  alertWarning(msg) {
    ElMessageBox.alert(msg, "\u7CFB\u7EDF\u63D0\u793A", { type: "warning" });
  }
  notify(msg) {
    ElNotification.info(msg);
  }
  notifyError(msg) {
    ElNotification.error(msg);
  }
  notifySuccess(msg) {
    ElNotification.success(msg);
  }
  notifyWarning(msg) {
    ElNotification.warning(msg);
  }
  confirm(msg) {
    return ElMessageBox.confirm(msg, "\u6E29\u99A8\u63D0\u793A", {
      confirmButtonText: "\u786E\u5B9A",
      cancelButtonText: "\u53D6\u6D88",
      type: "warning"
    });
  }
  prompt(content, title, options) {
    return ElMessageBox.prompt(content, title, {
      confirmButtonText: "\u786E\u5B9A",
      cancelButtonText: "\u53D6\u6D88",
      ...options
    });
  }
  loading(msg) {
    this.loadingInstance = ElLoading.service({
      lock: true,
      text: msg
    });
  }
  closeLoading() {
    var _a;
    (_a = this.loadingInstance) == null ? void 0 : _a.close();
  }
};
let Feedback = _Feedback;
__publicField(Feedback, "instance", null);
const feedback = Feedback.getInstance();
const meta$4 = void 0;
const meta$3 = void 0;
const meta$2 = {
  layout: "blank"
};
const meta$1 = {
  module: "personal",
  auth: true
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  emits: ["change"],
  setup(__props, { emit }) {
    shallowRef();
    shallowRef();
    reactive({
      cropperVisible: false,
      imagePath: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, null, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cropper-upload/index.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
function getVersion() {
  return useRuntimeConfig().public.version;
}
function getApiUrl() {
  return useRuntimeConfig().public.apiUrl;
}
function getApiPrefix() {
  return useRuntimeConfig().public.apiPrefix;
}
function logout() {
  return $request.post({ url: "/login/logout" });
}
function wxLogin(params) {
  return $request.post({ url: "/login/scanLogin", params });
}
const TOKEN_KEY = "token";
const useUserStore = defineStore({
  id: "userStore",
  state: () => {
    const TOKEN = useCookie(TOKEN_KEY);
    return {
      userInfo: {},
      token: TOKEN.value || null,
      temToken: null
    };
  },
  getters: {
    isLogin: (state) => !!state.token
  },
  actions: {
    async getUser() {
      const data = await getUserCenter();
      this.userInfo = data;
    },
    setUser(userInfo) {
      this.userInfo = userInfo;
    },
    login(token) {
      const TOKEN = useCookie(TOKEN_KEY);
      this.token = token;
      TOKEN.value = token;
    },
    logout() {
      const TOKEN = useCookie(TOKEN_KEY);
      this.token = null;
      this.userInfo = {};
      TOKEN.value = null;
    }
  }
});
const meta = {
  module: "personal",
  auth: true
};
const _routes = [
  {
    name: "account-security",
    path: "/account/security",
    file: "/Users/likeshop002/Desktop/project/project-services/likeadmin_php/pc/pages/account/security.vue",
    children: [],
    meta: meta$7,
    alias: (meta$7 == null ? void 0 : meta$7.alias) || [],
    component: () => import('./_nuxt/security.ad690908.mjs').then((m) => m.default || m)
  },
  {
    name: "index",
    path: "/",
    file: "/Users/likeshop002/Desktop/project/project-services/likeadmin_php/pc/pages/index.vue",
    children: [],
    meta: meta$6,
    alias: [],
    component: () => import('./_nuxt/index.99e6af96.mjs').then((m) => m.default || m)
  },
  {
    name: "information-source",
    path: "/information/:source",
    file: "/Users/likeshop002/Desktop/project/project-services/likeadmin_php/pc/pages/information/[source]/index.vue",
    children: [],
    meta: meta$5,
    alias: [],
    component: () => import('./_nuxt/index.c5a56537.mjs').then((m) => m.default || m)
  },
  {
    name: "information-detail-id",
    path: "/information/detail/:id",
    file: "/Users/likeshop002/Desktop/project/project-services/likeadmin_php/pc/pages/information/detail/[id].vue",
    children: [],
    meta: meta$4,
    alias: [],
    component: () => import('./_nuxt/_id_.69d7ccd1.mjs').then((m) => m.default || m)
  },
  {
    name: "information",
    path: "/information",
    file: "/Users/likeshop002/Desktop/project/project-services/likeadmin_php/pc/pages/information/index.vue",
    children: [],
    meta: meta$3,
    alias: [],
    component: () => import('./_nuxt/index.26a26853.mjs').then((m) => m.default || m)
  },
  {
    name: "policy-type",
    path: "/policy/:type",
    file: "/Users/likeshop002/Desktop/project/project-services/likeadmin_php/pc/pages/policy/[type].vue",
    children: [],
    meta: meta$2,
    alias: (meta$2 == null ? void 0 : meta$2.alias) || [],
    component: () => import('./_nuxt/_type_.a8d70834.mjs').then((m) => m.default || m)
  },
  {
    name: "user-collection",
    path: "/user/collection",
    file: "/Users/likeshop002/Desktop/project/project-services/likeadmin_php/pc/pages/user/collection.vue",
    children: [],
    meta: meta$1,
    alias: (meta$1 == null ? void 0 : meta$1.alias) || [],
    component: () => import('./_nuxt/collection.b24d3d03.mjs').then((m) => m.default || m)
  },
  {
    name: "user-info",
    path: "/user/info",
    file: "/Users/likeshop002/Desktop/project/project-services/likeadmin_php/pc/pages/user/info.vue",
    children: [],
    meta,
    alias: (meta == null ? void 0 : meta.alias) || [],
    component: () => import('./_nuxt/info.9d13881f.mjs').then((m) => m.default || m)
  }
];
const configRouterOptions = {};
const routerOptions = {
  ...configRouterOptions
};
function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path);
}
const isEmptyObject = (target) => {
  return isObject(target) && !Object.keys(target).length;
};
const route_45global = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const userStore = useUserStore();
  const appStore = useAppStore();
  try {
    if (isEmptyObject(appStore.config)) {
      ;
      [__temp, __restore] = executeAsync(() => appStore.getConfig()), await __temp, __restore();
      ;
    }
    if (userStore.isLogin && isEmptyObject(userStore.userInfo)) {
      ;
      [__temp, __restore] = executeAsync(() => userStore.getUser()), await __temp, __restore();
      ;
    }
  } catch (error) {
    userStore.$reset();
  }
});
const wxlogin_45global = defineNuxtRouteMiddleware(async (to, from) => {
  let __temp, __restore;
  const appStore = useAppStore();
  const userStore = useUserStore();
  const { setPopupType, toggleShowPopup } = useAccount();
  const isForceBindMobile = appStore.getLoginConfig.coerce_mobile;
  const { code, state } = to.query;
  delete to.query.code;
  delete to.query.state;
  try {
    if (code && state) {
      const data = ([__temp, __restore] = executeAsync(() => wxLogin({ code, state })), __temp = await __temp, __restore(), __temp);
      if (isForceBindMobile && !data.mobile) {
        userStore.temToken = data.token;
        setPopupType(PopupTypeEnum.BIND_MOBILE);
        toggleShowPopup(true);
        return;
      }
      userStore.login(data.token);
      ;
      [__temp, __restore] = executeAsync(() => userStore.getUser()), await __temp, __restore();
      ;
      return navigateTo(to);
    }
  } catch (error) {
    return navigateTo(to);
  }
});
const globalMiddleware = [
  route_45global,
  wxlogin_45global
];
const namedMiddleware = {};
const node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB = defineNuxtPlugin(async (nuxtApp) => {
  var _a, _b, _c, _d;
  let __temp, __restore;
  nuxtApp.vueApp.component("NuxtPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtNestedPage", NuxtPage);
  nuxtApp.vueApp.component("NuxtChild", NuxtPage);
  let routerBase = useRuntimeConfig().app.baseURL;
  if (routerOptions.hashMode && !routerBase.includes("#")) {
    routerBase += "#";
  }
  const history = (_b = (_a = routerOptions.history) == null ? void 0 : _a.call(routerOptions, routerBase)) != null ? _b : createMemoryHistory(routerBase);
  const routes = (_d = (_c = routerOptions.routes) == null ? void 0 : _c.call(routerOptions, _routes)) != null ? _d : _routes;
  const initialURL = nuxtApp.ssrContext.url;
  const router = createRouter({
    ...routerOptions,
    history,
    routes
  });
  nuxtApp.vueApp.use(router);
  const previousRoute = shallowRef(router.currentRoute.value);
  router.afterEach((_to, from) => {
    previousRoute.value = from;
  });
  Object.defineProperty(nuxtApp.vueApp.config.globalProperties, "previousRoute", {
    get: () => previousRoute.value
  });
  const _route = shallowRef(router.resolve(initialURL));
  const syncCurrentRoute = () => {
    _route.value = router.currentRoute.value;
  };
  nuxtApp.hook("page:finish", syncCurrentRoute);
  router.afterEach((to, from) => {
    var _a2, _b2, _c2, _d2;
    if (((_b2 = (_a2 = to.matched[0]) == null ? void 0 : _a2.components) == null ? void 0 : _b2.default) === ((_d2 = (_c2 = from.matched[0]) == null ? void 0 : _c2.components) == null ? void 0 : _d2.default)) {
      syncCurrentRoute();
    }
  });
  const route = {};
  for (const key in _route.value) {
    route[key] = computed(() => _route.value[key]);
  }
  nuxtApp._route = reactive(route);
  nuxtApp._middleware = nuxtApp._middleware || {
    global: [],
    named: {}
  };
  useError();
  try {
    if (true) {
      ;
      [__temp, __restore] = executeAsync(() => router.push(initialURL)), await __temp, __restore();
      ;
    }
    ;
    [__temp, __restore] = executeAsync(() => router.isReady()), await __temp, __restore();
    ;
  } catch (error2) {
    callWithNuxt(nuxtApp, showError, [error2]);
  }
  const initialLayout = useState("_layout");
  router.beforeEach(async (to, from) => {
    var _a2, _b2;
    to.meta = reactive(to.meta);
    if (nuxtApp.isHydrating) {
      to.meta.layout = (_a2 = initialLayout.value) != null ? _a2 : to.meta.layout;
    }
    nuxtApp._processingMiddleware = true;
    const middlewareEntries = /* @__PURE__ */ new Set([...globalMiddleware, ...nuxtApp._middleware.global]);
    for (const component of to.matched) {
      const componentMiddleware = component.meta.middleware;
      if (!componentMiddleware) {
        continue;
      }
      if (Array.isArray(componentMiddleware)) {
        for (const entry2 of componentMiddleware) {
          middlewareEntries.add(entry2);
        }
      } else {
        middlewareEntries.add(componentMiddleware);
      }
    }
    for (const entry2 of middlewareEntries) {
      const middleware = typeof entry2 === "string" ? nuxtApp._middleware.named[entry2] || await ((_b2 = namedMiddleware[entry2]) == null ? void 0 : _b2.call(namedMiddleware).then((r) => r.default || r)) : entry2;
      if (!middleware) {
        throw new Error(`Unknown route middleware: '${entry2}'.`);
      }
      const result = await callWithNuxt(nuxtApp, middleware, [to, from]);
      {
        if (result === false || result instanceof Error) {
          const error2 = result || createError$1({
            statusMessage: `Route navigation aborted: ${initialURL}`
          });
          return callWithNuxt(nuxtApp, showError, [error2]);
        }
      }
      if (result || result === false) {
        return result;
      }
    }
  });
  router.afterEach(async (to) => {
    delete nuxtApp._processingMiddleware;
    if (to.matched.length === 0) {
      callWithNuxt(nuxtApp, showError, [createError$1({
        statusCode: 404,
        fatal: false,
        statusMessage: `Page not found: ${to.fullPath}`
      })]);
    } else if (to.matched[0].name === "404" && nuxtApp.ssrContext) {
      nuxtApp.ssrContext.event.res.statusCode = 404;
    } else {
      const currentURL = to.fullPath || "/";
      if (!isEqual(currentURL, initialURL)) {
        await callWithNuxt(nuxtApp, navigateTo, [currentURL]);
      }
    }
  });
  nuxtApp.hooks.hookOnce("app:created", async () => {
    try {
      await router.replace({
        ...router.resolve(initialURL),
        name: void 0,
        force: true
      });
    } catch (error2) {
      callWithNuxt(nuxtApp, showError, [error2]);
    }
  });
  return { provide: { router } };
});
const node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq = defineNuxtPlugin((nuxtApp) => {
  const pinia = createPinia();
  nuxtApp.vueApp.use(pinia);
  setActivePinia(pinia);
  {
    nuxtApp.payload.pinia = pinia.state.value;
  }
  return {
    provide: {
      pinia
    }
  };
});
const plugins_element_plus_ts_HUzmwi0JYR = defineNuxtPlugin((nuxtApp) => {
  const plugins2 = [ElLoading];
  for (const plugin of plugins2) {
    nuxtApp.vueApp.use(plugin);
  }
});
var RequestMethodsEnum = /* @__PURE__ */ ((RequestMethodsEnum2) => {
  RequestMethodsEnum2["GET"] = "GET";
  RequestMethodsEnum2["POST"] = "POST";
  return RequestMethodsEnum2;
})(RequestMethodsEnum || {});
var RequestCodeEnum = /* @__PURE__ */ ((RequestCodeEnum2) => {
  RequestCodeEnum2[RequestCodeEnum2["SUCCESS"] = 1] = "SUCCESS";
  RequestCodeEnum2[RequestCodeEnum2["FAIL"] = 0] = "FAIL";
  RequestCodeEnum2[RequestCodeEnum2["LOGIN_FAILURE"] = -1] = "LOGIN_FAILURE";
  RequestCodeEnum2[RequestCodeEnum2["OPEN_NEW_PAGE"] = 2] = "OPEN_NEW_PAGE";
  return RequestCodeEnum2;
})(RequestCodeEnum || {});
class Request {
  constructor(fetchOptions) {
    __publicField(this, "requestOptions");
    __publicField(this, "fetchInstance");
    this.fetchOptions = fetchOptions;
    this.fetchInstance = $fetch.create(fetchOptions);
    this.requestOptions = fetchOptions.requestOptions;
  }
  getInstance() {
    return this.fetchInstance;
  }
  get(fetchOptions, requestOptions) {
    return this.request(
      { ...fetchOptions, method: RequestMethodsEnum.GET },
      requestOptions
    );
  }
  post(fetchOptions, requestOptions) {
    return this.request(
      { ...fetchOptions, method: RequestMethodsEnum.POST },
      requestOptions
    );
  }
  uploadFile(options, params) {
    const formData = new FormData();
    const customFilename = params.name || "file";
    formData.append(customFilename, params.file);
    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data[key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }
        formData.append(key, params.data[key]);
      });
    }
    return this.request({
      ...options,
      method: RequestMethodsEnum.POST,
      body: formData
    });
  }
  request(fetchOptions, requestOptions) {
    let mergeOptions = merge({}, this.fetchOptions, fetchOptions);
    mergeOptions.requestOptions = merge(
      {},
      this.requestOptions,
      requestOptions
    );
    const {
      requestInterceptorsHook,
      responseInterceptorsHook,
      responseInterceptorsCatchHook
    } = this.requestOptions;
    if (requestInterceptorsHook && isFunction$1(requestInterceptorsHook)) {
      mergeOptions = requestInterceptorsHook(mergeOptions);
    }
    return new Promise((resolve, reject) => {
      return this.fetchInstance.raw(mergeOptions.url, mergeOptions).then(async (response) => {
        if (responseInterceptorsHook && isFunction$1(responseInterceptorsHook)) {
          try {
            response = await responseInterceptorsHook(
              response,
              mergeOptions
            );
            resolve(response);
          } catch (error) {
            reject(error);
          }
          return;
        }
        resolve(response);
      }).catch((err) => {
        if (responseInterceptorsCatchHook && isFunction$1(responseInterceptorsCatchHook)) {
          reject(responseInterceptorsCatchHook(err));
          return;
        }
        reject(err);
      });
    });
  }
}
function createRequest(opt) {
  const userStore = useUserStore();
  const { setPopupType, toggleShowPopup } = useAccount();
  const defaultOptions = {
    baseURL: getApiUrl(),
    headers: {
      version: getVersion()
    },
    retry: 2,
    async onRequest({ options }) {
      const { withToken } = options.requestOptions;
      const headers = options.headers || {};
      if (withToken) {
        const token = userStore.token;
        headers["token"] = token;
      }
      options.headers = headers;
    },
    requestOptions: {
      apiPrefix: getApiPrefix(),
      isTransformResponse: true,
      isReturnDefaultResponse: false,
      withToken: true,
      isParamsToData: true,
      requestInterceptorsHook(options) {
        var _a;
        console.log(options);
        const { apiPrefix, isParamsToData } = options.requestOptions;
        if (apiPrefix) {
          options.url = `${apiPrefix}${options.url}`;
        }
        const params = options.params || {};
        if (isParamsToData && !Reflect.has(options, "body") && ((_a = options.method) == null ? void 0 : _a.toUpperCase()) === RequestMethodsEnum.POST) {
          options.body = params;
          options.params = {};
        }
        return options;
      },
      async responseInterceptorsHook(response, options) {
        const { isTransformResponse, isReturnDefaultResponse } = options.requestOptions;
        if (isReturnDefaultResponse) {
          return response;
        }
        if (!isTransformResponse) {
          return response._data;
        }
        const { code, data, show, msg } = response._data;
        switch (code) {
          case RequestCodeEnum.SUCCESS:
            if (show) {
              msg && feedback.msgSuccess(msg);
            }
            return data;
          case RequestCodeEnum.FAIL:
            if (show) {
              msg && feedback.msgError(msg);
            }
            return Promise.reject(data);
          case RequestCodeEnum.LOGIN_FAILURE:
            userStore.logout();
            setPopupType(PopupTypeEnum.LOGIN);
            toggleShowPopup(true);
            return Promise.reject(data);
          default:
            return data;
        }
      },
      responseInterceptorsCatchHook(err) {
        return err;
      }
    }
  };
  return new Request(
    merge(defaultOptions, opt || {})
  );
}
const plugins_fetch_ts_14DdzPiXUB = defineNuxtPlugin(() => {
  const request = createRequest();
  globalThis.$request = request;
  const $fetchOriginal = globalThis.$fetch;
  const $fetch2 = (url, opts) => {
    opts = opts != null ? opts : {};
    opts.url = url;
    return request.request(opts, opts.requestOptions);
  };
  $fetch2.raw = $fetchOriginal.raw;
  $fetch2.create = $fetchOriginal.create;
  globalThis.$fetch = $fetch2;
});
const _plugins = [
  _nuxt_components_plugin_mjs_KR1HBZs4kY,
  node_modules_nuxt_dist_head_runtime_lib_vueuse_head_plugin_mjs_D7WGfuP1A0,
  node_modules_nuxt_dist_head_runtime_plugin_mjs_1QO0gqa6n2,
  node_modules_nuxt_dist_pages_runtime_router_mjs_qNv5Ky2ZmB,
  node_modules__64pinia_nuxt_dist_runtime_plugin_vue3_mjs_A0OWXRrUgq,
  plugins_element_plus_ts_HUzmwi0JYR,
  plugins_fetch_ts_14DdzPiXUB,
  plugins_icons_ts_sncVX745v6
];
const _sfc_main$1 = {
  __name: "nuxt-root",
  __ssrInlineRender: true,
  setup(__props) {
    const ErrorComponent = defineAsyncComponent(() => import('./_nuxt/error-component.99495566.mjs').then((r) => r.default || r));
    const nuxtApp = useNuxtApp();
    provide("_route", useRoute());
    nuxtApp.hooks.callHookWith((hooks) => hooks.map((hook) => hook()), "vue:setup");
    const error = useError();
    onErrorCaptured((err, target, info) => {
      nuxtApp.hooks.callHook("vue:error", err, target, info).catch((hookError) => console.error("[nuxt] Error in `vue:error` hook", hookError));
      {
        callWithNuxt(nuxtApp, showError, [err]);
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_App = resolveComponent("App");
      ssrRenderSuspense(_push, {
        default: () => {
          if (unref(error)) {
            _push(ssrRenderComponent(unref(ErrorComponent), { error: unref(error) }, null, _parent));
          } else {
            _push(ssrRenderComponent(_component_App, null, null, _parent));
          }
        },
        _: 1
      });
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/nuxt/dist/app/components/nuxt-root.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const layouts = {
  blank: defineAsyncComponent(() => import('./_nuxt/blank.217a622f.mjs').then((m) => m.default || m)),
  default: defineAsyncComponent(() => import('./_nuxt/default.a363faa8.mjs').then((m) => m.default || m))
};
const __nuxt_component_0 = defineComponent({
  props: {
    name: {
      type: [String, Boolean, Object],
      default: null
    }
  },
  setup(props, context) {
    const route = useRoute();
    return () => {
      var _a, _b, _c;
      const layout = (_b = (_a = isRef(props.name) ? props.name.value : props.name) != null ? _a : route.meta.layout) != null ? _b : "default";
      const hasLayout = layout && layout in layouts;
      const transitionProps = (_c = route.meta.layoutTransition) != null ? _c : appLayoutTransition;
      return _wrapIf(Transition, hasLayout && transitionProps, {
        default: () => {
          return _wrapIf(layouts[layout], hasLayout, context.slots).default();
        }
      }).default();
    };
  }
});
const __nuxt_component_1 = defineComponent({
  name: "NuxtLoadingIndicator",
  props: {
    throttle: {
      type: Number,
      default: 200
    },
    duration: {
      type: Number,
      default: 2e3
    },
    height: {
      type: Number,
      default: 3
    },
    color: {
      type: String,
      default: "repeating-linear-gradient(to right,#00dc82 0%,#34cdfe 50%,#0047e1 100%)"
    }
  },
  setup(props) {
    const indicator = useLoadingIndicator({
      duration: props.duration,
      throttle: props.throttle
    });
    const nuxtApp = useNuxtApp();
    nuxtApp.hook("page:start", indicator.start);
    nuxtApp.hook("page:finish", indicator.finish);
    return () => h("div", {
      class: "nuxt-loading-indicator",
      style: {
        position: "fixed",
        top: 0,
        right: 0,
        left: 0,
        pointerEvents: "none",
        width: `${indicator.progress.value}%`,
        height: `${props.height}px`,
        opacity: indicator.isLoading.value ? 1 : 0,
        background: props.color,
        backgroundSize: `${100 / indicator.progress.value * 100}% auto`,
        transition: "width 0.1s, height 0.4s, opacity 0.4s",
        zIndex: 999999
      }
    });
  }
});
function useLoadingIndicator(opts) {
  const progress = ref(0);
  const isLoading = ref(false);
  computed(() => 1e4 / opts.duration);
  let _timer = null;
  let _throttle = null;
  function start() {
    clear();
    progress.value = 0;
    isLoading.value = true;
    if (opts.throttle)
      ;
  }
  function finish() {
    progress.value = 100;
    _hide();
  }
  function clear() {
    clearInterval(_timer);
    clearTimeout(_throttle);
    _timer = null;
    _throttle = null;
  }
  function _hide() {
    clear();
  }
  return {
    progress,
    isLoading,
    start,
    finish,
    clear
  };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "app",
  __ssrInlineRender: true,
  setup(__props) {
    provide(ID_INJECTION_KEY, {
      prefix: 100,
      current: 0
    });
    const config = {
      locale: zhCn
    };
    const appStore = useAppStore();
    const { pc_title, pc_ico, pc_keywords, pc_desc } = appStore.getWebsiteConfig;
    useHead({
      title: pc_title,
      meta: [
        { name: "description", content: pc_desc },
        { name: "keywords", content: pc_keywords }
      ],
      link: [
        {
          rel: "icon",
          href: pc_ico
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLayout = __nuxt_component_0;
      const _component_NuxtLoadingIndicator = __nuxt_component_1;
      const _component_NuxtPage = resolveComponent("NuxtPage");
      _push(ssrRenderComponent(unref(ElConfigProvider), mergeProps(config, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLayout, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLoadingIndicator, {
                    color: "#4a5dff",
                    height: 2
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_NuxtPage, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLoadingIndicator, {
                      color: "#4a5dff",
                      height: 2
                    }),
                    createVNode(_component_NuxtPage)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLayout, null, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLoadingIndicator, {
                    color: "#4a5dff",
                    height: 2
                  }),
                  createVNode(_component_NuxtPage)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("app.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
if (!globalThis.$fetch) {
  globalThis.$fetch = $fetch.create({
    baseURL: baseURL()
  });
}
let entry;
const plugins = normalizePlugins(_plugins);
{
  entry = async function createNuxtAppServer(ssrContext) {
    const vueApp = createApp(_sfc_main$1);
    vueApp.component("App", _sfc_main);
    const nuxt = createNuxtApp({ vueApp, ssrContext });
    try {
      await applyPlugins(nuxt, plugins);
      await nuxt.hooks.callHook("app:created", vueApp);
    } catch (err) {
      await nuxt.callHook("app:error", err);
      nuxt.payload.error = nuxt.payload.error || err;
    }
    return vueApp;
  };
}
const entry$1 = (ctx) => entry(ctx);

export { PopupTypeEnum as P, _sfc_main$5 as _, __nuxt_component_0$1 as a, userChangePwd as b, _export_sfc as c, useNuxtApp as d, entry$1 as default, useAppStore as e, __nuxt_component_0$2 as f, getUserInfo as g, _sfc_main$3 as h, useRoute as i, empty_news as j, _sfc_main$4 as k, feedback as l, getPolicy as m, useUserStore as n, _sfc_main$2 as o, userEdit as p, logout as q, useRouter as r, useState as s, isExternal as t, useAccount as u, getNormalPath as v, useHead as w };
//# sourceMappingURL=server.mjs.map
