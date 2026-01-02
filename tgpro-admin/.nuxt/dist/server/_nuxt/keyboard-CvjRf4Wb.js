import * as e from "vue";
import { Fragment, cloneVNode, h } from "vue";
var r;
var n = Symbol("headlessui.useid"), o$2 = 0;
var i = (r = e.useId) != null ? r : function() {
	return e.inject(n, () => `${++o$2}`)();
};
function s(t) {
	e.provide(n, t);
}
function o$1(e$1) {
	var l;
	if (e$1 == null || e$1.value == null) return null;
	let n$1 = (l = e$1.value.$el) != null ? l : e$1.value;
	return n$1 instanceof Node ? n$1 : null;
}
function u(r$1, n$1, ...a) {
	if (r$1 in n$1) {
		let e$1 = n$1[r$1];
		return typeof e$1 == "function" ? e$1(...a) : e$1;
	}
	let t = /* @__PURE__ */ new Error(`Tried to handle "${r$1}" but there is no handler defined. Only defined handlers are: ${Object.keys(n$1).map((e$1) => `"${e$1}"`).join(", ")}.`);
	throw Error.captureStackTrace && Error.captureStackTrace(t, u), t;
}
var N = ((o$3) => (o$3[o$3.None = 0] = "None", o$3[o$3.RenderStrategy = 1] = "RenderStrategy", o$3[o$3.Static = 2] = "Static", o$3))(N || {}), S = ((e$1) => (e$1[e$1.Unmount = 0] = "Unmount", e$1[e$1.Hidden = 1] = "Hidden", e$1))(S || {});
function A({ visible: r$1 = !0, features: t = 0, ourProps: e$1, theirProps: o$3,...i$1 }) {
	var a;
	let n$1 = j(o$3, e$1), l = Object.assign(i$1, { props: n$1 });
	if (r$1 || t & 2 && n$1.static) return y(l);
	if (t & 1) return u((a = n$1.unmount) == null || a ? 0 : 1, {
		[0]() {
			return null;
		},
		[1]() {
			return y({
				...i$1,
				props: {
					...n$1,
					hidden: !0,
					style: { display: "none" }
				}
			});
		}
	});
	return y(l);
}
function y({ props: r$1, attrs: t, slots: e$1, slot: o$3, name: i$1 }) {
	var m, h$1;
	let { as: n$1,...l } = T(r$1, ["unmount", "static"]), a = (m = e$1.default) == null ? void 0 : m.call(e$1, o$3), d = {};
	if (o$3) {
		let u$1 = !1, c = [];
		for (let [p, f] of Object.entries(o$3)) typeof f == "boolean" && (u$1 = !0), f === !0 && c.push(p);
		u$1 && (d["data-headlessui-state"] = c.join(" "));
	}
	if (n$1 === "template") {
		if (a = b(a != null ? a : []), Object.keys(l).length > 0 || Object.keys(t).length > 0) {
			let [u$1, ...c] = a != null ? a : [];
			if (!v(u$1) || c.length > 0) throw new Error([
				"Passing props on \"template\"!",
				"",
				`The current component <${i$1} /> is rendering a "template".`,
				"However we need to passthrough the following props:",
				Object.keys(l).concat(Object.keys(t)).map((s$1) => s$1.trim()).filter((s$1, g, R) => R.indexOf(s$1) === g).sort((s$1, g) => s$1.localeCompare(g)).map((s$1) => `  - ${s$1}`).join(`
`),
				"",
				"You can apply a few solutions:",
				["Add an `as=\"...\"` prop, to ensure that we render an actual element instead of a \"template\".", "Render a single element as the child so that we can forward the props onto that element."].map((s$1) => `  - ${s$1}`).join(`
`)
			].join(`
`));
			let p = j((h$1 = u$1.props) != null ? h$1 : {}, l, d), f = cloneVNode(u$1, p, !0);
			for (let s$1 in p) s$1.startsWith("on") && (f.props || (f.props = {}), f.props[s$1] = p[s$1]);
			return f;
		}
		return Array.isArray(a) && a.length === 1 ? a[0] : a;
	}
	return h(n$1, Object.assign({}, l, d), { default: () => a });
}
function b(r$1) {
	return r$1.flatMap((t) => t.type === Fragment ? b(t.children) : [t]);
}
function j(...r$1) {
	if (r$1.length === 0) return {};
	if (r$1.length === 1) return r$1[0];
	let t = {}, e$1 = {};
	for (let i$1 of r$1) for (let n$1 in i$1) n$1.startsWith("on") && typeof i$1[n$1] == "function" ? (e$1[n$1] ?? (e$1[n$1] = []), e$1[n$1].push(i$1[n$1])) : t[n$1] = i$1[n$1];
	if (t.disabled || t["aria-disabled"]) return Object.assign(t, Object.fromEntries(Object.keys(e$1).map((i$1) => [i$1, void 0])));
	for (let i$1 in e$1) Object.assign(t, { [i$1](n$1, ...l) {
		let a = e$1[i$1];
		for (let d of a) {
			if (n$1 instanceof Event && n$1.defaultPrevented) return;
			d(n$1, ...l);
		}
	} });
	return t;
}
function E(r$1) {
	let t = Object.assign({}, r$1);
	for (let e$1 in t) t[e$1] === void 0 && delete t[e$1];
	return t;
}
function T(r$1, t = []) {
	let e$1 = Object.assign({}, r$1);
	for (let o$3 of t) o$3 in e$1 && delete e$1[o$3];
	return e$1;
}
function v(r$1) {
	return r$1 == null ? !1 : typeof r$1.type == "string" || typeof r$1.type == "object" || typeof r$1.type == "function";
}
var o = ((r$1) => (r$1.Space = " ", r$1.Enter = "Enter", r$1.Escape = "Escape", r$1.Backspace = "Backspace", r$1.Delete = "Delete", r$1.ArrowLeft = "ArrowLeft", r$1.ArrowUp = "ArrowUp", r$1.ArrowRight = "ArrowRight", r$1.ArrowDown = "ArrowDown", r$1.Home = "Home", r$1.End = "End", r$1.PageUp = "PageUp", r$1.PageDown = "PageDown", r$1.Tab = "Tab", r$1))(o || {});
export { S as a, o$1 as c, N as i, i as l, A as n, T as o, E as r, u as s, o as t, s as u };

//# sourceMappingURL=keyboard-CvjRf4Wb.js.map