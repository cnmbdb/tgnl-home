import { r as mergeConfig, h as useState, i as twMerge, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default } from './server.mjs';
import { _ as __plugin_vue_export_helper_default } from './_plugin-vue_export-helper-COMwgem8.mjs';
import { u as useUI, C as notifications_default } from './ui-G7Oicn0a.mjs';
import Notification_default from './Notification-DJwR7WOQ.mjs';
import { u as useToast } from './useToast-C_VA77Lb.mjs';
import { defineComponent, mergeProps, createSlots, renderList, withCtx, renderSlot, toRef, computed, useSSRContext } from 'vue';
import { twJoin } from 'tailwind-merge';
import { ssrRenderTeleport, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
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
import './Icon-BQxbVddL.mjs';
import './components-CqoEyeNn.mjs';
import '@iconify/utils/lib/css/icon';
import './Avatar-RiJ55zLR.mjs';
import './Button-B1clF2nP.mjs';
import './Link-CL8ivRbg.mjs';
import './useButtonGroup-1gNuWR3y.mjs';

var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.notifications, notifications_default);
var _sfc_main = defineComponent({
  components: { UNotification: Notification_default },
  inheritAttrs: false,
  props: {
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
    const { ui, attrs } = useUI("notifications", toRef(props, "ui"), config);
    return {
      ui,
      attrs,
      toast: useToast(),
      notifications: useState("notifications", () => []),
      wrapperClass: computed(() => {
        return twMerge(twJoin(ui.value.wrapper, ui.value.position, ui.value.width), props.class);
      })
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_UNotification = Notification_default;
  ssrRenderTeleport(_push, (_push$1) => {
    if (_ctx.notifications.length) {
      _push$1(`<div${ssrRenderAttrs(mergeProps({
        class: _ctx.wrapperClass,
        role: "region"
      }, _ctx.attrs))}><div class="${ssrRenderClass(_ctx.ui.container)}"><!--[-->`);
      ssrRenderList(_ctx.notifications, (notification) => {
        _push$1(`<div>`);
        _push$1(ssrRenderComponent(_component_UNotification, mergeProps({ ref_for: true }, notification, {
          class: notification.click && "cursor-pointer",
          onClick: ($event) => notification.click && notification.click(notification),
          onClose: ($event) => _ctx.toast.remove(notification.id)
        }), createSlots({ _: 2 }, [renderList(_ctx.$slots, (_, name) => {
          return {
            name,
            fn: withCtx((slotData, _push$2, _parent$1, _scopeId) => {
              if (_push$2) ssrRenderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData), null, _push$2, _parent$1, _scopeId);
              else return [renderSlot(_ctx.$slots, name, mergeProps({ ref_for: true }, slotData))];
            })
          };
        })]), _parent));
        _push$1(`</div>`);
      });
      _push$1(`<!--]--></div></div>`);
    } else _push$1(`<!---->`);
  }, "body", false, _parent);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/overlays/Notifications.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Notifications_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { Notifications_default as default };
//# sourceMappingURL=Notifications-D82kc3kv.mjs.map
