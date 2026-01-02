import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, i as twMerge, r as mergeConfig, v as vue_demi_exports } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { t as Icon_default } from "./Icon-CrxV3u_Z.js";
import { W as useUI, n as notification_default } from "./ui-G7Oicn0a.js";
import { t as Avatar_default } from "./Avatar-CBx6NXk5.js";
import { t as Button_default } from "./Button-CMkth-mr.js";
import { computed, defineComponent, mergeProps, ref, resolveComponent, toRef, useSSRContext, watch, watchEffect } from "vue";
import { useTimestamp } from "@vueuse/core";
import { twJoin } from "tailwind-merge";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
function useTimer(cb, interval, options) {
	let timer = null;
	const { pause: tPause, resume: tResume, timestamp } = useTimestamp({
		...options || {},
		controls: true
	});
	const startTime = (0, vue_demi_exports.ref)(null);
	const remaining = (0, vue_demi_exports.computed)(() => {
		if (!startTime.value) return 0;
		return interval - (timestamp.value - startTime.value);
	});
	function set(...args) {
		timer = setTimeout(() => {
			timer = null;
			startTime.value = null;
			cb(...args);
		}, remaining.value);
	}
	function clear() {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	}
	function start() {
		startTime.value = Date.now();
		set();
	}
	function stop() {
		clear();
		tPause();
	}
	function pause() {
		clear();
		tPause();
	}
	function resume() {
		set();
		tResume();
		startTime.value = (startTime.value || 0) + (Date.now() - timestamp.value);
	}
	start();
	return {
		start,
		stop,
		pause,
		resume,
		remaining
	};
}
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.notification, notification_default);
var _sfc_main = defineComponent({
	components: {
		UIcon: Icon_default,
		UAvatar: Avatar_default,
		UButton: Button_default
	},
	inheritAttrs: false,
	props: {
		id: {
			type: [String, Number],
			required: true
		},
		title: {
			type: String,
			default: null
		},
		description: {
			type: String,
			default: null
		},
		icon: {
			type: String,
			default: () => config.default.icon
		},
		avatar: {
			type: Object,
			default: null
		},
		closeButton: {
			type: Object,
			default: () => config.default.closeButton
		},
		timeout: {
			type: Number,
			default: () => config.default.timeout
		},
		actions: {
			type: Array,
			default: () => []
		},
		callback: {
			type: Function,
			default: null
		},
		color: {
			type: String,
			default: () => config.default.color,
			validator(value) {
				return ["gray", ...virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors].includes(value);
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
		},
		pauseTimeoutOnHover: {
			type: Boolean,
			default: true
		}
	},
	emits: ["close"],
	setup(props, { emit }) {
		const { ui, attrs } = useUI("notification", toRef(props, "ui"), config);
		let timer = null;
		const remaining = ref(props.timeout);
		const wrapperClass = computed(() => {
			return twMerge(twJoin(ui.value.wrapper, ui.value.background?.replaceAll("{color}", props.color), ui.value.rounded, ui.value.shadow, ui.value.ring?.replaceAll("{color}", props.color)), props.class);
		});
		const progressClass = computed(() => {
			return twJoin(ui.value.progress.base, ui.value.progress.background?.replaceAll("{color}", props.color));
		});
		const progressStyle = computed(() => {
			return { width: `${remaining.value / props.timeout * 100 || 0}%` };
		});
		const iconClass = computed(() => {
			return twJoin(ui.value.icon.base, ui.value.icon.color?.replaceAll("{color}", props.color));
		});
		function onMouseover() {
			if (props.pauseTimeoutOnHover && timer) timer.pause();
		}
		function onMouseleave() {
			if (props.pauseTimeoutOnHover && timer) timer.resume();
		}
		function onClose() {
			if (timer) timer.stop();
			if (props.callback) props.callback();
			emit("close");
		}
		function onAction(action) {
			if (timer) timer.stop();
			if (action.click) action.click();
			emit("close");
		}
		function initTimer() {
			if (timer) timer.stop();
			if (!props.timeout) return;
			timer = useTimer(() => {
				onClose();
			}, props.timeout);
			watchEffect(() => {
				remaining.value = timer.remaining.value;
			});
		}
		watch(() => props.timeout, initTimer);
		return {
			ui,
			attrs,
			wrapperClass,
			progressClass,
			progressStyle,
			iconClass,
			onMouseover,
			onMouseleave,
			onClose,
			onAction,
			twMerge
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	const _component_UIcon = Icon_default;
	const _component_UAvatar = Avatar_default;
	const _component_UButton = Button_default;
	_push(`<template><div${ssrRenderAttrs(mergeProps({
		class: _ctx.wrapperClass,
		role: "status"
	}, _ctx.attrs, _attrs))}><div class="${ssrRenderClass([
		_ctx.ui.container,
		_ctx.ui.rounded,
		_ctx.ui.ring
	])}"><div class="${ssrRenderClass([[
		_ctx.ui.padding,
		_ctx.ui.gap,
		{
			"items-start": _ctx.description || _ctx.$slots.description,
			"items-center": !_ctx.description && !_ctx.$slots.description
		}
	], "flex"])}">`);
	if (_ctx.icon) _push(ssrRenderComponent(_component_UIcon, {
		name: _ctx.icon,
		class: _ctx.iconClass
	}, null, _parent));
	else _push(`<!---->`);
	if (_ctx.avatar) _push(ssrRenderComponent(_component_UAvatar, mergeProps({
		size: _ctx.ui.avatar.size,
		..._ctx.avatar
	}, { class: _ctx.ui.avatar.base }), null, _parent));
	else _push(`<!---->`);
	_push(`<div class="${ssrRenderClass(_ctx.ui.inner)}">`);
	if (_ctx.title || _ctx.$slots.title) {
		_push(`<p class="${ssrRenderClass(_ctx.ui.title)}">`);
		ssrRenderSlot(_ctx.$slots, "title", { title: _ctx.title }, () => {
			_push(`${ssrInterpolate(_ctx.title)}`);
		}, _push, _parent);
		_push(`</p>`);
	} else _push(`<!---->`);
	if (_ctx.description || _ctx.$slots.description) {
		_push(`<div class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.description, !_ctx.title && !_ctx.$slots.title && _ctx.ui.descriptionOnly))}">`);
		ssrRenderSlot(_ctx.$slots, "description", { description: _ctx.description }, () => {
			_push(`${ssrInterpolate(_ctx.description)}`);
		}, _push, _parent);
		_push(`</div>`);
	} else _push(`<!---->`);
	if ((_ctx.description || _ctx.$slots.description) && _ctx.actions.length) {
		_push(`<div class="${ssrRenderClass(_ctx.ui.actions)}"><!--[-->`);
		ssrRenderList(_ctx.actions, (action, index) => {
			_push(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, { ref_for: true }, {
				..._ctx.ui.default.actionButton || {},
				...action
			}, { onClick: ($event) => _ctx.onAction(action) }), null, _parent));
		});
		_push(`<!--]--></div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
	if (_ctx.closeButton || !_ctx.description && !_ctx.$slots.description && _ctx.actions.length) {
		_push(`<div class="${ssrRenderClass(_ctx.twMerge(_ctx.ui.actions, "mt-0"))}">`);
		if (!_ctx.description && !_ctx.$slots.description && _ctx.actions.length) {
			_push(`<!--[-->`);
			ssrRenderList(_ctx.actions, (action, index) => {
				_push(ssrRenderComponent(_component_UButton, mergeProps({ key: index }, { ref_for: true }, {
					..._ctx.ui.default.actionButton || {},
					...action
				}, { onClick: ($event) => _ctx.onAction(action) }), null, _parent));
			});
			_push(`<!--]-->`);
		} else _push(`<!---->`);
		if (_ctx.closeButton) _push(ssrRenderComponent(_component_UButton, mergeProps({ "aria-label": "Close" }, {
			..._ctx.ui.default.closeButton || {},
			..._ctx.closeButton
		}, { onClick: _ctx.onClose }), null, _parent));
		else _push(`<!---->`);
		_push(`</div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
	if (_ctx.timeout) _push(`<div class="${ssrRenderClass(_ctx.progressClass)}" style="${ssrRenderStyle(_ctx.progressStyle)}"></div>`);
	else _push(`<!---->`);
	_push(`</div></div></template>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/overlays/Notification.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Notification_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export { Notification_default as t };

//# sourceMappingURL=Notification-CsZX8CiY.js.map