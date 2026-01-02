import { c as o } from "./keyboard-CvjRf4Wb.js";
import { c as h$1, f as c, u as w } from "./focus-management-DFaZHIRF.js";
import { computed, ref, watchEffect } from "vue";
function t() {
	return /iPhone/gi.test((void 0).navigator.platform) || /Mac/gi.test((void 0).navigator.platform) && (void 0).navigator.maxTouchPoints > 0;
}
function i() {
	return /Android/gi.test((void 0).navigator.userAgent);
}
function n() {
	return t() || i();
}
function u(e, t$1, n$1) {
	c.isServer || watchEffect((o$1) => {
		(void 0).addEventListener(e, t$1, n$1), o$1(() => (void 0).removeEventListener(e, t$1, n$1));
	});
}
function w$1(e, n$1, t$1) {
	c.isServer || watchEffect((o$1) => {
		(void 0).addEventListener(e, n$1, t$1), o$1(() => (void 0).removeEventListener(e, n$1, t$1));
	});
}
function w$2(f, m, l = computed(() => !0)) {
	function a(e, r) {
		if (!l.value || e.defaultPrevented) return;
		let t$1 = r(e);
		if (t$1 === null || !t$1.getRootNode().contains(t$1)) return;
		let c$1 = function o$1(n$1) {
			return typeof n$1 == "function" ? o$1(n$1()) : Array.isArray(n$1) || n$1 instanceof Set ? n$1 : [n$1];
		}(f);
		for (let o$1 of c$1) {
			if (o$1 === null) continue;
			let n$1 = o$1 instanceof HTMLElement ? o$1 : o(o$1);
			if (n$1 != null && n$1.contains(t$1) || e.composed && e.composedPath().includes(n$1)) return;
		}
		return !w(t$1, h$1.Loose) && t$1.tabIndex !== -1 && e.preventDefault(), m(e, t$1);
	}
	let u$1 = ref(null);
	u("pointerdown", (e) => {
		var r, t$1;
		l.value && (u$1.value = ((t$1 = (r = e.composedPath) == null ? void 0 : r.call(e)) == null ? void 0 : t$1[0]) || e.target);
	}, !0), u("mousedown", (e) => {
		var r, t$1;
		l.value && (u$1.value = ((t$1 = (r = e.composedPath) == null ? void 0 : r.call(e)) == null ? void 0 : t$1[0]) || e.target);
	}, !0), u("click", (e) => {
		n() || u$1.value && (a(e, () => u$1.value), u$1.value = null);
	}, !0), u("touchend", (e) => a(e, () => e.target instanceof HTMLElement ? e.target : null), !0), w$1("blur", (e) => a(e, () => (void 0).document.activeElement instanceof HTMLIFrameElement ? (void 0).document.activeElement : null), !0);
}
export { t as i, w$1 as n, n as r, w$2 as t };

//# sourceMappingURL=use-outside-click-B4rja7ys.js.map