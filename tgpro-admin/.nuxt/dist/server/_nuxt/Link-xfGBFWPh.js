import { f as nuxt_link_default, s as nuxtLinkProps } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { createVNode, defineComponent, mergeProps, renderSlot, resolveComponent, resolveDynamicComponent, useSSRContext, withCtx } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderSlot, ssrRenderVNode } from "vue/server-renderer";
import { diff, isEqual } from "ohash/utils";
var _sfc_main = defineComponent({
	inheritAttrs: false,
	props: {
		...nuxtLinkProps,
		as: {
			type: String,
			default: "button"
		},
		type: {
			type: String,
			default: "button"
		},
		disabled: {
			type: Boolean,
			default: null
		},
		active: {
			type: Boolean,
			default: void 0
		},
		exact: {
			type: Boolean,
			default: false
		},
		exactQuery: {
			type: [Boolean, String],
			default: false
		},
		exactHash: {
			type: Boolean,
			default: false
		},
		inactiveClass: {
			type: String,
			default: void 0
		}
	},
	setup(props) {
		function isPartiallyEqual(item1, item2) {
			const diffedKeys = diff(item1, item2).reduce((filtered, q) => {
				if (q.type === "added") filtered.add(q.key);
				return filtered;
			}, /* @__PURE__ */ new Set());
			return isEqual(Object.fromEntries(Object.entries(item1).filter(([key]) => !diffedKeys.has(key))), Object.fromEntries(Object.entries(item2).filter(([key]) => !diffedKeys.has(key))));
		}
		function resolveLinkClass(route, $route, { isActive, isExactActive }) {
			if (props.exactQuery === "partial") {
				if (!isPartiallyEqual(route.query, $route.query)) return props.inactiveClass;
			} else if (props.exactQuery === true) {
				if (!isEqual(route.query, $route.query)) return props.inactiveClass;
			}
			if (props.exactHash && route.hash !== $route.hash) return props.inactiveClass;
			if (props.exact && isExactActive) return props.activeClass;
			if (!props.exact && isActive) return props.activeClass;
			return props.inactiveClass;
		}
		return { resolveLinkClass };
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_NuxtLink = nuxt_link_default;
	if (!_ctx.to) ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({
		type: _ctx.type,
		disabled: _ctx.disabled
	}, _ctx.$attrs, { class: _ctx.active ? _ctx.activeClass : _ctx.inactiveClass }, _attrs), {
		default: withCtx((_, _push$1, _parent$1, _scopeId) => {
			if (_push$1) ssrRenderSlot(_ctx.$slots, "default", { isActive: _ctx.active }, null, _push$1, _parent$1, _scopeId);
			else return [renderSlot(_ctx.$slots, "default", { isActive: _ctx.active })];
		}),
		_: 3
	}), _parent);
	else _push(ssrRenderComponent(_component_NuxtLink, mergeProps(_ctx.$props, { custom: "" }, _attrs), {
		default: withCtx(({ route, href, target, rel, navigate, isActive, isExactActive, isExternal }, _push$1, _parent$1, _scopeId) => {
			if (_push$1) {
				_push$1(`<a${ssrRenderAttrs(mergeProps(_ctx.$attrs, {
					href: !_ctx.disabled ? href : void 0,
					"aria-disabled": _ctx.disabled ? "true" : void 0,
					role: _ctx.disabled ? "link" : void 0,
					rel,
					target,
					class: _ctx.active !== void 0 ? _ctx.active ? _ctx.activeClass : _ctx.inactiveClass : _ctx.resolveLinkClass(route, _ctx.$route, {
						isActive,
						isExactActive
					}),
					tabindex: _ctx.disabled ? -1 : void 0
				}))}${_scopeId}>`);
				ssrRenderSlot(_ctx.$slots, "default", { isActive: _ctx.active !== void 0 ? _ctx.active : _ctx.exact ? isExactActive : isActive }, null, _push$1, _parent$1, _scopeId);
				_push$1(`</a>`);
			} else return [createVNode("a", mergeProps(_ctx.$attrs, {
				href: !_ctx.disabled ? href : void 0,
				"aria-disabled": _ctx.disabled ? "true" : void 0,
				role: _ctx.disabled ? "link" : void 0,
				rel,
				target,
				class: _ctx.active !== void 0 ? _ctx.active ? _ctx.activeClass : _ctx.inactiveClass : _ctx.resolveLinkClass(route, _ctx.$route, {
					isActive,
					isExactActive
				}),
				tabindex: _ctx.disabled ? -1 : void 0,
				onClick: (e) => !isExternal && !_ctx.disabled && navigate(e)
			}), [renderSlot(_ctx.$slots, "default", { isActive: _ctx.active !== void 0 ? _ctx.active : _ctx.exact ? isExactActive : isActive })], 16, [
				"href",
				"aria-disabled",
				"role",
				"rel",
				"target",
				"tabindex",
				"onClick"
			])];
		}),
		_: 3
	}, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Link.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Link_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Link_default as t };

//# sourceMappingURL=Link-xfGBFWPh.js.map