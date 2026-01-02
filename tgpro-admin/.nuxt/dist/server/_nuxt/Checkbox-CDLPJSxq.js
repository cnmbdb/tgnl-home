import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, p as useId$1, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { W as useUI, b as checkbox_default } from "./ui-G7Oicn0a.js";
import { t as useFormGroup } from "./useFormGroup-ZK-CpXpd.js";
import { computed, defineComponent, mergeProps, toRef, useSSRContext } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrGetDynamicModelProps, ssrInterpolate, ssrLooseContain, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.checkbox, checkbox_default);
var _sfc_main = defineComponent({
	inheritAttrs: false,
	props: {
		id: {
			type: String,
			default: () => null
		},
		value: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
			default: null
		},
		modelValue: {
			type: [Boolean, Array],
			default: null
		},
		name: {
			type: String,
			default: null
		},
		disabled: {
			type: Boolean,
			default: false
		},
		indeterminate: {
			type: Boolean,
			default: void 0
		},
		help: {
			type: String,
			default: null
		},
		label: {
			type: String,
			default: null
		},
		required: {
			type: Boolean,
			default: false
		},
		color: {
			type: String,
			default: () => config.default.color,
			validator(value) {
				return virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors.includes(value);
			}
		},
		inputClass: {
			type: String,
			default: ""
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
		const { ui, attrs } = useUI("checkbox", toRef(props, "ui"), config, toRef(props, "class"));
		const { emitFormChange, color, name, inputId: _inputId } = useFormGroup(props);
		const inputId = _inputId.value ?? useId$1();
		const toggle = computed({
			get() {
				return props.modelValue;
			},
			set(value) {
				emit("update:modelValue", value);
			}
		});
		const onChange = (event) => {
			emit("change", event.target.checked);
			emitFormChange();
		};
		return {
			ui,
			attrs,
			toggle,
			inputId,
			name,
			inputClass: computed(() => {
				return twMerge(twJoin(ui.value.base, ui.value.form, ui.value.rounded, ui.value.background, ui.value.border, color.value && ui.value.ring.replaceAll("{color}", color.value), color.value && ui.value.color.replaceAll("{color}", color.value)), props.inputClass);
			}),
			onChange
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	let _temp0;
	_push(`<div${ssrRenderAttrs(mergeProps({
		class: _ctx.ui.wrapper,
		"data-n-ids": _ctx.attrs["data-n-ids"]
	}, _attrs))}><div class="${ssrRenderClass(_ctx.ui.container)}"><input${ssrRenderAttrs((_temp0 = mergeProps({
		id: _ctx.inputId,
		checked: Array.isArray(_ctx.toggle) ? ssrLooseContain(_ctx.toggle, _ctx.value) : _ctx.toggle,
		name: _ctx.name,
		required: _ctx.required,
		value: _ctx.value,
		disabled: _ctx.disabled,
		indeterminate: _ctx.indeterminate,
		type: "checkbox",
		class: _ctx.inputClass
	}, _ctx.attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, _ctx.toggle))))}></div>`);
	if (_ctx.label || _ctx.$slots.label) {
		_push(`<div class="${ssrRenderClass(_ctx.ui.inner)}"><label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass(_ctx.ui.label)}">`);
		ssrRenderSlot(_ctx.$slots, "label", { label: _ctx.label }, () => {
			_push(`${ssrInterpolate(_ctx.label)}`);
		}, _push, _parent);
		if (_ctx.required) _push(`<span class="${ssrRenderClass(_ctx.ui.required)}">*</span>`);
		else _push(`<!---->`);
		_push(`</label>`);
		if (_ctx.help || _ctx.$slots.help) {
			_push(`<p class="${ssrRenderClass(_ctx.ui.help)}">`);
			ssrRenderSlot(_ctx.$slots, "help", { help: _ctx.help }, () => {
				_push(`${ssrInterpolate(_ctx.help)}`);
			}, _push, _parent);
			_push(`</p>`);
		} else _push(`<!---->`);
		_push(`</div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Checkbox.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Checkbox_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Checkbox_default as t };

//# sourceMappingURL=Checkbox-CDLPJSxq.js.map