import { inject, provide } from "vue";
var n = Symbol("Context");
var i = ((e) => (e[e.Open = 1] = "Open", e[e.Closed = 2] = "Closed", e[e.Closing = 4] = "Closing", e[e.Opening = 8] = "Opening", e))(i || {});
function s() {
	return l() !== null;
}
function l() {
	return inject(n, null);
}
function t(o) {
	provide(n, o);
}
export { t as i, l as n, s as r, i as t };

//# sourceMappingURL=open-closed-Dsm1EOia.js.map