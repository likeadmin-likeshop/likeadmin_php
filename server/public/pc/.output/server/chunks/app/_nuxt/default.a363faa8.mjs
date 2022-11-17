import { useSSRContext, defineComponent, unref, mergeProps, withCtx, openBlock, createBlock, Fragment, renderList, renderSlot, createVNode, createTextVNode, ref, watch, computed, resolveComponent, toDisplayString, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { c as _export_sfc, u as useAccount, n as useUserStore, r as useRouter, i as useRoute, e as useAppStore, t as isExternal, l as feedback, q as logout, f as __nuxt_component_0$2, s as useState, v as getNormalPath, a as __nuxt_component_0$1, P as PopupTypeEnum } from '../server.mjs';
import { menuProps, ElMenu, ElDropdown, ElDropdownMenu, ElDropdownItem, ElAvatar, ElIcon, ElInput, ElMenuItem, ElSubMenu, ElButton } from 'element-plus';
import { ArrowDown, Search as Search$1 } from '@element-plus/icons-vue';
import { u as useAsyncData } from './asyncData.430aca6d.mjs';
import { f as getArticleCate } from './news.50c5a1de.mjs';
import 'ohmyfetch';
import 'ufo';
import 'hookable';
import 'unctx';
import 'vue-router';
import 'destr';
import 'h3';
import 'defu';
import '@vue/shared';
import 'cookie-es';
import 'ohash';
import 'lodash-es';
import 'element-plus/es/locale/lang/zh-cn';
import '../../nitro/node-server.mjs';
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
      const _component_NuxtLink = __nuxt_component_0$2;
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
                    _push3(ssrRenderComponent(unref(ArrowDown), null, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(unref(ArrowDown))
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
                        createVNode(unref(ArrowDown))
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
        modelValue: searchKeyword.value,
        "onUpdate:modelValue": ($event) => searchKeyword.value = $event,
        modelModifiers: { trim: true },
        placeholder: "\u8BF7\u8F93\u5165\u5173\u952E\u8BCD",
        "suffix-icon": unref(Search$1),
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
      const _component_NuxtLink = __nuxt_component_0$2;
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
      const _component_NuxtLink = __nuxt_component_0$2;
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
      const _component_NuxtLink = __nuxt_component_0$2;
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
  setup(__props) {
    useAsyncData(() => getArticleCate(), "$W6AA6qpnyW");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      _push(ssrRenderComponent(_component_ClientOnly, _attrs, null, _parent));
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
      _push(ssrRenderComponent(_component_ClientOnly, null, null, _parent));
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
      const _component_NuxtLink = __nuxt_component_0$2;
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
        _push(ssrRenderComponent(_component_ClientOnly, null, null, _parent));
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
//# sourceMappingURL=default.a363faa8.mjs.map
