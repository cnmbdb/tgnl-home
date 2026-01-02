import { d as virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default, r as mergeConfig } from "../server.mjs";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import { M as progress_default, W as useUI } from "./ui-G7Oicn0a.js";
import { computed, defineComponent, mergeProps, toRef, useSSRContext } from "vue";
import { twJoin } from "tailwind-merge";
import { ssrInterpolate, ssrRenderAttrs, ssrRenderClass, ssrRenderList, ssrRenderSlot, ssrRenderStyle } from "vue/server-renderer";
var config = mergeConfig(virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.strategy, virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.progress, progress_default);
var _sfc_main = defineComponent({
	inheritAttrs: false,
	props: {
		value: {
			type: Number,
			default: null
		},
		max: {
			type: [Number, Array],
			default: 100
		},
		indicator: {
			type: Boolean,
			default: false
		},
		animation: {
			type: String,
			default: () => config.default.animation,
			validator(value) {
				return Object.keys(config.animation).includes(value);
			}
		},
		size: {
			type: String,
			default: () => config.default.size,
			validator(value) {
				return Object.keys(config.progress.size).includes(value);
			}
		},
		color: {
			type: String,
			default: () => config.default.color,
			validator(value) {
				return virtual_nuxt__2FUsers_2Fhf_mac_2FDownloads_2Ftgpro_admin_2F_nuxt_2Fapp_config_default.ui.colors.includes(value);
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
	setup(props) {
		const { ui, attrs } = useUI("progress", toRef(props, "ui"), config, toRef(props, "class"));
		const indicatorContainerClass = computed(() => {
			return twJoin(ui.value.indicator.container.base, ui.value.indicator.container.width, ui.value.indicator.container.transition);
		});
		const indicatorClass = computed(() => {
			return twJoin(ui.value.indicator.align, ui.value.indicator.width, ui.value.indicator.color, ui.value.indicator.size[props.size]);
		});
		const progressClass = computed(() => {
			const classes = [
				ui.value.progress.base,
				ui.value.progress.width,
				ui.value.progress.size[props.size],
				ui.value.progress.rounded,
				ui.value.progress.track,
				ui.value.progress.bar,
				ui.value.progress.color?.replaceAll("{color}", props.color),
				ui.value.progress.background,
				ui.value.progress.indeterminate.base,
				ui.value.progress.indeterminate.rounded
			];
			if (isIndeterminate.value) classes.push(ui.value.animation[props.animation]);
			return twJoin(...classes);
		});
		const stepsClass = computed(() => {
			return twJoin(ui.value.steps.base, ui.value.steps.color?.replaceAll("{color}", props.color), ui.value.steps.size[props.size]);
		});
		const stepClass = computed(() => {
			return twJoin(ui.value.step.base, ui.value.step.align);
		});
		const stepActiveClass = computed(() => {
			return twJoin(ui.value.step.active);
		});
		const stepFirstClass = computed(() => {
			return twJoin(ui.value.step.first);
		});
		function isActive(index) {
			return index === Number(props.value);
		}
		function isFirst(index) {
			return index === 0;
		}
		function stepClasses(index) {
			index = Number(index);
			const classes = [stepClass.value];
			if (isFirst(index)) classes.push(stepFirstClass.value);
			if (isActive(index)) classes.push(stepActiveClass.value);
			return classes.join(" ");
		}
		const isIndeterminate = computed(() => props.value === void 0 || props.value === null);
		const isSteps = computed(() => Array.isArray(props.max));
		const realMax = computed(() => {
			if (isIndeterminate.value) return null;
			if (Array.isArray(props.max)) return props.max.length - 1;
			return Number(props.max);
		});
		return {
			ui,
			attrs,
			indicatorContainerClass,
			indicatorClass,
			progressClass,
			stepsClass,
			stepClasses,
			isIndeterminate,
			isSteps,
			realMax,
			percent: computed(() => {
				if (isIndeterminate.value) return;
				switch (true) {
					case props.value < 0: return 0;
					case props.value > realMax.value: return 100;
					default: return props.value / realMax.value * 100;
				}
			})
		};
	}
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
	_push(`<div${ssrRenderAttrs(mergeProps({
		class: _ctx.ui.wrapper,
		role: "progressbar"
	}, _attrs))} data-v-e0a22531>`);
	if (_ctx.indicator || _ctx.$slots.indicator) ssrRenderSlot(_ctx.$slots, "indicator", { percent: _ctx.percent }, () => {
		if (!_ctx.isSteps) _push(`<div class="${ssrRenderClass(_ctx.indicatorContainerClass)}" style="${ssrRenderStyle({ width: `${_ctx.percent}%` })}" data-v-e0a22531><div class="${ssrRenderClass(_ctx.indicatorClass)}" data-v-e0a22531>${ssrInterpolate(Math.round(_ctx.percent))}% </div></div>`);
		else _push(`<!---->`);
	}, _push, _parent);
	else _push(`<!---->`);
	_push(`<progress${ssrRenderAttrs(mergeProps({
		"aria-valuemax": _ctx.realMax,
		"aria-valuenow": _ctx.value,
		class: _ctx.progressClass
	}, {
		value: _ctx.value,
		max: _ctx.realMax,
		..._ctx.attrs
	}))} data-v-e0a22531>${ssrInterpolate(_ctx.percent !== void 0 ? `${Math.round(_ctx.percent)}%` : void 0)}</progress>`);
	if (_ctx.isSteps) {
		_push(`<div class="${ssrRenderClass(_ctx.stepsClass)}" data-v-e0a22531><!--[-->`);
		ssrRenderList(_ctx.max, (step, index) => {
			_push(`<div class="${ssrRenderClass(_ctx.stepClasses(index))}" data-v-e0a22531>`);
			ssrRenderSlot(_ctx.$slots, `step-${index}`, mergeProps({ ref_for: true }, { step }), () => {
				_push(`${ssrInterpolate(step)}`);
			}, _push, _parent);
			_push(`</div>`);
		});
		_push(`<!--]--></div>`);
	} else _push(`<!---->`);
	_push(`</div>`);
}
var _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("node_modules/@nuxt/ui/dist/runtime/components/elements/Progress.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var Progress_default = /* @__PURE__ */ __plugin_vue_export_helper_default(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-e0a22531"]]);
export { Progress_default as t };

//# sourceMappingURL=Progress-BNi6gYl8.js.map