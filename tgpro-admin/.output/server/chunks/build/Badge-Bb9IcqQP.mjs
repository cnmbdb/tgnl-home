import { r as mergeConfig, i as twMerge, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import { u as useUI, G as badge_default } from './ui-G7Oicn0a.mjs';
import { a as useInjectButtonGroup } from './useButtonGroup-1gNuWR3y.mjs';
import { defineComponent, mergeProps, toRef, computed, useSSRContext } from 'vue';
import { twJoin } from 'tailwind-merge';
import { ssrRenderAttrs, ssrRenderSlot, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
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
import './components-CqoEyeNn.mjs';
import '@iconify/utils/lib/css/icon';

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.badge, badge_default);
var _sfc_main = defineComponent({
  components: { UIcon: Icon_default },
  inheritAttrs: false,
  props: {
    size: {
      type: String,
      default: () => config.default.size,
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
    label: {
      type: [String, Number],
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    leadingIcon: {
      type: String,
      default: null
    },
    trailingIcon: {
      type: String,
      default: null
    },
    trailing: {
      type: Boolean,
      default: false
    },
    leading: {
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
  setup(props) {
    const { ui, attrs } = useUI("badge", toRef(props, "ui"), config);
    const { size, rounded } = useInjectButtonGroup({
      ui,
      props
    });
    return {
      attrs,
      isLeading: computed(() => {
        return props.icon && props.leading || props.icon && !props.trailing || !props.trailing || props.leadingIcon;
      }),
      isTrailing: computed(() => {
        return props.icon && props.trailing || props.trailing || props.trailingIcon;
      }),
      badgeClass: computed(() => {
        var _a, _b;
        const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[props.color]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
        return twMerge(twJoin(ui.value.base, ui.value.font, rounded.value, ui.value.size[size.value], ui.value.gap[size.value], variant == null ? void 0 : variant.replaceAll("{color}", props.color)), props.class);
      }),
      leadingIconName: computed(() => {
        return props.leadingIcon || props.icon;
      }),
      trailingIconName: computed(() => {
        return props.trailingIcon || props.icon;
      }),
      leadingIconClass: computed(() => {
        return twJoin(ui.value.icon.base, ui.value.icon.size[size.value]);
      }),
      trailingIconClass: computed(() => {
        return twJoin(ui.value.icon.base, ui.value.icon.size[size.value]);
      })
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = Icon_default;
  _push(`<span${ssrRenderAttrs(mergeProps({ class: _ctx.badgeClass }, _ctx.attrs, _attrs))}>`);
  ssrRenderSlot(_ctx.$slots, "leading", {}, () => {
    if (_ctx.isLeading && _ctx.leadingIconName) _push(ssrRenderComponent(_component_UIcon, {
      name: _ctx.leadingIconName,
      class: _ctx.leadingIconClass,
      "aria-hidden": "true"
    }, null, _parent));
    else _push(`<!---->`);
  }, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "default", {}, () => {
    if (_ctx.label !== void 0 && _ctx.label !== null) _push(`<span>${ssrInterpolate(_ctx.label)}</span>`);
    else _push(`<!---->`);
  }, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "trailing", {}, () => {
    if (_ctx.isTrailing && _ctx.trailingIconName) _push(ssrRenderComponent(_component_UIcon, {
      name: _ctx.trailingIconName,
      class: _ctx.trailingIconClass,
      "aria-hidden": "true"
    }, null, _parent));
    else _push(`<!---->`);
  }, _push, _parent);
  _push(`</span>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Badge.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Badge_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Badge_default as default };
//# sourceMappingURL=Badge-Bb9IcqQP.mjs.map
