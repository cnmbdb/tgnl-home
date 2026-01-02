import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { N as kbd_default, W as useUI } from "./ui-G7Oicn0a.js";
import { computed, defineComponent, mergeProps, toRef, useSSRContext } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.kbd, kbd_default);
var _sfc_main = defineComponent({
	inheritAttrs: false,
	props: {
		value: {
			type: String,
			default: null
		},
		size: {
			type: String,
			default: () => config.default.size,
			validator(value) {
				return Object.keys(config.size).includes(value);
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
	setup(props) {
		const { ui, attrs } = useUI("kbd", toRef(props, "ui"), config);
		return {
			ui,
			attrs,
			kbdClass: computed(() => {
				return twMerge(twJoin(ui.value.base, ui.value.size[props.size], ui.value.padding, ui.value.rounded, ui.value.font, ui.value.background, ui.value.ring), props.class);
			})
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<kbd${ssrRenderAttrs(mergeProps({ class: _ctx.kbdClass }, _ctx.attrs, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, () => {
		_push(`${ssrInterpolate(_ctx.value)}`);
	}, _push, _parent);
	_push(`</kbd>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Kbd.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Kbd_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Kbd_default as t };

//# sourceMappingURL=Kbd-DfgTbPkH.js.map