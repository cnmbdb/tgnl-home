import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, o as getULinkProps, r as mergeConfig } from "../server.mjs";
import "./components-D5RLOpR9.js";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import { W as useUI, p as verticalNavigation_default } from "./ui-G7Oicn0a.js";
import { t as Avatar_default } from "./Avatar-CBx6NXk5.js";
import { t as Link_default } from "./Link-xfGBFWPh.js";
import "./useButtonGroup-1gNuWR3y.js";
import { t as Badge_default } from "./Badge-NTFE8zPq.js";
import { t as Divider_default } from "./Divider-BOi8lZZz.js";
import { computed, createBlock, createCommentVNode, createTextVNode, defineComponent, mergeProps, openBlock, renderSlot, resolveComponent, toDisplayString, toRef, useSSRContext, withCtx } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.verticalNavigation, verticalNavigation_default);
var _sfc_main = defineComponent({
	components: {
		UIcon: Icon_default,
		UAvatar: Avatar_default,
		UBadge: Badge_default,
		ULink: Link_default,
		UDivider: Divider_default
	},
	inheritAttrs: false,
	props: {
		links: {
			type: Array,
			default: () => []
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
		const { ui, attrs } = useUI("verticalNavigation", toRef(props, "ui"), config, toRef(props, "class"));
		return {
			ui,
			attrs,
			sections: computed(() => Array.isArray(props.links[0]) ? props.links : [props.links]),
			getULinkProps,
			twMerge,
			twJoin
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_ULink = Link_default;
	const _component_UAvatar = Avatar_default;
	const _component_UIcon = Icon_default;
	const _component_UBadge = Badge_default;
	const _component_UDivider = Divider_default;
	_push(`<nav${ssrRenderAttrs(mergeProps({ class: _ctx.ui.wrapper }, _ctx.attrs, _attrs))}><!--[-->`);
	ssrRenderList(_ctx.sections, (section, sectionIndex) => {
		_push(`<ul><!--[-->`);
		ssrRenderList(section, (link, index) => {
			_push(`<li>`);
			_push(ssrRenderComponent(_component_ULink, mergeProps({ ref_for: true }, _ctx.getULinkProps(link), {
				class: [
					_ctx.ui.base,
					_ctx.ui.padding,
					_ctx.ui.width,
					_ctx.ui.ring,
					_ctx.ui.rounded,
					_ctx.ui.font,
					_ctx.ui.size
				],
				"active-class": _ctx.ui.active,
				"inactive-class": _ctx.ui.inactive,
				onClick: link.click,
				onKeyup: ($event) => $event.target.blur()
			}), {
				default: withCtx(({ isActive }, _push$1, _parent$1, _scopeId) => {
					if (_push$1) {
						ssrRenderSlot(_ctx.$slots, "avatar", {
							link,
							isActive
						}, () => {
							if (link.avatar) _push$1(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, {
								size: _ctx.ui.avatar.size,
								...link.avatar
							}, { class: [_ctx.ui.avatar.base] }), null, _parent$1, _scopeId));
							else _push$1(`<!---->`);
						}, _push$1, _parent$1, _scopeId);
						ssrRenderSlot(_ctx.$slots, "icon", {
							link,
							isActive
						}, () => {
							if (link.icon) _push$1(ssrRenderComponent(_component_UIcon, {
								name: link.icon,
								class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, isActive ? _ctx.ui.icon.active : _ctx.ui.icon.inactive), link.iconClass)
							}, null, _parent$1, _scopeId));
							else _push$1(`<!---->`);
						}, _push$1, _parent$1, _scopeId);
						ssrRenderSlot(_ctx.$slots, "default", {
							link,
							isActive
						}, () => {
							if (link.label) {
								_push$1(`<span class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.label, link.labelClass))}"${_scopeId}>`);
								if (isActive) _push$1(`<span class="sr-only"${_scopeId}> Current page: </span>`);
								else _push$1(`<!---->`);
								_push$1(` ${ssrInterpolate(link.label)}</span>`);
							} else _push$1(`<!---->`);
						}, _push$1, _parent$1, _scopeId);
						ssrRenderSlot(_ctx.$slots, "badge", {
							link,
							isActive
						}, () => {
							if (link.badge) _push$1(ssrRenderComponent(_component_UBadge, mergeProps({ ref_for: true }, {
								size: _ctx.ui.badge.size,
								color: _ctx.ui.badge.color,
								variant: _ctx.ui.badge.variant,
								...typeof link.badge === "string" || typeof link.badge === "number" ? { label: link.badge } : link.badge
							}, { class: _ctx.ui.badge.base }), null, _parent$1, _scopeId));
							else _push$1(`<!---->`);
						}, _push$1, _parent$1, _scopeId);
					} else return [
						renderSlot(_ctx.$slots, "avatar", {
							link,
							isActive
						}, () => [link.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
							key: 0,
							ref_for: true
						}, {
							size: _ctx.ui.avatar.size,
							...link.avatar
						}, { class: [_ctx.ui.avatar.base] }), null, 16, ["class"])) : createCommentVNode("", true)]),
						renderSlot(_ctx.$slots, "icon", {
							link,
							isActive
						}, () => [link.icon ? (openBlock(), createBlock(_component_UIcon, {
							key: 0,
							name: link.icon,
							class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, isActive ? _ctx.ui.icon.active : _ctx.ui.icon.inactive), link.iconClass)
						}, null, 8, ["name", "class"])) : createCommentVNode("", true)]),
						renderSlot(_ctx.$slots, "default", {
							link,
							isActive
						}, () => [link.label ? (openBlock(), createBlock("span", {
							key: 0,
							class: _ctx.twMerge(_ctx.ui.label, link.labelClass)
						}, [isActive ? (openBlock(), createBlock("span", {
							key: 0,
							class: "sr-only"
						}, " Current page: ")) : createCommentVNode("", true), createTextVNode(" " + toDisplayString(link.label), 1)], 2)) : createCommentVNode("", true)]),
						renderSlot(_ctx.$slots, "badge", {
							link,
							isActive
						}, () => [link.badge ? (openBlock(), createBlock(_component_UBadge, mergeProps({
							key: 0,
							ref_for: true
						}, {
							size: _ctx.ui.badge.size,
							color: _ctx.ui.badge.color,
							variant: _ctx.ui.badge.variant,
							...typeof link.badge === "string" || typeof link.badge === "number" ? { label: link.badge } : link.badge
						}, { class: _ctx.ui.badge.base }), null, 16, ["class"])) : createCommentVNode("", true)])
					];
				}),
				_: 2
			}, _parent));
			_push(`</li>`);
		});
		_push(`<!--]-->`);
		if (sectionIndex < _ctx.sections.length - 1) _push(ssrRenderComponent(_component_UDivider, { ui: _ctx.ui.divider }, null, _parent));
		else _push(`<!---->`);
		_push(`</ul>`);
	});
	_push(`<!--]--></nav>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/navigation/VerticalNavigation.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var VerticalNavigation_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { VerticalNavigation_default as default };

//# sourceMappingURL=VerticalNavigation-DjrjXQl5.js.map