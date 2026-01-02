import { r as mergeConfig, i as twMerge, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import { u as useUI, P as divider_default } from './ui-G7Oicn0a.mjs';
import Avatar_default from './Avatar-RiJ55zLR.mjs';
import { defineComponent, mergeProps, toRef, computed, useSSRContext } from 'vue';
import { twJoin } from 'tailwind-merge';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
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

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.divider, divider_default);
var _sfc_main = defineComponent({
  components: {
    UIcon: Icon_default,
    UAvatar: Avatar_default
  },
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: null
    },
    avatar: {
      type: Object,
      default: null
    },
    size: {
      type: String,
      default: () => config.default.size,
      validator(value) {
        return Object.keys(config.border.size.horizontal).includes(value) || Object.keys(config.border.size.vertical).includes(value);
      }
    },
    orientation: {
      type: String,
      default: "horizontal",
      validator: (value) => ["horizontal", "vertical"].includes(value)
    },
    type: {
      type: String,
      default: () => config.default.type,
      validator: (value) => [
        "solid",
        "dotted",
        "dashed"
      ].includes(value)
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
    const { ui, attrs } = useUI("divider", toRef(props, "ui"), config);
    return {
      ui,
      attrs,
      wrapperClass: computed(() => {
        return twMerge(twJoin(ui.value.wrapper.base, ui.value.wrapper[props.orientation]), props.class);
      }),
      containerClass: computed(() => {
        return twJoin(ui.value.container.base, ui.value.container[props.orientation]);
      }),
      borderClass: computed(() => {
        return twJoin(ui.value.border.base, ui.value.border[props.orientation], ui.value.border.size[props.orientation][props.size], ui.value.border.type[props.type]);
      })
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = Icon_default;
  const _component_UAvatar = Avatar_default;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.wrapperClass }, _ctx.attrs, _attrs))}><div class="${ssrRenderClass(_ctx.borderClass)}"></div>`);
  if (_ctx.label || _ctx.icon || _ctx.avatar || _ctx.$slots.default) {
    _push(`<!--[--><div class="${ssrRenderClass(_ctx.containerClass)}">`);
    ssrRenderSlot(_ctx.$slots, "default", {}, () => {
      if (_ctx.label) _push(`<span class="${ssrRenderClass(_ctx.ui.label)}">${ssrInterpolate(_ctx.label)}</span>`);
      else if (_ctx.icon) _push(ssrRenderComponent(_component_UIcon, {
        name: _ctx.icon,
        class: _ctx.ui.icon.base
      }, null, _parent));
      else if (_ctx.avatar) _push(ssrRenderComponent(_component_UAvatar, mergeProps({
        size: _ctx.ui.avatar.size,
        ..._ctx.avatar
      }, { class: _ctx.ui.avatar.base }), null, _parent));
      else _push(`<!---->`);
    }, _push, _parent);
    _push(`</div><div class="${ssrRenderClass(_ctx.borderClass)}"></div><!--]-->`);
  } else _push(`<!---->`);
  _push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/layout/Divider.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Divider_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Divider_default as default };
//# sourceMappingURL=Divider-Ddhjrdke.mjs.map
