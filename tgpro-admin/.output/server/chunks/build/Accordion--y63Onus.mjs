import { r as mergeConfig, l as omit, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import { u as useUI, a as accordion_default, b as button_default } from './ui-G7Oicn0a.mjs';
import { s, A, o as o$1, i as i$1, u, N as N$1, a as o } from './keyboard-CvjRf4Wb.mjs';
import { s as s$1 } from './use-resolve-button-type-eioNRL5V.mjs';
import { l, i, t } from './open-closed-Dsm1EOia.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, renderSlot, createTextVNode, toDisplayString, withKeys, Transition, createBlock, withDirectives, openBlock, vShow, toRef, computed, ref, watch, provide, watchEffect, inject, useId, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrRenderSlot, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import '../nitro/nitro.mjs';
import 'mysql2/promise';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'vue-router';
import 'perfect-debounce';
import '@vueuse/core';
import 'tailwind-merge';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './components-CqoEyeNn.mjs';
import '@iconify/utils/lib/css/icon';
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';

var $ = ((o$2) => (o$2[o$2.Open = 0] = "Open", o$2[o$2.Closed = 1] = "Closed", o$2))($ || {});
var T = Symbol("DisclosureContext");
function O(t$1) {
  let r = inject(T, null);
  if (r === null) {
    let o$2 = /* @__PURE__ */ new Error(`<${t$1} /> is missing a parent <Disclosure /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(o$2, O), o$2;
  }
  return r;
}
var k = Symbol("DisclosurePanelContext");
function U() {
  return inject(k, null);
}
var N = defineComponent({
  name: "Disclosure",
  props: {
    as: {
      type: [Object, String],
      default: "template"
    },
    defaultOpen: {
      type: [Boolean],
      default: false
    }
  },
  setup(t$1, { slots: r, attrs: o$2 }) {
    let s$2 = ref(t$1.defaultOpen ? 0 : 1), e = ref(null), i$2 = ref(null), n = {
      buttonId: ref(`headlessui-disclosure-button-${i$1()}`),
      panelId: ref(`headlessui-disclosure-panel-${i$1()}`),
      disclosureState: s$2,
      panel: e,
      button: i$2,
      toggleDisclosure() {
        s$2.value = u(s$2.value, {
          [0]: 1,
          [1]: 0
        });
      },
      closeDisclosure() {
        s$2.value !== 1 && (s$2.value = 1);
      },
      close(l$1) {
        var _a;
        n.closeDisclosure();
        (_a = (() => l$1 ? l$1 instanceof HTMLElement ? l$1 : l$1.value instanceof HTMLElement ? o$1(l$1) : o$1(n.button) : o$1(n.button))()) == null ? void 0 : _a.focus();
      }
    };
    return provide(T, n), t(computed(() => u(s$2.value, {
      [0]: i.Open,
      [1]: i.Closed
    }))), () => {
      let { defaultOpen: l$1, ...a } = t$1;
      return A({
        theirProps: a,
        ourProps: {},
        slot: {
          open: s$2.value === 0,
          close: n.close
        },
        slots: r,
        attrs: o$2,
        name: "Disclosure"
      });
    };
  }
}), Q = defineComponent({
  name: "DisclosureButton",
  props: {
    as: {
      type: [Object, String],
      default: "button"
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  setup(t$1, { attrs: r, slots: o$2, expose: s$2 }) {
    let e = O("DisclosureButton"), i$2 = U(), n = computed(() => i$2 === null ? false : i$2.value === e.panelId.value);
    let l$1 = ref(null);
    s$2({
      el: l$1,
      $el: l$1
    }), n.value || watchEffect(() => {
      e.button.value = l$1.value;
    });
    let a = s$1(computed(() => ({
      as: t$1.as,
      type: r.type
    })), l$1);
    function c() {
      var u$1;
      t$1.disabled || (n.value ? (e.toggleDisclosure(), (u$1 = o$1(e.button)) == null || u$1.focus()) : e.toggleDisclosure());
    }
    function D(u$1) {
      var S;
      if (!t$1.disabled) if (n.value) switch (u$1.key) {
        case o.Space:
        case o.Enter:
          u$1.preventDefault(), u$1.stopPropagation(), e.toggleDisclosure(), (S = o$1(e.button)) == null || S.focus();
          break;
      }
      else switch (u$1.key) {
        case o.Space:
        case o.Enter:
          u$1.preventDefault(), u$1.stopPropagation(), e.toggleDisclosure();
          break;
      }
    }
    function v(u$1) {
      switch (u$1.key) {
        case o.Space:
          u$1.preventDefault();
          break;
      }
    }
    return () => {
      var C;
      let u$1 = { open: e.disclosureState.value === 0 }, { id: S, ...K } = t$1;
      return A({
        ourProps: n.value ? {
          ref: l$1,
          type: a.value,
          onClick: c,
          onKeydown: D
        } : {
          id: (C = e.buttonId.value) != null ? C : S,
          ref: l$1,
          type: a.value,
          "aria-expanded": e.disclosureState.value === 0,
          "aria-controls": e.disclosureState.value === 0 || o$1(e.panel) ? e.panelId.value : void 0,
          disabled: t$1.disabled ? true : void 0,
          onClick: c,
          onKeydown: D,
          onKeyup: v
        },
        theirProps: K,
        slot: u$1,
        attrs: r,
        slots: o$2,
        name: "DisclosureButton"
      });
    };
  }
}), V = defineComponent({
  name: "DisclosurePanel",
  props: {
    as: {
      type: [Object, String],
      default: "div"
    },
    static: {
      type: Boolean,
      default: false
    },
    unmount: {
      type: Boolean,
      default: true
    },
    id: {
      type: String,
      default: null
    }
  },
  setup(t$1, { attrs: r, slots: o$2, expose: s$2 }) {
    let e = O("DisclosurePanel");
    s$2({
      el: e.panel,
      $el: e.panel
    }), provide(k, e.panelId);
    let i$2 = l(), n = computed(() => i$2 !== null ? (i$2.value & i.Open) === i.Open : e.disclosureState.value === 0);
    return () => {
      var v;
      let l$1 = {
        open: e.disclosureState.value === 0,
        close: e.close
      }, { id: a, ...c } = t$1;
      return A({
        ourProps: {
          id: (v = e.panelId.value) != null ? v : a,
          ref: e.panel
        },
        theirProps: c,
        slot: l$1,
        attrs: r,
        slots: o$2,
        features: N$1.RenderStrategy | N$1.Static,
        visible: n.value,
        name: "DisclosurePanel"
      });
    };
  }
});
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.accordion, accordion_default);
var configButton = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.button, button_default);
var _sfc_main = defineComponent({
  components: {
    HDisclosure: N,
    HDisclosureButton: Q,
    HDisclosurePanel: V,
    UIcon: Icon_default,
    UButton: Button_default
  },
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      default: () => []
    },
    defaultOpen: {
      type: Boolean,
      default: false
    },
    openIcon: {
      type: String,
      default: () => config.default.openIcon
    },
    unmount: {
      type: Boolean,
      default: false
    },
    closeIcon: {
      type: String,
      default: () => config.default.closeIcon
    },
    multiple: {
      type: Boolean,
      default: false
    },
    class: {
      type: [
        String,
        Object,
        Array
      ],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["open", "close"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("accordion", toRef(props, "ui"), config, toRef(props, "class"));
    const uiButton = computed(() => configButton);
    const buttonRefs = ref([]);
    watch(computed(() => buttonRefs.value.map(({ open }) => open)), (newValue, oldValue) => {
      for (const index in newValue) {
        const isOpenBefore = oldValue[index];
        const isOpenAfter = newValue[index];
        if (!isOpenBefore && isOpenAfter) emit("open", index);
        else if (isOpenBefore && !isOpenAfter) emit("close", index);
      }
    }, { immediate: true });
    function closeOthers(currentIndex, e) {
      if (!props.items[currentIndex].closeOthers && props.multiple) return;
      buttonRefs.value.forEach((button2) => {
        if (button2.open) button2.close(e.target);
      });
    }
    function onEnter(_el, done) {
      const el = _el;
      el.style.height = "0";
      el.offsetHeight;
      el.style.height = el.scrollHeight + "px";
      el.addEventListener("transitionend", done, { once: true });
    }
    function onBeforeLeave(_el) {
      const el = _el;
      el.style.height = el.scrollHeight + "px";
      el.offsetHeight;
    }
    function onAfterEnter(_el) {
      const el = _el;
      el.style.height = "auto";
    }
    function onLeave(_el, done) {
      const el = _el;
      el.style.height = "0";
      el.addEventListener("transitionend", done, { once: true });
    }
    s(() => useId());
    return {
      ui,
      uiButton,
      attrs,
      buttonRefs,
      closeOthers,
      omit,
      onEnter,
      onBeforeLeave,
      onAfterEnter,
      onLeave
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HDisclosure = resolveComponent("HDisclosure");
  const _component_HDisclosureButton = resolveComponent("HDisclosureButton");
  const _component_UButton = Button_default;
  const _component_UIcon = Icon_default;
  const _component_HDisclosurePanel = resolveComponent("HDisclosurePanel");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.ui.wrapper }, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.items, (item, index) => {
    _push(ssrRenderComponent(_component_HDisclosure, {
      key: index,
      as: "div",
      class: _ctx.ui.container,
      "default-open": _ctx.defaultOpen || item.defaultOpen
    }, {
      default: withCtx(({ open, close }, _push$1, _parent$1, _scopeId) => {
        if (_push$1) {
          _push$1(ssrRenderComponent(_component_HDisclosureButton, {
            ref_for: true,
            ref: () => _ctx.buttonRefs[index] = {
              open,
              close
            },
            as: "template",
            disabled: item.disabled,
            onClick: ($event) => _ctx.closeOthers(index, $event),
            onKeydown: [($event) => _ctx.closeOthers(index, $event), ($event) => _ctx.closeOthers(index, $event)]
          }, {
            default: withCtx((_, _push$2, _parent$2, _scopeId$1) => {
              if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {
                item,
                index,
                open,
                close
              }, () => {
                _push$2(ssrRenderComponent(_component_UButton, mergeProps({ ref_for: true }, {
                  ..._ctx.omit(_ctx.ui.default, ["openIcon", "closeIcon"]),
                  ..._ctx.attrs,
                  ..._ctx.omit(item, [
                    "slot",
                    "disabled",
                    "content",
                    "defaultOpen"
                  ])
                }), {
                  trailing: withCtx((_$1, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) _push$3(ssrRenderComponent(_component_UIcon, {
                      name: !open ? _ctx.openIcon : _ctx.closeIcon ? _ctx.closeIcon : _ctx.openIcon,
                      class: [
                        open && !_ctx.closeIcon ? "-rotate-180" : "",
                        _ctx.uiButton.icon.size[item.size || _ctx.uiButton.default.size],
                        _ctx.ui.item.icon
                      ]
                    }, null, _parent$3, _scopeId$2));
                    else return [createVNode(_component_UIcon, {
                      name: !open ? _ctx.openIcon : _ctx.closeIcon ? _ctx.closeIcon : _ctx.openIcon,
                      class: [
                        open && !_ctx.closeIcon ? "-rotate-180" : "",
                        _ctx.uiButton.icon.size[item.size || _ctx.uiButton.default.size],
                        _ctx.ui.item.icon
                      ]
                    }, null, 8, ["name", "class"])];
                  }),
                  _: 2
                }, _parent$2, _scopeId$1));
              }, _push$2, _parent$2, _scopeId$1);
              else return [renderSlot(_ctx.$slots, "default", {
                item,
                index,
                open,
                close
              }, () => [createVNode(_component_UButton, mergeProps({ ref_for: true }, {
                ..._ctx.omit(_ctx.ui.default, ["openIcon", "closeIcon"]),
                ..._ctx.attrs,
                ..._ctx.omit(item, [
                  "slot",
                  "disabled",
                  "content",
                  "defaultOpen"
                ])
              }), {
                trailing: withCtx(() => [createVNode(_component_UIcon, {
                  name: !open ? _ctx.openIcon : _ctx.closeIcon ? _ctx.closeIcon : _ctx.openIcon,
                  class: [
                    open && !_ctx.closeIcon ? "-rotate-180" : "",
                    _ctx.uiButton.icon.size[item.size || _ctx.uiButton.default.size],
                    _ctx.ui.item.icon
                  ]
                }, null, 8, ["name", "class"])]),
                _: 2
              }, 1040)])];
            }),
            _: 2
          }, _parent$1, _scopeId));
          _push$1(``);
          if (_ctx.unmount) _push$1(ssrRenderComponent(_component_HDisclosurePanel, {
            class: [
              _ctx.ui.item.base,
              _ctx.ui.item.size,
              _ctx.ui.item.color,
              _ctx.ui.item.padding
            ],
            unmount: ""
          }, {
            default: withCtx((_, _push$2, _parent$2, _scopeId$1) => {
              if (_push$2) ssrRenderSlot(_ctx.$slots, item.slot || "item", {
                item,
                index,
                open,
                close
              }, () => {
                _push$2(`${ssrInterpolate(item.content)}`);
              }, _push$2, _parent$2, _scopeId$1);
              else return [renderSlot(_ctx.$slots, item.slot || "item", {
                item,
                index,
                open,
                close
              }, () => [createTextVNode(toDisplayString(item.content), 1)])];
            }),
            _: 2
          }, _parent$1, _scopeId));
          else {
            _push$1(`<div style="${ssrRenderStyle(open ? null : { display: "none" })}"${_scopeId}>`);
            _push$1(ssrRenderComponent(_component_HDisclosurePanel, {
              class: [
                _ctx.ui.item.base,
                _ctx.ui.item.size,
                _ctx.ui.item.color,
                _ctx.ui.item.padding
              ],
              static: ""
            }, {
              default: withCtx((_, _push$2, _parent$2, _scopeId$1) => {
                if (_push$2) ssrRenderSlot(_ctx.$slots, item.slot || "item", {
                  item,
                  index,
                  open,
                  close
                }, () => {
                  _push$2(`${ssrInterpolate(item.content)}`);
                }, _push$2, _parent$2, _scopeId$1);
                else return [renderSlot(_ctx.$slots, item.slot || "item", {
                  item,
                  index,
                  open,
                  close
                }, () => [createTextVNode(toDisplayString(item.content), 1)])];
              }),
              _: 2
            }, _parent$1, _scopeId));
            _push$1(`</div>`);
          }
        } else return [createVNode(_component_HDisclosureButton, {
          ref_for: true,
          ref: () => _ctx.buttonRefs[index] = {
            open,
            close
          },
          as: "template",
          disabled: item.disabled,
          onClick: ($event) => _ctx.closeOthers(index, $event),
          onKeydown: [withKeys(($event) => _ctx.closeOthers(index, $event), ["enter"]), withKeys(($event) => _ctx.closeOthers(index, $event), ["space"])]
        }, {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
            item,
            index,
            open,
            close
          }, () => [createVNode(_component_UButton, mergeProps({ ref_for: true }, {
            ..._ctx.omit(_ctx.ui.default, ["openIcon", "closeIcon"]),
            ..._ctx.attrs,
            ..._ctx.omit(item, [
              "slot",
              "disabled",
              "content",
              "defaultOpen"
            ])
          }), {
            trailing: withCtx(() => [createVNode(_component_UIcon, {
              name: !open ? _ctx.openIcon : _ctx.closeIcon ? _ctx.closeIcon : _ctx.openIcon,
              class: [
                open && !_ctx.closeIcon ? "-rotate-180" : "",
                _ctx.uiButton.icon.size[item.size || _ctx.uiButton.default.size],
                _ctx.ui.item.icon
              ]
            }, null, 8, ["name", "class"])]),
            _: 2
          }, 1040)])]),
          _: 2
        }, 1032, [
          "disabled",
          "onClick",
          "onKeydown"
        ]), createVNode(Transition, mergeProps({ ref_for: true }, _ctx.ui.transition, {
          onEnter: _ctx.onEnter,
          onAfterEnter: _ctx.onAfterEnter,
          onBeforeLeave: _ctx.onBeforeLeave,
          onLeave: _ctx.onLeave
        }), {
          default: withCtx(() => [_ctx.unmount ? (openBlock(), createBlock(_component_HDisclosurePanel, {
            key: 0,
            class: [
              _ctx.ui.item.base,
              _ctx.ui.item.size,
              _ctx.ui.item.color,
              _ctx.ui.item.padding
            ],
            unmount: ""
          }, {
            default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || "item", {
              item,
              index,
              open,
              close
            }, () => [createTextVNode(toDisplayString(item.content), 1)])]),
            _: 2
          }, 1032, ["class"])) : withDirectives((openBlock(), createBlock("div", { key: 1 }, [createVNode(_component_HDisclosurePanel, {
            class: [
              _ctx.ui.item.base,
              _ctx.ui.item.size,
              _ctx.ui.item.color,
              _ctx.ui.item.padding
            ],
            static: ""
          }, {
            default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || "item", {
              item,
              index,
              open,
              close
            }, () => [createTextVNode(toDisplayString(item.content), 1)])]),
            _: 2
          }, 1032, ["class"])], 512)), [[vShow, open]])]),
          _: 2
        }, 1040, [
          "onEnter",
          "onAfterEnter",
          "onBeforeLeave",
          "onLeave"
        ])];
      }),
      _: 2
    }, _parent));
  });
  _push(`<!--]--></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Accordion.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Accordion_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Accordion_default as default };
//# sourceMappingURL=Accordion--y63Onus.mjs.map
