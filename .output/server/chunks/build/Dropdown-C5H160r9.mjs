import { _ as __nuxt_component_0 } from './nuxt-link-C6IP2oPu.mjs';
import __nuxt_component_0$1 from './Icon-ZhGvf9gZ.mjs';
import { _ as __nuxt_component_3 } from './Avatar-CObRxxxv.mjs';
import __nuxt_component_0$2 from './Kbd-Dk7iaoIe.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, renderSlot, createVNode, resolveDynamicComponent, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, Transition, toRef, computed, ref, watch, onMounted, onUnmounted, watchEffect, nextTick, provide, inject, useId, useSSRContext } from 'vue';
import { s, i, o as o$1, A as A$1, N, u, a as o } from './keyboard-Duq8EHr3.mjs';
import { w } from './use-outside-click-BHqYmLlt.mjs';
import { s as s$1 } from './use-resolve-button-type-DOOP2SMg.mjs';
import { p } from './use-text-value-CfKvyAwN.mjs';
import { u as u$1, i as i$1, f, c } from './calculate-active-index-Dujs8zvP.mjs';
import { l, i as i$2, t } from './open-closed-BDzQJ33n.mjs';
import { w as w$1, h, O as O$1, v, N as N$1, _ } from './focus-management-vHH7q6nP.mjs';
import { t as defu } from '../nitro/nitro.mjs';
import { twJoin } from 'tailwind-merge';
import { u as useUI, d as dropdown } from './tooltip-BtqstB0H.mjs';
import { u as usePopper } from './usePopper-BrvKSG9Z.mjs';
import { m as mergeConfig, t as twMerge, a as appConfig } from './server.mjs';
import { ssrRenderComponent, ssrRenderSlot, ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderVNode, ssrInterpolate } from 'vue/server-renderer';
import { _ as _export_sfc } from './_plugin-vue_export-helper-1tPrXgE0.mjs';
import { g as getNuxtLinkProps } from './link-Bz3Wc5MF.mjs';
import './index-C6m-0LTF.mjs';
import '@iconify/vue';
import '@iconify/utils/lib/css/icon';
import 'mysql2/promise';
import 'fs';
import 'path';
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
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import '@vueuse/core';

var Z = ((i2) => (i2[i2.Open = 0] = "Open", i2[i2.Closed = 1] = "Closed", i2))(Z || {}), ee = ((i2) => (i2[i2.Pointer = 0] = "Pointer", i2[i2.Other = 1] = "Other", i2))(ee || {});
function te(o2) {
  requestAnimationFrame(() => requestAnimationFrame(o2));
}
let A = Symbol("MenuContext");
function O(o2) {
  let M = inject(A, null);
  if (M === null) {
    let i2 = new Error(`<${o2} /> is missing a parent <Menu /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(i2, O), i2;
  }
  return M;
}
let ge = defineComponent({ name: "Menu", props: { as: { type: [Object, String], default: "template" } }, setup(o$12, { slots: M, attrs: i2 }) {
  let I = ref(1), p2 = ref(null), e = ref(null), r = ref([]), f$1 = ref(""), d = ref(null), g = ref(1);
  function b(t2 = (a) => a) {
    let a = d.value !== null ? r.value[d.value] : null, n = O$1(t2(r.value.slice()), (v2) => o$1(v2.dataRef.domRef)), s2 = a ? n.indexOf(a) : null;
    return s2 === -1 && (s2 = null), { items: n, activeItemIndex: s2 };
  }
  let l2 = { menuState: I, buttonRef: p2, itemsRef: e, items: r, searchQuery: f$1, activeItemIndex: d, activationTrigger: g, closeMenu: () => {
    I.value = 1, d.value = null;
  }, openMenu: () => I.value = 0, goToItem(t2, a, n) {
    let s2 = b(), v2 = f(t2 === c.Specific ? { focus: c.Specific, id: a } : { focus: t2 }, { resolveItems: () => s2.items, resolveActiveIndex: () => s2.activeItemIndex, resolveId: (u2) => u2.id, resolveDisabled: (u2) => u2.dataRef.disabled });
    f$1.value = "", d.value = v2, g.value = n != null ? n : 1, r.value = s2.items;
  }, search(t2) {
    let n = f$1.value !== "" ? 0 : 1;
    f$1.value += t2.toLowerCase();
    let v2 = (d.value !== null ? r.value.slice(d.value + n).concat(r.value.slice(0, d.value + n)) : r.value).find((h2) => h2.dataRef.textValue.startsWith(f$1.value) && !h2.dataRef.disabled), u2 = v2 ? r.value.indexOf(v2) : -1;
    u2 === -1 || u2 === d.value || (d.value = u2, g.value = 1);
  }, clearSearch() {
    f$1.value = "";
  }, registerItem(t2, a) {
    let n = b((s2) => [...s2, { id: t2, dataRef: a }]);
    r.value = n.items, d.value = n.activeItemIndex, g.value = 1;
  }, unregisterItem(t2) {
    let a = b((n) => {
      let s2 = n.findIndex((v2) => v2.id === t2);
      return s2 !== -1 && n.splice(s2, 1), n;
    });
    r.value = a.items, d.value = a.activeItemIndex, g.value = 1;
  } };
  return w([p2, e], (t2, a) => {
    var n;
    l2.closeMenu(), w$1(a, h.Loose) || (t2.preventDefault(), (n = o$1(p2)) == null || n.focus());
  }, computed(() => I.value === 0)), provide(A, l2), t(computed(() => u(I.value, { [0]: i$2.Open, [1]: i$2.Closed }))), () => {
    let t2 = { open: I.value === 0, close: l2.closeMenu };
    return A$1({ ourProps: {}, theirProps: o$12, slot: t2, slots: M, attrs: i2, name: "Menu" });
  };
} }), Se = defineComponent({ name: "MenuButton", props: { disabled: { type: Boolean, default: false }, as: { type: [Object, String], default: "button" }, id: { type: String, default: null } }, setup(o$2, { attrs: M, slots: i$12, expose: I }) {
  var b;
  let p2 = (b = o$2.id) != null ? b : `headlessui-menu-button-${i()}`, e = O("MenuButton");
  I({ el: e.buttonRef, $el: e.buttonRef });
  function r(l2) {
    switch (l2.key) {
      case o.Space:
      case o.Enter:
      case o.ArrowDown:
        l2.preventDefault(), l2.stopPropagation(), e.openMenu(), nextTick(() => {
          var t2;
          (t2 = o$1(e.itemsRef)) == null || t2.focus({ preventScroll: true }), e.goToItem(c.First);
        });
        break;
      case o.ArrowUp:
        l2.preventDefault(), l2.stopPropagation(), e.openMenu(), nextTick(() => {
          var t2;
          (t2 = o$1(e.itemsRef)) == null || t2.focus({ preventScroll: true }), e.goToItem(c.Last);
        });
        break;
    }
  }
  function f2(l2) {
    switch (l2.key) {
      case o.Space:
        l2.preventDefault();
        break;
    }
  }
  function d(l2) {
    o$2.disabled || (e.menuState.value === 0 ? (e.closeMenu(), nextTick(() => {
      var t2;
      return (t2 = o$1(e.buttonRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })) : (l2.preventDefault(), e.openMenu(), te(() => {
      var t2;
      return (t2 = o$1(e.itemsRef)) == null ? void 0 : t2.focus({ preventScroll: true });
    })));
  }
  let g = s$1(computed(() => ({ as: o$2.as, type: M.type })), e.buttonRef);
  return () => {
    var n;
    let l2 = { open: e.menuState.value === 0 }, { ...t2 } = o$2, a = { ref: e.buttonRef, id: p2, type: g.value, "aria-haspopup": "menu", "aria-controls": (n = o$1(e.itemsRef)) == null ? void 0 : n.id, "aria-expanded": e.menuState.value === 0, onKeydown: r, onKeyup: f2, onClick: d };
    return A$1({ ourProps: a, theirProps: t2, slot: l2, attrs: M, slots: i$12, name: "MenuButton" });
  };
} }), Me = defineComponent({ name: "MenuItems", props: { as: { type: [Object, String], default: "div" }, static: { type: Boolean, default: false }, unmount: { type: Boolean, default: true }, id: { type: String, default: null } }, setup(o$2, { attrs: M, slots: i$3, expose: I }) {
  var l$1;
  let p2 = (l$1 = o$2.id) != null ? l$1 : `headlessui-menu-items-${i()}`, e = O("MenuItems"), r = ref(null);
  I({ el: e.itemsRef, $el: e.itemsRef }), i$1({ container: computed(() => o$1(e.itemsRef)), enabled: computed(() => e.menuState.value === 0), accept(t2) {
    return t2.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : t2.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
  }, walk(t2) {
    t2.setAttribute("role", "none");
  } });
  function f2(t2) {
    var a;
    switch (r.value && clearTimeout(r.value), t2.key) {
      case o.Space:
        if (e.searchQuery.value !== "") return t2.preventDefault(), t2.stopPropagation(), e.search(t2.key);
      case o.Enter:
        if (t2.preventDefault(), t2.stopPropagation(), e.activeItemIndex.value !== null) {
          let s2 = e.items.value[e.activeItemIndex.value];
          (a = o$1(s2.dataRef.domRef)) == null || a.click();
        }
        e.closeMenu(), _(o$1(e.buttonRef));
        break;
      case o.ArrowDown:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(c.Next);
      case o.ArrowUp:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(c.Previous);
      case o.Home:
      case o.PageUp:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(c.First);
      case o.End:
      case o.PageDown:
        return t2.preventDefault(), t2.stopPropagation(), e.goToItem(c.Last);
      case o.Escape:
        t2.preventDefault(), t2.stopPropagation(), e.closeMenu(), nextTick(() => {
          var n;
          return (n = o$1(e.buttonRef)) == null ? void 0 : n.focus({ preventScroll: true });
        });
        break;
      case o.Tab:
        t2.preventDefault(), t2.stopPropagation(), e.closeMenu(), nextTick(() => v(o$1(e.buttonRef), t2.shiftKey ? N$1.Previous : N$1.Next));
        break;
      default:
        t2.key.length === 1 && (e.search(t2.key), r.value = setTimeout(() => e.clearSearch(), 350));
        break;
    }
  }
  function d(t2) {
    switch (t2.key) {
      case o.Space:
        t2.preventDefault();
        break;
    }
  }
  let g = l(), b = computed(() => g !== null ? (g.value & i$2.Open) === i$2.Open : e.menuState.value === 0);
  return () => {
    var s2, v2;
    let t2 = { open: e.menuState.value === 0 }, { ...a } = o$2, n = { "aria-activedescendant": e.activeItemIndex.value === null || (s2 = e.items.value[e.activeItemIndex.value]) == null ? void 0 : s2.id, "aria-labelledby": (v2 = o$1(e.buttonRef)) == null ? void 0 : v2.id, id: p2, onKeydown: f2, onKeyup: d, role: "menu", tabIndex: 0, ref: e.itemsRef };
    return A$1({ ourProps: n, theirProps: a, slot: t2, attrs: M, slots: i$3, features: N.RenderStrategy | N.Static, visible: b.value, name: "MenuItems" });
  };
} }), be = defineComponent({ name: "MenuItem", inheritAttrs: false, props: { as: { type: [Object, String], default: "template" }, disabled: { type: Boolean, default: false }, id: { type: String, default: null } }, setup(o$12, { slots: M, attrs: i$12, expose: I }) {
  var v2;
  let p$1 = (v2 = o$12.id) != null ? v2 : `headlessui-menu-item-${i()}`, e = O("MenuItem"), r = ref(null);
  I({ el: r, $el: r });
  let f2 = computed(() => e.activeItemIndex.value !== null ? e.items.value[e.activeItemIndex.value].id === p$1 : false), d = p(r), g = computed(() => ({ disabled: o$12.disabled, get textValue() {
    return d();
  }, domRef: r }));
  onMounted(() => e.registerItem(p$1, g)), onUnmounted(() => e.unregisterItem(p$1)), watchEffect(() => {
    e.menuState.value === 0 && f2.value && e.activationTrigger.value !== 0 && nextTick(() => {
      var u2, h2;
      return (h2 = (u2 = o$1(r)) == null ? void 0 : u2.scrollIntoView) == null ? void 0 : h2.call(u2, { block: "nearest" });
    });
  });
  function b(u2) {
    if (o$12.disabled) return u2.preventDefault();
    e.closeMenu(), _(o$1(e.buttonRef));
  }
  function l2() {
    if (o$12.disabled) return e.goToItem(c.Nothing);
    e.goToItem(c.Specific, p$1);
  }
  let t2 = u$1();
  function a(u2) {
    t2.update(u2);
  }
  function n(u2) {
    t2.wasMoved(u2) && (o$12.disabled || f2.value || e.goToItem(c.Specific, p$1, 0));
  }
  function s2(u2) {
    t2.wasMoved(u2) && (o$12.disabled || f2.value && e.goToItem(c.Nothing));
  }
  return () => {
    let { disabled: u2, ...h2 } = o$12, C = { active: f2.value, disabled: u2, close: e.closeMenu };
    return A$1({ ourProps: { id: p$1, ref: r, role: "menuitem", tabIndex: u2 === true ? void 0 : -1, "aria-disabled": u2 === true ? true : void 0, onClick: b, onFocus: l2, onPointerenter: a, onMouseenter: a, onPointermove: n, onMousemove: n, onPointerleave: s2, onMouseleave: s2 }, theirProps: { ...i$12, ...h2 }, slot: C, attrs: i$12, slots: M, name: "MenuItem" });
  };
} });
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.dropdown, dropdown);
const _sfc_main = defineComponent({
  components: {
    HMenu: ge,
    HMenuButton: Se,
    HMenuItems: Me,
    HMenuItem: be,
    UIcon: __nuxt_component_0$1,
    UAvatar: __nuxt_component_3,
    UKbd: __nuxt_component_0$2
  },
  inheritAttrs: false,
  props: {
    items: {
      type: Array,
      default: () => []
    },
    mode: {
      type: String,
      default: "click",
      validator: (value) => ["click", "hover"].includes(value)
    },
    open: {
      type: Boolean,
      default: void 0
    },
    disabled: {
      type: Boolean,
      default: false
    },
    popper: {
      type: Object,
      default: () => ({})
    },
    openDelay: {
      type: Number,
      default: () => config.default.openDelay
    },
    closeDelay: {
      type: Number,
      default: () => config.default.closeDelay
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:open"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("dropdown", toRef(props, "ui"), config, toRef(props, "class"));
    const popper = computed(() => defu(props.mode === "hover" ? { offsetDistance: 0 } : {}, props.popper, ui.value.popper));
    const [trigger, container] = usePopper(popper.value);
    const menuApi = ref(null);
    let openTimeout = null;
    let closeTimeout = null;
    const containerStyle = computed(() => {
      var _a, _b, _c;
      if (props.mode !== "hover") {
        return {};
      }
      const offsetDistance = ((_a = props.popper) == null ? void 0 : _a.offsetDistance) || ((_b = ui.value.popper) == null ? void 0 : _b.offsetDistance) || 8;
      const placement = (_c = popper.value.placement) == null ? void 0 : _c.split("-")[0];
      const padding = `${offsetDistance}px`;
      if (placement === "top" || placement === "bottom") {
        return {
          paddingTop: padding,
          paddingBottom: padding
        };
      } else if (placement === "left" || placement === "right") {
        return {
          paddingLeft: padding,
          paddingRight: padding
        };
      } else {
        return {
          paddingTop: padding,
          paddingBottom: padding,
          paddingLeft: padding,
          paddingRight: padding
        };
      }
    });
    function onTouchStart(event) {
      if (!event.cancelable || !menuApi.value || props.mode === "click") {
        return;
      }
      if (menuApi.value.menuState === 0) {
        menuApi.value.closeMenu();
      } else {
        menuApi.value.openMenu();
      }
    }
    function onMouseEnter() {
      if (props.mode !== "hover" || !menuApi.value) {
        return;
      }
      if (closeTimeout) {
        clearTimeout(closeTimeout);
        closeTimeout = null;
      }
      if (menuApi.value.menuState === 0) {
        return;
      }
      openTimeout = openTimeout || setTimeout(() => {
        if (menuApi.value.openMenu) {
          menuApi.value.openMenu();
        }
        openTimeout = null;
      }, props.openDelay);
    }
    function onMouseLeave() {
      if (props.mode !== "hover" || !menuApi.value) {
        return;
      }
      if (openTimeout) {
        clearTimeout(openTimeout);
        openTimeout = null;
      }
      if (menuApi.value.menuState === 1) {
        return;
      }
      closeTimeout = closeTimeout || setTimeout(() => {
        if (menuApi.value.closeMenu) {
          menuApi.value.closeMenu();
        }
        closeTimeout = null;
      }, props.closeDelay);
    }
    function onClick(e, item, { href, navigate, close, isExternal }) {
      if (item.click) {
        item.click(e);
      }
      if (href && !isExternal) {
        navigate(e);
        close();
      }
    }
    watch(() => props.open, (newValue, oldValue) => {
      if (!menuApi.value) return;
      if (oldValue === void 0 || newValue === oldValue) return;
      if (newValue) {
        menuApi.value.openMenu();
      } else {
        menuApi.value.closeMenu();
      }
    });
    watch(() => {
      var _a;
      return (_a = menuApi.value) == null ? void 0 : _a.menuState;
    }, (newValue, oldValue) => {
      if (oldValue === void 0 || newValue === oldValue) return;
      emit("update:open", newValue === 0);
    });
    const NuxtLink = __nuxt_component_0;
    s(() => useId("$ctlRmIk4j0"));
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      // eslint-disable-next-line vue/no-dupe-keys
      popper,
      trigger,
      container,
      containerStyle,
      onTouchStart,
      onMouseEnter,
      onMouseLeave,
      onClick,
      getNuxtLinkProps,
      twMerge,
      twJoin,
      NuxtLink
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HMenu = resolveComponent("HMenu");
  const _component_HMenuButton = resolveComponent("HMenuButton");
  const _component_HMenuItems = resolveComponent("HMenuItems");
  const _component_NuxtLink = __nuxt_component_0;
  const _component_HMenuItem = resolveComponent("HMenuItem");
  const _component_UIcon = __nuxt_component_0$1;
  const _component_UAvatar = __nuxt_component_3;
  const _component_UKbd = __nuxt_component_0$2;
  _push(ssrRenderComponent(_component_HMenu, mergeProps({
    as: "div",
    class: _ctx.ui.wrapper
  }, _ctx.attrs, { onMouseleave: _ctx.onMouseLeave }, _attrs), {
    default: withCtx(({ open }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_HMenuButton, {
          ref: "trigger",
          as: "div",
          disabled: _ctx.disabled,
          class: _ctx.ui.trigger,
          role: "button",
          onMouseenter: _ctx.onMouseEnter,
          onTouchstart: _ctx.onTouchStart
        }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              ssrRenderSlot(_ctx.$slots, "default", {
                open,
                disabled: _ctx.disabled
              }, () => {
                _push3(`<button${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${_scopeId2}> Open </button>`);
              }, _push3, _parent3, _scopeId2);
            } else {
              return [
                renderSlot(_ctx.$slots, "default", {
                  open,
                  disabled: _ctx.disabled
                }, () => [
                  createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])
                ])
              ];
            }
          }),
          _: 2
        }, _parent2, _scopeId));
        if (open && _ctx.items.length) {
          _push2(`<div class="${ssrRenderClass([_ctx.ui.container, _ctx.ui.width])}" style="${ssrRenderStyle(_ctx.containerStyle)}"${_scopeId}><template><div${_scopeId}>`);
          if (_ctx.popper.arrow) {
            _push2(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.ui.arrow))}"${_scopeId}></div>`);
          } else {
            _push2(`<!---->`);
          }
          _push2(ssrRenderComponent(_component_HMenuItems, {
            class: [_ctx.ui.base, _ctx.ui.divide, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.shadow, _ctx.ui.background, _ctx.ui.height],
            static: ""
          }, {
            default: withCtx((_2, _push3, _parent3, _scopeId2) => {
              if (_push3) {
                _push3(`<!--[-->`);
                ssrRenderList(_ctx.items, (subItems, index) => {
                  _push3(`<div class="${ssrRenderClass(_ctx.ui.padding)}"${_scopeId2}><!--[-->`);
                  ssrRenderList(subItems, (item, subIndex) => {
                    _push3(ssrRenderComponent(_component_NuxtLink, mergeProps({ key: subIndex }, { ref_for: true }, _ctx.getNuxtLinkProps(item), { custom: "" }), {
                      default: withCtx(({ href, target, rel, navigate, isExternal, isActive }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_HMenuItem, {
                            disabled: item.disabled
                          }, {
                            default: withCtx(({ active, disabled: itemDisabled, close }, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                ssrRenderVNode(_push5, createVNode(resolveDynamicComponent(!!href ? "a" : "button"), {
                                  href: !itemDisabled ? href : void 0,
                                  rel,
                                  target,
                                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                  onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                }, {
                                  default: withCtx((_3, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      ssrRenderSlot(_ctx.$slots, item.slot || "item", { item }, () => {
                                        var _a;
                                        if (item.icon) {
                                          _push6(ssrRenderComponent(_component_UIcon, {
                                            name: item.icon,
                                            class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                          }, null, _parent6, _scopeId5));
                                        } else if (item.avatar) {
                                          _push6(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                            class: _ctx.ui.item.avatar.base
                                          }), null, _parent6, _scopeId5));
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                        _push6(`<span class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.item.label, item.labelClass))}"${_scopeId5}>${ssrInterpolate(item.label)}</span>`);
                                        if ((_a = item.shortcuts) == null ? void 0 : _a.length) {
                                          _push6(`<span class="${ssrRenderClass(_ctx.ui.item.shortcuts)}"${_scopeId5}><!--[-->`);
                                          ssrRenderList(item.shortcuts, (shortcut) => {
                                            _push6(ssrRenderComponent(_component_UKbd, { key: shortcut }, {
                                              default: withCtx((_4, _push7, _parent7, _scopeId6) => {
                                                if (_push7) {
                                                  _push7(`${ssrInterpolate(shortcut)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(shortcut), 1)
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent6, _scopeId5));
                                          });
                                          _push6(`<!--]--></span>`);
                                        } else {
                                          _push6(`<!---->`);
                                        }
                                      }, _push6, _parent6, _scopeId5);
                                    } else {
                                      return [
                                        renderSlot(_ctx.$slots, item.slot || "item", { item }, () => {
                                          var _a;
                                          return [
                                            item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                              key: 0,
                                              name: item.icon,
                                              class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                            }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                              key: 1,
                                              ref_for: true
                                            }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                              class: _ctx.ui.item.avatar.base
                                            }), null, 16, ["class"])) : createCommentVNode("", true),
                                            createVNode("span", {
                                              class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                            }, toDisplayString(item.label), 3),
                                            ((_a = item.shortcuts) == null ? void 0 : _a.length) ? (openBlock(), createBlock("span", {
                                              key: 2,
                                              class: _ctx.ui.item.shortcuts
                                            }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                                return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(shortcut), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ], 2)) : createCommentVNode("", true)
                                          ];
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }), _parent5, _scopeId4);
                              } else {
                                return [
                                  (openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
                                    href: !itemDisabled ? href : void 0,
                                    rel,
                                    target,
                                    class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                    onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                  }, {
                                    default: withCtx(() => [
                                      renderSlot(_ctx.$slots, item.slot || "item", { item }, () => {
                                        var _a;
                                        return [
                                          item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                            key: 0,
                                            name: item.icon,
                                            class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                          }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                            key: 1,
                                            ref_for: true
                                          }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                            class: _ctx.ui.item.avatar.base
                                          }), null, 16, ["class"])) : createCommentVNode("", true),
                                          createVNode("span", {
                                            class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                          }, toDisplayString(item.label), 3),
                                          ((_a = item.shortcuts) == null ? void 0 : _a.length) ? (openBlock(), createBlock("span", {
                                            key: 2,
                                            class: _ctx.ui.item.shortcuts
                                          }, [
                                            (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                              return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(shortcut), 1)
                                                ]),
                                                _: 2
                                              }, 1024);
                                            }), 128))
                                          ], 2)) : createCommentVNode("", true)
                                        ];
                                      })
                                    ]),
                                    _: 2
                                  }, 1032, ["href", "rel", "target", "class", "onClick"]))
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_HMenuItem, {
                              disabled: item.disabled
                            }, {
                              default: withCtx(({ active, disabled: itemDisabled, close }) => [
                                (openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
                                  href: !itemDisabled ? href : void 0,
                                  rel,
                                  target,
                                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                  onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, item.slot || "item", { item }, () => {
                                      var _a;
                                      return [
                                        item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                          key: 0,
                                          name: item.icon,
                                          class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                        }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                          key: 1,
                                          ref_for: true
                                        }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                          class: _ctx.ui.item.avatar.base
                                        }), null, 16, ["class"])) : createCommentVNode("", true),
                                        createVNode("span", {
                                          class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                        }, toDisplayString(item.label), 3),
                                        ((_a = item.shortcuts) == null ? void 0 : _a.length) ? (openBlock(), createBlock("span", {
                                          key: 2,
                                          class: _ctx.ui.item.shortcuts
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                            return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(shortcut), 1)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ], 2)) : createCommentVNode("", true)
                                      ];
                                    })
                                  ]),
                                  _: 2
                                }, 1032, ["href", "rel", "target", "class", "onClick"]))
                              ]),
                              _: 2
                            }, 1032, ["disabled"])
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]--></div>`);
                });
                _push3(`<!--]-->`);
              } else {
                return [
                  (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (subItems, index) => {
                    return openBlock(), createBlock("div", {
                      key: index,
                      class: _ctx.ui.padding
                    }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(subItems, (item, subIndex) => {
                        return openBlock(), createBlock(_component_NuxtLink, mergeProps({ key: subIndex }, { ref_for: true }, _ctx.getNuxtLinkProps(item), { custom: "" }), {
                          default: withCtx(({ href, target, rel, navigate, isExternal, isActive }) => [
                            createVNode(_component_HMenuItem, {
                              disabled: item.disabled
                            }, {
                              default: withCtx(({ active, disabled: itemDisabled, close }) => [
                                (openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
                                  href: !itemDisabled ? href : void 0,
                                  rel,
                                  target,
                                  class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                  onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                }, {
                                  default: withCtx(() => [
                                    renderSlot(_ctx.$slots, item.slot || "item", { item }, () => {
                                      var _a;
                                      return [
                                        item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                          key: 0,
                                          name: item.icon,
                                          class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                        }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                          key: 1,
                                          ref_for: true
                                        }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                          class: _ctx.ui.item.avatar.base
                                        }), null, 16, ["class"])) : createCommentVNode("", true),
                                        createVNode("span", {
                                          class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                        }, toDisplayString(item.label), 3),
                                        ((_a = item.shortcuts) == null ? void 0 : _a.length) ? (openBlock(), createBlock("span", {
                                          key: 2,
                                          class: _ctx.ui.item.shortcuts
                                        }, [
                                          (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                            return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(shortcut), 1)
                                              ]),
                                              _: 2
                                            }, 1024);
                                          }), 128))
                                        ], 2)) : createCommentVNode("", true)
                                      ];
                                    })
                                  ]),
                                  _: 2
                                }, 1032, ["href", "rel", "target", "class", "onClick"]))
                              ]),
                              _: 2
                            }, 1032, ["disabled"])
                          ]),
                          _: 2
                        }, 1040);
                      }), 128))
                    ], 2);
                  }), 128))
                ];
              }
            }),
            _: 2
          }, _parent2, _scopeId));
          _push2(`</div></template></div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          createVNode(_component_HMenuButton, {
            ref: "trigger",
            as: "div",
            disabled: _ctx.disabled,
            class: _ctx.ui.trigger,
            role: "button",
            onMouseenter: _ctx.onMouseEnter,
            onTouchstartPassive: _ctx.onTouchStart
          }, {
            default: withCtx(() => [
              renderSlot(_ctx.$slots, "default", {
                open,
                disabled: _ctx.disabled
              }, () => [
                createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])
              ])
            ]),
            _: 2
          }, 1032, ["disabled", "class", "onMouseenter", "onTouchstartPassive"]),
          open && _ctx.items.length ? (openBlock(), createBlock("div", {
            key: 0,
            ref: "container",
            class: [_ctx.ui.container, _ctx.ui.width],
            style: _ctx.containerStyle,
            onMouseenter: _ctx.onMouseEnter
          }, [
            createVNode(Transition, mergeProps({ appear: "" }, _ctx.ui.transition), {
              default: withCtx(() => [
                createVNode("div", null, [
                  _ctx.popper.arrow ? (openBlock(), createBlock("div", {
                    key: 0,
                    "data-popper-arrow": "",
                    class: Object.values(_ctx.ui.arrow)
                  }, null, 2)) : createCommentVNode("", true),
                  createVNode(_component_HMenuItems, {
                    class: [_ctx.ui.base, _ctx.ui.divide, _ctx.ui.ring, _ctx.ui.rounded, _ctx.ui.shadow, _ctx.ui.background, _ctx.ui.height],
                    static: ""
                  }, {
                    default: withCtx(() => [
                      (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (subItems, index) => {
                        return openBlock(), createBlock("div", {
                          key: index,
                          class: _ctx.ui.padding
                        }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(subItems, (item, subIndex) => {
                            return openBlock(), createBlock(_component_NuxtLink, mergeProps({ key: subIndex }, { ref_for: true }, _ctx.getNuxtLinkProps(item), { custom: "" }), {
                              default: withCtx(({ href, target, rel, navigate, isExternal, isActive }) => [
                                createVNode(_component_HMenuItem, {
                                  disabled: item.disabled
                                }, {
                                  default: withCtx(({ active, disabled: itemDisabled, close }) => [
                                    (openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
                                      href: !itemDisabled ? href : void 0,
                                      rel,
                                      target,
                                      class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
                                      onClick: ($event) => _ctx.onClick($event, item, { href, navigate, close, isExternal })
                                    }, {
                                      default: withCtx(() => [
                                        renderSlot(_ctx.$slots, item.slot || "item", { item }, () => {
                                          var _a;
                                          return [
                                            item.icon ? (openBlock(), createBlock(_component_UIcon, {
                                              key: 0,
                                              name: item.icon,
                                              class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
                                            }, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                                              key: 1,
                                              ref_for: true
                                            }, { size: _ctx.ui.item.avatar.size, ...item.avatar }, {
                                              class: _ctx.ui.item.avatar.base
                                            }), null, 16, ["class"])) : createCommentVNode("", true),
                                            createVNode("span", {
                                              class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass)
                                            }, toDisplayString(item.label), 3),
                                            ((_a = item.shortcuts) == null ? void 0 : _a.length) ? (openBlock(), createBlock("span", {
                                              key: 2,
                                              class: _ctx.ui.item.shortcuts
                                            }, [
                                              (openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
                                                return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(shortcut), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024);
                                              }), 128))
                                            ], 2)) : createCommentVNode("", true)
                                          ];
                                        })
                                      ]),
                                      _: 2
                                    }, 1032, ["href", "rel", "target", "class", "onClick"]))
                                  ]),
                                  _: 2
                                }, 1032, ["disabled"])
                              ]),
                              _: 2
                            }, 1040);
                          }), 128))
                        ], 2);
                      }), 128))
                    ]),
                    _: 3
                  }, 8, ["class"])
                ])
              ]),
              _: 3
            }, 16)
          ], 46, ["onMouseenter"])) : createCommentVNode("", true)
        ];
      }
    }),
    _: 3
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Dropdown.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { __nuxt_component_2 as default };
//# sourceMappingURL=Dropdown-C5H160r9.mjs.map
