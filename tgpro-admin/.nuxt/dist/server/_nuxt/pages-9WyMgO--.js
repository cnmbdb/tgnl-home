import "./components-D5RLOpR9.js";
import { t as __plugin_vue_export_helper_default } from "./_plugin-vue_export-helper-COMwgem8.js";
import "./Icon-CrxV3u_Z.js";
import "./ui-G7Oicn0a.js";
import { t as logo_default } from "./logo-C6xj12lo.js";
import "./useFormGroup-ZK-CpXpd.js";
import "./Link-xfGBFWPh.js";
import "./useButtonGroup-1gNuWR3y.js";
import { t as Button_default } from "./Button-CMkth-mr.js";
import { t as Input_default } from "./Input-Cg9OsLtS.js";
import { t as definePageMeta } from "./composables-BTIC2kjU.js";
import { createTextVNode, defineComponent, mergeProps, ref, resolveComponent, toDisplayString, unref, useSSRContext, watch, withCtx } from "vue";
import { ssrInterpolate, ssrRenderAttr, ssrRenderAttrs, ssrRenderComponent } from "vue/server-renderer";
var index_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
	__name: "index",
	__ssrInlineRender: true,
	setup(__props) {
		const loginForm = ref({
			username: "",
			password: ""
		});
		const loading = ref(false);
		const errorMessage = ref("");
		watch(loginForm, (newVal, oldVal) => {
			console.log("Form data changed:", {
				old: oldVal,
				new: newVal
			});
		}, { deep: true });
		return (_ctx, _push, _parent, _attrs) => {
			const _component_UInput = Input_default;
			const _component_UButton = Button_default;
			_push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0c0c0d] flex items-center justify-center" }, _attrs))} data-v-55861d20><div class="w-full max-w-md" data-v-55861d20><div class="text-center mb-8" data-v-55861d20><img${ssrRenderAttr("src", logo_default)} alt="Logo" class="h-16 w-auto mx-auto mb-4" data-v-55861d20><h1 class="text-2xl font-bold text-white mb-2" data-v-55861d20>管理后台</h1><p class="text-[#9ca3af]" data-v-55861d20>请输入您的登录凭据</p></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-6" data-v-55861d20><form class="space-y-4" data-v-55861d20><div data-v-55861d20><label for="username" class="block text-sm font-medium text-white mb-2" data-v-55861d20> 用户名 </label>`);
			_push(ssrRenderComponent(_component_UInput, {
				id: "username",
				modelValue: unref(loginForm).username,
				"onUpdate:modelValue": ($event) => unref(loginForm).username = $event,
				type: "text",
				placeholder: "请输入用户名",
				disabled: unref(loading),
				class: "w-full text-white",
				style: {
					"background-color": "black !important",
					"color": "white !important"
				},
				size: "lg"
			}, null, _parent));
			_push(`</div><div data-v-55861d20><label for="password" class="block text-sm font-medium text-white mb-2" data-v-55861d20> 密码 </label>`);
			_push(ssrRenderComponent(_component_UInput, {
				id: "password",
				modelValue: unref(loginForm).password,
				"onUpdate:modelValue": ($event) => unref(loginForm).password = $event,
				type: "password",
				placeholder: "请输入密码",
				disabled: unref(loading),
				class: "w-full text-white",
				style: {
					"background-color": "black !important",
					"color": "white !important"
				},
				size: "lg"
			}, null, _parent));
			_push(`</div>`);
			if (unref(errorMessage)) _push(`<div class="text-red-400 text-sm text-center" data-v-55861d20>${ssrInterpolate(unref(errorMessage))}</div>`);
			else _push(`<!---->`);
			_push(ssrRenderComponent(_component_UButton, {
				type: "submit",
				loading: unref(loading),
				disabled: unref(loading),
				class: "w-full text-center flex items-center justify-center",
				size: "lg",
				color: "primary"
			}, {
				default: withCtx((_, _push$1, _parent$1, _scopeId) => {
					if (_push$1) _push$1(`${ssrInterpolate(unref(loading) ? "登录中..." : "登录")}`);
					else return [createTextVNode(toDisplayString(unref(loading) ? "登录中..." : "登录"), 1)];
				}),
				_: 1
			}, _parent));
			_push(`</form></div></div></div>`);
		};
	}
});
var _sfc_setup = index_vue_vue_type_script_setup_true_lang_default.setup;
index_vue_vue_type_script_setup_true_lang_default.setup = (props, ctx) => {
	const ssrContext = useSSRContext();
	(ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
	return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var pages_default = /* @__PURE__ */ __plugin_vue_export_helper_default(index_vue_vue_type_script_setup_true_lang_default, [["__scopeId", "data-v-55861d20"]]);
export { pages_default as default };

//# sourceMappingURL=pages-9WyMgO--.js.map