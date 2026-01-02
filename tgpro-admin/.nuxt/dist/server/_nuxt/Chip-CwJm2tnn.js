import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { L as chip_default, W as useUI } from "./ui-G7Oicn0a.js";
import { computed, defineComponent, mergeProps, toRef, useSSRContext } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.chip, chip_default);
var _sfc_main = defineComponent({
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
				return ["gray", ...virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors].includes(value);
			}
		},
		position: {
			type: String,
			default: () => config.default.position,
			validator(value) {
				return Object.keys(config.position).includes(value);
			}
		},
		text: {
			type: [String, Number],
			default: null
		},
		inset: {
			type: Boolean,
			default: () => config.default.inset
		},
		show: {
			type: Boolean,
			default: true
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
		const { ui, attrs } = useUI("chip", toRef(props, "ui"), config, toRef(props, "class"));
		return {
			ui,
			attrs,
			chipClass: computed(() => {
				return twJoin(ui.value.base, ui.value.size[props.size], ui.value.position[props.position], props.inset ? null : ui.value.translate[props.position], ui.value.background.replaceAll("{color}", props.color));
			})
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.ui.wrapper }, _ctx.attrs, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	if (_ctx.show) {
		_push(`<span class="${ssrRenderClass(_ctx.chipClass)}">`);
		ssrRenderSlot(_ctx.$slots, "content", {}, () => {
			_push(`${ssrInterpolate(_ctx.text)}`);
		}, _push, _parent);
		_push(`</span>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Chip.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Chip_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Chip_default as default };

//# sourceMappingURL=Chip-CwJm2tnn.js.map