import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, h as useState, i as twMerge, r as mergeConfig } from "../server.mjs";
import "./components-D5RLOpR9.js";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import "./Icon-CrxV3u_Z.js";
import { W as useUI, t as notifications_default } from "./ui-G7Oicn0a.js";
import "./Avatar-CBx6NXk5.js";
import "./Link-xfGBFWPh.js";
import "./useButtonGroup-1gNuWR3y.js";
import "./Button-CMkth-mr.js";
import { t as Notification_default } from "./Notification-CsZX8CiY.js";
import { t as useToast } from "./useToast-C_VA77Lb.js";
import { computed, createSlots, defineComponent, mergeProps, renderList, renderSlot, resolveComponent, toRef, useSSRContext, withCtx } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderTeleport } from "vue/server-renderer";
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

//# sourceMappingURL=Notifications-D82kc3kv.js.map