import { r as mergeConfig, i as twMerge, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import { u as useUI, c as alert_default } from './ui-G7Oicn0a.mjs';
import Avatar_default from './Avatar-RiJ55zLR.mjs';
import Button_default from './Button-B1clF2nP.mjs';
import { defineComponent, mergeProps, toRef, computed, useSSRContext } from 'vue';
import { twJoin } from 'tailwind-merge';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.alert, alert_default);
var _sfc_main = defineComponent({
  components: {
    UIcon: Icon_default,
    UAvatar: Avatar_default,
    UButton: Button_default
  },
  inheritAttrs: false,
  props: {
    title: {
      type: String,
      default: null
    },
    description: {
      type: String,
      default: null
    },
    icon: {
      type: String,
      default: () => config.default.icon
    },
    avatar: {
      type: Object,
      default: null
    },
    closeButton: {
      type: Object,
      default: () => config.default.closeButton
    },
    actions: {
      type: Array,
      default: () => []
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
  emits: ["close"],
  setup(props) {
    const { ui, attrs } = useUI("alert", toRef(props, "ui"), config);
    const alertClass = computed(() => {
      var _a, _b;
      const variant = ((_b = (_a = ui.value.color) == null ? void 0 : _a[props.color]) == null ? void 0 : _b[props.variant]) || ui.value.variant[props.variant];
      return twMerge(twJoin(ui.value.wrapper, ui.value.rounded, ui.value.shadow, ui.value.padding, variant == null ? void 0 : variant.replaceAll("{color}", props.color)), props.class);
    });
    function onAction(action) {
      if (action.click) action.click();
    }
    return {
      ui,
      attrs,
      alertClass,
      onAction,
      twMerge
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UIcon = Icon_default;
  const _component_UAvatar = Avatar_default;
  const _component_UButton = Button_default;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.alertClass }, _ctx.attrs, _attrs))}><div class="${ssrRenderClass([[_ctx.ui.gap, {
    "items-start": _ctx.description || _ctx.$slots.description,
    "items-center": !_ctx.description && !_ctx.$slots.description
  }], "flex"])}">`);
  ssrRenderSlot(_ctx.$slots, "icon", { icon: _ctx.icon }, () => {
    if (_ctx.icon) _push(ssrRenderComponent(_component_UIcon, {
      name: _ctx.icon,
      class: _ctx.ui.icon.base
    }, null, _parent));
    else _push(`<!---->`);
  }, _push, _parent);
  ssrRenderSlot(_ctx.$slots, "avatar", { avatar: _ctx.avatar }, () => {
    if (_ctx.avatar) _push(ssrRenderComponent(_component_UAvatar, mergeProps({
      size: _ctx.ui.avatar.size,
      ..._ctx.avatar
    }, { class: _ctx.ui.avatar.base }), null, _parent));
    else _push(`<!---->`);
  }, _push, _parent);
  _push(`<div class="${ssrRenderClass(_ctx.ui.inner)}">`);
  if (_ctx.title || _ctx.$slots.title) {
    _push(`<p class="${ssrRenderClass(_ctx.ui.title)}">`);
    ssrRenderSlot(_ctx.$slots, "title", { title: _ctx.title }, () => {
      _push(`${ssrInterpolate(_ctx.title)}`);
    }, _push, _parent);
    _push(`</p>`);
  } else _push(`<!---->`);
  if (_ctx.description || _ctx.$slots.description) {
    _push(`<div class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.description, !_ctx.title && !_ctx.$slots.title && _ctx.ui.descriptionOnly))}">`);
    ssrRenderSlot(_ctx.$slots, "description", { description: _ctx.description }, () => {
      _push(`${ssrInterpolate(_ctx.description)}`);
    }, _push, _parent);
    _push(`</div>`);
  } else _push(`<!---->`);
  if ((_ctx.description || _ctx.$slots.description) && (_ctx.actions.length || _ctx.$slots.actions)) {
    _push(`<div class="${ssrRenderClass(_ctx.ui.actions)}">`);
    ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
      _push(`<!--[-->`);
      ssrRenderList(_ctx.actions, (action, index) => {
        _push(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, { ref_for: true }, {
          ..._ctx.ui.default.actionButton || {},
          ...action
        }, { onClick: ($event) => _ctx.onAction(action) }), null, _parent));
      });
      _push(`<!--]-->`);
    }, _push, _parent);
    _push(`</div>`);
  } else _push(`<!---->`);
  _push(`</div>`);
  if (_ctx.closeButton || !_ctx.description && !_ctx.$slots.description && _ctx.actions.length) {
    _push(`<div class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.actions, "mt-0"))}">`);
    if (!_ctx.description && !_ctx.$slots.description && (_ctx.actions.length || _ctx.$slots.actions)) ssrRenderSlot(_ctx.$slots, "actions", {}, () => {
      _push(`<!--[-->`);
      ssrRenderList(_ctx.actions, (action, index) => {
        _push(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, { ref_for: true }, {
          ..._ctx.ui.default.actionButton || {},
          ...action
        }, { onClick: ($event) => _ctx.onAction(action) }), null, _parent));
      });
      _push(`<!--]-->`);
    }, _push, _parent);
    else _push(`<!---->`);
    if (_ctx.closeButton) _push(ssrRenderComponent(_component_UButton, mergeProps({ "aria-label": "Close" }, {
      ..._ctx.ui.default.closeButton || {},
      ..._ctx.closeButton
    }, { onClick: ($event) => _ctx.$emit("close") }), null, _parent));
    else _push(`<!---->`);
    _push(`</div>`);
  } else _push(`<!---->`);
  _push(`</div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Alert.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Alert_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Alert_default as default };
//# sourceMappingURL=Alert-BxHqwDvj.mjs.map
