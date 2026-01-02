import { r as mergeConfig, i as twMerge, o as getULinkProps, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import Icon_default from './Icon-BQxbVddL.mjs';
import { u as useUI, x as horizontalNavigation_default } from './ui-G7Oicn0a.mjs';
import Avatar_default from './Avatar-RiJ55zLR.mjs';
import Link_default from './Link-CL8ivRbg.mjs';
import Badge_default from './Badge-Bb9IcqQP.mjs';
import { defineComponent, mergeProps, withCtx, renderSlot, createBlock, createCommentVNode, openBlock, createTextVNode, toDisplayString, toRef, computed, useSSRContext } from 'vue';
import { twJoin } from 'tailwind-merge';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrInterpolate } from 'vue/server-renderer';
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
import './useButtonGroup-1gNuWR3y.mjs';

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.horizontalNavigation, horizontalNavigation_default);
var _sfc_main = defineComponent({
  components: {
    UIcon: Icon_default,
    UAvatar: Avatar_default,
    UBadge: Badge_default,
    ULink: Link_default
  },
  inheritAttrs: false,
  props: {
    links: {
      type: Array,
      default: () => []
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
    const { ui, attrs } = useUI("horizontalNavigation", toRef(props, "ui"), config, toRef(props, "class"));
    return {
      ui,
      attrs,
      sections: computed(() => Array.isArray(props.links[0]) ? props.links : [props.links]),
      getULinkProps,
      twMerge,
      twJoin
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_ULink = Link_default;
  const _component_UAvatar = Avatar_default;
  const _component_UIcon = Icon_default;
  const _component_UBadge = Badge_default;
  _push(`<nav${ssrRenderAttrs(mergeProps({ class: _ctx.ui.wrapper }, _ctx.attrs, _attrs))}><!--[-->`);
  ssrRenderList(_ctx.sections, (section, sectionIndex) => {
    _push(`<ul class="${ssrRenderClass(_ctx.ui.container)}"><!--[-->`);
    ssrRenderList(section, (link, index) => {
      _push(`<li class="${ssrRenderClass(_ctx.ui.inner)}">`);
      _push(ssrRenderComponent(_component_ULink, mergeProps({ ref_for: true }, _ctx.getULinkProps(link), {
        class: [
          _ctx.ui.base,
          _ctx.ui.before,
          _ctx.ui.after
        ],
        "active-class": _ctx.ui.active,
        "inactive-class": _ctx.ui.inactive,
        onClick: link.click,
        onKeyup: ($event) => $event.target.blur()
      }), {
        default: withCtx(({ isActive }, _push$1, _parent$1, _scopeId) => {
          if (_push$1) {
            ssrRenderSlot(_ctx.$slots, "avatar", {
              link,
              isActive
            }, () => {
              if (link.avatar) _push$1(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, {
                size: _ctx.ui.avatar.size,
                ...link.avatar
              }, { class: [_ctx.ui.avatar.base] }), null, _parent$1, _scopeId));
              else _push$1(`<!---->`);
            }, _push$1, _parent$1, _scopeId);
            ssrRenderSlot(_ctx.$slots, "icon", {
              link,
              isActive
            }, () => {
              if (link.icon) _push$1(ssrRenderComponent(_component_UIcon, {
                name: link.icon,
                class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, isActive ? _ctx.ui.icon.active : _ctx.ui.icon.inactive), link.iconClass)
              }, null, _parent$1, _scopeId));
              else _push$1(`<!---->`);
            }, _push$1, _parent$1, _scopeId);
            ssrRenderSlot(_ctx.$slots, "default", {
              link,
              isActive
            }, () => {
              if (link.label) {
                _push$1(`<span class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.label, link.labelClass))}"${_scopeId}>`);
                if (isActive) _push$1(`<span class="sr-only"${_scopeId}> Current page: </span>`);
                else _push$1(`<!---->`);
                _push$1(` ${ssrInterpolate(link.label)}</span>`);
              } else _push$1(`<!---->`);
            }, _push$1, _parent$1, _scopeId);
            ssrRenderSlot(_ctx.$slots, "badge", {
              link,
              isActive
            }, () => {
              if (link.badge) _push$1(ssrRenderComponent(_component_UBadge, mergeProps({ ref_for: true }, {
                size: _ctx.ui.badge.size,
                color: _ctx.ui.badge.color,
                variant: _ctx.ui.badge.variant,
                ...typeof link.badge === "string" || typeof link.badge === "number" ? { label: link.badge } : link.badge
              }, { class: _ctx.ui.badge.base }), null, _parent$1, _scopeId));
              else _push$1(`<!---->`);
            }, _push$1, _parent$1, _scopeId);
          } else return [
            renderSlot(_ctx.$slots, "avatar", {
              link,
              isActive
            }, () => [link.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
              key: 0,
              ref_for: true
            }, {
              size: _ctx.ui.avatar.size,
              ...link.avatar
            }, { class: [_ctx.ui.avatar.base] }), null, 16, ["class"])) : createCommentVNode("", true)]),
            renderSlot(_ctx.$slots, "icon", {
              link,
              isActive
            }, () => [link.icon ? (openBlock(), createBlock(_component_UIcon, {
              key: 0,
              name: link.icon,
              class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, isActive ? _ctx.ui.icon.active : _ctx.ui.icon.inactive), link.iconClass)
            }, null, 8, ["name", "class"])) : createCommentVNode("", true)]),
            renderSlot(_ctx.$slots, "default", {
              link,
              isActive
            }, () => [link.label ? (openBlock(), createBlock("span", {
              key: 0,
              class: _ctx.twMerge(_ctx.ui.label, link.labelClass)
            }, [isActive ? (openBlock(), createBlock("span", {
              key: 0,
              class: "sr-only"
            }, " Current page: ")) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(link.label), 1)], 2)) : createCommentVNode("", true)]),
            renderSlot(_ctx.$slots, "badge", {
              link,
              isActive
            }, () => [link.badge ? (openBlock(), createBlock(_component_UBadge, mergeProps({
              key: 0,
              ref_for: true
            }, {
              size: _ctx.ui.badge.size,
              color: _ctx.ui.badge.color,
              variant: _ctx.ui.badge.variant,
              ...typeof link.badge === "string" || typeof link.badge === "number" ? { label: link.badge } : link.badge
            }, { class: _ctx.ui.badge.base }), null, 16, ["class"])) : createCommentVNode("", true)])
          ];
        }),
        _: 2
      }, _parent));
      _push(`</li>`);
    });
    _push(`<!--]--></ul>`);
  });
  _push(`<!--]--></nav>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/navigation/HorizontalNavigation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var HorizontalNavigation_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { HorizontalNavigation_default as default };
//# sourceMappingURL=HorizontalNavigation-CzaVZKrM.mjs.map
