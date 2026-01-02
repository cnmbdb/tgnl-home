import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, o as getULinkProps, r as mergeConfig } from "../server.mjs";
import "./components-D5RLOpR9.js";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import { W as useUI, c as breadcrumb_default } from "./ui-G7Oicn0a.js";
import { t as Link_default } from "./Link-xfGBFWPh.js";
import { createBlock, createCommentVNode, defineComponent, mergeProps, openBlock, renderSlot, resolveComponent, toDisplayString, toRef, useSSRContext, withCtx } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.breadcrumb, breadcrumb_default);
var _sfc_main = defineComponent({
	components: {
		UIcon: Icon_default,
		ULink: Link_default
	},
	inheritAttrs: false,
	props: {
		links: {
			type: Array,
			default: () => []
		},
		divider: {
			type: String,
			default: () => config.default.divider
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
		const { ui, attrs } = useUI("breadcrumb", toRef(props, "ui"), config, toRef(props, "class"));
		return {
			ui,
			attrs,
			getULinkProps,
			twMerge,
			twJoin
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_ULink = Link_default;
	const _component_UIcon = Icon_default;
	_push(`<nav${ssrRenderAttrs(mergeProps({
		"aria-label": "Breadcrumb",
		class: _ctx.ui.wrapper
	}, _ctx.attrs, _attrs))}><ol class="${ssrRenderClass(_ctx.ui.ol)}"><!--[-->`);
	ssrRenderList(_ctx.links, (link, index) => {
		_push(`<li class="${ssrRenderClass(_ctx.ui.li)}">`);
		_push(ssrRenderComponent(_component_ULink, mergeProps({
			as: "span",
			class: [_ctx.ui.base, index === _ctx.links.length - 1 ? _ctx.ui.active : !!link.to ? _ctx.ui.inactive : ""],
			"aria-current": index === _ctx.links.length - 1 ? "page" : void 0
		}, { ref_for: true }, _ctx.getULinkProps(link), { onClick: link.click }), {
			default: withCtx((_, _push$1, _parent$1, _scopeId) => {
				if (_push$1) {
					ssrRenderSlot(_ctx.$slots, "icon", {
						link,
						index,
						isActive: index === _ctx.links.length - 1
					}, () => {
						if (link.icon) _push$1(ssrRenderComponent(_component_UIcon, {
							name: link.icon,
							class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, index === _ctx.links.length - 1 ? _ctx.ui.icon.active : !!link.to ? _ctx.ui.icon.inactive : ""), link.iconClass)
						}, null, _parent$1, _scopeId));
						else _push$1(`<!---->`);
					}, _push$1, _parent$1, _scopeId);
					ssrRenderSlot(_ctx.$slots, "default", {
						link,
						index,
						isActive: index === _ctx.links.length - 1
					}, () => {
						if (link.label) _push$1(`<span class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.label, link.labelClass))}"${_scopeId}>${ssrInterpolate(link.label)}</span>`);
						else _push$1(`<!---->`);
					}, _push$1, _parent$1, _scopeId);
				} else return [renderSlot(_ctx.$slots, "icon", {
					link,
					index,
					isActive: index === _ctx.links.length - 1
				}, () => [link.icon ? (openBlock(), createBlock(_component_UIcon, {
					key: 0,
					name: link.icon,
					class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.icon.base, index === _ctx.links.length - 1 ? _ctx.ui.icon.active : !!link.to ? _ctx.ui.icon.inactive : ""), link.iconClass)
				}, null, 8, ["name", "class"])) : createCommentVNode("", true)]), renderSlot(_ctx.$slots, "default", {
					link,
					index,
					isActive: index === _ctx.links.length - 1
				}, () => [link.label ? (openBlock(), createBlock("span", {
					key: 0,
					class: _ctx.twMerge(_ctx.ui.label, link.labelClass)
				}, toDisplayString(link.label), 3)) : createCommentVNode("", true)])];
			}),
			_: 2
		}, _parent));
		if (index < _ctx.links.length - 1) ssrRenderSlot(_ctx.$slots, "divider", {}, () => {
			if (_ctx.divider) {
				_push(`<!--[-->`);
				if (_ctx.divider.startsWith("i-")) _push(ssrRenderComponent(_component_UIcon, {
					name: _ctx.divider,
					class: _ctx.ui.divider.base,
					role: "presentation"
				}, null, _parent));
				else _push(`<span role="presentation">${ssrInterpolate(_ctx.divider)}</span>`);
				_push(`<!--]-->`);
			} else _push(`<!---->`);
		}, _push, _parent);
		else _push(`<!---->`);
		_push(`</li>`);
	});
	_push(`<!--]--></ol></nav>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/navigation/Breadcrumb.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Breadcrumb_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Breadcrumb_default as default };

//# sourceMappingURL=Breadcrumb-Cag7lz-w.js.map