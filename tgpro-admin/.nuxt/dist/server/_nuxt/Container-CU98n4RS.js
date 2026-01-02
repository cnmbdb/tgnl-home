import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { W as useUI, g as container_default } from "./ui-G7Oicn0a.js";
import { computed, createVNode, defineComponent, mergeProps, renderSlot, resolveDynamicComponent, toRef, useSSRContext, withCtx } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.container, container_default);
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
		const { ui, attrs } = useUI("container", toRef(props, "ui"), config);
		return {
			ui,
			attrs,
			containerClass: computed(() => {
				return twMerge(twJoin(ui.value.base, ui.value.padding, ui.value.constrained), props.class);
			})
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({ class: _ctx.containerClass }, _ctx.attrs, _attrs), {
		default: withCtx((_, _push$1, _parent$1, _scopeId) => {
			if (_push$1) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$1, _parent$1, _scopeId);
			else return [renderSlot(_ctx.$slots, "default")];
		}),
		_: 3
	}), _parent);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/layout/Container.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Container_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Container_default as default };

//# sourceMappingURL=Container-CU98n4RS.js.map