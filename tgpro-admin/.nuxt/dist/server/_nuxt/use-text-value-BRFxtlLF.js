import { c as o } from "./keyboard-CvjRf4Wb.js";
import { ref } from "vue";
var a = /([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g;
function o$1(e) {
	var r, i;
	let n = (r = e.innerText) != null ? r : "", t = e.cloneNode(!0);
	if (!(t instanceof HTMLElement)) return n;
	let u = !1;
	for (let f of t.querySelectorAll("[hidden],[aria-hidden],[role=\"img\"]")) f.remove(), u = !0;
	let l = u ? (i = t.innerText) != null ? i : "" : n;
	return a.test(l) && (l = l.replace(a, "")), l;
}
function g(e) {
	let n = e.getAttribute("aria-label");
	if (typeof n == "string") return n.trim();
	let t = e.getAttribute("aria-labelledby");
	if (t) {
		let u = t.split(" ").map((l) => {
			let r = (void 0).getElementById(l);
			if (r) {
				let i = r.getAttribute("aria-label");
				return typeof i == "string" ? i.trim() : o$1(r).trim();
			}
			return null;
		}).filter(Boolean);
		if (u.length > 0) return u.join(", ");
	}
	return o$1(e).trim();
}
function p(a$1) {
	let t = ref(""), r = ref("");
	return () => {
		let e = o(a$1);
		if (!e) return "";
		let l = e.innerText;
		if (t.value === l) return r.value;
		let u = g(e).trim().toLowerCase();
		return t.value = l, r.value = u, u;
	};
}
export { p as t };

//# sourceMappingURL=use-text-value-BRFxtlLF.js.map