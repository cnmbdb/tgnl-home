import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { W as useUI, r as contextMenu_default } from "./ui-G7Oicn0a.js";
import { t as usePopper } from "./usePopper-CMZCG_Qh.js";
import { computed, defineComponent, mergeProps, toRef, useSSRContext } from "vue";
import { defu } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/defu/dist/defu.mjs";
import { onClickOutside } from "@vueuse/core";
import { twJoin } from "tailwind-merge";
import { ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.contextMenu, contextMenu_default);
var _sfc_main = defineComponent({
	inheritAttrs: false,
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},
		virtualElement: {
			type: Object,
			required: true
		},
		popper: {
			type: Object,
			default: () => ({})
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
	emits: ["update:modelValue", "close"],
	setup(props, { emit }) {
		const { ui, attrs } = useUI("contextMenu", toRef(props, "ui"), config);
		const popper = computed(() => defu({}, props.popper, ui.value.popper));
		const isOpen = computed({
			get() {
				return props.modelValue;
			},
			set(value) {
				emit("update:modelValue", value);
			}
		});
		const virtualElement = toRef(props, "virtualElement");
		const [, container] = usePopper(popper.value, virtualElement);
		const wrapperClass = computed(() => {
			return twMerge(twJoin(ui.value.container, ui.value.width), props.class);
		});
		onClickOutside(container, () => {
			isOpen.value = false;
		});
		return {
			ui,
			attrs,
			isOpen,
			wrapperClass,
			popper,
			container
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	if (_ctx.isOpen) {
		_push(`<div${ssrRenderAttrs(mergeProps({
			ref: "container",
			class: _ctx.wrapperClass
		}, _ctx.attrs, _attrs))}><template><div>`);
		if (_ctx.popper.arrow) _push(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.ui.arrow))}"></div>`);
		else _push(`<!---->`);
		_push(`<div class="${ssrRenderClass([
			_ctx.ui.base,
			_ctx.ui.ring,
			_ctx.ui.rounded,
			_ctx.ui.shadow,
			_ctx.ui.background
		])}">`);
		ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
		_push(`</div></div></template></div>`);
	} else _push(`<!---->`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/overlays/ContextMenu.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var ContextMenu_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { ContextMenu_default as default };

//# sourceMappingURL=ContextMenu-CjvrV2EK.js.map