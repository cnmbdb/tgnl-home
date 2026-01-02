import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { E as formGroup_default, W as useUI } from "./ui-G7Oicn0a.js";
import { computed, defineComponent, inject, mergeProps, provide, ref, toRef, useId, useSSRContext } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderClass, ssrRenderSlot } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.formGroup, formGroup_default);
var _sfc_main = defineComponent({
	inheritAttrs: false,
	props: {
		name: {
			type: String,
			default: null
		},
		size: {
			type: String,
			default: null,
			validator(value) {
				return Object.keys(config.size).includes(value);
			}
		},
		label: {
			type: String,
			default: null
		},
		description: {
			type: String,
			default: null
		},
		required: {
			type: Boolean,
			default: false
		},
		help: {
			type: String,
			default: null
		},
		error: {
			type: [String, Boolean],
			default: null
		},
		hint: {
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
		},
		eagerValidation: {
			type: Boolean,
			default: false
		}
	},
	setup(props) {
		const { ui, attrs } = useUI("formGroup", toRef(props, "ui"), config, toRef(props, "class"));
		const formErrors = inject("form-errors", null);
		const error = computed(() => {
			return props.error && typeof props.error === "string" || typeof props.error === "boolean" ? props.error : formErrors?.value?.find((error2) => error2.path === props.name)?.message;
		});
		const size = computed(() => ui.value.size[props.size ?? config.default.size]);
		const inputId = ref(useId());
		provide("form-group", {
			error,
			inputId,
			name: computed(() => props.name),
			size: computed(() => props.size),
			eagerValidation: computed(() => props.eagerValidation)
		});
		return {
			ui,
			attrs,
			inputId,
			size,
			error
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({ class: _ctx.ui.wrapper }, _ctx.attrs, _attrs))}><div class="${ssrRenderClass(_ctx.ui.inner)}">`);
	if (_ctx.label || _ctx.$slots.label) {
		_push(`<div class="${ssrRenderClass([_ctx.ui.label.wrapper, _ctx.size])}"><label${ssrRenderAttr("for", _ctx.inputId)} class="${ssrRenderClass([_ctx.ui.label.base, _ctx.required ? _ctx.ui.label.required : ""])}">`);
		if (_ctx.$slots.label) ssrRenderSlot(_ctx.$slots, "label", {
			error: _ctx.error,
			label: _ctx.label,
			name: _ctx.name,
			hint: _ctx.hint,
			description: _ctx.description,
			help: _ctx.help
		}, null, _push, _parent);
		else _push(`<!--[-->${ssrInterpolate(_ctx.label)}<!--]-->`);
		_push(`</label>`);
		if (_ctx.hint || _ctx.$slots.hint) {
			_push(`<span class="${ssrRenderClass([_ctx.ui.hint])}">`);
			if (_ctx.$slots.hint) ssrRenderSlot(_ctx.$slots, "hint", {
				error: _ctx.error,
				label: _ctx.label,
				name: _ctx.name,
				hint: _ctx.hint,
				description: _ctx.description,
				help: _ctx.help
			}, null, _push, _parent);
			else _push(`<!--[-->${ssrInterpolate(_ctx.hint)}<!--]-->`);
			_push(`</span>`);
		} else _push(`<!---->`);
		_push(`</div>`);
	} else _push(`<!---->`);
	if (_ctx.description || _ctx.$slots.description) {
		_push(`<p class="${ssrRenderClass([_ctx.ui.description, _ctx.size])}">`);
		if (_ctx.$slots.description) ssrRenderSlot(_ctx.$slots, "description", {
			error: _ctx.error,
			label: _ctx.label,
			name: _ctx.name,
			hint: _ctx.hint,
			description: _ctx.description,
			help: _ctx.help
		}, null, _push, _parent);
		else _push(`<!--[-->${ssrInterpolate(_ctx.description)}<!--]-->`);
		_push(`</p>`);
	} else _push(`<!---->`);
	_push(`</div><div class="${ssrRenderClass([_ctx.label ? _ctx.ui.container : ""])}">`);
	ssrRenderSlot(_ctx.$slots, "default", { error: _ctx.error }, null, _push, _parent);
	if (typeof _ctx.error === "string" && _ctx.error) {
		_push(`<p class="${ssrRenderClass([_ctx.ui.error, _ctx.size])}">`);
		if (_ctx.$slots.error) ssrRenderSlot(_ctx.$slots, "error", {
			error: _ctx.error,
			label: _ctx.label,
			name: _ctx.name,
			hint: _ctx.hint,
			description: _ctx.description,
			help: _ctx.help
		}, null, _push, _parent);
		else _push(`<!--[-->${ssrInterpolate(_ctx.error)}<!--]-->`);
		_push(`</p>`);
	} else if (_ctx.help || _ctx.$slots.help) {
		_push(`<p class="${ssrRenderClass([_ctx.ui.help, _ctx.size])}">`);
		if (_ctx.$slots.help) ssrRenderSlot(_ctx.$slots, "help", {
			error: _ctx.error,
			label: _ctx.label,
			name: _ctx.name,
			hint: _ctx.hint,
			description: _ctx.description,
			help: _ctx.help
		}, null, _push, _parent);
		else _push(`<!--[-->${ssrInterpolate(_ctx.help)}<!--]-->`);
		_push(`</p>`);
	} else _push(`<!---->`);
	_push(`</div></div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/FormGroup.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var FormGroup_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { FormGroup_default as t };

//# sourceMappingURL=FormGroup-jUwssykP.js.map