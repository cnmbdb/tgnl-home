import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import { W as useUI, y as toggle_default } from "./ui-G7Oicn0a.js";
import { n as p, r as d } from "./form-1BInePM-.js";
import { c as o$1, l as i, n as A, o as T, r as E, t as o, u as s } from "./keyboard-CvjRf4Wb.js";
import { t as s$1 } from "./use-resolve-button-type-eioNRL5V.js";
import { n as u, t as f } from "./hidden-Bsn3DsxF.js";
import { n as k, t as K } from "./description-Y4p4EFv6.js";
import { t as useFormGroup } from "./useFormGroup-ZK-CpXpd.js";
import { Fragment, computed, createBlock, createCommentVNode, createVNode, defineComponent, h, inject, mergeProps, openBlock, provide, ref, resolveComponent, toRef, unref, useId, useSSRContext, watch, withCtx } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
var a = Symbol("LabelContext");
function d$1() {
	let t = inject(a, null);
	if (t === null) {
		let n = /* @__PURE__ */ new Error("You used a <Label /> component, but it is not inside a parent.");
		throw Error.captureStackTrace && Error.captureStackTrace(n, d$1), n;
	}
	return t;
}
function E$1({ slot: t = {}, name: n = "Label", props: i$1 = {} } = {}) {
	let e = ref([]);
	function o$2(r) {
		return e.value.push(r), () => {
			let l = e.value.indexOf(r);
			l !== -1 && e.value.splice(l, 1);
		};
	}
	return provide(a, {
		register: o$2,
		slot: t,
		name: n,
		props: i$1
	}), computed(() => e.value.length > 0 ? e.value.join(" ") : void 0);
}
defineComponent({
	name: "Label",
	props: {
		as: {
			type: [Object, String],
			default: "label"
		},
		passive: {
			type: [Boolean],
			default: !1
		},
		id: {
			type: String,
			default: null
		}
	},
	setup(t, { slots: n, attrs: i$1 }) {
		var r;
		let e = (r = t.id) != null ? r : `headlessui-label-${i()}`, o$2 = d$1();
		return () => {
			let { name: l = "Label", slot: p$1 = {}, props: c = {} } = o$2, { passive: f$1,...s$2 } = t, u$1 = {
				...Object.entries(c).reduce((b, [g, m]) => Object.assign(b, { [g]: unref(m) }), {}),
				id: e
			};
			return f$1 && (delete u$1.onClick, delete u$1.htmlFor, delete s$2.onClick), A({
				ourProps: u$1,
				theirProps: s$2,
				slot: p$1,
				attrs: i$1,
				slots: n,
				name: l
			});
		};
	}
});
var C = Symbol("GroupContext");
defineComponent({
	name: "SwitchGroup",
	props: { as: {
		type: [Object, String],
		default: "template"
	} },
	setup(l, { slots: c, attrs: i$1 }) {
		let r = ref(null);
		return provide(C, {
			switchRef: r,
			labelledby: E$1({
				name: "SwitchLabel",
				props: {
					htmlFor: computed(() => {
						var t;
						return (t = r.value) == null ? void 0 : t.id;
					}),
					onClick(t) {
						r.value && (t.currentTarget.tagName === "LABEL" && t.preventDefault(), r.value.click(), r.value.focus({ preventScroll: !0 }));
					}
				}
			}),
			describedby: k({ name: "SwitchDescription" })
		}), () => A({
			theirProps: l,
			ourProps: {},
			slot: {},
			slots: c,
			attrs: i$1,
			name: "SwitchGroup"
		});
	}
});
var ue = defineComponent({
	name: "Switch",
	emits: { "update:modelValue": (l) => !0 },
	props: {
		as: {
			type: [Object, String],
			default: "button"
		},
		modelValue: {
			type: Boolean,
			default: void 0
		},
		defaultChecked: {
			type: Boolean,
			optional: !0
		},
		form: {
			type: String,
			optional: !0
		},
		name: {
			type: String,
			optional: !0
		},
		value: {
			type: String,
			optional: !0
		},
		id: {
			type: String,
			default: null
		},
		disabled: {
			type: Boolean,
			default: !1
		},
		tabIndex: {
			type: Number,
			default: 0
		}
	},
	inheritAttrs: !1,
	setup(l, { emit: c, attrs: i$1, slots: r, expose: f$1 }) {
		var h$1;
		let p$1 = (h$1 = l.id) != null ? h$1 : `headlessui-switch-${i()}`, n = inject(C, null), [t, s$2] = d(computed(() => l.modelValue), (e) => c("update:modelValue", e), computed(() => l.defaultChecked));
		function m() {
			s$2(!t.value);
		}
		let E$2 = ref(null), o$2 = n === null ? E$2 : n.switchRef, L = s$1(computed(() => ({
			as: l.as,
			type: i$1.type
		})), o$2);
		f$1({
			el: o$2,
			$el: o$2
		});
		function D(e) {
			e.preventDefault(), m();
		}
		function R(e) {
			e.key === o.Space ? (e.preventDefault(), m()) : e.key === o.Enter && p(e.currentTarget);
		}
		function x(e) {
			e.preventDefault();
		}
		computed(() => {
			var e, a$1;
			return (a$1 = (e = o$1(o$2)) == null ? void 0 : e.closest) == null ? void 0 : a$1.call(e, "form");
		});
		return () => {
			let { name: e, value: a$1, form: K$2, tabIndex: y,...b } = l, T$1 = { checked: t.value }, B = {
				id: p$1,
				ref: o$2,
				role: "switch",
				type: L.value,
				tabIndex: y === -1 ? 0 : y,
				"aria-checked": t.value,
				"aria-labelledby": n == null ? void 0 : n.labelledby.value,
				"aria-describedby": n == null ? void 0 : n.describedby.value,
				onClick: D,
				onKeyup: R,
				onKeypress: x
			};
			return h(Fragment, [e != null && t.value != null ? h(f, E({
				features: u.Hidden,
				as: "input",
				type: "checkbox",
				hidden: !0,
				readOnly: !0,
				checked: t.value,
				form: K$2,
				disabled: b.disabled,
				name: e,
				value: a$1
			})) : null, A({
				ourProps: B,
				theirProps: {
					...i$1,
					...T(b, ["modelValue", "defaultChecked"])
				},
				slot: T$1,
				attrs: i$1,
				slots: r,
				name: "Switch"
			})]);
		};
	}
});
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.toggle, toggle_default);
var _sfc_main = defineComponent({
	components: {
		HSwitch: ue,
		UIcon: Icon_default
	},
	inheritAttrs: false,
	props: {
		id: {
			type: String,
			default: null
		},
		name: {
			type: String,
			default: null
		},
		modelValue: {
			type: Boolean,
			default: false
		},
		disabled: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		onIcon: {
			type: String,
			default: () => config.default.onIcon
		},
		offIcon: {
			type: String,
			default: () => config.default.offIcon
		},
		loadingIcon: {
			type: String,
			default: () => config.default.loadingIcon
		},
		color: {
			type: String,
			default: () => config.default.color,
			validator(value) {
				return virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors.includes(value);
			}
		},
		size: {
			type: String,
			default: () => config.default.size,
			validator(value) {
				return Object.keys(config.size).includes(value);
			}
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
	emits: ["update:modelValue", "change"],
	setup(props, { emit }) {
		const { ui, attrs } = useUI("toggle", toRef(props, "ui"), config);
		const { emitFormChange, color, inputId, name } = useFormGroup(props);
		const active = computed({
			get() {
				return props.modelValue;
			},
			set(value) {
				emit("update:modelValue", value);
				emit("change", value);
				emitFormChange();
			}
		});
		const switchClass = computed(() => {
			return twMerge(twJoin(ui.value.base, ui.value.size[props.size], ui.value.rounded, color.value && ui.value.ring.replaceAll("{color}", color.value), color.value && (active.value ? ui.value.active : ui.value.inactive).replaceAll("{color}", color.value)), props.class);
		});
		const containerClass = computed(() => {
			return twJoin(ui.value.container.base, ui.value.container.size[props.size], active.value ? ui.value.container.active[props.size] : ui.value.container.inactive);
		});
		const onIconClass = computed(() => {
			return twJoin(ui.value.icon.size[props.size], color.value && ui.value.icon.on.replaceAll("{color}", color.value));
		});
		const offIconClass = computed(() => {
			return twJoin(ui.value.icon.size[props.size], color.value && ui.value.icon.off.replaceAll("{color}", color.value));
		});
		const loadingIconClass = computed(() => {
			return twJoin(ui.value.icon.size[props.size], color.value && ui.value.icon.loading.replaceAll("{color}", color.value));
		});
		s(() => useId());
		return {
			ui,
			attrs,
			name,
			inputId,
			active,
			switchClass,
			containerClass,
			onIconClass,
			offIconClass,
			loadingIconClass
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_HSwitch = resolveComponent("HSwitch");
	const _component_UIcon = Icon_default;
	_push(ssrRenderComponent(_component_HSwitch, mergeProps({
		id: _ctx.inputId,
		modelValue: _ctx.active,
		"onUpdate:modelValue": ($event) => _ctx.active = $event,
		name: _ctx.name,
		disabled: _ctx.disabled || _ctx.loading,
		class: _ctx.switchClass
	}, _ctx.attrs, _attrs), {
		default: withCtx((_, _push$1, _parent$1, _scopeId) => {
			if (_push$1) {
				_push$1(`<span class="${ssrRenderClass(_ctx.containerClass)}"${_scopeId}>`);
				if (_ctx.loading) {
					_push$1(`<span class="${ssrRenderClass([_ctx.ui.icon.active, _ctx.ui.icon.base])}" aria-hidden="true"${_scopeId}>`);
					_push$1(ssrRenderComponent(_component_UIcon, {
						name: _ctx.loadingIcon,
						class: _ctx.loadingIconClass
					}, null, _parent$1, _scopeId));
					_push$1(`</span>`);
				} else _push$1(`<!---->`);
				if (!_ctx.loading && _ctx.onIcon) {
					_push$1(`<span class="${ssrRenderClass([_ctx.active ? _ctx.ui.icon.active : _ctx.ui.icon.inactive, _ctx.ui.icon.base])}" aria-hidden="true"${_scopeId}>`);
					_push$1(ssrRenderComponent(_component_UIcon, {
						name: _ctx.onIcon,
						class: _ctx.onIconClass
					}, null, _parent$1, _scopeId));
					_push$1(`</span>`);
				} else _push$1(`<!---->`);
				if (!_ctx.loading && _ctx.offIcon) {
					_push$1(`<span class="${ssrRenderClass([_ctx.active ? _ctx.ui.icon.inactive : _ctx.ui.icon.active, _ctx.ui.icon.base])}" aria-hidden="true"${_scopeId}>`);
					_push$1(ssrRenderComponent(_component_UIcon, {
						name: _ctx.offIcon,
						class: _ctx.offIconClass
					}, null, _parent$1, _scopeId));
					_push$1(`</span>`);
				} else _push$1(`<!---->`);
				_push$1(`</span>`);
			} else return [createVNode("span", { class: _ctx.containerClass }, [
				_ctx.loading ? (openBlock(), createBlock("span", {
					key: 0,
					class: [_ctx.ui.icon.active, _ctx.ui.icon.base],
					"aria-hidden": "true"
				}, [createVNode(_component_UIcon, {
					name: _ctx.loadingIcon,
					class: _ctx.loadingIconClass
				}, null, 8, ["name", "class"])], 2)) : createCommentVNode("", true),
				!_ctx.loading && _ctx.onIcon ? (openBlock(), createBlock("span", {
					key: 1,
					class: [_ctx.active ? _ctx.ui.icon.active : _ctx.ui.icon.inactive, _ctx.ui.icon.base],
					"aria-hidden": "true"
				}, [createVNode(_component_UIcon, {
					name: _ctx.onIcon,
					class: _ctx.onIconClass
				}, null, 8, ["name", "class"])], 2)) : createCommentVNode("", true),
				!_ctx.loading && _ctx.offIcon ? (openBlock(), createBlock("span", {
					key: 2,
					class: [_ctx.active ? _ctx.ui.icon.inactive : _ctx.ui.icon.active, _ctx.ui.icon.base],
					"aria-hidden": "true"
				}, [createVNode(_component_UIcon, {
					name: _ctx.offIcon,
					class: _ctx.offIconClass
				}, null, 8, ["name", "class"])], 2)) : createCommentVNode("", true)
			], 2)];
		}),
		_: 1
	}, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Toggle.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Toggle_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Toggle_default as t };

//# sourceMappingURL=Toggle-tNsPBJRu.js.map