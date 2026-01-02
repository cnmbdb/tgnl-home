import { r as d, t as e } from "./form-1BInePM-.js";
import { n as o$1, t as t$2 } from "./active-element-history-DJ1NL7os.js";
import { c as o$2, i as N, l as i, n as A, o as T, r as E, s as u$2, t as o } from "./keyboard-CvjRf4Wb.js";
import { d as i$3, r as O } from "./focus-management-DFaZHIRF.js";
import { r as n, t as w } from "./use-outside-click-B4rja7ys.js";
import { t as s } from "./use-resolve-button-type-eioNRL5V.js";
import { i as u, n as f$1, r as i$1, t as c } from "./calculate-active-index-B5ynhl2N.js";
import { n as u$1, t as f } from "./hidden-Bsn3DsxF.js";
import { i as t$1, n as l, t as i$2 } from "./open-closed-Dsm1EOia.js";
import { Fragment, cloneVNode, computed, defineComponent, h, inject, nextTick, provide, reactive, ref, toRaw, watch, watchEffect } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
function i$4() {
	return o$1();
}
function t() {
	let e$1 = i$4();
	return (o$3) => {
		e$1.dispose(), e$1.nextFrame(o$3);
	};
}
var g = ((f$2) => (f$2[f$2.Left = 0] = "Left", f$2[f$2.Right = 2] = "Right", f$2))(g || {});
function De(a, h$1) {
	return a === h$1;
}
var Ee = ((r) => (r[r.Open = 0] = "Open", r[r.Closed = 1] = "Closed", r))(Ee || {}), Ve = ((r) => (r[r.Single = 0] = "Single", r[r.Multi = 1] = "Multi", r))(Ve || {}), ke = ((y) => (y[y.Pointer = 0] = "Pointer", y[y.Focus = 1] = "Focus", y[y.Other = 2] = "Other", y))(ke || {});
var ne = Symbol("ComboboxContext");
function K(a) {
	let h$1 = inject(ne, null);
	if (h$1 === null) {
		let r = /* @__PURE__ */ new Error(`<${a} /> is missing a parent <Combobox /> component.`);
		throw Error.captureStackTrace && Error.captureStackTrace(r, K), r;
	}
	return h$1;
}
var ie = Symbol("VirtualContext"), Ae = defineComponent({
	name: "VirtualProvider",
	setup(a, { slots: h$1 }) {
		let r = K("VirtualProvider"), y = computed(() => {
			let c$1 = o$2(r.optionsRef);
			if (!c$1) return {
				start: 0,
				end: 0
			};
			let f$2 = (void 0).getComputedStyle(c$1);
			return {
				start: parseFloat(f$2.paddingBlockStart || f$2.paddingTop),
				end: parseFloat(f$2.paddingBlockEnd || f$2.paddingBottom)
			};
		}), o$3 = useVirtualizer(computed(() => ({
			scrollPaddingStart: y.value.start,
			scrollPaddingEnd: y.value.end,
			count: r.virtual.value.options.length,
			estimateSize() {
				return 40;
			},
			getScrollElement() {
				return o$2(r.optionsRef);
			},
			overscan: 12
		}))), u$3 = computed(() => {
			var c$1;
			return (c$1 = r.virtual.value) == null ? void 0 : c$1.options;
		}), e$1 = ref(0);
		return watch([u$3], () => {
			e$1.value += 1;
		}), provide(ie, r.virtual.value ? o$3 : null), () => [h("div", {
			style: {
				position: "relative",
				width: "100%",
				height: `${o$3.value.getTotalSize()}px`
			},
			ref: (c$1) => {
				if (c$1) {
					if (typeof process != "undefined" && process.env.JEST_WORKER_ID !== void 0 || r.activationTrigger.value === 0) return;
					r.activeOptionIndex.value !== null && r.virtual.value.options.length > r.activeOptionIndex.value && o$3.value.scrollToIndex(r.activeOptionIndex.value);
				}
			}
		}, o$3.value.getVirtualItems().map((c$1) => cloneVNode(h$1.default({
			option: r.virtual.value.options[c$1.index],
			open: r.comboboxState.value === 0
		})[0], {
			key: `${e$1.value}-${c$1.index}`,
			"data-index": c$1.index,
			"aria-setsize": r.virtual.value.options.length,
			"aria-posinset": c$1.index + 1,
			style: {
				position: "absolute",
				top: 0,
				left: 0,
				transform: `translateY(${c$1.start}px)`,
				overflowAnchor: "none"
			}
		})))];
	}
}), lt = defineComponent({
	name: "Combobox",
	emits: { "update:modelValue": (a) => !0 },
	props: {
		as: {
			type: [Object, String],
			default: "template"
		},
		disabled: {
			type: [Boolean],
			default: !1
		},
		by: {
			type: [String, Function],
			nullable: !0,
			default: null
		},
		modelValue: {
			type: [
				Object,
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		defaultValue: {
			type: [
				Object,
				String,
				Number,
				Boolean
			],
			default: void 0
		},
		form: {
			type: String,
			optional: !0
		},
		name: {
			type: String,
			optional: !0
		},
		nullable: {
			type: Boolean,
			default: !1
		},
		multiple: {
			type: [Boolean],
			default: !1
		},
		immediate: {
			type: [Boolean],
			default: !1
		},
		virtual: {
			type: Object,
			default: null
		}
	},
	inheritAttrs: !1,
	setup(a, { slots: h$1, attrs: r, emit: y }) {
		let o$3 = ref(1), u$3 = ref(null), e$1 = ref(null), c$1 = ref(null), f$2 = ref(null), S = ref({
			static: !1,
			hold: !1
		}), v = ref([]), d$1 = ref(null), D = ref(2), E$1 = ref(!1);
		function w$1(t$3 = (n$2) => n$2) {
			let n$1 = d$1.value !== null ? v.value[d$1.value] : null, s$1 = t$3(v.value.slice()), b = s$1.length > 0 && s$1[0].dataRef.order.value !== null ? s$1.sort((C, A$1) => C.dataRef.order.value - A$1.dataRef.order.value) : O(s$1, (C) => o$2(C.dataRef.domRef)), O$1 = n$1 ? b.indexOf(n$1) : null;
			return O$1 === -1 && (O$1 = null), {
				options: b,
				activeOptionIndex: O$1
			};
		}
		let M = computed(() => a.multiple ? 1 : 0), $ = computed(() => a.nullable), [B, p] = d(computed(() => a.modelValue), (t$3) => y("update:modelValue", t$3), computed(() => a.defaultValue)), R = computed(() => B.value === void 0 ? u$2(M.value, {
			[1]: [],
			[0]: void 0
		}) : B.value), V = null, i$5 = null;
		function I(t$3) {
			return u$2(M.value, {
				[0]() {
					return p == null ? void 0 : p(t$3);
				},
				[1]: () => {
					let n$1 = toRaw(l$1.value.value).slice(), s$1 = toRaw(t$3), b = n$1.findIndex((O$1) => l$1.compare(s$1, toRaw(O$1)));
					return b === -1 ? n$1.push(s$1) : n$1.splice(b, 1), p == null ? void 0 : p(n$1);
				}
			});
		}
		watch([computed(() => {})], ([t$3], [n$1]) => {
			if (l$1.virtual.value && t$3 && n$1 && d$1.value !== null) {
				let s$1 = t$3.indexOf(n$1[d$1.value]);
				s$1 !== -1 ? d$1.value = s$1 : d$1.value = null;
			}
		});
		let l$1 = {
			comboboxState: o$3,
			value: R,
			mode: M,
			compare(t$3, n$1) {
				if (typeof a.by == "string") {
					let s$1 = a.by;
					return (t$3 == null ? void 0 : t$3[s$1]) === (n$1 == null ? void 0 : n$1[s$1]);
				}
				return a.by === null ? De(t$3, n$1) : a.by(t$3, n$1);
			},
			calculateIndex(t$3) {
				return l$1.virtual.value ? a.by === null ? l$1.virtual.value.options.indexOf(t$3) : l$1.virtual.value.options.findIndex((n$1) => l$1.compare(n$1, t$3)) : v.value.findIndex((n$1) => l$1.compare(n$1.dataRef.value, t$3));
			},
			defaultValue: computed(() => a.defaultValue),
			nullable: $,
			immediate: computed(() => !1),
			virtual: computed(() => null),
			inputRef: e$1,
			labelRef: u$3,
			buttonRef: c$1,
			optionsRef: f$2,
			disabled: computed(() => a.disabled),
			options: v,
			change(t$3) {
				p(t$3);
			},
			activeOptionIndex: computed(() => {
				if (E$1.value && d$1.value === null && (l$1.virtual.value ? l$1.virtual.value.options.length > 0 : v.value.length > 0)) {
					if (l$1.virtual.value) {
						let n$1 = l$1.virtual.value.options.findIndex((s$1) => {
							var b;
							return !((b = l$1.virtual.value) != null && b.disabled(s$1));
						});
						if (n$1 !== -1) return n$1;
					}
					let t$3 = v.value.findIndex((n$1) => !n$1.dataRef.disabled);
					if (t$3 !== -1) return t$3;
				}
				return d$1.value;
			}),
			activationTrigger: D,
			optionsPropsRef: S,
			closeCombobox() {
				E$1.value = !1, !a.disabled && o$3.value !== 1 && (o$3.value = 1, d$1.value = null);
			},
			openCombobox() {
				if (E$1.value = !0, !a.disabled && o$3.value !== 0) {
					if (l$1.value.value) {
						let t$3 = l$1.calculateIndex(l$1.value.value);
						t$3 !== -1 && (d$1.value = t$3);
					}
					o$3.value = 0;
				}
			},
			setActivationTrigger(t$3) {
				D.value = t$3;
			},
			goToOption(t$3, n$1, s$1) {
				E$1.value = !1, V !== null && cancelAnimationFrame(V), V = requestAnimationFrame(() => {
					if (a.disabled || f$2.value && !S.value.static && o$3.value === 1) return;
					if (l$1.virtual.value) {
						d$1.value = t$3 === c.Specific ? n$1 : f$1({ focus: t$3 }, {
							resolveItems: () => l$1.virtual.value.options,
							resolveActiveIndex: () => {
								var C, A$1;
								return (A$1 = (C = l$1.activeOptionIndex.value) != null ? C : l$1.virtual.value.options.findIndex((j) => {
									var q;
									return !((q = l$1.virtual.value) != null && q.disabled(j));
								})) != null ? A$1 : null;
							},
							resolveDisabled: (C) => l$1.virtual.value.disabled(C),
							resolveId() {
								throw new Error("Function not implemented.");
							}
						}), D.value = s$1 != null ? s$1 : 2;
						return;
					}
					let b = w$1();
					if (b.activeOptionIndex === null) {
						let C = b.options.findIndex((A$1) => !A$1.dataRef.disabled);
						C !== -1 && (b.activeOptionIndex = C);
					}
					d$1.value = t$3 === c.Specific ? n$1 : f$1({ focus: t$3 }, {
						resolveItems: () => b.options,
						resolveActiveIndex: () => b.activeOptionIndex,
						resolveId: (C) => C.id,
						resolveDisabled: (C) => C.dataRef.disabled
					}), D.value = s$1 != null ? s$1 : 2, v.value = b.options;
				});
			},
			selectOption(t$3) {
				let n$1 = v.value.find((b) => b.id === t$3);
				if (!n$1) return;
				let { dataRef: s$1 } = n$1;
				I(s$1.value);
			},
			selectActiveOption() {
				if (l$1.activeOptionIndex.value !== null) {
					if (l$1.virtual.value) I(l$1.virtual.value.options[l$1.activeOptionIndex.value]);
					else {
						let { dataRef: t$3 } = v.value[l$1.activeOptionIndex.value];
						I(t$3.value);
					}
					l$1.goToOption(c.Specific, l$1.activeOptionIndex.value);
				}
			},
			registerOption(t$3, n$1) {
				let s$1 = reactive({
					id: t$3,
					dataRef: n$1
				});
				if (l$1.virtual.value) {
					v.value.push(s$1);
					return;
				}
				i$5 && cancelAnimationFrame(i$5);
				let b = w$1((O$1) => (O$1.push(s$1), O$1));
				d$1.value === null && l$1.isSelected(n$1.value.value) && (b.activeOptionIndex = b.options.indexOf(s$1)), v.value = b.options, d$1.value = b.activeOptionIndex, D.value = 2, b.options.some((O$1) => !o$2(O$1.dataRef.domRef)) && (i$5 = requestAnimationFrame(() => {
					let O$1 = w$1();
					v.value = O$1.options, d$1.value = O$1.activeOptionIndex;
				}));
			},
			unregisterOption(t$3, n$1) {
				if (V !== null && cancelAnimationFrame(V), n$1 && (E$1.value = !0), l$1.virtual.value) {
					v.value = v.value.filter((b) => b.id !== t$3);
					return;
				}
				let s$1 = w$1((b) => {
					let O$1 = b.findIndex((C) => C.id === t$3);
					return O$1 !== -1 && b.splice(O$1, 1), b;
				});
				v.value = s$1.options, d$1.value = s$1.activeOptionIndex, D.value = 2;
			},
			isSelected(t$3) {
				return u$2(M.value, {
					[0]: () => l$1.compare(toRaw(l$1.value.value), toRaw(t$3)),
					[1]: () => toRaw(l$1.value.value).some((n$1) => l$1.compare(toRaw(n$1), toRaw(t$3)))
				});
			},
			isActive(t$3) {
				return d$1.value === l$1.calculateIndex(t$3);
			}
		};
		w([
			e$1,
			c$1,
			f$2
		], () => l$1.closeCombobox(), computed(() => o$3.value === 0)), provide(ne, l$1), t$1(computed(() => u$2(o$3.value, {
			[0]: i$2.Open,
			[1]: i$2.Closed
		})));
		computed(() => {
			var t$3;
			return (t$3 = o$2(e$1)) == null ? void 0 : t$3.closest("form");
		});
		return () => {
			var C, A$1, j;
			let { name: t$3, disabled: n$1, form: s$1,...b } = a, O$1 = {
				open: o$3.value === 0,
				disabled: n$1,
				activeIndex: l$1.activeOptionIndex.value,
				activeOption: l$1.activeOptionIndex.value === null ? null : l$1.virtual.value ? l$1.virtual.value.options[(C = l$1.activeOptionIndex.value) != null ? C : 0] : (j = (A$1 = l$1.options.value[l$1.activeOptionIndex.value]) == null ? void 0 : A$1.dataRef.value) != null ? j : null,
				value: R.value
			};
			return h(Fragment, [...t$3 != null && R.value != null ? e({ [t$3]: R.value }).map(([q, ue]) => h(f, E({
				features: u$1.Hidden,
				key: q,
				as: "input",
				type: "hidden",
				hidden: !0,
				readOnly: !0,
				form: s$1,
				disabled: n$1,
				name: q,
				value: ue
			}))) : [], A({
				theirProps: {
					...r,
					...T(b, [
						"by",
						"defaultValue",
						"immediate",
						"modelValue",
						"multiple",
						"nullable",
						"onUpdate:modelValue",
						"virtual"
					])
				},
				ourProps: {},
				slot: O$1,
				slots: h$1,
				attrs: r,
				name: "Combobox"
			})]);
		};
	}
});
defineComponent({
	name: "ComboboxLabel",
	props: {
		as: {
			type: [Object, String],
			default: "label"
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(a, { attrs: h$1, slots: r }) {
		var e$1;
		let y = (e$1 = a.id) != null ? e$1 : `headlessui-combobox-label-${i()}`, o$3 = K("ComboboxLabel");
		function u$3() {
			var c$1;
			(c$1 = o$2(o$3.inputRef)) == null || c$1.focus({ preventScroll: !0 });
		}
		return () => {
			let c$1 = {
				open: o$3.comboboxState.value === 0,
				disabled: o$3.disabled.value
			}, { ...f$2 } = a;
			return A({
				ourProps: {
					id: y,
					ref: o$3.labelRef,
					onClick: u$3
				},
				theirProps: f$2,
				slot: c$1,
				attrs: h$1,
				slots: r,
				name: "ComboboxLabel"
			});
		};
	}
});
var nt = defineComponent({
	name: "ComboboxButton",
	props: {
		as: {
			type: [Object, String],
			default: "button"
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(a, { attrs: h$1, slots: r, expose: y }) {
		var S;
		let o$3 = (S = a.id) != null ? S : `headlessui-combobox-button-${i()}`, u$3 = K("ComboboxButton");
		y({
			el: u$3.buttonRef,
			$el: u$3.buttonRef
		});
		function e$1(v) {
			u$3.disabled.value || (u$3.comboboxState.value === 0 ? u$3.closeCombobox() : (v.preventDefault(), u$3.openCombobox()), nextTick(() => {
				var d$1;
				return (d$1 = o$2(u$3.inputRef)) == null ? void 0 : d$1.focus({ preventScroll: !0 });
			}));
		}
		function c$1(v) {
			switch (v.key) {
				case o.ArrowDown:
					v.preventDefault(), v.stopPropagation(), u$3.comboboxState.value === 1 && u$3.openCombobox(), nextTick(() => {
						var d$1;
						return (d$1 = u$3.inputRef.value) == null ? void 0 : d$1.focus({ preventScroll: !0 });
					});
					return;
				case o.ArrowUp:
					v.preventDefault(), v.stopPropagation(), u$3.comboboxState.value === 1 && (u$3.openCombobox(), nextTick(() => {
						u$3.value.value || u$3.goToOption(c.Last);
					})), nextTick(() => {
						var d$1;
						return (d$1 = u$3.inputRef.value) == null ? void 0 : d$1.focus({ preventScroll: !0 });
					});
					return;
				case o.Escape:
					if (u$3.comboboxState.value !== 0) return;
					v.preventDefault(), u$3.optionsRef.value && !u$3.optionsPropsRef.value.static && v.stopPropagation(), u$3.closeCombobox(), nextTick(() => {
						var d$1;
						return (d$1 = u$3.inputRef.value) == null ? void 0 : d$1.focus({ preventScroll: !0 });
					});
					return;
			}
		}
		let f$2 = s(computed(() => ({
			as: a.as,
			type: h$1.type
		})), u$3.buttonRef);
		return () => {
			var E$1, w$1;
			let v = {
				open: u$3.comboboxState.value === 0,
				disabled: u$3.disabled.value,
				value: u$3.value.value
			}, { ...d$1 } = a;
			return A({
				ourProps: {
					ref: u$3.buttonRef,
					id: o$3,
					type: f$2.value,
					tabindex: "-1",
					"aria-haspopup": "listbox",
					"aria-controls": (E$1 = o$2(u$3.optionsRef)) == null ? void 0 : E$1.id,
					"aria-expanded": u$3.comboboxState.value === 0,
					"aria-labelledby": u$3.labelRef.value ? [(w$1 = o$2(u$3.labelRef)) == null ? void 0 : w$1.id, o$3].join(" ") : void 0,
					disabled: u$3.disabled.value === !0 ? !0 : void 0,
					onKeydown: c$1,
					onClick: e$1
				},
				theirProps: d$1,
				slot: v,
				attrs: h$1,
				slots: r,
				name: "ComboboxButton"
			});
		};
	}
}), it = defineComponent({
	name: "ComboboxInput",
	props: {
		as: {
			type: [Object, String],
			default: "input"
		},
		static: {
			type: Boolean,
			default: !1
		},
		unmount: {
			type: Boolean,
			default: !0
		},
		displayValue: { type: Function },
		defaultValue: {
			type: String,
			default: void 0
		},
		id: {
			type: String,
			default: null
		}
	},
	emits: { change: (a) => !0 },
	setup(a, { emit: h$1, attrs: r, slots: y, expose: o$3 }) {
		var V;
		let u$3 = (V = a.id) != null ? V : `headlessui-combobox-input-${i()}`, e$1 = K("ComboboxInput");
		computed(() => i$3(o$2(e$1.inputRef)));
		let f$2 = { value: !1 };
		o$3({
			el: e$1.inputRef,
			$el: e$1.inputRef
		});
		function S() {
			e$1.change(null);
			let i$5 = o$2(e$1.optionsRef);
			i$5 && (i$5.scrollTop = 0), e$1.goToOption(c.Nothing);
		}
		computed(() => {
			var I;
			let i$5 = e$1.value.value;
			return o$2(e$1.inputRef) ? typeof a.displayValue != "undefined" && i$5 !== void 0 ? (I = a.displayValue(i$5)) != null ? I : "" : typeof i$5 == "string" ? i$5 : "" : "";
		});
		let d$1 = ref(!1);
		function D() {
			d$1.value = !0;
		}
		function E$1() {
			o$1().nextFrame(() => {
				d$1.value = !1;
			});
		}
		let w$1 = t();
		function M(i$5) {
			switch (f$2.value = !0, w$1(() => {
				f$2.value = !1;
			}), i$5.key) {
				case o.Enter:
					if (f$2.value = !1, e$1.comboboxState.value !== 0 || d$1.value) return;
					if (i$5.preventDefault(), i$5.stopPropagation(), e$1.activeOptionIndex.value === null) {
						e$1.closeCombobox();
						return;
					}
					e$1.selectActiveOption(), e$1.mode.value === 0 && e$1.closeCombobox();
					break;
				case o.ArrowDown: return f$2.value = !1, i$5.preventDefault(), i$5.stopPropagation(), u$2(e$1.comboboxState.value, {
					[0]: () => e$1.goToOption(c.Next),
					[1]: () => e$1.openCombobox()
				});
				case o.ArrowUp: return f$2.value = !1, i$5.preventDefault(), i$5.stopPropagation(), u$2(e$1.comboboxState.value, {
					[0]: () => e$1.goToOption(c.Previous),
					[1]: () => {
						e$1.openCombobox(), nextTick(() => {
							e$1.value.value || e$1.goToOption(c.Last);
						});
					}
				});
				case o.Home:
					if (i$5.shiftKey) break;
					return f$2.value = !1, i$5.preventDefault(), i$5.stopPropagation(), e$1.goToOption(c.First);
				case o.PageUp: return f$2.value = !1, i$5.preventDefault(), i$5.stopPropagation(), e$1.goToOption(c.First);
				case o.End:
					if (i$5.shiftKey) break;
					return f$2.value = !1, i$5.preventDefault(), i$5.stopPropagation(), e$1.goToOption(c.Last);
				case o.PageDown: return f$2.value = !1, i$5.preventDefault(), i$5.stopPropagation(), e$1.goToOption(c.Last);
				case o.Escape:
					if (f$2.value = !1, e$1.comboboxState.value !== 0) return;
					i$5.preventDefault(), e$1.optionsRef.value && !e$1.optionsPropsRef.value.static && i$5.stopPropagation(), e$1.nullable.value && e$1.mode.value === 0 && e$1.value.value === null && S(), e$1.closeCombobox();
					break;
				case o.Tab:
					if (f$2.value = !1, e$1.comboboxState.value !== 0) return;
					e$1.mode.value === 0 && e$1.activationTrigger.value !== 1 && e$1.selectActiveOption(), e$1.closeCombobox();
					break;
			}
		}
		function $(i$5) {
			h$1("change", i$5), e$1.nullable.value && e$1.mode.value === 0 && i$5.target.value === "" && S(), e$1.openCombobox();
		}
		function B(i$5) {
			var T$1, l$1, g$1;
			let I = (T$1 = i$5.relatedTarget) != null ? T$1 : t$2.find((t$3) => t$3 !== i$5.currentTarget);
			if (f$2.value = !1, !((l$1 = o$2(e$1.optionsRef)) != null && l$1.contains(I)) && !((g$1 = o$2(e$1.buttonRef)) != null && g$1.contains(I)) && e$1.comboboxState.value === 0) return i$5.preventDefault(), e$1.mode.value === 0 && (e$1.nullable.value && e$1.value.value === null ? S() : e$1.activationTrigger.value !== 1 && e$1.selectActiveOption()), e$1.closeCombobox();
		}
		function p(i$5) {
			var T$1, l$1, g$1;
			let I = (T$1 = i$5.relatedTarget) != null ? T$1 : t$2.find((t$3) => t$3 !== i$5.currentTarget);
			(l$1 = o$2(e$1.buttonRef)) != null && l$1.contains(I) || (g$1 = o$2(e$1.optionsRef)) != null && g$1.contains(I) || e$1.disabled.value || e$1.immediate.value && e$1.comboboxState.value !== 0 && (e$1.openCombobox(), o$1().nextFrame(() => {
				e$1.setActivationTrigger(1);
			}));
		}
		let R = computed(() => {
			var i$5, I, T$1, l$1;
			return (l$1 = (T$1 = (I = a.defaultValue) != null ? I : e$1.defaultValue.value !== void 0 ? (i$5 = a.displayValue) == null ? void 0 : i$5.call(a, e$1.defaultValue.value) : null) != null ? T$1 : e$1.defaultValue.value) != null ? l$1 : "";
		});
		return () => {
			var t$3, n$1, s$1, b, O$1, C, A$1;
			let i$5 = { open: e$1.comboboxState.value === 0 }, { displayValue: I, onChange: T$1,...l$1 } = a;
			return A({
				ourProps: {
					"aria-controls": (t$3 = e$1.optionsRef.value) == null ? void 0 : t$3.id,
					"aria-expanded": e$1.comboboxState.value === 0,
					"aria-activedescendant": e$1.activeOptionIndex.value === null ? void 0 : e$1.virtual.value ? (n$1 = e$1.options.value.find((j) => !e$1.virtual.value.disabled(j.dataRef.value) && e$1.compare(j.dataRef.value, e$1.virtual.value.options[e$1.activeOptionIndex.value]))) == null ? void 0 : n$1.id : (s$1 = e$1.options.value[e$1.activeOptionIndex.value]) == null ? void 0 : s$1.id,
					"aria-labelledby": (C = (b = o$2(e$1.labelRef)) == null ? void 0 : b.id) != null ? C : (O$1 = o$2(e$1.buttonRef)) == null ? void 0 : O$1.id,
					"aria-autocomplete": "list",
					id: u$3,
					onCompositionstart: D,
					onCompositionend: E$1,
					onKeydown: M,
					onInput: $,
					onFocus: p,
					onBlur: B,
					role: "combobox",
					type: (A$1 = r.type) != null ? A$1 : "text",
					tabIndex: 0,
					ref: e$1.inputRef,
					defaultValue: R.value,
					disabled: e$1.disabled.value === !0 ? !0 : void 0
				},
				theirProps: l$1,
				slot: i$5,
				attrs: r,
				slots: y,
				features: N.RenderStrategy | N.Static,
				name: "ComboboxInput"
			});
		};
	}
}), ut = defineComponent({
	name: "ComboboxOptions",
	props: {
		as: {
			type: [Object, String],
			default: "ul"
		},
		static: {
			type: Boolean,
			default: !1
		},
		unmount: {
			type: Boolean,
			default: !0
		},
		hold: {
			type: [Boolean],
			default: !1
		}
	},
	setup(a, { attrs: h$1, slots: r, expose: y }) {
		let o$3 = K("ComboboxOptions"), u$3 = `headlessui-combobox-options-${i()}`;
		y({
			el: o$3.optionsRef,
			$el: o$3.optionsRef
		}), watchEffect(() => {
			o$3.optionsPropsRef.value.static = a.static;
		}), watchEffect(() => {
			o$3.optionsPropsRef.value.hold = a.hold;
		});
		let e$1 = l(), c$1 = computed(() => e$1 !== null ? (e$1.value & i$2.Open) === i$2.Open : o$3.comboboxState.value === 0);
		i$1({
			container: computed(() => o$2(o$3.optionsRef)),
			enabled: computed(() => o$3.comboboxState.value === 0),
			accept(S) {
				return S.getAttribute("role") === "option" ? NodeFilter.FILTER_REJECT : S.hasAttribute("role") ? NodeFilter.FILTER_SKIP : NodeFilter.FILTER_ACCEPT;
			},
			walk(S) {
				S.setAttribute("role", "none");
			}
		});
		function f$2(S) {
			S.preventDefault();
		}
		return () => {
			var D, E$1, w$1;
			let S = { open: o$3.comboboxState.value === 0 };
			return A({
				ourProps: {
					"aria-labelledby": (w$1 = (D = o$2(o$3.labelRef)) == null ? void 0 : D.id) != null ? w$1 : (E$1 = o$2(o$3.buttonRef)) == null ? void 0 : E$1.id,
					id: u$3,
					ref: o$3.optionsRef,
					role: "listbox",
					"aria-multiselectable": o$3.mode.value === 1 ? !0 : void 0,
					onMousedown: f$2
				},
				theirProps: T(a, ["hold"]),
				slot: S,
				attrs: h$1,
				slots: o$3.virtual.value && o$3.comboboxState.value === 0 ? {
					...r,
					default: () => [h(Ae, {}, r.default)]
				} : r,
				features: N.RenderStrategy | N.Static,
				visible: c$1.value,
				name: "ComboboxOptions"
			});
		};
	}
}), rt = defineComponent({
	name: "ComboboxOption",
	props: {
		as: {
			type: [Object, String],
			default: "li"
		},
		value: { type: [
			Object,
			String,
			Number,
			Boolean
		] },
		disabled: {
			type: Boolean,
			default: !1
		},
		order: {
			type: [Number],
			default: null
		}
	},
	setup(a, { slots: h$1, attrs: r, expose: y }) {
		let o$3 = K("ComboboxOption"), u$3 = `headlessui-combobox-option-${i()}`, e$1 = ref(null), c$1 = computed(() => a.disabled);
		y({
			el: e$1,
			$el: e$1
		});
		let f$2 = computed(() => {
			var p;
			return o$3.virtual.value ? o$3.activeOptionIndex.value === o$3.calculateIndex(a.value) : o$3.activeOptionIndex.value === null ? !1 : ((p = o$3.options.value[o$3.activeOptionIndex.value]) == null ? void 0 : p.id) === u$3;
		}), S = computed(() => o$3.isSelected(a.value)), v = inject(ie, null);
		computed(() => ({
			disabled: a.disabled,
			value: a.value,
			domRef: e$1,
			order: computed(() => a.order)
		}));
		watchEffect(() => {
			let p = o$2(e$1);
			p && v?.value.measureElement(p);
		}), watchEffect(() => {
			o$3.comboboxState.value === 0 && f$2.value && (o$3.virtual.value || o$3.activationTrigger.value !== 0 && nextTick(() => {
				var p, R;
				return (R = (p = o$2(e$1)) == null ? void 0 : p.scrollIntoView) == null ? void 0 : R.call(p, { block: "nearest" });
			}));
		});
		function D(p) {
			p.preventDefault(), p.button === g.Left && (c$1.value || (o$3.selectOption(u$3), n() || requestAnimationFrame(() => {
				var R;
				return (R = o$2(o$3.inputRef)) == null ? void 0 : R.focus({ preventScroll: !0 });
			}), o$3.mode.value === 0 && o$3.closeCombobox()));
		}
		function E$1() {
			var R;
			if (a.disabled || (R = o$3.virtual.value) != null && R.disabled(a.value)) return o$3.goToOption(c.Nothing);
			let p = o$3.calculateIndex(a.value);
			o$3.goToOption(c.Specific, p);
		}
		let w$1 = u();
		function M(p) {
			w$1.update(p);
		}
		function $(p) {
			var V;
			if (!w$1.wasMoved(p) || a.disabled || (V = o$3.virtual.value) != null && V.disabled(a.value) || f$2.value) return;
			let R = o$3.calculateIndex(a.value);
			o$3.goToOption(c.Specific, R, 0);
		}
		function B(p) {
			var R;
			w$1.wasMoved(p) && (a.disabled || (R = o$3.virtual.value) != null && R.disabled(a.value) || f$2.value && (o$3.optionsPropsRef.value.hold || o$3.goToOption(c.Nothing)));
		}
		return () => {
			let { disabled: p } = a, R = {
				active: f$2.value,
				selected: S.value,
				disabled: p
			};
			return A({
				ourProps: {
					id: u$3,
					ref: e$1,
					role: "option",
					tabIndex: p === !0 ? void 0 : -1,
					"aria-disabled": p === !0 ? !0 : void 0,
					"aria-selected": S.value,
					disabled: void 0,
					onMousedown: D,
					onFocus: E$1,
					onPointerenter: M,
					onMouseenter: M,
					onPointermove: $,
					onMousemove: $,
					onPointerleave: B,
					onMouseleave: B
				},
				theirProps: T(a, ["order", "value"]),
				slot: R,
				attrs: r,
				slots: h$1,
				name: "ComboboxOption"
			});
		};
	}
});
export { ut as a, rt as i, lt as n, nt as r, it as t };

//# sourceMappingURL=combobox-D2aupXSo.js.map