import { r as mergeConfig, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, c as get } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import { u as useUI, r as radioGroup_default, l as radio_default } from './ui-G7Oicn0a.mjs';
import { u as useFormGroup } from './useFormGroup-ZK-CpXpd.mjs';
import Radio_default from './Radio-aeVn_7jN.mjs';
import { defineComponent, mergeProps, createSlots, withCtx, renderSlot, toRef, provide, computed, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
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

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.radioGroup, radioGroup_default);
var configRadio = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.radio, radio_default);
var _sfc_main = defineComponent({
  components: { URadio: Radio_default },
  inheritAttrs: false,
  props: {
    modelValue: {
      type: [
        String,
        Number,
        Object,
        Boolean
      ],
      default: ""
    },
    name: {
      type: String,
      default: null
    },
    legend: {
      type: String,
      default: null
    },
    options: {
      type: Array,
      default: () => []
    },
    optionAttribute: {
      type: String,
      default: "label"
    },
    valueAttribute: {
      type: String,
      default: "value"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: () => config.default.color,
      validator(value) {
        return virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors.includes(value);
      }
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
    uiRadio: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("radioGroup", toRef(props, "ui"), config, toRef(props, "class"));
    const { ui: uiRadio } = useUI("radio", toRef(props, "uiRadio"), configRadio);
    const { emitFormChange, color, name } = useFormGroup(props, config, false);
    provide("radio-group", {
      color,
      name
    });
    const onUpdate = (value) => {
      emit("update:modelValue", value);
      emit("change", value);
      emitFormChange();
    };
    const guessOptionValue = (option) => {
      return get(option, props.valueAttribute, get(option, props.optionAttribute));
    };
    const guessOptionText = (option) => {
      return get(option, props.optionAttribute, get(option, props.valueAttribute));
    };
    const guessOptionSelected = (option) => {
      return props.modelValue === guessOptionValue(option);
    };
    const normalizeOption = (option) => {
      if ([
        "string",
        "number",
        "boolean"
      ].includes(typeof option)) return {
        value: option,
        label: option
      };
      return {
        ...option,
        value: guessOptionValue(option),
        label: guessOptionText(option),
        selected: guessOptionSelected(option)
      };
    };
    return {
      ui,
      uiRadio,
      attrs,
      normalizedOptions: computed(() => {
        return props.options.map((option) => normalizeOption(option));
      }),
      onUpdate
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_URadio = Radio_default;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.ui.wrapper }, _attrs))}><fieldset${ssrRenderAttrs(mergeProps(_ctx.attrs, { class: _ctx.ui.fieldset }))}>`);
  if (_ctx.legend || _ctx.$slots.legend) {
    _push(`<legend class="${ssrRenderClass(_ctx.ui.legend)}">`);
    ssrRenderSlot(_ctx.$slots, "legend", {}, () => {
      _push(`${ssrInterpolate(_ctx.legend)}`);
    }, _push, _parent);
    _push(`</legend>`);
  } else _push(`<!---->`);
  _push(`<!--[-->`);
  ssrRenderList(_ctx.normalizedOptions, (option) => {
    _push(ssrRenderComponent(_component_URadio, {
      key: option.value,
      label: option.label,
      "model-value": _ctx.modelValue,
      value: option.value,
      help: option.help,
      disabled: option.disabled || _ctx.disabled,
      ui: _ctx.uiRadio,
      onChange: ($event) => _ctx.onUpdate(option.value)
    }, createSlots({ _: 2 }, [_ctx.$slots.label ? {
      name: "label",
      fn: withCtx((_, _push$1, _parent$1, _scopeId) => {
        if (_push$1) ssrRenderSlot(_ctx.$slots, "label", mergeProps({ ref_for: true }, {
          option,
          selected: option.selected
        }), null, _push$1, _parent$1, _scopeId);
        else return [renderSlot(_ctx.$slots, "label", mergeProps({ ref_for: true }, {
          option,
          selected: option.selected
        }))];
      }),
      key: "0"
    } : void 0, _ctx.$slots.help ? {
      name: "help",
      fn: withCtx((_, _push$1, _parent$1, _scopeId) => {
        if (_push$1) ssrRenderSlot(_ctx.$slots, "help", mergeProps({ ref_for: true }, {
          option,
          selected: option.selected
        }), null, _push$1, _parent$1, _scopeId);
        else return [renderSlot(_ctx.$slots, "help", mergeProps({ ref_for: true }, {
          option,
          selected: option.selected
        }))];
      }),
      key: "1"
    } : void 0]), _parent));
  });
  _push(`<!--]--></fieldset></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/RadioGroup.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var RadioGroup_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { RadioGroup_default as default };
//# sourceMappingURL=RadioGroup-DnPNvloc.mjs.map
