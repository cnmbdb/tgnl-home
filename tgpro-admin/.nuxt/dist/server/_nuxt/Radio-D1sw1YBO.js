import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { W as useUI, x as radio_default } from "./ui-G7Oicn0a.js";
import { t as useFormGroup } from "./useFormGroup-ZK-CpXpd.js";
import { computed, defineComponent, inject, mergeProps, toRef, useId, useSSRContext } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrGetDynamicModelProps, ssrInterpolate, ssrLooseEqual, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.radio, radio_default);
var _sfc_main = defineComponent({
	inheritAttrs: false,
	props: {
		id: {
			type: String,
			default: null
		},
		value: {
			type: [
				String,
				Number,
				Boolean
			],
			default: null
		},
		modelValue: {
			type: [
				String,
				Number,
				Boolean,
				Object
			],
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
			default: null
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
		const { ui, attrs } = useUI("radio", toRef(props, "ui"), config, toRef(props, "class"));
		const inputId = props.id ?? useId();
		const radioGroup = inject("radio-group", null);
		const { emitFormChange, color, name } = radioGroup ?? useFormGroup(props, config);
		const pick = computed({
			get() {
				return props.modelValue;
			},
			set(value) {
				emit("update:modelValue", value);
				if (!radioGroup) emitFormChange();
			}
		});
		function onChange(event) {
			emit("change", event.target.value);
		}
		return {
			inputId,
			ui,
			attrs,
			pick,
			name,
			inputClass: computed(() => {
				return twMerge(twJoin(ui.value.base, ui.value.form, ui.value.background, ui.value.border, color.value && ui.value.ring.replaceAll("{color}", color.value), color.value && ui.value.color.replaceAll("{color}", color.value)), props.inputClass);
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
		checked: ssrLooseEqual(_ctx.pick, _ctx.value),
		name: _ctx.name,
		required: _ctx.required,
		value: _ctx.value,
		disabled: _ctx.disabled,
		type: "radio",
		class: _ctx.inputClass
	}, _ctx.attrs), mergeProps(_temp0, ssrGetDynamicModelProps(_temp0, _ctx.pick))))}></div>`);
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
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/Radio.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Radio_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Radio_default as t };

//# sourceMappingURL=Radio-D1sw1YBO.js.map