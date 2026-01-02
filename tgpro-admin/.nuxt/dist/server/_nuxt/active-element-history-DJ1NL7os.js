import { t as t$2 } from "./micro-task-CYdHJ3PN.js";
function o() {
	let a = [], s = {
		addEventListener(e, t$3, r, i) {
			return e.addEventListener(t$3, r, i), s.add(() => e.removeEventListener(t$3, r, i));
		},
		requestAnimationFrame(...e) {
			let t$3 = requestAnimationFrame(...e);
			s.add(() => cancelAnimationFrame(t$3));
		},
		nextFrame(...e) {
			s.requestAnimationFrame(() => {
				s.requestAnimationFrame(...e);
			});
		},
		setTimeout(...e) {
			let t$3 = setTimeout(...e);
			s.add(() => clearTimeout(t$3));
		},
		microTask(...e) {
			let t$3 = { current: !0 };
			return t$2(() => {
				t$3.current && e[0]();
			}), s.add(() => {
				t$3.current = !1;
			});
		},
		style(e, t$3, r) {
			let i = e.style.getPropertyValue(t$3);
			return Object.assign(e.style, { [t$3]: r }), this.add(() => {
				Object.assign(e.style, { [t$3]: i });
			});
		},
		group(e) {
			let t$3 = o();
			return e(t$3), this.add(() => t$3.dispose());
		},
		add(e) {
			return a.push(e), () => {
				let t$3 = a.indexOf(e);
				if (t$3 >= 0) for (let r of a.splice(t$3, 1)) r();
			};
		},
		dispose() {
			for (let e of a.splice(0)) e();
		}
	};
	return s;
}
function t(n) {
	function e() {
		(void 0).readyState !== "loading" && (n(), (void 0).removeEventListener("DOMContentLoaded", e));
	}
}
var t$1 = [];
t(() => {
	function e(n) {
		n.target instanceof HTMLElement && n.target !== (void 0).body && t$1[0] !== n.target && (t$1.unshift(n.target), t$1 = t$1.filter((r) => r != null && r.isConnected), t$1.splice(10));
	}
	(void 0).addEventListener("click", e, { capture: !0 }), (void 0).addEventListener("mousedown", e, { capture: !0 }), (void 0).addEventListener("focus", e, { capture: !0 }), (void 0).body.addEventListener("click", e, { capture: !0 }), (void 0).body.addEventListener("mousedown", e, { capture: !0 }), (void 0).body.addEventListener("focus", e, { capture: !0 });
});
export { o as n, t$1 as t };

//# sourceMappingURL=active-element-history-DJ1NL7os.js.map