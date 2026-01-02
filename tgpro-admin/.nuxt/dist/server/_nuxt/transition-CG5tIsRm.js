import { t as t$4 } from "./micro-task-CYdHJ3PN.js";
import { n as o$2, t as t$3 } from "./active-element-history-DJ1NL7os.js";
import { a as S, c as o$1, i as N, l as i, n as A, o as T, s as u, t as o } from "./keyboard-CvjRf4Wb.js";
import { a as S$1, d as i$2, f as c, i as P, n as N$3 } from "./focus-management-DFaZHIRF.js";
import { i as t$2, t as w } from "./use-outside-click-B4rja7ys.js";
import { n as u$3, t as f } from "./hidden-Bsn3DsxF.js";
import { i as t, n as l, r as s, t as i$1 } from "./open-closed-Dsm1EOia.js";
import { a as N$2, c as n, i as u$1, l as E, n as q, r as z, s as d$1, t as $ } from "./portal-BLTG7ywv.js";
import { n as k, t as K } from "./description-Y4p4EFv6.js";
import { Fragment, computed, defineComponent, h, inject, nextTick, normalizeClass, provide, ref, shallowRef, watch, watchEffect } from "vue";
function B(t$5) {
	if (!t$5) return /* @__PURE__ */ new Set();
	if (typeof t$5 == "function") return new Set(t$5());
	let n$1 = /* @__PURE__ */ new Set();
	for (let r of t$5.value) {
		let l$2 = o$1(r);
		l$2 instanceof HTMLElement && n$1.add(l$2);
	}
	return n$1;
}
var A$2 = ((e) => (e[e.None = 1] = "None", e[e.InitialFocus = 2] = "InitialFocus", e[e.TabLock = 4] = "TabLock", e[e.FocusLock = 8] = "FocusLock", e[e.RestoreFocus = 16] = "RestoreFocus", e[e.All = 30] = "All", e))(A$2 || {});
var ue = Object.assign(defineComponent({
	name: "FocusTrap",
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		initialFocus: {
			type: Object,
			default: null
		},
		features: {
			type: Number,
			default: 30
		},
		containers: {
			type: [Object, Function],
			default: ref(/* @__PURE__ */ new Set())
		}
	},
	inheritAttrs: !1,
	setup(t$5, { attrs: n$1, slots: r, expose: l$2 }) {
		let o$3 = ref(null);
		l$2({
			el: o$3,
			$el: o$3
		});
		let i$4 = computed(() => i$2(o$3)), e = ref(!1);
		$$1({ ownerDocument: i$4 }, computed(() => e.value && Boolean(t$5.features & 16)));
		let m$2 = z$1({
			ownerDocument: i$4,
			container: o$3,
			initialFocus: computed(() => t$5.initialFocus)
		}, computed(() => e.value && Boolean(t$5.features & 2)));
		J({
			ownerDocument: i$4,
			container: o$3,
			containers: t$5.containers,
			previousActiveElement: m$2
		}, computed(() => e.value && Boolean(t$5.features & 8)));
		let f$1 = n();
		function a$2(u$4) {
			let T$3 = o$1(o$3);
			if (!T$3) return;
			((w$2) => w$2())(() => {
				u(f$1.value, {
					[d$1.Forwards]: () => {
						P(T$3, N$3.First, { skipElements: [u$4.relatedTarget] });
					},
					[d$1.Backwards]: () => {
						P(T$3, N$3.Last, { skipElements: [u$4.relatedTarget] });
					}
				});
			});
		}
		let s$2 = ref(!1);
		function F(u$4) {
			u$4.key === "Tab" && (s$2.value = !0, requestAnimationFrame(() => {
				s$2.value = !1;
			}));
		}
		function H$1(u$4) {
			if (!e.value) return;
			let T$3 = B(t$5.containers);
			o$1(o$3) instanceof HTMLElement && T$3.add(o$1(o$3));
			let d$2 = u$4.relatedTarget;
			d$2 instanceof HTMLElement && d$2.dataset.headlessuiFocusGuard !== "true" && (N$4(T$3, d$2) || (s$2.value ? P(o$1(o$3), u(f$1.value, {
				[d$1.Forwards]: () => N$3.Next,
				[d$1.Backwards]: () => N$3.Previous
			}) | N$3.WrapAround, { relativeTo: u$4.target }) : u$4.target instanceof HTMLElement && S$1(u$4.target)));
		}
		return () => {
			let u$4 = {}, T$3 = {
				ref: o$3,
				onKeydown: F,
				onFocusout: H$1
			}, { features: d$2, initialFocus: w$2, containers: Q$1,...O } = t$5;
			return h(Fragment, [
				Boolean(d$2 & 4) && h(f, {
					as: "button",
					type: "button",
					"data-headlessui-focus-guard": !0,
					onFocus: a$2,
					features: u$3.Focusable
				}),
				A({
					ourProps: T$3,
					theirProps: {
						...n$1,
						...O
					},
					slot: u$4,
					attrs: n$1,
					slots: r,
					name: "FocusTrap"
				}),
				Boolean(d$2 & 4) && h(f, {
					as: "button",
					type: "button",
					"data-headlessui-focus-guard": !0,
					onFocus: a$2,
					features: u$3.Focusable
				})
			]);
		};
	}
}), { features: A$2 });
function W$1(t$5) {
	let n$1 = ref(t$3.slice());
	return watch([t$5], ([r], [l$2]) => {
		l$2 === !0 && r === !1 ? t$4(() => {
			n$1.value.splice(0);
		}) : l$2 === !1 && r === !0 && (n$1.value = t$3.slice());
	}, { flush: "post" }), () => {
		var r;
		return (r = n$1.value.find((l$2) => l$2 != null && l$2.isConnected)) != null ? r : null;
	};
}
function $$1({ ownerDocument: t$5 }, n$1) {
	W$1(n$1);
}
function z$1({ ownerDocument: t$5, container: n$1, initialFocus: r }, l$2) {
	let o$3 = ref(null);
	ref(!1);
	return o$3;
}
function J({ ownerDocument: t$5, container: n$1, containers: r, previousActiveElement: l$2 }, o$3) {
	var i$4;
	E((i$4 = t$5.value) == null ? void 0 : i$4.defaultView, "focus", (e) => {
		if (!o$3.value) return;
		let m$2 = B(r);
		o$1(n$1) instanceof HTMLElement && m$2.add(o$1(n$1));
		let f$1 = l$2.value;
		if (!f$1) return;
		let a$2 = e.target;
		a$2 && a$2 instanceof HTMLElement ? N$4(m$2, a$2) ? (l$2.value = a$2, S$1(a$2)) : (e.preventDefault(), e.stopPropagation(), S$1(f$1)) : S$1(l$2.value);
	}, !0);
}
function N$4(t$5, n$1) {
	for (let r of t$5) if (r.contains(n$1)) return !0;
	return !1;
}
function m(t$5) {
	return shallowRef(t$5.getSnapshot());
}
function a$1(o$3, r) {
	let t$5 = o$3(), n$1 = /* @__PURE__ */ new Set();
	return {
		getSnapshot() {
			return t$5;
		},
		subscribe(e) {
			return n$1.add(e), () => n$1.delete(e);
		},
		dispatch(e, ...s$2) {
			let i$4 = r[e].call(t$5, ...s$2);
			i$4 && (t$5 = i$4, n$1.forEach((c$2) => c$2()));
		}
	};
}
function c$1() {
	let o$3;
	return {
		before({ doc: e }) {
			var l$2;
			let n$1 = e.documentElement;
			o$3 = ((l$2 = e.defaultView) != null ? l$2 : void 0).innerWidth - n$1.clientWidth;
		},
		after({ doc: e, d: n$1 }) {
			let t$5 = e.documentElement, l$2 = t$5.clientWidth - t$5.offsetWidth, r = o$3 - l$2;
			n$1.style(t$5, "paddingRight", `${r}px`);
		}
	};
}
function w$1() {
	return t$2() ? { before({ doc: r, d: n$1, meta: c$2 }) {
		function a$2(o$3) {
			return c$2.containers.flatMap((l$2) => l$2()).some((l$2) => l$2.contains(o$3));
		}
		n$1.microTask(() => {
			var s$2;
			if ((void 0).getComputedStyle(r.documentElement).scrollBehavior !== "auto") {
				let t$5 = o$2();
				t$5.style(r.documentElement, "scrollBehavior", "auto"), n$1.add(() => n$1.microTask(() => t$5.dispose()));
			}
			let o$3 = (s$2 = (void 0).scrollY) != null ? s$2 : (void 0).pageYOffset, l$2 = null;
			n$1.addEventListener(r, "click", (t$5) => {
				if (t$5.target instanceof HTMLElement) try {
					let e = t$5.target.closest("a");
					if (!e) return;
					let { hash: f$1 } = new URL(e.href), i$4 = r.querySelector(f$1);
					i$4 && !a$2(i$4) && (l$2 = i$4);
				} catch {}
			}, !0), n$1.addEventListener(r, "touchstart", (t$5) => {
				if (t$5.target instanceof HTMLElement) if (a$2(t$5.target)) {
					let e = t$5.target;
					for (; e.parentElement && a$2(e.parentElement);) e = e.parentElement;
					n$1.style(e, "overscrollBehavior", "contain");
				} else n$1.style(t$5.target, "touchAction", "none");
			}), n$1.addEventListener(r, "touchmove", (t$5) => {
				if (t$5.target instanceof HTMLElement) {
					if (t$5.target.tagName === "INPUT") return;
					if (a$2(t$5.target)) {
						let e = t$5.target;
						for (; e.parentElement && e.dataset.headlessuiPortal !== "" && !(e.scrollHeight > e.clientHeight || e.scrollWidth > e.clientWidth);) e = e.parentElement;
						e.dataset.headlessuiPortal === "" && t$5.preventDefault();
					} else t$5.preventDefault();
				}
			}, { passive: !1 }), n$1.add(() => {
				var e;
				o$3 !== ((e = (void 0).scrollY) != null ? e : (void 0).pageYOffset) && (void 0).scrollTo(0, o$3), l$2 && l$2.isConnected && (l$2.scrollIntoView({ block: "nearest" }), l$2 = null);
			});
		});
	} } : {};
}
function l$1() {
	return { before({ doc: e, d: o$3 }) {
		o$3.style(e.documentElement, "overflow", "hidden");
	} };
}
function m$1(e) {
	let n$1 = {};
	for (let t$5 of e) Object.assign(n$1, t$5(n$1));
	return n$1;
}
var a = a$1(() => /* @__PURE__ */ new Map(), {
	PUSH(e, n$1) {
		var o$3;
		let t$5 = (o$3 = this.get(e)) != null ? o$3 : {
			doc: e,
			count: 0,
			d: o$2(),
			meta: /* @__PURE__ */ new Set()
		};
		return t$5.count++, t$5.meta.add(n$1), this.set(e, t$5), this;
	},
	POP(e, n$1) {
		let t$5 = this.get(e);
		return t$5 && (t$5.count--, t$5.meta.delete(n$1)), this;
	},
	SCROLL_PREVENT({ doc: e, d: n$1, meta: t$5 }) {
		let o$3 = {
			doc: e,
			d: n$1,
			meta: m$1(t$5)
		}, c$2 = [
			w$1(),
			c$1(),
			l$1()
		];
		c$2.forEach(({ before: r }) => r == null ? void 0 : r(o$3)), c$2.forEach(({ after: r }) => r == null ? void 0 : r(o$3));
	},
	SCROLL_ALLOW({ d: e }) {
		e.dispose();
	},
	TEARDOWN({ doc: e }) {
		this.delete(e);
	}
});
a.subscribe(() => {
	let e = a.getSnapshot(), n$1 = /* @__PURE__ */ new Map();
	for (let [t$5] of e) n$1.set(t$5, t$5.documentElement.style.overflow);
	for (let t$5 of e.values()) {
		let o$3 = n$1.get(t$5.doc) === "hidden", c$2 = t$5.count !== 0;
		(c$2 && !o$3 || !c$2 && o$3) && a.dispatch(t$5.count > 0 ? "SCROLL_PREVENT" : "SCROLL_ALLOW", t$5), t$5.count === 0 && a.dispatch("TEARDOWN", t$5);
	}
});
function d(t$5, a$2, n$1) {
	let i$4 = m(a), l$2 = computed(() => {
		let e = t$5.value ? i$4.value.get(t$5.value) : void 0;
		return e ? e.count > 0 : !1;
	});
	return watch([t$5, a$2], ([e, m$2], [r], o$3) => {
		if (!e || !m$2) return;
		a.dispatch("PUSH", e, n$1);
		let f$1 = !1;
		o$3(() => {
			f$1 || (a.dispatch("POP", r != null ? r : e, n$1), f$1 = !0);
		});
	}, { immediate: !0 }), l$2;
}
var i$3 = /* @__PURE__ */ new Map(), t$1 = /* @__PURE__ */ new Map();
function E$1(d$2, f$1 = ref(!0)) {
	watchEffect((o$3) => {
		var a$2;
		if (!f$1.value) return;
		let e = o$1(d$2);
		if (!e) return;
		o$3(function() {
			var u$4;
			if (!e) return;
			let r = (u$4 = t$1.get(e)) != null ? u$4 : 1;
			if (r === 1 ? t$1.delete(e) : t$1.set(e, r - 1), r !== 1) return;
			let n$1 = i$3.get(e);
			n$1 && (n$1["aria-hidden"] === null ? e.removeAttribute("aria-hidden") : e.setAttribute("aria-hidden", n$1["aria-hidden"]), e.inert = n$1.inert, i$3.delete(e));
		});
		let l$2 = (a$2 = t$1.get(e)) != null ? a$2 : 0;
		t$1.set(e, l$2 + 1), l$2 === 0 && (i$3.set(e, {
			"aria-hidden": e.getAttribute("aria-hidden"),
			inert: e.inert
		}), e.setAttribute("aria-hidden", "true"), e.inert = !0);
	});
}
var u$2 = Symbol("StackContext");
var s$1 = ((e) => (e[e.Add = 0] = "Add", e[e.Remove = 1] = "Remove", e))(s$1 || {});
function y() {
	return inject(u$2, () => {});
}
function R$1({ type: o$3, enabled: r, element: e, onUpdate: i$4 }) {
	let a$2 = y();
	function t$5(...n$1) {
		i$4?.(...n$1), a$2(...n$1);
	}
	provide(u$2, t$5);
}
var Te$1 = ((l$2) => (l$2[l$2.Open = 0] = "Open", l$2[l$2.Closed = 1] = "Closed", l$2))(Te$1 || {});
var H = Symbol("DialogContext");
function T$1(t$5) {
	let i$4 = inject(H, null);
	if (i$4 === null) {
		let l$2 = /* @__PURE__ */ new Error(`<${t$5} /> is missing a parent <Dialog /> component.`);
		throw Error.captureStackTrace && Error.captureStackTrace(l$2, T$1), l$2;
	}
	return i$4;
}
var A$1 = "DC8F892D-2EBD-447C-A4C8-A03058436FF4", Ye = defineComponent({
	name: "Dialog",
	inheritAttrs: !1,
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
		open: {
			type: [Boolean, String],
			default: A$1
		},
		initialFocus: {
			type: Object,
			default: null
		},
		id: {
			type: String,
			default: null
		},
		role: {
			type: String,
			default: "dialog"
		}
	},
	emits: { close: (t$5) => !0 },
	setup(t$5, { emit: i$4, attrs: l$2, slots: p, expose: s$2 }) {
		var q$1, W$2;
		let n$1 = (q$1 = t$5.id) != null ? q$1 : `headlessui-dialog-${i()}`, u$4 = ref(!1);
		let r = !1, g$1 = computed(() => t$5.role === "dialog" || t$5.role === "alertdialog" ? t$5.role : (r || (r = !0, console.warn(`Invalid role [${g$1}] passed to <Dialog />. Only \`dialog\` and and \`alertdialog\` are supported. Using \`dialog\` instead.`)), "dialog")), D = ref(0), S$2 = l(), R$2 = computed(() => t$5.open === A$1 && S$2 !== null ? (S$2.value & i$1.Open) === i$1.Open : t$5.open), m$2 = ref(null), E$2 = computed(() => i$2(m$2));
		if (s$2({
			el: m$2,
			$el: m$2
		}), !(t$5.open !== A$1 || S$2 !== null)) throw new Error("You forgot to provide an `open` prop to the `Dialog`.");
		if (typeof R$2.value != "boolean") throw new Error(`You provided an \`open\` prop to the \`Dialog\`, but the value is not a boolean. Received: ${R$2.value === A$1 ? void 0 : t$5.open}`);
		let c$2 = computed(() => u$4.value && R$2.value ? 0 : 1), k$1 = computed(() => c$2.value === 0), w$2 = computed(() => D.value > 1), N$5 = inject(H, null) !== null, [Q$1, X] = q(), { resolveContainers: B$1, mainTreeNodeRef: K$1, MainTreeNode: Z } = N$2({
			portals: Q$1,
			defaultContainers: [computed(() => {
				var e;
				return (e = h$1.panelRef.value) != null ? e : m$2.value;
			})]
		}), ee = computed(() => w$2.value ? "parent" : "leaf"), U = computed(() => S$2 !== null ? (S$2.value & i$1.Closing) === i$1.Closing : !1), te = computed(() => N$5 || U.value ? !1 : k$1.value);
		E$1(computed(() => {
			var e, a$2, d$2;
			return (d$2 = Array.from((a$2 = (e = E$2.value) == null ? void 0 : e.querySelectorAll("body > *")) != null ? a$2 : []).find((f$1) => f$1.id === "headlessui-portal-root" ? !1 : f$1.contains(o$1(K$1)) && f$1 instanceof HTMLElement)) != null ? d$2 : null;
		}), te);
		let ae = computed(() => w$2.value ? !0 : k$1.value);
		E$1(computed(() => {
			var e, a$2, d$2;
			return (d$2 = Array.from((a$2 = (e = E$2.value) == null ? void 0 : e.querySelectorAll("[data-headlessui-portal]")) != null ? a$2 : []).find((f$1) => f$1.contains(o$1(K$1)) && f$1 instanceof HTMLElement)) != null ? d$2 : null;
		}), ae), R$1({
			type: "Dialog",
			enabled: computed(() => c$2.value === 0),
			element: m$2,
			onUpdate: (e, a$2) => {
				if (a$2 === "Dialog") return u(e, {
					[s$1.Add]: () => D.value += 1,
					[s$1.Remove]: () => D.value -= 1
				});
			}
		});
		let re = k({
			name: "DialogDescription",
			slot: computed(() => ({ open: R$2.value }))
		}), M = ref(null), h$1 = {
			titleId: M,
			panelRef: ref(null),
			dialogState: c$2,
			setTitleId(e) {
				M.value !== e && (M.value = e);
			},
			close() {
				i$4("close", !1);
			}
		};
		provide(H, h$1);
		w(B$1, (e, a$2) => {
			e.preventDefault(), h$1.close(), nextTick(() => a$2 == null ? void 0 : a$2.focus());
		}, computed(() => !(!k$1.value || w$2.value)));
		let ie = computed(() => !(w$2.value || c$2.value !== 0));
		E((W$2 = E$2.value) == null ? void 0 : W$2.defaultView, "keydown", (e) => {
			ie.value && (e.defaultPrevented || e.key === o.Escape && (e.preventDefault(), e.stopPropagation(), h$1.close()));
		});
		return d(E$2, computed(() => !(U.value || c$2.value !== 0 || N$5)), (e) => {
			var a$2;
			return { containers: [...(a$2 = e.containers) != null ? a$2 : [], B$1] };
		}), watchEffect((e) => {
			if (c$2.value !== 0) return;
			let a$2 = o$1(m$2);
			if (!a$2) return;
			let d$2 = new ResizeObserver((f$1) => {
				for (let L$1 of f$1) {
					let x = L$1.target.getBoundingClientRect();
					x.x === 0 && x.y === 0 && x.width === 0 && x.height === 0 && h$1.close();
				}
			});
			d$2.observe(a$2), e(() => d$2.disconnect());
		}), () => {
			let { open: e, initialFocus: a$2,...d$2 } = t$5, f$1 = {
				...l$2,
				ref: m$2,
				id: n$1,
				role: g$1.value,
				"aria-modal": c$2.value === 0 ? !0 : void 0,
				"aria-labelledby": M.value,
				"aria-describedby": re.value
			}, L$1 = { open: c$2.value === 0 };
			return h(u$1, { force: !0 }, () => [h($, () => h(z, { target: m$2.value }, () => h(u$1, { force: !1 }, () => h(ue, {
				initialFocus: a$2,
				containers: B$1,
				features: k$1.value ? u(ee.value, {
					parent: ue.features.RestoreFocus,
					leaf: ue.features.All & ~ue.features.FocusLock
				}) : ue.features.None
			}, () => h(X, {}, () => A({
				ourProps: f$1,
				theirProps: {
					...d$2,
					...l$2
				},
				slot: L$1,
				attrs: l$2,
				slots: p,
				visible: c$2.value === 0,
				features: N.RenderStrategy | N.Static,
				name: "Dialog"
			})))))), h(Z)]);
		};
	}
});
defineComponent({
	name: "DialogOverlay",
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(t$5, { attrs: i$4, slots: l$2 }) {
		var u$4;
		let p = (u$4 = t$5.id) != null ? u$4 : `headlessui-dialog-overlay-${i()}`, s$2 = T$1("DialogOverlay");
		function n$1(r) {
			r.target === r.currentTarget && (r.preventDefault(), r.stopPropagation(), s$2.close());
		}
		return () => {
			let { ...r } = t$5;
			return A({
				ourProps: {
					id: p,
					"aria-hidden": !0,
					onClick: n$1
				},
				theirProps: r,
				slot: { open: s$2.dialogState.value === 0 },
				attrs: i$4,
				slots: l$2,
				name: "DialogOverlay"
			});
		};
	}
});
defineComponent({
	name: "DialogBackdrop",
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		id: {
			type: String,
			default: null
		}
	},
	inheritAttrs: !1,
	setup(t$5, { attrs: i$4, slots: l$2, expose: p }) {
		var r;
		let s$2 = (r = t$5.id) != null ? r : `headlessui-dialog-backdrop-${i()}`, n$1 = T$1("DialogBackdrop"), u$4 = ref(null);
		return p({
			el: u$4,
			$el: u$4
		}), () => {
			let { ...g$1 } = t$5, D = {
				id: s$2,
				ref: u$4,
				"aria-hidden": !0
			};
			return h(u$1, { force: !0 }, () => h($, () => A({
				ourProps: D,
				theirProps: {
					...i$4,
					...g$1
				},
				slot: { open: n$1.dialogState.value === 0 },
				attrs: i$4,
				slots: l$2,
				name: "DialogBackdrop"
			})));
		};
	}
});
var Ge = defineComponent({
	name: "DialogPanel",
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(t$5, { attrs: i$4, slots: l$2, expose: p }) {
		var r;
		let s$2 = (r = t$5.id) != null ? r : `headlessui-dialog-panel-${i()}`, n$1 = T$1("DialogPanel");
		p({
			el: n$1.panelRef,
			$el: n$1.panelRef
		});
		function u$4(g$1) {
			g$1.stopPropagation();
		}
		return () => {
			let { ...g$1 } = t$5;
			return A({
				ourProps: {
					id: s$2,
					ref: n$1.panelRef,
					onClick: u$4
				},
				theirProps: g$1,
				slot: { open: n$1.dialogState.value === 0 },
				attrs: i$4,
				slots: l$2,
				name: "DialogPanel"
			});
		};
	}
});
defineComponent({
	name: "DialogTitle",
	props: {
		as: {
			type: [Object, String],
			default: "h2"
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(t$5, { attrs: i$4, slots: l$2 }) {
		var n$1;
		let p = (n$1 = t$5.id) != null ? n$1 : `headlessui-dialog-title-${i()}`, s$2 = T$1("DialogTitle");
		return () => {
			let { ...u$4 } = t$5;
			return A({
				ourProps: { id: p },
				theirProps: u$4,
				slot: { open: s$2.dialogState.value === 0 },
				attrs: i$4,
				slots: l$2,
				name: "DialogTitle"
			});
		};
	}
});
function g(e = "") {
	return e.split(/\s+/).filter((t$5) => t$5.length > 1);
}
var R = Symbol("TransitionContext");
var pe = ((a$2) => (a$2.Visible = "visible", a$2.Hidden = "hidden", a$2))(pe || {});
function me() {
	return inject(R, null) !== null;
}
function Te() {
	let e = inject(R, null);
	if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
	return e;
}
function ge() {
	let e = inject(N$1, null);
	if (e === null) throw new Error("A <TransitionChild /> is used but it is missing a parent <TransitionRoot />.");
	return e;
}
var N$1 = Symbol("NestingContext");
function L(e) {
	return "children" in e ? L(e.children) : e.value.filter(({ state: t$5 }) => t$5 === "visible").length > 0;
}
function Q(e) {
	let t$5 = ref([]), a$2 = ref(!1);
	function s$2(n$1, r = S.Hidden) {
		let l$2 = t$5.value.findIndex(({ id: f$1 }) => f$1 === n$1);
		l$2 !== -1 && (u(r, {
			[S.Unmount]() {
				t$5.value.splice(l$2, 1);
			},
			[S.Hidden]() {
				t$5.value[l$2].state = "hidden";
			}
		}), !L(t$5) && a$2.value && e?.());
	}
	function h$1(n$1) {
		let r = t$5.value.find(({ id: l$2 }) => l$2 === n$1);
		return r ? r.state !== "visible" && (r.state = "visible") : t$5.value.push({
			id: n$1,
			state: "visible"
		}), () => s$2(n$1, S.Unmount);
	}
	return {
		children: t$5,
		register: h$1,
		unregister: s$2
	};
}
var W = N.RenderStrategy, he = defineComponent({
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		show: {
			type: [Boolean],
			default: null
		},
		unmount: {
			type: [Boolean],
			default: !0
		},
		appear: {
			type: [Boolean],
			default: !1
		},
		enter: {
			type: [String],
			default: ""
		},
		enterFrom: {
			type: [String],
			default: ""
		},
		enterTo: {
			type: [String],
			default: ""
		},
		entered: {
			type: [String],
			default: ""
		},
		leave: {
			type: [String],
			default: ""
		},
		leaveFrom: {
			type: [String],
			default: ""
		},
		leaveTo: {
			type: [String],
			default: ""
		}
	},
	emits: {
		beforeEnter: () => !0,
		afterEnter: () => !0,
		beforeLeave: () => !0,
		afterLeave: () => !0
	},
	setup(e, { emit: t$5, attrs: a$2, slots: s$2, expose: h$1 }) {
		let n$1 = ref(0);
		function r() {
			n$1.value |= i$1.Opening, t$5("beforeEnter");
		}
		function l$2() {
			n$1.value &= ~i$1.Opening, t$5("afterEnter");
		}
		function f$1() {
			n$1.value |= i$1.Closing, t$5("beforeLeave");
		}
		function S$2() {
			n$1.value &= ~i$1.Closing, t$5("afterLeave");
		}
		if (!me() && s()) return () => h(Se, {
			...e,
			onBeforeEnter: r,
			onAfterEnter: l$2,
			onBeforeLeave: f$1,
			onAfterLeave: S$2
		}, s$2);
		let d$2 = ref(null), y$1 = computed(() => e.unmount ? S.Unmount : S.Hidden);
		h$1({
			el: d$2,
			$el: d$2
		});
		let { show: v, appear: A$3 } = Te(), { register: D, unregister: H$1 } = ge(), i$4 = ref(v.value ? "visible" : "hidden"), c$2 = i(), b = { value: !1 }, P$1 = Q(() => {
			!b.value && i$4.value !== "hidden" && (i$4.value = "hidden", H$1(c$2), S$2());
		});
		watchEffect(() => {
			if (y$1.value === S.Hidden && c$2) {
				if (v.value && i$4.value !== "visible") {
					i$4.value = "visible";
					return;
				}
				u(i$4.value, {
					["hidden"]: () => H$1(c$2),
					["visible"]: () => D(c$2)
				});
			}
		});
		let j = g(e.enter), M = g(e.enterFrom);
		g(e.enterTo);
		g(e.entered);
		g(e.leave);
		g(e.leaveFrom);
		g(e.leaveTo);
		return provide(N$1, P$1), t(computed(() => u(i$4.value, {
			["visible"]: i$1.Open,
			["hidden"]: i$1.Closed
		}) | n$1.value)), () => {
			let { appear: o$3, show: E$2, enter: p, enterFrom: V, enterTo: Ce, entered: ye, leave: be, leaveFrom: Ee, leaveTo: Ve$1,...U } = e, ne = { ref: d$2 };
			return A({
				theirProps: {
					...U,
					...A$3.value && v.value && c.isServer ? { class: normalizeClass([
						a$2.class,
						U.class,
						...j,
						...M
					]) } : {}
				},
				ourProps: ne,
				slot: {},
				slots: s$2,
				attrs: a$2,
				features: W,
				visible: i$4.value === "visible",
				name: "TransitionChild"
			});
		};
	}
}), ce = he, Se = defineComponent({
	inheritAttrs: !1,
	props: {
		as: {
			type: [Object, String],
			default: "div"
		},
		show: {
			type: [Boolean],
			default: null
		},
		unmount: {
			type: [Boolean],
			default: !0
		},
		appear: {
			type: [Boolean],
			default: !1
		},
		enter: {
			type: [String],
			default: ""
		},
		enterFrom: {
			type: [String],
			default: ""
		},
		enterTo: {
			type: [String],
			default: ""
		},
		entered: {
			type: [String],
			default: ""
		},
		leave: {
			type: [String],
			default: ""
		},
		leaveFrom: {
			type: [String],
			default: ""
		},
		leaveTo: {
			type: [String],
			default: ""
		}
	},
	emits: {
		beforeEnter: () => !0,
		afterEnter: () => !0,
		beforeLeave: () => !0,
		afterLeave: () => !0
	},
	setup(e, { emit: t$5, attrs: a$2, slots: s$2 }) {
		let h$1 = l(), n$1 = computed(() => e.show === null && h$1 !== null ? (h$1.value & i$1.Open) === i$1.Open : e.show);
		watchEffect(() => {
			if (![!0, !1].includes(n$1.value)) throw new Error("A <Transition /> is used but it is missing a `:show=\"true | false\"` prop.");
		});
		let r = ref(n$1.value ? "visible" : "hidden"), l$2 = Q(() => {
			r.value = "hidden";
		}), f$1 = ref(!0), S$2 = {
			show: n$1,
			appear: computed(() => e.appear || !f$1.value)
		};
		return provide(N$1, l$2), provide(R, S$2), () => {
			let d$2 = T(e, [
				"show",
				"appear",
				"unmount",
				"onBeforeEnter",
				"onBeforeLeave",
				"onAfterEnter",
				"onAfterLeave"
			]), y$1 = { unmount: e.unmount };
			return A({
				ourProps: {
					...y$1,
					as: "template"
				},
				theirProps: {},
				slot: {},
				slots: {
					...s$2,
					default: () => [h(ce, {
						onBeforeEnter: () => t$5("beforeEnter"),
						onAfterEnter: () => t$5("afterEnter"),
						onBeforeLeave: () => t$5("beforeLeave"),
						onAfterLeave: () => t$5("afterLeave"),
						...a$2,
						...y$1,
						...d$2
					}, s$2.default)]
				},
				attrs: {},
				features: W,
				visible: r.value === "visible",
				name: "Transition"
			});
		};
	}
});
export { Ye as i, he as n, Ge as r, Se as t };

//# sourceMappingURL=transition-CG5tIsRm.js.map