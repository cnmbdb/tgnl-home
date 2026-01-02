import { c as get, d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig } from "../server.mjs";
import "./components-D5RLOpR9.js";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import { D as inputMenu_default, O as input_default, W as useUI } from "./ui-G7Oicn0a.js";
import { t as Avatar_default } from "./Avatar-CBx6NXk5.js";
import "./form-1BInePM-.js";
import "./micro-task-CYdHJ3PN.js";
import "./active-element-history-DJ1NL7os.js";
import { a as ut, i as rt, n as lt, r as nt, t as it } from "./combobox-D2aupXSo.js";
import { u as s } from "./keyboard-CvjRf4Wb.js";
import "./focus-management-DFaZHIRF.js";
import "./use-outside-click-B4rja7ys.js";
import "./use-resolve-button-type-eioNRL5V.js";
import "./calculate-active-index-B5ynhl2N.js";
import "./hidden-Bsn3DsxF.js";
import "./open-closed-Dsm1EOia.js";
import { t as usePopper } from "./usePopper-CMZCG_Qh.js";
import { t as useFormGroup } from "./useFormGroup-ZK-CpXpd.js";
import { t as useInjectButtonGroup } from "./useButtonGroup-1gNuWR3y.js";
import { Fragment, Transition, computed, createBlock, createCommentVNode, createTextVNode, createVNode, defineComponent, mergeProps, openBlock, ref, renderList, renderSlot, resolveComponent, toDisplayString, toRaw, toRef, useId, useSSRContext, watch, withCtx } from "vue";
import { defu } from "/Users/hf-mac/Downloads/tgpro-admin/node_modules/defu/dist/defu.mjs";
import { computedAsync, useDebounceFn } from "@vueuse/core";
import { twJoin } from "tailwind-merge";
import { ssrInterpolate, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
import { isEqual } from "ohash/utils";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.input, input_default);
var configMenu = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.inputMenu, inputMenu_default);
var _sfc_main = defineComponent({
	components: {
		HCombobox: lt,
		HComboboxButton: nt,
		HComboboxOptions: ut,
		HComboboxOption: rt,
		HComboboxInput: it,
		UIcon: Icon_default,
		UAvatar: Avatar_default
	},
	inheritAttrs: false,
	props: {
		modelValue: {
			type: [
				String,
				Number,
				Object,
				Array
			],
			default: ""
		},
		query: {
			type: String,
			default: null
		},
		by: {
			type: String,
			default: void 0
		},
		options: {
			type: Array,
			default: () => []
		},
		id: {
			type: String,
			default: null
		},
		name: {
			type: String,
			default: null
		},
		required: {
			type: Boolean,
			default: false
		},
		icon: {
			type: String,
			default: null
		},
		loadingIcon: {
			type: String,
			default: () => config.default.loadingIcon
		},
		leadingIcon: {
			type: String,
			default: null
		},
		trailingIcon: {
			type: String,
			default: () => configMenu.default.trailingIcon
		},
		trailing: {
			type: Boolean,
			default: false
		},
		leading: {
			type: Boolean,
			default: false
		},
		loading: {
			type: Boolean,
			default: false
		},
		selectedIcon: {
			type: String,
			default: () => configMenu.default.selectedIcon
		},
		disabled: {
			type: Boolean,
			default: false
		},
		nullable: {
			type: Boolean,
			default: false
		},
		placeholder: {
			type: String,
			default: null
		},
		padded: {
			type: Boolean,
			default: true
		},
		size: {
			type: String,
			default: null,
			validator(value) {
				return Object.keys(config.size).includes(value);
			}
		},
		color: {
			type: String,
			default: () => config.default.color,
			validator(value) {
				return [...virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors, ...Object.keys(config.color)].includes(value);
			}
		},
		variant: {
			type: String,
			default: () => config.default.variant,
			validator(value) {
				return [...Object.keys(config.variant), ...Object.values(config.color).flatMap((value2) => Object.keys(value2))].includes(value);
			}
		},
		optionAttribute: {
			type: String,
			default: "label"
		},
		valueAttribute: {
			type: String,
			default: null
		},
		search: {
			type: Function,
			default: void 0
		},
		searchAttributes: {
			type: Array,
			default: null
		},
		searchLazy: {
			type: Boolean,
			default: false
		},
		debounce: {
			type: Number,
			default: 200
		},
		popper: {
			type: Object,
			default: () => ({})
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
		},
		uiMenu: {
			type: Object,
			default: () => ({})
		}
	},
	emits: [
		"update:modelValue",
		"update:query",
		"open",
		"close",
		"change"
	],
	setup(props, { emit, slots }) {
		const { ui, attrs } = useUI("input", toRef(props, "ui"), config, toRef(props, "class"));
		const { ui: uiMenu } = useUI("inputMenu", toRef(props, "uiMenu"), configMenu);
		const popper = computed(() => defu({}, props.popper, uiMenu.value.popper));
		const [trigger, container] = usePopper(popper.value);
		const { size: sizeButtonGroup, rounded } = useInjectButtonGroup({
			ui,
			props
		});
		const { emitFormBlur, emitFormChange, inputId, color, size: sizeFormGroup, name } = useFormGroup(props, config);
		const size = computed(() => sizeButtonGroup.value ?? sizeFormGroup.value);
		const by = computed(() => {
			if (!props.by) return void 0;
			if (typeof props.by === "function") return props.by;
			const key = props.by;
			if (key.indexOf(".") > 0) return (a, z) => {
				return accessor(a, key) === accessor(z, key);
			};
			return key;
		});
		const internalQuery = ref("");
		const query = computed({
			get() {
				return props.query ?? internalQuery.value;
			},
			set(value) {
				internalQuery.value = value;
				emit("update:query", value);
			}
		});
		function isObject(object) {
			return !Array.isArray(object) && object !== null && typeof object === "object";
		}
		const label = computed(() => {
			if (!props.modelValue) return null;
			function getValue(value) {
				if (props.valueAttribute) return accessor(value, props.valueAttribute);
				return value;
			}
			function compareValues(value1, value2) {
				if (by.value && typeof by.value !== "function" && isObject(value1) && isObject(value2)) return isEqual(value1[props.by], value2[props.by]);
				return isEqual(value1, value2);
			}
			if (props.valueAttribute) {
				const option = options.value.find((option2) => {
					return compareValues(getValue(option2), props.modelValue);
				});
				return option ? accessor(option, props.optionAttribute) : null;
			} else return ["string", "number"].includes(typeof props.modelValue) ? props.modelValue : accessor(props.modelValue, props.optionAttribute);
		});
		const inputClass = computed(() => {
			const variant = ui.value.color?.[color.value]?.[props.variant] || ui.value.variant[props.variant];
			return twMerge(twJoin(ui.value.base, ui.value.form, rounded.value, ui.value.placeholder, ui.value.size[size.value], props.padded ? ui.value.padding[size.value] : "p-0", variant?.replaceAll("{color}", color.value), (isLeading.value || slots.leading) && ui.value.leading.padding[size.value], (isTrailing.value || slots.trailing) && ui.value.trailing.padding[size.value]), props.inputClass);
		});
		const isLeading = computed(() => {
			return props.icon && props.leading || props.icon && !props.trailing || props.loading && !props.trailing || props.leadingIcon;
		});
		const isTrailing = computed(() => {
			return props.icon && props.trailing || props.loading && props.trailing || props.trailingIcon;
		});
		const leadingIconName = computed(() => {
			if (props.loading) return props.loadingIcon;
			return props.leadingIcon || props.icon;
		});
		const trailingIconName = computed(() => {
			if (props.loading && !isLeading.value) return props.loadingIcon;
			return props.trailingIcon || props.icon;
		});
		const leadingWrapperIconClass = computed(() => {
			return twJoin(ui.value.icon.leading.wrapper, ui.value.icon.leading.pointer, ui.value.icon.leading.padding[size.value]);
		});
		const leadingIconClass = computed(() => {
			return twJoin(ui.value.icon.base, color.value && virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value), ui.value.icon.size[size.value], props.loading && ui.value.icon.loading);
		});
		const trailingWrapperIconClass = computed(() => {
			return twJoin(ui.value.icon.trailing.wrapper, ui.value.icon.trailing.padding[size.value]);
		});
		const trailingIconClass = computed(() => {
			return twJoin(ui.value.icon.base, color.value && virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors.includes(color.value) && ui.value.icon.color.replaceAll("{color}", color.value), ui.value.icon.size[size.value], props.loading && !isLeading.value && ui.value.icon.loading);
		});
		const debouncedSearch = props.search && typeof props.search === "function" ? useDebounceFn(props.search, props.debounce) : void 0;
		const options = computedAsync(async () => {
			if (debouncedSearch) return await debouncedSearch(query.value);
			return props.options || [];
		}, [], { lazy: props.searchLazy });
		function escapeRegExp(string) {
			return string.replace(/[.*+?^${}()|[\]\\]/g, (match) => `\\${match}`);
		}
		const filteredOptions = computed(() => {
			if (!query.value || debouncedSearch) return options.value;
			const escapedQuery = escapeRegExp(query.value);
			return options.value.filter((option) => {
				return (props.searchAttributes?.length ? props.searchAttributes : [props.optionAttribute]).some((searchAttribute) => {
					if (["string", "number"].includes(typeof option)) return String(option).search(new RegExp(escapedQuery, "i")) !== -1;
					const child = get(option, searchAttribute);
					return child !== null && child !== void 0 && String(child).search(new RegExp(escapedQuery, "i")) !== -1;
				});
			});
		});
		watch(container, (value) => {
			if (value) emit("open");
			else {
				emit("close");
				emitFormBlur();
			}
		});
		function onUpdate(value) {
			query.value = "";
			if (toRaw(props.modelValue) === toRaw(value)) return;
			emit("update:modelValue", value);
			emit("change", value);
			emitFormChange();
		}
		function accessor(obj, key) {
			return get(obj, key);
		}
		function onQueryChange(event) {
			query.value = event.target.value;
		}
		s(() => useId());
		return {
			ui,
			uiMenu,
			attrs,
			name,
			inputId,
			popper,
			trigger,
			container,
			label,
			isLeading,
			isTrailing,
			inputClass,
			leadingIconName,
			leadingIconClass,
			leadingWrapperIconClass,
			trailingIconName,
			trailingIconClass,
			trailingWrapperIconClass,
			filteredOptions,
			query,
			accessor,
			onUpdate,
			onQueryChange,
			by
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_HCombobox = resolveComponent("HCombobox");
	const _component_HComboboxInput = resolveComponent("HComboboxInput");
	const _component_UIcon = Icon_default;
	const _component_HComboboxButton = resolveComponent("HComboboxButton");
	const _component_HComboboxOptions = resolveComponent("HComboboxOptions");
	const _component_HComboboxOption = resolveComponent("HComboboxOption");
	const _component_UAvatar = Avatar_default;
	_push(ssrRenderComponent(_component_HCombobox, mergeProps({
		by: _ctx.by,
		name: _ctx.name,
		"model-value": _ctx.modelValue,
		disabled: _ctx.disabled,
		nullable: _ctx.nullable,
		as: "div",
		class: _ctx.ui.wrapper,
		"onUpdate:modelValue": _ctx.onUpdate
	}, _attrs), {
		default: withCtx(({ open }, _push$1, _parent$1, _scopeId) => {
			if (_push$1) {
				_push$1(`<div class="${ssrRenderClass(_ctx.uiMenu.trigger)}"${_scopeId}>`);
				_push$1(ssrRenderComponent(_component_HComboboxInput, mergeProps({
					id: _ctx.inputId,
					name: _ctx.name,
					required: _ctx.required,
					placeholder: _ctx.placeholder,
					disabled: _ctx.disabled,
					class: _ctx.inputClass,
					autocomplete: "off"
				}, _ctx.attrs, {
					"display-value": () => _ctx.query ? _ctx.query : _ctx.label,
					onChange: _ctx.onQueryChange
				}), null, _parent$1, _scopeId));
				if (_ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading) {
					_push$1(`<span class="${ssrRenderClass(_ctx.leadingWrapperIconClass)}"${_scopeId}>`);
					ssrRenderSlot(_ctx.$slots, "leading", {
						disabled: _ctx.disabled,
						loading: _ctx.loading
					}, () => {
						_push$1(ssrRenderComponent(_component_UIcon, {
							name: _ctx.leadingIconName,
							class: _ctx.leadingIconClass
						}, null, _parent$1, _scopeId));
					}, _push$1, _parent$1, _scopeId);
					_push$1(`</span>`);
				} else _push$1(`<!---->`);
				if (_ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing) _push$1(ssrRenderComponent(_component_HComboboxButton, {
					ref: "trigger",
					class: _ctx.trailingWrapperIconClass
				}, {
					default: withCtx((_, _push$2, _parent$2, _scopeId$1) => {
						if (_push$2) ssrRenderSlot(_ctx.$slots, "trailing", {
							disabled: _ctx.disabled,
							loading: _ctx.loading
						}, () => {
							_push$2(ssrRenderComponent(_component_UIcon, {
								name: _ctx.trailingIconName,
								class: _ctx.trailingIconClass
							}, null, _parent$2, _scopeId$1));
						}, _push$2, _parent$2, _scopeId$1);
						else return [renderSlot(_ctx.$slots, "trailing", {
							disabled: _ctx.disabled,
							loading: _ctx.loading
						}, () => [createVNode(_component_UIcon, {
							name: _ctx.trailingIconName,
							class: _ctx.trailingIconClass
						}, null, 8, ["name", "class"])])];
					}),
					_: 2
				}, _parent$1, _scopeId));
				else _push$1(`<!---->`);
				_push$1(`</div>`);
				if (open) {
					_push$1(`<div class="${ssrRenderClass([_ctx.uiMenu.container, _ctx.uiMenu.width])}"${_scopeId}><template><div${_scopeId}>`);
					if (_ctx.popper.arrow) _push$1(`<div data-popper-arrow class="${ssrRenderClass(Object.values(_ctx.uiMenu.arrow))}"${_scopeId}></div>`);
					else _push$1(`<!---->`);
					_push$1(ssrRenderComponent(_component_HComboboxOptions, {
						static: "",
						class: [
							_ctx.uiMenu.base,
							_ctx.uiMenu.ring,
							_ctx.uiMenu.rounded,
							_ctx.uiMenu.shadow,
							_ctx.uiMenu.background,
							_ctx.uiMenu.padding,
							_ctx.uiMenu.height
						]
					}, {
						default: withCtx((_, _push$2, _parent$2, _scopeId$1) => {
							if (_push$2) {
								_push$2(`<!--[-->`);
								ssrRenderList(_ctx.filteredOptions, (option, index) => {
									_push$2(ssrRenderComponent(_component_HComboboxOption, {
										key: index,
										as: "template",
										value: _ctx.valueAttribute ? _ctx.accessor(option, _ctx.valueAttribute) : option,
										disabled: option.disabled
									}, {
										default: withCtx(({ active, selected, disabled: optionDisabled }, _push$3, _parent$3, _scopeId$2) => {
											if (_push$3) {
												_push$3(`<li class="${ssrRenderClass([
													_ctx.uiMenu.option.base,
													_ctx.uiMenu.option.rounded,
													_ctx.uiMenu.option.padding,
													_ctx.uiMenu.option.size,
													_ctx.uiMenu.option.color,
													active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive,
													selected && _ctx.uiMenu.option.selected,
													optionDisabled && _ctx.uiMenu.option.disabled
												])}"${_scopeId$2}><div class="${ssrRenderClass(_ctx.uiMenu.option.container)}"${_scopeId$2}>`);
												ssrRenderSlot(_ctx.$slots, "option", {
													option,
													active,
													selected
												}, () => {
													if (option.icon) _push$3(ssrRenderComponent(_component_UIcon, {
														name: option.icon,
														class: [
															_ctx.uiMenu.option.icon.base,
															active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive,
															option.iconClass
														],
														"aria-hidden": "true"
													}, null, _parent$3, _scopeId$2));
													else if (option.avatar) _push$3(ssrRenderComponent(_component_UAvatar, mergeProps({ ref_for: true }, {
														size: _ctx.uiMenu.option.avatar.size,
														...option.avatar
													}, {
														class: _ctx.uiMenu.option.avatar.base,
														"aria-hidden": "true"
													}), null, _parent$3, _scopeId$2));
													else if (option.chip) _push$3(`<span class="${ssrRenderClass(_ctx.uiMenu.option.chip.base)}" style="${ssrRenderStyle({ background: `#${option.chip}` })}"${_scopeId$2}></span>`);
													else _push$3(`<!---->`);
													_push$3(`<span class="truncate"${_scopeId$2}>${ssrInterpolate(["string", "number"].includes(typeof option) ? option : _ctx.accessor(option, _ctx.optionAttribute))}</span>`);
												}, _push$3, _parent$3, _scopeId$2);
												_push$3(`</div>`);
												if (selected) {
													_push$3(`<span class="${ssrRenderClass([_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding])}"${_scopeId$2}>`);
													_push$3(ssrRenderComponent(_component_UIcon, {
														name: _ctx.selectedIcon,
														class: _ctx.uiMenu.option.selectedIcon.base,
														"aria-hidden": "true"
													}, null, _parent$3, _scopeId$2));
													_push$3(`</span>`);
												} else _push$3(`<!---->`);
												_push$3(`</li>`);
											} else return [createVNode("li", { class: [
												_ctx.uiMenu.option.base,
												_ctx.uiMenu.option.rounded,
												_ctx.uiMenu.option.padding,
												_ctx.uiMenu.option.size,
												_ctx.uiMenu.option.color,
												active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive,
												selected && _ctx.uiMenu.option.selected,
												optionDisabled && _ctx.uiMenu.option.disabled
											] }, [createVNode("div", { class: _ctx.uiMenu.option.container }, [renderSlot(_ctx.$slots, "option", {
												option,
												active,
												selected
											}, () => [option.icon ? (openBlock(), createBlock(_component_UIcon, {
												key: 0,
												name: option.icon,
												class: [
													_ctx.uiMenu.option.icon.base,
													active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive,
													option.iconClass
												],
												"aria-hidden": "true"
											}, null, 8, ["name", "class"])) : option.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
												key: 1,
												ref_for: true
											}, {
												size: _ctx.uiMenu.option.avatar.size,
												...option.avatar
											}, {
												class: _ctx.uiMenu.option.avatar.base,
												"aria-hidden": "true"
											}), null, 16, ["class"])) : option.chip ? (openBlock(), createBlock("span", {
												key: 2,
												class: _ctx.uiMenu.option.chip.base,
												style: { background: `#${option.chip}` }
											}, null, 6)) : createCommentVNode("", true), createVNode("span", { class: "truncate" }, toDisplayString(["string", "number"].includes(typeof option) ? option : _ctx.accessor(option, _ctx.optionAttribute)), 1)])], 2), selected ? (openBlock(), createBlock("span", {
												key: 0,
												class: [_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding]
											}, [createVNode(_component_UIcon, {
												name: _ctx.selectedIcon,
												class: _ctx.uiMenu.option.selectedIcon.base,
												"aria-hidden": "true"
											}, null, 8, ["name", "class"])], 2)) : createCommentVNode("", true)], 2)];
										}),
										_: 2
									}, _parent$2, _scopeId$1));
								});
								_push$2(`<!--]-->`);
								if (_ctx.query && !_ctx.filteredOptions.length) {
									_push$2(`<p class="${ssrRenderClass(_ctx.uiMenu.option.empty)}"${_scopeId$1}>`);
									ssrRenderSlot(_ctx.$slots, "option-empty", { query: _ctx.query }, () => {
										_push$2(`${ssrInterpolate(_ctx.uiMenu.default.optionEmpty.label.replace("{query}", _ctx.query))}`);
									}, _push$2, _parent$2, _scopeId$1);
									_push$2(`</p>`);
								} else if (!_ctx.filteredOptions.length) {
									_push$2(`<p class="${ssrRenderClass(_ctx.uiMenu.empty)}"${_scopeId$1}>`);
									ssrRenderSlot(_ctx.$slots, "empty", { query: _ctx.query }, () => {
										_push$2(`${ssrInterpolate(_ctx.uiMenu.default.empty.label)}`);
									}, _push$2, _parent$2, _scopeId$1);
									_push$2(`</p>`);
								} else _push$2(`<!---->`);
							} else return [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.filteredOptions, (option, index) => {
								return openBlock(), createBlock(_component_HComboboxOption, {
									key: index,
									as: "template",
									value: _ctx.valueAttribute ? _ctx.accessor(option, _ctx.valueAttribute) : option,
									disabled: option.disabled
								}, {
									default: withCtx(({ active, selected, disabled: optionDisabled }) => [createVNode("li", { class: [
										_ctx.uiMenu.option.base,
										_ctx.uiMenu.option.rounded,
										_ctx.uiMenu.option.padding,
										_ctx.uiMenu.option.size,
										_ctx.uiMenu.option.color,
										active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive,
										selected && _ctx.uiMenu.option.selected,
										optionDisabled && _ctx.uiMenu.option.disabled
									] }, [createVNode("div", { class: _ctx.uiMenu.option.container }, [renderSlot(_ctx.$slots, "option", {
										option,
										active,
										selected
									}, () => [option.icon ? (openBlock(), createBlock(_component_UIcon, {
										key: 0,
										name: option.icon,
										class: [
											_ctx.uiMenu.option.icon.base,
											active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive,
											option.iconClass
										],
										"aria-hidden": "true"
									}, null, 8, ["name", "class"])) : option.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
										key: 1,
										ref_for: true
									}, {
										size: _ctx.uiMenu.option.avatar.size,
										...option.avatar
									}, {
										class: _ctx.uiMenu.option.avatar.base,
										"aria-hidden": "true"
									}), null, 16, ["class"])) : option.chip ? (openBlock(), createBlock("span", {
										key: 2,
										class: _ctx.uiMenu.option.chip.base,
										style: { background: `#${option.chip}` }
									}, null, 6)) : createCommentVNode("", true), createVNode("span", { class: "truncate" }, toDisplayString(["string", "number"].includes(typeof option) ? option : _ctx.accessor(option, _ctx.optionAttribute)), 1)])], 2), selected ? (openBlock(), createBlock("span", {
										key: 0,
										class: [_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding]
									}, [createVNode(_component_UIcon, {
										name: _ctx.selectedIcon,
										class: _ctx.uiMenu.option.selectedIcon.base,
										"aria-hidden": "true"
									}, null, 8, ["name", "class"])], 2)) : createCommentVNode("", true)], 2)]),
									_: 2
								}, 1032, ["value", "disabled"]);
							}), 128)), _ctx.query && !_ctx.filteredOptions.length ? (openBlock(), createBlock("p", {
								key: 0,
								class: _ctx.uiMenu.option.empty
							}, [renderSlot(_ctx.$slots, "option-empty", { query: _ctx.query }, () => [createTextVNode(toDisplayString(_ctx.uiMenu.default.optionEmpty.label.replace("{query}", _ctx.query)), 1)])], 2)) : !_ctx.filteredOptions.length ? (openBlock(), createBlock("p", {
								key: 1,
								class: _ctx.uiMenu.empty
							}, [renderSlot(_ctx.$slots, "empty", { query: _ctx.query }, () => [createTextVNode(toDisplayString(_ctx.uiMenu.default.empty.label), 1)])], 2)) : createCommentVNode("", true)];
						}),
						_: 2
					}, _parent$1, _scopeId));
					_push$1(`</div></template></div>`);
				} else _push$1(`<!---->`);
			} else return [createVNode("div", { class: _ctx.uiMenu.trigger }, [
				createVNode(_component_HComboboxInput, mergeProps({
					id: _ctx.inputId,
					name: _ctx.name,
					required: _ctx.required,
					placeholder: _ctx.placeholder,
					disabled: _ctx.disabled,
					class: _ctx.inputClass,
					autocomplete: "off"
				}, _ctx.attrs, {
					"display-value": () => _ctx.query ? _ctx.query : _ctx.label,
					onChange: _ctx.onQueryChange
				}), null, 16, [
					"id",
					"name",
					"required",
					"placeholder",
					"disabled",
					"class",
					"display-value",
					"onChange"
				]),
				_ctx.isLeading && _ctx.leadingIconName || _ctx.$slots.leading ? (openBlock(), createBlock("span", {
					key: 0,
					class: _ctx.leadingWrapperIconClass
				}, [renderSlot(_ctx.$slots, "leading", {
					disabled: _ctx.disabled,
					loading: _ctx.loading
				}, () => [createVNode(_component_UIcon, {
					name: _ctx.leadingIconName,
					class: _ctx.leadingIconClass
				}, null, 8, ["name", "class"])])], 2)) : createCommentVNode("", true),
				_ctx.isTrailing && _ctx.trailingIconName || _ctx.$slots.trailing ? (openBlock(), createBlock(_component_HComboboxButton, {
					key: 1,
					ref: "trigger",
					class: _ctx.trailingWrapperIconClass
				}, {
					default: withCtx(() => [renderSlot(_ctx.$slots, "trailing", {
						disabled: _ctx.disabled,
						loading: _ctx.loading
					}, () => [createVNode(_component_UIcon, {
						name: _ctx.trailingIconName,
						class: _ctx.trailingIconClass
					}, null, 8, ["name", "class"])])]),
					_: 3
				}, 8, ["class"])) : createCommentVNode("", true)
			], 2), open ? (openBlock(), createBlock("div", {
				key: 0,
				ref: "container",
				class: [_ctx.uiMenu.container, _ctx.uiMenu.width]
			}, [createVNode(Transition, mergeProps({ appear: "" }, _ctx.uiMenu.transition), {
				default: withCtx(() => [createVNode("div", null, [_ctx.popper.arrow ? (openBlock(), createBlock("div", {
					key: 0,
					"data-popper-arrow": "",
					class: Object.values(_ctx.uiMenu.arrow)
				}, null, 2)) : createCommentVNode("", true), createVNode(_component_HComboboxOptions, {
					static: "",
					class: [
						_ctx.uiMenu.base,
						_ctx.uiMenu.ring,
						_ctx.uiMenu.rounded,
						_ctx.uiMenu.shadow,
						_ctx.uiMenu.background,
						_ctx.uiMenu.padding,
						_ctx.uiMenu.height
					]
				}, {
					default: withCtx(() => [(openBlock(true), createBlock(Fragment, null, renderList(_ctx.filteredOptions, (option, index) => {
						return openBlock(), createBlock(_component_HComboboxOption, {
							key: index,
							as: "template",
							value: _ctx.valueAttribute ? _ctx.accessor(option, _ctx.valueAttribute) : option,
							disabled: option.disabled
						}, {
							default: withCtx(({ active, selected, disabled: optionDisabled }) => [createVNode("li", { class: [
								_ctx.uiMenu.option.base,
								_ctx.uiMenu.option.rounded,
								_ctx.uiMenu.option.padding,
								_ctx.uiMenu.option.size,
								_ctx.uiMenu.option.color,
								active ? _ctx.uiMenu.option.active : _ctx.uiMenu.option.inactive,
								selected && _ctx.uiMenu.option.selected,
								optionDisabled && _ctx.uiMenu.option.disabled
							] }, [createVNode("div", { class: _ctx.uiMenu.option.container }, [renderSlot(_ctx.$slots, "option", {
								option,
								active,
								selected
							}, () => [option.icon ? (openBlock(), createBlock(_component_UIcon, {
								key: 0,
								name: option.icon,
								class: [
									_ctx.uiMenu.option.icon.base,
									active ? _ctx.uiMenu.option.icon.active : _ctx.uiMenu.option.icon.inactive,
									option.iconClass
								],
								"aria-hidden": "true"
							}, null, 8, ["name", "class"])) : option.avatar ? (openBlock(), createBlock(_component_UAvatar, mergeProps({
								key: 1,
								ref_for: true
							}, {
								size: _ctx.uiMenu.option.avatar.size,
								...option.avatar
							}, {
								class: _ctx.uiMenu.option.avatar.base,
								"aria-hidden": "true"
							}), null, 16, ["class"])) : option.chip ? (openBlock(), createBlock("span", {
								key: 2,
								class: _ctx.uiMenu.option.chip.base,
								style: { background: `#${option.chip}` }
							}, null, 6)) : createCommentVNode("", true), createVNode("span", { class: "truncate" }, toDisplayString(["string", "number"].includes(typeof option) ? option : _ctx.accessor(option, _ctx.optionAttribute)), 1)])], 2), selected ? (openBlock(), createBlock("span", {
								key: 0,
								class: [_ctx.uiMenu.option.selectedIcon.wrapper, _ctx.uiMenu.option.selectedIcon.padding]
							}, [createVNode(_component_UIcon, {
								name: _ctx.selectedIcon,
								class: _ctx.uiMenu.option.selectedIcon.base,
								"aria-hidden": "true"
							}, null, 8, ["name", "class"])], 2)) : createCommentVNode("", true)], 2)]),
							_: 2
						}, 1032, ["value", "disabled"]);
					}), 128)), _ctx.query && !_ctx.filteredOptions.length ? (openBlock(), createBlock("p", {
						key: 0,
						class: _ctx.uiMenu.option.empty
					}, [renderSlot(_ctx.$slots, "option-empty", { query: _ctx.query }, () => [createTextVNode(toDisplayString(_ctx.uiMenu.default.optionEmpty.label.replace("{query}", _ctx.query)), 1)])], 2)) : !_ctx.filteredOptions.length ? (openBlock(), createBlock("p", {
						key: 1,
						class: _ctx.uiMenu.empty
					}, [renderSlot(_ctx.$slots, "empty", { query: _ctx.query }, () => [createTextVNode(toDisplayString(_ctx.uiMenu.default.empty.label), 1)])], 2)) : createCommentVNode("", true)]),
					_: 3
				}, 8, ["class"])])]),
				_: 3
			}, 16)], 2)) : createCommentVNode("", true)];
		}),
		_: 3
	}, _parent));
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/forms/InputMenu.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var InputMenu_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { InputMenu_default as default };

//# sourceMappingURL=InputMenu-CV105MzK.js.map