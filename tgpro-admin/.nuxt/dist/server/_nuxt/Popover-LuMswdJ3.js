import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { W as useUI, i as popover_default } from "./ui-G7Oicn0a.js";
import "./micro-task-CYdHJ3PN.js";
import { c as o$1, i as N$2, l as i, n as A, s as u$1, t as o, u as s } from "./keyboard-CvjRf4Wb.js";
import { c as h$1, d as i$2, i as P, n as N$1, o as T, t as E$1, u as w$1 } from "./focus-management-DFaZHIRF.js";
import { t as w } from "./use-outside-click-B4rja7ys.js";
import { t as s$1 } from "./use-resolve-button-type-eioNRL5V.js";
import { n as u, t as f } from "./hidden-Bsn3DsxF.js";
import { i as t, n as l, t as i$1 } from "./open-closed-Dsm1EOia.js";
import { a as N, c as n, l as E, n as q, o as v, s as d } from "./portal-BLTG7ywv.js";
import { t as usePopper } from "./usePopper-CMZCG_Qh.js";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createVNode, defineComponent, h, inject, mergeProps, openBlock, provide, ref, renderSlot, resolveComponent, shallowRef, toRef, useId, useSSRContext, watch, watchEffect, withCtx } from "vue";
import { defu } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/defu/dist/defu.mjs";
import { ssrIncludeBooleanAttr, ssrRenderClass, ssrRenderComponent, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
var Se = ((s$2) => (s$2[s$2.Open = 0] = "Open", s$2[s$2.Closed = 1] = "Closed", s$2))(Se || {});
var re = Symbol("PopoverContext");
function U(d$1) {
	let P$1 = inject(re, null);
	if (P$1 === null) {
		let s$2 = /* @__PURE__ */ new Error(`<${d$1} /> is missing a parent <${ye.name} /> component.`);
		throw Error.captureStackTrace && Error.captureStackTrace(s$2, U), s$2;
	}
	return P$1;
}
var le = Symbol("PopoverGroupContext");
function ae() {
	return inject(le, null);
}
var ue = Symbol("PopoverPanelContext");
function ge() {
	return inject(ue, null);
}
var ye = defineComponent({
	name: "Popover",
	inheritAttrs: !1,
	props: { as: {
		type: [Object, String],
		default: "div"
	} },
	setup(d$1, { slots: P$1, attrs: s$2, expose: h$2 }) {
		var u$2;
		let f$1 = ref(null);
		h$2({
			el: f$1,
			$el: f$1
		});
		let t$1 = ref(1), o$2 = ref(null), y = ref(null), v$1 = ref(null), m = ref(null), b = computed(() => i$2(f$1)), E$2 = computed(() => {
			var L, $;
			if (!o$1(o$2) || !o$1(m)) return !1;
			for (let x of (void 0).querySelectorAll("body > *")) if (Number(x == null ? void 0 : x.contains(o$1(o$2))) ^ Number(x == null ? void 0 : x.contains(o$1(m)))) return !0;
			let e = E$1(), r = e.indexOf(o$1(o$2)), l$1 = (r + e.length - 1) % e.length, g = (r + 1) % e.length, G = e[l$1], C = e[g];
			return !((L = o$1(m)) != null && L.contains(G)) && !(($ = o$1(m)) != null && $.contains(C));
		}), a = {
			popoverState: t$1,
			buttonId: ref(null),
			panelId: ref(null),
			panel: m,
			button: o$2,
			isPortalled: E$2,
			beforePanelSentinel: y,
			afterPanelSentinel: v$1,
			togglePopover() {
				t$1.value = u$1(t$1.value, {
					[0]: 1,
					[1]: 0
				});
			},
			closePopover() {
				t$1.value !== 1 && (t$1.value = 1);
			},
			close(e) {
				a.closePopover();
				(() => e ? e instanceof HTMLElement ? e : e.value instanceof HTMLElement ? o$1(e) : o$1(a.button) : o$1(a.button))()?.focus();
			}
		};
		provide(re, a), t(computed(() => u$1(t$1.value, {
			[0]: i$1.Open,
			[1]: i$1.Closed
		})));
		let S = {
			buttonId: a.buttonId,
			panelId: a.panelId,
			close() {
				a.closePopover();
			}
		}, c = ae(), I = c == null ? void 0 : c.registerPopover, [F, w$2] = q(), i$3 = N({
			mainTreeNodeRef: c == null ? void 0 : c.mainTreeNodeRef,
			portals: F,
			defaultContainers: [o$2, m]
		});
		function p() {
			var e, r, l$1, g;
			return (g = c == null ? void 0 : c.isFocusWithinPopoverGroup()) != null ? g : ((e = b.value) == null ? void 0 : e.activeElement) && (((r = o$1(o$2)) == null ? void 0 : r.contains(b.value.activeElement)) || ((l$1 = o$1(m)) == null ? void 0 : l$1.contains(b.value.activeElement)));
		}
		return watchEffect(() => I == null ? void 0 : I(S)), E((u$2 = b.value) == null ? void 0 : u$2.defaultView, "focus", (e) => {
			var r, l$1;
			e.target !== void 0 && e.target instanceof HTMLElement && t$1.value === 0 && (p() || o$2 && m && (i$3.contains(e.target) || (r = o$1(a.beforePanelSentinel)) != null && r.contains(e.target) || (l$1 = o$1(a.afterPanelSentinel)) != null && l$1.contains(e.target) || a.closePopover()));
		}, !0), w(i$3.resolveContainers, (e, r) => {
			var l$1;
			a.closePopover(), w$1(r, h$1.Loose) || (e.preventDefault(), (l$1 = o$1(o$2)) == null || l$1.focus());
		}, computed(() => t$1.value === 0)), () => {
			let e = {
				open: t$1.value === 0,
				close: a.close
			};
			return h(Fragment, [h(w$2, {}, () => A({
				theirProps: {
					...d$1,
					...s$2
				},
				ourProps: { ref: f$1 },
				slot: e,
				slots: P$1,
				attrs: s$2,
				name: "Popover"
			})), h(i$3.MainTreeNode)]);
		};
	}
}), Ge = defineComponent({
	name: "PopoverButton",
	props: {
		as: {
			type: [Object, String],
			default: "button"
		},
		disabled: {
			type: [Boolean],
			default: !1
		},
		id: {
			type: String,
			default: null
		}
	},
	inheritAttrs: !1,
	setup(d$1, { attrs: P$1, slots: s$2, expose: h$2 }) {
		var u$2;
		let f$1 = (u$2 = d$1.id) != null ? u$2 : `headlessui-popover-button-${i()}`, t$1 = U("PopoverButton"), o$2 = computed(() => i$2(t$1.button));
		h$2({
			el: t$1.button,
			$el: t$1.button
		});
		let y = ae(), v$1 = y == null ? void 0 : y.closeOthers, m = ge(), b = computed(() => m === null ? !1 : m.value === t$1.panelId.value), E$2 = ref(null), a = `headlessui-focus-sentinel-${i()}`;
		b.value || watchEffect(() => {
			t$1.button.value = o$1(E$2);
		});
		let S = s$1(computed(() => ({
			as: d$1.as,
			type: P$1.type
		})), E$2);
		function c(e) {
			var r, l$1, g, G, C;
			if (b.value) {
				if (t$1.popoverState.value === 1) return;
				switch (e.key) {
					case o.Space:
					case o.Enter:
						e.preventDefault(), (l$1 = (r = e.target).click) == null || l$1.call(r), t$1.closePopover(), (g = o$1(t$1.button)) == null || g.focus();
						break;
				}
			} else switch (e.key) {
				case o.Space:
				case o.Enter:
					e.preventDefault(), e.stopPropagation(), t$1.popoverState.value === 1 && v$1?.(t$1.buttonId.value), t$1.togglePopover();
					break;
				case o.Escape:
					if (t$1.popoverState.value !== 0) return v$1 == null ? void 0 : v$1(t$1.buttonId.value);
					if (!o$1(t$1.button) || (G = o$2.value) != null && G.activeElement && !((C = o$1(t$1.button)) != null && C.contains(o$2.value.activeElement))) return;
					e.preventDefault(), e.stopPropagation(), t$1.closePopover();
					break;
			}
		}
		function I(e) {
			b.value || e.key === o.Space && e.preventDefault();
		}
		function F(e) {
			var r, l$1;
			d$1.disabled || (b.value ? (t$1.closePopover(), (r = o$1(t$1.button)) == null || r.focus()) : (e.preventDefault(), e.stopPropagation(), t$1.popoverState.value === 1 && v$1?.(t$1.buttonId.value), t$1.togglePopover(), (l$1 = o$1(t$1.button)) == null || l$1.focus()));
		}
		function w$2(e) {
			e.preventDefault(), e.stopPropagation();
		}
		let i$3 = n();
		function p() {
			let e = o$1(t$1.panel);
			if (!e) return;
			function r() {
				u$1(i$3.value, {
					[d.Forwards]: () => P(e, N$1.First),
					[d.Backwards]: () => P(e, N$1.Last)
				}) === T.Error && P(E$1().filter((g) => g.dataset.headlessuiFocusGuard !== "true"), u$1(i$3.value, {
					[d.Forwards]: N$1.Next,
					[d.Backwards]: N$1.Previous
				}), { relativeTo: o$1(t$1.button) });
			}
			r();
		}
		return () => {
			let e = t$1.popoverState.value === 0, r = { open: e }, { ...l$1 } = d$1;
			return h(Fragment, [A({
				ourProps: b.value ? {
					ref: E$2,
					type: S.value,
					onKeydown: c,
					onClick: F
				} : {
					ref: E$2,
					id: f$1,
					type: S.value,
					"aria-expanded": t$1.popoverState.value === 0,
					"aria-controls": o$1(t$1.panel) ? t$1.panelId.value : void 0,
					disabled: d$1.disabled ? !0 : void 0,
					onKeydown: c,
					onKeyup: I,
					onClick: F,
					onMousedown: w$2
				},
				theirProps: {
					...P$1,
					...l$1
				},
				slot: r,
				attrs: P$1,
				slots: s$2,
				name: "PopoverButton"
			}), e && !b.value && t$1.isPortalled.value && h(f, {
				id: a,
				features: u.Focusable,
				"data-headlessui-focus-guard": !0,
				as: "button",
				type: "button",
				onFocus: p
			})]);
		};
	}
});
defineComponent({
	name: "PopoverOverlay",
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
		}
	},
	setup(d$1, { attrs: P$1, slots: s$2 }) {
		let h$2 = U("PopoverOverlay"), f$1 = `headlessui-popover-overlay-${i()}`, t$1 = l(), o$2 = computed(() => t$1 !== null ? (t$1.value & i$1.Open) === i$1.Open : h$2.popoverState.value === 0);
		function y() {
			h$2.closePopover();
		}
		return () => {
			let v$1 = { open: h$2.popoverState.value === 0 };
			return A({
				ourProps: {
					id: f$1,
					"aria-hidden": !0,
					onClick: y
				},
				theirProps: d$1,
				slot: v$1,
				attrs: P$1,
				slots: s$2,
				features: N$2.RenderStrategy | N$2.Static,
				visible: o$2.value,
				name: "PopoverOverlay"
			});
		};
	}
});
var je = defineComponent({
	name: "PopoverPanel",
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
		focus: {
			type: Boolean,
			default: !1
		},
		id: {
			type: String,
			default: null
		}
	},
	inheritAttrs: !1,
	setup(d$1, { attrs: P$1, slots: s$2, expose: h$2 }) {
		var w$2;
		let f$1 = (w$2 = d$1.id) != null ? w$2 : `headlessui-popover-panel-${i()}`, { focus: t$1 } = d$1, o$2 = U("PopoverPanel"), y = computed(() => i$2(o$2.panel)), v$1 = `headlessui-focus-sentinel-before-${i()}`, m = `headlessui-focus-sentinel-after-${i()}`;
		h$2({
			el: o$2.panel,
			$el: o$2.panel
		}), provide(ue, o$2.panelId), watchEffect(() => {
			var p, u$2;
			if (!t$1 || o$2.popoverState.value !== 0 || !o$2.panel) return;
			let i$3 = (p = y.value) == null ? void 0 : p.activeElement;
			(u$2 = o$1(o$2.panel)) != null && u$2.contains(i$3) || P(o$1(o$2.panel), N$1.First);
		});
		let b = l(), E$2 = computed(() => b !== null ? (b.value & i$1.Open) === i$1.Open : o$2.popoverState.value === 0);
		function a(i$3) {
			var p, u$2;
			switch (i$3.key) {
				case o.Escape:
					if (o$2.popoverState.value !== 0 || !o$1(o$2.panel) || y.value && !((p = o$1(o$2.panel)) != null && p.contains(y.value.activeElement))) return;
					i$3.preventDefault(), i$3.stopPropagation(), o$2.closePopover(), (u$2 = o$1(o$2.button)) == null || u$2.focus();
					break;
			}
		}
		function S(i$3) {
			var u$2, e, r, l$1, g;
			let p = i$3.relatedTarget;
			p && o$1(o$2.panel) && ((u$2 = o$1(o$2.panel)) != null && u$2.contains(p) || (o$2.closePopover(), ((r = (e = o$1(o$2.beforePanelSentinel)) == null ? void 0 : e.contains) != null && r.call(e, p) || (g = (l$1 = o$1(o$2.afterPanelSentinel)) == null ? void 0 : l$1.contains) != null && g.call(l$1, p)) && p.focus({ preventScroll: !0 })));
		}
		let c = n();
		function I() {
			let i$3 = o$1(o$2.panel);
			if (!i$3) return;
			function p() {
				u$1(c.value, {
					[d.Forwards]: () => {
						var e;
						P(i$3, N$1.First) === T.Error && ((e = o$1(o$2.afterPanelSentinel)) == null || e.focus());
					},
					[d.Backwards]: () => {
						var u$2;
						(u$2 = o$1(o$2.button)) == null || u$2.focus({ preventScroll: !0 });
					}
				});
			}
			p();
		}
		function F() {
			let i$3 = o$1(o$2.panel);
			if (!i$3) return;
			function p() {
				u$1(c.value, {
					[d.Forwards]: () => {
						let u$2 = o$1(o$2.button), e = o$1(o$2.panel);
						if (!u$2) return;
						let r = E$1(), l$1 = r.indexOf(u$2), g = r.slice(0, l$1 + 1), C = [...r.slice(l$1 + 1), ...g];
						for (let L of C.slice()) if (L.dataset.headlessuiFocusGuard === "true" || e != null && e.contains(L)) {
							let $ = C.indexOf(L);
							$ !== -1 && C.splice($, 1);
						}
						P(C, N$1.First, { sorted: !1 });
					},
					[d.Backwards]: () => {
						var e;
						P(i$3, N$1.Previous) === T.Error && ((e = o$1(o$2.button)) == null || e.focus());
					}
				});
			}
			p();
		}
		return () => {
			let i$3 = {
				open: o$2.popoverState.value === 0,
				close: o$2.close
			}, { focus: p,...u$2 } = d$1;
			return A({
				ourProps: {
					ref: o$2.panel,
					id: f$1,
					onKeydown: a,
					onFocusout: t$1 && o$2.popoverState.value === 0 ? S : void 0,
					tabIndex: -1
				},
				theirProps: {
					...P$1,
					...u$2
				},
				attrs: P$1,
				slot: i$3,
				slots: {
					...s$2,
					default: (...r) => {
						var l$1;
						return [h(Fragment, [
							E$2.value && o$2.isPortalled.value && h(f, {
								id: v$1,
								ref: o$2.beforePanelSentinel,
								features: u.Focusable,
								"data-headlessui-focus-guard": !0,
								as: "button",
								type: "button",
								onFocus: I
							}),
							(l$1 = s$2.default) == null ? void 0 : l$1.call(s$2, ...r),
							E$2.value && o$2.isPortalled.value && h(f, {
								id: m,
								ref: o$2.afterPanelSentinel,
								features: u.Focusable,
								"data-headlessui-focus-guard": !0,
								as: "button",
								type: "button",
								onFocus: F
							})
						])];
					}
				},
				features: N$2.RenderStrategy | N$2.Static,
				visible: E$2.value,
				name: "PopoverPanel"
			});
		};
	}
});
defineComponent({
	name: "PopoverGroup",
	inheritAttrs: !1,
	props: { as: {
		type: [Object, String],
		default: "div"
	} },
	setup(d$1, { attrs: P$1, slots: s$2, expose: h$2 }) {
		let f$1 = ref(null), t$1 = shallowRef([]), o$2 = computed(() => i$2(f$1)), y = v();
		h$2({
			el: f$1,
			$el: f$1
		});
		function v$1(a) {
			let S = t$1.value.indexOf(a);
			S !== -1 && t$1.value.splice(S, 1);
		}
		function m(a) {
			return t$1.value.push(a), () => {
				v$1(a);
			};
		}
		function b() {
			var c;
			let a = o$2.value;
			if (!a) return !1;
			let S = a.activeElement;
			return (c = o$1(f$1)) != null && c.contains(S) ? !0 : t$1.value.some((I) => {
				var F, w$2;
				return ((F = a.getElementById(I.buttonId.value)) == null ? void 0 : F.contains(S)) || ((w$2 = a.getElementById(I.panelId.value)) == null ? void 0 : w$2.contains(S));
			});
		}
		function E$2(a) {
			for (let S of t$1.value) S.buttonId.value !== a && S.close();
		}
		return provide(le, {
			registerPopover: m,
			unregisterPopover: v$1,
			isFocusWithinPopoverGroup: b,
			closeOthers: E$2,
			mainTreeNodeRef: y.mainTreeNodeRef
		}), () => h(Fragment, [A({
			ourProps: { ref: f$1 },
			theirProps: {
				...d$1,
				...P$1
			},
			slot: {},
			attrs: P$1,
			slots: s$2,
			name: "PopoverGroup"
		}), h(y.MainTreeNode)]);
	}
});
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.popover, popover_default);
var _sfc_main = defineComponent({
	components: {
		HPopover: ye,
		HPopoverButton: Ge,
		HPopoverPanel: je
	},
	inheritAttrs: false,
	props: {
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
		openDelay: {
			type: Number,
			default: () => config.default.openDelay
		},
		closeDelay: {
			type: Number,
			default: () => config.default.closeDelay
		},
		overlay: {
			type: Boolean,
			default: false
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
	emits: ["update:open"],
	setup(props, { emit }) {
		const { ui, attrs } = useUI("popover", toRef(props, "ui"), config, toRef(props, "class"));
		const popper = computed(() => defu(props.mode === "hover" ? { offsetDistance: 0 } : {}, props.popper, ui.value.popper));
		const [trigger, container] = usePopper(popper.value);
		const popover2 = ref(null);
		const popoverApi = ref(null);
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
			if (!event.cancelable || !popoverApi.value || props.mode === "click") return;
			if (popoverApi.value.popoverState === 0) popoverApi.value.closePopover();
			else popoverApi.value.togglePopover();
		}
		function onMouseEnter() {
			if (props.mode !== "hover" || !popoverApi.value) return;
			if (closeTimeout) {
				clearTimeout(closeTimeout);
				closeTimeout = null;
			}
			if (popoverApi.value.popoverState === 0) return;
			openTimeout = openTimeout || setTimeout(() => {
				if (popoverApi.value.togglePopover) popoverApi.value.togglePopover();
				openTimeout = null;
			}, props.openDelay);
		}
		function onMouseLeave() {
			if (props.mode !== "hover" || !popoverApi.value) return;
			if (openTimeout) {
				clearTimeout(openTimeout);
				openTimeout = null;
			}
			if (popoverApi.value.popoverState === 1) return;
			closeTimeout = closeTimeout || setTimeout(() => {
				if (popoverApi.value.closePopover) popoverApi.value.closePopover();
				closeTimeout = null;
			}, props.closeDelay);
		}
		watch(() => props.open, (newValue, oldValue) => {
			if (!popoverApi.value) return;
			if (oldValue === void 0 || newValue === oldValue) return;
			if (newValue) popoverApi.value.popoverState = 0;
			else popoverApi.value.closePopover();
		});
		watch(() => popoverApi.value?.popoverState, (newValue, oldValue) => {
			if (oldValue === void 0 || newValue === oldValue) return;
			emit("update:open", newValue === 0);
		});
		s(() => useId());
		return {
			ui,
			attrs,
			popover: popover2,
			popper,
			trigger,
			container,
			containerStyle,
			onTouchStart,
			onMouseEnter,
			onMouseLeave
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_HPopover = resolveComponent("HPopover");
	const _component_HPopoverButton = resolveComponent("HPopoverButton");
	const _component_HPopoverPanel = resolveComponent("HPopoverPanel");
	_push(ssrRenderComponent(_component_HPopover, mergeProps({
		ref: "popover",
		class: _ctx.ui.wrapper
	}, _ctx.attrs, { onMouseleave: _ctx.onMouseLeave }, _attrs), {
		default: withCtx(({ open, close }, _push$1, _parent$1, _scopeId) => {
			if (_push$1) {
				_push$1(ssrRenderComponent(_component_HPopoverButton, {
					ref: "trigger",
					as: "div",
					disabled: _ctx.disabled,
					class: _ctx.ui.trigger,
					role: "button",
					onMouseenter: _ctx.onMouseEnter,
					onTouchstart: _ctx.onTouchStart
				}, {
					default: withCtx((_, _push$2, _parent$2, _scopeId$1) => {
						if (_push$2) ssrRenderSlot(_ctx.$slots, "default", {
							open,
							close
						}, () => {
							_push$2(`<button${ssrIncludeBooleanAttr(_ctx.disabled) ? " disabled" : ""}${_scopeId$1}> Open </button>`);
						}, _push$2, _parent$2, _scopeId$1);
						else return [renderSlot(_ctx.$slots, "default", {
							open,
							close
						}, () => [createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])])];
					}),
					_: 2
				}, _parent$1, _scopeId));
				if (_ctx.overlay) {
					_push$1(`<template>`);
					if (open) _push$1(`<div class="${ssrRenderClass([_ctx.ui.overlay.base, _ctx.ui.overlay.background])}"${_scopeId}></div>`);
					else _push$1(`<!---->`);
					_push$1(`</template>`);
				} else _push$1(`<!---->`);
				if (open) {
					_push$1(`<div class="${ssrRenderClass([_ctx.ui.container, _ctx.ui.width])}" style="${ssrRenderStyle(_ctx.containerStyle)}"${_scopeId}><template><div${_scopeId}>`);
					if (_ctx.popper.arrow) _push$1(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.ui.arrow))}"${_scopeId}></div>`);
					else _push$1(`<!---->`);
					_push$1(ssrRenderComponent(_component_HPopoverPanel, {
						class: [
							_ctx.ui.base,
							_ctx.ui.background,
							_ctx.ui.ring,
							_ctx.ui.rounded,
							_ctx.ui.shadow
						],
						static: ""
					}, {
						default: withCtx((_, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) ssrRenderSlot(_ctx.$slots, "panel", {
								open,
								close
							}, null, _push$2, _parent$2, _scopeId$1);
							else return [renderSlot(_ctx.$slots, "panel", {
								open,
								close
							})];
						}),
						_: 2
					}, _parent$1, _scopeId));
					_push$1(`</div></template></div>`);
				} else _push$1(`<!---->`);
			} else return [
				createVNode(_component_HPopoverButton, {
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
						close
					}, () => [createVNode("button", { disabled: _ctx.disabled }, " Open ", 8, ["disabled"])])]),
					_: 2
				}, 1032, [
					"disabled",
					"class",
					"onMouseenter",
					"onTouchstartPassive"
				]),
				_ctx.overlay ? (openBlock(), createBlock(Transition, mergeProps({
					key: 0,
					appear: ""
				}, _ctx.ui.overlay.transition), {
					default: withCtx(() => [open ? (openBlock(), createBlock("div", {
						key: 0,
						class: [_ctx.ui.overlay.base, _ctx.ui.overlay.background]
					}, null, 2)) : createCommentVNode("", true)]),
					_: 2
				}, 1040)) : createCommentVNode("", true),
				open ? (openBlock(), createBlock("div", {
					key: 1,
					ref: "container",
					class: [_ctx.ui.container, _ctx.ui.width],
					style: _ctx.containerStyle,
					onMouseenter: _ctx.onMouseEnter
				}, [createVNode(Transition, mergeProps({ appear: "" }, _ctx.ui.transition), {
					default: withCtx(() => [createVNode("div", null, [_ctx.popper.arrow ? (openBlock(), createBlock("div", {
						key: 0,
						"data-popper-arrow": "",
						class: Object.values(_ctx.ui.arrow)
					}, null, 2)) : createCommentVNode("", true), createVNode(_component_HPopoverPanel, {
						class: [
							_ctx.ui.base,
							_ctx.ui.background,
							_ctx.ui.ring,
							_ctx.ui.rounded,
							_ctx.ui.shadow
						],
						static: ""
					}, {
						default: withCtx(() => [renderSlot(_ctx.$slots, "panel", {
							open,
							close
						})]),
						_: 2
					}, 1032, ["class"])])]),
					_: 2
				}, 1040)], 46, ["onMouseenter"])) : createCommentVNode("", true)
			];
		}),
		_: 3
	}, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/overlays/Popover.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Popover_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Popover_default as default };

//# sourceMappingURL=Popover-LuMswdJ3.js.map