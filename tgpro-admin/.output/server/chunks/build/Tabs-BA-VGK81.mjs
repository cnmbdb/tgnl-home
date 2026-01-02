import { r as mergeConfig, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import { u as useUI, z as tabs_default } from './ui-G7Oicn0a.mjs';
import { t } from './micro-task-CYdHJ3PN.mjs';
import { s, i, o as o$1, A, T, u as u$1, N, a as o } from './keyboard-CvjRf4Wb.mjs';
import { O, T as T$1, i as i$1, P, N as N$1 } from './focus-management-DFaZHIRF.mjs';
import { s as s$1 } from './use-resolve-button-type-eioNRL5V.mjs';
import { f, u } from './hidden-Bsn3DsxF.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createVNode, renderSlot, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, createTextVNode, toRef, ref, watch, nextTick, inject, computed, h, provide, watchEffect, useId, useSSRContext } from 'vue';
import { useResizeObserver } from '@vueuse/core';
import { ssrRenderComponent, ssrRenderClass, ssrRenderList, ssrRenderAttr, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
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

var d = defineComponent({
  props: { onFocus: {
    type: Function,
    required: true
  } },
  setup(t$1) {
    let n = ref(true);
    return () => n.value ? h(f, {
      as: "button",
      type: "button",
      features: u.Focusable,
      onFocus(o$2) {
        o$2.preventDefault();
        let e, a = 50;
        function r() {
          var u$2;
          if (a-- <= 0) {
            e && cancelAnimationFrame(e);
            return;
          }
          if ((u$2 = t$1.onFocus) != null && u$2.call(t$1)) {
            n.value = false, cancelAnimationFrame(e);
            return;
          }
          e = requestAnimationFrame(r);
        }
        e = requestAnimationFrame(r);
      }
    }) : null;
  }
});
var te = ((s$2) => (s$2[s$2.Forwards = 0] = "Forwards", s$2[s$2.Backwards = 1] = "Backwards", s$2))(te || {}), le = ((d$1) => (d$1[d$1.Less = -1] = "Less", d$1[d$1.Equal = 0] = "Equal", d$1[d$1.Greater = 1] = "Greater", d$1))(le || {});
var U = Symbol("TabsContext");
function C(a) {
  let b = inject(U, null);
  if (b === null) {
    let s$2 = /* @__PURE__ */ new Error(`<${a} /> is missing a parent <TabGroup /> component.`);
    throw Error.captureStackTrace && Error.captureStackTrace(s$2, C), s$2;
  }
  return b;
}
var G = Symbol("TabsSSRContext"), me = defineComponent({
  name: "TabGroup",
  emits: { change: (a) => true },
  props: {
    as: {
      type: [Object, String],
      default: "template"
    },
    selectedIndex: {
      type: [Number],
      default: null
    },
    defaultIndex: {
      type: [Number],
      default: 0
    },
    vertical: {
      type: [Boolean],
      default: false
    },
    manual: {
      type: [Boolean],
      default: false
    }
  },
  inheritAttrs: false,
  setup(a, { slots: b, attrs: s$2, emit: d$1 }) {
    var E;
    let i$2 = ref((E = a.selectedIndex) != null ? E : a.defaultIndex), l = ref([]), r = ref([]), p = computed(() => a.selectedIndex !== null), R = computed(() => p.value ? a.selectedIndex : i$2.value);
    function y(t$1) {
      var c;
      let n = O(u$2.tabs.value, o$1), o$2 = O(u$2.panels.value, o$1), e = n.filter((I) => {
        var m;
        return !((m = o$1(I)) != null && m.hasAttribute("disabled"));
      });
      if (t$1 < 0 || t$1 > n.length - 1) {
        let m = u$1(u$1(i$2.value === null ? 0 : Math.sign(t$1 - i$2.value), {
          [-1]: () => 1,
          [0]: () => u$1(Math.sign(t$1), {
            [-1]: () => 0,
            [0]: () => 0,
            [1]: () => 1
          }),
          [1]: () => 0
        }), {
          [0]: () => n.indexOf(e[0]),
          [1]: () => n.indexOf(e[e.length - 1])
        });
        m !== -1 && (i$2.value = m), u$2.tabs.value = n, u$2.panels.value = o$2;
      } else {
        let I = n.slice(0, t$1), h$1 = [...n.slice(t$1), ...I].find((W) => e.includes(W));
        if (!h$1) return;
        let O$1 = (c = n.indexOf(h$1)) != null ? c : u$2.selectedIndex.value;
        O$1 === -1 && (O$1 = u$2.selectedIndex.value), i$2.value = O$1, u$2.tabs.value = n, u$2.panels.value = o$2;
      }
    }
    let u$2 = {
      selectedIndex: computed(() => {
        var t$1, n;
        return (n = (t$1 = i$2.value) != null ? t$1 : a.defaultIndex) != null ? n : null;
      }),
      orientation: computed(() => a.vertical ? "vertical" : "horizontal"),
      activation: computed(() => a.manual ? "manual" : "auto"),
      tabs: l,
      panels: r,
      setSelectedIndex(t$1) {
        R.value !== t$1 && d$1("change", t$1), p.value || y(t$1);
      },
      registerTab(t$1) {
        var o$2;
        if (l.value.includes(t$1)) return;
        let n = l.value[i$2.value];
        if (l.value.push(t$1), l.value = O(l.value, o$1), !p.value) {
          let e = (o$2 = l.value.indexOf(n)) != null ? o$2 : i$2.value;
          e !== -1 && (i$2.value = e);
        }
      },
      unregisterTab(t$1) {
        let n = l.value.indexOf(t$1);
        n !== -1 && l.value.splice(n, 1);
      },
      registerPanel(t$1) {
        r.value.includes(t$1) || (r.value.push(t$1), r.value = O(r.value, o$1));
      },
      unregisterPanel(t$1) {
        let n = r.value.indexOf(t$1);
        n !== -1 && r.value.splice(n, 1);
      }
    };
    provide(U, u$2);
    let T$2 = ref({
      tabs: [],
      panels: []
    }), x = ref(false);
    provide(G, computed(() => x.value ? null : T$2.value));
    computed(() => a.selectedIndex);
    return watchEffect(() => {
      if (!p.value || R.value == null || u$2.tabs.value.length <= 0) return;
      let t$1 = O(u$2.tabs.value, o$1);
      t$1.some((o$2, e) => o$1(u$2.tabs.value[e]) !== o$1(o$2)) && u$2.setSelectedIndex(t$1.findIndex((o$2) => o$1(o$2) === o$1(u$2.tabs.value[R.value])));
    }), () => {
      let t$1 = { selectedIndex: i$2.value };
      return h(Fragment, [l.value.length <= 0 && h(d, { onFocus: () => {
        for (let n of l.value) {
          let o$2 = o$1(n);
          if ((o$2 == null ? void 0 : o$2.tabIndex) === 0) return o$2.focus(), true;
        }
        return false;
      } }), A({
        theirProps: {
          ...s$2,
          ...T(a, [
            "selectedIndex",
            "defaultIndex",
            "manual",
            "vertical",
            "onChange"
          ])
        },
        ourProps: {},
        slot: t$1,
        slots: b,
        attrs: s$2,
        name: "TabGroup"
      })]);
    };
  }
}), pe = defineComponent({
  name: "TabList",
  props: { as: {
    type: [Object, String],
    default: "div"
  } },
  setup(a, { attrs: b, slots: s$2 }) {
    let d$1 = C("TabList");
    return () => {
      let i$2 = { selectedIndex: d$1.selectedIndex.value };
      return A({
        ourProps: {
          role: "tablist",
          "aria-orientation": d$1.orientation.value
        },
        theirProps: a,
        slot: i$2,
        attrs: b,
        slots: s$2,
        name: "TabList"
      });
    };
  }
}), xe = defineComponent({
  name: "Tab",
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
  setup(a, { attrs: b, slots: s$2, expose: d$1 }) {
    var o$2;
    let i$2 = (o$2 = a.id) != null ? o$2 : `headlessui-tabs-tab-${i()}`, l = C("Tab"), r = ref(null);
    d$1({
      el: r,
      $el: r
    });
    let p = inject(G), R = computed(() => {
      if (p.value) {
        let e = p.value.tabs.indexOf(i$2);
        return e === -1 ? p.value.tabs.push(i$2) - 1 : e;
      }
      return -1;
    }), y = computed(() => {
      let e = l.tabs.value.indexOf(r);
      return e === -1 ? R.value : e;
    }), u$2 = computed(() => y.value === l.selectedIndex.value);
    function T$2(e) {
      var I;
      let c = e();
      if (c === T$1.Success && l.activation.value === "auto") {
        let m = (I = i$1(r)) == null ? void 0 : I.activeElement, h$1 = l.tabs.value.findIndex((O$1) => o$1(O$1) === m);
        h$1 !== -1 && l.setSelectedIndex(h$1);
      }
      return c;
    }
    function x(e) {
      let c = l.tabs.value.map((m) => o$1(m)).filter(Boolean);
      if (e.key === o.Space || e.key === o.Enter) {
        e.preventDefault(), e.stopPropagation(), l.setSelectedIndex(y.value);
        return;
      }
      switch (e.key) {
        case o.Home:
        case o.PageUp:
          return e.preventDefault(), e.stopPropagation(), T$2(() => P(c, N$1.First));
        case o.End:
        case o.PageDown:
          return e.preventDefault(), e.stopPropagation(), T$2(() => P(c, N$1.Last));
      }
      if (T$2(() => u$1(l.orientation.value, {
        vertical() {
          return e.key === o.ArrowUp ? P(c, N$1.Previous | N$1.WrapAround) : e.key === o.ArrowDown ? P(c, N$1.Next | N$1.WrapAround) : T$1.Error;
        },
        horizontal() {
          return e.key === o.ArrowLeft ? P(c, N$1.Previous | N$1.WrapAround) : e.key === o.ArrowRight ? P(c, N$1.Next | N$1.WrapAround) : T$1.Error;
        }
      })) === T$1.Success) return e.preventDefault();
    }
    let w = ref(false);
    function E() {
      var e;
      w.value || (w.value = true, !a.disabled && ((e = o$1(r)) == null || e.focus({ preventScroll: true }), l.setSelectedIndex(y.value), t(() => {
        w.value = false;
      })));
    }
    function t$1(e) {
      e.preventDefault();
    }
    let n = s$1(computed(() => ({
      as: a.as,
      type: b.type
    })), r);
    return () => {
      var m, h$1;
      let e = {
        selected: u$2.value,
        disabled: (m = a.disabled) != null ? m : false
      }, { ...c } = a;
      return A({
        ourProps: {
          ref: r,
          onKeydown: x,
          onMousedown: t$1,
          onClick: E,
          id: i$2,
          role: "tab",
          type: n.value,
          "aria-controls": (h$1 = o$1(l.panels.value[y.value])) == null ? void 0 : h$1.id,
          "aria-selected": u$2.value,
          tabIndex: u$2.value ? 0 : -1,
          disabled: a.disabled ? true : void 0
        },
        theirProps: c,
        slot: e,
        attrs: b,
        slots: s$2,
        name: "Tab"
      });
    };
  }
}), Ie = defineComponent({
  name: "TabPanels",
  props: { as: {
    type: [Object, String],
    default: "div"
  } },
  setup(a, { slots: b, attrs: s$2 }) {
    let d$1 = C("TabPanels");
    return () => {
      return A({
        theirProps: a,
        ourProps: {},
        slot: { selectedIndex: d$1.selectedIndex.value },
        attrs: s$2,
        slots: b,
        name: "TabPanels"
      });
    };
  }
}), ye = defineComponent({
  name: "TabPanel",
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
    },
    tabIndex: {
      type: Number,
      default: 0
    }
  },
  setup(a, { attrs: b, slots: s$2, expose: d$1 }) {
    var T$2;
    let i$2 = (T$2 = a.id) != null ? T$2 : `headlessui-tabs-panel-${i()}`, l = C("TabPanel"), r = ref(null);
    d$1({
      el: r,
      $el: r
    });
    let p = inject(G), R = computed(() => {
      if (p.value) {
        let x = p.value.panels.indexOf(i$2);
        return x === -1 ? p.value.panels.push(i$2) - 1 : x;
      }
      return -1;
    }), y = computed(() => {
      let x = l.panels.value.indexOf(r);
      return x === -1 ? R.value : x;
    }), u$2 = computed(() => y.value === l.selectedIndex.value);
    return () => {
      var n;
      let x = { selected: u$2.value }, { tabIndex: w, ...E } = a, t$1 = {
        ref: r,
        id: i$2,
        role: "tabpanel",
        "aria-labelledby": (n = o$1(l.tabs.value[y.value])) == null ? void 0 : n.id,
        tabIndex: u$2.value ? w : -1
      };
      return !u$2.value && a.unmount && !a.static ? h(f, {
        as: "span",
        "aria-hidden": true,
        ...t$1
      }) : A({
        ourProps: t$1,
        theirProps: E,
        slot: x,
        attrs: b,
        slots: s$2,
        features: N.Static | N.RenderStrategy,
        visible: u$2.value,
        name: "TabPanel"
      });
    };
  }
});
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.tabs, tabs_default);
var _sfc_main = defineComponent({
  components: {
    UIcon: Icon_default,
    HTabGroup: me,
    HTabList: pe,
    HTab: xe,
    HTabPanels: Ie,
    HTabPanel: ye
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      default: void 0
    },
    orientation: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value)
    },
    defaultIndex: {
      type: Number,
      default: 0
    },
    items: {
      type: Array,
      default: () => []
    },
    unmount: {
      type: Boolean,
      default: false
    },
    content: {
      type: Boolean,
      default: true
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
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("tabs", toRef(props, "ui"), config, toRef(props, "class"));
    const listRef = ref();
    const itemRefs = ref([]);
    const markerRef = ref();
    const selectedIndex = ref(props.modelValue || props.defaultIndex);
    function calcMarkerSize(index) {
      var _a;
      const tab = (_a = itemRefs.value[index]) == null ? void 0 : _a.$el;
      if (!tab) return;
      if (!markerRef.value) return;
      markerRef.value.style.top = `${tab.offsetTop}px`;
      markerRef.value.style.left = `${tab.offsetLeft}px`;
      markerRef.value.style.width = `${tab.offsetWidth}px`;
      markerRef.value.style.height = `${tab.offsetHeight}px`;
    }
    function onChange(index) {
      selectedIndex.value = index;
      emit("change", index);
      if (props.modelValue !== void 0) emit("update:modelValue", selectedIndex.value);
      calcMarkerSize(selectedIndex.value);
    }
    useResizeObserver(listRef, () => {
      calcMarkerSize(selectedIndex.value);
    });
    watch(() => props.modelValue, (value) => {
      selectedIndex.value = value;
      calcMarkerSize(selectedIndex.value);
    });
    watch(() => props.items, async () => {
      await nextTick();
      calcMarkerSize(selectedIndex.value);
    }, { deep: true });
    s(() => useId());
    return {
      ui,
      attrs,
      listRef,
      itemRefs,
      markerRef,
      selectedIndex,
      onChange
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HTabGroup = resolveComponent("HTabGroup");
  const _component_HTabList = resolveComponent("HTabList");
  const _component_HTab = resolveComponent("HTab");
  const _component_UIcon = Icon_default;
  const _component_HTabPanels = resolveComponent("HTabPanels");
  const _component_HTabPanel = resolveComponent("HTabPanel");
  _push(ssrRenderComponent(_component_HTabGroup, mergeProps({
    vertical: _ctx.orientation === "vertical",
    "selected-index": _ctx.selectedIndex,
    as: "div",
    class: _ctx.ui.wrapper
  }, _ctx.attrs, { onChange: _ctx.onChange }, _attrs), {
    default: withCtx((_, _push$1, _parent$1, _scopeId) => {
      if (_push$1) {
        _push$1(ssrRenderComponent(_component_HTabList, {
          ref: "listRef",
          class: [
            _ctx.ui.list.base,
            _ctx.ui.list.background,
            _ctx.ui.list.rounded,
            _ctx.ui.list.shadow,
            _ctx.ui.list.padding,
            _ctx.ui.list.width,
            _ctx.orientation === "horizontal" && _ctx.ui.list.height,
            _ctx.orientation === "horizontal" && "inline-grid items-center"
          ],
          style: [_ctx.orientation === "horizontal" && `grid-template-columns: repeat(${_ctx.items.length}, minmax(0, 1fr))`]
        }, {
          default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
            if (_push$2) {
              _push$2(`<div class="${ssrRenderClass(_ctx.ui.list.marker.wrapper)}"${_scopeId$1}><div class="${ssrRenderClass([
                _ctx.ui.list.marker.base,
                _ctx.ui.list.marker.background,
                _ctx.ui.list.marker.rounded,
                _ctx.ui.list.marker.shadow
              ])}"${_scopeId$1}></div></div><!--[-->`);
              ssrRenderList(_ctx.items, (item, index) => {
                _push$2(ssrRenderComponent(_component_HTab, {
                  key: index,
                  ref_for: true,
                  ref: "itemRefs",
                  disabled: item.disabled,
                  as: "template"
                }, {
                  default: withCtx(({ selected, disabled }, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) {
                      _push$3(`<button${ssrRenderAttr("aria-label", item.ariaLabel)} class="${ssrRenderClass([
                        _ctx.ui.list.tab.base,
                        _ctx.ui.list.tab.background,
                        _ctx.ui.list.tab.height,
                        _ctx.ui.list.tab.padding,
                        _ctx.ui.list.tab.size,
                        _ctx.ui.list.tab.font,
                        _ctx.ui.list.tab.rounded,
                        _ctx.ui.list.tab.shadow,
                        selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive
                      ])}"${_scopeId$2}>`);
                      ssrRenderSlot(_ctx.$slots, "icon", {
                        item,
                        index,
                        selected,
                        disabled
                      }, () => {
                        if (item.icon) _push$3(ssrRenderComponent(_component_UIcon, {
                          name: item.icon,
                          class: _ctx.ui.list.tab.icon
                        }, null, _parent$3, _scopeId$2));
                        else _push$3(`<!---->`);
                      }, _push$3, _parent$3, _scopeId$2);
                      ssrRenderSlot(_ctx.$slots, "default", {
                        item,
                        index,
                        selected,
                        disabled
                      }, () => {
                        _push$3(`<span class="truncate"${_scopeId$2}>${ssrInterpolate(item.label)}</span>`);
                      }, _push$3, _parent$3, _scopeId$2);
                      _push$3(`</button>`);
                    } else return [createVNode("button", {
                      "aria-label": item.ariaLabel,
                      class: [
                        _ctx.ui.list.tab.base,
                        _ctx.ui.list.tab.background,
                        _ctx.ui.list.tab.height,
                        _ctx.ui.list.tab.padding,
                        _ctx.ui.list.tab.size,
                        _ctx.ui.list.tab.font,
                        _ctx.ui.list.tab.rounded,
                        _ctx.ui.list.tab.shadow,
                        selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive
                      ]
                    }, [renderSlot(_ctx.$slots, "icon", {
                      item,
                      index,
                      selected,
                      disabled
                    }, () => [item.icon ? (openBlock(), createBlock(_component_UIcon, {
                      key: 0,
                      name: item.icon,
                      class: _ctx.ui.list.tab.icon
                    }, null, 8, ["name", "class"])) : createCommentVNode("", true)]), renderSlot(_ctx.$slots, "default", {
                      item,
                      index,
                      selected,
                      disabled
                    }, () => [createVNode("span", { class: "truncate" }, toDisplayString(item.label), 1)])], 10, ["aria-label"])];
                  }),
                  _: 2
                }, _parent$2, _scopeId$1));
              });
              _push$2(`<!--]-->`);
            } else return [createVNode("div", {
              ref: "markerRef",
              class: _ctx.ui.list.marker.wrapper
            }, [createVNode("div", { class: [
              _ctx.ui.list.marker.base,
              _ctx.ui.list.marker.background,
              _ctx.ui.list.marker.rounded,
              _ctx.ui.list.marker.shadow
            ] }, null, 2)], 2), (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
              return openBlock(), createBlock(_component_HTab, {
                key: index,
                ref_for: true,
                ref: "itemRefs",
                disabled: item.disabled,
                as: "template"
              }, {
                default: withCtx(({ selected, disabled }) => [createVNode("button", {
                  "aria-label": item.ariaLabel,
                  class: [
                    _ctx.ui.list.tab.base,
                    _ctx.ui.list.tab.background,
                    _ctx.ui.list.tab.height,
                    _ctx.ui.list.tab.padding,
                    _ctx.ui.list.tab.size,
                    _ctx.ui.list.tab.font,
                    _ctx.ui.list.tab.rounded,
                    _ctx.ui.list.tab.shadow,
                    selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive
                  ]
                }, [renderSlot(_ctx.$slots, "icon", {
                  item,
                  index,
                  selected,
                  disabled
                }, () => [item.icon ? (openBlock(), createBlock(_component_UIcon, {
                  key: 0,
                  name: item.icon,
                  class: _ctx.ui.list.tab.icon
                }, null, 8, ["name", "class"])) : createCommentVNode("", true)]), renderSlot(_ctx.$slots, "default", {
                  item,
                  index,
                  selected,
                  disabled
                }, () => [createVNode("span", { class: "truncate" }, toDisplayString(item.label), 1)])], 10, ["aria-label"])]),
                _: 2
              }, 1032, ["disabled"]);
            }), 128))];
          }),
          _: 3
        }, _parent$1, _scopeId));
        if (_ctx.content) _push$1(ssrRenderComponent(_component_HTabPanels, { class: _ctx.ui.container }, {
          default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
            if (_push$2) {
              _push$2(`<!--[-->`);
              ssrRenderList(_ctx.items, (item, index) => {
                _push$2(ssrRenderComponent(_component_HTabPanel, {
                  key: index,
                  class: _ctx.ui.base,
                  unmount: _ctx.unmount
                }, {
                  default: withCtx(({ selected }, _push$3, _parent$3, _scopeId$2) => {
                    if (_push$3) ssrRenderSlot(_ctx.$slots, item.slot || "item", {
                      item,
                      index,
                      selected
                    }, () => {
                      _push$3(`${ssrInterpolate(item.content)}`);
                    }, _push$3, _parent$3, _scopeId$2);
                    else return [renderSlot(_ctx.$slots, item.slot || "item", {
                      item,
                      index,
                      selected
                    }, () => [createTextVNode(toDisplayString(item.content), 1)])];
                  }),
                  _: 2
                }, _parent$2, _scopeId$1));
              });
              _push$2(`<!--]-->`);
            } else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
              return openBlock(), createBlock(_component_HTabPanel, {
                key: index,
                class: _ctx.ui.base,
                unmount: _ctx.unmount
              }, {
                default: withCtx(({ selected }) => [renderSlot(_ctx.$slots, item.slot || "item", {
                  item,
                  index,
                  selected
                }, () => [createTextVNode(toDisplayString(item.content), 1)])]),
                _: 2
              }, 1032, ["class", "unmount"]);
            }), 128))];
          }),
          _: 3
        }, _parent$1, _scopeId));
        else _push$1(`<!---->`);
      } else return [createVNode(_component_HTabList, {
        ref: "listRef",
        class: [
          _ctx.ui.list.base,
          _ctx.ui.list.background,
          _ctx.ui.list.rounded,
          _ctx.ui.list.shadow,
          _ctx.ui.list.padding,
          _ctx.ui.list.width,
          _ctx.orientation === "horizontal" && _ctx.ui.list.height,
          _ctx.orientation === "horizontal" && "inline-grid items-center"
        ],
        style: [_ctx.orientation === "horizontal" && `grid-template-columns: repeat(${_ctx.items.length}, minmax(0, 1fr))`]
      }, {
        default: withCtx(() => [createVNode("div", {
          ref: "markerRef",
          class: _ctx.ui.list.marker.wrapper
        }, [createVNode("div", { class: [
          _ctx.ui.list.marker.base,
          _ctx.ui.list.marker.background,
          _ctx.ui.list.marker.rounded,
          _ctx.ui.list.marker.shadow
        ] }, null, 2)], 2), (openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
          return openBlock(), createBlock(_component_HTab, {
            key: index,
            ref_for: true,
            ref: "itemRefs",
            disabled: item.disabled,
            as: "template"
          }, {
            default: withCtx(({ selected, disabled }) => [createVNode("button", {
              "aria-label": item.ariaLabel,
              class: [
                _ctx.ui.list.tab.base,
                _ctx.ui.list.tab.background,
                _ctx.ui.list.tab.height,
                _ctx.ui.list.tab.padding,
                _ctx.ui.list.tab.size,
                _ctx.ui.list.tab.font,
                _ctx.ui.list.tab.rounded,
                _ctx.ui.list.tab.shadow,
                selected ? _ctx.ui.list.tab.active : _ctx.ui.list.tab.inactive
              ]
            }, [renderSlot(_ctx.$slots, "icon", {
              item,
              index,
              selected,
              disabled
            }, () => [item.icon ? (openBlock(), createBlock(_component_UIcon, {
              key: 0,
              name: item.icon,
              class: _ctx.ui.list.tab.icon
            }, null, 8, ["name", "class"])) : createCommentVNode("", true)]), renderSlot(_ctx.$slots, "default", {
              item,
              index,
              selected,
              disabled
            }, () => [createVNode("span", { class: "truncate" }, toDisplayString(item.label), 1)])], 10, ["aria-label"])]),
            _: 2
          }, 1032, ["disabled"]);
        }), 128))]),
        _: 3
      }, 8, ["class", "style"]), _ctx.content ? (openBlock(), createBlock(_component_HTabPanels, {
        key: 0,
        class: _ctx.ui.container
      }, {
        default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (item, index) => {
          return openBlock(), createBlock(_component_HTabPanel, {
            key: index,
            class: _ctx.ui.base,
            unmount: _ctx.unmount
          }, {
            default: withCtx(({ selected }) => [renderSlot(_ctx.$slots, item.slot || "item", {
              item,
              index,
              selected
            }, () => [createTextVNode(toDisplayString(item.content), 1)])]),
            _: 2
          }, 1032, ["class", "unmount"]);
        }), 128))]),
        _: 3
      }, 8, ["class"])) : createCommentVNode("", true)];
    }),
    _: 3
  }, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/navigation/Tabs.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Tabs_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Tabs_default as default };
//# sourceMappingURL=Tabs-BA-VGK81.mjs.map
