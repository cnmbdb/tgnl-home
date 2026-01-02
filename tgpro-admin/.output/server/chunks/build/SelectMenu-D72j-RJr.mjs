import { r as mergeConfig, i as twMerge, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, c as get } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import { u as useUI, s as select_default, o as selectMenu_default } from './ui-G7Oicn0a.mjs';
import Avatar_default from './Avatar-RiJ55zLR.mjs';
import { d, e } from './form-1BInePM-.mjs';
import { i as it, r as rt, u as ut, n as nt, l as lt } from './combobox-D2aupXSo.mjs';
import { s, i, u, o as o$1, A, E, T, N, a as o } from './keyboard-CvjRf4Wb.mjs';
import { w, O, h as h$1 } from './focus-management-DFaZHIRF.mjs';
import { w as w$2 } from './use-outside-click-B4rja7ys.mjs';
import { s as s$1 } from './use-resolve-button-type-eioNRL5V.mjs';
import { u as u$1, f as f$1, c } from './calculate-active-index-B5ynhl2N.mjs';
import { f, u as u$2 } from './hidden-Bsn3DsxF.mjs';
import { l, i as i$1, t } from './open-closed-Dsm1EOia.mjs';
import { p } from './use-text-value-BRFxtlLF.mjs';
import { u as usePopper } from './usePopper-CMZCG_Qh.mjs';
import { u as useFormGroup } from './useFormGroup-ZK-CpXpd.mjs';
import { a as useInjectButtonGroup } from './useButtonGroup-1gNuWR3y.mjs';
import { defineComponent, resolveComponent, createVNode, resolveDynamicComponent, mergeProps, withCtx, renderSlot, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, createTextVNode, Transition, toRef, computed, ref, toRaw, watch, watchEffect, nextTick, provide, h, inject, useId, useSSRContext } from 'vue';
import { i as defu, j as isEqual } from '../nitro/nitro.mjs';
import { computedAsync, useDebounceFn } from '@vueuse/core';
import { twJoin } from 'tailwind-merge';
import { ssrRenderVNode, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderSlot, ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import 'vue-router';
import 'perfect-debounce';
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import './components-CqoEyeNn.mjs';
import '@iconify/utils/lib/css/icon';
import './active-element-history-DJ1NL7os.mjs';
import './micro-task-CYdHJ3PN.mjs';
import '@tanstack/vue-virtual';
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

function pe(o$2, b) {
  return o$2 === b;
}
var ce = ((r) => (r[r.Open = 0] = "Open", r[r.Closed = 1] = "Closed", r))(ce || {}), ve = ((r) => (r[r.Single = 0] = "Single", r[r.Multi = 1] = "Multi", r))(ve || {}), be = ((r) => (r[r.Pointer = 0] = "Pointer", r[r.Other = 1] = "Other", r))(be || {});
function me(o$2) {
  requestAnimationFrame(() => requestAnimationFrame(o$2));
}
var $ = Symbol("ListboxContext");
function A$1(o$2) {
  let b = inject($, null);
  if (b === null) {
    let r = /* @__PURE__ */ new Error(`<${o$2} /> is missing a parent <Listbox /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(r, A$1), r;
  }
  return b;
}
var Ie = defineComponent({
  name: "Listbox",
  emits: { "update:modelValue": (o$2) => true },
  props: {
    as: {
      type: [Object, String],
      default: "template"
    },
    disabled: {
      type: [Boolean],
      default: false
    },
    by: {
      type: [String, Function],
      default: () => pe
    },
    horizontal: {
      type: [Boolean],
      default: false
    },
    modelValue: {
      type: [
        Object,
        String,
        Number,
        Boolean
      ],
      default: void 0
    },
    defaultValue: {
      type: [
        Object,
        String,
        Number,
        Boolean
      ],
      default: void 0
    },
    form: {
      type: String,
      optional: true
    },
    name: {
      type: String,
      optional: true
    },
    multiple: {
      type: [Boolean],
      default: false
    }
  },
  inheritAttrs: false,
  setup(o$2, { slots: b, attrs: r, emit: w$2$1 }) {
    let n = ref(1), e$1 = ref(null), f$2 = ref(null), v = ref(null), s$2 = ref([]), m = ref(""), p$1 = ref(null), a = ref(1);
    function u$3(t$1 = (i$3) => i$3) {
      let i$2 = p$1.value !== null ? s$2.value[p$1.value] : null, l$1 = O(t$1(s$2.value.slice()), (O$1) => o$1(O$1.dataRef.domRef)), d$1 = i$2 ? l$1.indexOf(i$2) : null;
      return d$1 === -1 && (d$1 = null), {
        options: l$1,
        activeOptionIndex: d$1
      };
    }
    let D = computed(() => o$2.multiple ? 1 : 0), [y, L] = d(computed(() => o$2.modelValue), (t$1) => w$2$1("update:modelValue", t$1), computed(() => o$2.defaultValue)), M = computed(() => y.value === void 0 ? u(D.value, {
      [1]: [],
      [0]: void 0
    }) : y.value), k = {
      listboxState: n,
      value: M,
      mode: D,
      compare(t$1, i$2) {
        if (typeof o$2.by == "string") {
          let l$1 = o$2.by;
          return (t$1 == null ? void 0 : t$1[l$1]) === (i$2 == null ? void 0 : i$2[l$1]);
        }
        return o$2.by(t$1, i$2);
      },
      orientation: computed(() => o$2.horizontal ? "horizontal" : "vertical"),
      labelRef: e$1,
      buttonRef: f$2,
      optionsRef: v,
      disabled: computed(() => o$2.disabled),
      options: s$2,
      searchQuery: m,
      activeOptionIndex: p$1,
      activationTrigger: a,
      closeListbox() {
        o$2.disabled || n.value !== 1 && (n.value = 1, p$1.value = null);
      },
      openListbox() {
        o$2.disabled || n.value !== 0 && (n.value = 0);
      },
      goToOption(t$1, i$2, l$1) {
        if (o$2.disabled || n.value === 1) return;
        let d$1 = u$3(), O$1 = f$1(t$1 === c.Specific ? {
          focus: c.Specific,
          id: i$2
        } : { focus: t$1 }, {
          resolveItems: () => d$1.options,
          resolveActiveIndex: () => d$1.activeOptionIndex,
          resolveId: (h$2) => h$2.id,
          resolveDisabled: (h$2) => h$2.dataRef.disabled
        });
        m.value = "", p$1.value = O$1, a.value = l$1 != null ? l$1 : 1, s$2.value = d$1.options;
      },
      search(t$1) {
        if (o$2.disabled || n.value === 1) return;
        let l$1 = m.value !== "" ? 0 : 1;
        m.value += t$1.toLowerCase();
        let O$1 = (p$1.value !== null ? s$2.value.slice(p$1.value + l$1).concat(s$2.value.slice(0, p$1.value + l$1)) : s$2.value).find((I) => I.dataRef.textValue.startsWith(m.value) && !I.dataRef.disabled), h$2 = O$1 ? s$2.value.indexOf(O$1) : -1;
        h$2 === -1 || h$2 === p$1.value || (p$1.value = h$2, a.value = 1);
      },
      clearSearch() {
        o$2.disabled || n.value !== 1 && m.value !== "" && (m.value = "");
      },
      registerOption(t$1, i$2) {
        let l$1 = u$3((d$1) => [...d$1, {
          id: t$1,
          dataRef: i$2
        }]);
        s$2.value = l$1.options, p$1.value = l$1.activeOptionIndex;
      },
      unregisterOption(t$1) {
        let i$2 = u$3((l$1) => {
          let d$1 = l$1.findIndex((O$1) => O$1.id === t$1);
          return d$1 !== -1 && l$1.splice(d$1, 1), l$1;
        });
        s$2.value = i$2.options, p$1.value = i$2.activeOptionIndex, a.value = 1;
      },
      theirOnChange(t$1) {
        o$2.disabled || L(t$1);
      },
      select(t$1) {
        o$2.disabled || L(u(D.value, {
          [0]: () => t$1,
          [1]: () => {
            let i$2 = toRaw(k.value.value).slice(), l$1 = toRaw(t$1), d$1 = i$2.findIndex((O$1) => k.compare(l$1, toRaw(O$1)));
            return d$1 === -1 ? i$2.push(l$1) : i$2.splice(d$1, 1), i$2;
          }
        }));
      }
    };
    w$2([f$2, v], (t$1, i$2) => {
      var l$1;
      k.closeListbox(), w(i$2, h$1.Loose) || (t$1.preventDefault(), (l$1 = o$1(f$2)) == null || l$1.focus());
    }, computed(() => n.value === 0)), provide($, k), t(computed(() => u(n.value, {
      [0]: i$1.Open,
      [1]: i$1.Closed
    })));
    computed(() => {
      var t$1;
      return (t$1 = o$1(f$2)) == null ? void 0 : t$1.closest("form");
    });
    return () => {
      let { name: t$1, modelValue: i$2, disabled: l$1, form: d$1, ...O$1 } = o$2, h$2 = {
        open: n.value === 0,
        disabled: l$1,
        value: M.value
      };
      return h(Fragment, [...t$1 != null && M.value != null ? e({ [t$1]: M.value }).map(([I, Q]) => h(f, E({
        features: u$2.Hidden,
        key: I,
        as: "input",
        type: "hidden",
        hidden: true,
        readOnly: true,
        form: d$1,
        disabled: l$1,
        name: I,
        value: Q
      }))) : [], A({
        ourProps: {},
        theirProps: {
          ...r,
          ...T(O$1, [
            "defaultValue",
            "onUpdate:modelValue",
            "horizontal",
            "multiple",
            "by"
          ])
        },
        slot: h$2,
        slots: b,
        attrs: r,
        name: "Listbox"
      })]);
    };
  }
});
defineComponent({
  name: "ListboxLabel",
  props: {
    as: {
      type: [Object, String],
      default: "label"
    },
    id: {
      type: String,
      default: null
    }
  },
  setup(o$2, { attrs: b, slots: r }) {
    var f$2;
    let w$2 = (f$2 = o$2.id) != null ? f$2 : `headlessui-listbox-label-${i()}`, n = A$1("ListboxLabel");
    function e$1() {
      var v;
      (v = o$1(n.buttonRef)) == null || v.focus({ preventScroll: true });
    }
    return () => {
      let v = {
        open: n.listboxState.value === 0,
        disabled: n.disabled.value
      }, { ...s$2 } = o$2;
      return A({
        ourProps: {
          id: w$2,
          ref: n.labelRef,
          onClick: e$1
        },
        theirProps: s$2,
        slot: v,
        attrs: b,
        slots: r,
        name: "ListboxLabel"
      });
    };
  }
});
var je = defineComponent({
  name: "ListboxButton",
  props: {
    as: {
      type: [Object, String],
      default: "button"
    },
    id: {
      type: String,
      default: null
    }
  },
  setup(o$2, { attrs: b, slots: r, expose: w$2 }) {
    var p$1;
    let n = (p$1 = o$2.id) != null ? p$1 : `headlessui-listbox-button-${i()}`, e$1 = A$1("ListboxButton");
    w$2({
      el: e$1.buttonRef,
      $el: e$1.buttonRef
    });
    function f$2(a) {
      switch (a.key) {
        case o.Space:
        case o.Enter:
        case o.ArrowDown:
          a.preventDefault(), e$1.openListbox(), nextTick(() => {
            var u$3;
            (u$3 = o$1(e$1.optionsRef)) == null || u$3.focus({ preventScroll: true }), e$1.value.value || e$1.goToOption(c.First);
          });
          break;
        case o.ArrowUp:
          a.preventDefault(), e$1.openListbox(), nextTick(() => {
            var u$3;
            (u$3 = o$1(e$1.optionsRef)) == null || u$3.focus({ preventScroll: true }), e$1.value.value || e$1.goToOption(c.Last);
          });
          break;
      }
    }
    function v(a) {
      switch (a.key) {
        case o.Space:
          a.preventDefault();
          break;
      }
    }
    function s$2(a) {
      e$1.disabled.value || (e$1.listboxState.value === 0 ? (e$1.closeListbox(), nextTick(() => {
        var u$3;
        return (u$3 = o$1(e$1.buttonRef)) == null ? void 0 : u$3.focus({ preventScroll: true });
      })) : (a.preventDefault(), e$1.openListbox(), me(() => {
        var u$3;
        return (u$3 = o$1(e$1.optionsRef)) == null ? void 0 : u$3.focus({ preventScroll: true });
      })));
    }
    let m = s$1(computed(() => ({
      as: o$2.as,
      type: b.type
    })), e$1.buttonRef);
    return () => {
      var y, L;
      let a = {
        open: e$1.listboxState.value === 0,
        disabled: e$1.disabled.value,
        value: e$1.value.value
      }, { ...u$3 } = o$2;
      return A({
        ourProps: {
          ref: e$1.buttonRef,
          id: n,
          type: m.value,
          "aria-haspopup": "listbox",
          "aria-controls": (y = o$1(e$1.optionsRef)) == null ? void 0 : y.id,
          "aria-expanded": e$1.listboxState.value === 0,
          "aria-labelledby": e$1.labelRef.value ? [(L = o$1(e$1.labelRef)) == null ? void 0 : L.id, n].join(" ") : void 0,
          disabled: e$1.disabled.value === true ? true : void 0,
          onKeydown: f$2,
          onKeyup: v,
          onClick: s$2
        },
        theirProps: u$3,
        slot: a,
        attrs: b,
        slots: r,
        name: "ListboxButton"
      });
    };
  }
}), Ae = defineComponent({
  name: "ListboxOptions",
  props: {
    as: {
      type: [Object, String],
      default: "ul"
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
  setup(o$2, { attrs: b, slots: r, expose: w$2 }) {
    var p$1;
    let n = (p$1 = o$2.id) != null ? p$1 : `headlessui-listbox-options-${i()}`, e$1 = A$1("ListboxOptions"), f$2 = ref(null);
    w$2({
      el: e$1.optionsRef,
      $el: e$1.optionsRef
    });
    function v(a) {
      switch (f$2.value && clearTimeout(f$2.value), a.key) {
        case o.Space:
          if (e$1.searchQuery.value !== "") return a.preventDefault(), a.stopPropagation(), e$1.search(a.key);
        case o.Enter:
          if (a.preventDefault(), a.stopPropagation(), e$1.activeOptionIndex.value !== null) {
            let u$3 = e$1.options.value[e$1.activeOptionIndex.value];
            e$1.select(u$3.dataRef.value);
          }
          e$1.mode.value === 0 && (e$1.closeListbox(), nextTick(() => {
            var u$3;
            return (u$3 = o$1(e$1.buttonRef)) == null ? void 0 : u$3.focus({ preventScroll: true });
          }));
          break;
        case u(e$1.orientation.value, {
          vertical: o.ArrowDown,
          horizontal: o.ArrowRight
        }):
          return a.preventDefault(), a.stopPropagation(), e$1.goToOption(c.Next);
        case u(e$1.orientation.value, {
          vertical: o.ArrowUp,
          horizontal: o.ArrowLeft
        }):
          return a.preventDefault(), a.stopPropagation(), e$1.goToOption(c.Previous);
        case o.Home:
        case o.PageUp:
          return a.preventDefault(), a.stopPropagation(), e$1.goToOption(c.First);
        case o.End:
        case o.PageDown:
          return a.preventDefault(), a.stopPropagation(), e$1.goToOption(c.Last);
        case o.Escape:
          a.preventDefault(), a.stopPropagation(), e$1.closeListbox(), nextTick(() => {
            var u$3;
            return (u$3 = o$1(e$1.buttonRef)) == null ? void 0 : u$3.focus({ preventScroll: true });
          });
          break;
        case o.Tab:
          a.preventDefault(), a.stopPropagation();
          break;
        default:
          a.key.length === 1 && (e$1.search(a.key), f$2.value = setTimeout(() => e$1.clearSearch(), 350));
          break;
      }
    }
    let s$2 = l(), m = computed(() => s$2 !== null ? (s$2.value & i$1.Open) === i$1.Open : e$1.listboxState.value === 0);
    return () => {
      var y, L;
      let a = { open: e$1.listboxState.value === 0 }, { ...u$3 } = o$2;
      return A({
        ourProps: {
          "aria-activedescendant": e$1.activeOptionIndex.value === null || (y = e$1.options.value[e$1.activeOptionIndex.value]) == null ? void 0 : y.id,
          "aria-multiselectable": e$1.mode.value === 1 ? true : void 0,
          "aria-labelledby": (L = o$1(e$1.buttonRef)) == null ? void 0 : L.id,
          "aria-orientation": e$1.orientation.value,
          id: n,
          onKeydown: v,
          role: "listbox",
          tabIndex: 0,
          ref: e$1.optionsRef
        },
        theirProps: u$3,
        slot: a,
        attrs: b,
        slots: r,
        features: N.RenderStrategy | N.Static,
        visible: m.value,
        name: "ListboxOptions"
      });
    };
  }
}), Fe = defineComponent({
  name: "ListboxOption",
  props: {
    as: {
      type: [Object, String],
      default: "li"
    },
    value: { type: [
      Object,
      String,
      Number,
      Boolean
    ] },
    disabled: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      default: null
    }
  },
  setup(o$2, { slots: b, attrs: r, expose: w$2 }) {
    var C;
    let n = (C = o$2.id) != null ? C : `headlessui-listbox-option-${i()}`, e$1 = A$1("ListboxOption"), f$2 = ref(null);
    w$2({
      el: f$2,
      $el: f$2
    });
    let v = computed(() => e$1.activeOptionIndex.value !== null ? e$1.options.value[e$1.activeOptionIndex.value].id === n : false), s$2 = computed(() => u(e$1.mode.value, {
      [0]: () => e$1.compare(toRaw(e$1.value.value), toRaw(o$2.value)),
      [1]: () => toRaw(e$1.value.value).some((t$1) => e$1.compare(toRaw(t$1), toRaw(o$2.value)))
    }));
    computed(() => u(e$1.mode.value, {
      [1]: () => {
        var i$2;
        let t$1 = toRaw(e$1.value.value);
        return ((i$2 = e$1.options.value.find((l$1) => t$1.some((d$1) => e$1.compare(toRaw(d$1), toRaw(l$1.dataRef.value))))) == null ? void 0 : i$2.id) === n;
      },
      [0]: () => s$2.value
    }));
    let p$1 = p(f$2);
    computed(() => ({
      disabled: o$2.disabled,
      value: o$2.value,
      get textValue() {
        return p$1();
      },
      domRef: f$2
    }));
    watchEffect(() => {
      e$1.listboxState.value === 0 && v.value && e$1.activationTrigger.value !== 0 && nextTick(() => {
        var t$1, i$2;
        return (i$2 = (t$1 = o$1(f$2)) == null ? void 0 : t$1.scrollIntoView) == null ? void 0 : i$2.call(t$1, { block: "nearest" });
      });
    });
    function u$3(t$1) {
      if (o$2.disabled) return t$1.preventDefault();
      e$1.select(o$2.value), e$1.mode.value === 0 && (e$1.closeListbox(), nextTick(() => {
        var i$2;
        return (i$2 = o$1(e$1.buttonRef)) == null ? void 0 : i$2.focus({ preventScroll: true });
      }));
    }
    function D() {
      if (o$2.disabled) return e$1.goToOption(c.Nothing);
      e$1.goToOption(c.Specific, n);
    }
    let y = u$1();
    function L(t$1) {
      y.update(t$1);
    }
    function M(t$1) {
      y.wasMoved(t$1) && (o$2.disabled || v.value || e$1.goToOption(c.Specific, n, 0));
    }
    function k(t$1) {
      y.wasMoved(t$1) && (o$2.disabled || v.value && e$1.goToOption(c.Nothing));
    }
    return () => {
      let { disabled: t$1 } = o$2, i$2 = {
        active: v.value,
        selected: s$2.value,
        disabled: t$1
      }, { value: l$1, disabled: d$1, ...O$1 } = o$2;
      return A({
        ourProps: {
          id: n,
          ref: f$2,
          role: "option",
          tabIndex: t$1 === true ? void 0 : -1,
          "aria-disabled": t$1 === true ? true : void 0,
          "aria-selected": s$2.value,
          disabled: void 0,
          onClick: u$3,
          onFocus: D,
          onPointerenter: L,
          onMouseenter: L,
          onPointermove: M,
          onMousemove: M,
          onPointerleave: k,
          onMouseleave: k
        },
        theirProps: O$1,
        slot: i$2,
        attrs: r,
        slots: b,
        name: "ListboxOption"
      });
    };
  }
});
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.select, select_default);
var configMenu = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.selectMenu, selectMenu_default);
var _sfc_main = defineComponent({
  components: {
    HCombobox: lt,
    HComboboxButton: nt,
    HComboboxOptions: ut,
    HComboboxOption: rt,
    HComboboxInput: it,
    HListbox: Ie,
    HListboxButton: je,
    HListboxOptions: Ae,
    HListboxOption: Fe,
    UIcon: Icon_default,
    UAvatar: Avatar_default
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [
        String,
        Number,
        Object,
        Array,
        Boolean
      ],
      default: ""
    },
    query: {
      type: String,
      default: null
    },
    by: {
      type: String,
      default: void 0
    },
    options: {
      type: Array,
      default: () => []
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    required: {
      type: Boolean,
      default: false
    },
    icon: {
      type: String,
      default: null
    },
    loadingIcon: {
      type: String,
      default: () => config.default.loadingIcon
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: () => config.default.trailingIcon
    },
    trailing: {
      type: Boolean,
      default: false
    },
    leading: {
      type: Boolean,
      default: false
    },
    loading: {
      type: Boolean,
      default: false
    },
    selectedIcon: {
      type: String,
      default: () => configMenu.default.selectedIcon
    },
    disabled: {
      type: Boolean,
      default: false
    },
    multiple: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: [Boolean, Function],
      default: false
    },
    searchablePlaceholder: {
      type: String,
      default: () => configMenu.default.searchablePlaceholder.label
    },
    searchableLazy: {
      type: Boolean,
      default: false
    },
    clearSearchOnClose: {
      type: Boolean,
      default: () => configMenu.default.clearSearchOnClose
    },
    debounce: {
      type: Number,
      default: 200
    },
    creatable: {
      type: Boolean,
      default: false
    },
    showCreateOptionWhen: {
      type: [String, Function],
      default: () => configMenu.default.showCreateOptionWhen
    },
    placeholder: {
      type: String,
      default: null
    },
    padded: {
      type: Boolean,
      default: true
    },
    size: {
      type: String,
      default: null,
      validator(value) {
        return Object.keys(config.size).includes(value);
      }
    },
    color: {
      type: String,
      default: () => config.default.color,
      validator(value) {
        return [...virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors, ...Object.keys(config.color)].includes(value);
      }
    },
    variant: {
      type: String,
      default: () => config.default.variant,
      validator(value) {
        return [...Object.keys(config.variant), ...Object.values(config.color).flatMap((value2) => Object.keys(value2))].includes(value);
      }
    },
    optionAttribute: {
      type: String,
      default: "label"
    },
    valueAttribute: {
      type: String,
      default: null
    },
    searchAttributes: {
      type: Array,
      default: null
    },
    inputTargetForm: {
      type: String,
      default: null
    },
    popper: {
      type: Object,
      default: () => ({})
    },
    selectClass: {
      type: String,
      default: null
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
    },
    uiMenu: {
      type: Object,
      default: () => ({})
    }
  },
  emits: [
    "update:modelValue",
    "update:query",
    "open",
    "close",
    "change"
  ],
  setup(props, { emit, slots }) {
    const { ui, attrs } = useUI("select", toRef(props, "ui"), config, toRef(props, "class"));
    const { ui: uiMenu } = useUI("selectMenu", toRef(props, "uiMenu"), configMenu);
    const popper = computed(() => defu({}, props.popper, uiMenu.value.popper));
    const [trigger, container] = usePopper(popper.value);
    const by = computed(() => {
      if (!props.by) return void 0;
      if (typeof props.by === "function") return props.by;
      const key = props.by;
      if (key.indexOf(".") > 0) return (a, z) => {
        return accessor(a, key) === accessor(z, key);
      };
      return key;
    });
    const { size: sizeButtonGroup, rounded } = useInjectButtonGroup({
      ui,
      props
    });
    const { emitFormBlur, emitFormChange, inputId, color, size: sizeFormGroup, name } = useFormGroup(props, config);
    const size = computed(() => {
      var _a;
      return (_a = sizeButtonGroup.value) != null ? _a : sizeFormGroup.value;
    });
    const internalQuery = ref("");
    const query = computed({
      get() {
        var _a;
        return (_a = props.query) != null ? _a : internalQuery.value;
      },
      set(value) {
        internalQuery.value = value;
        emit("update:query", value);
      }
    });
    const selected = computed(() => {
      var _a;
      function compareValues(value1, value2) {
        if (by.value && typeof by.value !== "function" && isObject(value1) && isObject(value2)) return isEqual(value1[by.value], value2[by.value]);
        return isEqual(value1, value2);
      }
      function getValue(value) {
        if (props.valueAttribute) return accessor(value, props.valueAttribute);
        return value;
      }
      if (props.multiple) {
        const modelValue = props.modelValue;
        if (!Array.isArray(modelValue) || !modelValue.length) return [];
        return options.value.filter((option) => {
          const optionValue = getValue(option);
          return modelValue.some((value) => compareValues(value, optionValue));
        });
      }
      return (_a = options.value.find((option) => {
        return compareValues(getValue(option), toRaw(props.modelValue));
      })) != null ? _a : props.modelValue;
    });
    const label = computed(() => {
      if (!props.modelValue) return null;
      if (Array.isArray(props.modelValue) && props.modelValue.length) return `${props.modelValue.length} selected`;
      else if (["string", "number"].includes(typeof props.modelValue)) return props.valueAttribute ? accessor(selected.value, props.optionAttribute) : props.modelValue;
      return accessor(props.modelValue, props.optionAttribute);
    });
    const selectClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[color.value]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(ui.value.base, uiMenu.value.select, rounded.value, ui.value.size[size.value], ui.value.gap[size.value], props.padded ? ui.value.padding[size.value] : "p-0", variant == null ? void 0 : variant.replaceAll("{color}", color.value), (isLeading.value || slots.leading) && ui.value.leading.padding[size.value], (isTrailing.value || slots.trailing) && ui.value.trailing.padding[size.value]), props.placeholder && (!props.modelValue || Array.isArray(props.modelValue) && !props.modelValue.length) && ui.value.placeholder, props.selectClass);
    });
    const isLeading = computed(() => {
      return props.icon && props.leading || props.icon && !props.trailing || props.loading && !props.trailing || props.leadingIcon;
    });
    const isTrailing = computed(() => {
      return props.icon && props.trailing || props.loading && props.trailing || props.trailingIcon;
    });
    const leadingIconName = computed(() => {
      if (props.loading) return props.loadingIcon;
      return props.leadingIcon || props.icon;
    });
    const trailingIconName = computed(() => {
      if (props.loading && !isLeading.value) return props.loadingIcon;
      return props.trailingIcon || props.icon;
    });
    const leadingWrapperIconClass = computed(() => {
      return twJoin(ui.value.icon.leading.wrapper, ui.value.icon.leading.pointer, ui.value.icon.leading.padding[size.value]);
    });
    const leadingIconClass = computed(() => {
      return twJoin(ui.value.icon.base, color.value && virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value), ui.value.icon.size[size.value], props.loading && ui.value.icon.loading);
    });
    const trailingWrapperIconClass = computed(() => {
      return twJoin(ui.value.icon.trailing.wrapper, ui.value.icon.trailing.pointer, ui.value.icon.trailing.padding[size.value]);
    });
    const trailingIconClass = computed(() => {
      return twJoin(ui.value.icon.base, color.value && virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value), ui.value.icon.size[size.value], props.loading && !isLeading.value && ui.value.icon.loading);
    });
    const debouncedSearch = props.searchable && typeof props.searchable === "function" ? useDebounceFn(props.searchable, props.debounce) : void 0;
    const options = computedAsync(async () => {
      if (debouncedSearch) return await debouncedSearch(query.value);
      return props.options || [];
    }, [], { lazy: props.searchableLazy });
    function escapeRegExp(string) {
      return string.replace(/[.*+?^${}()|[\]\\]/g, (match) => `\\${match}`);
    }
    function accessor(obj, key) {
      return get(obj, key);
    }
    function isObject(object) {
      return !Array.isArray(object) && object !== null && typeof object === "object";
    }
    const filteredOptions = computed(() => {
      if (!query.value || debouncedSearch) return options.value;
      const escapedQuery = escapeRegExp(query.value);
      return options.value.filter((option) => {
        var _a;
        return (((_a = props.searchAttributes) == null ? void 0 : _a.length) ? props.searchAttributes : [props.optionAttribute]).some((searchAttribute) => {
          if (["string", "number"].includes(typeof option)) return String(option).search(new RegExp(escapedQuery, "i")) !== -1;
          const child = get(option, searchAttribute);
          return child !== null && child !== void 0 && String(child).search(new RegExp(escapedQuery, "i")) !== -1;
        });
      });
    });
    const createOption = computed(() => {
      if (query.value === "") return null;
      if (props.showCreateOptionWhen === "empty" && filteredOptions.value.length) return null;
      if (props.showCreateOptionWhen === "always") {
        if (filteredOptions.value.find((option) => ["string", "number"].includes(typeof option) ? option === query.value : accessor(option, props.optionAttribute) === query.value)) return null;
      }
      if (typeof props.showCreateOptionWhen === "function") {
        if (!props.showCreateOptionWhen(query.value, filteredOptions.value)) return null;
      }
      return ["string", "number"].includes(typeof props.modelValue) ? query.value : { [props.optionAttribute]: query.value };
    });
    function clearOnClose() {
      if (props.clearSearchOnClose) query.value = "";
    }
    watch(container, (value) => {
      if (value) emit("open");
      else {
        clearOnClose();
        emit("close");
        emitFormBlur();
      }
    });
    function onUpdate(value) {
      if (toRaw(props.modelValue) === value) return;
      emit("update:modelValue", value);
      emit("change", value);
      emitFormChange();
    }
    function onQueryChange(event) {
      query.value = event.target.value;
    }
    s(() => useId());
    return {
      ui,
      uiMenu,
      attrs,
      name,
      inputId,
      popper,
      trigger,
      container,
      selected,
      label,
      accessor,
      isLeading,
      isTrailing,
      selectClass,
      leadingIconName,
      leadingIconClass,
      leadingWrapperIconClass,
      trailingIconName,
      trailingIconClass,
      trailingWrapperIconClass,
      filteredOptions,
      createOption,
      query,
      onUpdate,
      onQueryChange,
      by
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = Icon_default;
  const _component_HComboboxInput = resolveComponent("HComboboxInput");
  const _component_UAvatar = Avatar_default;
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.searchable ? "HCombobox" : "HListbox"), mergeProps({
    by: _ctx.by,
    name: _ctx.name,
    "model-value": _ctx.multiple ? Array.isArray(_ctx.modelValue) ? _ctx.modelValue : [] : _ctx.modelValue,
    multiple: _ctx.multiple,
    disabled: _ctx.disabled,
    as: "div",
    class: _ctx.ui.wrapper,
    "onUpdate:modelValue": _ctx.onUpdate
  }, _attrs), {
    default: withCtx(({ open }, _push$1, _parent$1, _scopeId) => {
      if (_push$1) {
        if (_ctx.required) _push$1(`<input${ssrRenderAttr("value", _ctx.modelValue)}${ssrIncludeBooleanAttr(_ctx.required) ? " required" : ""} class="${ssrRenderClass(_ctx.uiMenu.required)}"${ssrRenderAttr("form", _ctx.inputTargetForm)} tabindex="-1" aria-hidden="true"${_scopeId}>`);
        else _push$1(`<!---->`);
        ssrRenderVNode(_push$1, createVNode(resolveDynamicComponent(_ctx.searchable ? "HComboboxButton" : "HListboxButton"), {
          ref: "trigger",
          as: "div",
          role: "button",
          class: _ctx.uiMenu.trigger
        }, {
          default: withCtx((_, _push$2, _parent$2, _scopeId$1) => {
            if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {
              open,
              disabled: _ctx.disabled,
              loading: _ctx.loading
            }, () => {
              _push$2(`<button${ssrRenderAttrs(mergeProps({
                id: _ctx.inputId,
                class: _ctx.selectClass,
                disabled: _ctx.disabled,
                type: "button"
              }, _ctx.attrs))}${_scopeId$1}>`);
              if (_ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading) {
                _push$2(`<span class="${ssrRenderClass(_ctx.leadingWrapperIconClass)}"${_scopeId$1}>`);
                ssrRenderSlot(_ctx.$slots, "leading", {
                  selected: _ctx.selected,
                  disabled: _ctx.disabled,
                  loading: _ctx.loading
                }, () => {
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: _ctx.leadingIconName,
                    class: _ctx.leadingIconClass
                  }, null, _parent$2, _scopeId$1));
                }, _push$2, _parent$2, _scopeId$1);
                _push$2(`</span>`);
              } else _push$2(`<!---->`);
              ssrRenderSlot(_ctx.$slots, "label", { selected: _ctx.selected }, () => {
                if (_ctx.label) _push$2(`<span class="${ssrRenderClass(_ctx.uiMenu.label)}"${_scopeId$1}>${ssrInterpolate(_ctx.label)}</span>`);
                else _push$2(`<span class="${ssrRenderClass(_ctx.uiMenu.label)}"${_scopeId$1}>${ssrInterpolate(_ctx.placeholder || "\xA0")}</span>`);
              }, _push$2, _parent$2, _scopeId$1);
              if (_ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing) {
                _push$2(`<span class="${ssrRenderClass(_ctx.trailingWrapperIconClass)}"${_scopeId$1}>`);
                ssrRenderSlot(_ctx.$slots, "trailing", {
                  selected: _ctx.selected,
                  disabled: _ctx.disabled,
                  loading: _ctx.loading
                }, () => {
                  _push$2(ssrRenderComponent(_component_UIcon, {
                    name: _ctx.trailingIconName,
                    class: _ctx.trailingIconClass,
                    "aria-hidden": "true"
                  }, null, _parent$2, _scopeId$1));
                }, _push$2, _parent$2, _scopeId$1);
                _push$2(`</span>`);
              } else _push$2(`<!---->`);
              _push$2(`</button>`);
            }, _push$2, _parent$2, _scopeId$1);
            else return [renderSlot(_ctx.$slots, "default", {
              open,
              disabled: _ctx.disabled,
              loading: _ctx.loading
            }, () => [createVNode("button", mergeProps({
              id: _ctx.inputId,
              class: _ctx.selectClass,
              disabled: _ctx.disabled,
              type: "button"
            }, _ctx.attrs), [
              _ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading ? (openBlock(), createBlock("span", {
                key: 0,
                class: _ctx.leadingWrapperIconClass
              }, [renderSlot(_ctx.$slots, "leading", {
                selected: _ctx.selected,
                disabled: _ctx.disabled,
                loading: _ctx.loading
              }, () => [createVNode(_component_UIcon, {
                name: _ctx.leadingIconName,
                class: _ctx.leadingIconClass
              }, null, 8, ["name", "class"])])], 2)) : createCommentVNode("", true),
              renderSlot(_ctx.$slots, "label", { selected: _ctx.selected }, () => [_ctx.label ? (openBlock(), createBlock("span", {
                key: 0,
                class: _ctx.uiMenu.label
              }, toDisplayString(_ctx.label), 3)) : (openBlock(), createBlock("span", {
                key: 1,
                class: _ctx.uiMenu.label
              }, toDisplayString(_ctx.placeholder || "\xA0"), 3))]),
              _ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing ? (openBlock(), createBlock("span", {
                key: 1,
                class: _ctx.trailingWrapperIconClass
              }, [renderSlot(_ctx.$slots, "trailing", {
                selected: _ctx.selected,
                disabled: _ctx.disabled,
                loading: _ctx.loading
              }, () => [createVNode(_component_UIcon, {
                name: _ctx.trailingIconName,
                class: _ctx.trailingIconClass,
                "aria-hidden": "true"
              }, null, 8, ["name", "class"])])], 2)) : createCommentVNode("", true)
            ], 16, ["id", "disabled"])])];
          }),
          _: 2
        }), _parent$1, _scopeId);
        if (open) {
          _push$1(`<div class="${ssrRenderClass([_ctx.uiMenu.container, _ctx.uiMenu.width])}"${_scopeId}><template><div${_scopeId}>`);
          if (_ctx.popper.arrow) _push$1(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.uiMenu.arrow))}"${_scopeId}></div>`);
          else _push$1(`<!---->`);
          ssrRenderVNode(_push$1, createVNode(resolveDynamicComponent(_ctx.searchable ? "HComboboxOptions" : "HListboxOptions"), {
            static: "",
            class: [
              _ctx.uiMenu.base,
              _ctx.uiMenu.ring,
              _ctx.uiMenu.rounded,
              _ctx.uiMenu.shadow,
              _ctx.uiMenu.background,
              _ctx.uiMenu.padding,
              _ctx.uiMenu.height
            ]
          }, {
            default: withCtx((_, _push$2, _parent$2, _scopeId$1) => {
              var _a, _b, _c, _d;
              if (_push$2) {
                if (_ctx.searchable) _push$2(ssrRenderComponent(_component_HComboboxInput, {
                  "display-value": () => _ctx.query,
                  name: "q",
                  placeholder: _ctx.searchablePlaceholder,
                  autofocus: "",
                  autocomplete: "off",
                  class: _ctx.uiMenu.input,
                  onChange: _ctx.onQueryChange
                }, null, _parent$2, _scopeId$1));
                else _push$2(`<!---->`);
                _push$2(`<!--[-->`);
                ssrRenderList(_ctx.filteredOptions, (option, index) => {
                  ssrRenderVNode(_push$2, createVNode(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                    key: index,
                    as: "template",
                    value: _ctx.valueAttribute ? _ctx.accessor(option, _ctx.valueAttribute) : option,
                    disabled: option.disabled
                  }, {
                    default: withCtx(({ active, selected: optionSelected, disabled: optionDisabled }, _push$3, _parent$3, _scopeId$2) => {
                      if (_push$3) {
                        _push$3(`<li class="${ssrRenderClass([
                          _ctx.uiMenu.option.base,
                          _ctx.uiMenu.option.rounded,
                          _ctx.uiMenu.option.padding,
                          _ctx.uiMenu.option.size,
                          _ctx.uiMenu.option.color,
                          active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive,
                          optionSelected && _ctx.uiMenu.option.selected,
                          optionDisabled && _ctx.uiMenu.option.disabled
                        ])}"${_scopeId$2}><div class="${ssrRenderClass(_ctx.uiMenu.option.container)}"${_scopeId$2}>`);
                        ssrRenderSlot(_ctx.$slots, "option", {
                          option,
                          active,
                          selected: optionSelected
                        }, () => {
                          if (option.icon) _push$3(ssrRenderComponent(_component_UIcon, {
                            name: option.icon,
                            class: [
                              _ctx.uiMenu.option.icon.base,
                              active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive,
                              option.iconClass
                            ],
                            "aria-hidden": "true"
                          }, null, _parent$3, _scopeId$2));
                          else if (option.avatar) _push$3(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, {
                            size: _ctx.uiMenu.option.avatar.size,
                            ...option.avatar
                          }, {
                            class: _ctx.uiMenu.option.avatar.base,
                            "aria-hidden": "true"
                          }), null, _parent$3, _scopeId$2));
                          else if (option.chip) _push$3(`<span class="${ssrRenderClass(_ctx.uiMenu.option.chip.base)}" style="${ssrRenderStyle({ background: `#${option.chip}` })}"${_scopeId$2}></span>`);
                          else _push$3(`<!---->`);
                          _push$3(`<span class="truncate"${_scopeId$2}>${ssrInterpolate(["string", "number"].includes(typeof option) ? option : _ctx.accessor(option, _ctx.optionAttribute))}</span>`);
                        }, _push$3, _parent$3, _scopeId$2);
                        _push$3(`</div>`);
                        if (optionSelected) {
                          _push$3(`<span class="${ssrRenderClass([_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding])}"${_scopeId$2}>`);
                          _push$3(ssrRenderComponent(_component_UIcon, {
                            name: _ctx.selectedIcon,
                            class: _ctx.uiMenu.option.selectedIcon.base,
                            "aria-hidden": "true"
                          }, null, _parent$3, _scopeId$2));
                          _push$3(`</span>`);
                        } else _push$3(`<!---->`);
                        _push$3(`</li>`);
                      } else return [createVNode("li", { class: [
                        _ctx.uiMenu.option.base,
                        _ctx.uiMenu.option.rounded,
                        _ctx.uiMenu.option.padding,
                        _ctx.uiMenu.option.size,
                        _ctx.uiMenu.option.color,
                        active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive,
                        optionSelected && _ctx.uiMenu.option.selected,
                        optionDisabled && _ctx.uiMenu.option.disabled
                      ] }, [createVNode("div", { class: _ctx.uiMenu.option.container }, [renderSlot(_ctx.$slots, "option", {
                        option,
                        active,
                        selected: optionSelected
                      }, () => [option.icon ? (openBlock(), createBlock(_component_UIcon, {
                        key: 0,
                        name: option.icon,
                        class: [
                          _ctx.uiMenu.option.icon.base,
                          active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive,
                          option.iconClass
                        ],
                        "aria-hidden": "true"
                      }, null, 8, ["name", "class"])) : option.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                        key: 1,
                        ref_for: true
                      }, {
                        size: _ctx.uiMenu.option.avatar.size,
                        ...option.avatar
                      }, {
                        class: _ctx.uiMenu.option.avatar.base,
                        "aria-hidden": "true"
                      }), null, 16, ["class"])) : option.chip ? (openBlock(), createBlock("span", {
                        key: 2,
                        class: _ctx.uiMenu.option.chip.base,
                        style: { background: `#${option.chip}` }
                      }, null, 6)) : createCommentVNode("", true), createVNode("span", { class: "truncate" }, toDisplayString(["string", "number"].includes(typeof option) ? option : _ctx.accessor(option, _ctx.optionAttribute)), 1)])], 2), optionSelected ? (openBlock(), createBlock("span", {
                        key: 0,
                        class: [_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding]
                      }, [createVNode(_component_UIcon, {
                        name: _ctx.selectedIcon,
                        class: _ctx.uiMenu.option.selectedIcon.base,
                        "aria-hidden": "true"
                      }, null, 8, ["name", "class"])], 2)) : createCommentVNode("", true)], 2)];
                    }),
                    _: 2
                  }), _parent$2, _scopeId$1);
                });
                _push$2(`<!--]-->`);
                if (_ctx.creatable && _ctx.createOption) ssrRenderVNode(_push$2, createVNode(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                  value: _ctx.createOption,
                  as: "template"
                }, {
                  default: withCtx(({ active, selected: optionSelected }, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) {
                      _push$3(`<li class="${ssrRenderClass([
                        _ctx.uiMenu.option.base,
                        _ctx.uiMenu.option.rounded,
                        _ctx.uiMenu.option.padding,
                        _ctx.uiMenu.option.size,
                        _ctx.uiMenu.option.color,
                        active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive
                      ])}"${_scopeId$2}><div class="${ssrRenderClass(_ctx.uiMenu.option.container)}"${_scopeId$2}>`);
                      ssrRenderSlot(_ctx.$slots, "option-create", {
                        option: _ctx.createOption,
                        active,
                        selected: optionSelected
                      }, () => {
                        _push$3(`<span class="${ssrRenderClass(_ctx.uiMenu.option.create)}"${_scopeId$2}>Create &quot;${ssrInterpolate(typeof _ctx.createOption === "string" ? _ctx.createOption : _ctx.accessor(_ctx.createOption, _ctx.optionAttribute))}&quot;</span>`);
                      }, _push$3, _parent$3, _scopeId$2);
                      _push$3(`</div></li>`);
                    } else return [createVNode("li", { class: [
                      _ctx.uiMenu.option.base,
                      _ctx.uiMenu.option.rounded,
                      _ctx.uiMenu.option.padding,
                      _ctx.uiMenu.option.size,
                      _ctx.uiMenu.option.color,
                      active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive
                    ] }, [createVNode("div", { class: _ctx.uiMenu.option.container }, [renderSlot(_ctx.$slots, "option-create", {
                      option: _ctx.createOption,
                      active,
                      selected: optionSelected
                    }, () => [createVNode("span", { class: _ctx.uiMenu.option.create }, 'Create "' + toDisplayString(typeof _ctx.createOption === "string" ? _ctx.createOption : _ctx.accessor(_ctx.createOption, _ctx.optionAttribute)) + '"', 3)])], 2)], 2)];
                  }),
                  _: 2
                }), _parent$2, _scopeId$1);
                else if (_ctx.searchable && _ctx.query && !((_a = _ctx.filteredOptions) == null ? void 0 : _a.length)) {
                  _push$2(`<p class="${ssrRenderClass(_ctx.uiMenu.option.empty)}"${_scopeId$1}>`);
                  ssrRenderSlot(_ctx.$slots, "option-empty", { query: _ctx.query }, () => {
                    _push$2(`${ssrInterpolate(_ctx.uiMenu.default.optionEmpty.label.replace("{query}", _ctx.query))}`);
                  }, _push$2, _parent$2, _scopeId$1);
                  _push$2(`</p>`);
                } else if (!((_b = _ctx.filteredOptions) == null ? void 0 : _b.length)) {
                  _push$2(`<p class="${ssrRenderClass(_ctx.uiMenu.empty)}"${_scopeId$1}>`);
                  ssrRenderSlot(_ctx.$slots, "empty", { query: _ctx.query }, () => {
                    _push$2(`${ssrInterpolate(_ctx.uiMenu.default.empty.label)}`);
                  }, _push$2, _parent$2, _scopeId$1);
                  _push$2(`</p>`);
                } else _push$2(`<!---->`);
              } else return [
                _ctx.searchable ? (openBlock(), createBlock(_component_HComboboxInput, {
                  key: 0,
                  "display-value": () => _ctx.query,
                  name: "q",
                  placeholder: _ctx.searchablePlaceholder,
                  autofocus: "",
                  autocomplete: "off",
                  class: _ctx.uiMenu.input,
                  onChange: _ctx.onQueryChange
                }, null, 8, [
                  "display-value",
                  "placeholder",
                  "class",
                  "onChange"
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.filteredOptions, (option, index) => {
                  return openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                    key: index,
                    as: "template",
                    value: _ctx.valueAttribute ? _ctx.accessor(option, _ctx.valueAttribute) : option,
                    disabled: option.disabled
                  }, {
                    default: withCtx(({ active, selected: optionSelected, disabled: optionDisabled }) => [createVNode("li", { class: [
                      _ctx.uiMenu.option.base,
                      _ctx.uiMenu.option.rounded,
                      _ctx.uiMenu.option.padding,
                      _ctx.uiMenu.option.size,
                      _ctx.uiMenu.option.color,
                      active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive,
                      optionSelected && _ctx.uiMenu.option.selected,
                      optionDisabled && _ctx.uiMenu.option.disabled
                    ] }, [createVNode("div", { class: _ctx.uiMenu.option.container }, [renderSlot(_ctx.$slots, "option", {
                      option,
                      active,
                      selected: optionSelected
                    }, () => [option.icon ? (openBlock(), createBlock(_component_UIcon, {
                      key: 0,
                      name: option.icon,
                      class: [
                        _ctx.uiMenu.option.icon.base,
                        active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive,
                        option.iconClass
                      ],
                      "aria-hidden": "true"
                    }, null, 8, ["name", "class"])) : option.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                      key: 1,
                      ref_for: true
                    }, {
                      size: _ctx.uiMenu.option.avatar.size,
                      ...option.avatar
                    }, {
                      class: _ctx.uiMenu.option.avatar.base,
                      "aria-hidden": "true"
                    }), null, 16, ["class"])) : option.chip ? (openBlock(), createBlock("span", {
                      key: 2,
                      class: _ctx.uiMenu.option.chip.base,
                      style: { background: `#${option.chip}` }
                    }, null, 6)) : createCommentVNode("", true), createVNode("span", { class: "truncate" }, toDisplayString(["string", "number"].includes(typeof option) ? option : _ctx.accessor(option, _ctx.optionAttribute)), 1)])], 2), optionSelected ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: [_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding]
                    }, [createVNode(_component_UIcon, {
                      name: _ctx.selectedIcon,
                      class: _ctx.uiMenu.option.selectedIcon.base,
                      "aria-hidden": "true"
                    }, null, 8, ["name", "class"])], 2)) : createCommentVNode("", true)], 2)]),
                    _: 2
                  }, 1032, ["value", "disabled"]);
                }), 128)),
                _ctx.creatable && _ctx.createOption ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                  key: 1,
                  value: _ctx.createOption,
                  as: "template"
                }, {
                  default: withCtx(({ active, selected: optionSelected }) => [createVNode("li", { class: [
                    _ctx.uiMenu.option.base,
                    _ctx.uiMenu.option.rounded,
                    _ctx.uiMenu.option.padding,
                    _ctx.uiMenu.option.size,
                    _ctx.uiMenu.option.color,
                    active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive
                  ] }, [createVNode("div", { class: _ctx.uiMenu.option.container }, [renderSlot(_ctx.$slots, "option-create", {
                    option: _ctx.createOption,
                    active,
                    selected: optionSelected
                  }, () => [createVNode("span", { class: _ctx.uiMenu.option.create }, 'Create "' + toDisplayString(typeof _ctx.createOption === "string" ? _ctx.createOption : _ctx.accessor(_ctx.createOption, _ctx.optionAttribute)) + '"', 3)])], 2)], 2)]),
                  _: 3
                }, 8, ["value"])) : _ctx.searchable && _ctx.query && !((_c = _ctx.filteredOptions) == null ? void 0 : _c.length) ? (openBlock(), createBlock("p", {
                  key: 2,
                  class: _ctx.uiMenu.option.empty
                }, [renderSlot(_ctx.$slots, "option-empty", { query: _ctx.query }, () => [createTextVNode(toDisplayString(_ctx.uiMenu.default.optionEmpty.label.replace("{query}", _ctx.query)), 1)])], 2)) : !((_d = _ctx.filteredOptions) == null ? void 0 : _d.length) ? (openBlock(), createBlock("p", {
                  key: 3,
                  class: _ctx.uiMenu.empty
                }, [renderSlot(_ctx.$slots, "empty", { query: _ctx.query }, () => [createTextVNode(toDisplayString(_ctx.uiMenu.default.empty.label), 1)])], 2)) : createCommentVNode("", true)
              ];
            }),
            _: 2
          }), _parent$1, _scopeId);
          _push$1(`</div></template></div>`);
        } else _push$1(`<!---->`);
      } else return [
        _ctx.required ? (openBlock(), createBlock("input", {
          key: 0,
          value: _ctx.modelValue,
          required: _ctx.required,
          class: _ctx.uiMenu.required,
          form: _ctx.inputTargetForm,
          tabindex: "-1",
          "aria-hidden": "true"
        }, null, 10, [
          "value",
          "required",
          "form"
        ])) : createCommentVNode("", true),
        (openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxButton" : "HListboxButton"), {
          ref: "trigger",
          as: "div",
          role: "button",
          class: _ctx.uiMenu.trigger
        }, {
          default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
            open,
            disabled: _ctx.disabled,
            loading: _ctx.loading
          }, () => [createVNode("button", mergeProps({
            id: _ctx.inputId,
            class: _ctx.selectClass,
            disabled: _ctx.disabled,
            type: "button"
          }, _ctx.attrs), [
            _ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading ? (openBlock(), createBlock("span", {
              key: 0,
              class: _ctx.leadingWrapperIconClass
            }, [renderSlot(_ctx.$slots, "leading", {
              selected: _ctx.selected,
              disabled: _ctx.disabled,
              loading: _ctx.loading
            }, () => [createVNode(_component_UIcon, {
              name: _ctx.leadingIconName,
              class: _ctx.leadingIconClass
            }, null, 8, ["name", "class"])])], 2)) : createCommentVNode("", true),
            renderSlot(_ctx.$slots, "label", { selected: _ctx.selected }, () => [_ctx.label ? (openBlock(), createBlock("span", {
              key: 0,
              class: _ctx.uiMenu.label
            }, toDisplayString(_ctx.label), 3)) : (openBlock(), createBlock("span", {
              key: 1,
              class: _ctx.uiMenu.label
            }, toDisplayString(_ctx.placeholder || "\xA0"), 3))]),
            _ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing ? (openBlock(), createBlock("span", {
              key: 1,
              class: _ctx.trailingWrapperIconClass
            }, [renderSlot(_ctx.$slots, "trailing", {
              selected: _ctx.selected,
              disabled: _ctx.disabled,
              loading: _ctx.loading
            }, () => [createVNode(_component_UIcon, {
              name: _ctx.trailingIconName,
              class: _ctx.trailingIconClass,
              "aria-hidden": "true"
            }, null, 8, ["name", "class"])])], 2)) : createCommentVNode("", true)
          ], 16, ["id", "disabled"])])]),
          _: 2
        }, 1032, ["class"])),
        open ? (openBlock(), createBlock("div", {
          key: 1,
          ref: "container",
          class: [_ctx.uiMenu.container, _ctx.uiMenu.width]
        }, [createVNode(Transition, mergeProps({ appear: "" }, _ctx.uiMenu.transition), {
          default: withCtx(() => [createVNode("div", null, [_ctx.popper.arrow ? (openBlock(), createBlock("div", {
            key: 0,
            "data-popper-arrow": "",
            class: Object.values(_ctx.uiMenu.arrow)
          }, null, 2)) : createCommentVNode("", true), (openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOptions" : "HListboxOptions"), {
            static: "",
            class: [
              _ctx.uiMenu.base,
              _ctx.uiMenu.ring,
              _ctx.uiMenu.rounded,
              _ctx.uiMenu.shadow,
              _ctx.uiMenu.background,
              _ctx.uiMenu.padding,
              _ctx.uiMenu.height
            ]
          }, {
            default: withCtx(() => {
              var _a, _b;
              return [
                _ctx.searchable ? (openBlock(), createBlock(_component_HComboboxInput, {
                  key: 0,
                  "display-value": () => _ctx.query,
                  name: "q",
                  placeholder: _ctx.searchablePlaceholder,
                  autofocus: "",
                  autocomplete: "off",
                  class: _ctx.uiMenu.input,
                  onChange: _ctx.onQueryChange
                }, null, 8, [
                  "display-value",
                  "placeholder",
                  "class",
                  "onChange"
                ])) : createCommentVNode("", true),
                (openBlock(true), createBlock(Fragment, null, renderList(_ctx.filteredOptions, (option, index) => {
                  return openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                    key: index,
                    as: "template",
                    value: _ctx.valueAttribute ? _ctx.accessor(option, _ctx.valueAttribute) : option,
                    disabled: option.disabled
                  }, {
                    default: withCtx(({ active, selected: optionSelected, disabled: optionDisabled }) => [createVNode("li", { class: [
                      _ctx.uiMenu.option.base,
                      _ctx.uiMenu.option.rounded,
                      _ctx.uiMenu.option.padding,
                      _ctx.uiMenu.option.size,
                      _ctx.uiMenu.option.color,
                      active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive,
                      optionSelected && _ctx.uiMenu.option.selected,
                      optionDisabled && _ctx.uiMenu.option.disabled
                    ] }, [createVNode("div", { class: _ctx.uiMenu.option.container }, [renderSlot(_ctx.$slots, "option", {
                      option,
                      active,
                      selected: optionSelected
                    }, () => [option.icon ? (openBlock(), createBlock(_component_UIcon, {
                      key: 0,
                      name: option.icon,
                      class: [
                        _ctx.uiMenu.option.icon.base,
                        active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive,
                        option.iconClass
                      ],
                      "aria-hidden": "true"
                    }, null, 8, ["name", "class"])) : option.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
                      key: 1,
                      ref_for: true
                    }, {
                      size: _ctx.uiMenu.option.avatar.size,
                      ...option.avatar
                    }, {
                      class: _ctx.uiMenu.option.avatar.base,
                      "aria-hidden": "true"
                    }), null, 16, ["class"])) : option.chip ? (openBlock(), createBlock("span", {
                      key: 2,
                      class: _ctx.uiMenu.option.chip.base,
                      style: { background: `#${option.chip}` }
                    }, null, 6)) : createCommentVNode("", true), createVNode("span", { class: "truncate" }, toDisplayString(["string", "number"].includes(typeof option) ? option : _ctx.accessor(option, _ctx.optionAttribute)), 1)])], 2), optionSelected ? (openBlock(), createBlock("span", {
                      key: 0,
                      class: [_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding]
                    }, [createVNode(_component_UIcon, {
                      name: _ctx.selectedIcon,
                      class: _ctx.uiMenu.option.selectedIcon.base,
                      "aria-hidden": "true"
                    }, null, 8, ["name", "class"])], 2)) : createCommentVNode("", true)], 2)]),
                    _: 2
                  }, 1032, ["value", "disabled"]);
                }), 128)),
                _ctx.creatable && _ctx.createOption ? (openBlock(), createBlock(resolveDynamicComponent(_ctx.searchable ? "HComboboxOption" : "HListboxOption"), {
                  key: 1,
                  value: _ctx.createOption,
                  as: "template"
                }, {
                  default: withCtx(({ active, selected: optionSelected }) => [createVNode("li", { class: [
                    _ctx.uiMenu.option.base,
                    _ctx.uiMenu.option.rounded,
                    _ctx.uiMenu.option.padding,
                    _ctx.uiMenu.option.size,
                    _ctx.uiMenu.option.color,
                    active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive
                  ] }, [createVNode("div", { class: _ctx.uiMenu.option.container }, [renderSlot(_ctx.$slots, "option-create", {
                    option: _ctx.createOption,
                    active,
                    selected: optionSelected
                  }, () => [createVNode("span", { class: _ctx.uiMenu.option.create }, 'Create "' + toDisplayString(typeof _ctx.createOption === "string" ? _ctx.createOption : _ctx.accessor(_ctx.createOption, _ctx.optionAttribute)) + '"', 3)])], 2)], 2)]),
                  _: 3
                }, 8, ["value"])) : _ctx.searchable && _ctx.query && !((_a = _ctx.filteredOptions) == null ? void 0 : _a.length) ? (openBlock(), createBlock("p", {
                  key: 2,
                  class: _ctx.uiMenu.option.empty
                }, [renderSlot(_ctx.$slots, "option-empty", { query: _ctx.query }, () => [createTextVNode(toDisplayString(_ctx.uiMenu.default.optionEmpty.label.replace("{query}", _ctx.query)), 1)])], 2)) : !((_b = _ctx.filteredOptions) == null ? void 0 : _b.length) ? (openBlock(), createBlock("p", {
                  key: 3,
                  class: _ctx.uiMenu.empty
                }, [renderSlot(_ctx.$slots, "empty", { query: _ctx.query }, () => [createTextVNode(toDisplayString(_ctx.uiMenu.default.empty.label), 1)])], 2)) : createCommentVNode("", true)
              ];
            }),
            _: 3
          }, 8, ["class"]))])]),
          _: 3
        }, 16)], 2)) : createCommentVNode("", true)
      ];
    }),
    _: 3
  }), _parent);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/SelectMenu.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var SelectMenu_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { SelectMenu_default as default };
//# sourceMappingURL=SelectMenu-D72j-RJr.mjs.map
