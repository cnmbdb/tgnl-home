import { r as mergeConfig, i as twMerge, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import { u as useUI, n as range_default } from './ui-G7Oicn0a.mjs';
import { u as useFormGroup } from './useFormGroup-ZK-CpXpd.mjs';
import { defineComponent, mergeProps, toRef, computed, useSSRContext } from 'vue';
import { twJoin } from 'tailwind-merge';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrGetDynamicModelProps } from 'vue/server-renderer';
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
import '@iconify/vue';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.range, range_default);
var _sfc_main = defineComponent({
  inheritAttrs: false,
  props: {
    modelValue: {
      type: Number,
      default: 0
    },
    id: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    min: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
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
        return virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors.includes(value);
      }
    },
    inputClass: {
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
    }
  },
  emits: ["update:modelValue", "change"],
  setup(props, { emit }) {
    const { ui, attrs } = useUI("range", toRef(props, "ui"), config);
    const { emitFormChange, inputId, color, size, name } = useFormGroup(props, config);
    const value = computed({
      get() {
        return props.modelValue;
      },
      set(value2) {
        emit("update:modelValue", value2);
      }
    });
    const onChange = (event) => {
      emit("change", event.target.value);
      emitFormChange();
    };
    return {
      ui,
      attrs,
      name,
      inputId,
      value,
      wrapperClass: computed(() => {
        return twMerge(twJoin(ui.value.wrapper, ui.value.size[size.value]), props.class);
      }),
      inputClass: computed(() => {
        return twMerge(twJoin(ui.value.base, ui.value.background, ui.value.rounded, color.value && ui.value.ring.replaceAll("{color}", color.value), ui.value.size[size.value]), props.inputClass);
      }),
      thumbClass: computed(() => {
        return twJoin(ui.value.thumb.base, color.value && ui.value.thumb.color.replaceAll("{color}", color.value), ui.value.thumb.ring, ui.value.thumb.background, ui.value.thumb.size[size.value]);
      }),
      trackClass: computed(() => {
        return twJoin(ui.value.track.base, ui.value.track.background, ui.value.track.rounded, ui.value.track.size[size.value]);
      }),
      progressClass: computed(() => {
        return twJoin(ui.value.progress.base, ui.value.progress.rounded, color.value && ui.value.progress.background.replaceAll("{color}", color.value), ui.value.progress.size[size.value]);
      }),
      progressStyle: computed(() => {
        const { modelValue, min, max } = props;
        return { width: `${(Math.max(min, Math.min(modelValue, max)) - min) / (max - min) * 100}%` };
      }),
      onChange
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  let _temp0;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.wrapperClass }, _attrs))}><input${ssrRenderAttrs((_temp0 = mergeProps({
    id: _ctx.inputId,
    ref: "input",
    value: _ctx.value,
    name: _ctx.name,
    min: _ctx.min,
    max: _ctx.max,
    disabled: _ctx.disabled,
    step: _ctx.step,
    type: "range",
    class: [
      _ctx.inputClass,
      _ctx.thumbClass,
      _ctx.trackClass
    ]
  }, _ctx.attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, _ctx.value))))}><span class="${ssrRenderClass(_ctx.progressClass)}" style="${ssrRenderStyle(_ctx.progressStyle)}"></span></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Range.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Range_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Range_default as default };
//# sourceMappingURL=Range-DmYjY98D.mjs.map
