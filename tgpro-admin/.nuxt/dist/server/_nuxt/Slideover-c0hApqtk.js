import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { W as useUI, o as slideover_default } from "./ui-G7Oicn0a.js";
import "./micro-task-CYdHJ3PN.js";
import "./active-element-history-DJ1NL7os.js";
import { u as s } from "./keyboard-CvjRf4Wb.js";
import "./focus-management-DFaZHIRF.js";
import "./use-outside-click-B4rja7ys.js";
import "./hidden-Bsn3DsxF.js";
import "./open-closed-Dsm1EOia.js";
import "./portal-BLTG7ywv.js";
import { i as Ye, n as he, r as Ge, t as Se } from "./transition-CG5tIsRm.js";
import "./description-Y4p4EFv6.js";
import { computed, createBlock, createCommentVNode, createVNode, defineComponent, mergeProps, openBlock, renderSlot, resolveComponent, toRef, useId, useSSRContext, withCtx } from "vue";
import { ssrRenderClass, ssrRenderComponent, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.slideover, slideover_default);
var _sfc_main = defineComponent({
	components: {
		HDialog: Ye,
		HDialogPanel: Ge,
		TransitionRoot: Se,
		TransitionChild: he
	},
	inheritAttrs: false,
	props: {
		modelValue: {
			type: Boolean,
			default: false
		},
		appear: {
			type: Boolean,
			default: false
		},
		side: {
			type: String,
			default: "right",
			validator: (value) => [
				"left",
				"right",
				"top",
				"bottom"
			].includes(value)
		},
		overlay: {
			type: Boolean,
			default: true
		},
		transition: {
			type: Boolean,
			default: true
		},
		preventClose: {
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
	emits: [
		"update:modelValue",
		"close",
		"close-prevented",
		"after-leave"
	],
	setup(props, { emit }) {
		const { ui, attrs } = useUI("slideover", toRef(props, "ui"), config, toRef(props, "class"));
		const isOpen = computed({
			get() {
				return props.modelValue;
			},
			set(value) {
				emit("update:modelValue", value);
			}
		});
		const transitionClass = computed(() => {
			if (!props.transition) return {};
			let enterFrom, leaveTo;
			switch (props.side) {
				case "left":
					enterFrom = ui.value.translate.left;
					leaveTo = ui.value.translate.left;
					break;
				case "right":
					enterFrom = ui.value.translate.right;
					leaveTo = ui.value.translate.right;
					break;
				case "top":
					enterFrom = ui.value.translate.top;
					leaveTo = ui.value.translate.top;
					break;
				case "bottom":
					enterFrom = ui.value.translate.bottom;
					leaveTo = ui.value.translate.bottom;
					break;
				default:
					enterFrom = ui.value.translate.right;
					leaveTo = ui.value.translate.right;
			}
			return {
				...ui.value.transition,
				enterFrom,
				enterTo: ui.value.translate.base,
				leaveFrom: ui.value.translate.base,
				leaveTo
			};
		});
		const sideType = computed(() => {
			switch (props.side) {
				case "left": return "horizontal";
				case "right": return "horizontal";
				case "top": return "vertical";
				case "bottom": return "vertical";
				default: return "right";
			}
		});
		function close(value) {
			if (props.preventClose) {
				emit("close-prevented");
				return;
			}
			isOpen.value = value;
			emit("close");
		}
		const onAfterLeave = () => {
			emit("after-leave");
		};
		s(() => useId());
		return {
			ui,
			attrs,
			isOpen,
			transitionClass,
			sideType,
			onAfterLeave,
			close
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_TransitionRoot = resolveComponent("TransitionRoot");
	const _component_HDialog = resolveComponent("HDialog");
	const _component_TransitionChild = resolveComponent("TransitionChild");
	const _component_HDialogPanel = resolveComponent("HDialogPanel");
	_push(ssrRenderComponent(_component_TransitionRoot, mergeProps({
		as: "template",
		appear: _ctx.appear,
		show: _ctx.isOpen,
		onAfterLeave: _ctx.onAfterLeave
	}, _attrs), {
		default: withCtx((_, _push$1, _parent$1, _scopeId) => {
			if (_push$1) _push$1(ssrRenderComponent(_component_HDialog, mergeProps({ class: [
				_ctx.ui.wrapper,
				{ "justify-end": _ctx.side === "right" },
				{ "items-end": _ctx.side === "bottom" }
			] }, _ctx.attrs, { onClose: _ctx.close }), {
				default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
					if (_push$2) {
						if (_ctx.overlay) _push$2(ssrRenderComponent(_component_TransitionChild, mergeProps({
							as: "template",
							appear: _ctx.appear
						}, _ctx.ui.overlay.transition, { class: _ctx.ui.overlay.transition.enterFrom }), {
							default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
								if (_push$3) _push$3(`<div class="${ssrRenderClass([_ctx.ui.overlay.base, _ctx.ui.overlay.background])}"${_scopeId$2}></div>`);
								else return [createVNode("div", { class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background] }, null, 2)];
							}),
							_: 1
						}, _parent$2, _scopeId$1));
						else _push$2(`<!---->`);
						_push$2(ssrRenderComponent(_component_TransitionChild, mergeProps({
							as: "template",
							appear: _ctx.appear
						}, _ctx.transitionClass, { class: _ctx.transitionClass.enterFrom }), {
							default: withCtx((_$2, _push$3, _parent$3, _scopeId$2) => {
								if (_push$3) _push$3(ssrRenderComponent(_component_HDialogPanel, { class: [
									_ctx.ui.base,
									_ctx.sideType === "horizontal" ? [_ctx.ui.width, "h-full"] : [_ctx.ui.height, "w-full"],
									_ctx.ui.background,
									_ctx.ui.ring,
									_ctx.ui.rounded,
									_ctx.ui.padding,
									_ctx.ui.shadow
								] }, {
									default: withCtx((_$3, _push$4, _parent$4, _scopeId$3) => {
										if (_push$4) ssrRenderSlot(_ctx.$slots, "default", {}, null, _push$4, _parent$4, _scopeId$3);
										else return [renderSlot(_ctx.$slots, "default")];
									}),
									_: 3
								}, _parent$3, _scopeId$2));
								else return [createVNode(_component_HDialogPanel, { class: [
									_ctx.ui.base,
									_ctx.sideType === "horizontal" ? [_ctx.ui.width, "h-full"] : [_ctx.ui.height, "w-full"],
									_ctx.ui.background,
									_ctx.ui.ring,
									_ctx.ui.rounded,
									_ctx.ui.padding,
									_ctx.ui.shadow
								] }, {
									default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
									_: 3
								}, 8, ["class"])];
							}),
							_: 3
						}, _parent$2, _scopeId$1));
					} else return [_ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
						key: 0,
						as: "template",
						appear: _ctx.appear
					}, _ctx.ui.overlay.transition, { class: _ctx.ui.overlay.transition.enterFrom }), {
						default: withCtx(() => [createVNode("div", { class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background] }, null, 2)]),
						_: 1
					}, 16, ["appear", "class"])) : createCommentVNode("", true), createVNode(_component_TransitionChild, mergeProps({
						as: "template",
						appear: _ctx.appear
					}, _ctx.transitionClass, { class: _ctx.transitionClass.enterFrom }), {
						default: withCtx(() => [createVNode(_component_HDialogPanel, { class: [
							_ctx.ui.base,
							_ctx.sideType === "horizontal" ? [_ctx.ui.width, "h-full"] : [_ctx.ui.height, "w-full"],
							_ctx.ui.background,
							_ctx.ui.ring,
							_ctx.ui.rounded,
							_ctx.ui.padding,
							_ctx.ui.shadow
						] }, {
							default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
							_: 3
						}, 8, ["class"])]),
						_: 3
					}, 16, ["appear", "class"])];
				}),
				_: 3
			}, _parent$1, _scopeId));
			else return [createVNode(_component_HDialog, mergeProps({ class: [
				_ctx.ui.wrapper,
				{ "justify-end": _ctx.side === "right" },
				{ "items-end": _ctx.side === "bottom" }
			] }, _ctx.attrs, { onClose: _ctx.close }), {
				default: withCtx(() => [_ctx.overlay ? (openBlock(), createBlock(_component_TransitionChild, mergeProps({
					key: 0,
					as: "template",
					appear: _ctx.appear
				}, _ctx.ui.overlay.transition, { class: _ctx.ui.overlay.transition.enterFrom }), {
					default: withCtx(() => [createVNode("div", { class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background] }, null, 2)]),
					_: 1
				}, 16, ["appear", "class"])) : createCommentVNode("", true), createVNode(_component_TransitionChild, mergeProps({
					as: "template",
					appear: _ctx.appear
				}, _ctx.transitionClass, { class: _ctx.transitionClass.enterFrom }), {
					default: withCtx(() => [createVNode(_component_HDialogPanel, { class: [
						_ctx.ui.base,
						_ctx.sideType === "horizontal" ? [_ctx.ui.width, "h-full"] : [_ctx.ui.height, "w-full"],
						_ctx.ui.background,
						_ctx.ui.ring,
						_ctx.ui.rounded,
						_ctx.ui.padding,
						_ctx.ui.shadow
					] }, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
						_: 3
					}, 8, ["class"])]),
					_: 3
				}, 16, ["appear", "class"])]),
				_: 3
			}, 16, ["class", "onClose"])];
		}),
		_: 3
	}, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/overlays/Slideover.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Slideover_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Slideover_default as default };

//# sourceMappingURL=Slideover-c0hApqtk.js.map