import __nuxt_component_2 from "./Input-B1mh7BSF.js";
import __nuxt_component_2$1 from "./Button-D_TCUDyh.js";
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate } from "vue/server-renderer";
import { _ as _imports_0 } from "./logo-Ub99r2SN.js";
import "hookable";
import "klona";
import { _ as _export_sfc } from "./_plugin-vue_export-helper-1tPrXgE0.js";
import "./Icon-ZhGvf9gZ.js";
import "./index-C6m-0LTF.js";
import "@iconify/vue";
import "@iconify/utils/lib/css/icon";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
import "@vueuse/core";
import "tailwind-merge";
import "./tooltip-BtqstB0H.js";
import "./useFormGroup-B3564yef.js";
import "./useButtonGroup-6uzJtOJv.js";
import "./Link-CS5wywLd.js";
import "./nuxt-link-C6IP2oPu.js";
import "ohash/utils";
import "./link-Bz3Wc5MF.js";
import "./button-Bz5rwL6o.js";
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const loginForm = ref({
      username: "",
      password: ""
    });
    const loading = ref(false);
    const errorMessage = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UInput = __nuxt_component_2;
      const _component_UButton = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#0c0c0d] flex items-center justify-center" }, _attrs))} data-v-3fd27b52><div class="w-full max-w-md" data-v-3fd27b52><div class="text-center mb-8" data-v-3fd27b52><img${ssrRenderAttr("src", _imports_0)} alt="Logo" class="h-16 w-auto mx-auto mb-4" data-v-3fd27b52><h1 class="text-2xl font-bold text-white mb-2" data-v-3fd27b52>管理后台</h1><p class="text-[#9ca3af]" data-v-3fd27b52>请输入您的登录凭据</p></div><div class="bg-[#1a1a1b] border border-[#2a2a2b] rounded-lg p-6" data-v-3fd27b52><form class="space-y-4" data-v-3fd27b52><div data-v-3fd27b52><label for="username" class="block text-sm font-medium text-white mb-2" data-v-3fd27b52> 用户名 </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        id: "username",
        modelValue: unref(loginForm).username,
        "onUpdate:modelValue": ($event) => unref(loginForm).username = $event,
        type: "text",
        placeholder: "请输入用户名",
        disabled: unref(loading),
        class: "w-full text-white",
        style: { "background-color": "black !important", "color": "white !important" },
        size: "lg"
      }, null, _parent));
      _push(`</div><div data-v-3fd27b52><label for="password" class="block text-sm font-medium text-white mb-2" data-v-3fd27b52> 密码 </label>`);
      _push(ssrRenderComponent(_component_UInput, {
        id: "password",
        modelValue: unref(loginForm).password,
        "onUpdate:modelValue": ($event) => unref(loginForm).password = $event,
        type: "password",
        placeholder: "请输入密码",
        disabled: unref(loading),
        class: "w-full text-white",
        style: { "background-color": "black !important", "color": "white !important" },
        size: "lg"
      }, null, _parent));
      _push(`</div>`);
      if (unref(errorMessage)) {
        _push(`<div class="text-red-400 text-sm text-center" data-v-3fd27b52>${ssrInterpolate(unref(errorMessage))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_UButton, {
        type: "submit",
        loading: unref(loading),
        disabled: !unref(loginForm).username || !unref(loginForm).password,
        class: "w-full text-center flex items-center justify-center",
        size: "lg",
        color: "primary"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(loading) ? "登录中..." : "登录")}`);
          } else {
            return [
              createTextVNode(toDisplayString(unref(loading) ? "登录中..." : "登录"), 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-3fd27b52"]]);
export {
  index as default
};
//# sourceMappingURL=index-B6XILRM2.js.map
