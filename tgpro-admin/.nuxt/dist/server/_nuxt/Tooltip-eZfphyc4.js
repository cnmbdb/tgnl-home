import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { W as useUI, a as tooltip_default } from "./ui-G7Oicn0a.js";
import { t as Kbd_default } from "./Kbd-DfgTbPkH.js";
import { t as usePopper } from "./usePopper-CMZCG_Qh.js";
import { computed, createTextVNode, defineComponent, mergeProps, ref, resolveComponent, toDisplayString, toRef, useSSRContext, useSlots, withCtx } from "vue";
import { defu } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/defu/dist/defu.mjs";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.tooltip, tooltip_default);
var _sfc_main = defineComponent({
	components: { UKbd: Kbd_default },
	inheritAttrs: false,
	props: {
		text: {
			type: String,
			default: null
		},
		prevent: {
			type: Boolean,
			default: false
		},
		shortcuts: {
			type: Array,
			default: () => []
		},
		openDelay: {
			type: Number,
			default: () => config.default.openDelay
		},
		closeDelay: {
			type: Number,
			default: () => config.default.closeDelay
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
	setup(props) {
		const { ui, attrs } = useUI("tooltip", toRef(props, "ui"), config, toRef(props, "class"));
		const popper = computed(() => defu({}, props.popper, ui.value.popper));
		const [trigger, container] = usePopper(popper.value);
		const open = ref(false);
		let openTimeout = null;
		let closeTimeout = null;
		const isVisible = computed(() => !!(useSlots().text || props.text));
		function onMouseEnter() {
			if (closeTimeout) {
				clearTimeout(closeTimeout);
				closeTimeout = null;
			}
			if (open.value) return;
			openTimeout = openTimeout || setTimeout(() => {
				open.value = true;
				openTimeout = null;
			}, props.openDelay);
		}
		function onMouseLeave() {
			if (openTimeout) {
				clearTimeout(openTimeout);
				openTimeout = null;
			}
			if (!open.value) return;
			closeTimeout = closeTimeout || setTimeout(() => {
				open.value = false;
				closeTimeout = null;
			}, props.closeDelay);
		}
		return {
			ui,
			attrs,
			popper,
			trigger,
			container,
			open,
			onMouseEnter,
			onMouseLeave,
			isVisible
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_UKbd = Kbd_default;
	_push(`<div${ssrRenderAttrs(mergeProps({
		ref: "trigger",
		class: _ctx.ui.wrapper
	}, _ctx.attrs, _attrs))}>`);
	ssrRenderSlot(_ctx.$slots, "default", { open: _ctx.open }, () => {
		_push(` Hover `);
	}, _push, _parent);
	if (_ctx.open && !_ctx.prevent && _ctx.isVisible) {
		_push(`<div class="${ssrRenderClass([_ctx.ui.container, _ctx.ui.width])}"><template><div>`);
		if (_ctx.popper.arrow) _push(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.ui.arrow))}"></div>`);
		else _push(`<!---->`);
		_push(`<div class="${ssrRenderClass([
			_ctx.ui.base,
			_ctx.ui.background,
			_ctx.ui.color,
			_ctx.ui.rounded,
			_ctx.ui.shadow,
			_ctx.ui.ring
		])}">`);
		ssrRenderSlot(_ctx.$slots, "text", {}, () => {
			_push(`${ssrInterpolate(_ctx.text)}`);
		}, _push, _parent);
		if (_ctx.shortcuts?.length) {
			_push(`<span class="${ssrRenderClass(_ctx.ui.shortcuts)}"><span class="${ssrRenderClass(_ctx.ui.middot)}">·</span><!--[-->`);
			ssrRenderList(_ctx.shortcuts, (shortcut) => {
				_push(ssrRenderComponent(_component_UKbd, {
					key: shortcut,
					size: "xs"
				}, {
					default: withCtx((_, _push$1, _parent$1, _scopeId) => {
						if (_push$1) _push$1(`${ssrInterpolate(shortcut)}`);
						else return [createTextVNode(toDisplayString(shortcut), 1)];
					}),
					_: 2
				}, _parent));
			});
			_push(`<!--]--></span>`);
		} else _push(`<!---->`);
		_push(`</div></div></template></div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/overlays/Tooltip.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Tooltip_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Tooltip_default as default };

//# sourceMappingURL=Tooltip-eZfphyc4.js.map