import { l as i, n as A } from "./keyboard-CvjRf4Wb.js";
import { computed, defineComponent, inject, provide, ref, unref } from "vue";
var u = Symbol("DescriptionContext");
function w() {
	let t = inject(u, null);
	if (t === null) throw new Error("Missing parent");
	return t;
}
function k({ slot: t = ref({}), name: o = "Description", props: s = {} } = {}) {
	let e = ref([]);
	function r(n) {
		return e.value.push(n), () => {
			let i$1 = e.value.indexOf(n);
			i$1 !== -1 && e.value.splice(i$1, 1);
		};
	}
	return provide(u, {
		register: r,
		slot: t,
		name: o,
		props: s
	}), computed(() => e.value.length > 0 ? e.value.join(" ") : void 0);
}
var K = defineComponent({
	name: "Description",
	props: {
		as: {
			type: [Object, String],
			default: "p"
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(t, { attrs: o, slots: s }) {
		var n;
		let e = (n = t.id) != null ? n : `headlessui-description-${i()}`, r = w();
		return () => {
			let { name: i$1 = "Description", slot: l = ref({}), props: d = {} } = r, { ...c } = t;
			return A({
				ourProps: {
					...Object.entries(d).reduce((a, [g, m]) => Object.assign(a, { [g]: unref(m) }), {}),
					id: e
				},
				theirProps: c,
				slot: l.value,
				attrs: o,
				slots: s,
				name: i$1
			});
		};
	}
});
export { k as n, K as t };

//# sourceMappingURL=description-Y4p4EFv6.js.map