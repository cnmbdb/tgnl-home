import { c as o, n as A } from "./keyboard-CvjRf4Wb.js";
import { d as i, f as c } from "./focus-management-DFaZHIRF.js";
import { n as w } from "./use-outside-click-B4rja7ys.js";
import { n as u$1, t as f$1 } from "./hidden-Bsn3DsxF.js";
import { Teleport, computed, defineComponent, getCurrentInstance, h, inject, provide, reactive, ref, watch, watchEffect } from "vue";
function E(n$1, e$1, o$1, r) {
	c.isServer || watchEffect((t) => {
		n$1 = n$1 != null ? n$1 : void 0, n$1.addEventListener(e$1, o$1, r), t(() => n$1.removeEventListener(e$1, o$1, r));
	});
}
var d$1 = ((r) => (r[r.Forwards = 0] = "Forwards", r[r.Backwards = 1] = "Backwards", r))(d$1 || {});
function n() {
	let o$1 = ref(0);
	return w("keydown", (e$1) => {
		e$1.key === "Tab" && (o$1.value = e$1.shiftKey ? 1 : 0);
	}), o$1;
}
function N({ defaultContainers: o$1 = [], portals: i$1, mainTreeNodeRef: H$1 } = {}) {
	let t = ref(null), r = i(t);
	function u$2() {
		var l, f$2, a;
		let n$1 = [];
		for (let e$1 of o$1) e$1 !== null && (e$1 instanceof HTMLElement ? n$1.push(e$1) : "value" in e$1 && e$1.value instanceof HTMLElement && n$1.push(e$1.value));
		if (i$1 != null && i$1.value) for (let e$1 of i$1.value) n$1.push(e$1);
		for (let e$1 of (l = r == null ? void 0 : r.querySelectorAll("html > *, body > *")) != null ? l : []) e$1 !== (void 0).body && e$1 !== (void 0).head && e$1 instanceof HTMLElement && e$1.id !== "headlessui-portal-root" && (e$1.contains(o(t)) || e$1.contains((a = (f$2 = o(t)) == null ? void 0 : f$2.getRootNode()) == null ? void 0 : a.host) || n$1.some((M$1) => e$1.contains(M$1)) || n$1.push(e$1));
		return n$1;
	}
	return {
		resolveContainers: u$2,
		contains(n$1) {
			return u$2().some((l) => l.contains(n$1));
		},
		mainTreeNodeRef: t,
		MainTreeNode() {
			return H$1 != null ? null : h(f$1, {
				features: u$1.Hidden,
				ref: t
			});
		}
	};
}
function v() {
	let o$1 = ref(null);
	return {
		mainTreeNodeRef: o$1,
		MainTreeNode() {
			return h(f$1, {
				features: u$1.Hidden,
				ref: o$1
			});
		}
	};
}
var e = Symbol("ForcePortalRootContext");
function s() {
	return inject(e, !1);
}
var u = defineComponent({
	name: "ForcePortalRoot",
	props: {
		as: {
			type: [Object, String],
			default: "template"
		},
		force: {
			type: Boolean,
			default: !1
		}
	},
	setup(o$1, { slots: t, attrs: r }) {
		return provide(e, o$1.force), () => {
			let { force: f$2,...n$1 } = o$1;
			return A({
				theirProps: n$1,
				ourProps: {},
				slot: {},
				slots: t,
				attrs: r,
				name: "ForcePortalRoot"
			});
		};
	}
});
function x(e$1) {
	let t = i(e$1);
	if (!t) {
		if (e$1 === null) return null;
		throw new Error(`[Headless UI]: Cannot find ownerDocument for contextElement: ${e$1}`);
	}
	let l = t.getElementById("headlessui-portal-root");
	if (l) return l;
	let r = t.createElement("div");
	return r.setAttribute("id", "headlessui-portal-root"), t.body.appendChild(r);
}
var f = /* @__PURE__ */ new WeakMap();
function U(e$1) {
	var t;
	return (t = f.get(e$1)) != null ? t : 0;
}
function M(e$1, t) {
	let l = t(U(e$1));
	return l <= 0 ? f.delete(e$1) : f.set(e$1, l), l;
}
var $ = defineComponent({
	name: "Portal",
	props: { as: {
		type: [Object, String],
		default: "div"
	} },
	setup(e$1, { slots: t, attrs: l }) {
		let r = ref(null);
		computed(() => i(r));
		let o$1 = s(), u$2 = inject(H, null), n$1 = ref(o$1 === !0 || u$2 == null ? x(r.value) : u$2.resolveTarget());
		n$1.value && M(n$1.value, (a) => a + 1);
		let c$1 = ref(!1);
		watchEffect(() => {
			o$1 || u$2 != null && (n$1.value = u$2.resolveTarget());
		});
		let v$1 = inject(d, null), g = !1;
		getCurrentInstance();
		return watch(r, () => {
			if (g || !v$1) return;
			o(r) && (g = !0);
		}), () => {
			if (!c$1.value || n$1.value === null) return null;
			let a = {
				ref: r,
				"data-headlessui-portal": ""
			};
			return h(Teleport, { to: n$1.value }, A({
				ourProps: a,
				theirProps: e$1,
				slot: {},
				attrs: l,
				slots: t,
				name: "Portal"
			}));
		};
	}
}), d = Symbol("PortalParentContext");
function q() {
	let e$1 = inject(d, null), t = ref([]);
	function l(o$1) {
		return t.value.push(o$1), e$1 && e$1.register(o$1), () => r(o$1);
	}
	function r(o$1) {
		let u$2 = t.value.indexOf(o$1);
		u$2 !== -1 && t.value.splice(u$2, 1), e$1 && e$1.unregister(o$1);
	}
	let i$1 = {
		register: l,
		unregister: r,
		portals: t
	};
	return [t, defineComponent({
		name: "PortalWrapper",
		setup(o$1, { slots: u$2 }) {
			return provide(d, i$1), () => {
				var n$1;
				return (n$1 = u$2.default) == null ? void 0 : n$1.call(u$2);
			};
		}
	})];
}
var H = Symbol("PortalGroupContext"), z = defineComponent({
	name: "PortalGroup",
	props: {
		as: {
			type: [Object, String],
			default: "template"
		},
		target: {
			type: Object,
			default: null
		}
	},
	setup(e$1, { attrs: t, slots: l }) {
		return provide(H, reactive({ resolveTarget() {
			return e$1.target;
		} })), () => {
			let { target: i$1,...o$1 } = e$1;
			return A({
				theirProps: o$1,
				ourProps: {},
				slot: {},
				attrs: t,
				slots: l,
				name: "PortalGroup"
			});
		};
	}
});
export { N as a, n as c, u as i, E as l, q as n, v as o, z as r, d$1 as s, $ as t };

//# sourceMappingURL=portal-BLTG7ywv.js.map