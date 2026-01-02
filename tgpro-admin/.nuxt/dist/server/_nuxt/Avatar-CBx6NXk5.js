import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import { H as avatar_default, W as useUI } from "./ui-G7Oicn0a.js";
import { computed, createVNode, defineComponent, mergeProps, ref, resolveComponent, resolveDynamicComponent, toRef, useSSRContext, watch } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.avatar, avatar_default);
var _sfc_main = defineComponent({
	components: { UIcon: Icon_default },
	inheritAttrs: false,
	props: {
		as: {
			type: [String, Object],
			default: "img"
		},
		src: {
			type: [String, Boolean],
			default: null
		},
		alt: {
			type: String,
			default: null
		},
		text: {
			type: String,
			default: null
		},
		icon: {
			type: String,
			default: () => config.default.icon
		},
		size: {
			type: String,
			default: () => config.default.size,
			validator(value) {
				return Object.keys(config.size).includes(value);
			}
		},
		chipColor: {
			type: String,
			default: () => config.default.chipColor,
			validator(value) {
				return ["gray", ...virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors].includes(value);
			}
		},
		chipPosition: {
			type: String,
			default: () => config.default.chipPosition,
			validator(value) {
				return Object.keys(config.chip.position).includes(value);
			}
		},
		chipText: {
			type: [String, Number],
			default: null
		},
		imgClass: {
			type: String,
			default: ""
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
		const { ui, attrs } = useUI("avatar", toRef(props, "ui"), config);
		const url = computed(() => {
			if (typeof props.src === "boolean") return null;
			return props.src;
		});
		const placeholder = computed(() => {
			return (props.alt || "").split(" ").map((word) => word.charAt(0)).join("").substring(0, 2);
		});
		const wrapperClass = computed(() => {
			return twMerge(twJoin(ui.value.wrapper, (error.value || !url.value) && ui.value.background, ui.value.rounded, ui.value.size[props.size]), props.class);
		});
		const imgClass = computed(() => {
			return twMerge(twJoin(ui.value.rounded, ui.value.size[props.size]), props.imgClass);
		});
		const iconClass = computed(() => {
			return twJoin(ui.value.icon.base, ui.value.icon.size[props.size]);
		});
		const chipClass = computed(() => {
			return twJoin(ui.value.chip.base, ui.value.chip.size[props.size], ui.value.chip.position[props.chipPosition], ui.value.chip.background.replaceAll("{color}", props.chipColor));
		});
		const error = ref(false);
		watch(() => props.src, () => {
			if (error.value) error.value = false;
		});
		function onError() {
			error.value = true;
		}
		return {
			ui,
			attrs,
			wrapperClass,
			imgClass,
			iconClass,
			chipClass,
			url,
			placeholder,
			error,
			onError
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_UIcon = Icon_default;
	_push(`<span${ssrRenderAttrs(mergeProps({ class: _ctx.wrapperClass }, _attrs))}>`);
	if (_ctx.url && !_ctx.error) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({
		class: _ctx.imgClass,
		alt: _ctx.alt,
		src: _ctx.url
	}, _ctx.attrs, { onError: _ctx.onError }), null), _parent);
	else if (_ctx.text) _push(`<span class="${ssrRenderClass(_ctx.ui.text)}">${ssrInterpolate(_ctx.text)}</span>`);
	else if (_ctx.icon) _push(ssrRenderComponent(_component_UIcon, {
		name: _ctx.icon,
		class: _ctx.iconClass
	}, null, _parent));
	else if (_ctx.placeholder) _push(`<span class="${ssrRenderClass(_ctx.ui.placeholder)}">${ssrInterpolate(_ctx.placeholder)}</span>`);
	else _push(`<!---->`);
	if (_ctx.chipColor) _push(`<span class="${ssrRenderClass(_ctx.chipClass)}">${ssrInterpolate(_ctx.chipText)}</span>`);
	else _push(`<!---->`);
	ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
	_push(`</span>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Avatar.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Avatar_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Avatar_default as t };

//# sourceMappingURL=Avatar-CBx6NXk5.js.map