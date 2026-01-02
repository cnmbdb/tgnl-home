import { r as mergeConfig, i as twMerge, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import { u as useUI, q as skeleton_default } from './ui-G7Oicn0a.mjs';
import { defineComponent, createVNode, resolveDynamicComponent, mergeProps, toRef, computed, useSSRContext } from 'vue';
import { twJoin } from 'tailwind-merge';
import { ssrRenderVNode } from 'vue/server-renderer';
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

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.skeleton, skeleton_default);
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
    const { ui, attrs } = useUI("skeleton", toRef(props, "ui"), config);
    return {
      ui,
      attrs,
      skeletonClass: computed(() => {
        return twMerge(twJoin(ui.value.base, ui.value.background, ui.value.rounded), props.class);
      })
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({ class: _ctx.skeletonClass }, _ctx.attrs, _attrs), null), _parent);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/layout/Skeleton.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Skeleton_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Skeleton_default as default };
//# sourceMappingURL=Skeleton-DTw_175A.mjs.map
