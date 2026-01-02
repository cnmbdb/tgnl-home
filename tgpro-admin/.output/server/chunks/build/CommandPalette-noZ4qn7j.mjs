import { r as mergeConfig, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import { u as useUI, w as commandPalette_default } from './ui-G7Oicn0a.mjs';
import { u as ut, i as it, l as lt } from './combobox-D2aupXSo.mjs';
import { s } from './keyboard-CvjRf4Wb.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import CommandPaletteGroup_default from './CommandPaletteGroup-Dpky3S1g.mjs';
import { defineComponent, resolveComponent, mergeProps, withCtx, createSlots, renderList, renderSlot, createBlock, openBlock, Fragment, withDirectives, createCommentVNode, createVNode, vShow, toDisplayString, toRef, ref, computed, watch, useId, useSSRContext } from 'vue';
import { i as defu } from '../nitro/nitro.mjs';
import { useDebounceFn } from '@vueuse/core';
import { twJoin } from 'tailwind-merge';
import { ssrRenderComponent, ssrRenderClass, ssrRenderStyle, ssrRenderList, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
import { useFuse } from '@vueuse/integrations/useFuse';
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
import './form-1BInePM-.mjs';
import './active-element-history-DJ1NL7os.mjs';
import './micro-task-CYdHJ3PN.mjs';
import './focus-management-DFaZHIRF.mjs';
import './use-outside-click-B4rja7ys.mjs';
import './use-resolve-button-type-eioNRL5V.mjs';
import './calculate-active-index-B5ynhl2N.mjs';
import './hidden-Bsn3DsxF.mjs';
import './open-closed-Dsm1EOia.mjs';
import '@tanstack/vue-virtual';
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';
import './Avatar-RiJ55zLR.mjs';
import './Kbd-B6q0WgYi.mjs';
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

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.commandPalette, commandPalette_default);
var _sfc_main = defineComponent({
  components: {
    HCombobox: lt,
    HComboboxInput: it,
    HComboboxOptions: ut,
    UIcon: Icon_default,
    UButton: Button_default,
    CommandPaletteGroup: CommandPaletteGroup_default
  },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [
        String,
        Number,
        Object,
        Array
      ],
      default: null
    },
    by: {
      type: String,
      default: "id"
    },
    multiple: {
      type: Boolean,
      default: false
    },
    nullable: {
      type: Boolean,
      default: false
    },
    searchable: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: false
    },
    groups: {
      type: Array,
      default: () => []
    },
    icon: {
      type: String,
      default: () => config.default.icon
    },
    loadingIcon: {
      type: String,
      default: () => config.default.loadingIcon
    },
    selectedIcon: {
      type: String,
      default: () => config.default.selectedIcon
    },
    closeButton: {
      type: Object,
      default: () => config.default.closeButton
    },
    emptyState: {
      type: Object,
      default: () => config.default.emptyState
    },
    placeholder: {
      type: String,
      default: "Search..."
    },
    groupAttribute: {
      type: String,
      default: "label"
    },
    commandAttribute: {
      type: String,
      default: "label"
    },
    autoselect: {
      type: Boolean,
      default: true
    },
    autoclear: {
      type: Boolean,
      default: true
    },
    debounce: {
      type: Number,
      default: 200
    },
    fuse: {
      type: Object,
      default: () => ({})
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
  emits: ["update:modelValue", "close"],
  setup(props, { emit, expose }) {
    const { ui, attrs } = useUI("commandPalette", toRef(props, "ui"), config, toRef(props, "class"));
    const query = ref("");
    const comboboxInput = ref();
    const comboboxApi = ref(null);
    const isLoading = ref(false);
    const options = computed(() => defu({}, props.fuse, {
      fuseOptions: { keys: [props.commandAttribute] },
      resultLimit: 12,
      matchAllWhenSearchEmpty: true
    }));
    const commands = computed(() => {
      var _a;
      const commands2 = [];
      for (const group of props.groups) if (!group.search && !group.static) commands2.push(...((_a = group.commands) == null ? void 0 : _a.map((command) => ({
        ...command,
        group: group.key
      }))) || []);
      return commands2;
    });
    const searchResults = ref({});
    const { results } = useFuse(query, commands, options);
    function getGroupWithCommands(group, commands2) {
      if (!group) return;
      if (group.filter && typeof group.filter === "function") commands2 = group.filter(query.value, commands2);
      return {
        ...group,
        commands: commands2.slice(0, options.value.resultLimit)
      };
    }
    const groups = computed(() => {
      if (!results.value) return [];
      const groupedCommands = results.value.reduce((acc, command) => {
        var _a;
        const { item, ...data } = command;
        if (!item.group) return acc;
        acc[_a = item.group] || (acc[_a] = []);
        acc[item.group].push({
          ...item,
          ...data
        });
        return acc;
      }, {});
      const groups2 = Object.entries(groupedCommands).map(([key, commands2]) => {
        const group = props.groups.find((group2) => group2.key === key);
        if (!group) return null;
        return getGroupWithCommands(group, commands2);
      }).filter(Boolean);
      const searchGroups = props.groups.filter((group) => {
        var _a;
        return !!group.search && ((_a = searchResults.value[group.key]) == null ? void 0 : _a.length);
      }).map((group) => {
        return getGroupWithCommands(group, [...searchResults.value[group.key] || []]);
      });
      const staticGroups = props.groups.filter((group) => {
        var _a;
        return group.static && ((_a = group.commands) == null ? void 0 : _a.length);
      }).map((group) => {
        return getGroupWithCommands(group, group.commands);
      });
      return [
        ...groups2,
        ...searchGroups,
        ...staticGroups
      ];
    });
    const debouncedSearch = useDebounceFn(async () => {
      const searchableGroups = props.groups.filter((group) => !!group.search);
      if (!searchableGroups.length) return;
      isLoading.value = true;
      await Promise.all(searchableGroups.map(async (group) => {
        searchResults.value[group.key] = await group.search(query.value);
      }));
      isLoading.value = false;
      activateFirstOption();
    }, props.debounce);
    watch(query, () => {
      debouncedSearch();
      activateFirstOption();
    });
    const iconName = computed(() => {
      if ((props.loading || isLoading.value) && props.loadingIcon) return props.loadingIcon;
      return props.icon;
    });
    const iconClass = computed(() => {
      return twJoin(ui.value.input.icon.base, ui.value.input.icon.size, (props.loading || isLoading.value) && props.loadingIcon && ui.value.input.icon.loading);
    });
    const emptyState = computed(() => {
      if (props.emptyState === null) return null;
      return {
        ...ui.value.default.emptyState,
        ...props.emptyState
      };
    });
    function activateFirstOption() {
      setTimeout(() => {
        var _a;
        (_a = comboboxInput.value) == null ? void 0 : _a.$el.dispatchEvent(new KeyboardEvent("keydown", { key: "PageUp" }));
      }, 0);
    }
    function onSelect(option) {
      emit("update:modelValue", option, { query: query.value });
      if (props.autoclear) setTimeout(() => {
        query.value = "";
      }, 0);
    }
    function onClear() {
      if (query.value) query.value = "";
      else emit("close");
    }
    expose({
      query,
      updateQuery: (q) => {
        query.value = q;
      },
      comboboxApi,
      results
    });
    s(() => useId());
    return {
      ui,
      attrs,
      groups,
      comboboxInput,
      query,
      iconName,
      iconClass,
      emptyState,
      onSelect,
      onClear
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_HCombobox = resolveComponent("HCombobox");
  const _component_UIcon = Icon_default;
  const _component_HComboboxInput = resolveComponent("HComboboxInput");
  const _component_UButton = Button_default;
  const _component_HComboboxOptions = resolveComponent("HComboboxOptions");
  const _component_CommandPaletteGroup = resolveComponent("CommandPaletteGroup");
  _push(ssrRenderComponent(_component_HCombobox, mergeProps({
    by: _ctx.by,
    "model-value": _ctx.modelValue,
    multiple: _ctx.multiple,
    nullable: _ctx.nullable,
    class: _ctx.ui.wrapper
  }, _ctx.attrs, {
    as: "div",
    "onUpdate:modelValue": _ctx.onSelect
  }, _attrs), {
    default: withCtx((_, _push$1, _parent$1, _scopeId) => {
      if (_push$1) {
        _push$1(`<div class="${ssrRenderClass(_ctx.ui.input.wrapper)}" style="${ssrRenderStyle(_ctx.searchable ? null : { display: "none" })}"${_scopeId}>`);
        if (_ctx.iconName) _push$1(ssrRenderComponent(_component_UIcon, {
          name: _ctx.iconName,
          class: _ctx.iconClass,
          "aria-hidden": "true"
        }, null, _parent$1, _scopeId));
        else _push$1(`<!---->`);
        _push$1(ssrRenderComponent(_component_HComboboxInput, {
          ref: "comboboxInput",
          value: _ctx.query,
          class: [
            _ctx.ui.input.base,
            _ctx.ui.input.size,
            _ctx.ui.input.height,
            _ctx.ui.input.padding,
            _ctx.icon && _ctx.ui.input.icon.padding,
            _ctx.closeButton && _ctx.ui.input.closeButton.padding
          ],
          placeholder: _ctx.placeholder,
          "aria-label": _ctx.placeholder,
          autocomplete: "off",
          onChange: ($event) => _ctx.query = $event.target.value
        }, null, _parent$1, _scopeId));
        if (_ctx.closeButton) _push$1(ssrRenderComponent(_component_UButton, mergeProps({ "aria-label": "Close" }, {
          ..._ctx.ui.default.closeButton || {},
          ..._ctx.closeButton
        }, {
          class: _ctx.ui.input.closeButton.base,
          onClick: _ctx.onClear
        }), null, _parent$1, _scopeId));
        else _push$1(`<!---->`);
        _push$1(`</div>`);
        if (_ctx.groups.length) _push$1(ssrRenderComponent(_component_HComboboxOptions, {
          static: "",
          hold: "",
          as: "div",
          "aria-label": "Commands",
          class: _ctx.ui.container
        }, {
          default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
            if (_push$2) {
              _push$2(`<!--[-->`);
              ssrRenderList(_ctx.groups, (group) => {
                _push$2(ssrRenderComponent(_component_CommandPaletteGroup, {
                  key: group.key,
                  query: _ctx.query,
                  group,
                  "group-attribute": _ctx.groupAttribute,
                  "command-attribute": _ctx.commandAttribute,
                  "selected-icon": _ctx.selectedIcon,
                  ui: _ctx.ui
                }, createSlots({ _: 2 }, [renderList(_ctx.$slots, (_$2, name) => {
                  return {
                    name,
                    fn: withCtx((slotData, _push$3, _parent$3, _scopeId$2) => {
                      if (_push$3) ssrRenderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData), null, _push$3, _parent$3, _scopeId$2);
                      else return [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))];
                    })
                  };
                })]), _parent$2, _scopeId$1));
              });
              _push$2(`<!--]-->`);
            } else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.groups, (group) => {
              return openBlock(), createBlock(_component_CommandPaletteGroup, {
                key: group.key,
                query: _ctx.query,
                group,
                "group-attribute": _ctx.groupAttribute,
                "command-attribute": _ctx.commandAttribute,
                "selected-icon": _ctx.selectedIcon,
                ui: _ctx.ui
              }, createSlots({ _: 2 }, [renderList(_ctx.$slots, (_$2, name) => {
                return {
                  name,
                  fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
                };
              })]), 1032, [
                "query",
                "group",
                "group-attribute",
                "command-attribute",
                "selected-icon",
                "ui"
              ]);
            }), 128))];
          }),
          _: 3
        }, _parent$1, _scopeId));
        else if (_ctx.emptyState) ssrRenderSlot(_ctx.$slots, "empty-state", {}, () => {
          _push$1(`<div class="${ssrRenderClass(_ctx.ui.emptyState.wrapper)}"${_scopeId}>`);
          if (_ctx.emptyState.icon) _push$1(ssrRenderComponent(_component_UIcon, {
            name: _ctx.emptyState.icon,
            class: _ctx.ui.emptyState.icon,
            "aria-hidden": "true"
          }, null, _parent$1, _scopeId));
          else _push$1(`<!---->`);
          _push$1(`<p class="${ssrRenderClass(_ctx.query ? _ctx.ui.emptyState.queryLabel : _ctx.ui.emptyState.label)}"${_scopeId}>${ssrInterpolate(_ctx.query ? _ctx.emptyState.queryLabel : _ctx.emptyState.label)}</p></div>`);
        }, _push$1, _parent$1, _scopeId);
        else _push$1(`<!---->`);
      } else return [withDirectives(createVNode("div", { class: _ctx.ui.input.wrapper }, [
        _ctx.iconName ? (openBlock(), createBlock(_component_UIcon, {
          key: 0,
          name: _ctx.iconName,
          class: _ctx.iconClass,
          "aria-hidden": "true"
        }, null, 8, ["name", "class"])) : createCommentVNode("", true),
        createVNode(_component_HComboboxInput, {
          ref: "comboboxInput",
          value: _ctx.query,
          class: [
            _ctx.ui.input.base,
            _ctx.ui.input.size,
            _ctx.ui.input.height,
            _ctx.ui.input.padding,
            _ctx.icon && _ctx.ui.input.icon.padding,
            _ctx.closeButton && _ctx.ui.input.closeButton.padding
          ],
          placeholder: _ctx.placeholder,
          "aria-label": _ctx.placeholder,
          autocomplete: "off",
          onChange: ($event) => _ctx.query = $event.target.value
        }, null, 8, [
          "value",
          "class",
          "placeholder",
          "aria-label",
          "onChange"
        ]),
        _ctx.closeButton ? (openBlock(), createBlock(_component_UButton, mergeProps({
          key: 1,
          "aria-label": "Close"
        }, {
          ..._ctx.ui.default.closeButton || {},
          ..._ctx.closeButton
        }, {
          class: _ctx.ui.input.closeButton.base,
          onClick: _ctx.onClear
        }), null, 16, ["class", "onClick"])) : createCommentVNode("", true)
      ], 2), [[vShow, _ctx.searchable]]), _ctx.groups.length ? (openBlock(), createBlock(_component_HComboboxOptions, {
        key: 0,
        static: "",
        hold: "",
        as: "div",
        "aria-label": "Commands",
        class: _ctx.ui.container
      }, {
        default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.groups, (group) => {
          return openBlock(), createBlock(_component_CommandPaletteGroup, {
            key: group.key,
            query: _ctx.query,
            group,
            "group-attribute": _ctx.groupAttribute,
            "command-attribute": _ctx.commandAttribute,
            "selected-icon": _ctx.selectedIcon,
            ui: _ctx.ui
          }, createSlots({ _: 2 }, [renderList(_ctx.$slots, (_$1, name) => {
            return {
              name,
              fn: withCtx((slotData) => [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))])
            };
          })]), 1032, [
            "query",
            "group",
            "group-attribute",
            "command-attribute",
            "selected-icon",
            "ui"
          ]);
        }), 128))]),
        _: 3
      }, 8, ["class"])) : _ctx.emptyState ? renderSlot(_ctx.$slots, "empty-state", { key: 1 }, () => [createVNode("div", { class: _ctx.ui.emptyState.wrapper }, [_ctx.emptyState.icon ? (openBlock(), createBlock(_component_UIcon, {
        key: 0,
        name: _ctx.emptyState.icon,
        class: _ctx.ui.emptyState.icon,
        "aria-hidden": "true"
      }, null, 8, ["name", "class"])) : createCommentVNode("", true), createVNode("p", { class: _ctx.query ? _ctx.ui.emptyState.queryLabel : _ctx.ui.emptyState.label }, toDisplayString(_ctx.query ? _ctx.emptyState.queryLabel : _ctx.emptyState.label), 3)], 2)]) : createCommentVNode("", true)];
    }),
    _: 3
  }, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/navigation/CommandPalette.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var CommandPalette_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { CommandPalette_default as default };
//# sourceMappingURL=CommandPalette-noZ4qn7j.mjs.map
