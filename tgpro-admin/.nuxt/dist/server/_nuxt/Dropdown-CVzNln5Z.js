import { a as getNuxtLinkProps, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, f as nuxt_link_default, i as twMerge, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import { I as dropdown_default, W as useUI } from "./ui-G7Oicn0a.js";
import { t as Avatar_default } from "./Avatar-CBx6NXk5.js";
import { t as Kbd_default } from "./Kbd-DfgTbPkH.js";
import { c as o$1, i as N$1, l as i, n as A, s as u$1, t as o, u as s } from "./keyboard-CvjRf4Wb.js";
import { c as h$1, l as v, n as N, r as O, s as _, u as w$1 } from "./focus-management-DFaZHIRF.js";
import { t as w } from "./use-outside-click-B4rja7ys.js";
import { t as s$1 } from "./use-resolve-button-type-eioNRL5V.js";
import { i as u, n as f, r as i$1, t as c } from "./calculate-active-index-B5ynhl2N.js";
import { i as t, n as l, t as i$2 } from "./open-closed-Dsm1EOia.js";
import { t as p } from "./use-text-value-BRFxtlLF.js";
import { t as usePopper } from "./usePopper-CMZCG_Qh.js";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, inject, mergeProps, nextTick, openBlock, provide, ref, renderList, renderSlot, resolveComponent, resolveDynamicComponent, toDisplayString, toRef, useId, useSSRContext, watch, watchEffect, withCtx } from "vue";
import { defu } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/defu/dist/defu.mjs";
import { twJoin } from "tailwind-merge";
import { ssrIncludeBooleanAttr, ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle, ssrRenderVNode } from "vue/server-renderer";
var Z = ((i$3) => (i$3[i$3.Open = 0] = "Open", i$3[i$3.Closed = 1] = "Closed", i$3))(Z || {}), ee = ((i$3) => (i$3[i$3.Pointer = 0] = "Pointer", i$3[i$3.Other = 1] = "Other", i$3))(ee || {});
function te(o$2) {
	requestAnimationFrame(() => requestAnimationFrame(o$2));
}
var A$1 = Symbol("MenuContext");
function O$1(o$2) {
	let M = inject(A$1, null);
	if (M === null) {
		let i$3 = /* @__PURE__ */ new Error(`<${o$2} /> is missing a parent <Menu /> component.`);
		throw Error.captureStackTrace && Error.captureStackTrace(i$3, O$1), i$3;
	}
	return M;
}
var ge = defineComponent({
	name: "Menu",
	props: { as: {
		type: [Object, String],
		default: "template"
	} },
	setup(o$2, { slots: M, attrs: i$3 }) {
		let I = ref(1), p$1 = ref(null), e = ref(null), r = ref([]), f$1 = ref(""), d = ref(null), g = ref(1);
		function b(t$1 = (a$1) => a$1) {
			let a = d.value !== null ? r.value[d.value] : null, n = O(t$1(r.value.slice()), (v$1) => o$1(v$1.dataRef.domRef)), s$2 = a ? n.indexOf(a) : null;
			return s$2 === -1 && (s$2 = null), {
				items: n,
				activeItemIndex: s$2
			};
		}
		let l$1 = {
			menuState: I,
			buttonRef: p$1,
			itemsRef: e,
			items: r,
			searchQuery: f$1,
			activeItemIndex: d,
			activationTrigger: g,
			closeMenu: () => {
				I.value = 1, d.value = null;
			},
			openMenu: () => I.value = 0,
			goToItem(t$1, a, n) {
				let s$2 = b(), v$1 = f(t$1 === c.Specific ? {
					focus: c.Specific,
					id: a
				} : { focus: t$1 }, {
					resolveItems: () => s$2.items,
					resolveActiveIndex: () => s$2.activeItemIndex,
					resolveId: (u$2) => u$2.id,
					resolveDisabled: (u$2) => u$2.dataRef.disabled
				});
				f$1.value = "", d.value = v$1, g.value = n != null ? n : 1, r.value = s$2.items;
			},
			search(t$1) {
				let n = f$1.value !== "" ? 0 : 1;
				f$1.value += t$1.toLowerCase();
				let v$1 = (d.value !== null ? r.value.slice(d.value + n).concat(r.value.slice(0, d.value + n)) : r.value).find((h$2) => h$2.dataRef.textValue.startsWith(f$1.value) && !h$2.dataRef.disabled), u$2 = v$1 ? r.value.indexOf(v$1) : -1;
				u$2 === -1 || u$2 === d.value || (d.value = u$2, g.value = 1);
			},
			clearSearch() {
				f$1.value = "";
			},
			registerItem(t$1, a) {
				let n = b((s$2) => [...s$2, {
					id: t$1,
					dataRef: a
				}]);
				r.value = n.items, d.value = n.activeItemIndex, g.value = 1;
			},
			unregisterItem(t$1) {
				let a = b((n) => {
					let s$2 = n.findIndex((v$1) => v$1.id === t$1);
					return s$2 !== -1 && n.splice(s$2, 1), n;
				});
				r.value = a.items, d.value = a.activeItemIndex, g.value = 1;
			}
		};
		return w([p$1, e], (t$1, a) => {
			var n;
			l$1.closeMenu(), w$1(a, h$1.Loose) || (t$1.preventDefault(), (n = o$1(p$1)) == null || n.focus());
		}, computed(() => I.value === 0)), provide(A$1, l$1), t(computed(() => u$1(I.value, {
			[0]: i$2.Open,
			[1]: i$2.Closed
		}))), () => {
			return A({
				ourProps: {},
				theirProps: o$2,
				slot: {
					open: I.value === 0,
					close: l$1.closeMenu
				},
				slots: M,
				attrs: i$3,
				name: "Menu"
			});
		};
	}
}), Se = defineComponent({
	name: "MenuButton",
	props: {
		disabled: {
			type: Boolean,
			default: !1
		},
		as: {
			type: [Object, String],
			default: "button"
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(o$2, { attrs: M, slots: i$3, expose: I }) {
		var b;
		let p$1 = (b = o$2.id) != null ? b : `headlessui-menu-button-${i()}`, e = O$1("MenuButton");
		I({
			el: e.buttonRef,
			$el: e.buttonRef
		});
		function r(l$1) {
			switch (l$1.key) {
				case o.Space:
				case o.Enter:
				case o.ArrowDown:
					l$1.preventDefault(), l$1.stopPropagation(), e.openMenu(), nextTick(() => {
						var t$1;
						(t$1 = o$1(e.itemsRef)) == null || t$1.focus({ preventScroll: !0 }), e.goToItem(c.First);
					});
					break;
				case o.ArrowUp:
					l$1.preventDefault(), l$1.stopPropagation(), e.openMenu(), nextTick(() => {
						var t$1;
						(t$1 = o$1(e.itemsRef)) == null || t$1.focus({ preventScroll: !0 }), e.goToItem(c.Last);
					});
					break;
			}
		}
		function f$1(l$1) {
			switch (l$1.key) {
				case o.Space:
					l$1.preventDefault();
					break;
			}
		}
		function d(l$1) {
			o$2.disabled || (e.menuState.value === 0 ? (e.closeMenu(), nextTick(() => {
				var t$1;
				return (t$1 = o$1(e.buttonRef)) == null ? void 0 : t$1.focus({ preventScroll: !0 });
			})) : (l$1.preventDefault(), e.openMenu(), te(() => {
				var t$1;
				return (t$1 = o$1(e.itemsRef)) == null ? void 0 : t$1.focus({ preventScroll: !0 });
			})));
		}
		let g = s$1(computed(() => ({
			as: o$2.as,
			type: M.type
		})), e.buttonRef);
		return () => {
			var n;
			let l$1 = { open: e.menuState.value === 0 }, { ...t$1 } = o$2;
			return A({
				ourProps: {
					ref: e.buttonRef,
					id: p$1,
					type: g.value,
					"aria-haspopup": "menu",
					"aria-controls": (n = o$1(e.itemsRef)) == null ? void 0 : n.id,
					"aria-expanded": e.menuState.value === 0,
					onKeydown: r,
					onKeyup: f$1,
					onClick: d
				},
				theirProps: t$1,
				slot: l$1,
				attrs: M,
				slots: i$3,
				name: "MenuButton"
			});
		};
	}
}), Me = defineComponent({
	name: "MenuItems",
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		static: {
			type: Boolean,
			default: !1
		},
		unmount: {
			type: Boolean,
			default: !0
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(o$2, { attrs: M, slots: i$3, expose: I }) {
		var l$1;
		let p$1 = (l$1 = o$2.id) != null ? l$1 : `headlessui-menu-items-${i()}`, e = O$1("MenuItems"), r = ref(null);
		I({
			el: e.itemsRef,
			$el: e.itemsRef
		}), i$1({
			container: computed(() => o$1(e.itemsRef)),
			enabled: computed(() => e.menuState.value === 0),
			accept(t$1) {
				return t$1.getAttribute("role") === "menuitem" ? NodeFilter.FILTER_REJECT : t$1.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
			},
			walk(t$1) {
				t$1.setAttribute("role", "none");
			}
		});
		function f$1(t$1) {
			var a;
			switch (r.value && clearTimeout(r.value), t$1.key) {
				case o.Space: if (e.searchQuery.value !== "") return t$1.preventDefault(), t$1.stopPropagation(), e.search(t$1.key);
				case o.Enter:
					if (t$1.preventDefault(), t$1.stopPropagation(), e.activeItemIndex.value !== null) {
						let s$2 = e.items.value[e.activeItemIndex.value];
						(a = o$1(s$2.dataRef.domRef)) == null || a.click();
					}
					e.closeMenu(), _(o$1(e.buttonRef));
					break;
				case o.ArrowDown: return t$1.preventDefault(), t$1.stopPropagation(), e.goToItem(c.Next);
				case o.ArrowUp: return t$1.preventDefault(), t$1.stopPropagation(), e.goToItem(c.Previous);
				case o.Home:
				case o.PageUp: return t$1.preventDefault(), t$1.stopPropagation(), e.goToItem(c.First);
				case o.End:
				case o.PageDown: return t$1.preventDefault(), t$1.stopPropagation(), e.goToItem(c.Last);
				case o.Escape:
					t$1.preventDefault(), t$1.stopPropagation(), e.closeMenu(), nextTick(() => {
						var n;
						return (n = o$1(e.buttonRef)) == null ? void 0 : n.focus({ preventScroll: !0 });
					});
					break;
				case o.Tab:
					t$1.preventDefault(), t$1.stopPropagation(), e.closeMenu(), nextTick(() => v(o$1(e.buttonRef), t$1.shiftKey ? N.Previous : N.Next));
					break;
				default:
					t$1.key.length === 1 && (e.search(t$1.key), r.value = setTimeout(() => e.clearSearch(), 350));
					break;
			}
		}
		function d(t$1) {
			switch (t$1.key) {
				case o.Space:
					t$1.preventDefault();
					break;
			}
		}
		let g = l(), b = computed(() => g !== null ? (g.value & i$2.Open) === i$2.Open : e.menuState.value === 0);
		return () => {
			var s$2, v$1;
			let t$1 = { open: e.menuState.value === 0 }, { ...a } = o$2;
			return A({
				ourProps: {
					"aria-activedescendant": e.activeItemIndex.value === null || (s$2 = e.items.value[e.activeItemIndex.value]) == null ? void 0 : s$2.id,
					"aria-labelledby": (v$1 = o$1(e.buttonRef)) == null ? void 0 : v$1.id,
					id: p$1,
					onKeydown: f$1,
					onKeyup: d,
					role: "menu",
					tabIndex: 0,
					ref: e.itemsRef
				},
				theirProps: a,
				slot: t$1,
				attrs: M,
				slots: i$3,
				features: N$1.RenderStrategy | N$1.Static,
				visible: b.value,
				name: "MenuItems"
			});
		};
	}
}), be = defineComponent({
	name: "MenuItem",
	inheritAttrs: !1,
	props: {
		as: {
			type: [Object, String],
			default: "template"
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(o$2, { slots: M, attrs: i$3, expose: I }) {
		var v$1;
		let p$1 = (v$1 = o$2.id) != null ? v$1 : `headlessui-menu-item-${i()}`, e = O$1("MenuItem"), r = ref(null);
		I({
			el: r,
			$el: r
		});
		let f$1 = computed(() => e.activeItemIndex.value !== null ? e.items.value[e.activeItemIndex.value].id === p$1 : !1), d = p(r);
		computed(() => ({
			disabled: o$2.disabled,
			get textValue() {
				return d();
			},
			domRef: r
		}));
		watchEffect(() => {
			e.menuState.value === 0 && f$1.value && e.activationTrigger.value !== 0 && nextTick(() => {
				var u$2, h$2;
				return (h$2 = (u$2 = o$1(r)) == null ? void 0 : u$2.scrollIntoView) == null ? void 0 : h$2.call(u$2, { block: "nearest" });
			});
		});
		function b(u$2) {
			if (o$2.disabled) return u$2.preventDefault();
			e.closeMenu(), _(o$1(e.buttonRef));
		}
		function l$1() {
			if (o$2.disabled) return e.goToItem(c.Nothing);
			e.goToItem(c.Specific, p$1);
		}
		let t$1 = u();
		function a(u$2) {
			t$1.update(u$2);
		}
		function n(u$2) {
			t$1.wasMoved(u$2) && (o$2.disabled || f$1.value || e.goToItem(c.Specific, p$1, 0));
		}
		function s$2(u$2) {
			t$1.wasMoved(u$2) && (o$2.disabled || f$1.value && e.goToItem(c.Nothing));
		}
		return () => {
			let { disabled: u$2,...h$2 } = o$2, C = {
				active: f$1.value,
				disabled: u$2,
				close: e.closeMenu
			};
			return A({
				ourProps: {
					id: p$1,
					ref: r,
					role: "menuitem",
					tabIndex: u$2 === !0 ? void 0 : -1,
					"aria-disabled": u$2 === !0 ? !0 : void 0,
					onClick: b,
					onFocus: l$1,
					onPointerenter: a,
					onMouseenter: a,
					onPointermove: n,
					onMousemove: n,
					onPointerleave: s$2,
					onMouseleave: s$2
				},
				theirProps: {
					...i$3,
					...h$2
				},
				slot: C,
				attrs: i$3,
				slots: M,
				name: "MenuItem"
			});
		};
	}
});
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.dropdown, dropdown_default);
var _sfc_main = defineComponent({
	components: {
		HMenu: ge,
		HMenuButton: Se,
		HMenuItems: Me,
		HMenuItem: be,
		UIcon: Icon_default,
		UAvatar: Avatar_default,
		UKbd: Kbd_default
	},
	inheritAttrs: false,
	props: {
		items: {
			type: Array,
			default: () => []
		},
		mode: {
			type: String,
			default: "click",
			validator: (value) => ["click", "hover"].includes(value)
		},
		open: {
			type: Boolean,
			default: void 0
		},
		disabled: {
			type: Boolean,
			default: false
		},
		popper: {
			type: Object,
			default: () => ({})
		},
		openDelay: {
			type: Number,
			default: () => config.default.openDelay
		},
		closeDelay: {
			type: Number,
			default: () => config.default.closeDelay
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
	emits: ["update:open"],
	setup(props, { emit }) {
		const { ui, attrs } = useUI("dropdown", toRef(props, "ui"), config, toRef(props, "class"));
		const popper = computed(() => defu(props.mode === "hover" ? { offsetDistance: 0 } : {}, props.popper, ui.value.popper));
		const [trigger, container] = usePopper(popper.value);
		const menuApi = ref(null);
		let openTimeout = null;
		let closeTimeout = null;
		const containerStyle = computed(() => {
			if (props.mode !== "hover") return {};
			const offsetDistance = props.popper?.offsetDistance || ui.value.popper?.offsetDistance || 8;
			const placement = popper.value.placement?.split("-")[0];
			const padding = `${offsetDistance}px`;
			if (placement === "top" || placement === "bottom") return {
				paddingTop: padding,
				paddingBottom: padding
			};
			else if (placement === "left" || placement === "right") return {
				paddingLeft: padding,
				paddingRight: padding
			};
			else return {
				paddingTop: padding,
				paddingBottom: padding,
				paddingLeft: padding,
				paddingRight: padding
			};
		});
		function onTouchStart(event) {
			if (!event.cancelable || !menuApi.value || props.mode === "click") return;
			if (menuApi.value.menuState === 0) menuApi.value.closeMenu();
			else menuApi.value.openMenu();
		}
		function onMouseEnter() {
			if (props.mode !== "hover" || !menuApi.value) return;
			if (closeTimeout) {
				clearTimeout(closeTimeout);
				closeTimeout = null;
			}
			if (menuApi.value.menuState === 0) return;
			openTimeout = openTimeout || setTimeout(() => {
				if (menuApi.value.openMenu) menuApi.value.openMenu();
				openTimeout = null;
			}, props.openDelay);
		}
		function onMouseLeave() {
			if (props.mode !== "hover" || !menuApi.value) return;
			if (openTimeout) {
				clearTimeout(openTimeout);
				openTimeout = null;
			}
			if (menuApi.value.menuState === 1) return;
			closeTimeout = closeTimeout || setTimeout(() => {
				if (menuApi.value.closeMenu) menuApi.value.closeMenu();
				closeTimeout = null;
			}, props.closeDelay);
		}
		function onClick(e, item, { href, navigate, close, isExternal }) {
			if (item.click) item.click(e);
			if (href && !isExternal) {
				navigate(e);
				close();
			}
		}
		watch(() => props.open, (newValue, oldValue) => {
			if (!menuApi.value) return;
			if (oldValue === void 0 || newValue === oldValue) return;
			if (newValue) menuApi.value.openMenu();
			else menuApi.value.closeMenu();
		});
		watch(() => menuApi.value?.menuState, (newValue, oldValue) => {
			if (oldValue === void 0 || newValue === oldValue) return;
			emit("update:open", newValue === 0);
		});
		const NuxtLink = nuxt_link_default;
		s(() => useId());
		return {
			ui,
			attrs,
			popper,
			trigger,
			container,
			containerStyle,
			onTouchStart,
			onMouseEnter,
			onMouseLeave,
			onClick,
			getNuxtLinkProps,
			twMerge,
			twJoin,
			NuxtLink
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_HMenu = resolveComponent("HMenu");
	const _component_HMenuButton = resolveComponent("HMenuButton");
	const _component_HMenuItems = resolveComponent("HMenuItems");
	const _component_NuxtLink = nuxt_link_default;
	const _component_HMenuItem = resolveComponent("HMenuItem");
	const _component_UIcon = Icon_default;
	const _component_UAvatar = Avatar_default;
	const _component_UKbd = Kbd_default;
	_push(ssrRenderComponent(_component_HMenu, mergeProps({
		as: "div",
		class: _ctx.ui.wrapper
	}, _ctx.attrs, { onMouseleave: _ctx.onMouseLeave }, _attrs), {
		default: withCtx(({ open }, _push$1, _parent$1, _scopeId) => {
			if (_push$1) {
				_push$1(ssrRenderComponent(_component_HMenuButton, {
					ref: "trigger",
					as: "div",
					disabled: _ctx.disabled,
					class: _ctx.ui.trigger,
					role: "button",
					onMouseenter: _ctx.onMouseEnter,
					onTouchstart: _ctx.onTouchStart
				}, {
					default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
						if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {
							open,
							disabled: _ctx.disabled
						}, () => {
							_push$2(`<button${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${_scopeId$1}> Open </button>`);
						}, _push$2, _parent$2, _scopeId$1);
						else return [renderSlot(_ctx.$slots, "default", {
							open,
							disabled: _ctx.disabled
						}, () => [createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])])];
					}),
					_: 2
				}, _parent$1, _scopeId));
				if (open && _ctx.items.length) {
					_push$1(`<div class="${ssrRenderClass([_ctx.ui.container, _ctx.ui.width])}" style="${ssrRenderStyle(_ctx.containerStyle)}"${_scopeId}><template><div${_scopeId}>`);
					if (_ctx.popper.arrow) _push$1(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.ui.arrow))}"${_scopeId}></div>`);
					else _push$1(`<!---->`);
					_push$1(ssrRenderComponent(_component_HMenuItems, {
						class: [
							_ctx.ui.base,
							_ctx.ui.divide,
							_ctx.ui.ring,
							_ctx.ui.rounded,
							_ctx.ui.shadow,
							_ctx.ui.background,
							_ctx.ui.height
						],
						static: ""
					}, {
						default: withCtx((_$1, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<!--[-->`);
								ssrRenderList(_ctx.items, (subItems, index) => {
									_push$2(`<div class="${ssrRenderClass(_ctx.ui.padding)}"${_scopeId$1}><!--[-->`);
									ssrRenderList(subItems, (item, subIndex) => {
										_push$2(ssrRenderComponent(_component_NuxtLink, mergeProps({ key: subIndex }, { ref_for: true }, _ctx.getNuxtLinkProps(item), { custom: "" }), {
											default: withCtx(({ href, target, rel, navigate, isExternal, isActive }, _push$3, _parent$3, _scopeId$2) => {
												if (_push$3) _push$3(ssrRenderComponent(_component_HMenuItem, { disabled: item.disabled }, {
													default: withCtx(({ active, disabled: itemDisabled, close }, _push$4, _parent$4, _scopeId$3) => {
														if (_push$4) ssrRenderVNode(_push$4, createVNode(resolveDynamicComponent(!!href ? "a" : "button"), {
															href: !itemDisabled ? href : void 0,
															rel,
															target,
															class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
															onClick: ($event) => _ctx.onClick($event, item, {
																href,
																navigate,
																close,
																isExternal
															})
														}, {
															default: withCtx((_$2, _push$5, _parent$5, _scopeId$4) => {
																if (_push$5) ssrRenderSlot(_ctx.$slots, item.slot || "item", { item }, () => {
																	if (item.icon) _push$5(ssrRenderComponent(_component_UIcon, {
																		name: item.icon,
																		class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
																	}, null, _parent$5, _scopeId$4));
																	else if (item.avatar) _push$5(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, {
																		size: _ctx.ui.item.avatar.size,
																		...item.avatar
																	}, { class: _ctx.ui.item.avatar.base }), null, _parent$5, _scopeId$4));
																	else _push$5(`<!---->`);
																	_push$5(`<span class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.item.label, item.labelClass))}"${_scopeId$4}>${ssrInterpolate(item.label)}</span>`);
																	if (item.shortcuts?.length) {
																		_push$5(`<span class="${ssrRenderClass(_ctx.ui.item.shortcuts)}"${_scopeId$4}><!--[-->`);
																		ssrRenderList(item.shortcuts, (shortcut) => {
																			_push$5(ssrRenderComponent(_component_UKbd, { key: shortcut }, {
																				default: withCtx((_$3, _push$6, _parent$6, _scopeId$5) => {
																					if (_push$6) _push$6(`${ssrInterpolate(shortcut)}`);
																					else return [createTextVNode(toDisplayString(shortcut), 1)];
																				}),
																				_: 2
																			}, _parent$5, _scopeId$4));
																		});
																		_push$5(`<!--]--></span>`);
																	} else _push$5(`<!---->`);
																}, _push$5, _parent$5, _scopeId$4);
																else return [renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
																	item.icon ? (openBlock(), createBlock(_component_UIcon, {
																		key: 0,
																		name: item.icon,
																		class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
																	}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
																		key: 1,
																		ref_for: true
																	}, {
																		size: _ctx.ui.item.avatar.size,
																		...item.avatar
																	}, { class: _ctx.ui.item.avatar.base }), null, 16, ["class"])) : createCommentVNode("", true),
																	createVNode("span", { class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass) }, toDisplayString(item.label), 3),
																	item.shortcuts?.length ? (openBlock(), createBlock("span", {
																		key: 2,
																		class: _ctx.ui.item.shortcuts
																	}, [(openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
																		return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
																			default: withCtx(() => [createTextVNode(toDisplayString(shortcut), 1)]),
																			_: 2
																		}, 1024);
																	}), 128))], 2)) : createCommentVNode("", true)
																])];
															}),
															_: 2
														}), _parent$4, _scopeId$3);
														else return [(openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
															href: !itemDisabled ? href : void 0,
															rel,
															target,
															class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
															onClick: ($event) => _ctx.onClick($event, item, {
																href,
																navigate,
																close,
																isExternal
															})
														}, {
															default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
																item.icon ? (openBlock(), createBlock(_component_UIcon, {
																	key: 0,
																	name: item.icon,
																	class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
																}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
																	key: 1,
																	ref_for: true
																}, {
																	size: _ctx.ui.item.avatar.size,
																	...item.avatar
																}, { class: _ctx.ui.item.avatar.base }), null, 16, ["class"])) : createCommentVNode("", true),
																createVNode("span", { class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass) }, toDisplayString(item.label), 3),
																item.shortcuts?.length ? (openBlock(), createBlock("span", {
																	key: 2,
																	class: _ctx.ui.item.shortcuts
																}, [(openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
																	return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
																		default: withCtx(() => [createTextVNode(toDisplayString(shortcut), 1)]),
																		_: 2
																	}, 1024);
																}), 128))], 2)) : createCommentVNode("", true)
															])]),
															_: 2
														}, 1032, [
															"href",
															"rel",
															"target",
															"class",
															"onClick"
														]))];
													}),
													_: 2
												}, _parent$3, _scopeId$2));
												else return [createVNode(_component_HMenuItem, { disabled: item.disabled }, {
													default: withCtx(({ active, disabled: itemDisabled, close }) => [(openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
														href: !itemDisabled ? href : void 0,
														rel,
														target,
														class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
														onClick: ($event) => _ctx.onClick($event, item, {
															href,
															navigate,
															close,
															isExternal
														})
													}, {
														default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
															item.icon ? (openBlock(), createBlock(_component_UIcon, {
																key: 0,
																name: item.icon,
																class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
															}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
																key: 1,
																ref_for: true
															}, {
																size: _ctx.ui.item.avatar.size,
																...item.avatar
															}, { class: _ctx.ui.item.avatar.base }), null, 16, ["class"])) : createCommentVNode("", true),
															createVNode("span", { class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass) }, toDisplayString(item.label), 3),
															item.shortcuts?.length ? (openBlock(), createBlock("span", {
																key: 2,
																class: _ctx.ui.item.shortcuts
															}, [(openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
																return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
																	default: withCtx(() => [createTextVNode(toDisplayString(shortcut), 1)]),
																	_: 2
																}, 1024);
															}), 128))], 2)) : createCommentVNode("", true)
														])]),
														_: 2
													}, 1032, [
														"href",
														"rel",
														"target",
														"class",
														"onClick"
													]))]),
													_: 2
												}, 1032, ["disabled"])];
											}),
											_: 2
										}, _parent$2, _scopeId$1));
									});
									_push$2(`<!--]--></div>`);
								});
								_push$2(`<!--]-->`);
							} else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (subItems, index) => {
								return openBlock(), createBlock("div", {
									key: index,
									class: _ctx.ui.padding
								}, [(openBlock(true), createBlock(Fragment, null, renderList(subItems, (item, subIndex) => {
									return openBlock(), createBlock(_component_NuxtLink, mergeProps({ key: subIndex }, { ref_for: true }, _ctx.getNuxtLinkProps(item), { custom: "" }), {
										default: withCtx(({ href, target, rel, navigate, isExternal, isActive }) => [createVNode(_component_HMenuItem, { disabled: item.disabled }, {
											default: withCtx(({ active, disabled: itemDisabled, close }) => [(openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
												href: !itemDisabled ? href : void 0,
												rel,
												target,
												class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
												onClick: ($event) => _ctx.onClick($event, item, {
													href,
													navigate,
													close,
													isExternal
												})
											}, {
												default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
													item.icon ? (openBlock(), createBlock(_component_UIcon, {
														key: 0,
														name: item.icon,
														class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
													}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
														key: 1,
														ref_for: true
													}, {
														size: _ctx.ui.item.avatar.size,
														...item.avatar
													}, { class: _ctx.ui.item.avatar.base }), null, 16, ["class"])) : createCommentVNode("", true),
													createVNode("span", { class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass) }, toDisplayString(item.label), 3),
													item.shortcuts?.length ? (openBlock(), createBlock("span", {
														key: 2,
														class: _ctx.ui.item.shortcuts
													}, [(openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
														return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
															default: withCtx(() => [createTextVNode(toDisplayString(shortcut), 1)]),
															_: 2
														}, 1024);
													}), 128))], 2)) : createCommentVNode("", true)
												])]),
												_: 2
											}, 1032, [
												"href",
												"rel",
												"target",
												"class",
												"onClick"
											]))]),
											_: 2
										}, 1032, ["disabled"])]),
										_: 2
									}, 1040);
								}), 128))], 2);
							}), 128))];
						}),
						_: 2
					}, _parent$1, _scopeId));
					_push$1(`</div></template></div>`);
				} else _push$1(`<!---->`);
			} else return [createVNode(_component_HMenuButton, {
				ref: "trigger",
				as: "div",
				disabled: _ctx.disabled,
				class: _ctx.ui.trigger,
				role: "button",
				onMouseenter: _ctx.onMouseEnter,
				onTouchstartPassive: _ctx.onTouchStart
			}, {
				default: withCtx(() => [renderSlot(_ctx.$slots, "default", {
					open,
					disabled: _ctx.disabled
				}, () => [createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])])]),
				_: 2
			}, 1032, [
				"disabled",
				"class",
				"onMouseenter",
				"onTouchstartPassive"
			]), open && _ctx.items.length ? (openBlock(), createBlock("div", {
				key: 0,
				ref: "container",
				class: [_ctx.ui.container, _ctx.ui.width],
				style: _ctx.containerStyle,
				onMouseenter: _ctx.onMouseEnter
			}, [createVNode(Transition, mergeProps({ appear: "" }, _ctx.ui.transition), {
				default: withCtx(() => [createVNode("div", null, [_ctx.popper.arrow ? (openBlock(), createBlock("div", {
					key: 0,
					"data-popper-arrow": "",
					class: Object.values(_ctx.ui.arrow)
				}, null, 2)) : createCommentVNode("", true), createVNode(_component_HMenuItems, {
					class: [
						_ctx.ui.base,
						_ctx.ui.divide,
						_ctx.ui.ring,
						_ctx.ui.rounded,
						_ctx.ui.shadow,
						_ctx.ui.background,
						_ctx.ui.height
					],
					static: ""
				}, {
					default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.items, (subItems, index) => {
						return openBlock(), createBlock("div", {
							key: index,
							class: _ctx.ui.padding
						}, [(openBlock(true), createBlock(Fragment, null, renderList(subItems, (item, subIndex) => {
							return openBlock(), createBlock(_component_NuxtLink, mergeProps({ key: subIndex }, { ref_for: true }, _ctx.getNuxtLinkProps(item), { custom: "" }), {
								default: withCtx(({ href, target, rel, navigate, isExternal, isActive }) => [createVNode(_component_HMenuItem, { disabled: item.disabled }, {
									default: withCtx(({ active, disabled: itemDisabled, close }) => [(openBlock(), createBlock(resolveDynamicComponent(!!href ? "a" : "button"), {
										href: !itemDisabled ? href : void 0,
										rel,
										target,
										class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.base, _ctx.ui.item.padding, _ctx.ui.item.size, _ctx.ui.item.rounded, active || isActive ? _ctx.ui.item.active : _ctx.ui.item.inactive, itemDisabled && _ctx.ui.item.disabled), item.class),
										onClick: ($event) => _ctx.onClick($event, item, {
											href,
											navigate,
											close,
											isExternal
										})
									}, {
										default: withCtx(() => [renderSlot(_ctx.$slots, item.slot || "item", { item }, () => [
											item.icon ? (openBlock(), createBlock(_component_UIcon, {
												key: 0,
												name: item.icon,
												class: _ctx.twMerge(_ctx.twJoin(_ctx.ui.item.icon.base, active || isActive ? _ctx.ui.item.icon.active : _ctx.ui.item.icon.inactive), item.iconClass)
											}, null, 8, ["name", "class"])) : item.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
												key: 1,
												ref_for: true
											}, {
												size: _ctx.ui.item.avatar.size,
												...item.avatar
											}, { class: _ctx.ui.item.avatar.base }), null, 16, ["class"])) : createCommentVNode("", true),
											createVNode("span", { class: _ctx.twMerge(_ctx.ui.item.label, item.labelClass) }, toDisplayString(item.label), 3),
											item.shortcuts?.length ? (openBlock(), createBlock("span", {
												key: 2,
												class: _ctx.ui.item.shortcuts
											}, [(openBlock(true), createBlock(Fragment, null, renderList(item.shortcuts, (shortcut) => {
												return openBlock(), createBlock(_component_UKbd, { key: shortcut }, {
													default: withCtx(() => [createTextVNode(toDisplayString(shortcut), 1)]),
													_: 2
												}, 1024);
											}), 128))], 2)) : createCommentVNode("", true)
										])]),
										_: 2
									}, 1032, [
										"href",
										"rel",
										"target",
										"class",
										"onClick"
									]))]),
									_: 2
								}, 1032, ["disabled"])]),
								_: 2
							}, 1040);
						}), 128))], 2);
					}), 128))]),
					_: 3
				}, 8, ["class"])])]),
				_: 3
			}, 16)], 46, ["onMouseenter"])) : createCommentVNode("", true)];
		}),
		_: 3
	}, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Dropdown.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Dropdown_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Dropdown_default as t };

//# sourceMappingURL=Dropdown-CVzNln5Z.js.map