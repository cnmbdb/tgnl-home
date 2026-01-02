import { i as twMerge, r as mergeConfig, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import { u as useUI, O as card_default } from './ui-G7Oicn0a.mjs';
import { defineComponent, createVNode, resolveDynamicComponent, mergeProps, withCtx, createBlock, createCommentVNode, openBlock, renderSlot, toRef, computed, useSSRContext } from 'vue';
import { twJoin } from 'tailwind-merge';
import { ssrRenderVNode, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
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

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.card, card_default);
var _sfc_main = defineComponent({
  inheritAttrs: false,
  props: {
    as: {
      type: String,
      default: "div"
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
    const { ui, attrs } = useUI("card", toRef(props, "ui"), config);
    return {
      ui,
      attrs,
      cardClass: computed(() => {
        return twMerge(twJoin(ui.value.base, ui.value.rounded, ui.value.divide, ui.value.ring, ui.value.shadow, ui.value.background), props.class);
      })
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.$attrs.onSubmit ? "form" : _ctx.as), mergeProps({ class: _ctx.cardClass }, _ctx.attrs, _attrs), {
    default: withCtx((_, _push$1, _parent$1, _scopeId) => {
      if (_push$1) {
        if (_ctx.$slots.header) {
          _push$1(`<div class="${ssrRenderClass([
            _ctx.ui.header.base,
            _ctx.ui.header.padding,
            _ctx.ui.header.background
          ])}"${_scopeId}>`);
          ssrRenderSlot(_ctx.$slots, "header", {}, null, _push$1, _parent$1, _scopeId);
          _push$1(`</div>`);
        } else _push$1(`<!---->`);
        if (_ctx.$slots.default) {
          _push$1(`<div class="${ssrRenderClass([
            _ctx.ui.body.base,
            _ctx.ui.body.padding,
            _ctx.ui.body.background
          ])}"${_scopeId}>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
          _push$1(`</div>`);
        } else _push$1(`<!---->`);
        if (_ctx.$slots.footer) {
          _push$1(`<div class="${ssrRenderClass([
            _ctx.ui.footer.base,
            _ctx.ui.footer.padding,
            _ctx.ui.footer.background
          ])}"${_scopeId}>`);
          ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push$1, _parent$1, _scopeId);
          _push$1(`</div>`);
        } else _push$1(`<!---->`);
      } else return [
        _ctx.$slots.header ? (openBlock(), createBlock("div", {
          key: 0,
          class: [
            _ctx.ui.header.base,
            _ctx.ui.header.padding,
            _ctx.ui.header.background
          ]
        }, [renderSlot(_ctx.$slots, "header")], 2)) : createCommentVNode("", true),
        _ctx.$slots.default ? (openBlock(), createBlock("div", {
          key: 1,
          class: [
            _ctx.ui.body.base,
            _ctx.ui.body.padding,
            _ctx.ui.body.background
          ]
        }, [renderSlot(_ctx.$slots, "default")], 2)) : createCommentVNode("", true),
        _ctx.$slots.footer ? (openBlock(), createBlock("div", {
          key: 2,
          class: [
            _ctx.ui.footer.base,
            _ctx.ui.footer.padding,
            _ctx.ui.footer.background
          ]
        }, [renderSlot(_ctx.$slots, "footer")], 2)) : createCommentVNode("", true)
      ];
    }),
    _: 3
  }), _parent);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/layout/Card.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Card_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Card_default as default };
//# sourceMappingURL=Card-CV7B2HPk.mjs.map
