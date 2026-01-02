import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import { B as badge_default, W as useUI } from "./ui-G7Oicn0a.js";
import { t as useInjectButtonGroup } from "./useButtonGroup-1gNuWR3y.js";
import { computed, defineComponent, mergeProps, resolveComponent, toRef, useSSRContext } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
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
				const variant = ui.value.color?.[props.color]?.[props.variant] || ui.value.variant[props.variant];
				return twMerge(twJoin(ui.value.base, ui.value.font, rounded.value, ui.value.size[size.value], ui.value.gap[size.value], variant?.replaceAll("{color}", props.color)), props.class);
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
export { Badge_default as t };

//# sourceMappingURL=Badge-NTFE8zPq.js.map